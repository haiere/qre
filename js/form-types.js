import {
  digitsOnly,
  escapeICal,
  escapeVCard,
  escapeWifi,
  ethAmountToWei,
  isValidEmail,
  isValidHttpUrl,
  isValidPhone,
  isValidTelegramUsername,
  isValidUpiId,
  isValidWalletAddress,
  randomId,
  toUtcStamp,
} from './validation.js';

const field = (name, type, extra = {}) => ({ name, type, ...extra });

const requiredText = (name, labelKey, extra = {}) =>
  field(name, 'text', { labelKey, required: true, clearable: true, ...extra });

const optionalText = (name, labelKey, extra = {}) =>
  field(name, 'text', { labelKey, clearable: true, ...extra });

const textarea = (name, labelKey, extra = {}) =>
  field(name, 'textarea', { labelKey, rows: 4, ...extra });

export const TYPES = [
  {
    id: 'url',
    icon: 'link',
    labelKey: 'type.url',
    defaults: {
      url: '',
      utmEnabled: false,
      utm_source: '',
      utm_medium: '',
      utm_campaign: '',
      utm_content: '',
    },
    groups: [
      {
        legendKey: 'group.url',
        fields: [
          field('url', 'url', {
            labelKey: 'field.url',
            placeholderKey: 'ph.url',
            helpKey: 'help.url',
            required: true,
            paste: true,
            clearable: true,
            autocomplete: 'url',
            inputmode: 'url',
          }),
        ],
      },
      {
        legendKey: 'group.utm',
        fields: [
          field('utmEnabled', 'checkbox', {
            labelKey: 'field.utmEnabled',
            helpKey: 'help.utm',
          }),
          optionalText('utm_source', 'field.utmSource', {
            placeholderKey: 'ph.utmSource',
            showIf: (v) => v.utmEnabled,
          }),
          optionalText('utm_medium', 'field.utmMedium', {
            placeholderKey: 'ph.utmMedium',
            showIf: (v) => v.utmEnabled,
          }),
          optionalText('utm_campaign', 'field.utmCampaign', {
            placeholderKey: 'ph.utmCampaign',
            showIf: (v) => v.utmEnabled,
          }),
          optionalText('utm_content', 'field.utmContent', {
            placeholderKey: 'ph.utmContent',
            showIf: (v) => v.utmEnabled,
          }),
        ],
      },
    ],
    validate(values) {
      const errors = {};
      if (!values.url.trim()) errors.url = 'err.required';
      else if (!isValidHttpUrl(values.url)) errors.url = 'err.url';
      return { errors };
    },
    build(values) {
      let url;
      try {
        url = new URL(values.url.trim());
      } catch {
        return values.url.trim();
      }

      if (values.utmEnabled) {
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].forEach((key) => {
          const value = values[key]?.trim();
          if (value) url.searchParams.set(key, value);
        });
      }

      return url.toString();
    },
  },

  {
    id: 'text',
    icon: 'text',
    labelKey: 'type.text',
    defaults: { text: '' },
    groups: [
      {
        legendKey: 'group.custom',
        fields: [
          textarea('text', 'field.text', {
            rows: 6,
            placeholderKey: 'ph.text',
            helpKey: 'help.text',
            required: true,
            counter: true,
            warnAt: 800,
          }),
        ],
      },
    ],
    validate(values) {
      const errors = {};
      if (!values.text.trim()) errors.text = 'err.required';
      return { errors };
    },
    build(values) {
      return values.text.trim();
    },
  },

  {
    id: 'wifi',
    icon: 'wifi',
    labelKey: 'type.wifi',
    defaults: { ssid: '', password: '', encryption: 'WPA', hidden: false },
    groups: [
      {
        legendKey: 'group.wifi',
        fields: [
          requiredText('ssid', 'field.ssid', {
            placeholderKey: 'ph.ssid',
            autocomplete: 'off',
          }),
          field('password', 'password', {
            labelKey: 'field.password',
            placeholderKey: 'ph.password',
            helpKey: 'help.wifiPassword',
            autocomplete: 'new-password',
            sensitive: true,
            showIf: (v) => v.encryption !== 'nopass',
          }),
          field('encryption', 'select', {
            labelKey: 'field.encryption',
            options: [
              { value: 'WPA', labelKey: 'option.encWpa' },
              { value: 'WEP', labelKey: 'option.encWep' },
              { value: 'nopass', labelKey: 'option.encNone' },
            ],
          }),
          field('hidden', 'checkbox', { labelKey: 'field.hidden' }),
        ],
      },
    ],
    validate(values) {
      const errors = {};
      if (!values.ssid.trim()) errors.ssid = 'err.ssid';
      if (values.encryption !== 'nopass' && !values.password) {
        errors.password = 'err.wifiPass';
      }
      return { errors };
    },
    build(values) {
      const type = values.encryption === 'nopass' ? 'nopass' : values.encryption;
      let payload = `WIFI:T:${type};S:${escapeWifi(values.ssid)};`;
      if (type !== 'nopass' && values.password) {
        payload += `P:${escapeWifi(values.password)};`;
      }
      if (values.hidden) payload += 'H:true;';
      return payload + ';';
    },
  },

  {
    id: 'email',
    icon: 'mail',
    labelKey: 'type.email',
    defaults: { emailTo: '', subject: '', body: '' },
    groups: [
      {
        legendKey: 'group.email',
        fields: [
          field('emailTo', 'email', {
            labelKey: 'field.emailTo',
            placeholderKey: 'ph.emailTo',
            required: true,
            autocomplete: 'email',
            inputmode: 'email',
            clearable: true,
          }),
          optionalText('subject', 'field.subject', { placeholderKey: 'ph.subject' }),
          textarea('body', 'field.body', {
            placeholderKey: 'ph.body',
            rows: 5,
            counter: true,
            warnAt: 600,
          }),
        ],
      },
    ],
    validate(values) {
      const errors = {};
      if (!values.emailTo.trim()) errors.emailTo = 'err.required';
      else if (!isValidEmail(values.emailTo)) errors.emailTo = 'err.email';
      return { errors };
    },
    build(values) {
      const params = new URLSearchParams();
      if (values.subject.trim()) params.set('subject', values.subject.trim());
      if (values.body.trim()) params.set('body', values.body.trim());
      const query = params.toString();
      return `mailto:${values.emailTo.trim()}${query ? `?${query}` : ''}`;
    },
  },

  {
    id: 'phone',
    icon: 'phone',
    labelKey: 'type.phone',
    defaults: { phone: '' },
    groups: [
      {
        legendKey: 'group.contact',
        fields: [
          field('phone', 'tel', {
            labelKey: 'field.phone',
            placeholderKey: 'ph.phone',
            required: true,
            autocomplete: 'tel',
            inputmode: 'tel',
            paste: true,
            clearable: true,
          }),
        ],
      },
    ],
    validate(values) {
      const errors = {};
      if (!values.phone.trim()) errors.phone = 'err.required';
      else if (!isValidPhone(values.phone)) errors.phone = 'err.phone';
      return { errors };
    },
    build(values) {
      const raw = values.phone.trim().replace(/[^\d+]/g, '');
      return `tel:${raw}`;
    },
  },

  {
    id: 'sms',
    icon: 'message',
    labelKey: 'type.sms',
    defaults: { phone: '', message: '' },
    groups: [
      {
        legendKey: 'group.contact',
        fields: [
          field('phone', 'tel', {
            labelKey: 'field.phone',
            placeholderKey: 'ph.phone',
            required: true,
            autocomplete: 'tel',
            inputmode: 'tel',
            paste: true,
            clearable: true,
          }),
          textarea('message', 'field.message', {
            placeholderKey: 'ph.message',
            rows: 4,
            counter: true,
            warnAt: 600,
          }),
        ],
      },
    ],
    validate(values) {
      const errors = {};
      if (!values.phone.trim()) errors.phone = 'err.required';
      else if (!isValidPhone(values.phone)) errors.phone = 'err.phone';
      return { errors };
    },
    build(values) {
      return `SMSTO:${values.phone.trim()}:${values.message.trim()}`;
    },
  },

  {
    id: 'contact',
    icon: 'contact',
    labelKey: 'type.contact',
    defaults: {
      firstName: '',
      lastName: '',
      org: '',
      jobTitle: '',
      phone: '',
      email: '',
      website: '',
      address: '',
      note: '',
    },
    groups: [
      {
        legendKey: 'group.contact',
        fields: [
          optionalText('firstName', 'field.firstName', {
            placeholderKey: 'ph.firstName',
            autocomplete: 'given-name',
          }),
          optionalText('lastName', 'field.lastName', {
            placeholderKey: 'ph.lastName',
            autocomplete: 'family-name',
          }),
          optionalText('org', 'field.org', {
            placeholderKey: 'ph.org',
            autocomplete: 'organization',
          }),
          optionalText('jobTitle', 'field.jobTitle', {
            placeholderKey: 'ph.jobTitle',
            autocomplete: 'organization-title',
          }),
          field('phone', 'tel', {
            labelKey: 'field.phone',
            placeholderKey: 'ph.phone',
            autocomplete: 'tel',
            inputmode: 'tel',
            paste: true,
            clearable: true,
          }),
          field('email', 'email', {
            labelKey: 'field.emailTo',
            placeholderKey: 'ph.emailTo',
            autocomplete: 'email',
            inputmode: 'email',
            clearable: true,
          }),
          field('website', 'url', {
            labelKey: 'field.website',
            placeholderKey: 'ph.website',
            autocomplete: 'url',
            inputmode: 'url',
            clearable: true,
          }),
          textarea('address', 'field.address', {
            placeholderKey: 'ph.address',
            rows: 2,
            autoComplete: 'street-address',
          }),
          textarea('note', 'field.note', {
            placeholderKey: 'ph.note',
            rows: 3,
            counter: true,
            warnAt: 500,
          }),
        ],
      },
    ],
    validate(values) {
      const errors = {};
      if (!values.firstName.trim() && !values.lastName.trim() && !values.org.trim()) {
        errors._form = 'err.contact';
      }
      if (values.email.trim() && !isValidEmail(values.email)) {
        errors.email = 'err.email';
      }
      if (values.website.trim() && !isValidHttpUrl(values.website)) {
        errors.website = 'err.website';
      }
      return { errors };
    },
    build(values) {
      const first = values.firstName.trim();
      const last = values.lastName.trim();
      const fullName = [first, last].filter(Boolean).join(' ') || values.org.trim();
      const lines = ['BEGIN:VCARD', 'VERSION:3.0', `N:${escapeVCard(last)};${escapeVCard(first)};;;`, `FN:${escapeVCard(fullName)}`];

      if (values.org.trim()) lines.push(`ORG:${escapeVCard(values.org.trim())}`);
      if (values.jobTitle.trim()) lines.push(`TITLE:${escapeVCard(values.jobTitle.trim())}`);
      if (values.phone.trim()) lines.push(`TEL;TYPE=CELL:${escapeVCard(values.phone.trim())}`);
      if (values.email.trim()) lines.push(`EMAIL:${escapeVCard(values.email.trim())}`);
      if (values.website.trim()) lines.push(`URL:${escapeVCard(values.website.trim())}`);
      if (values.address.trim()) lines.push(`ADR;TYPE=WORK:;;${escapeVCard(values.address.trim())};;;;`);
      if (values.note.trim()) lines.push(`NOTE:${escapeVCard(values.note.trim())}`);

      lines.push('END:VCARD');
      return lines.join('\r\n');
    },
  },

  {
    id: 'location',
    icon: 'location',
    labelKey: 'type.location',
    defaults: { lat: '', lng: '', label: '' },
    groups: [
      {
        legendKey: 'group.location',
        fields: [
          field('lat', 'number', {
            labelKey: 'field.lat',
            placeholderKey: 'ph.lat',
            required: true,
            inputmode: 'decimal',
            step: 'any',
            helpKey: 'help.location',
          }),
          field('lng', 'number', {
            labelKey: 'field.lng',
            placeholderKey: 'ph.lng',
            required: true,
            inputmode: 'decimal',
            step: 'any',
          }),
          optionalText('label', 'field.label', { placeholderKey: 'ph.label' }),
        ],
      },
    ],
    validate(values) {
      const errors = {};
      const lat = Number(values.lat);
      const lng = Number(values.lng);

      if (!values.lat.trim()) errors.lat = 'err.required';
      else if (!Number.isFinite(lat) || lat < -90 || lat > 90) errors.lat = 'err.lat';

      if (!values.lng.trim()) errors.lng = 'err.required';
      else if (!Number.isFinite(lng) || lng < -180 || lng > 180) errors.lng = 'err.lng';

      return { errors };
    },
    build(values) {
      const lat = String(values.lat).trim();
      const lng = String(values.lng).trim();
      const label = values.label.trim();
      return label
        ? `geo:${lat},${lng}?q=${lat},${lng}(${encodeURIComponent(label)})`
        : `geo:${lat},${lng}`;
    },
  },

  {
    id: 'calendar',
    icon: 'calendar',
    labelKey: 'type.calendar',
    defaults: { title: '', start: '', end: '', location: '', description: '' },
    groups: [
      {
        legendKey: 'group.event',
        fields: [
          field('title', 'text', {
            labelKey: 'field.eventTitle',
            placeholderKey: 'ph.eventTitle',
            required: true,
            clearable: true,
          }),
          field('start', 'datetime-local', { labelKey: 'field.start', required: true }),
          field('end', 'datetime-local', { labelKey: 'field.end', required: true }),
          optionalText('location', 'field.location', { placeholderKey: 'ph.location' }),
          textarea('description', 'field.description', {
            placeholderKey: 'ph.description',
            rows: 4,
            counter: true,
            warnAt: 600,
          }),
        ],
      },
    ],
    validate(values) {
      const errors = {};
      if (!values.title.trim()) errors.title = 'err.eventTitle';
      if (!values.start) errors.start = 'err.start';
      if (!values.end) errors.end = 'err.end';

      if (values.start && values.end && !errors.start && !errors.end) {
        const start = new Date(values.start);
        const end = new Date(values.end);
        if (Number.isFinite(start.getTime()) && Number.isFinite(end.getTime()) && end <= start) {
          errors.end = 'err.endBeforeStart';
        }
      }

      return { errors };
    },
    build(values) {
      const start = toUtcStamp(values.start);
      const end = toUtcStamp(values.end);
      const stamp = toUtcStamp(new Date().toISOString());
      const uid = `${randomId()}@qre`;
      const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//QRe//QR Code Generator//EN',
        'CALSCALE:GREGORIAN',
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${stamp}`,
        `SUMMARY:${escapeICal(values.title.trim())}`,
        `DTSTART:${start}`,
        `DTEND:${end}`,
      ];

      if (values.location.trim()) lines.push(`LOCATION:${escapeICal(values.location.trim())}`);
      if (values.description.trim()) lines.push(`DESCRIPTION:${escapeICal(values.description.trim())}`);

      lines.push('END:VEVENT', 'END:VCALENDAR');
      return lines.join('\r\n');
    },
  },

  {
    id: 'crypto',
    icon: 'crypto',
    labelKey: 'type.crypto',
    defaults: { network: 'bitcoin', address: '', amount: '', label: '' },
    noticeKey: 'warn.crypto',
    groups: [
      {
        legendKey: 'group.crypto',
        fields: [
          field('network', 'select', {
            labelKey: 'field.network',
            options: [
              { value: 'bitcoin', labelKey: 'option.btc' },
              { value: 'ethereum', labelKey: 'option.eth' },
              { value: 'litecoin', labelKey: 'option.ltc' },
              { value: 'solana', labelKey: 'option.sol' },
              { value: 'custom', labelKey: 'option.custom' },
            ],
          }),
          field('address', 'text', {
            labelKey: 'field.wallet',
            placeholderKey: 'ph.wallet',
            required: true,
            helpKey: 'help.crypto',
            clearable: true,
            mono: true,
          }),
          field('amount', 'number', {
            labelKey: 'field.amount',
            placeholderKey: 'ph.amount',
            inputmode: 'decimal',
            step: 'any',
            min: '0',
          }),
          optionalText('label', 'field.label', { placeholderKey: 'ph.label' }),
        ],
      },
    ],
    validate(values) {
      const errors = {};

      if (!values.address.trim()) errors.address = 'err.required';
      else if (!isValidWalletAddress(values.network, values.address)) {
        errors.address = 'err.cryptoAddress';
      }

      if (values.amount.trim()) {
        const amount = Number(values.amount);
        if (!Number.isFinite(amount) || amount <= 0) errors.amount = 'err.amount';
      }

      return { errors };
    },
    build(values) {
      const network = values.network;
      const address = values.address.trim();
      const amount = values.amount.trim();
      const label = values.label.trim();
      const params = new URLSearchParams();

      if (amount) {
        if (network === 'ethereum') {
          const wei = ethAmountToWei(amount);
          if (wei) params.set('value', wei);
        } else {
          params.set('amount', amount);
        }
      }

      if (label) params.set('label', label);
      const query = params.toString();

      if (network === 'bitcoin') return `bitcoin:${address}${query ? `?${query}` : ''}`;
      if (network === 'ethereum') return `ethereum:${address}${query ? `?${query}` : ''}`;
      if (network === 'litecoin') return `litecoin:${address}${query ? `?${query}` : ''}`;
      if (network === 'solana') return `solana:${address}${query ? `?${query}` : ''}`;

      return `${network}:${address}${query ? `?${query}` : ''}`;
    },
  },

  {
    id: 'custom',
    icon: 'code',
    labelKey: 'type.custom',
    defaults: { payload: '' },
    groups: [
      {
        legendKey: 'group.custom',
        fields: [
          textarea('payload', 'field.customPayload', {
            rows: 8,
            placeholderKey: 'ph.customPayload',
            helpKey: 'help.custom',
            required: true,
            counter: true,
            warnAt: 800,
            mono: true,
          }),
        ],
      },
    ],
    validate(values) {
      const errors = {};
      if (!values.payload.trim()) errors.payload = 'err.custom';
      return { errors };
    },
    build(values) {
      return values.payload.trim();
    },
  },

  {
    id: 'whatsapp',
    icon: 'whatsapp',
    labelKey: 'type.whatsapp',
    defaults: { phone: '', message: '' },
    groups: [
      {
        legendKey: 'group.contact',
        fields: [
          field('phone', 'tel', {
            labelKey: 'field.phone',
            placeholderKey: 'ph.phone',
            required: true,
            inputmode: 'tel',
            paste: true,
            clearable: true,
          }),
          textarea('message', 'field.message', {
            placeholderKey: 'ph.message',
            rows: 4,
            counter: true,
            warnAt: 600,
          }),
        ],
      },
    ],
    validate(values) {
      const errors = {};
      if (!values.phone.trim()) errors.phone = 'err.required';
      else if (digitsOnly(values.phone).length < 7) errors.phone = 'err.phone';
      return { errors };
    },
    build(values) {
      const phone = digitsOnly(values.phone);
      const message = values.message.trim();
      return `https://wa.me/${phone}${message ? `?text=${encodeURIComponent(message)}` : ''}`;
    },
  },

  {
    id: 'telegram',
    icon: 'telegram',
    labelKey: 'type.telegram',
    defaults: { username: '' },
    groups: [
      {
        legendKey: 'group.contact',
        fields: [
          optionalText('username', 'field.username', {
            placeholderKey: 'ph.username',
            required: true,
            autocomplete: 'username',
          }),
        ],
      },
    ],
    validate(values) {
      const errors = {};
      if (!values.username.trim()) errors.username = 'err.required';
      else if (!isValidTelegramUsername(values.username)) errors.username = 'err.username';
      return { errors };
    },
    build(values) {
      return `https://t.me/${values.username.trim().replace(/^@/, '')}`;
    },
  },

  {
    id: 'upi',
    icon: 'upi',
    labelKey: 'type.upi',
    defaults: { pa: '', pn: '', amount: '', note: '' },
    groups: [
      {
        legendKey: 'group.payment',
        fields: [
          optionalText('pa', 'field.upiId', {
            placeholderKey: 'ph.upiId',
            helpKey: 'help.upi',
            required: true,
            autoComplete: 'off',
          }),
          optionalText('pn', 'field.payeeName', {
            placeholderKey: 'ph.payeeName',
            required: true,
          }),
          field('amount', 'number', {
            labelKey: 'field.amount',
            placeholderKey: 'ph.amount',
            inputmode: 'decimal',
            step: 'any',
            min: '0',
          }),
          optionalText('note', 'field.upiNote', { placeholderKey: 'ph.upiNote' }),
        ],
      },
    ],
    validate(values) {
      const errors = {};
      if (!values.pa.trim()) errors.pa = 'err.required';
      else if (!isValidUpiId(values.pa)) errors.pa = 'err.upiId';

      if (!values.pn.trim()) errors.pn = 'err.payeeName';

      if (values.amount.trim()) {
        const amount = Number(values.amount);
        if (!Number.isFinite(amount) || amount <= 0) errors.amount = 'err.amount';
      }

      return { errors };
    },
    build(values) {
      const params = new URLSearchParams();
      params.set('pa', values.pa.trim());
      params.set('pn', values.pn.trim());
      if (values.amount.trim()) params.set('am', values.amount.trim());
      params.set('cu', 'INR');
      if (values.note.trim()) params.set('tn', values.note.trim());
      return `upi://pay?${params.toString()}`;
    },
  },
];

export function getType(id) {
  return TYPES.find((type) => type.id === id) || TYPES[0];
}

export function getDefaultValues(type) {
  return { ...type.defaults };
          }
