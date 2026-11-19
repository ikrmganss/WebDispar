const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const db = require('../config/db');

const regulasiData = [
  // ================= KATEGORI: UMUM / KEPARIWISATAAN (11 DOKUMEN RESMI) =================
  {
    judul: 'PERATURAN MENTERI PARIWISATA DAN EKONOMI KREATIF/ KEPALA BADAN PARIWISATA DAN EKONOMI KREATIF REPUBLIK INDONESIA NOMOR 14 TAHUN 2021',
    file: '/images/Regulasi/PERMENPAR_NO_14_2021.pdf',
    kategori: 'umum',
  },
  {
    judul: 'KEPUTUSAN MENTERI DALAM NEGERI NOMOR 050-3708 TAHUN 2020',
    file: '/images/Regulasi/KEPMENDAGRI_NO_050-3708_2020.pdf',
    kategori: 'umum',
  },
  {
    judul: 'PERATURAN MENTERI PENDAYAGUNAAN APARATUR NEGARA DAN REFORMASI BIROKRASI REPUBLIK INDONESIA NOMOR 11 TAHUN 2021',
    file: '/images/Regulasi/PERMENPANRB_NO_11_2021.pdf',
    kategori: 'umum',
  },
  {
    judul: 'PERATURAN MENTERI PARIWISATA REPUBLIK INDONESIA NOMOR 21 TAHUN 2016',
    file: '/images/Regulasi/PERMENPAR_NO_21_2016.pdf',
    kategori: 'umum',
  },
  {
    judul: 'PERMENDAGRI NOMOR 90 TAHUN 2019 TENTANG KLASIFIKASI, KODEFIKASI DAN NOMENKLATUR PERENCANAAN PEMBANGUNAN DAERAH',
    file: '/images/Regulasi/PERMENDAGRI_NO_90_2019.pdf',
    kategori: 'umum',
  },
  {
    judul: 'PERDA TOLITOLI NOMOR 7 TAHUN 2016 TENTANG RIPPARKAB',
    file: '/images/Regulasi/PERDA_TOLITOLI_NO_7_2016.pdf',
    kategori: 'umum',
  },
  {
    judul: 'PERDA MOROWALI UTARA NOMOR 6 TAHUN 2017 TENTANG RIPPARKAB',
    file: '/images/Regulasi/PERDA_MOROWALI_UTARA_NO_6_2017.pdf',
    kategori: 'umum',
  },
  {
    judul: 'PERDA TOJO UNA-UNA NOMOR 7 TAHUN 2013 TENTANG RIPPARKAB',
    file: '/images/Regulasi/PERDA_TOJO_UNA_UNA_NO_7_2013.pdf',
    kategori: 'umum',
  },
  {
    judul: 'PERDA SIGI NOMOR 18 TAHUN 2014 TENTANG RIPPARKAB',
    file: '/images/Regulasi/PERDA_SIGI_NO_18_2014.pdf',
    kategori: 'umum',
  },
  {
    judul: 'PERDA NOMOR 5 TAHUN 2019 TENTANG RENCANA INDUK PEMBANGUNAN KEPARIWISATAAN PROVINSI SULAWESI TENGAH TAHUN 2019-2034',
    file: '/images/Regulasi/PERDA_SULTENG_NO_5_2019.pdf',
    kategori: 'umum',
  },
  {
    judul: 'LIST RIPPARDA SULAWESI TENGAH',
    file: '/images/Regulasi/LIST_RIPPARDA.pdf',
    kategori: 'umum',
  },

  // ================= KATEGORI: PEDOMAN PENGELOLAAN (4 DOKUMEN) =================
  {
    judul: 'PENGELOLAAN ORGANISASI (PERGUB 36/2020)',
    file: '/images/Regulasi/PERGUB_36_2020.pdf',
    kategori: 'pedoman',
  },
  {
    judul: 'PENGELOLAAN ADMINISTRASI (PERGUB 24/2020)',
    file: '/images/Regulasi/PERGUB_24_2020.pdf',
    kategori: 'pedoman',
  },
  {
    judul: 'PENGELOLAAN KEPEGAWAIAN (PERGUB 9/2021 TTG MANAJEMEN TALENTA PNS)',
    file: '/images/Regulasi/PERGUB-NO-9-TAHUN-2021.pdf',
    kategori: 'pedoman',
  },
  {
    judul: 'PENGELOLAAN KEUANGAN (PERGUB 7/2020)',
    file: '/images/Regulasi/Pergub_7_2020.pdf',
    kategori: 'pedoman',
  },

  // ================= KATEGORI: REGULASI LAYANAN PUBLIK PPID (9 DOKUMEN) =================
  {
    judul: 'PERATURAN GUBERNUR TENTANG SISTEM INFORMASI DAN DOKUMENTASI PEMDA (PERGUB 12/2021)',
    file: '/images/Regulasi/PERGUB_12_2021-tentang-Sistem-Informasi-dan-Dokumentasi-1.pdf',
    kategori: 'layanan',
  },
  {
    judul: 'KEPUTUSAN GUBERNUR TENTANG PPID PROVINSI SULAWESI TENGAH',
    file: '/images/Regulasi/SK-PPID-PROV.pdf',
    kategori: 'layanan',
  },
  {
    judul: 'KEPUTUSAN GUBERNUR TENTANG TIM PERTIMBANGAN PPID',
    file: '/images/Regulasi/SK-PPID-PERTIMBANGAN.pdf',
    kategori: 'layanan',
  },
  {
    judul: 'KEPUTUSAN PPID TENTANG DAFTAR INFORMASI PUBLIK UTAMA SULTENG',
    file: '/images/Regulasi/SK-DIP-UTAMA-SULTENG.pdf',
    kategori: 'layanan',
  },
  {
    judul: 'KEPUTUSAN PPID TENTANG INFORMASI DIKECUALIKAN',
    file: '/images/Regulasi/KP-DIKECUALIKAN-PPID-PROV.pdf',
    kategori: 'layanan',
  },
  {
    judul: 'UU 14 TAHUN 2008 TENTANG KETERBUKAAN INFORMASI PUBLIK',
    file: '/images/Regulasi/uu14-2008_keterbukaan_informasi_publik.pdf',
    kategori: 'layanan',
  },
  {
    judul: 'PP 61 TAHUN 2010 TENTANG PELAKSANAAN UU 14/2008',
    file: '/images/Regulasi/Nomor_61_Tahun_2010.pdf',
    kategori: 'layanan',
  },
  {
    judul: 'PERKI 1 TAHUN 2021 TENTANG STANDAR LAYANAN INFORMASI PUBLIK',
    file: '/images/Regulasi/PerKIP-1-FINAL-2021.pdf',
    kategori: 'layanan',
  },
  {
    judul: 'PERKI 1 TAHUN 2018 TENTANG STANDAR LAYANAN INFORMASI PUBLIK DESA',
    file: '/images/Regulasi/PERKI_SLIP_DESA_FINAL.pdf',
    kategori: 'layanan',
  },
];

async function seed() {
  try {
    console.log('Truncating / resetting ppid_regulasi table...');
    await db.query('DELETE FROM ppid_regulasi');
    
    for (const r of regulasiData) {
      await db.query(
        'INSERT INTO ppid_regulasi (judul, file, kategori, created_at) VALUES (?, ?, ?, NOW())',
        [r.judul, r.file, r.kategori]
      );
      console.log(`Inserted: [${r.kategori}] ${r.judul.slice(0, 50)}... -> ${r.file}`);
    }

    const [rows] = await db.query('SELECT count(*) as total FROM ppid_regulasi');
    console.log(`Successfully seeded ${rows[0].total} rows into ppid_regulasi!`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
