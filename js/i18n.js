import { storage } from './storage.js';

const en = {
  'app.name': 'QRe',
  'app.title': 'QRe: Free QR Code Generator',
  'app.description': 'Make custom QR codes for links, Wi-Fi, contacts, crypto, and more. It is free, private, and runs right in your browser.',

  'nav.generator': 'Generator',
  'nav.features': 'Features',
  'nav.faq': 'FAQ',
  'nav.menu': 'Open menu',
  'nav.close': 'Close menu',
  'nav.skip': 'Skip to content',
  'brand.home': 'QRe home',
  'brand.logoAlt': 'QRe logo',

  'hero.title': 'Make beautiful QR codes in seconds.',
  'hero.lead': 'Create, customize, and download QR codes right in your browser. No account, no uploads, no tracking.',
  'hero.cta': 'Start creating',
  'hero.note': 'Keeps working offline once the library loads. Your data never leaves this device.',

  'generator.title': 'QR code generator',
  'generator.lead': 'Pick a type, fill in the details, and watch your QR code update as you type.',
  'generator.typeLabel': 'QR code type',

  'panel.customize': 'Customize',
  'custom.summaryHint': 'Colors, shapes, logo, frame',
  'preview.title': 'Live preview',
  'preview.emptyTitle': 'Your QR code will show up here',
  'preview.emptyText': 'Start by choosing a type and entering your content.',
  'preview.errorTitle': 'Preview unavailable',
  'preview.errorText': 'The QR library could not load. Check your connection and try again.',
  'preview.retry': 'Try again',

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
  'field.customPayload': 'Raw data',
  'field.utmEnabled': 'Add UTM tracking',
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
  'ph.firstName': 'Alex',
  'ph.lastName': 'Morgan',
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
  'ph.payeeName': 'Alex Morgan',
  'ph.upiNote': 'Order #1234',

  'help.url': 'Include http:// or https://. The final link below is exactly what goes into the code.',
  'help.utm': 'UTM tags are added only when this box is checked.',
  'help.text': 'Shorter text makes a simpler code that is easier to scan.',
  'help.wifiPassword': 'Special characters are handled automatically.',
  'help.vcard': 'Enter at least a name or an organization.',
  'help.location': 'Use decimal degrees. Latitude: −90 to 90. Longitude: −180 to 180.',
  'help.calendar': 'Times are converted to UTC so the event works in any time zone.',
  'help.crypto': 'Only public wallet addresses are accepted. Never enter a private key or seed phrase.',
  'help.custom': 'For the best scanner support, use a standard link type like mailto:, tel:, or geo:.',
  'help.upi': 'Use a valid UPI ID, such as name@bank.',

  'group.url': 'Destination',
  'group.utm': 'Campaign tracking',
  'group.wifi': 'Network details',
  'group.email': 'Email details',
  'group.contact': 'Contact details',
  'group.location': 'Coordinates',
  'group.event': 'Event details',
  'group.crypto': 'Payment details',
  'group.payment': 'Payment details',
  'group.custom': 'Custom data',

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

  'label.payload': 'Encoded data',
  'label.showPayload': 'Show data',
  'label.hidePayload': 'Hide data',
  'label.type': 'Type',
  'label.previewSize': 'Preview size',
  'label.exportSize': 'Export size',
  'label.ec': 'Error correction',
  'label.finalUrl': 'Final URL',

  'status.good': 'Ready to scan',
  'status.review': 'Review recommended',
  'status.difficult': 'May be hard to scan',
  'status.invalid': 'Fix the form to continue',
  'status.idle': 'Waiting for content',

  'warn.contrast': 'Contrast is low ({ratio}:1). Use a darker foreground or a lighter background.',
  'warn.contrastUnknown': 'Transparent background: make sure the surface behind the QR code is light and plain.',
  'warn.logoSize': 'The logo covers more than 20% of the QR code. Make it smaller so it still scans well.',
  'warn.logoEc': 'A logo is on. Error correction H is recommended.',
  'warn.density': 'This content is dense. Shorten it if scanners have trouble.',
  'warn.capacity': 'This content is too long for error correction {ec}. Shorten it or lower the error correction.',
  'warn.crypto': 'Always check the wallet address and network before you send funds.',
  'warn.quiet': 'Leave a blank border of at least 8 px around the QR code.',

  'err.required': 'This field is required.',
  'err.url': 'Enter a valid link that starts with http:// or https://.',
  'err.email': 'Enter a valid email address.',
  'err.phone': 'Enter a valid phone number.',
  'err.ssid': 'Enter the Wi-Fi network name.',
  'err.wifiPass': 'Enter the Wi-Fi password, or choose an open network.',
  'err.contact': 'Enter at least a first name, a last name, or an organization.',
  'err.website': 'Enter a valid website address that starts with http:// or https://.',
  'err.lat': 'Latitude must be between −90 and 90.',
  'err.lng': 'Longitude must be between −180 and 180.',
  'err.eventTitle': 'Enter an event title.',
  'err.start': 'Pick a start date and time.',
  'err.end': 'Pick an end date and time.',
  'err.endBeforeStart': 'The end time must come after the start time.',
  'err.cryptoAddress': 'Enter a valid wallet address for the network you picked.',
  'err.amount': 'Enter an amount greater than zero.',
  'err.custom': 'Enter the content you want to encode.',
  'err.username': 'Enter a Telegram username.',
  'err.upiId': 'Enter a valid UPI ID, such as name@bank.',
  'err.payeeName': 'Enter the payee name.',
  'err.form': 'Please check the highlighted fields.',
  'err.capacity': 'This content is too long for this QR code. Shorten it or lower the error correction.',
  'err.logoType': 'Use a PNG, JPG, or WEBP image.',
  'err.logoSize': 'This logo is too large. Use an image under 800 KB.',
  'err.logoRead': 'We could not open that image. Try another file.',
  'err.clipboard': 'Clipboard access is not available. Please paste the content manually.',
  'err.copy': 'Copy failed. Your browser may be blocking clipboard access.',
  'err.download': 'Download failed. Please try again.',
  'err.share': 'Sharing is not supported in this browser.',
  'err.render': 'We could not draw the QR code. Try shorter content.',
  'err.webp': 'WEBP export is not supported in this browser. Try downloading a PNG instead.',

  'toast.copied': 'Content copied to clipboard.',
  'toast.imageCopied': 'QR image copied to clipboard.',
  'toast.downloaded': 'Download started.',
  'toast.reset': 'Generator reset.',
  'toast.cleared': 'Local preferences cleared.',
  'toast.ecRaised': 'Error correction raised to H for better logo scanning.',
  'toast.logoAdded': 'Logo added.',
  'toast.logoRemoved': 'Logo removed.',
  'toast.shared': 'Share panel opened.',

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
  'custom.quietZone': 'Blank border & size',
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
  'custom.contrastReview': 'Check',
  'custom.contrastPoor': 'Low',
  'custom.contrastTransparent': 'Depends on what is behind the QR code',
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
  'ec.L': 'L (7%)',
  'ec.M': 'M (15%)',
  'ec.Q': 'Q (25%)',
  'ec.H': 'H (30%)',

  'preset.classic': 'Classic',
  'preset.mint': 'QRe Mint',
  'preset.midnight': 'Midnight Gold',
  'preset.contrast': 'High Contrast',
  'preset.teal': 'Soft Teal',
  'preset.custom': 'Custom',

  'export.customSize': 'Custom size (px)',
  'export.note': 'Exports include the blank border. Test the downloaded code with more than one scanner app.',

  'features.title': 'Made for speed, privacy, and real-world scanning.',
  'features.lead': 'Everything you need to make a reliable QR code, without leaving your browser.',
  'features.1.title': 'Privacy first',
  'features.1.desc': 'Everything runs in your browser. Your content is never uploaded or logged.',
  'features.2.title': 'Live preview',
  'features.2.desc': 'See every change right away. Built-in checks help you avoid codes that are hard to scan.',
  'features.3.title': 'Design controls',
  'features.3.desc': 'Change colors, gradients, dot shapes, logos, frames, and captions without leaving the page.',
  'features.4.title': 'Multiple export formats',
  'features.4.desc': 'Download sharp PNG, SVG, or WEBP files in the size you need, or copy the image directly.',
  'features.5.title': 'Accessible by default',
  'features.5.desc': 'Works with the keyboard, shows a clear focus outline, gives clear error messages, and fits screens from 320 px wide.',

  'faq.title': 'Common questions, answered.',
  'faq.lead': 'Quick answers to the questions people ask most.',
  'faq.q1': 'Is QRe really free?',
  'faq.a1': 'Yes. QRe is free to use, with no account, watermark, or sign-up. All QR codes are made right in your browser.',
  'faq.q2': 'Is my data uploaded anywhere?',
  'faq.a2': 'No. The app does not send your form content to any server. Settings like language and theme are saved in your browser (localStorage). Sensitive fields are not saved.',
  'faq.q3': 'Which QR code types are supported?',
  'faq.a3': 'Links, plain text, Wi-Fi, email, phone, SMS, vCard contacts, locations, calendar events, crypto payments, WhatsApp, Telegram, UPI, and custom raw data.',
  'faq.q4': 'Why won\'t my QR code scan?',
  'faq.a4': 'Low contrast, a large logo, a missing blank border, or too much content can make a code hard to scan. When you use a logo, choose error correction H, keep the border, and test with a few scanner apps.',
  'faq.q5': 'Can I use exported QR codes commercially?',
  'faq.a5': 'Yes. You own the content you create and can use the exported image in print or digital projects. Make sure you have the rights to any logo you upload.',

  'footer.tagline': 'Private QR codes for the web, made in your browser.',
  'footer.privacy': 'Privacy',
  'footer.terms': 'Terms',
  'footer.source': 'Source & docs',
  'footer.rights': '© {year} QRe. Built for the open web.',
  'footer.privacyNote': 'No accounts. No uploads. No tracking by default.',

  'support.title': 'Support my work',
  'support.note': 'Your donation helps me keep building free tools and experiments for the open web.',

  'confirm.resetTitle': 'Reset the generator?',
  'confirm.resetMessage': 'This clears the current form, style, and preview. This cannot be undone.',
  'confirm.clearTitle': 'Clear local preferences?',
  'confirm.clearMessage': 'This removes your saved language, theme, and preset from this browser. Your current session stays open.',

  'a11y.language': 'Language',
  'a11y.themeToggle': 'Switch to light theme',
  'a11y.themeToggleLight': 'Switch to dark theme',
  'a11y.liveStatus': 'Scan status: {status}',
};

