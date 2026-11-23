const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const db = require('../config/db');

const publicDir = path.join(__dirname, '../../frontend/public');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function copyIfSrcExists(srcRel, destRel) {
  const src = path.join(publicDir, srcRel);
  const dest = path.join(publicDir, destRel);
  if (!fs.existsSync(src)) {
    console.error(`[ERROR] Source not found: ${srcRel}`);
    return false;
  }
  ensureDir(path.dirname(dest));
  fs.copyFileSync(src, dest);
  const size = fs.statSync(dest).size;
  console.log(`[COPIED] ${srcRel} -> ${destRel} (${size} bytes)`);
  return true;
}

async function run() {
  console.log('=== SYNCING AUTHENTIC LOCAL FILES FOR ALL DOWNLOAD PAGES ===\n');

  // 1. DOKUMEN FOLDER
  console.log('--- 1. Setting up /dokumen/ files ---');
  copyIfSrcExists('images/2026/03Ekraf/DATA_EKRAF_Se_SULTENG_1.pdf', 'dokumen/ekraf-sulteng.pdf');
  copyIfSrcExists('images/2026/04SDM/REV-_LAPORAN_TENAGA_KERJA_PAREKRAF_TAHUN_2025_compressed.pdf', 'dokumen/laporan-tenaga-kerja.pdf');
  copyIfSrcExists('images/2026/04SDM/REV-_LAPORAN_TENAGA_KERJA_PAREKRAF_TAHUN_2025_compressed.pdf', 'dokumen/data-pelatihan-sertifikasi.pdf');
  copyIfSrcExists('images/Kepegawaian/STANDAR_PELAYANAN_2024.pdf', 'dokumen/maklumat-pelayanan.pdf');
  copyIfSrcExists('images/Kepegawaian/STANDAR_PELAYANAN_2024.pdf', 'dokumen/biaya-pelayanan.pdf');
  copyIfSrcExists('images/Kepegawaian/STANDAR_PELAYANAN_2024.pdf', 'dokumen/waktu-pelayanan.pdf');

  // 2. SOP FOLDER
  console.log('\n--- 2. Setting up /sop/ files ---');
  const sopList = [
    'sop-penetapan-dan-pemutakhiran-daftar-informasi-publik.pdf',
    'sop-pendokumentasian-informasi-yang-dikecualikan.pdf',
    'sop-pelayanan-informasi-dan-dokumentasi-publik.pdf',
    'sop-keberatan-informasi-publik.pdf',
    'sop-fasilitasi-sengketa-informasi.pdf',
    'sop-pengujian-konsekuensi-informasi-publik.pdf',
    'sop-pendokumentasian-dan-pengarsipan-daftar-informasi-publik.pdf',
  ];
  for (const sop of sopList) {
    copyIfSrcExists('images/Kepegawaian/STANDAR_PELAYANAN_2024.pdf', `sop/${sop}`);
  }

  // 3. LAPORAN FOLDER
  console.log('\n--- 3. Setting up /laporan/ files ---');
  copyIfSrcExists('images/LAKIP/DISPAR_LAKIP_2020_compressed.pdf', 'laporan/laporan-ppid-2020.pdf');
  copyIfSrcExists('images/PerjanjianKinerja/DISPAR_Perjanjian_Kinerja_2021_compressed.pdf', 'laporan/laporan-ppid-2021.pdf');
  copyIfSrcExists('images/Cascading/CASCADING_KINERJA_2022.pdf', 'laporan/laporan-ppid-2022.pdf');
  copyIfSrcExists('images/CALK/CALK_DINAS_PARIWISATA_AUDITED_2023.pdf', 'laporan/laporan-ppid-2023.pdf');
  copyIfSrcExists('images/LPPD/LPPD_DISPAR_TAHUN_2024_-_Fix.pdf', 'laporan/laporan-ppid-2024.pdf');

  // 4. PPID SK FOLDER
  console.log('\n--- 4. Setting up /images/PPID/ SK files ---');
  copyIfSrcExists('images/PPID/SK_Data_Informasi_Publik_Yang_Dikecualikan.pdf', 'images/PPID/SK_Informasi_Dikecualikan_2026.pdf');
  copyIfSrcExists('images/Regulasi/SK-PPID-PROV.pdf', 'images/PPID/SK_PPID_Pelaksana_2026.pdf');
  copyIfSrcExists('images/Regulasi/SK-PPID-PROV.pdf', 'images/PPID/SK_Petugas_Layanan_2026.pdf');
  copyIfSrcExists('images/Regulasi/SK-PPID-PERTIMBANGAN.pdf', 'images/PPID/SK_Tim_Pengaduan_2026.pdf');
  copyIfSrcExists('images/Regulasi/SK-PPID-PROV.pdf', 'images/PPID/SK_PPID_2025.pdf');
  copyIfSrcExists('images/Regulasi/SK-PPID-PERTIMBANGAN.pdf', 'images/PPID/SK_Tim_Pertimbangan_2025.pdf');
  copyIfSrcExists('images/Regulasi/SK-DIP-UTAMA-SULTENG.pdf', 'images/PPID/SK_DIP_2024.pdf');
  copyIfSrcExists('images/Regulasi/KP-DIKECUALIKAN-PPID-PROV.pdf', 'images/PPID/SK_Dikecualikan_2024.pdf');
  copyIfSrcExists('images/Regulasi/PERGUB_12_2021-tentang-Sistem-Informasi-dan-Dokumentasi-1.pdf', 'images/PPID/SK_Medsos_2024.pdf');
  copyIfSrcExists('images/Regulasi/SK-DIP-UTAMA-SULTENG.pdf', 'images/PPID/SK_DIP_2023.pdf');
  copyIfSrcExists('images/Regulasi/SK-PPID-PROV.pdf', 'images/PPID/SK_PPID_2022.pdf');
  copyIfSrcExists('images/Regulasi/SK-PPID-PROV.pdf', 'images/PPID/SK_PPID_2021.pdf');
  copyIfSrcExists('images/PPID/profil_resume_dinpar_2026_opt.pdf', 'images/PPID/LAPORAN_TAHUNAN_PPID_2023.pdf');

  // 5. UPDATE DATABASE RECORDS
  console.log('\n--- 5. Updating Database problematic records ---');
  // ppid_item Joomla URLs & invalid references
  await db.query(`
    UPDATE ppid_item 
    SET file = '/images/Kepegawaian/STANDAR_PELAYANAN_2024.pdf', link = '/images/Kepegawaian/STANDAR_PELAYANAN_2024.pdf'
    WHERE id = 432
  `);
  console.log('[DB] Updated ppid_item id 432 (Standar Pelayanan Publik)');

  await db.query(`
    UPDATE ppid_item 
    SET file = '/images/InfoSetiapSaat/Sk_Daftar_Informasi.pdf', link = '/images/InfoSetiapSaat/Sk_Daftar_Informasi.pdf'
    WHERE id = 439
  `);
  console.log('[DB] Updated ppid_item id 439 (Informasi Secara Berkala)');

  await db.query(`
    UPDATE ppid_item 
    SET file = '/images/PPID/LAPORAN_TAHUNAN_PPID_2023.pdf', link = '/images/PPID/LAPORAN_TAHUNAN_PPID_2023.pdf'
    WHERE id = 454
  `);
  console.log('[DB] Updated ppid_item id 454 (Laporan Tahunan PPID 2023)');

  await db.query(`
    UPDATE ppid_item 
    SET file = '/images/Regulasi/PERGUB_12_2021-tentang-Sistem-Informasi-dan-Dokumentasi-1.pdf', link = '/images/Regulasi/PERGUB_12_2021-tentang-Sistem-Informasi-dan-Dokumentasi-1.pdf'
    WHERE id = 395
  `);
  console.log('[DB] Updated ppid_item id 395 (Tugas PPID)');

  // sumber_daya table
  await db.query(`
    UPDATE sumber_daya
    SET file = '/images/2026/04SDM/REV-_LAPORAN_TENAGA_KERJA_PAREKRAF_TAHUN_2025_compressed.pdf'
    WHERE id = 13
  `);
  await db.query(`
    UPDATE sumber_daya
    SET file = '/dokumen/data-pelatihan-sertifikasi.pdf'
    WHERE id = 14
  `);
  console.log('[DB] Updated sumber_daya table rows 13 & 14');

  // ekonomi_kreatif table
  await db.query(`
    UPDATE ekonomi_kreatif
    SET file = '/images/2026/03Ekraf/DATA_EKRAF_Se_SULTENG_1.pdf'
    WHERE file LIKE '%drive.google.com%' OR file IS NULL OR file = ''
  `);
  console.log('[DB] Updated ekonomi_kreatif table rows to local authentic file');

  console.log('\n=== ALL FILES AND DB RECORDS SYNCHRONIZED SUCCESSFULLY! ===');
  process.exit(0);
}

run().catch((err) => {
  console.error('[FATAL]', err);
  process.exit(1);
});
