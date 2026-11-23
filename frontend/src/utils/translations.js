import {
  Home, Newspaper, Building, FileText, Compass, Calendar, MessageSquare
} from 'lucide-react';

export const KABUPATEN_LIST_ID = [
  'Kota Palu', 'Kabupaten Donggala', 'Kabupaten Sigi', 'Kabupaten Parigi Moutong',
  'Kabupaten Poso', 'Kabupaten Morowali', 'Kabupaten Morowali Utara', 'Kabupaten Tojo Una-Una',
  'Kabupaten Banggai', 'Kabupaten Banggai Kepulauan', 'Kabupaten Banggai Laut',
  'Kabupaten Tolitoli', 'Kabupaten Buol',
];

export const KABUPATEN_LIST_EN = [
  'Palu City', 'Donggala Regency', 'Sigi Regency', 'Parigi Moutong Regency',
  'Poso Regency', 'Morowali Regency', 'North Morowali Regency', 'Tojo Una-Una Regency',
  'Banggai Regency', 'Banggai Islands Regency', 'Banggai Laut Regency',
  'Tolitoli Regency', 'Buol Regency',
];

export const slugify = (str) =>
  str.toLowerCase().replace(/kabupaten |kota | regency| city/g, '').replace(/\s+/g, '-');

export const getNavMenus = (language = 'ID', withIcons = false) => {
  const isEn = language === 'EN';

  const kabupatenItems = (basePath) =>
    KABUPATEN_LIST_ID.map((kab, idx) => ({
      label: isEn ? KABUPATEN_LIST_EN[idx] : kab,
      path: `${basePath}/${slugify(kab)}`,
    }));

  return [
    {
      label: isEn ? 'Home' : 'Home',
      path: '/',
      ...(withIcons ? { icon: Home } : {}),
    },
    {
      label: isEn ? 'News' : 'Berita',
      path: '/berita',
      ...(withIcons ? { icon: Newspaper } : {}),
    },
    {
      label: isEn ? 'Profile' : 'Profil',
      ...(withIcons ? { icon: Building } : {}),
      children: [
        { label: isEn ? 'History' : 'Sejarah', path: '/profil/sejarah' },
        { label: isEn ? 'Vision and Mission' : 'Visi dan Misi', path: '/profil/visi-misi' },
        { label: isEn ? 'Leadership Profile' : 'Profil Pimpinan', path: '/profil/profil-pimpinan' },
        { label: isEn ? 'Duties and Functions' : 'Tupoksi', path: '/profil/tupoksi' },
        { label: isEn ? 'Magazine' : 'Majalah', path: '/profil/majalah' },
        { label: isEn ? 'Logo' : 'Logo', path: '/profil/logo' },
        { label: isEn ? 'Contact Us' : 'Hubungi Kami', path: '/profil/hubungi-kami' },
      ],
    },
    {
      label: isEn ? 'Public Information' : 'Informasi Publik',
      ...(withIcons ? { icon: FileText } : {}),
      children: [
        {
          label: 'PPID',
          children: [
            {
              label: isEn ? 'Profile' : 'Profil',
              children: [
                { label: isEn ? 'PPID Organizational Structure' : 'Struktur Organisasi PPID', path: '/ppid/profil/struktur-organisasi' },
                { label: isEn ? 'Vision and Mission' : 'Visi dan Misi', path: '/ppid/profil/visi-misi' },
                { label: isEn ? 'Public Information Service Notice' : 'Maklumat Pelayanan Informasi Publik', path: '/ppid/profil/maklumat-pelayanan' },
                { label: isEn ? 'Duties of PPID & Executive PPID' : 'Tugas PPID dan PPID Pelaksana', path: '/ppid/profil/tugas-ppid' },
              ],
            },
            { label: isEn ? 'Public Documents' : 'Dokumen Publik', path: '/ppid/daftar-informasi-publik' },
            { label: isEn ? 'PPID Annual Report' : 'Laporan Tahunan PPID', path: '/ppid/laporan-tahunan' },
            {
              label: isEn ? 'Public Services' : 'Layanan Publik',
              children: [
                { label: isEn ? 'Information Request Form' : 'Form Permohonan Informasi', path: '/ppid/layanan-publik/form-permohonan' },
                { label: isEn ? 'Objection Submission Form' : 'Form Pengajuan Keberatan', path: '/ppid/layanan-publik/form-keberatan' },
                { label: isEn ? 'Complaint Procedure' : 'Prosedur Pengaduan', path: '/ppid/layanan-publik/prosedur-pengaduan' },
                { label: isEn ? 'Public Service Survey' : 'Survey Penilaian Layanan Informasi Publik', path: '/ppid/layanan-publik/survey-kepuasan' },
                { label: isEn ? 'Public Service Regulations' : 'Regulasi Layanan Publik', path: '/ppid/layanan-publik/regulasi' },
              ],
            },
            { label: isEn ? 'Decrees' : 'Surat Keputusan', path: '/ppid/surat-keputusan' },
            { label: isEn ? 'Public Service Standards' : 'Standar Pelayanan Publik', path: '/ppid/standar-pelayanan' },
          ],
        },
        {
          label: isEn ? 'Periodic Information' : 'Informasi Secara Berkala',
          path: '/ppid/informasi-secara-berkala',
          children: [
            {
              label: isEn ? 'Personnel Data' : 'Data Kepegawaian',
              path: '/ppid/informasi-secara-berkala?kategori=data-kepegawaian',
              children: [
                { label: isEn ? 'Organizational Structure' : 'Struktur Organisasi', path: '/ppid/informasi-secara-berkala?kategori=data-kepegawaian&sub=struktur-organisasi' },
                { label: isEn ? 'List of Officials' : 'Daftar Pejabat', path: '/ppid/informasi-secara-berkala?kategori=data-kepegawaian&sub=daftar-pejabat' },
                { label: isEn ? 'Rank List (DUK)' : 'DUK', path: '/ppid/informasi-secara-berkala?kategori=data-kepegawaian&sub=duk' },
                { label: isEn ? 'State Officials Wealth Report (LHKPN)' : 'LHKPN', path: '/ppid/informasi-secara-berkala?kategori=data-kepegawaian&sub=lhkpn' },
                { label: isEn ? 'Civil Servant CV' : 'Daftar Riwayat Hidup ASN', path: '/ppid/informasi-secara-berkala?kategori=data-kepegawaian&sub=daftar-riwayat-hidup-asn' },
                { label: isEn ? 'Public Satisfaction Index' : 'Indeks Kepuasan Masyarakat', path: '/ppid/informasi-secara-berkala?kategori=data-kepegawaian&sub=indeks-kepuasan-masyarakat' },
                { label: isEn ? 'Service Standards' : 'Standar Pelayanan', path: '/ppid/informasi-secara-berkala?kategori=data-kepegawaian&sub=standar-pelayanan' },
                { label: isEn ? 'Electronic Signature Certificate' : 'Surat Keterangan Tanda Tangan Elektronik', path: '/ppid/informasi-secara-berkala?kategori=data-kepegawaian&sub=surat-keterangan-tanda-tangan-elektronik' },
                { label: isEn ? 'Job Evaluation' : 'Evaluasi Jabatan', path: '/ppid/informasi-secara-berkala?kategori=data-kepegawaian&sub=evaluasi-jabatan' },
                { label: isEn ? 'Standard Operating Procedures (SOP)' : 'Standar Operasional Prosedur (SOP)', path: '/ppid/informasi-secara-berkala?kategori=data-kepegawaian&sub=standar-operasional-prosedur-sop' },
                { label: isEn ? 'Job Map' : 'Peta Jabatan', path: '/ppid/informasi-secara-berkala?kategori=data-kepegawaian&sub=peta-jabatan' },
                { label: isEn ? 'Public Consultation Forum Report' : 'Laporan Hasil Forum Konsultasi Publik (FKP)', path: '/ppid/informasi-secara-berkala?kategori=data-kepegawaian&sub=laporan-hasil-forum-konsultasi-publik-fkp' },
                { label: isEn ? 'Leadership Agenda' : 'Agenda Pimpinan', path: '/ppid/informasi-secara-berkala?kategori=data-kepegawaian&sub=agenda-pimpinan' },
                { label: isEn ? 'National Awards' : 'Penghargaan Tingkat Nasional', path: '/ppid/informasi-secara-berkala?kategori=data-kepegawaian&sub=penghargaan-tingkat-nasional' },
                { label: isEn ? 'Public Service Accreditation' : 'Akreditas Layanan Publik', path: '/ppid/informasi-secara-berkala?kategori=data-kepegawaian&sub=akreditas-layanan-publik' },
                { label: isEn ? 'Correspondence Recapitulation' : 'Rekapitulasi Surat Menyurat', path: '/ppid/informasi-secara-berkala?kategori=data-kepegawaian&sub=rekapitulasi-surat-menyurat' },
              ],
            },
            {
              label: isEn ? 'SAKIP Documents' : 'Dokumen SAKIP',
              path: '/ppid/informasi-secara-berkala?kategori=dokumen-sakip',
              children: [
                { label: 'RENJA', path: '/ppid/informasi-secara-berkala?kategori=dokumen-sakip&sub=renja' },
                { label: 'RKPD', path: '/ppid/informasi-secara-berkala?kategori=dokumen-sakip&sub=rkpd' },
                { label: 'IKU', path: '/ppid/informasi-secara-berkala?kategori=dokumen-sakip&sub=iku' },
                { label: isEn ? 'Operational Definitions' : 'Definisi Operasional', path: '/ppid/informasi-secara-berkala?kategori=dokumen-sakip&sub=definisi-operasional' },
                { label: 'RKA', path: '/ppid/informasi-secara-berkala?kategori=dokumen-sakip&sub=rka' },
                { label: 'DPA', path: '/ppid/informasi-secara-berkala?kategori=dokumen-sakip&sub=dpa' },
                { label: 'RUP', path: '/ppid/informasi-secara-berkala?kategori=dokumen-sakip&sub=rup' },
                { label: isEn ? 'Programs & Activities' : 'Program dan Kegiatan', path: '/ppid/informasi-secara-berkala?kategori=dokumen-sakip&sub=program-dan-kegiatan' },
                { label: 'RENSTRA', path: '/ppid/informasi-secara-berkala?kategori=dokumen-sakip&sub=renstra' },
                { label: 'LAKIP', path: '/ppid/informasi-secara-berkala?kategori=dokumen-sakip&sub=lakip' },
                { label: isEn ? 'Performance Agreement' : 'Perjanjian Kinerja', path: '/ppid/informasi-secara-berkala?kategori=dokumen-sakip&sub=perjanjian-kinerja' },
                { label: isEn ? 'Performance Cascading' : 'Cascading Kinerja', path: '/ppid/informasi-secara-berkala?kategori=dokumen-sakip&sub=cascading-kinerja' },
                { label: isEn ? 'Performance Tree' : 'Pohon Kinerja', path: '/ppid/informasi-secara-berkala?kategori=dokumen-sakip&sub=pohon-kinerja' },
                { label: isEn ? 'Action Plan' : 'Rencana Aksi', path: '/ppid/informasi-secara-berkala?kategori=dokumen-sakip&sub=rencana-aksi' },
                { label: isEn ? 'Business Process Map' : 'Peta Proses Bisnis', path: '/ppid/informasi-secara-berkala?kategori=dokumen-sakip&sub=peta-proses-bisnis' },
                { label: isEn ? 'Bureaucracy Reform Roadmap' : 'Roadmap Reformasi Birokrasi', path: '/ppid/informasi-secara-berkala?kategori=dokumen-sakip&sub=roadmap-reformasi-birokrasi' },
                { label: 'LPPD', path: '/ppid/informasi-secara-berkala?kategori=dokumen-sakip&sub=lppd' },
                { label: isEn ? 'Procurement Announced by LPSE' : 'Pengadaan Barang Dan Jasa OPD Yang Diumumkan Oleh LPSE', path: '/ppid/informasi-secara-berkala?kategori=dokumen-sakip&sub=pengadaan-barang-dan-jasa-opd-yang-diumumkan-oleh-lpse' },
              ],
            },
            {
              label: isEn ? 'Financial & Asset Reports' : 'Laporan Keuangan & Aset',
              path: '/ppid/informasi-secara-berkala?kategori=laporan-keuangan-aset',
              children: [
                { label: isEn ? 'Budget Realization Report' : 'Laporan Realisasi Anggaran', path: '/ppid/informasi-secara-berkala?kategori=laporan-keuangan-aset&sub=laporan-realisasi-anggaran' },
                { label: isEn ? 'Procurement Documents' : 'Dokumen Pengadaan', path: '/ppid/informasi-secara-berkala?kategori=laporan-keuangan-aset&sub=dokumen-pengadaan' },
                { label: isEn ? 'Notes to Financial Statements (CALK)' : 'Catatan Atas Laporan Keuangan (CALK)', path: '/ppid/informasi-secara-berkala?kategori=laporan-keuangan-aset&sub=catatan-atas-laporan-keuangan-calk' },
                { label: isEn ? 'Cash Budget' : 'Anggaran Kas', path: '/ppid/informasi-secara-berkala?kategori=laporan-keuangan-aset&sub=anggaran-kas' },
                { label: isEn ? 'Asset List' : 'Daftar Aset', path: '/ppid/informasi-secara-berkala?kategori=laporan-keuangan-aset&sub=daftar-aset' },
                { label: isEn ? 'General Budget Policy (KUA) PPAS' : 'Kebijakan Umum Anggaran (KUA) Prioritas Pagu Anggaran Sementara (PPAS)', path: '/ppid/informasi-secara-berkala?kategori=laporan-keuangan-aset&sub=kua-ppas' },
                { label: isEn ? 'Electronic Financial Documents' : 'Dokumen Elektronik Keuangan', path: '/ppid/informasi-secara-berkala?kategori=laporan-keuangan-aset&sub=dokumen-elektronik-keuangan' },
              ],
            },
            {
              label: isEn ? 'Activity Reports' : 'Laporan Kegiatan',
              path: '/ppid/informasi-secara-berkala?kategori=laporan-kegiatan',
              children: [
                { label: isEn ? 'Tourism Destination Development' : 'Laporan Bidang Pengembangan Destinasi Pariwisata', path: '/ppid/informasi-secara-berkala?kategori=laporan-kegiatan&sub=laporan-bidang-destinasi' },
                { label: isEn ? 'Tourism Marketing Development' : 'Laporan Bidang Pengembangan Pemasaran Pariwisata', path: '/ppid/informasi-secara-berkala?kategori=laporan-kegiatan&sub=laporan-bidang-pemasaran' },
                { label: isEn ? 'Tourism Industry Development' : 'Laporan Bidang Pengembangan Industri Pariwisata', path: '/ppid/informasi-secara-berkala?kategori=laporan-kegiatan&sub=laporan-bidang-industri' },
                { label: isEn ? 'Tourism Institutional Development' : 'Laporan Bidang Pengembangan Kelembagaan Kepariwisataan', path: '/ppid/informasi-secara-berkala?kategori=laporan-kegiatan&sub=laporan-bidang-kelembagaan' },
              ],
            },
          ],
        },
        { label: isEn ? 'Immediate Information' : 'Informasi Setiap Saat', path: '/ppid/informasi-setiap-saat' },
        { label: isEn ? 'Urgent Information' : 'Informasi Serta Merta', path: '/ppid/informasi-serta-merta' },
        { label: isEn ? 'Exempt Information' : 'Informasi Dikecualikan', path: '/ppid/informasi-dikecualikan' },
        { label: isEn ? 'Public Complaints Service' : 'Layanan Aduan Masyarakat', path: 'https://www.lapor.go.id/instansi/pemerintah-provinsi-sulawesi-tengah', external: true },
        { label: isEn ? 'Regulations' : 'Regulasi', path: '/ppid/regulasi' },
      ],
    },
    {
      label: isEn ? 'Tourism Info' : 'Info Pariwisata',
      ...(withIcons ? { icon: Compass } : {}),
      children: [
        {
          label: isEn ? 'Tourism Destinations' : 'Destinasi Pariwisata',
          children: [
            {
              label: isEn ? 'Tourist Attractions' : 'Daya Tarik Wisata',
              inlineChildren: true,
              children: kabupatenItems('/info-pariwisata/destinasi/daya-tarik-wisata'),
            },
            {
              label: isEn ? 'Tourism Villages' : 'Desa Wisata',
              inlineChildren: true,
              children: kabupatenItems('/info-pariwisata/destinasi/desa-wisata'),
            },
          ],
        },
        {
          label: isEn ? 'Tourism Marketing' : 'Pemasaran Pariwisata',
          children: [
            { label: isEn ? 'Tour Packages' : 'Paket Wisata', path: '/info-pariwisata/pemasaran/paket-wisata' },
            { label: isEn ? 'Event Calendar' : 'Kalender Event', path: '/info-pariwisata/pemasaran/kalender-event' },
            { label: isEn ? 'Hotel Occupancy Data' : 'Data Hunian Hotel', path: '/info-pariwisata/pemasaran/data-hunian' },
            { label: isEn ? 'Visitor Statistics' : 'Statistik Kunjungan', path: '/info-pariwisata/pemasaran/statistik-kunjungan' },
          ],
        },
        { label: isEn ? 'Creative Economy' : 'Ekonomi Kreatif', path: '/info-pariwisata/ekonomi-kreatif' },
        { label: isEn ? 'Tourism Resources' : 'Sumber Daya Pariwisata', path: '/info-pariwisata/sumber-daya' },
      ],
    },
    {
      label: isEn ? 'Publication Plan' : 'Rencana Terbit',
      path: '/rencana-terbit',
      ...(withIcons ? { icon: Calendar } : {}),
    },
    {
      label: isEn ? 'Report' : 'Lapor',
      path: 'https://www.lapor.go.id/instansi/pemerintah-provinsi-sulawesi-tengah',
      external: true,
      ...(withIcons ? { icon: MessageSquare } : {}),
    },
  ];
};

