export function escapeWifi(value) {
  return String(value).replace(/([\\;,":])/g, '\\$1');
}

export function escapeVCard(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\r\n|\r|\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,');
}

export function escapeICal(value) {
  return String(value)
    .replace(/\\/g, '\\\\')
    .replace(/\r\n|\r|\n/g, '\\n')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,');
}

export function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function utf8Bytes(value) {
  return new TextEncoder().encode(String(value)).length;
}

export function isValidHttpUrl(value) {
  try {
    const url = new URL(String(value).trim());
    return (url.protocol === 'http:' || url.protocol === 'https:') && Boolean(url.hostname);
  } catch {
    return false;
  }
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

export function digitsOnly(value) {
  return String(value).replace(/[^\d]/g, '');
}

export function isValidPhone(value) {
  const digits = digitsOnly(value);
  return digits.length >= 5 && digits.length <= 15;
}

export function isValidTelegramUsername(value) {
  const username = String(value).trim().replace(/^@/, '');
  return /^[a-zA-Z][a-zA-Z0-9_]{3,31}$/.test(username);
}

export function isValidUpiId(value) {
  return /^[a-zA-Z0-9.\-_]{2,}@[a-zA-Z]{2,}$/.test(String(value).trim());
}

export function isValidWalletAddress(network, address) {
  const value = String(address).trim();

  if (network === 'bitcoin') {
    return /^(bc1[a-z0-9]{11,71}|[13][a-km-zA-HJ-NP-Z1-9]{25,34})$/.test(value);
  }

  if (network === 'ethereum') {
    return /^0x[a-fA-F0-9]{40}$/.test(value);
  }

  if (network === 'litecoin') {
    return /^(ltc1[a-z0-9]{11,71}|[LM3][a-km-zA-HJ-NP-Z1-9]{25,34})$/.test(value);
  }

  if (network === 'solana') {
    return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value);
  }

  return /^[A-Za-z0-9:_-]{6,128}$/.test(value);
}

export function hexToRgb(hex) {
  if (!hex || typeof hex !== 'string') return null;
  let value = hex.trim().replace(/^#/, '');

  if (value.length === 3) {
    value = value.split('').map((char) => char + char).join('');
  }

  if (!/^[0-9a-fA-F]{6}$/.test(value)) return null;

  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

export function relativeLuminance({ r, g, b }) {
  const channel = (value) => {
    const v = value / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

export function contrastRatio(foreground, background) {
  const fg = hexToRgb(foreground);
  const bg = hexToRgb(background);
  if (!fg || !bg) return null;

  const l1 = relativeLuminance(fg);
  const l2 = relativeLuminance(bg);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return (lighter + 0.05) / (darker + 0.05);
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function randomId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function toUtcStamp(localDateTime) {
  const date = new Date(localDateTime);
  if (Number.isNaN(date.getTime())) return null;

  return date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}Z$/, 'Z');
}

export function toIsoDate(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export function sanitizeFilenamePart(value) {
  return String(value)
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 48) || 'qr';
}

export function ethAmountToWei(amount) {
  const raw = String(amount).trim();
  if (!/^\d+(\.\d{1,18})?$/.test(raw)) return null;

  const [whole, fraction = ''] = raw.split('.');
  const padded = (fraction + '0'.repeat(18)).slice(0, 18);

  try {
    return (BigInt(whole || '0') * 10n ** 18n + BigInt(padded || '0')).toString();
  } catch {
    return null;
  }
} 
