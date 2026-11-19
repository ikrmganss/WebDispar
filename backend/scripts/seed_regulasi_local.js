const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const db = require('../config/db');

// DATA REGULASI RESMI PERSIS SESUAI SITUS RESMI DISPAR SULTENG
// (https://pariwisata.sultengprov.go.id/informasi-publik/regulasi.html)
// TEPAT 11 DOKUMEN RESMI (Halaman 1: 10 dokumen, Halaman 2: 1 dokumen)
const regulasiData = [
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
    judul: 'PERMENDAGRI NOMOR 90 TAHUN 2019',
    file: '/images/Regulasi/PERMENDAGRI_NO_90_2019.pdf',
    kategori: 'umum',
  },
  {
    judul: 'LIST RIPPARDA',
    file: '/images/Regulasi/LIST_RIPPARDA.pdf',
    kategori: 'umum',
  },
  {
    judul: 'PERDA NOMOR 5 TAHUN 2019',
    file: '/images/Regulasi/PERDA_SULTENG_NO_5_2019.pdf',
    kategori: 'umum',
  },
  {
    judul: 'PERDA SIGI NOMOR 18 TAHUN 2014',
    file: '/images/Regulasi/PERDA_SIGI_NO_18_2014.pdf',
    kategori: 'umum',
  },
  {
    judul: 'PERDA TOJO UNA-UNA NOMOR 7 TAHUN 2013',
    file: '/images/Regulasi/PERDA_TOJO_UNA_UNA_NO_7_2013.pdf',
    kategori: 'umum',
  },
  {
    judul: 'PERDA MOROWALI UTARA NOMOR 6 TAHUN 2017',
    file: '/images/Regulasi/PERDA_MOROWALI_UTARA_NO_6_2017.pdf',
    kategori: 'umum',
  },
  {
    judul: 'PERDA TOLITOLI NOMOR 7 Tahun 2016',
    file: '/images/Regulasi/PERDA_TOLITOLI_NO_7_2016.pdf',
    kategori: 'umum',
  },
];

async function seed() {
  try {
    console.log('Truncating / resetting ppid_regulasi table to exact 11 official documents...');
    await db.query('DELETE FROM ppid_regulasi');
    
    for (const r of regulasiData) {
      await db.query(
        'INSERT INTO ppid_regulasi (judul, file, kategori, created_at) VALUES (?, ?, ?, NOW())',
        [r.judul, r.file, r.kategori]
      );
      console.log(`[OK] ${r.judul.slice(0, 60)}... -> ${r.file}`);
    }

    const [rows] = await db.query('SELECT count(*) as total FROM ppid_regulasi');
    console.log(`Successfully seeded EXACTLY ${rows[0].total} official rows into ppid_regulasi!`);
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