export const UI_STRINGS = {
  ID: {
    // Topbar
    officialPortal: 'Portal Resmi',
    govSlogan: 'Pemerintah Provinsi Sulawesi Tengah • Bumi Seribu Megalit',
    // Navbar
    deptName: 'Dinas Pariwisata',
    provinceName: 'PROVINSI SULAWESI TENGAH',
    searchTitle: 'Cari Portal Wisata',
    searchPlaceholder: 'Cari berita, agenda, atau destinasi...',
    close: 'Tutup',
    // Footer
    quickLinks: 'Quick Links',
    contact: 'Kontak',
    officeAddress: 'Alamat Kantor',
    complaintEmail: 'Email Pengaduan',
    tenganiService: 'Layanan Informasi Tengani',
    ppidTourism: 'PPID Dinas Pariwisata',
    officialContact: 'Alamat & Kontak Resmi',
    fullAddress: 'Jalan Dewi Sartika Nomor 45 Palu, Kode Pos 94121, Palu Selatan, Sulawesi Tengah',
    officialSocial: 'Media Sosial Resmi',
    socialDesc: 'Ikuti akun resmi Dinas Pariwisata Provinsi Sulawesi Tengah untuk informasi festival dan pariwisata terkini.',
    copyright: 'Hak Cipta © 2026 Dinas Pariwisata Provinsi Sulawesi Tengah. Hak cipta dilindungi undang-undang.',
    // Sidebar
    searchSidebar: 'Cari menu atau halaman...',
    officialPortalSidebar: 'Portal Resmi Dispar Sulteng',
    // Home
    regionalNewsTag: 'WARTA PARIWISATA DAERAH',
    latestNews: 'Berita Terbaru',
    readMore: 'Baca Selengkapnya',
    servicesTag: 'PELAYANAN & KEGIATAN',
    servicesTitle: 'Agenda Kegiatan & Kepuasan Publik',
    disparSulteng: 'DINAS PARIWISATA SULTENG',
    year2026: 'Tahun 2026',
    calendarTitle: 'Kalender Event Daerah',
    calendarDesc: 'Provinsi Sulawesi Tengah — Beragam festival budaya, karnaval bahari, dan atraksi tradisi tahun berjalan.',
    exploreAllAgenda: 'Jelajahi Semua Agenda',
    officialDataTag: 'DATA BERKALA RESMI',
    touristStats: 'Statistik Wisatawan',
    touristStatsDesc: 'Realisasi kunjungan wisatawan resmi Dispar Sulteng',
    visitorCategory: 'Kategori Wisatawan',
    period: 'Periode',
    domesticVisitors: 'Nusantara (Domestik)',
    internationalVisitors: 'Mancanegara (Internasional)',
    share: 'Pangsa',
    openFullStats: 'Buka Analisis & Grafik Lengkap',
    statsSource: 'Sumber: Dokumen Resmi Analisis Dispar & BPS Sulteng',
    visualDocTag: 'DOKUMENTASI VISUAL',
    videoTitle: 'Video Pariwisata & Desa Wisata',
    videoDesc: 'Sinematik keajaiban alam, ragam tradisi, dan daya tarik desa wisata unggulan Sulawesi Tengah',
    videoGallery: 'Galeri Video',
    video1Title: 'Video Pariwisata Sulawesi Tengah',
    video1Desc: 'Tonton dokumentasi pariwisata langsung di YouTube.',
    regionalProfile: 'Profil Daerah',
    video2Title: 'Video Desa Wisata Sulawesi Tengah',
    video2Desc: 'Tonton dokumentasi desa wisata langsung di YouTube.',
    exploreVillage: 'Jelajah Desa',
    welcomeLine1: 'Selamat Datang di Website Resmi',
    welcomeLine2: 'DINAS PARIWISATA',
    welcomeLine3: 'PROVINSI SULAWESI TENGAH',
    // IKM
    serviceEval: 'EVALUASI PELAYANAN',
    ikmTitle: 'Indeks Kepuasan Masyarakat (IKM)',
    ikmDesc: 'Akumulasi survei mutu layanan publik Dinas Pariwisata',
    excellent: 'SANGAT BAIK',
    veryGood: 'Sangat Baik',
  },
  EN: {
    // Topbar
    officialPortal: 'Official Portal',
    govSlogan: 'Government of Central Sulawesi Province • Land of a Thousand Megaliths',
    // Navbar
    deptName: 'Department of Tourism',
    provinceName: 'CENTRAL SULAWESI PROVINCE',
    searchTitle: 'Search Tourism Portal',
    searchPlaceholder: 'Search news, agenda, or destinations...',
    close: 'Close',
    // Footer
    quickLinks: 'Quick Links',
    contact: 'Contact',
    officeAddress: 'Office Address',
    complaintEmail: 'Complaint Email',
    tenganiService: 'Tengani Information Service',
    ppidTourism: 'Department PPID',
    officialContact: 'Official Address & Contact',
    fullAddress: 'Jalan Dewi Sartika No. 45 Palu, Postal Code 94121, South Palu, Central Sulawesi',
    officialSocial: 'Official Social Media',
    socialDesc: 'Follow the official accounts of the Department of Tourism of Central Sulawesi Province for the latest festival and tourism updates.',
    copyright: 'Copyright © 2026 Department of Tourism Central Sulawesi Province. All rights reserved.',
    // Sidebar
    searchSidebar: 'Search menu or page...',
    officialPortalSidebar: 'Official Portal of Dispar Sulteng',
    // Home
    regionalNewsTag: 'REGIONAL TOURISM NEWS',
    latestNews: 'Latest News',
    readMore: 'Read More',
    servicesTag: 'SERVICES & ACTIVITIES',
    servicesTitle: 'Event Agenda & Public Satisfaction',
    disparSulteng: 'CENTRAL SULAWESI TOURISM OFFICE',
    year2026: 'Year 2026',
    calendarTitle: 'Regional Event Calendar',
    calendarDesc: 'Central Sulawesi Province — Diverse cultural festivals, maritime carnivals, and traditional attractions of the current year.',
    exploreAllAgenda: 'Explore All Events',
    officialDataTag: 'OFFICIAL PERIODIC DATA',
    touristStats: 'Visitor Statistics',
    touristStatsDesc: 'Official tourist visit realization of Central Sulawesi Tourism Office',
    visitorCategory: 'Visitor Category',
    period: 'Period',
    domesticVisitors: 'Domestic (Nusantara)',
    internationalVisitors: 'International (Foreign)',
    share: 'Share',
    openFullStats: 'Open Full Analysis & Graphs',
    statsSource: 'Source: Official Analysis Document Dispar & BPS Sulteng',
    visualDocTag: 'VISUAL DOCUMENTATION',
    videoTitle: 'Tourism & Tourism Village Videos',
    videoDesc: 'Cinematic natural wonders, diverse traditions, and leading tourism villages of Central Sulawesi',
    videoGallery: 'Video Gallery',
    video1Title: 'Central Sulawesi Tourism Video',
    video1Desc: 'Watch official tourism documentation directly on YouTube.',
    regionalProfile: 'Regional Profile',
    video2Title: 'Central Sulawesi Tourism Village Video',
    video2Desc: 'Watch tourism village documentation directly on YouTube.',
    exploreVillage: 'Village Tour',
    welcomeLine1: 'Welcome to the Official Website of',
    welcomeLine2: 'DEPARTMENT OF TOURISM',
    welcomeLine3: 'CENTRAL SULAWESI PROVINCE',
    // IKM
    serviceEval: 'SERVICE EVALUATION',
    ikmTitle: 'Public Satisfaction Index (IKM)',
    ikmDesc: 'Cumulative public service quality survey of Department of Tourism',
    excellent: 'EXCELLENT',
    veryGood: 'Very Good',
  },
};
