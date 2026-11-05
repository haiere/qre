import { t } from './i18n.js';
import { storage } from './storage.js';
import { clamp, contrastRatio } from './validation.js';

export const DEFAULT_CUSTOMIZATION = {
  fg: '#0A192F',
  bg: '#FFFFFF',
  gradient: false,
  gradientStart: '#0A192F',
  gradientEnd: '#155E75',
  dotStyle: 'square',
  cornerSquare: 'square',
  cornerDot: 'square',
  margin: 20,
  size: 320,
  ec: 'M',
  logo: null,
  logoName: '',
  logoSize: 18,
  logoMargin: 8,
  transparent: false,
  frame: false,
  caption: '',
  captionSize: 14,
  captionColor: '#0A192F',
  preset: 'classic',
};

export const PRESETS = {
  classic: {
    fg: '#0A192F',
    bg: '#FFFFFF',
    gradient: false,
    gradientStart: '#0A192F',
    gradientEnd: '#155E75',
    dotStyle: 'square',
    cornerSquare: 'square',
    cornerDot: 'square',
    margin: 20,
    ec: 'M',
    captionColor: '#0A192F',
  },
  mint: {
    fg: '#0F766E',
    bg: '#F0FDFA',
    gradient: false,
    gradientStart: '#0F766E',
    gradientEnd: '#0E7490',
    dotStyle: 'rounded',
    cornerSquare: 'extra-rounded',
    cornerDot: 'dot',
    margin: 22,
    ec: 'Q',
    captionColor: '#0F766E',
  },
  midnight: {
    fg: '#D4B27A',
    bg: '#0A192F',
    gradient: false,
    gradientStart: '#D4B27A',
    gradientEnd: '#7FD8CB',
    dotStyle: 'classy',
    cornerSquare: 'extra-rounded',
    cornerDot: 'dot',
    margin: 24,
    ec: 'Q',
    captionColor: '#E7EEF6',
  },
  contrast: {
    fg: '#000000',
    bg: '#FFFFFF',
    gradient: false,
    gradientStart: '#000000',
    gradientEnd: '#000000',
    dotStyle: 'square',
    cornerSquare: 'square',
    cornerDot: 'square',
    margin: 24,
    ec: 'H',
    captionColor: '#000000',
  },
  teal: {
    fg: '#134E4A',
    bg: '#CCFBF1',
    gradient: false,
    gradientStart: '#134E4A',
    gradientEnd: '#0F766E',
    dotStyle: 'dots',
    cornerSquare: 'extra-rounded',
    cornerDot: 'dot',
    margin: 22,
    ec: 'Q',
    captionColor: '#134E4A',
  },
};

