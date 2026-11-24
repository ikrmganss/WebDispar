const db = require('../config/db');

// Daftar halaman statis / menu resmi untuk pencarian cepat
const STATIC_SECTIONS = [
  {
    title: 'Alamat & Kontak Resmi Kantor Dinas Pariwisata',
    category: 'Kontak',
    url: '/profil/hubungi-kami',
    snippet: 'Jalan Dewi Sartika Nomor 45 Palu, Kode Pos 94121, Palu Selatan, Sulawesi Tengah. Telp: (0451) 483942, Email: dispar@sultengprov.go.id.',
    keywords: ['kontak', 'alamat', 'telepon', 'email', 'hubungi kami', 'hubungi', 'dewi sartika', 'palu', 'kantor', 'lokasi', 'pos', 'peta']
  },
  {
    title: 'Sejarah Dinas Pariwisata Provinsi Sulawesi Tengah',
    category: 'Profil',
    url: '/profil/sejarah',
    snippet: 'Lintas sejarah dan perkembangan pembangunan kepariwisataan di Provinsi Sulawesi Tengah dari masa ke masa.',
    keywords: ['sejarah', 'lintas sejarah', 'latar belakang', 'asal usul', 'pembentukan', 'berdiri']
  },
  {
    title: 'Visi dan Misi Dinas Pariwisata Sulawesi Tengah',
    category: 'Profil',
    url: '/profil/visi-misi',
    snippet: 'Arah haluan, visi, misi, dan target strategis pembangunan kepariwisataan dan ekonomi kreatif Sulawesi Tengah.',
    keywords: ['visi', 'misi', 'visi misi', 'tujuan', 'sasaran', 'strategis', 'haluan']
  },
  {
    title: 'Profil Pimpinan & Pejabat Struktural Dinas Pariwisata',
    category: 'Profil',
    url: '/profil/profil-pimpinan',
    snippet: 'Profil Kepala Dinas, Sekretaris, serta para Kepala Bidang dan pimpinan struktural Dinas Pariwisata Provinsi Sulawesi Tengah.',
    keywords: ['pimpinan', 'profil pimpinan', 'kepala dinas', 'kadis', 'sekretaris', 'pejabat', 'kabid', 'struktural']
  },
  {
    title: 'Tupoksi (Tugas Pokok dan Fungsi) Dinas Pariwisata',
    category: 'Profil',
    url: '/profil/tupoksi',
    snippet: 'Rincian tugas pokok, wewenang, dan fungsi kelembagaan Dinas Pariwisata Provinsi Sulawesi Tengah sesuai peraturan perundangan.',
    keywords: ['tupoksi', 'tugas pokok', 'fungsi', 'tugas dan fungsi', 'wewenang', 'regulasi dinas']
  },
  {
    title: 'Logo Resmi Dinas Pariwisata Sulawesi Tengah',
    category: 'Profil',
    url: '/profil/logo',
    snippet: 'Makna simbolik, filosofi warna, dan panduan penggunaan logo resmi Dinas Pariwisata Provinsi Sulawesi Tengah.',
    keywords: ['logo', 'lambang', 'arti logo', 'makna logo', 'filosofi logo', 'simbol']
  },
  {
    title: 'Majalah & Publikasi Resmi Kepariwisataan',
    category: 'Profil',
    url: '/profil/majalah',
    snippet: 'Koleksi majalah digital, buletin kepariwisataan, dan rilis publikasi berkala seputar promosi wisata daerah.',
    keywords: ['majalah', 'buletin', 'publikasi', 'buku', 'bacaan', 'digital', 'majalah wisata']
  },
  {
    title: 'PPID (Pejabat Pengelola Informasi dan Dokumentasi)',
    category: 'Kategori',
    url: '/ppid',
    snippet: 'Layanan Keterbukaan Informasi Publik PPID Dinas Pariwisata Provinsi Sulawesi Tengah transparan, akuntabel, dan terpercaya.',
    keywords: ['ppid', 'keterbukaan informasi', 'informasi publik', 'pejabat pengelola informasi']
  },
  {
    title: 'Daftar Informasi Publik (DIP) PPID',
    category: 'Kategori',
    url: '/ppid/daftar-informasi-publik',
    snippet: 'Kumpulan dokumen, ringkasan berkas, dan regulasi informasi publik yang dapat diakses oleh masyarakat luas.',
    keywords: ['dokumen publik', 'daftar informasi publik', 'dip', 'berkas', 'arsip', 'unduh dokumen']
  },
  {
    title: 'Formulir Permohonan Informasi Publik PPID',
    category: 'Kategori',
    url: '/ppid/layanan-publik/form-permohonan',
    snippet: 'Sampaikan permohonan informasi publik secara resmi dan terdata online kepada PPID Dinas Pariwisata.',
    keywords: ['permohonan', 'form permohonan', 'minta data', 'ajukan informasi', 'permohonan informasi']
  },
  {
    title: 'Formulir Pengajuan Keberatan Informasi PPID',
    category: 'Kategori',
    url: '/ppid/layanan-publik/form-keberatan',
    snippet: 'Layanan pengajuan keberatan atas permohonan informasi publik sesuai undang-undang keterbukaan informasi.',
    keywords: ['keberatan', 'form keberatan', 'pengajuan keberatan', 'sengketa informasi']
  },
  {
    title: 'Survey Penilaian Kepuasan Layanan Informasi Publik (IKM)',
    category: 'Kategori',
    url: '/ppid/layanan-publik/survey-kepuasan',
    snippet: 'Berikan penilaian dan masukan terhadap kualitas pelayanan publik dan transparansi informasi Dinas Pariwisata.',
    keywords: ['survey', 'ikm', 'kepuasan masyarakat', 'kuesioner', 'penilaian', 'layanan']
  },
  {
    title: 'Daya Tarik Wisata (DTW) Sulawesi Tengah',
    category: 'Kategori',
    url: '/info-pariwisata/destinasi/daya-tarik-wisata',
    snippet: 'Jelajahi ratusan destinasi wisata alam, bahari, megalit, dan budaya di seluruh kabupaten/kota se-Sulawesi Tengah.',
    keywords: ['destinasi', 'wisata', 'dtw', 'daya tarik wisata', 'objek wisata', 'tempat wisata', 'pantai', 'danau', 'air terjun']
  },
  {
    title: 'Desa Wisata Sulawesi Tengah',
    category: 'Kategori',
    url: '/info-pariwisata/destinasi/desa-wisata',
    snippet: 'Eksplorasi potensi kearifan lokal, kebudayaan tradisional, dan keindahan alam di desa-desa wisata unggulan Sulteng.',
    keywords: ['desa wisata', 'desa', 'kampung wisata', 'pokdarwis', 'kearifan lokal']
  },
  {
    title: 'Kalender Event & Festival Daerah 2026',
    category: 'Kategori',
    url: '/info-pariwisata/pemasaran/kalender-event',
    snippet: 'Jadwal lengkap festival budaya, karnaval bahari, pesta rakyat, dan atraksi tradisi tahunan di Sulawesi Tengah.',
    keywords: ['kalender event', 'event', 'festival', 'agenda', 'karnaval', 'jadwal acara', 'pesta rakyat']
  },
  {
    title: 'Data Hunian Hotel & Akomodasi Wisata',
    category: 'Kategori',
    url: '/info-pariwisata/pemasaran/data-hunian',
    snippet: 'Informasi dan statistik tingkat penghunian kamar hotel serta akomodasi penginapan di wilayah Sulawesi Tengah.',
    keywords: ['hotel', 'hunian', 'data hunian', 'penginapan', 'akomodasi', 'okupansi']
  },
  {
    title: 'Statistik Kunjungan Wisatawan Mancanegara & Domestik',
    category: 'Kategori',
    url: '/info-pariwisata/pemasaran/statistik-kunjungan',
    snippet: 'Data resmi jumlah pergerakan wisatawan nusantara dan wisatawan mancanegara ke Sulawesi Tengah.',
    keywords: ['statistik kunjungan', 'jumlah wisatawan', 'turis', 'mancanegara', 'domestik', 'wisnus', 'wisman']
  },
  {
    title: 'Ekonomi Kreatif 17 Subsektor Sulteng',
    category: 'Kategori',
    url: '/info-pariwisata/ekonomi-kreatif',
    snippet: 'Pengembangan 17 subsektor ekonomi kreatif: kriya, kuliner, fesyen, musik, seni pertunjukan, dan digital di Sulteng.',
    keywords: ['ekraf', 'ekonomi kreatif', 'kriya', 'kuliner', 'fesyen', 'umkm', 'karya']
  },
  {
    title: 'Layanan Pengaduan SP4N-LAPOR!',
    category: 'Kontak',
    url: '/lapor',
    snippet: 'Sampaikan pengaduan, kritik, dan aspirasi pelayanan publik langsung ke Sistem Pengelolaan Pengaduan Pelayanan Publik Nasional.',
    keywords: ['lapor', 'pengaduan', 'aspirasi', 'keluhan', 'sp4n', 'sp4n lapor']
  }
];

