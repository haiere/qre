import { mountIcons, iconMarkup } from './icons.js';
import { applyTranslations, getLanguage, initLanguage, setLanguage, t, updateFooterYear } from './i18n.js';
import { storage } from './storage.js';
import { getDefaultValues, getType, TYPES } from './form-types.js';
import { ensureLibrary, QREngine, buildQrOptions } from './qr-engine.js';
import { createCustomization, PRESETS } from './customization.js';
import {
  composeRaster,
  composeSvg,
  copyImageBlob,
  copyText,
  downloadBlob,
  makeFilename,
  shareQr,
  supportsWebp,
} from './downloads.js';
import { clamp, contrastRatio, escapeXml, utf8Bytes } from './validation.js';

const CAPACITY = { L: 2953, M: 2331, Q: 1663, H: 1273 };
const WARN_DENSITY_RATIO = 0.7;

const state = {
  typeId: 'url',
  valuesByType: {},
  payload: '',
  valid: false,
  touched: false,
  errors: {},
  warnings: [],
  status: 'idle',
  libraryReady: false,
  renderToken: 0,
  revealPayload: false,
  exportSize: 1024,
  webpSupported: supportsWebp(),
  lastFocused: null,
  confirmMode: 'reset',
};

const els = {};
let engine;
let customization;
let refreshTimer = null;
let toastTimer = null;

document.addEventListener('DOMContentLoaded', init);

async function init() {
  mountIcons();
  cacheElements();

  const lang = initLanguage();
  els.langSelect.value = lang;

  initTheme();
  initMobileMenu();
  initDialog();
  initStaticEvents();

  customization = createCustomization(onCustomizationChange);
  engine = new QREngine(els.qrPreview);

  state.exportSize = clamp(Number(storage.get('ui', {}).exportSize) || 1024, 128, 4096);
  els.exportSize.value = ['256', '512', '1024'].includes(String(state.exportSize)) ? String(state.exportSize) : 'custom';
  els.exportSizeCustom.value = String(state.exportSize);
  els.exportSizeCustomWrap.hidden = els.exportSize.value !== 'custom';

  if (!state.webpSupported) {
    els.downloadWebp.disabled = true;
    els.downloadWebp.title = t('err.webp');
  }

  renderTabs();
  selectType('url', { focus: false, initial: true });
  updateExportState();

  try {
    await ensureLibrary();
    state.libraryReady = true;
    els.previewError.hidden = true;
    refresh({ immediate: true });
  } catch {
    state.libraryReady = false;
    showLibraryError();
  }
}

function cacheElements() {
  const ids = [
    'lang-select', 'theme-toggle', 'menu-toggle', 'mobile-nav',
    'type-tabs', 'type-panel', 'qr-form', 'form-error', 'url-final',
    'qr-stage', 'qr-frame', 'qr-preview', 'qr-caption', 'qr-empty',
    'preview-error', 'library-retry',
    'preview-type', 'meta-type', 'preview-size', 'preview-ec',
    'status-badge', 'status-text', 'warnings-list',
    'payload-code', 'payload-toggle', 'copy-payload',
    'export-size', 'export-size-custom', 'export-size-custom-wrap',
    'download-png', 'download-svg', 'download-webp', 'copy-image',
    'share-btn', 'reset-btn', 'toast-region', 'live-status',
    'confirm-dialog', 'confirm-title', 'confirm-message', 'confirm-accept',
    'footer-copy',
  ];

  ids.forEach((id) => {
    els[id.replace(/-([a-z])/g, (_, char) => char.toUpperCase())] = document.getElementById(id);
  });

  els.formError = document.getElementById('form-error');
  els.urlFinal = document.getElementById('url-final');
}

/* =========================================================
   Theme
   ========================================================= */
function initTheme() {
  const stored = storage.get('theme');
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
  const theme = stored === 'light' || stored === 'dark' ? stored : prefersLight ? 'light' : 'dark';
  applyTheme(theme, { persist: false });

  els.themeToggle.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(next);
  });
}

function applyTheme(theme, { persist = true } = {}) {
  document.documentElement.dataset.theme = theme;
  if (persist) storage.set('theme', theme);

  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'light' ? '#F4F8FB' : '#0A192F');

  const icon = els.themeToggle.querySelector('use');
  if (icon) icon.setAttribute('href', theme === 'light' ? '#i-sun' : '#i-moon');

  els.themeToggle.setAttribute('aria-label', t(theme === 'light' ? 'a11y.themeToggleLight' : 'a11y.themeToggle'));
}

/* =========================================================
   Mobile menu
   ========================================================= */
