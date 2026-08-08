import type { WebDictionary } from "../dictionary";

export const id: WebDictionary = {
  meta: { siteName: "Existcode" },
  nav: {
    home: "Home",
    services: "Jasa",
    pricing: "Harga",
    blog: "Blog",
    news: "News",
    contact: "Kontak"
  },
  rail: {
    overview: "Beranda",
    services: "Jasa",
    pricing: "Harga",
    blog: "Blog",
    news: "News",
    trackOrder: "Lacak Pesanan",
    contact: "Kontak",
    contactUs: "Contact Us",
    whatsapp: "WhatsApp",
    email: "Email",
    phone: "Telepon"
  },
  footer: {
    rights: "PT Existcode Digital Kreasi. Semua hak dilindungi.",
    about: "Tentang Kami",
    contact: "Kontak"
  },
  home: {
    badge: "Mitra Pengembangan Software Anda",
    heroTitle: "Kami Bangun Produk Digital yang Bisnis Anda Butuhkan",
    heroSubtitle:
      "Dari web aplikasi, mobile, hingga infrastruktur cloud — Existcode membantu mewujudkan ide menjadi produk yang siap diandalkan.",
    ctaPricing: "Lihat Harga",
    ctaServices: "Jelajahi Jasa",
    featuredServices: "Layanan Unggulan",
    popularPlan: "Paket Populer",
    latestArticles: "Artikel Terbaru",
    seeAll: "Lihat Semua"
  },
  services: {
    title: "Jasa Kami",
    subtitle: "Solusi digital end-to-end untuk bisnis Anda — dari web, mobile, hingga infrastruktur cloud.",
    loadError: "Gagal memuat daftar jasa. Silakan coba lagi nanti.",
    notFound: "Jasa tidak ditemukan.",
    backToList: "Kembali ke daftar jasa",
    relatedPlans: "Paket Terkait",
    noPlansCta: "Diskusikan Kebutuhan Anda"
  },
  pricing: {
    title: "Harga & Paket",
    subtitle: "Paket transparan sesuai kebutuhan bisnis Anda. Butuh sesuatu yang lebih spesifik? Hubungi kami.",
    loadError: "Gagal memuat daftar harga. Silakan coba lagi nanti.",
    mostPopular: "Paling Populer",
    choosePlan: "Pilih Paket",
    contactUs: "Hubungi Kami",
    oneTime: "sekali bayar",
    perMonth: "/bulan",
    perYear: "/tahun",
    contactPrice: "Hubungi Kami"
  },
  blog: {
    title: "Blog",
    subtitle: "Tips, studi kasus, dan wawasan teknologi dari tim Existcode.",
    categories: "Kategori",
    allArticles: "Semua Artikel",
    noArticles: "Belum ada artikel di kategori ini.",
    loadError: "Gagal memuat artikel.",
    minRead: "menit baca",
    notFound: "Artikel tidak ditemukan.",
    backToList: "Kembali ke Blog",
    by: "Oleh"
  },
  news: {
    title: "News",
    subtitle: "Kabar terbaru seputar Existcode.",
    loadError: "Gagal memuat berita.",
    notFound: "Berita tidak ditemukan.",
    backToList: "Kembali ke News",
    types: {
      announcement: "Pengumuman",
      milestone: "Milestone",
      press: "Press",
      product_update: "Update Produk"
    }
  },
  contact: {
    title: "Kontak",
    subtitle: "Punya proyek atau pertanyaan? Kirim pesan dan tim kami akan segera menghubungi Anda.",
    name: "Nama",
    email: "Email",
    phone: "Telepon",
    phoneOptional: "Telepon (opsional)",
    subject: "Subjek",
    subjectOptional: "Subjek (opsional)",
    message: "Pesan",
    messagePlaceholder: "Ceritakan kebutuhan Anda...",
    submit: "Kirim Pesan",
    sending: "Mengirim...",
    successTitle: "Pesan terkirim",
    successMessage: (name, email) => `Terima kasih, ${name}. Tim kami akan segera menghubungi Anda melalui ${email}.`,
    errorTitle: "Gagal mengirim pesan",
    errorMessage: "Periksa kembali data yang Anda masukkan, lalu coba lagi."
  },
  about: {
    title: "Tentang Kami",
    intro1:
      "Existcode adalah studio pengembangan software yang membantu bisnis membangun produk digital — dari website, aplikasi mobile, hingga infrastruktur cloud. Kami percaya teknologi yang baik lahir dari kolaborasi erat antara tim teknis dan pemahaman mendalam terhadap kebutuhan bisnis klien.",
    intro2:
      "Sejak berdiri, kami telah dipercaya oleh puluhan klien dari berbagai industri untuk mewujudkan ide mereka menjadi produk yang nyata, andal, dan siap tumbuh bersama bisnis mereka.",
    statProjects: "Proyek Selesai",
    statClients: "Klien Puas",
    statYears: "Tahun Berpengalaman",
    statTeam: "Anggota Tim",
    valuesTitle: "Nilai Kami",
    valueTransparentTitle: "Transparan",
    valueTransparentBody: "Komunikasi jujur dan update progres rutin di setiap proyek.",
    valueQualityTitle: "Berkualitas",
    valueQualityBody: "Kode yang bersih, teruji, dan siap diandalkan jangka panjang.",
    valueSustainableTitle: "Berkelanjutan",
    valueSustainableBody: "Dukungan tidak berhenti setelah peluncuran — kami mitra jangka panjang Anda."
  },
  order: {
    title: "Order",
    subtitle:
      "Lengkapi data di bawah untuk memesan paket pilihan Anda. Tim kami akan menghubungi Anda setelah pembayaran dikonfirmasi.",
    plan: "Paket",
    selectPlan: "Pilih paket",
    fullName: "Nama Lengkap",
    email: "Email",
    whatsapp: "Nomor WhatsApp",
    company: "Nama Perusahaan",
    companyOptional: "Nama Perusahaan (opsional)",
    notes: "Catatan Proyek",
    notesOptional: "Catatan Proyek (opsional)",
    notesPlaceholder: "Ceritakan kebutuhan proyek Anda...",
    submit: "Buat Pesanan",
    processing: "Memproses...",
    errorTitle: "Gagal membuat pesanan",
    errorFallback: "Silakan periksa kembali data Anda.",
    summaryTitle: "Ringkasan Pesanan",
    summarySelectPrompt: "Pilih paket untuk melihat ringkasan.",
    total: "Total"
  },
  orderLookup: {
    title: "Lacak Pesanan",
    subtitle: "Masukkan nomor pesanan Anda (format: ORD-XXXXXXXX-XXXXXX) untuk melihat status pembayaran.",
    placeholder: "ORD-20260806-ABC123",
    submit: "Lacak Pesanan"
  },
  payment: {
    title: "Pembayaran",
    orderNumber: "Nomor Pesanan",
    statusUnpaid: "Menunggu Pembayaran",
    statusPaid: "Lunas",
    totalDue: "Total Tagihan",
    dueDate: "Batas waktu pembayaran",
    bankTransfer: "Transfer Bank",
    bankName: "Bank",
    accountNumber: "Nomor Rekening",
    accountHolder: "Atas Nama",
    confirmTitle: "Konfirmasi Pembayaran",
    confirmHint: "Sudah melakukan transfer? Konfirmasikan di bawah ini.",
    confirmNotePlaceholder: "Catatan (opsional): bank & waktu transfer",
    confirmButton: "Konfirmasi Pembayaran",
    confirming: "Memproses...",
    confirmedTitle: "Pembayaran Dikonfirmasi",
    confirmedMessage: "Terima kasih! Tim kami akan segera menghubungi Anda untuk memulai proyek.",
    backHome: "Kembali ke Beranda",
    notFoundTitle: "Pesanan tidak ditemukan",
    trackOther: "Lacak pesanan lain",
    confirmError: "Gagal mengonfirmasi pembayaran. Silakan coba lagi."
  },
  theme: {
    switcherLabel: "Tema",
    modalTitle: "Kustomisasi Tampilan",
    modalSubtitle: "Atur tema, aksen warna, dan layout situs sesuai selera Anda.",
    sectionMode: "Tema Dasar",
    sectionAccent: "Warna Aksen",
    sectionLayout: "Layout Halaman",
    lockedNotice: "Tema situs ini dikunci oleh admin dan tidak dapat diubah.",
    muteOn: "Suara Aktif",
    muteOff: "Suara Mati",
    reset: "Kembalikan Default",
    apply: "Terapkan"
  }
};
