const CDN_FALLBACKS = [
  'https://cdn.jsdelivr.net/npm/qr-code-styling@1.9.2/lib/qr-code-styling.min.js',
  'https://unpkg.com/qr-code-styling@1.9.2/lib/qr-code-styling.min.js',
];

let libraryPromise = null;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (window.QRCodeStyling) resolve();
      else existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('CDN load failed')), { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('CDN load failed'));
    document.head.append(script);
  });
}

export function ensureLibrary() {
  if (window.QRCodeStyling) return Promise.resolve(window.QRCodeStyling);

  if (libraryPromise) return libraryPromise;

  libraryPromise = (async () => {
    if (document.readyState !== 'complete') {
      await new Promise((resolve) => {
        window.addEventListener('load', resolve, { once: true });
        setTimeout(resolve, 5000);
      });
    }

    if (window.QRCodeStyling) return window.QRCodeStyling;

    for (const src of CDN_FALLBACKS) {
      try {
        await loadScript(src);
        if (window.QRCodeStyling) return window.QRCodeStyling;
      } catch {
        /* try next CDN */
      }
    }

    libraryPromise = null;
    throw new Error('QR library unavailable');
  })();

  return libraryPromise;
}

export function buildQrOptions(customization, payload, size) {
  const gradient = customization.gradient
    ? {
        type: 'linear',
        rotation: Math.PI / 4,
        colorStops: [
          { offset: 0, color: customization.gradientStart },
          { offset: 1, color: customization.gradientEnd },
        ],
      }
    : undefined;

  return {
    width: size,
    height: size,
    data: payload,
    margin: customization.margin,
    qrOptions: {
      typeNumber: 0,
      errorCorrectionLevel: customization.ec,
    },
    dotsOptions: {
      color: customization.fg,
      type: customization.dotStyle,
      ...(gradient ? { gradient } : {}),
    },
    backgroundOptions: {
      color: customization.transparent ? 'rgba(0,0,0,0)' : customization.bg,
    },
    cornersSquareOptions: {
      color: customization.fg,
      type: customization.cornerSquare,
    },
    cornersDotOptions: {
      color: customization.fg,
      type: customization.cornerDot,
    },
    ...(customization.logo
      ? {
          image: customization.logo,
          imageOptions: {
            crossOrigin: 'anonymous',
            margin: customization.logoMargin,
            imageSize: customization.logoSize / 100,
            hideBackgroundDots: true,
          },
        }
      : {}),
  };
}

export class QREngine {
  constructor(container) {
    this.container = container;
    this.instance = null;
    this.logo = null;
  }

  async render(options) {
    const QRCodeStyling = await ensureLibrary();

    const renderOptions = { ...options, type: 'svg' };

    if (!this.instance || this.logo !== (options.image || null)) {
      this.container.replaceChildren();
      this.instance = new QRCodeStyling(renderOptions);
      this.logo = options.image || null;
      this.instance.append(this.container);
      return;
    }

    await this.instance.update(renderOptions);
  }

  async getRawData(extension, options, size) {
    const QRCodeStyling = await ensureLibrary();
    const type = extension === 'svg' ? 'svg' : 'canvas';
    const instance = new QRCodeStyling({ ...options, type, width: size, height: size });
    return instance.getRawData(extension);
  }

  dispose() {
    this.container.replaceChildren();
    this.instance = null;
    this.logo = null;
  }
                    }