function initMobileMenu() {
  const toggle = els.menuToggle;
  const nav = els.mobileNav;

  function setOpen(open) {
    nav.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', t(open ? 'nav.close' : 'nav.menu'));
    const icon = toggle.querySelector('use');
    if (icon) icon.setAttribute('href', open ? '#i-close' : '#i-menu');

    if (open) {
      const first = nav.querySelector('a');
      first?.focus({ preventScroll: true });
    } else {
      toggle.focus({ preventScroll: true });
    }
  }

  toggle.addEventListener('click', () => setOpen(nav.hidden));

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !nav.hidden) setOpen(false);
  });
}

/* =========================================================
   Dialog
   ========================================================= */
function initDialog() {
  els.confirmDialog.addEventListener('close', () => {
    if (els.confirmDialog.returnValue !== 'confirm') return;

    if (state.confirmMode === 'clear') {
      storage.clearAll();
      showToast(t('toast.cleared'));
      return;
    }

    resetGenerator();
  });
}

function openConfirm(mode) {
  state.confirmMode = mode;
  const isClear = mode === 'clear';

  els.confirmTitle.textContent = t(isClear ? 'confirm.clearTitle' : 'confirm.resetTitle');
  els.confirmMessage.textContent = t(isClear ? 'confirm.clearMessage' : 'confirm.resetMessage');
  els.confirmAccept.textContent = t(isClear ? 'btn.clearData' : 'btn.confirmReset');

  if (typeof els.confirmDialog.showModal === 'function') {
    els.confirmDialog.showModal();
  } else if (window.confirm(els.confirmMessage.textContent)) {
    if (isClear) storage.clearAll();
    else resetGenerator();
  }
}

/* =========================================================
   Static events
   ========================================================= */
function initStaticEvents() {
  els.langSelect.addEventListener('change', async (event) => {
    const nextLang = event.target.value;
    collectCurrentValues();

    setLanguage(nextLang);
    els.langSelect.value = nextLang;

    renderTabs();
    renderForm({ focus: false });
    updateThemeLabel();
    refresh({ immediate: true });
  });

  els.exportSize.addEventListener('change', (event) => {
    const custom = event.target.value === 'custom';
    els.exportSizeCustomWrap.hidden = !custom;

    if (!custom) {
      state.exportSize = Number(event.target.value);
      els.exportSizeCustom.value = String(state.exportSize);
      persistExportSize();
      updatePreviewMeta();
    }
  });

  els.exportSizeCustom.addEventListener('input', (event) => {
    const value = clamp(Number(event.target.value) || 1024, 128, 4096);
    state.exportSize = value;
    persistExportSize();
    updatePreviewMeta();
  });

  els.downloadPng.addEventListener('click', () => handleDownload('png'));
  els.downloadSvg.addEventListener('click', () => handleDownload('svg'));
  els.downloadWebp.addEventListener('click', () => handleDownload('webp'));
  els.copyImage.addEventListener('click', handleCopyImage);
  els.shareBtn.addEventListener('click', handleShare);
  els.resetBtn.addEventListener('click', () => openConfirm('reset'));

  els.copyPayload.addEventListener('click', async () => {
    if (!state.payload) return;
    try {
      await copyText(state.payload);
      showToast(t('toast.copied'));
    } catch {
      showToast(t('err.copy'), 'error');
    }
  });

  els.payloadToggle.addEventListener('click', () => {
    state.revealPayload = !state.revealPayload;
    renderPayload();
  });

  els.libraryRetry.addEventListener('click', retryLibrary);

  document.getElementById('clear-data').addEventListener('click', () => openConfirm('clear'));

  document.addEventListener('keydown', (event) => {
    const isMod = event.ctrlKey || event.metaKey;
    if (isMod && event.key === 'Enter') {
      event.preventDefault();
      state.touched = true;
      refresh({ immediate: true });
    }
  });

  window.addEventListener('beforeunload', () => {
    customization?.savePreferences();
  });
}

function persistExportSize() {
  const ui = storage.get('ui', {});
  ui.exportSize = state.exportSize;
  storage.set('ui', ui);
}

/* =========================================================
   Type tabs
   ========================================================= */
function renderTabs() {
  els.typeTabs.replaceChildren();

  TYPES.forEach((type) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'type-tab';
    button.id = `tab-${type.id}`;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-selected', String(type.id === state.typeId));
    button.setAttribute('aria-controls', 'type-panel');
    button.tabIndex = type.id === state.typeId ? 0 : -1;
    button.dataset.type = type.id;

    const icon = document.createElement('span');
    icon.innerHTML = iconMarkup(type.icon);
    const label = document.createElement('span');
    label.textContent = t(type.labelKey);

    button.append(icon.firstElementChild, label);
    els.typeTabs.append(button);
  });

  const selected = els.typeTabs.querySelector(`[data-type="${state.typeId}"]`);
  if (selected) {
    els.typePanel.setAttribute('aria-labelledby', selected.id);
    selected.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  els.typeTabs.addEventListener('keydown', onTabKeydown);
  els.typeTabs.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-type]');
    if (tab) selectType(tab.dataset.type, { focus: true });
  });
}

