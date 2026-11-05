import { storage } from './storage.js';

const en = {
  'app.name': 'QRe',
  'app.title': 'QRe — Free QR Code Generator',
  'app.description': 'Create custom QR codes for URLs, Wi-Fi, contacts, crypto, and more. Free, private, and processed locally in your browser.',

  'nav.generator': 'Generator',
  'nav.features': 'Features',
  'nav.faq': 'FAQ',
  'nav.menu': 'Open menu',
  'nav.close': 'Close menu',
  'nav.skip': 'Skip to content',
  'brand.home': 'QRe home',
  'brand.logoAlt': 'QRe logo',

  'hero.badge': 'Free · Private · No signup',
  'hero.title': 'Create beautiful QR codes in seconds.',
  'hero.lead': 'Generate, customize, and download QR codes locally in your browser. No account, no uploads, no tracking.',
  'hero.cta': 'Start generating',
  'hero.note': 'Works offline after the library loads. Your data never leaves this device.',

  'generator.title': 'QR code generator',
  'generator.lead': 'Choose a type, fill in the details, and watch your QR code update live.',
  'generator.typeLabel': 'QR code type',

  'panel.customize': 'Customize',
  'custom.summaryHint': 'Colors, shapes, logo, frame',
  'preview.title': 'Live preview',
  'preview.emptyTitle': 'Your QR code will appear here',
  'preview.emptyText': 'Start by choosing a type and entering your content.',
  'preview.errorTitle': 'Preview unavailable',
  'preview.errorText': 'The QR library could not be loaded. Check your connection and try again.',
  'preview.retry': 'Retry',

  'type.url': 'URL / Website',
  'type.text': 'Plain text',
  'type.wifi': 'Wi-Fi',
  'type.email': 'Email',
  'type.phone': 'Phone',
  'type.sms': 'SMS',
  'type.contact': 'Contact',
  'type.location': 'Location',
  'type.calendar': 'Calendar',
  'type.crypto': 'Crypto',
  'type.custom': 'Custom',
  'type.whatsapp': 'WhatsApp',
  'type.telegram': 'Telegram',
  'type.upi': 'UPI',

  'field.url': 'Website URL',
  'field.text': 'Text',
  'field.ssid': 'Network name (SSID)',
  'field.password': 'Password',
  'field.encryption': 'Encryption',
  'field.hidden': 'Hidden network',
  'field.emailTo': 'Recipient email',
  'field.subject': 'Subject',
  'field.body': 'Message',
  'field.phone': 'Phone number',
  'field.message': 'Message',
  'field.firstName': 'First name',
  'field.lastName': 'Last name',
  'field.org': 'Organization',
  'field.jobTitle': 'Job title',
  'field.website': 'Website',
  'field.address': 'Address',
  'field.note': 'Note',
  'field.lat': 'Latitude',
  'field.lng': 'Longitude',
  'field.label': 'Label',
  'field.eventTitle': 'Event title',
  'field.start': 'Start',
  'field.end': 'End',
  'field.location': 'Location',
  'field.description': 'Description',
  'field.network': 'Network',
  'field.wallet': 'Wallet address',
  'field.amount': 'Amount (optional)',
  'field.customPayload': 'Raw payload',
  'field.utmEnabled': 'Add UTM parameters',
  'field.utmSource': 'UTM source',
  'field.utmMedium': 'UTM medium',
  'field.utmCampaign': 'UTM campaign',
  'field.utmContent': 'UTM content',
  'field.username': 'Username',
  'field.upiId': 'UPI ID',
  'field.payeeName': 'Payee name',
  'field.upiNote': 'Note (optional)',

  'ph.url': 'https://example.com',
  'ph.text': 'Write anything…',
  'ph.ssid': 'MyNetwork',
  'ph.password': 'Network password',
  'ph.emailTo': 'name@example.com',
  'ph.subject': 'Hello',
  'ph.body': 'Your message…',
  'ph.phone': '+62 812 3456 7890',
  'ph.message': 'Your message…',
  'ph.firstName': 'Ayu',
  'ph.lastName': 'Lestari',
  'ph.org': 'Company or group',
  'ph.jobTitle': 'Product designer',
  'ph.website': 'https://example.com',
  'ph.address': 'Street, city, country',
  'ph.note': 'Additional details',
  'ph.lat': '-6.2088',
  'ph.lng': '106.8456',
  'ph.label': 'Office, café, meeting point',
  'ph.eventTitle': 'Product launch',
  'ph.location': 'Venue name or address',
  'ph.description': 'What is this event about?',
  'ph.wallet': 'Wallet address',
  'ph.amount': '0.00',
  'ph.customPayload': 'Any text or URI…',
  'ph.utmSource': 'newsletter',
  'ph.utmMedium': 'email',
  'ph.utmCampaign': 'launch',
  'ph.utmContent': 'hero-cta',
  'ph.username': '@username',
  'ph.upiId': 'name@bank',
  'ph.payeeName': 'Ayu Lestari',
  'ph.upiNote': 'Order #1234',

  'help.url': 'Include http:// or https://. The final URL below is exactly what will be encoded.',
  'help.utm': 'UTM parameters are only added when this box is checked.',
  'help.text': 'Shorter content creates a simpler, easier-to-scan QR code.',
  'help.wifiPassword': 'Special characters are escaped automatically.',
  'help.vcard': 'At least a name or organization is required.',
  'help.location': 'Use decimal degrees. Latitude −90 to 90, longitude −180 to 180.',
  'help.calendar': 'Times are converted to UTC so the event works across time zones.',
  'help.crypto': 'Only public wallet addresses are accepted. Never enter a private key or seed phrase.',
  'help.custom': 'Use a standard URI (mailto:, tel:, geo:, etc.) for best scanner support.',
  'help.upi': 'Use a valid UPI ID such as name@bank.',

  'group.url': 'Destination',
  'group.utm': 'Campaign tracking',
  'group.wifi': 'Network details',
  'group.email': 'Email details',
  'group.contact': 'Contact details',
  'group.location': 'Coordinates',
  'group.event': 'Event details',
  'group.crypto': 'Payment details',
  'group.payment': 'Payment details',
  'group.custom': 'Custom payload',

  'option.encWpa': 'WPA / WPA2 / WPA3',
  'option.encWep': 'WEP',
  'option.encNone': 'None (open)',
  'option.btc': 'Bitcoin',
  'option.eth': 'Ethereum',
  'option.ltc': 'Litecoin',
  'option.sol': 'Solana',
  'option.custom': 'Custom',

  'btn.paste': 'Paste',
  'btn.clear': 'Clear',
  'btn.showPassword': 'Show password',
  'btn.hidePassword': 'Hide password',
  'btn.copy': 'Copy',
  'btn.downloadPng': 'Download PNG',
  'btn.downloadSvg': 'Download SVG',
  'btn.downloadWebp': 'Download WEBP',
  'btn.copyImage': 'Copy image',
  'btn.share': 'Share',
  'btn.reset': 'Reset',
  'btn.cancel': 'Cancel',
  'btn.confirmReset': 'Reset generator',
  'btn.clearData': 'Clear local data',
  'btn.removeLogo': 'Remove logo',
  'btn.uploadLogo': 'Upload logo',

  'label.payload': 'Encoded payload',
  'label.showPayload': 'Show payload',
  'label.hidePayload': 'Hide payload',
  'label.type': 'Type',
  'label.previewSize': 'Preview size',
  'label.exportSize': 'Export size',
  'label.ec': 'Error correction',
  'label.finalUrl': 'Final URL',

  'status.good': 'Good to scan',
  'status.review': 'Review recommended',
  'status.difficult': 'Potentially difficult to scan',
  'status.invalid': 'Fix the form to continue',
  'status.idle': 'Waiting for content',

  'warn.contrast': 'Contrast is low ({ratio}:1). Use a darker foreground or lighter background.',
  'warn.contrastUnknown': 'Transparent background: make sure the surface behind the QR is light and plain.',
  'warn.logoSize': 'Logo covers more than 20% of the QR area. Reduce it to keep scanning reliable.',
  'warn.logoEc': 'A logo is active. Error correction H is recommended.',
  'warn.density': 'This payload is dense. Shorten it if scanners struggle.',
  'warn.capacity': 'Payload exceeds the safe capacity for error correction {ec}. Shorten it or lower error correction.',
  'warn.crypto': 'Always verify the wallet address and network before sending funds.',
  'warn.quiet': 'Keep a quiet zone of at least 8 px around the QR code.',

  'err.required': 'This field is required.',
  'err.url': 'Enter a valid URL starting with http:// or https://.',
  'err.email': 'Enter a valid email address.',
  'err.phone': 'Enter a valid phone number.',
  'err.ssid': 'Enter the Wi-Fi network name.',
  'err.wifiPass': 'Enter the Wi-Fi password or choose an open network.',
  'err.contact': 'Enter at least a first name, last name, or organization.',
  'err.website': 'Enter a valid website URL starting with http:// or https://.',
  'err.lat': 'Latitude must be between −90 and 90.',
  'err.lng': 'Longitude must be between −180 and 180.',
  'err.eventTitle': 'Enter an event title.',
  'err.start': 'Choose a start date and time.',
  'err.end': 'Choose an end date and time.',
  'err.endBeforeStart': 'End time must be after the start time.',
  'err.cryptoAddress': 'Enter a valid wallet address for the selected network.',
  'err.amount': 'Enter a valid amount greater than zero.',
  'err.custom': 'Enter a payload to encode.',
  'err.username': 'Enter a Telegram username.',
  'err.upiId': 'Enter a valid UPI ID, such as name@bank.',
  'err.payeeName': 'Enter the payee name.',
  'err.form': 'Please fix the highlighted fields.',
  'err.capacity': 'Payload is too long for this QR code. Shorten it or lower error correction.',
  'err.logoType': 'Use a PNG, JPG, or WEBP image.',
  'err.logoSize': 'Logo is too large. Use an image under 800 KB.',
  'err.logoRead': 'Could not read that image. Try another file.',
  'err.clipboard': 'Clipboard is not available. Please paste manually.',
  'err.copy': 'Could not copy. Your browser may have blocked clipboard access.',
  'err.download': 'Download failed. Please try again.',
  'err.share': 'Sharing is not available in this browser.',
  'err.render': 'The QR code could not be rendered. Try a shorter payload.',
  'err.webp': 'WEBP export is not supported in this browser.',

  'toast.copied': 'Payload copied to clipboard.',
  'toast.imageCopied': 'QR image copied to clipboard.',
  'toast.downloaded': 'Download started.',
  'toast.reset': 'Generator reset.',
  'toast.cleared': 'Local preferences cleared.',
  'toast.ecRaised': 'Error correction raised to H for logo scanning.',
  'toast.logoAdded': 'Logo added.',
  'toast.logoRemoved': 'Logo removed.',
  'toast.shared': 'Share sheet opened.',

  'custom.preset': 'Preset',
  'custom.colors': 'Colors',
  'custom.foreground': 'Foreground',
  'custom.background': 'Background',
  'custom.gradient': 'Use gradient',
  'custom.gradientStart': 'Gradient start',
  'custom.gradientEnd': 'Gradient end',
  'custom.shape': 'Shape',
  'custom.dotStyle': 'Dot style',
  'custom.cornerSquare': 'Corner frame',
  'custom.cornerDot': 'Corner center',
  'custom.quietZone': 'Quiet zone & size',
  'custom.qrSize': 'Preview size',
  'custom.ec': 'Error correction',
  'custom.logo': 'Center logo',
  'custom.logoHint': 'PNG, JPG, or WEBP · max 800 KB',
  'custom.logoSize': 'Logo size',
  'custom.logoMargin': 'Logo margin',
  'custom.transparent': 'Transparent background',
  'custom.frame': 'Frame & caption',
  'custom.caption': 'Caption',
  'custom.captionPlaceholder': 'Scan to open',
  'custom.captionSize': 'Caption size',
  'custom.captionColor': 'Caption color',
  'custom.contrast': 'Contrast',
  'custom.contrastGood': 'Good',
  'custom.contrastReview': 'Review',
  'custom.contrastPoor': 'Low',
  'custom.contrastTransparent': 'Depends on the surface behind the QR',
  'custom.reset': 'Reset style',
  'custom.presetCustom': 'Custom',

  'dot.square': 'Square',
  'dot.rounded': 'Rounded',
  'dot.dots': 'Dots',
  'dot.classy': 'Classy',
  'dot.classyRounded': 'Classy rounded',
  'dot.extraRounded': 'Extra rounded',
  'corner.square': 'Square',
  'corner.dot': 'Dot',
  'corner.extraRounded': 'Extra rounded',
  'ec.L': 'L — 7%',
  'ec.M': 'M — 15%',
  'ec.Q': 'Q — 25%',
  'ec.H': 'H — 30%',

  'preset.classic': 'Classic',
  'preset.mint': 'QRe Mint',
  'preset.midnight': 'Midnight Gold',
  'preset.contrast': 'High Contrast',
  'preset.teal': 'Soft Teal',
  'preset.custom': 'Custom',

  'export.customSize': 'Custom size (px)',
  'export.note': 'Exports include the quiet zone. Test the downloaded code with more than one scanner.',

  'features.title': 'Built for speed, privacy, and real-world scanning.',
  'features.lead': 'Everything you need to create a reliable QR code, without leaving your browser.',
  'features.1.title': 'Local-first privacy',
  'features.1.desc': 'Everything runs in your browser. Your content is never uploaded or logged.',
  'features.2.title': 'Live preview',
  'features.2.desc': 'See every change instantly, with scanability checks that help you avoid fragile codes.',
  'features.3.title': 'Design controls',
  'features.3.desc': 'Colors, gradients, dot shapes, logos, frames, and captions — without leaving the page.',
  'features.4.title': 'Multiple exports',
  'features.4.desc': 'Download crisp PNG, SVG, or WEBP files at the size you need, or copy the image directly.',
  'features.5.title': 'Accessible by default',
  'features.5.desc': 'Keyboard support, visible focus, clear errors, and responsive layouts from 320 px up.',

  'faq.title': 'Questions, answered.',
  'faq.lead': 'Short answers to the things people ask most.',
  'faq.q1': 'Is QRe really free?',
  'faq.a1': 'Yes. QRe is free to use, with no account, watermark, or signup. All QR generation happens locally in your browser.',
  'faq.q2': 'Is my data uploaded anywhere?',
  'faq.a2': 'No. The app does not send your form content to a server. Preferences such as language and theme are stored in localStorage; sensitive fields are not saved.',
  'faq.q3': 'Which QR code types are supported?',
  'faq.a3': 'URL, plain text, Wi-Fi, email, phone, SMS, vCard contact, location, calendar event, crypto payments, WhatsApp, Telegram, UPI, and raw custom payloads.',
  'faq.q4': 'Why does my QR code fail to scan?',
  'faq.a4': 'Low contrast, a large logo, a missing quiet zone, or a very dense payload can all hurt scanning. Use error correction H with a logo, keep the margin, and test with multiple scanner apps.',
  'faq.q5': 'Can I use the exported QR code commercially?',
  'faq.a5': 'Yes. You own the content you generate and can use the exported image in print or digital projects. Make sure you have rights to any logo you upload.',

  'footer.tagline': 'Private, local-first QR codes for the web.',
  'footer.privacy': 'Privacy',
  'footer.terms': 'Terms',
  'footer.source': 'Source & docs',
  'footer.rights': '© {year} QRe. Built for the open web.',
  'footer.privacyNote': 'No accounts. No uploads. No tracking by default.',

  'confirm.resetTitle': 'Reset the generator?',
  'confirm.resetMessage': 'This clears the current form, style, and preview. This cannot be undone.',
  'confirm.clearTitle': 'Clear local preferences?',
  'confirm.clearMessage': 'This removes your saved language, theme, and preset from this browser. Your current session stays open.',

  'a11y.language': 'Language',
  'a11y.themeToggle': 'Switch to light theme',
  'a11y.themeToggleLight': 'Switch to dark theme',
  'a11y.liveStatus': 'Scanability status: {status}',
};

