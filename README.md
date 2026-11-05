<div align="center">
  <img src="https://i.postimg.cc/GmWt2wch/H-blue.webp" alt="QRe Logo" width="120" />

  <h1>QRe — Free QR Code Generator</h1>

  <p>
    <a href="https://readme-typing-svg.demolab.com">
      <img src="https://readme-typing-svg.demolab.com?font=Sora&weight=600&size=22&pause=1000&color=7FD8CB&center=true&vCenter=true&width=600&lines=Create+beautiful+QR+codes+in+seconds.;Local-first+and+privacy-focused.;No+signup,+no+tracking.;Responsive+and+accessible." alt="Typing SVG" />
    </a>
  </p>

  <p>
    <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" alt="Status" />
    <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License" />
    <img src="https://img.shields.io/badge/Privacy-Local--First-brightgreen?style=flat-square" alt="Privacy" />
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript" />
  </p>

  <p>
    A production-ready, local-first QR code generator built with semantic HTML, modern CSS, and vanilla JavaScript ES modules.
  </p>
  
  <p>
    <strong>Live Path:</strong> <a href="https://hajir.is-a.dev/qre/">https://hajir.is-a.dev/qre/</a>
  </p>
</div>

---

## Overview

QRe creates styled QR codes for URLs, text, Wi-Fi, email, phone, SMS, vCard contacts, locations, calendar events, crypto payments, WhatsApp, Telegram, UPI, and raw payloads. All processing occurs entirely within the user's browser. No backend, no uploads, no tracking.

## Key Features

### Generator & Types
- Supports 15 distinct QR types with dedicated forms and correct payload formats.
- Realtime preview with debounced rendering. No flickering during updates.
- Scanability checks including contrast ratio, logo size, quiet zone, density, and capacity warnings.

### Customization
- Foreground and background colors, with optional linear gradients.
- Dot styles, corner frame styles, and corner center styles.
- Adjustable quiet zone, preview size, and error correction levels (L, M, Q, H).
- Center logo upload (automatically raises error correction to H).
- Transparent background, optional frame, and caption text.
- Five built-in presets: Classic, QRe Mint, Midnight Gold, High Contrast, Soft Teal.

### Exports & Sharing
- Download in PNG, SVG, and WEBP (when supported) formats.
- Custom export sizes up to 4096px.
- Copy image to clipboard.
- Copy encoded payload.
- Native Web Share API integration.

### Accessibility & Performance
- Target WCAG 2.2 AA compliance.
- Semantic landmarks, skip links, and keyboard tab navigation.
- Focus management for dialogs and mobile menus.
- ARIA live regions for status updates and error associations.
- 44px minimum touch targets.
- Respects `prefers-reduced-motion`.
- Vanilla JS, no heavy frameworks.

### Privacy & Security
- Zero network requests for user data.
- `localStorage` only stores language, theme, and non-sensitive UI preferences.
- Wi-Fi passwords are masked in the preview until explicitly revealed.
- Uploaded logos are validated by MIME type, size, and decoded safely. SVG logos are rejected to prevent SVG injection.
- Download filenames are sanitized.

---

## Tech Stack