function onTabKeydown(event) {
  const tabs = [...els.typeTabs.querySelectorAll('[role="tab"]')];
  const currentIndex = tabs.indexOf(document.activeElement);
  if (currentIndex === -1) return;

  let nextIndex = currentIndex;

  if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
  else if (event.key === 'ArrowLeft') nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
  else if (event.key === 'Home') nextIndex = 0;
  else if (event.key === 'End') nextIndex = tabs.length - 1;
  else return;

  event.preventDefault();
  const next = tabs[nextIndex];
  selectType(next.dataset.type, { focus: true });
  next.focus();
}

function selectType(id, { focus = false, initial = false } = {}) {
  if (!initial) collectCurrentValues();

  state.typeId = id;
  state.touched = false;
  state.revealPayload = false;

  els.typeTabs.querySelectorAll('[role="tab"]').forEach((tab) => {
    const selected = tab.dataset.type === id;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });

  const selectedTab = els.typeTabs.querySelector(`[data-type="${id}"]`);
  if (selectedTab) {
    els.typePanel.setAttribute('aria-labelledby', selectedTab.id);
    selectedTab.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }

  renderForm({ focus });
  refresh({ immediate: true });
}

/* =========================================================
   Form rendering
   ========================================================= */
function renderForm({ focus = false } = {}) {
  const type = getType(state.typeId);
  const values = {
    ...getDefaultValues(type),
    ...(state.valuesByType[type.id] || {}),
  };

  const parts = [];
  parts.push('<div id="form-error" class="form-error" role="alert" hidden>');
  parts.push(`${iconMarkup('alert')}<span></span></div>`);

  if (type.noticeKey) {
    parts.push(`<div class="form-notice">${iconMarkup('info')}<span>${escapeHtml(t(type.noticeKey))}</span></div>`);
  }

  type.groups.forEach((group) => {
    parts.push('<fieldset class="form-group">');
    parts.push(`<legend>${escapeHtml(t(group.legendKey))}</legend>`);

    group.fields.forEach((fieldDef) => {
      parts.push(renderField(type, fieldDef, values));
    });

    parts.push('</fieldset>');
  });

  if (type.id === 'url') {
    parts.push('<div class="field"><span class="field-label" data-final-label></span><div class="final-url" id="url-final" hidden></div></div>');
  }

  els.qrForm.innerHTML = parts.join('');
  els.formError = document.getElementById('form-error');
  els.urlFinal = document.getElementById('url-final');

  setFormValues(type, values);
  updateConditionals(type);
  updateCounters(type);
  updateFinalUrl(type, values);

  els.qrForm.oninput = onFormInput;
  els.qrForm.onchange = onFormChange;
  els.qrForm.onclick = onFormClick;

  const finalLabel = els.qrForm.querySelector('[data-final-label]');
  if (finalLabel) finalLabel.textContent = t('label.finalUrl');

  if (focus) {
    const first = els.qrForm.querySelector('input:not([type="hidden"]):not([disabled]), select:not([disabled]), textarea:not([disabled])');
    first?.focus({ preventScroll: true });
  }
}