const id = {
  'app.name': 'QRe',
  'app.title': 'QRe — Generator QR Code Gratis',
  'app.description': 'Buat QR code kustom untuk URL, Wi-Fi, kontak, crypto, dan lainnya. Gratis, privat, dan diproses secara lokal di browser Anda.',

  'nav.generator': 'Generator',
  'nav.features': 'Fitur',
  'nav.faq': 'FAQ',
  'nav.menu': 'Buka menu',
  'nav.close': 'Tutup menu',
  'nav.skip': 'Lompat ke konten',
  'brand.home': 'Beranda QRe',
  'brand.logoAlt': 'Logo QRe',

  'hero.badge': 'Gratis · Privat · Tanpa daftar',
  'hero.title': 'Buat QR code yang indah dalam hitungan detik.',
  'hero.lead': 'Buat, kustomisasi, dan unduh QR code secara lokal di browser Anda. Tanpa akun, tanpa unggahan, tanpa pelacakan.',
  'hero.cta': 'Mulai membuat',
  'hero.note': 'Tetap berfungsi setelah library dimuat. Data Anda tidak pernah meninggalkan perangkat ini.',

  'generator.title': 'Generator QR code',
  'generator.lead': 'Pilih tipe, isi detailnya, dan lihat QR code diperbarui secara langsung.',
  'generator.typeLabel': 'Tipe QR code',

  'panel.customize': 'Kustomisasi',
  'custom.summaryHint': 'Warna, bentuk, logo, frame',
  'preview.title': 'Pratinjau langsung',
  'preview.emptyTitle': 'QR code Anda akan muncul di sini',
  'preview.emptyText': 'Mulai dengan memilih tipe dan memasukkan konten Anda.',
  'preview.errorTitle': 'Pratinjau tidak tersedia',
  'preview.errorText': 'Library QR gagal dimuat. Periksa koneksi lalu coba lagi.',
  'preview.retry': 'Coba lagi',

  'type.url': 'URL / Website',
  'type.text': 'Teks biasa',
  'type.wifi': 'Wi-Fi',
  'type.email': 'Email',
  'type.phone': 'Telepon',
  'type.sms': 'SMS',
  'type.contact': 'Kontak',
  'type.location': 'Lokasi',
  'type.calendar': 'Kalender',
  'type.crypto': 'Crypto',
  'type.custom': 'Kustom',
  'type.whatsapp': 'WhatsApp',
  'type.telegram': 'Telegram',
  'type.upi': 'UPI',

  'field.url': 'URL website',
  'field.text': 'Teks',
  'field.ssid': 'Nama jaringan (SSID)',
  'field.password': 'Password',
  'field.encryption': 'Enkripsi',
  'field.hidden': 'Jaringan tersembunyi',
  'field.emailTo': 'Email tujuan',
  'field.subject': 'Subjek',
  'field.body': 'Pesan',
  'field.phone': 'Nomor telepon',
  'field.message': 'Pesan',
  'field.firstName': 'Nama depan',
  'field.lastName': 'Nama belakang',
  'field.org': 'Organisasi',
  'field.jobTitle': 'Jabatan',
  'field.website': 'Website',
  'field.address': 'Alamat',
  'field.note': 'Catatan',
  'field.lat': 'Latitude',
  'field.lng': 'Longitude',
  'field.label': 'Label',
  'field.eventTitle': 'Judul acara',
  'field.start': 'Mulai',
  'field.end': 'Selesai',
  'field.location': 'Lokasi',
  'field.description': 'Deskripsi',
  'field.network': 'Jaringan',
  'field.wallet': 'Alamat wallet',
  'field.amount': 'Jumlah (opsional)',
  'field.customPayload': 'Payload mentah',
  'field.utmEnabled': 'Tambahkan parameter UTM',
  'field.utmSource': 'UTM source',
  'field.utmMedium': 'UTM medium',
  'field.utmCampaign': 'UTM campaign',
  'field.utmContent': 'UTM content',
  'field.username': 'Username',
  'field.upiId': 'ID UPI',
  'field.payeeName': 'Nama penerima',
  'field.upiNote': 'Catatan (opsional)',

  'ph.url': 'https://example.com',
  'ph.text': 'Tulis apa saja…',
  'ph.ssid': 'JaringanSaya',
  'ph.password': 'Password jaringan',
  'ph.emailTo': 'nama@example.com',
  'ph.subject': 'Halo',
  'ph.body': 'Pesan Anda…',
  'ph.phone': '+62 812 3456 7890',
  'ph.message': 'Pesan Anda…',
  'ph.firstName': 'Ayu',
  'ph.lastName': 'Lestari',
  'ph.org': 'Perusahaan atau grup',
  'ph.jobTitle': 'Product designer',
  'ph.website': 'https://example.com',
  'ph.address': 'Jalan, kota, negara',
  'ph.note': 'Detail tambahan',
  'ph.lat': '-6.2088',
  'ph.lng': '106.8456',
  'ph.label': 'Kantor, kafe, titik temu',
  'ph.eventTitle': 'Peluncuran produk',
  'ph.location': 'Nama venue atau alamat',
  'ph.description': 'Acara ini tentang apa?',
  'ph.wallet': 'Alamat wallet',
  'ph.amount': '0.00',
  'ph.customPayload': 'Teks atau URI apa saja…',
  'ph.utmSource': 'newsletter',
  'ph.utmMedium': 'email',
  'ph.utmCampaign': 'peluncuran',
  'ph.utmContent': 'hero-cta',
  'ph.username': '@username',
  'ph.upiId': 'nama@bank',
  'ph.payeeName': 'Ayu Lestari',
  'ph.upiNote': 'Pesanan #1234',

  'help.url': 'Sertakan http:// atau https://. URL final di bawah adalah persis yang akan dienkode.',
  'help.utm': 'Parameter UTM hanya ditambahkan saat kotak ini dicentang.',
  'help.text': 'Konten yang lebih pendek menghasilkan QR code yang lebih sederhana dan mudah dipindai.',
  'help.wifiPassword': 'Karakter khusus di-escape secara otomatis.',
  'help.vcard': 'Minimal nama atau organisasi diperlukan.',
  'help.location': 'Gunakan derajat desimal. Latitude −90 sampai 90, longitude −180 sampai 180.',
  'help.calendar': 'Waktu dikonversi ke UTC agar acara berfungsi lintas zona waktu.',
  'help.crypto': 'Hanya alamat wallet publik yang diterima. Jangan pernah memasukkan private key atau seed phrase.',
  'help.custom': 'Gunakan URI standar (mailto:, tel:, geo:, dll.) untuk kompatibilitas scanner terbaik.',
  'help.upi': 'Gunakan ID UPI yang valid seperti nama@bank.',

  'group.url': 'Tujuan',
  'group.utm': 'Pelacakan kampanye',
  'group.wifi': 'Detail jaringan',
  'group.email': 'Detail email',
  'group.contact': 'Detail kontak',
  'group.location': 'Koordinat',
  'group.event': 'Detail acara',
  'group.crypto': 'Detail pembayaran',
  'group.payment': 'Detail pembayaran',
  'group.custom': 'Payload kustom',

  'option.encWpa': 'WPA / WPA2 / WPA3',
  'option.encWep': 'WEP',
  'option.encNone': 'Tidak ada (terbuka)',
  'option.btc': 'Bitcoin',
  'option.eth': 'Ethereum',
  'option.ltc': 'Litecoin',
  'option.sol': 'Solana',
  'option.custom': 'Kustom',

  'btn.paste': 'Tempel',
  'btn.clear': 'Hapus',
  'btn.showPassword': 'Tampilkan password',
  'btn.hidePassword': 'Sembunyikan password',
  'btn.copy': 'Salin',
  'btn.downloadPng': 'Unduh PNG',
  'btn.downloadSvg': 'Unduh SVG',
  'btn.downloadWebp': 'Unduh WEBP',
  'btn.copyImage': 'Salin gambar',
  'btn.share': 'Bagikan',
  'btn.reset': 'Reset',
  'btn.cancel': 'Batal',
  'btn.confirmReset': 'Reset generator',
  'btn.clearData': 'Hapus data lokal',
  'btn.removeLogo': 'Hapus logo',
  'btn.uploadLogo': 'Unggah logo',

  'label.payload': 'Payload terenkode',
  'label.showPayload': 'Tampilkan payload',
  'label.hidePayload': 'Sembunyikan payload',
  'label.type': 'Tipe',
  'label.previewSize': 'Ukuran pratinjau',
  'label.exportSize': 'Ukuran ekspor',
  'label.ec': 'Error correction',
  'label.finalUrl': 'URL final',

  'status.good': 'Siap dipindai',
  'status.review': 'Perlu ditinjau',
  'status.difficult': 'Berpotensi sulit dipindai',
  'status.invalid': 'Perbaiki form untuk melanjutkan',
  'status.idle': 'Menunggu konten',

  'warn.contrast': 'Kontras rendah ({ratio}:1). Gunakan foreground lebih gelap atau background lebih terang.',
  'warn.contrastUnknown': 'Background transparan: pastikan permukaan di belakang QR terang dan polos.',
  'warn.logoSize': 'Logo menutupi lebih dari 20% area QR. Kecilkan agar pemindaian tetap andal.',
  'warn.logoEc': 'Logo aktif. Error correction H direkomendasikan.',
  'warn.density': 'Payload ini padat. Persingkat jika scanner kesulitan.',
  'warn.capacity': 'Payload melebihi kapasitas aman untuk error correction {ec}. Persingkat atau turunkan error correction.',
  'warn.crypto': 'Selalu verifikasi alamat wallet dan jaringan sebelum mengirim dana.',
  'warn.quiet': 'Pertahankan quiet zone minimal 8 px di sekitar QR code.',

  'err.required': 'Kolom ini wajib diisi.',
  'err.url': 'Masukkan URL yang valid, misalnya https://example.com.',
  'err.email': 'Masukkan alamat email yang valid.',
  'err.phone': 'Masukkan nomor telepon yang valid.',
  'err.ssid': 'Masukkan nama jaringan Wi-Fi.',
  'err.wifiPass': 'Masukkan password Wi-Fi atau pilih jaringan terbuka.',
  'err.contact': 'Masukkan minimal nama depan, nama belakang, atau organisasi.',
  'err.website': 'Masukkan URL website yang valid, dimulai dengan http:// atau https://.',
  'err.lat': 'Latitude harus antara −90 dan 90.',
  'err.lng': 'Longitude harus antara −180 dan 180.',
  'err.eventTitle': 'Masukkan judul acara.',
  'err.start': 'Pilih tanggal dan waktu mulai.',
  'err.end': 'Pilih tanggal dan waktu selesai.',
  'err.endBeforeStart': 'Waktu selesai harus setelah waktu mulai.',
  'err.cryptoAddress': 'Masukkan alamat wallet yang valid untuk jaringan yang dipilih.',
  'err.amount': 'Masukkan jumlah yang valid dan lebih dari nol.',
  'err.custom': 'Masukkan payload yang akan dienkode.',
  'err.username': 'Masukkan username Telegram.',
  'err.upiId': 'Masukkan ID UPI yang valid, misalnya nama@bank.',
  'err.payeeName': 'Masukkan nama penerima.',
  'err.form': 'Perbaiki kolom yang ditandai.',
  'err.capacity': 'Payload terlalu panjang untuk QR code ini. Persingkat atau turunkan error correction.',
  'err.logoType': 'Gunakan gambar PNG, JPG, atau WEBP.',
  'err.logoSize': 'Logo terlalu besar. Gunakan gambar di bawah 800 KB.',
  'err.logoRead': 'Gagal membaca gambar tersebut. Coba file lain.',
  'err.clipboard': 'Clipboard tidak tersedia. Silakan tempel secara manual.',
  'err.copy': 'Gagal menyalin. Browser mungkin memblokir akses clipboard.',
  'err.download': 'Unduhan gagal. Silakan coba lagi.',
  'err.share': 'Fitur berbagi tidak tersedia di browser ini.',
  'err.render': 'QR code gagal dirender. Coba payload yang lebih pendek.',
  'err.webp': 'Ekspor WEBP tidak didukung di browser ini.',

  'toast.copied': 'Payload disalin ke clipboard.',
  'toast.imageCopied': 'Gambar QR disalin ke clipboard.',
  'toast.downloaded': 'Unduhan dimulai.',
  'toast.reset': 'Generator direset.',
  'toast.cleared': 'Preferensi lokal dihapus.',
  'toast.ecRaised': 'Error correction dinaikkan ke H untuk pemindaian logo.',
  'toast.logoAdded': 'Logo ditambahkan.',
  'toast.logoRemoved': 'Logo dihapus.',
  'toast.shared': 'Panel berbagi dibuka.',

  'custom.preset': 'Preset',
  'custom.colors': 'Warna',
  'custom.foreground': 'Foreground',
  'custom.background': 'Background',
  'custom.gradient': 'Gunakan gradien',
  'custom.gradientStart': 'Awal gradien',
  'custom.gradientEnd': 'Akhir gradien',
  'custom.shape': 'Bentuk',
  'custom.dotStyle': 'Gaya titik',
  'custom.cornerSquare': 'Frame sudut',
  'custom.cornerDot': 'Pusat sudut',
  'custom.quietZone': 'Quiet zone & ukuran',
  'custom.qrSize': 'Ukuran pratinjau',
  'custom.ec': 'Error correction',
  'custom.logo': 'Logo tengah',
  'custom.logoHint': 'PNG, JPG, atau WEBP · maks 800 KB',
  'custom.logoSize': 'Ukuran logo',
  'custom.logoMargin': 'Margin logo',
  'custom.transparent': 'Background transparan',
  'custom.frame': 'Frame & caption',
  'custom.caption': 'Caption',
  'custom.captionPlaceholder': 'Pindai untuk membuka',
  'custom.captionSize': 'Ukuran caption',
  'custom.captionColor': 'Warna caption',
  'custom.contrast': 'Kontras',
  'custom.contrastGood': 'Baik',
  'custom.contrastReview': 'Tinjau',
  'custom.contrastPoor': 'Rendah',
  'custom.contrastTransparent': 'Tergantung permukaan di belakang QR',
  'custom.reset': 'Reset gaya',
  'custom.presetCustom': 'Kustom',

  'dot.square': 'Kotak',
  'dot.rounded': 'Membulat',
  'dot.dots': 'Titik',
  'dot.classy': 'Classy',
  'dot.classyRounded': 'Classy membulat',
  'dot.extraRounded': 'Sangat membulat',
  'corner.square': 'Kotak',
  'corner.dot': 'Titik',
  'corner.extraRounded': 'Sangat membulat',
  'ec.L': 'L — 7%',
  'ec.M': 'M — 15%',
  'ec.Q': 'Q — 25%',
  'ec.H': 'H — 30%',

  'preset.classic': 'Classic',
  'preset.mint': 'QRe Mint',
  'preset.midnight': 'Midnight Gold',
  'preset.contrast': 'High Contrast',
  'preset.teal': 'Soft Teal',
  'preset.custom': 'Kustom',

  'export.customSize': 'Ukuran kustom (px)',
  'export.note': 'Ekspor menyertakan quiet zone. Uji kode hasil unduhan dengan lebih dari satu scanner.',

  'features.title': 'Dibuat untuk kecepatan, privasi, dan pemindaian dunia nyata.',
  'features.lead': 'Semua yang Anda butuhkan untuk membuat QR code yang andal, tanpa meninggalkan browser.',
  'features.1.title': 'Privasi local-first',
  'features.1.desc': 'Semuanya berjalan di browser Anda. Konten tidak pernah diunggah atau dicatat.',
  'features.2.title': 'Pratinjau langsung',
  'features.2.desc': 'Lihat setiap perubahan secara instan, dengan pemeriksaan keterpindaian agar kode tidak rapuh.',
  'features.3.title': 'Kontrol desain',
  'features.3.desc': 'Warna, gradien, bentuk titik, logo, frame, dan caption — tanpa meninggalkan halaman.',
  'features.4.title': 'Berbagai format ekspor',
  'features.4.desc': 'Unduh PNG, SVG, atau WEBP tajam sesuai ukuran, atau salin gambarnya langsung.',
  'features.5.title': 'Aksesibel secara default',
  'features.5.desc': 'Dukungan keyboard, fokus terlihat, error jelas, dan layout responsif dari 320 px.',

  'faq.title': 'Pertanyaan, dijawab.',
  'faq.lead': 'Jawaban singkat untuk hal yang paling sering ditanyakan.',
  'faq.q1': 'Apakah QRe benar-benar gratis?',
  'faq.a1': 'Ya. QRe gratis digunakan, tanpa akun, watermark, atau pendaftaran. Semua pembuatan QR terjadi secara lokal di browser Anda.',
  'faq.q2': 'Apakah data saya diunggah ke suatu tempat?',
  'faq.a2': 'Tidak. Aplikasi tidak mengirim konten form Anda ke server. Preferensi seperti bahasa dan tema disimpan di localStorage; kolom sensitif tidak disimpan.',
  'faq.q3': 'Tipe QR code apa saja yang didukung?',
  'faq.a3': 'URL, teks biasa, Wi-Fi, email, telepon, SMS, kontak vCard, lokasi, acara kalender, pembayaran crypto, WhatsApp, Telegram, UPI, dan payload kustom mentah.',
  'faq.q4': 'Mengapa QR code saya gagal dipindai?',
  'faq.a4': 'Kontras rendah, logo terlalu besar, quiet zone hilang, atau payload sangat padat dapat mengganggu pemindaian. Gunakan error correction H dengan logo, pertahankan margin, dan uji dengan beberapa aplikasi scanner.',
  'faq.q5': 'Bisakah saya menggunakan QR code hasil ekspor secara komersial?',
  'faq.a5': 'Ya. Anda memiliki konten yang Anda buat dan dapat menggunakan gambar hasil ekspor dalam proyek cetak atau digital. Pastikan Anda memiliki hak atas logo yang diunggah.',

  'footer.tagline': 'QR code privat dan local-first untuk web.',
  'footer.privacy': 'Privasi',
  'footer.terms': 'Ketentuan',
  'footer.source': 'Sumber & dokumentasi',
  'footer.rights': '© {year} QRe. Dibuat untuk web terbuka.',
  'footer.privacyNote': 'Tanpa akun. Tanpa unggahan. Tanpa pelacakan secara default.',

  'confirm.resetTitle': 'Reset generator?',
  'confirm.resetMessage': 'Ini menghapus form, gaya, dan pratinjau saat ini. Tindakan ini tidak dapat dibatalkan.',
  'confirm.clearTitle': 'Hapus preferensi lokal?',
  'confirm.clearMessage': 'Ini menghapus bahasa, tema, dan preset yang tersimpan dari browser ini. Sesi Anda saat ini tetap terbuka.',

  'a11y.language': 'Bahasa',
  'a11y.themeToggle': 'Ganti ke tema terang',
  'a11y.themeToggleLight': 'Ganti ke tema gelap',
  'a11y.liveStatus': 'Status keterpindaian: {status}',
};