// Helper: clean HTML and corrupted unicode characters
function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/<[^>]+>/g, ' ')
    .replace(/[\uFFFD\uD800-\uDFFF]|뿯½|┬뿯½|â€|â€“|â€”/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Helper: build SQL LIKE condition for words
function buildLikeConditions(field, words, matchType) {
  if (matchType === 'exact') {
    return { sql: `${field} LIKE ?`, params: [`%${words.join(' ')}%`] };
  }
  if (matchType === 'any') {
    const sql = words.map(() => `${field} LIKE ?`).join(' OR ');
    const params = words.map((w) => `%${w}%`);
    return { sql: `(${sql})`, params };
  }
  // 'all' (default)
  const sql = words.map(() => `${field} LIKE ?`).join(' AND ');
  const params = words.map((w) => `%${w}%`);
  return { sql: `(${sql})`, params };
}

exports.search = async (req, res) => {
  const query = (req.query.q || '').trim();
  const matchType = req.query.match || 'all'; // 'all' | 'any' | 'exact'
  const order = req.query.order || 'newest'; // 'newest' | 'oldest' | 'popular' | 'alpha' | 'category'
  
  // areas: comma separated list or array
  let areas = [];
  if (req.query.areas) {
    areas = Array.isArray(req.query.areas) ? req.query.areas : String(req.query.areas).split(',').map((s) => s.trim().toLowerCase());
  }
  // If no areas explicitly selected, default search everywhere
  const searchAllAreas = areas.length === 0;
  const includeKategori = searchAllAreas || areas.includes('kategori');
  const includeKontak = searchAllAreas || areas.includes('kontak');
  const includeArtikel = searchAllAreas || areas.includes('artikel');
  const includePengumpan = searchAllAreas || areas.includes('pengumpan berita') || areas.includes('pengumpan');
  const includeTagar = searchAllAreas || areas.includes('tagar');

  if (!query) {
    return res.json({
      query: '',
      total: 0,
      results: []
    });
  }

  const rawWords = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (rawWords.length === 0) {
    return res.json({ query, total: 0, results: [] });
  }

  const results = [];

  // 1. Search Static / Navigation Sections (matching categories or contacts)
  for (const item of STATIC_SECTIONS) {
    let matchArea = false;
    if (item.category === 'Kontak' && includeKontak) matchArea = true;
    if (item.category === 'Kategori' && includeKategori) matchArea = true;
    if (item.category === 'Profil' && (includeKategori || searchAllAreas)) matchArea = true;
    if (searchAllAreas) matchArea = true;

    if (!matchArea) continue;

    const searchableText = `${item.title} ${item.snippet} ${item.keywords.join(' ')}`.toLowerCase();

    let matched = false;
    if (matchType === 'exact') {
      matched = searchableText.includes(query.toLowerCase());
    } else if (matchType === 'any') {
      matched = rawWords.some((w) => searchableText.includes(w));
    } else {
      // 'all'
      matched = rawWords.every((w) => searchableText.includes(w));
    }

    if (matched) {
      results.push({
        id: `static-${item.url}`,
        title: item.title,
        category: item.category,
        url: item.url,
        snippet: item.snippet,
        date: 'Halaman Resmi',
        views: 9999,
        badgeColor: item.category === 'Kontak' ? 'bg-amber-100 text-amber-800 border-amber-300' : 'bg-blue-100 text-blue-800 border-blue-300'
      });
    }
  }

  // 2. Search Berita & Artikel Table
  if (includeArtikel || includePengumpan || includeKategori || includeTagar) {
    try {
      let whereClauses = [];
      let params = [];

      if (matchType === 'exact') {
        const exactPhrase = `%${query}%`;
        let orParts = ['judul LIKE ?', 'konten LIKE ?'];
        params.push(exactPhrase, exactPhrase);
        if (includeKategori) {
          orParts.push('kategori LIKE ?');
          params.push(exactPhrase);
        }
        whereClauses.push(`(${orParts.join(' OR ')})`);
      } else if (matchType === 'any') {
        let orParts = [];
        for (const w of rawWords) {
          orParts.push('judul LIKE ?', 'konten LIKE ?');
          params.push(`%${w}%`, `%${w}%`);
          if (includeKategori) {
            orParts.push('kategori LIKE ?');
            params.push(`%${w}%`);
          }
        }
        whereClauses.push(`(${orParts.join(' OR ')})`);
      } else {
        // 'all'
        for (const w of rawWords) {
          let orParts = ['judul LIKE ?', 'konten LIKE ?'];
          params.push(`%${w}%`, `%${w}%`);
          if (includeKategori) {
            orParts.push('kategori LIKE ?');
            params.push(`%${w}%`);
          }
          whereClauses.push(`(${orParts.join(' OR ')})`);
        }
      }

      const sqlWhere = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
      const [beritaRows] = await db.query(
        `SELECT id, judul, slug, konten, gambar, kategori, tanggal, dilihat, created_at 
         FROM berita ${sqlWhere} LIMIT 40`,
        params
      );

      for (const row of beritaRows) {
        // Strip html tags and clean corrupted encoding for snippet
        const plain = cleanText(row.konten);
        let snippet = plain.slice(0, 160) + (plain.length > 160 ? '...' : '');

        // Find match position if possible
        const lowerPlain = plain.toLowerCase();
        const firstWordIdx = lowerPlain.indexOf(rawWords[0]);
        if (firstWordIdx > 40) {
          const start = Math.max(0, firstWordIdx - 30);
          snippet = '...' + plain.slice(start, start + 160) + '...';
        }

        results.push({
          id: `berita-${row.id}`,
          title: cleanText(row.judul),
          category: row.kategori || 'Artikel',
          url: `/berita/${row.slug || row.id}`,
          snippet: snippet || 'Warta pariwisata resmi Provinsi Sulawesi Tengah.',
          date: row.tanggal ? new Date(row.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Terbaru',
          views: Number(row.dilihat || 0),
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300'
        });
      }
    } catch (err) {
      console.error('Search berita error:', err);
    }
  }

  // 3. Search Daya Tarik Wisata (DTW)
  if (includeKategori || searchAllAreas) {
    try {
      let whereClauses = [];
      let params = [];

      for (const w of rawWords) {
        whereClauses.push('(judul LIKE ? OR deskripsi LIKE ? OR kabupaten LIKE ?)');
        params.push(`%${w}%`, `%${w}%`, `%${w}%`);
      }

      const sqlWhere = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
      const [dtwRows] = await db.query(
        `SELECT id, kabupaten, judul, deskripsi, gambar, dilihat FROM dtw ${sqlWhere} LIMIT 20`,
        params
      );

      for (const row of dtwRows) {
        const plain = cleanText(row.deskripsi);
        results.push({
          id: `dtw-${row.id}`,
          title: `${cleanText(row.judul)} (${row.kabupaten})`,
          category: 'Destinasi Wisata',
          url: `/info-pariwisata/destinasi/daya-tarik-wisata`,
          snippet: plain.slice(0, 150) + (plain.length > 150 ? '...' : ''),
          date: row.kabupaten,
          views: Number(row.dilihat || 0),
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300'
        });
      }
    } catch (err) {
      console.error('Search DTW error:', err);
    }
  }

  // 4. Search Desa Wisata
  if (includeKategori || searchAllAreas) {
    try {
      let whereClauses = [];
      let params = [];

      for (const w of rawWords) {
        whereClauses.push('(nama LIKE ? OR deskripsi LIKE ? OR kabupaten LIKE ?)');
        params.push(`%${w}%`, `%${w}%`, `%${w}%`);
      }

      const sqlWhere = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
      const [desaRows] = await db.query(
        `SELECT id, kabupaten, nama, deskripsi, dilihat FROM desa_wisata ${sqlWhere} LIMIT 15`,
        params
      );

      for (const row of desaRows) {
        const plain = cleanText(row.deskripsi);
        results.push({
          id: `desa-${row.id}`,
          title: `Desa Wisata ${cleanText(row.nama)} - ${row.kabupaten}`,
          category: 'Desa Wisata',
          url: `/info-pariwisata/destinasi/desa-wisata`,
          snippet: plain.slice(0, 150) + (plain.length > 150 ? '...' : ''),
          date: row.kabupaten,
          views: Number(row.dilihat || 0),
          badgeColor: 'bg-teal-100 text-teal-800 border-teal-300'
        });
      }
    } catch (err) {
      console.error('Search desa_wisata error:', err);
    }
  }

  // 5. Search Kalender Event
  if (includeKategori || searchAllAreas) {
    try {
      let whereClauses = [];
      let params = [];

      for (const w of rawWords) {
        whereClauses.push('(judul LIKE ? OR deskripsi LIKE ? OR lokasi LIKE ?)');
        params.push(`%${w}%`, `%${w}%`, `%${w}%`);
      }

      const sqlWhere = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';
      const [eventRows] = await db.query(
        `SELECT id, judul, lokasi, tanggal, deskripsi FROM kalender_event ${sqlWhere} LIMIT 10`,
        params
      );

      for (const row of eventRows) {
        const plain = cleanText(row.deskripsi);
        results.push({
          id: `event-${row.id}`,
          title: cleanText(row.judul),
          category: 'Kalender Event',
          url: `/info-pariwisata/pemasaran/kalender-event`,
          snippet: `Lokasi: ${row.lokasi || 'Sulawesi Tengah'}. ${plain.slice(0, 130)}`,
          date: row.tanggal ? new Date(row.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '2026',
          views: 0,
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-300'
        });
      }
    } catch (err) {
      console.error('Search event error:', err);
    }
  }

  // 6. Sorting / Urutan based on user selection
  // Image 2 options: 'Terbaru', 'Terlama', 'Popular', 'Alfabetis', 'Kategori'
  if (order === 'oldest') {
    results.sort((a, b) => (a.id > b.id ? 1 : -1));
  } else if (order === 'popular') {
    results.sort((a, b) => (b.views || 0) - (a.views || 0));
  } else if (order === 'alpha') {
    results.sort((a, b) => a.title.localeCompare(b.title));
  } else if (order === 'category') {
    results.sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title));
  } else {
    // 'newest' (default) - static exact matches first, then latest database items
    results.sort((a, b) => {
      if (a.id.startsWith('static-') && !b.id.startsWith('static-')) return -1;
      if (!a.id.startsWith('static-') && b.id.startsWith('static-')) return 1;
      return 0;
    });
  }

  res.json({
    query,
    matchType,
    order,
    total: results.length,
    results
  });
};
