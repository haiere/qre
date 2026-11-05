const SPRITE = `
<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden" focusable="false">
  <defs>
    <symbol id="i-link" viewBox="0 0 24 24"><path d="M10.5 13.5a4.2 4.2 0 0 0 6 0l2.4-2.4a4.2 4.2 0 0 0-6-6l-1.1 1.1"/><path d="M13.5 10.5a4.2 4.2 0 0 0-6 0l-2.4 2.4a4.2 4.2 0 0 0 6 6l1.1-1.1"/></symbol>
    <symbol id="i-text" viewBox="0 0 24 24"><path d="M4 6h16M4 12h12M4 18h8"/></symbol>
    <symbol id="i-wifi" viewBox="0 0 24 24"><path d="M3 8.5a15 15 0 0 1 18 0"/><path d="M6.5 12.5a10 10 0 0 1 11 0"/><path d="M10 16.5a5 5 0 0 1 4 0"/><circle cx="12" cy="20" r="1"/></symbol>
    <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></symbol>
    <symbol id="i-phone" viewBox="0 0 24 24"><path d="M5 3h4l2 5-2.5 1.5a15 15 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z"/></symbol>
    <symbol id="i-message" viewBox="0 0 24 24"><path d="M21 11.5a8 8 0 0 1-8 8H4l2-3a8 8 0 1 1 15-5Z"/></symbol>
    <symbol id="i-contact" viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/><rect x="3" y="3" width="18" height="18" rx="3"/></symbol>
    <symbol id="i-location" viewBox="0 0 24 24"><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></symbol>
    <symbol id="i-calendar" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M3 10h18"/></symbol>
    <symbol id="i-crypto" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M9 7v10M9 7h4a3 3 0 0 1 0 6H9m0 0h4.5a3 3 0 0 1 0 6H9"/></symbol>
    <symbol id="i-code" viewBox="0 0 24 24"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 5l-2 14"/></symbol>
    <symbol id="i-whatsapp" viewBox="0 0 24 24"><path d="M20 11.5a8 8 0 0 1-11.9 7L3 20l1.4-4.8A8 8 0 1 1 20 11.5Z"/><path d="M8.5 8.5c0 4 3 7 7 7"/></symbol>
    <symbol id="i-telegram" viewBox="0 0 24 24"><path d="m21 4-4 16-5.5-5L8 18l.5-5L21 4Z"/><path d="M8.5 13 21 4"/></symbol>
    <symbol id="i-upi" viewBox="0 0 24 24"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="M2.5 10h19M6 15h4"/></symbol>
    <symbol id="i-copy" viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></symbol>
    <symbol id="i-download" viewBox="0 0 24 24"><path d="M12 3v12m0 0 4-4m-4 4-4-4"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></symbol>
    <symbol id="i-upload" viewBox="0 0 24 24"><path d="M12 16V4m0 0 4 4m-4-4L8 8"/><path d="M4 16v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3"/></symbol>
    <symbol id="i-reset" viewBox="0 0 24 24"><path d="M4 10a8 8 0 1 1 2 6"/><path d="M4 4v6h6"/></symbol>
    <symbol id="i-settings" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.9l.06.06-2 3.46-.09-.02a1.7 1.7 0 0 0-2-.76 1.7 1.7 0 0 0-1 1.56V21h-4v-.1a1.7 1.7 0 0 0-1-1.56 1.7 1.7 0 0 0-2 .76l-.09.02-2-3.46.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-1.56-1H3v-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.34-1.9l-.06-.06 2-3.46.09.02a1.7 1.7 0 0 0 2 .76A1.7 1.7 0 0 0 9.3 2.8V3h4v-.1a1.7 1.7 0 0 0 1-1.56 1.7 1.7 0 0 0 2-.76l.09-.02 2 3.46-.06.06A1.7 1.7 0 0 0 19.4 9a1.7 1.7 0 0 0 1.56 1H21v4h-.1a1.7 1.7 0 0 0-1.5 1Z"/></symbol>
    <symbol id="i-palette" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 0 18h1.5a2 2 0 0 0 1.7-3l-.3-.5a1.5 1.5 0 0 1 1.3-2.3H18a3 3 0 0 0 3-3A9 9 0 0 0 12 3Z"/><circle cx="7.5" cy="10" r="1"/><circle cx="10" cy="6.5" r="1"/><circle cx="15" cy="7" r="1"/></symbol>
    <symbol id="i-eye" viewBox="0 0 24 24"><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/></symbol>
    <symbol id="i-eye-off" viewBox="0 0 24 24"><path d="M3 3l18 18M10.5 6.1A9.5 9.5 0 0 1 12 6c6 0 9.5 6 9.5 6a17 17 0 0 1-3.1 3.9M6.2 6.2C3.8 8 2.5 12 2.5 12S6 18 12 18a9.5 9.5 0 0 0 4.1-.9"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></symbol>
    <symbol id="i-alert" viewBox="0 0 24 24"><path d="M12 3 2.5 20h19L12 3Z"/><path d="M12 9v5M12 17.5v.1"/></symbol>
    <symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.5 3.8 5.7 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.7-3.8-9S9.5 5.5 12 3Z"/></symbol>
    <symbol id="i-sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></symbol>
    <symbol id="i-moon" viewBox="0 0 24 24"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"/></symbol>
    <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></symbol>
    <symbol id="i-close" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></symbol>
    <symbol id="i-chevron-down" viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></symbol>
    <symbol id="i-arrow-right" viewBox="0 0 24 24"><path d="M4 12h16m0 0-6-6m6 6-6 6"/></symbol>
    <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3 5 6v5c0 4.5 3 8.2 7 10 4-1.8 7-5.5 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/></symbol>
    <symbol id="i-zap" viewBox="0 0 24 24"><path d="m13 2-9 12h7l-1 8 9-12h-7l1-8Z"/></symbol>
    <symbol id="i-smartphone" viewBox="0 0 24 24"><rect x="6" y="2.5" width="12" height="19" rx="2.5"/><path d="M10 18.5h4"/></symbol>
    <symbol id="i-image" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m21 15-4.5-4.5L7 20"/></symbol>
    <symbol id="i-share" viewBox="0 0 24 24"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.3M8.2 13.2l7.6 4.3"/></symbol>
    <symbol id="i-trash" viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6"/></symbol>
    <symbol id="i-info" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.1"/></symbol>
    <symbol id="i-lock" viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></symbol>
    <symbol id="i-external" viewBox="0 0 24 24"><path d="M14 4h6v6M20 4l-8 8"/><path d="M19 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4"/></symbol>
  </defs>
</svg>`;

export function mountIcons() {
  if (document.getElementById('qre-icon-sprite')) return;
  const wrapper = document.createElement('div');
  wrapper.id = 'qre-icon-sprite';
  wrapper.innerHTML = SPRITE;
  const svg = wrapper.firstElementChild;
  document.body.prepend(svg);
}

export function iconMarkup(name, className = 'icon') {
  return `<svg class="${className}" aria-hidden="true"><use href="#i-${name}"></use></svg>`;
}