const dictionaries = { en, id };
let currentLang = 'en';

export function getLanguage() {
  return currentLang;
}

export function initLanguage() {
  const stored = storage.get('lang');
  const browser = (navigator.language || 'en').toLowerCase();
  const initial = stored === 'id' || stored === 'en' ? stored : browser.startsWith('id') ? 'id' : 'en';
  setLanguage(initial, { persist: false, translate: false });
  return initial;
}

export function setLanguage(lang, { persist = true, translate = true } = {}) {
  currentLang = lang === 'id' ? 'id' : 'en';
  document.documentElement.lang = currentLang;

  if (persist) storage.set('lang', currentLang);

  if (translate) applyTranslations();
  updateMeta();
}

export function t(key, vars = {}) {
  const dict = dictionaries[currentLang] || en;
  let value = dict[key] ?? en[key] ?? key;

  Object.entries(vars).forEach(([name, replacement]) => {
    value = value.replaceAll(`{${name}}`, String(replacement));
  });

  return value;
}

export function applyTranslations(root = document) {
  root.querySelectorAll('[data-i18n]').forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });

  root.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    el.setAttribute('placeholder', t(el.dataset.i18nPlaceholder));
  });

  root.querySelectorAll('[data-i18n-title]').forEach((el) => {
    el.setAttribute('title', t(el.dataset.i18nTitle));
  });

  root.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
    el.setAttribute('aria-label', t(el.dataset.i18nAriaLabel));
  });

  root.querySelectorAll('[data-i18n-alt]').forEach((el) => {
    el.setAttribute('alt', t(el.dataset.i18nAlt));
  });

  updateFooterYear();
}

export function updateMeta() {
  document.title = t('app.title');

  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute('content', t('app.description'));

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', t('app.title'));

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute('content', t('app.description'));

  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle) twitterTitle.setAttribute('content', t('app.title'));

  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription) twitterDescription.setAttribute('content', t('app.description'));

  updateFooterYear();
}

export function updateFooterYear() {
  const el = document.getElementById('footer-copy');
  if (el) el.textContent = t('footer.rights', { year: new Date().getFullYear() });
}

export function formatNumber(value, options = {}) {
  return new Intl.NumberFormat(currentLang === 'id' ? 'id-ID' : 'en-US', options).format(value);
}

export function formatDate(value, options = {}) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat(currentLang === 'id' ? 'id-ID' : 'en-US', options).format(date);
    } 
