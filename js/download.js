import { escapeXml, sanitizeFilenamePart, toIsoDate } from './validation.js';

export function makeFilename(typeId, extension) {
  return `qre-${sanitizeFilenamePart(typeId)}-${toIsoDate()}.${extension}`;
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = 'noopener';
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function roundedRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function rasterLayout(customization, size) {
  const pad = customization.frame ? Math.round(size * 0.08) : 0;
  const border = customization.frame ? Math.max(2, Math.round(size * 0.008)) : 0;
  const captionFont = customization.caption
    ? Math.max(12, Math.round(customization.captionSize * (size / 320)))
    : 0;
  const captionGap = customization.caption ? Math.round(captionFont * 0.8) : 0;
  const captionHeight = customization.caption ? Math.round(captionFont * 1.6) : 0;
  const width = size + (pad + border) * 2;
  const height = width + captionGap + captionHeight;

  return { pad, border, captionFont, captionGap, captionHeight, width, height };
}

export async function composeRaster(qrBlob, customization, size, format = 'png') {
  await document.fonts.ready;

  const bitmap = await createImageBitmap(qrBlob);
  const layout = rasterLayout(customization, size);
  const canvas = document.createElement('canvas');
  canvas.width = layout.width;
  canvas.height = layout.height;
  const ctx = canvas.getContext('2d');

  if (customization.frame && !customization.transparent) {
    ctx.fillStyle = customization.bg;
    roundedRect(ctx, 0, 0, layout.width, layout.height, Math.round(size * 0.04));
    ctx.fill();

    ctx.strokeStyle = customization.fg;
    ctx.lineWidth = layout.border * 2;
    roundedRect(
      ctx,
      layout.border,
      layout.border,
      layout.width - layout.border * 2,
      layout.height - layout.border * 2,
      Math.round(size * 0.035),
    );
    ctx.stroke();
  }

  ctx.drawImage(
    bitmap,
    layout.pad + layout.border,
    layout.pad + layout.border,
    size,
    size,
  );

  if (customization.caption) {
    ctx.fillStyle = customization.captionColor;
    ctx.font = `600 ${layout.captionFont}px Inter, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(
      customization.caption,
      layout.width / 2,
      layout.width + layout.captionGap + layout.captionHeight / 2,
    );
  }

  bitmap.close?.();

  return new Promise((resolve, reject) => {
    const mime = format === 'webp' ? 'image/webp' : 'image/png';
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas export failed'));
          return;
        }
        if (format === 'webp' && blob.type !== 'image/webp') {
          reject(new Error('WEBP not supported'));
          return;
        }
        resolve(blob);
      },
      mime,
      0.95,
    );
  });
}

export function composeSvg(qrSvgText, customization, size) {
  const layout = rasterLayout(customization, size);
  const encodedQr = encodeURIComponent(qrSvgText);

  const parts = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${layout.width}" height="${layout.height}" viewBox="0 0 ${layout.width} ${layout.height}">`,
  ];

  if (customization.frame && !customization.transparent) {
    parts.push(
      `<rect x="0" y="0" width="${layout.width}" height="${layout.height}" rx="${Math.round(size * 0.04)}" fill="${customization.bg}"/>`,
      `<rect x="${layout.border}" y="${layout.border}" width="${layout.width - layout.border * 2}" height="${layout.height - layout.border * 2}" rx="${Math.round(size * 0.035)}" fill="none" stroke="${customization.fg}" stroke-width="${layout.border * 2}"/>`,
    );
  }

  parts.push(
    `<image x="${layout.pad + layout.border}" y="${layout.pad + layout.border}" width="${size}" height="${size}" href="data:image/svg+xml;charset=utf-8,${encodedQr}"/>`,
  );

  if (customization.caption) {
    parts.push(
      `<text x="${layout.width / 2}" y="${layout.width + layout.captionGap + layout.captionHeight / 2}" text-anchor="middle" dominant-baseline="middle" font-family="Inter, Arial, sans-serif" font-size="${layout.captionFont}" font-weight="600" fill="${customization.captionColor}">${escapeXml(customization.caption)}</text>`,
    );
  }

  parts.push('</svg>');
  return new Blob([parts.join('')], { type: 'image/svg+xml' });
}

export async function copyImageBlob(blob) {
  if (!navigator.clipboard || typeof ClipboardItem === 'undefined') {
    throw new Error('Clipboard image unavailable');
  }

  await navigator.clipboard.write([
    new ClipboardItem({ 'image/png': blob }),
  ]);
}

export async function copyText(value) {
  if (!navigator.clipboard?.writeText) {
    throw new Error('Clipboard unavailable');
  }
  await navigator.clipboard.writeText(value);
}

export async function shareQr(blob, filename, title, text) {
  if (!navigator.share) throw new Error('Share unavailable');

  const file = new File([blob], filename, { type: blob.type || 'image/png' });

  if (navigator.canShare && !navigator.canShare({ files: [file] })) {
    throw new Error('Share unavailable');
  }

  await navigator.share({ files: [file], title, text });
}

export function supportsWebp() {
  try {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL('image/webp').startsWith('data:image/webp');
  } catch {
    return false;
  }
} 