- **HTML5**: Semantic markup, structured JSON-LD metadata.
- **CSS3**: Modern CSS variables, Grid, Flexbox, Container Queries (via media queries), and `color-mix()`.
- **JavaScript**: Vanilla ES modules, `Intl` API for localization.
- **QR Engine**: [qr-code-styling v1.9.2](https://github.com/kozakdenys/qr-code-styling) (loaded via CDN with a fallback).

---

## Local Development

Because the app uses ES modules and fetches the QR library from a CDN, it must be served over HTTP. Opening `index.html` directly via `file://` will not work.

**Using Python:**
```bash
# From the project root
python3 -m http.server 8080
```

Open http://localhost:8080.

Using Node.js:

```bash
npx serve .
# or
npx http-server .
```

---

Deployment

GitHub Pages

1. Push the project to a GitHub repository.
2. Go to Settings > Pages.
3. Set Source to Deploy from a branch, choose main and / (root).
4. If deploying to a custom domain or subpath, update the canonical URL in index.html, robots.txt, and sitemap.xml.

Netlify

1. Drag the project folder into Netlify Drop, or connect the repository.
2. Build command: none.
3. Publish directory: . (project root).

Vercel

1. Import the repository.
2. Framework preset: Other.
3. Build command: leave empty.
4. Output directory: ..

---

Folder Structure

```text
/
├── index.html
├── favicon.svg
├── manifest.webmanifest
├── robots.txt
├── sitemap.xml
├── README.md
├── assets/
│   ├── logo.webp          # Optional local copy
│   └── og-image.webp      # Optional 1200x630 social image
├── css/
│   ├── reset.css
│   ├── tokens.css
│   ├── styles.css
│   └── responsive.css
└── js/
    ├── app.js             # Orchestration, state, form rendering
    ├── qr-engine.js       # QR library loader and wrapper
    ├── form-types.js      # Schemas, validation, payload builders
    ├── customization.js   # Style state, presets, logo upload
    ├── downloads.js       # Export composition, clipboard, share
    ├── i18n.js            # Translations (EN, ID)
    ├── storage.js         # Safe localStorage wrapper
    ├── validation.js      # Escaping, URL/email/crypto validation
    └── icons.js           # SVG sprite and icon markup
```

---

Security and Privacy

· All QR generation is performed locally in the browser. User input is never sent to a server.
· No analytics, tracking scripts, or third-party cookies are included.
· localStorage keys used:
  · qre.lang (language preference)
  · qre.theme (theme preference)
  · qre.ui (last preset, export size, preview size)
· Never persisted: Wi-Fi passwords, crypto keys, contact form contents, captions, and uploaded logos.
· External network requests are strictly limited to:
  · Page assets, CSS, and JS (from your host).
  · Google Fonts (Sora, Inter, JetBrains Mono).
  · The pinned QR library CDN (jsDelivr/unpkg).
  · The hosted logo image.

---

Testing Checklist

Functional

☑ All 15 types generate a valid payload.
☑ URL validation rejects missing protocols.
☑ UTM parameters are only added when checked.
☑ Wi-Fi payload escapes ;, :, ,, ", and \.
☑ Wi-Fi password is masked in the preview.
☑ vCard output format is correct.
☑ Crypto address validation works per network.
☑ Calendar output uses UTC timestamps.
☑ Live preview updates after typing (debounced).
☑ PNG, SVG, and WEBP downloads work.
☑ Copy payload and copy image work with clipboard permissions.
☑ Web Share API is used when available.
☑ Invalid logo type or oversized logo is rejected.

Responsive

☑ 320px: No horizontal overflow. Export buttons stack.
☑ 375px: Tabs scroll horizontally. Preview fits.
☑ 768px: Two-column workspace collapses cleanly.
☑ 1024px: Preview is sticky.
☑ 1440px: Max-width layout is centered.

Accessibility

☑ Keyboard-only navigation works from skip link to footer.
☑ Tabs support ArrowLeft, ArrowRight, Home, and End.
☑ Escape closes the mobile menu and dialog.
☑ Focus ring is visible on all interactive elements.
☑ Every icon button has an accessible name.
☑ Form errors are connected via aria-describedby.
☑ Status changes are announced via aria-live.
☑ Touch targets are at least 44px.

Quality

☑ No console errors on load or during export.
☑ No duplicate IDs.
☑ SVG export can be opened in a vector editor.
☑ QR codes scan with multiple scanner apps.

---

License

MIT License.

· QRe application code: MIT.
· qr-code-styling: MIT.
· Fonts: Sora, Inter, and JetBrains Mono via Google Fonts under their respective licenses.