export function createCustomization(onChange) {
  const state = { ...DEFAULT_CUSTOMIZATION };
  const els = {};
  let ready = false;

  const ids = [
    'preset-select', 'fg-color', 'bg-color', 'fg-value', 'bg-value',
    'gradient-toggle', 'gradient-fields', 'gradient-start', 'gradient-end',
    'dot-style', 'corner-square', 'corner-dot', 'margin-range', 'margin-output',
    'qr-size-range', 'qr-size-output', 'ec-select', 'logo-input', 'logo-preview',
    'logo-preview-img', 'logo-remove', 'logo-size', 'logo-size-output',
    'logo-margin', 'logo-margin-output', 'transparent-toggle', 'frame-toggle',
    'caption-text', 'caption-fields', 'caption-size', 'caption-size-output',
    'caption-color', 'customize-reset', 'clear-data', 'contrast-readout',
  ];

  ids.forEach((id) => {
    els[id] = document.getElementById(id);
  });

  function emit() {
    if (ready) onChange();
  }

  function setPreset(name, { silent = false } = {}) {
    const preset = PRESETS[name];
    if (!preset) return;

    Object.assign(state, preset, { preset: name });
    syncControls();
    if (!silent) emit();
  }

  function loadSavedPreset() {
    const saved = storage.get('ui', {});
    const presetName = saved.preset && PRESETS[saved.preset] ? saved.preset : 'classic';
    setPreset(presetName, { silent: true });
    state.size = clamp(Number(saved.size) || 320, 200, 640);
    syncControls();
  }

  function markCustom() {
    if (state.preset !== 'custom') {
      state.preset = 'custom';
      els['preset-select'].value = 'custom';
    }
  }

  function syncControls() {
    els['preset-select'].value = state.preset;
    els['fg-color'].value = state.fg;
    els['bg-color'].value = state.bg;
    els['fg-value'].textContent = state.fg.toUpperCase();
    els['bg-value'].textContent = state.bg.toUpperCase();
    els['gradient-toggle'].checked = state.gradient;
    els['gradient-fields'].hidden = !state.gradient;
    els['gradient-start'].value = state.gradientStart;
    els['gradient-end'].value = state.gradientEnd;
    els['dot-style'].value = state.dotStyle;
    els['corner-square'].value = state.cornerSquare;
    els['corner-dot'].value = state.cornerDot;
    els['margin-range'].value = String(state.margin);
    els['margin-output'].value = `${state.margin} px`;
    els['qr-size-range'].value = String(state.size);
    els['qr-size-output'].value = `${state.size} px`;
    els['ec-select'].value = state.ec;
    els['logo-size'].value = String(state.logoSize);
    els['logo-size-output'].value = `${state.logoSize}%`;
    els['logo-margin'].value = String(state.logoMargin);
    els['logo-margin-output'].value = `${state.logoMargin} px`;
    els['transparent-toggle'].checked = state.transparent;
    els['frame-toggle'].checked = state.frame;
    els['caption-text'].value = state.caption;
    els['caption-fields'].hidden = !state.caption;
    els['caption-size'].value = String(state.captionSize);
    els['caption-size-output'].value = `${state.captionSize} px`;
    els['caption-color'].value = state.captionColor;

    els['logo-preview'].hidden = !state.logo;
    if (state.logo) {
      els['logo-preview-img'].src = state.logo;
      els['logo-preview-img'].alt = state.logoName || 'Uploaded logo';
    }

    updateContrastReadout();
  }

  function updateContrastReadout() {
    const ratio = state.transparent
      ? null
      : state.gradient
        ? Math.min(
            contrastRatio(state.gradientStart, state.bg) ?? 0,
            contrastRatio(state.gradientEnd, state.bg) ?? 0,
          )
        : contrastRatio(state.fg, state.bg);

    if (ratio === null) {
      els['contrast-readout'].textContent = t('custom.contrastTransparent');
      return;
    }

    const level = ratio >= 4.5 ? t('custom.contrastGood') : ratio >= 3 ? t('custom.contrastReview') : t('custom.contrastPoor');
    els['contrast-readout'].textContent = `${ratio.toFixed(1)}:1 — ${level}`;
  }

  function setLogo(dataUrl, name) {
    state.logo = dataUrl;
    state.logoName = name;
    if (state.ec !== 'H') {
      state.ec = 'H';
      els['ec-select'].value = 'H';
    }
    syncControls();
    emit();
  }

  function clearLogo() {
    state.logo = null;
    state.logoName = '';
    els['logo-input'].value = '';
    syncControls();
    emit();
  }

  function readFileAsDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error('read failed'));
      reader.readAsDataURL(file);
    });
  }

  async function handleLogoFile(file) {
    if (!file) return;

    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      throw new Error(t('err.logoType'));
    }

    if (file.size > 800 * 1024) {
      throw new Error(t('err.logoSize'));
    }

    try {
      if ('createImageBitmap' in window) {
        await createImageBitmap(file);
      }
    } catch {
      throw new Error(t('err.logoRead'));
    }

    let dataUrl;
    try {
      dataUrl = await readFileAsDataUrl(file);
    } catch {
      throw new Error(t('err.logoRead'));
    }

    setLogo(dataUrl, file.name);
  }

  function bind() {
    els['preset-select'].addEventListener('change', (event) => {
      setPreset(event.target.value);
    });

    els['fg-color'].addEventListener('input', (event) => {
      state.fg = event.target.value;
      els['fg-value'].textContent = state.fg.toUpperCase();
      markCustom();
      updateContrastReadout();
      emit();
    });

    els['bg-color'].addEventListener('input', (event) => {
      state.bg = event.target.value;
      els['bg-value'].textContent = state.bg.toUpperCase();
      markCustom();
      updateContrastReadout();
      emit();
    });

    els['gradient-toggle'].addEventListener('change', (event) => {
      state.gradient = event.target.checked;
      els['gradient-fields'].hidden = !state.gradient;
      markCustom();
      updateContrastReadout();
      emit();
    });

    ['gradient-start', 'gradient-end'].forEach((key) => {
      els[key].addEventListener('input', (event) => {
        state[key === 'gradient-start' ? 'gradientStart' : 'gradientEnd'] = event.target.value;
        markCustom();
        updateContrastReadout();
        emit();
      });
    });

    ['dot-style', 'corner-square', 'corner-dot'].forEach((key) => {
      els[key].addEventListener('change', (event) => {
        const prop = key === 'dot-style' ? 'dotStyle' : key === 'corner-square' ? 'cornerSquare' : 'cornerDot';
        state[prop] = event.target.value;
        markCustom();
        emit();
      });
    });

    els['margin-range'].addEventListener('input', (event) => {
      state.margin = clamp(Number(event.target.value), 8, 40);
      els['margin-output'].value = `${state.margin} px`;
      markCustom();
      emit();
    });

    els['qr-size-range'].addEventListener('input', (event) => {
      state.size = clamp(Number(event.target.value), 200, 640);
      els['qr-size-output'].value = `${state.size} px`;
      emit();
    });

    els['ec-select'].addEventListener('change', (event) => {
      state.ec = event.target.value;
      markCustom();
      emit();
    });

    els['logo-input'].addEventListener('change', async (event) => {
      const file = event.target.files?.[0];
      try {
        await handleLogoFile(file);
      } catch (error) {
        event.target.value = '';
        onChange({ error: error.message });
      }
    });

    els['logo-remove'].addEventListener('click', clearLogo);

    els['logo-size'].addEventListener('input', (event) => {
      state.logoSize = clamp(Number(event.target.value), 10, 25);
      els['logo-size-output'].value = `${state.logoSize}%`;
      markCustom();
      emit();
    });

    els['logo-margin'].addEventListener('input', (event) => {
      state.logoMargin = clamp(Number(event.target.value), 0, 20);
      els['logo-margin-output'].value = `${state.logoMargin} px`;
      markCustom();
      emit();
    });

    els['transparent-toggle'].addEventListener('change', (event) => {
      state.transparent = event.target.checked;
      markCustom();
      updateContrastReadout();
      emit();
    });

    els['frame-toggle'].addEventListener('change', (event) => {
      state.frame = event.target.checked;
      markCustom();
      emit();
    });

    els['caption-text'].addEventListener('input', (event) => {
      state.caption = event.target.value;
      els['caption-fields'].hidden = !state.caption;
      markCustom();
      emit();
    });

    els['caption-size'].addEventListener('input', (event) => {
      state.captionSize = clamp(Number(event.target.value), 10, 28);
      els['caption-size-output'].value = `${state.captionSize} px`;
      markCustom();
      emit();
    });

    els['caption-color'].addEventListener('input', (event) => {
      state.captionColor = event.target.value;
      markCustom();
      emit();
    });

    els['customize-reset'].addEventListener('click', () => {
      reset();
    });

    ready = true;
  }

  function reset() {
    Object.assign(state, DEFAULT_CUSTOMIZATION, { preset: 'classic' });
    els['logo-input'].value = '';
    syncControls();
    emit();
  }

  function getState() {
    return { ...state };
  }

  function savePreferences() {
    storage.set('ui', {
      preset: state.preset,
      size: state.size,
    });
  }

  loadSavedPreset();
  bind();
  syncControls();

  return {
    getState,
    setPreset,
    reset,
    savePreferences,
    els,
  };
} 