function renderField(type, fieldDef, values) {
  const id = `f-${type.id}-${fieldDef.name}`;
  const helpId = `${id}-help`;
  const errorId = `${id}-error`;
  const describedBy = [fieldDef.helpKey ? helpId : '', errorId].filter(Boolean).join(' ');
  const required = fieldDef.required ? 'required aria-required="true"' : '';
  const label = escapeHtml(t(fieldDef.labelKey));
  const optional = fieldDef.required ? '' : `<span class="sr-only"> (${escapeHtml(t('label.optional'))})</span>`;
  const requiredMark = fieldDef.required ? `<span class="required-mark" aria-hidden="true">*</span>` : '';

  if (fieldDef.type === 'checkbox') {
    return `
      <div class="field" data-field="${fieldDef.name}" ${fieldDef.showIf && !fieldDef.showIf(values) ? 'hidden' : ''}>
        <label class="check-row" for="${id}">
          <input type="checkbox" id="${id}" name="${fieldDef.name}" ${required}>
          <span>${label}${optional}</span>
        </label>
        ${fieldDef.helpKey ? `<p class="help" id="${helpId}">${escapeHtml(t(fieldDef.helpKey))}</p>` : ''}
        <p class="field-error" id="${errorId}" hidden>${iconMarkup('alert')}<span></span></p>
      </div>
    `;
  }

  let control = '';
  const common = `id="${id}" name="${fieldDef.name}" ${required} aria-describedby="${describedBy}"`;

  if (fieldDef.type === 'textarea') {
    control = `<textarea ${common} rows="${fieldDef.rows || 4}" ${fieldDef.placeholderKey ? `placeholder="${escapeHtml(t(fieldDef.placeholderKey))}"` : ''} ${fieldDef.maxlength ? `maxlength="${fieldDef.maxlength}"` : ''}></textarea>`;
    if (fieldDef.counter) {
      control += `<p class="counter" data-counter-for="${fieldDef.name}" data-warn-at="${fieldDef.warnAt || 800}">0</p>`;
    }
  } else if (fieldDef.type === 'select') {
    const options = fieldDef.options.map((option) => {
      return `<option value="${escapeHtml(option.value)}">${escapeHtml(t(option.labelKey))}</option>`;
    }).join('');
    control = `<select ${common}>${options}</select>`;
  } else if (fieldDef.type === 'password') {
    control = `
      <div class="input-wrap">
        <input type="password" ${common} ${fieldDef.placeholderKey ? `placeholder="${escapeHtml(t(fieldDef.placeholderKey))}"` : ''} ${fieldDef.autocomplete ? `autocomplete="${fieldDef.autocomplete}"` : ''}>
        <button class="input-addon" type="button" data-toggle-password="${fieldDef.name}" aria-label="${escapeHtml(t('btn.showPassword'))}" aria-pressed="false">
          ${iconMarkup('eye')}
        </button>
      </div>
    `;
  } else {
    const inputType = fieldDef.type === 'number' ? 'number' : fieldDef.type === 'email' ? 'email' : fieldDef.type === 'url' ? 'url' : fieldDef.type === 'tel' ? 'tel' : fieldDef.type === 'datetime-local' ? 'datetime-local' : 'text';
    const attrs = [
      `type="${inputType}"`,
      common,
      fieldDef.placeholderKey ? `placeholder="${escapeHtml(t(fieldDef.placeholderKey))}"` : '',
      fieldDef.autocomplete ? `autocomplete="${fieldDef.autocomplete}"` : '',
      fieldDef.inputmode ? `inputmode="${fieldDef.inputmode}"` : '',
      fieldDef.step ? `step="${fieldDef.step}"` : '',
      fieldDef.min !== undefined ? `min="${fieldDef.min}"` : '',
      fieldDef.max !== undefined ? `max="${fieldDef.max}"` : '',
      fieldDef.mono ? 'class="mono"' : '',
    ].filter(Boolean).join(' ');

    let addons = '';
    if (fieldDef.paste) {
      addons += `<button class="input-addon" type="button" data-paste="${fieldDef.name}" aria-label="${escapeHtml(t('btn.paste'))}">${iconMarkup('copy')}</button>`;
    }
    if (fieldDef.clearable) {
      addons += `<button class="input-addon" type="button" data-clear="${fieldDef.name}" aria-label="${escapeHtml(t('btn.clear'))}">${iconMarkup('close')}</button>`;
    }

    control = addons
      ? `<div class="input-wrap"><input ${attrs}>${addons}</div>`
      : `<input ${attrs}>`;
  }

  return `
    <div class="field" data-field="${fieldDef.name}" ${fieldDef.showIf && !fieldDef.showIf(values) ? 'hidden' : ''}>
      <label for="${id}">${label}${requiredMark}${optional}</label>
      ${control}
      ${fieldDef.helpKey ? `<p class="help" id="${helpId}">${escapeHtml(t(fieldDef.helpKey))}</p>` : ''}
      <p class="field-error" id="${errorId}" hidden>${iconMarkup('alert')}<span></span></p>
    </div>
  `;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function setFormValues(type, values) {
  type.groups.forEach((group) => {
    group.fields.forEach((fieldDef) => {
      const input = els.qrForm.elements.namedItem(fieldDef.name);
      if (!input) return;

      if (fieldDef.type === 'checkbox') input.checked = Boolean(values[fieldDef.name]);
      else input.value = values[fieldDef.name] ?? '';
    });
  });
}

function collectValues(type = getType(state.typeId)) {
  const values = {};

  type.groups.forEach((group) => {
    group.fields.forEach((fieldDef) => {
      const input = els.qrForm.elements.namedItem(fieldDef.name);
      if (!input) {
        values[fieldDef.name] = getDefaultValues(type)[fieldDef.name];
        return;
      }

      values[fieldDef.name] = fieldDef.type === 'checkbox' ? input.checked : input.value;
    });
  });

  return values;
}

function collectCurrentValues() {
  if (!els.qrForm) return;
  state.valuesByType[state.typeId] = collectValues();
}

function onFormInput() {
  state.touched = true;
  collectCurrentValues();
  updateConditionals(getType(state.typeId));
  updateCounters(getType(state.typeId));
  updateFinalUrl(getType(state.typeId), collectValues());
  scheduleRefresh();
}

function onFormChange() {
  state.touched = true;
  collectCurrentValues();
  updateConditionals(getType(state.typeId));
  scheduleRefresh();
}

function onFormClick(event) {
  const pasteButton = event.target.closest('[data-paste]');
  if (pasteButton) {
    pasteInto(pasteButton.dataset.paste);
    return;
  }

  const clearButton = event.target.closest('[data-clear]');
  if (clearButton) {
    const input = els.qrForm.elements.namedItem(clearButton.dataset.clear);
    if (input) {
      input.value = '';
      state.touched = true;
      collectCurrentValues();
      updateConditionals(getType(state.typeId));
      updateCounters(getType(state.typeId));
      scheduleRefresh();
      input.focus();
    }
    return;
  }

  const toggle = event.target.closest('[data-toggle-password]');
  if (toggle) {
    const input = els.qrForm.elements.namedItem(toggle.dataset.togglePassword);
    if (!input) return;

    const show = input.type === 'password';
    input.type = show ? 'text' : 'password';
    toggle.setAttribute('aria-pressed', String(show));
    toggle.setAttribute('aria-label', t(show ? 'btn.hidePassword' : 'btn.showPassword'));
    toggle.innerHTML = iconMarkup(show ? 'eye-off' : 'eye');
  }
}

async function pasteInto(name) {
  const input = els.qrForm.elements.namedItem(name);
  if (!input) return;

  try {
    const text = await navigator.clipboard.readText();
    input.value = text;
    state.touched = true;
    collectCurrentValues();
    updateConditionals(getType(state.typeId));
    updateCounters(getType(state.typeId));
    scheduleRefresh();
    input.focus();
  } catch {
    showToast(t('err.clipboard'), 'error');
  }
}

function updateConditionals(type) {
  const values = collectValues(type);

  type.groups.forEach((group) => {
    group.fields.forEach((fieldDef) => {
      if (!fieldDef.showIf) return;
      const wrapper = els.qrForm.querySelector(`[data-field="${fieldDef.name}"]`);
      if (wrapper) wrapper.hidden = !fieldDef.showIf(values);
    });
  });
}

function updateCounters(type) {
  type.groups.forEach((group) => {
    group.fields.forEach((fieldDef) => {
      if (!fieldDef.counter) return;

      const input = els.qrForm.elements.namedItem(fieldDef.name);
      const counter = els.qrForm.querySelector(`[data-counter-for="${fieldDef.name}"]`);
      if (!input || !counter) return;

      const length = input.value.length;
      counter.textContent = `${length} / ${fieldDef.warnAt || 800}`;
      counter.dataset.warn = String(length > (fieldDef.warnAt || 800));
    });
  });
}

function updateFinalUrl(type, values) {
  if (type.id !== 'url' || !els.urlFinal) return;

  const hasUrl = values.url.trim() && type.validate(values).errors.url === undefined;
  if (!hasUrl) {
    els.urlFinal.hidden = true;
    return;
  }

  els.urlFinal.hidden = false;
  els.urlFinal.textContent = type.build(values);
}

/* =========================================================
   Validation and rendering
   ========================================================= */
function scheduleRefresh() {
  window.clearTimeout(refreshTimer);
  refreshTimer = window.setTimeout(() => refresh(), 180);
}

async function refresh({ immediate = false } = {}) {
  if (immediate) window.clearTimeout(refreshTimer);
  if (!els.qrForm) return;

  const type = getType(state.typeId);
  const values = collectValues(type);
  state.valuesByType[type.id] = values;

  const result = type.validate(values);
  state.errors = result.errors || {};
  renderErrors(type, state.errors);

  const hasAnyInput = type.groups.some((group) =>
    group.fields.some((fieldDef) => {
      const value = values[fieldDef.name];
      return fieldDef.type === 'checkbox' ? Boolean(value) : String(value ?? '').trim() !== '';
    }),
  );

  if (!state.touched && !hasAnyInput) {
    state.valid = false;
    state.payload = '';
    state.warnings = [];
    state.status = 'idle';
    clearPreview();
    updateStatus();
    updateExportState();
    return;
  }

  if (Object.keys(state.errors).length > 0) {
    state.valid = false;
    state.payload = '';
    state.warnings = [];
    state.status = 'invalid';
    markPreviewStale();
    updateStatus();
    updateExportState();
    return;
  }

  let payload;
  try {
    payload = type.build(values);
  } catch {
    state.valid = false;
    state.payload = '';
    state.status = 'invalid';
    showToast(t('err.render'), 'error');
    updateExportState();
    return;
  }

  if (!payload) {
    state.valid = false;
    state.payload = '';
    state.status = 'idle';
    clearPreview();
    updateStatus();
    updateExportState();
    return;
  }

  state.payload = payload;

  const bytes = utf8Bytes(payload);
  const capacity = CAPACITY[customization.getState().ec] || CAPACITY.M;
  state.warnings = [];
  state.status = 'good';

  const custom = customization.getState();

  if (bytes > capacity) {
    state.valid = false;
    state.status = 'invalid';
    state.warnings.push({ kind: 'danger', key: 'err.capacity' });
    markPreviewStale();
    updateStatus();
    updateExportState();
    return;
  }

  const ratio = custom.transparent
    ? null
    : custom.gradient
      ? Math.min(
          contrastRatio(custom.gradientStart, custom.bg) ?? 0,
          contrastRatio(custom.gradientEnd, custom.bg) ?? 0,
        )
      : contrastRatio(custom.fg, custom.bg);

  if (ratio === null) {
    state.warnings.push({ kind: 'warning', key: 'warn.contrastUnknown' });
  } else if (ratio < 4.5) {
    state.warnings.push({ kind: 'warning', key: 'warn.contrast', vars: { ratio: ratio.toFixed(1) } });
    if (ratio < 3) state.status = 'difficult';
    else if (state.status === 'good') state.status = 'review';
  }

  if (custom.logo && custom.logoSize > 20) {
    state.warnings.push({ kind: 'warning', key: 'warn.logoSize' });
    if (state.status === 'good') state.status = 'review';
  }

  if (custom.logo && custom.ec !== 'H') {
    state.warnings.push({ kind: 'warning', key: 'warn.logoEc' });
    if (state.status === 'good') state.status = 'review';
  }

  if (bytes > capacity * WARN_DENSITY_RATIO) {
    state.warnings.push({ kind: 'warning', key: 'warn.density' });
    if (state.status === 'good') state.status = 'review';
  }

  if (state.typeId === 'crypto') {
    state.warnings.push({ kind: 'warning', key: 'warn.crypto' });
  }

  if (state.status !== 'good' && state.warnings.length >= 3) {
    state.status = 'difficult';
  }

  state.valid = true;
  updateStatus();

  if (!state.libraryReady) {
    updateExportState();
    return;
  }

  await renderPreview(payload);
  updateExportState();
}

function renderErrors(type, errors) {
  els.qrForm.querySelectorAll('[aria-invalid="true"]').forEach((el) => el.removeAttribute('aria-invalid'));
  els.qrForm.querySelectorAll('.field-error').forEach((el) => {
    el.hidden = true;
    const text = el.querySelector('span');
    if (text) text.textContent = '';
  });

  if (els.formError) {
    els.formError.hidden = true;
    const text = els.formError.querySelector('span');
    if (text) text.textContent = '';
  }

  let firstInvalid = null;

  Object.entries(errors).forEach(([name, key]) => {
    if (name === '_form') {
      if (els.formError) {
        els.formError.hidden = false;
        const text = els.formError.querySelector('span');
        if (text) text.textContent = t(key);
      }
      return;
    }

    const input = els.qrForm.elements.namedItem(name);
    const error = document.getElementById(`f-${type.id}-${name}-error`);
    if (input) input.setAttribute('aria-invalid', 'true');
    if (error) {
      error.hidden = false;
      const text = error.querySelector('span');
      if (text) text.textContent = t(key);
    }
    if (!firstInvalid && input) firstInvalid = input;
  });

  return firstInvalid;
}

function clearPreview() {
  els.qrFrame.hidden = true;
  els.qrEmpty.hidden = false;
  els.previewError.hidden = true;
  els.qrPreview.replaceChildren();
  els.qrPreview.classList.remove('is-stale');
  els.qrStage.classList.remove('is-transparent');
  els.qrCaption.hidden = true;
  els.qrCaption.textContent = '';
  els.warningsList.replaceChildren();
  updatePreviewMeta();
  renderPayload();
}

function markPreviewStale() {
  els.qrPreview.classList.add('is-stale');
  els.qrFrame.hidden = false;
  els.qrEmpty.hidden = true;
  renderWarnings();
}

function showLibraryError() {
  els.qrFrame.hidden = true;
  els.qrEmpty.hidden = true;
  els.previewError.hidden = false;
  els.qrPreview.replaceChildren();
  updateExportState();
}

async function retryLibrary() {
  els.previewError.hidden = true;
  els.qrEmpty.hidden = false;
  els.qrEmpty.querySelector('.empty-title').textContent = t('status.idle');

  try {
    await ensureLibrary();
    state.libraryReady = true;
    showToast(t('status.good'));
    refresh({ immediate: true });
  } catch {
    state.libraryReady = false;
    showLibraryError();
  }
}

async function renderPreview(payload) {
  const custom = customization.getState();
  const token = ++state.renderToken;

  els.qrStage.setAttribute('aria-busy', 'true');
  els.qrPreview.classList.remove('is-stale');

  try {
    const options = buildQrOptions(custom, payload, custom.size);
    await engine.render(options);

    if (token !== state.renderToken) return;

    els.qrFrame.hidden = false;
    els.qrEmpty.hidden = true;
    els.previewError.hidden = true;

    els.qrFrame.classList.toggle('has-frame', custom.frame);
    els.qrFrame.style.background = custom.frame ? (custom.transparent ? 'transparent' : custom.bg) : 'transparent';
    els.qrFrame.style.borderColor = custom.frame ? custom.fg : 'transparent';

    els.qrStage.classList.toggle('is-transparent', custom.transparent);

    if (custom.caption) {
      els.qrCaption.hidden = false;
      els.qrCaption.textContent = custom.caption;
      els.qrCaption.style.color = custom.captionColor;
      els.qrCaption.style.fontSize = `${custom.captionSize}px`;
    } else {
      els.qrCaption.hidden = true;
      els.qrCaption.textContent = '';
    }

    renderWarnings();
    renderPayload();
    updatePreviewMeta();
  } catch {
    if (token !== state.renderToken) return;
    state.valid = false;
    els.qrFrame.hidden = true;
    els.qrEmpty.hidden = true;
    els.previewError.hidden = false;
    showToast(t('err.render'), 'error');
    updateExportState();
  } finally {
    els.qrStage.removeAttribute('aria-busy');
  }
}

function updateStatus() {
  const badge = els.statusBadge;
  const icon = badge.querySelector('use');

  badge.dataset.state = state.status;

  const labels = {
    good: 'status.good',
    review: 'status.review',
    difficult: 'status.difficult',
    invalid: 'status.invalid',
    idle: 'status.idle',
  };

  els.statusText.textContent = t(labels[state.status] || 'status.idle');

  const icons = {
    good: '#i-check',
    review: '#i-alert',
    difficult: '#i-alert',
    invalid: '#i-alert',
    idle: '#i-info',
  };

  icon?.setAttribute('href', icons[state.status] || '#i-info');

  els.liveStatus.textContent = t('a11y.liveStatus', { status: els.statusText.textContent });
}

function renderWarnings() {
  els.warningsList.replaceChildren();

  state.warnings.forEach((warning) => {
    const item = document.createElement('div');
    item.className = 'warning-item';
    item.dataset.kind = warning.kind === 'danger' ? 'danger' : 'warning';
    item.innerHTML = iconMarkup(warning.kind === 'danger' ? 'alert' : 'info');

    const text = document.createElement('span');
    text.textContent = t(warning.key, warning.vars || {});
    item.append(text);

    els.warningsList.append(item);
  });
}

function renderPayload() {
  if (!state.payload) {
    els.payloadCode.textContent = '—';
    els.copyPayload.disabled = true;
    els.payloadToggle.disabled = true;
    return;
  }

  els.copyPayload.disabled = false;
  els.payloadToggle.disabled = false;

  let display = state.payload;

  if (state.typeId === 'wifi' && !state.revealPayload) {
    display = display.replace(/P:[^;]*/, 'P:••••••');
  }

  if (!state.revealPayload && display.length > 240) {
    display = `${display.slice(0, 240)}…`;
  }

  els.payloadCode.textContent = display;
  els.payloadToggle.setAttribute('aria-pressed', String(state.revealPayload));
  els.payloadToggle.setAttribute('aria-label', t(state.revealPayload ? 'label.hidePayload' : 'label.showPayload'));
  els.payloadToggle.innerHTML = iconMarkup(state.revealPayload ? 'eye-off' : 'eye');
}

function updatePreviewMeta() {
  const type = getType(state.typeId);
  const custom = customization.getState();

  els.previewType.textContent = t(type.labelKey);
  els.metaType.textContent = t(type.labelKey);
  els.previewSize.textContent = `${custom.size} px`;
  els.previewEc.textContent = custom.ec;
  els.qrPreview.setAttribute('aria-label', `${t(type.labelKey)} — ${t('status.' + (state.status === 'idle' ? 'idle' : state.status))}`);
}

/* =========================================================
   Customization changes
   ========================================================= */
function onCustomizationChange(payload) {
  if (payload?.error) {
    showToast(payload.error, 'error');
    return;
  }

  updatePreviewMeta();
  refresh({ immediate: true });
}

/* =========================================================
   Export state
   ========================================================= */
function updateExportState() {
  const ready = state.libraryReady && state.valid && Boolean(state.payload) && state.status !== 'invalid';

  els.downloadPng.disabled = !ready;
  els.downloadSvg.disabled = !ready;
  els.downloadWebp.disabled = !ready || !state.webpSupported;
  els.copyImage.disabled = !ready;
  els.shareBtn.disabled = !ready || !navigator.share;
  els.copyPayload.disabled = !state.payload;
  els.payloadToggle.disabled = !state.payload;

  if (!state.webpSupported) {
    els.downloadWebp.title = t('err.webp');
  } else {
    els.downloadWebp.removeAttribute('title');
  }
}

function getExportSize() {
  if (els.exportSize.value === 'custom') {
    return clamp(Number(els.exportSizeCustom.value) || 1024, 128, 4096);
  }
  return Number(els.exportSize.value) || 1024;
}

async function handleDownload(extension) {
  if (!state.valid || !state.payload) return;

  const button = extension === 'png' ? els.downloadPng : extension === 'svg' ? els.downloadSvg : els.downloadWebp;
  const previous = button.innerHTML;
  button.disabled = true;
  button.setAttribute('aria-busy', 'true');
  button.innerHTML = `${iconMarkup('download')}<span>${escapeHtml(t('status.rendering'))}</span>`;

  try {
    const size = getExportSize();
    const custom = customization.getState();
    const options = buildQrOptions(custom, state.payload, size);

    if (extension === 'svg') {
      const qrBlob = await engine.getRawData('svg', options, size);
      const svgText = await qrBlob.text();
      const output = composeSvg(svgText, custom, size);
      downloadBlob(output, makeFilename(state.typeId, 'svg'));
    } else {
      const qrBlob = await engine.getRawData('png', options, size);
      const output = await composeRaster(qrBlob, custom, size, extension);
      downloadBlob(output, makeFilename(state.typeId, extension));
    }

    showToast(t('toast.downloaded'));
  } catch {
    showToast(t(extension === 'webp' ? 'err.webp' : 'err.download'), 'error');
  } finally {
    button.innerHTML = previous;
    button.removeAttribute('aria-busy');
    updateExportState();
  }
}

async function handleCopyImage() {
  if (!state.valid || !state.payload) return;

  els.copyImage.disabled = true;
  try {
    const size = 1024;
    const custom = customization.getState();
    const options = buildQrOptions(custom, state.payload, size);
    const qrBlob = await engine.getRawData('png', options, size);
    const output = await composeRaster(qrBlob, custom, size, 'png');
    await copyImageBlob(output);
    showToast(t('toast.imageCopied'));
  } catch {
    showToast(t('err.copy'), 'error');
  } finally {
    updateExportState();
  }
}

async function handleShare() {
  if (!state.valid || !state.payload) return;

  els.shareBtn.disabled = true;
  try {
    const size = 1024;
    const custom = customization.getState();
    const options = buildQrOptions(custom, state.payload, size);
    const qrBlob = await engine.getRawData('png', options, size);
    const output = await composeRaster(qrBlob, custom, size, 'png');
    const filename = makeFilename(state.typeId, 'png');
    await shareQr(output, filename, t('app.name'), t('preview.title'));
    showToast(t('toast.shared'));
  } catch (error) {
    if (error?.name !== 'AbortError') showToast(t('err.share'), 'error');
  } finally {
    updateExportState();
  }
}

/* =========================================================
   Reset
   ========================================================= */
function resetGenerator() {
  state.valuesByType[state.typeId] = getDefaultValues(getType(state.typeId));
  state.payload = '';
  state.valid = false;
  state.touched = false;
  state.errors = {};
  state.warnings = [];
  state.status = 'idle';
  state.revealPayload = false;

  customization.reset();
  renderForm({ focus: false });
  clearPreview();
  updateStatus();
  updateExportState();
  showToast(t('toast.reset'));
}

/* =========================================================
   Toast
   ========================================================= */
function showToast(message, kind = 'success') {
  window.clearTimeout(toastTimer);

  els.toastRegion.replaceChildren();
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.dataset.kind = kind;
  toast.textContent = message;
  els.toastRegion.append(toast);

  toastTimer = window.setTimeout(() => {
    toast.remove();
  }, 3200);
}

/* =========================================================
   Theme label update after language change
   ========================================================= */
function updateThemeLabel() {
  const theme = document.documentElement.dataset.theme;
  els.themeToggle.setAttribute('aria-label', t(theme === 'light' ? 'a11y.themeToggleLight' : 'a11y.themeToggle'));
  els.menuToggle.setAttribute('aria-label', t(els.mobileNav.hidden ? 'nav.menu' : 'nav.close'));
  updateFooterYear();
  } 
