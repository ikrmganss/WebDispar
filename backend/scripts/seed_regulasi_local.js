const path = require('path');
require(path.resolve(__dirname, '../node_modules/dotenv')).config({ path: path.resolve(__dirname, '../.env') });
const db = require('../config/db');

const regulasiData = [
  // ================= KATEGORI: UMUM / KEPARIWISATAAN =================
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

  // ================= KATEGORI: PEDOMAN PENGELOLAAN =================
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

  // ================= KATEGORI: REGULASI LAYANAN PUBLIK (PPID) =================
  {
    judul: 'PERATURAN GUBERNUR TENTANG SISTEM INFORMASI DAN DOKUMENTASI PEMDA (PERGUB 12/2021)',
    file: '/images/Regulasi/PERGUB_12_2021-tentang-Sistem-Informasi-dan-Dokumentasi-1.pdf',
    kategori: 'layanan',
  },
  {
    judul: 'KEPUTUSAN GUBERNUR TENTANG PPID',
    file: '/images/Regulasi/SK-PPID-PROV.pdf',
    kategori: 'layanan',
  },
  {
    judul: 'KEPUTUSAN GUBERNUR TENTANG TIM PERTIMBANGAN PPID',
    file: '/images/Regulasi/SK-PPID-PERTIMBANGAN.pdf',
    kategori: 'layanan',
  },
  {
    judul: 'KEPUTUSAN PPID TENTANG DAFTAR INFORMASI PUBLIK',
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
    judul: 'PERKI 1 TAHUN 2018 TENTANG SLIP DESA',
    file: '/images/Regulasi/PERKI_SLIP_DESA_FINAL.pdf',
    kategori: 'layanan',
  },

  // ================= KATEGORI: KEGIATAN & DOKUMENTASI TERKAIT =================
  {
    judul: 'Kepala Dinas Pariwisata Prov. Sulteng mengikuti Rapat Pimpinan Perdana Tahun 2026 yang Dipimpin langsung oleh Gubernur Sulawesi Tengah',
    file: '/images/2026/WhatsApp_Image_2026-01-05_at_114617.jpeg',
    kategori: 'kegiatan',
  },
  {
    judul: 'Apel Gabungan Perdana Bersama Gubernur Sulawesi Tengah',
    file: '/images/2026/WhatsApp_Image_2026-01-05_at_113326.jpeg',
    kategori: 'kegiatan',
  },
  {
    judul: 'Tingkatkan Nilai Reformasi Birokrasi, Biro Organisasi Implementasikan PermenPANRB No 3 Tahun 2023.',
    file: '/images/pressrelease/Diskominfo/IMG_20230707_165242.jpg',
    kategori: 'kegiatan',
  },
  {
    judul: 'Dinas Pariwisata Provinsi Sulawesi Gelar Sosialiasi PERMENPAN RB No. 7 Tahun 2022 Dan Tata Cara Pelaporan Angka Kredit Pejabat Fungsional',
    file: '/images/pressrelease/WhatsApp_Image_2023-01-30_at_134255.jpeg',
    kategori: 'kegiatan',
  },
  {
    judul: 'Upacara Bendera Perdana Dinas Pariwisata Provinsi Sulawesi Tengah di Tahun 2023',
    file: '/images/pressrelease/WhatsApp_Image_2023-01-13_at_090326.jpeg',
    kategori: 'kegiatan',
  },
  {
    judul: 'Upacara Bendera Perdana Dinas Pariwisata Provinsi Sulawesi Tengah Tahun 2022',
    file: '/images/pressrelease/WhatsApp_Image_2022-08-29_at_103241.jpeg',
    kategori: 'kegiatan',
  },
  {
    judul: 'Sosialisasi Permenpan RB No. 6 Tahun 2022 : Gubernur Sulteng Tekankan Kinerja ASN',
    file: '/images/pressrelease/WhatsApp_Image_2022-08-29_at_103241.jpeg',
    kategori: 'kegiatan',
  },
  {
    judul: 'Rapat Perdana Tim PPID Dinas Pariwisata Provinsi Sulawesi Tengah Tahun 2022',
    file: '/images/pressrelease/RAPAT_PERDANA.jpeg',
    kategori: 'kegiatan',
  },
  {
    judul: 'Hari Perdana Masuk Kerja Pasca Cuti Bersama: Dispar Sulteng Gelar Apel Pagi',
    file: '/images/pressrelease/sekretariat/WhatsApp_Image_2022-05-09_at_12500_PM.jpeg',
    kategori: 'kegiatan',
  },
  {
    judul: 'Apel Pagi Perdana Setiap Hari Senin Dinas Pariwisata Provinsi Sulawesi Tengah Di Tahun 2022',
    file: '/images/pressrelease/sekretariat/WhatsApp_Image_2022-01-10_at_81456_AM.jpeg',
    kategori: 'kegiatan',
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