const id = {
  'app.name': 'QRe',
  'app.title': 'QRe: Generator QR Code Gratis',
  'app.description': 'Buat QR code kustom untuk link, Wi-Fi, kontak, crypto, dan lainnya. Gratis, privat, dan berjalan langsung di browser Anda.',

  'nav.generator': 'Generator',
  'nav.features': 'Fitur',
  'nav.faq': 'FAQ',
  'nav.menu': 'Buka menu',
  'nav.close': 'Tutup menu',
  'nav.skip': 'Lewati ke konten',
  'brand.home': 'Beranda QRe',
  'brand.logoAlt': 'Logo QRe',
  
  'hero.title': 'Buat QR code yang cantik dalam hitungan detik.',
  'hero.lead': 'Buat, atur tampilannya, dan unduh QR code langsung di browser Anda. Tanpa akun, tanpa unggahan, tanpa pelacakan.',
  'hero.cta': 'Mulai buat',
  'hero.note': 'Tetap bisa dipakai saat offline setelah library dimuat. Data Anda tidak pernah meninggalkan perangkat ini.',

  'generator.title': 'Generator QR code',
  'generator.lead': 'Pilih jenisnya, isi detailnya, dan lihat QR code berubah setiap kali Anda mengetik.',
  'generator.typeLabel': 'Jenis QR code',

  'panel.customize': 'Atur tampilan',
  'custom.summaryHint': 'Warna, bentuk, logo, bingkai',
  'preview.title': 'Pratinjau langsung',
  'preview.emptyTitle': 'QR code Anda akan muncul di sini',
  'preview.emptyText': 'Mulai dengan memilih jenis dan mengisi konten Anda.',
  'preview.errorTitle': 'Pratinjau tidak tersedia',
  'preview.errorText': 'Library QR gagal dimuat. Periksa koneksi Anda, lalu coba lagi.',
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

  'field.url': 'Alamat website',
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
  'field.customPayload': 'Data mentah',
  'field.utmEnabled': 'Tambahkan pelacakan UTM',
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
  'ph.firstName': 'Alex',
  'ph.lastName': 'Morgan',
  'ph.org': 'Perusahaan atau grup',
  'ph.jobTitle': 'Product designer',
  'ph.website': 'https://example.com',
  'ph.address': 'Jalan, kota, negara',
  'ph.note': 'Detail tambahan',
  'ph.lat': '-6.2088',
  'ph.lng': '106.8456',
  'ph.label': 'Kantor, kafe, titik temu',
  'ph.eventTitle': 'Peluncuran produk',
  'ph.location': 'Nama tempat atau alamat',
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
  'ph.payeeName': 'Alex Morgan',
  'ph.upiNote': 'Pesanan #1234',

  'help.url': 'Sertakan http:// atau https://. Link final di bawah inilah yang akan dimasukkan ke dalam QR code.',
  'help.utm': 'Parameter UTM hanya ditambahkan saat kotak ini dicentang.',
  'help.text': 'Teks yang lebih pendek menghasilkan QR code yang lebih sederhana dan mudah dipindai.',
  'help.wifiPassword': 'Karakter khusus diproses secara otomatis.',
  'help.vcard': 'Isi minimal nama atau organisasi.',
  'help.location': 'Gunakan derajat desimal. Latitude: −90 sampai 90. Longitude: −180 sampai 180.',
  'help.calendar': 'Waktu dikonversi ke UTC agar acara tetap benar di zona waktu mana pun.',
  'help.crypto': 'Hanya alamat wallet publik yang diterima. Jangan pernah memasukkan private key atau seed phrase.',
  'help.custom': 'Agar paling mudah dipindai, gunakan jenis link standar seperti mailto:, tel:, atau geo:.',
  'help.upi': 'Gunakan ID UPI yang valid, misalnya nama@bank.',

  'group.url': 'Tujuan',
  'group.utm': 'Pelacakan kampanye',
  'group.wifi': 'Detail jaringan',
  'group.email': 'Detail email',
  'group.contact': 'Detail kontak',
  'group.location': 'Koordinat',
  'group.event': 'Detail acara',
  'group.crypto': 'Detail pembayaran',
  'group.payment': 'Detail pembayaran',
  'group.custom': 'Data kustom',

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

  'label.payload': 'Data terenkode',
  'label.showPayload': 'Tampilkan data',
  'label.hidePayload': 'Sembunyikan data',
  'label.type': 'Jenis',
  'label.previewSize': 'Ukuran pratinjau',
  'label.exportSize': 'Ukuran ekspor',
  'label.ec': 'Error correction',
  'label.finalUrl': 'Link akhir',

  'status.good': 'Siap dipindai',
  'status.review': 'Perlu ditinjau',
  'status.difficult': 'Mungkin sulit dipindai',
  'status.invalid': 'Perbaiki form untuk melanjutkan',
  'status.idle': 'Menunggu konten',

  'warn.contrast': 'Kontras rendah ({ratio}:1). Gunakan warna depan yang lebih gelap atau latar belakang yang lebih terang.',
  'warn.contrastUnknown': 'Latar belakang transparan: pastikan permukaan di belakang QR code terang dan polos.',
  'warn.logoSize': 'Logo menutupi lebih dari 20% area QR code. Perkecil agar tetap mudah dipindai.',
  'warn.logoEc': 'Logo sedang aktif. Disarankan memakai error correction H.',
  'warn.density': 'Konten ini padat. Persingkat jika scanner kesulitan membacanya.',
  'warn.capacity': 'Konten terlalu panjang untuk error correction {ec}. Persingkat atau turunkan error correction.',
  'warn.crypto': 'Selalu cek alamat wallet dan jaringannya sebelum mengirim dana.',
  'warn.quiet': 'Sisakan area kosong minimal 8 px di sekeliling QR code.',

  'err.required': 'Kolom ini wajib diisi.',
  'err.url': 'Masukkan link yang valid, dimulai dengan http:// atau https://.',
  'err.email': 'Masukkan alamat email yang valid.',
  'err.phone': 'Masukkan nomor telepon yang valid.',
  'err.ssid': 'Masukkan nama jaringan Wi-Fi.',
  'err.wifiPass': 'Masukkan password Wi-Fi, atau pilih jaringan terbuka.',
  'err.contact': 'Isi minimal nama depan, nama belakang, atau organisasi.',
  'err.website': 'Masukkan alamat website yang valid, dimulai dengan http:// atau https://.',
  'err.lat': 'Latitude harus antara −90 dan 90.',
  'err.lng': 'Longitude harus antara −180 dan 180.',
  'err.eventTitle': 'Isi judul acara.',
  'err.start': 'Pilih tanggal dan waktu mulai.',
  'err.end': 'Pilih tanggal dan waktu selesai.',
  'err.endBeforeStart': 'Waktu selesai harus setelah waktu mulai.',
  'err.cryptoAddress': 'Masukkan alamat wallet yang valid untuk jaringan yang dipilih.',
  'err.amount': 'Masukkan jumlah yang lebih dari nol.',
  'err.custom': 'Isi konten yang ingin dikodekan.',
  'err.username': 'Masukkan username Telegram.',
  'err.upiId': 'Masukkan ID UPI yang valid, misalnya nama@bank.',
  'err.payeeName': 'Masukkan nama penerima.',
  'err.form': 'Silakan periksa kolom yang ditandai.',
  'err.capacity': 'Konten ini terlalu panjang untuk QR code ini. Persingkat atau turunkan error correction.',
  'err.logoType': 'Gunakan gambar PNG, JPG, atau WEBP.',
  'err.logoSize': 'Ukuran logo terlalu besar. Gunakan gambar di bawah 800 KB.',
  'err.logoRead': 'Gambar itu tidak bisa dibuka. Coba file lain.',
  'err.clipboard': 'Clipboard tidak tersedia. Silakan tempel kontennya secara manual.',
  'err.copy': 'Gagal menyalin. Browser Anda mungkin memblokir akses clipboard.',
  'err.download': 'Unduhan gagal. Silakan coba lagi.',
  'err.share': 'Fitur berbagi belum didukung di browser ini.',
  'err.render': 'QR code tidak bisa dibuat. Coba konten yang lebih pendek.',
  'err.webp': 'Ekspor WEBP belum didukung di browser ini. Coba unduh PNG.',

  'toast.copied': 'Konten disalin ke clipboard.',
  'toast.imageCopied': 'Gambar QR disalin ke clipboard.',
  'toast.downloaded': 'Unduhan dimulai.',
  'toast.reset': 'Generator sudah direset.',
  'toast.cleared': 'Preferensi lokal dihapus.',
  'toast.ecRaised': 'Error correction dinaikkan ke H agar logo lebih mudah dipindai.',
  'toast.logoAdded': 'Logo ditambahkan.',
  'toast.logoRemoved': 'Logo dihapus.',
  'toast.shared': 'Panel berbagi dibuka.',

  'custom.preset': 'Preset',
  'custom.colors': 'Warna',
  'custom.foreground': 'Warna depan',
  'custom.background': 'Warna latar',
  'custom.gradient': 'Pakai gradien',
  'custom.gradientStart': 'Warna awal gradien',
  'custom.gradientEnd': 'Warna akhir gradien',
  'custom.shape': 'Bentuk',
  'custom.dotStyle': 'Gaya titik',
  'custom.cornerSquare': 'Bingkai sudut',
  'custom.cornerDot': 'Pusat sudut',
  'custom.quietZone': 'Area kosong & ukuran',
  'custom.qrSize': 'Ukuran pratinjau',
  'custom.ec': 'Error correction',
  'custom.logo': 'Logo di tengah',
  'custom.logoHint': 'PNG, JPG, atau WEBP · maks 800 KB',
  'custom.logoSize': 'Ukuran logo',
  'custom.logoMargin': 'Jarak logo',
  'custom.transparent': 'Latar belakang transparan',
  'custom.frame': 'Bingkai & caption',
  'custom.caption': 'Caption',
  'custom.captionPlaceholder': 'Pindai untuk membuka',
  'custom.captionSize': 'Ukuran caption',
  'custom.captionColor': 'Warna caption',
  'custom.contrast': 'Kontras',
  'custom.contrastGood': 'Baik',
  'custom.contrastReview': 'Cek',
  'custom.contrastPoor': 'Rendah',
  'custom.contrastTransparent': 'Bergantung pada permukaan di belakang QR code',
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
  'ec.L': 'L (7%)',
  'ec.M': 'M (15%)',
  'ec.Q': 'Q (25%)',
  'ec.H': 'H (30%)',

  'preset.classic': 'Classic',
  'preset.mint': 'QRe Mint',
  'preset.midnight': 'Midnight Gold',
  'preset.contrast': 'High Contrast',
  'preset.teal': 'Soft Teal',
  'preset.custom': 'Kustom',

  'export.customSize': 'Ukuran kustom (px)',
  'export.note': 'Hasil ekspor sudah menyertakan area kosong. Uji hasil unduhan dengan lebih dari satu aplikasi scanner.',

  'features.title': 'Dibuat untuk kecepatan, privasi, dan pemindaian di dunia nyata.',
  'features.lead': 'Semua yang Anda butuhkan untuk membuat QR code yang andal, tanpa meninggalkan browser.',
  'features.1.title': 'Privasi terjaga',
  'features.1.desc': 'Semuanya berjalan di browser Anda. Konten Anda tidak pernah diunggah atau dicatat.',
  'features.2.title': 'Pratinjau langsung',
  'features.2.desc': 'Lihat setiap perubahan seketika. Pemeriksaan bawaan membantu Anda menghindari kode yang sulit dipindai.',
  'features.3.title': 'Kontrol desain',
  'features.3.desc': 'Atur warna, gradien, bentuk titik, logo, bingkai, dan caption tanpa meninggalkan halaman.',
  'features.4.title': 'Beragam format ekspor',
  'features.4.desc': 'Unduh file PNG, SVG, atau WEBP yang tajam sesuai ukuran yang Anda butuhkan, atau langsung salin gambarnya.',
  'features.5.title': 'Mudah diakses',
  'features.5.desc': 'Bisa dipakai dengan keyboard, fokus terlihat jelas, pesan error mudah dipahami, dan tampilannya menyesuaikan layar mulai dari lebar 320 px.',

  'faq.title': 'Pertanyaan yang sering muncul, dijawab.',
  'faq.lead': 'Jawaban singkat untuk pertanyaan yang paling sering ditanyakan.',
  'faq.q1': 'Apakah QRe benar-benar gratis?',
  'faq.a1': 'Ya. QRe bisa dipakai gratis, tanpa akun, watermark, atau pendaftaran. Semua QR code dibuat langsung di browser Anda.',
  'faq.q2': 'Apakah data saya diunggah ke suatu tempat?',
  'faq.a2': 'Tidak. Aplikasi tidak mengirim isi form Anda ke server mana pun. Preferensi seperti bahasa dan tema disimpan di browser Anda (localStorage). Kolom sensitif tidak disimpan.',
  'faq.q3': 'Jenis QR code apa saja yang didukung?',
  'faq.a3': 'Link, teks biasa, Wi-Fi, email, telepon, SMS, kontak vCard, lokasi, acara kalender, pembayaran crypto, WhatsApp, Telegram, UPI, dan data kustom mentah.',
  'faq.q4': 'Mengapa QR code saya sulit dipindai?',
  'faq.a4': 'Kontras rendah, logo yang terlalu besar, area kosong yang hilang, atau konten yang terlalu padat bisa menyulitkan pemindaian. Saat memakai logo, pilih error correction H, jaga area kosongnya, dan uji dengan beberapa aplikasi scanner.',
  'faq.q5': 'Bisakah saya memakai QR code hasil ekspor untuk keperluan bisnis?',
  'faq.a5': 'Bisa. Konten yang Anda buat adalah milik Anda, dan gambarnya bisa dipakai untuk proyek cetak maupun digital. Pastikan Anda punya hak atas logo yang Anda unggah.',

  'footer.tagline': 'QR code privat untuk web, dibuat langsung di browser Anda.',
  'footer.privacy': 'Privasi',
  'footer.terms': 'Ketentuan',
  'footer.source': 'Sumber & dokumentasi',
  'footer.rights': '© {year} QRe. Dibuat untuk web terbuka.',
  'footer.privacyNote': 'Tanpa akun. Tanpa unggahan. Tanpa pelacakan secara default.',

  'support.title': 'Dukung karya saya',
  'support.note': 'Donasi Anda membantu saya terus membuat alat dan eksperimen gratis untuk web terbuka.',

  'confirm.resetTitle': 'Reset generator?',
  'confirm.resetMessage': 'Ini akan menghapus form, gaya, dan pratinjau saat ini. Tindakan ini tidak bisa dibatalkan.',
  'confirm.clearTitle': 'Hapus preferensi lokal?',
  'confirm.clearMessage': 'Ini akan menghapus bahasa, tema, dan preset yang tersimpan di browser ini. Sesi Anda saat ini tetap terbuka.',

  'a11y.language': 'Bahasa',
  'a11y.themeToggle': 'Ganti ke tema terang',
  'a11y.themeToggleLight': 'Ganti ke tema gelap',
  'a11y.liveStatus': 'Status pemindaian: {status}',
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
  if (Number.isNaN(date.getTime())) return '-';
  return new Intl.DateTimeFormat(currentLang === 'id' ? 'id-ID' : 'en-US', options).format(date);
}
