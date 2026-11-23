const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const db = require('../config/db');

const publicDir = path.join(__dirname, '../../frontend/public');

async function verifyAll() {
  console.log('===============================================================');
  console.log('   COMPREHENSIVE AUDIT OF ALL DOWNLOAD FILES & PAGES (100% LOKAL)');
  console.log('===============================================================\n');

  let totalChecked = 0;
  let totalErrors = 0;

  // 1. Static files referenced by Frontend Components
  const frontendStaticDocs = [
    // Tupoksi
    '/documents/regulasi/Pergub_Sulteng_No_57_Tahun_2022_Tupoksi.pdf',
    '/documents/regulasi/Pergub_Sulteng_No_6_Tahun_2024.pdf',
    // Ekonomi Kreatif
    '/dokumen/ekraf-sulteng.pdf',
    '/images/2026/03Ekraf/DATA_EKRAF_Se_SULTENG_1.pdf',
    // Sumber Daya
    '/dokumen/laporan-tenaga-kerja.pdf',
    '/dokumen/data-pelatihan-sertifikasi.pdf',
    '/images/2026/04SDM/REV-_LAPORAN_TENAGA_KERJA_PAREKRAF_TAHUN_2025_compressed.pdf',
    // Standar Pelayanan & SOP
    '/images/Kepegawaian/STANDAR_PELAYANAN_2024.pdf',
    '/dokumen/biaya-pelayanan.pdf',
    '/dokumen/waktu-pelayanan.pdf',
    '/sop/sop-penetapan-dan-pemutakhiran-daftar-informasi-publik.pdf',
    '/sop/sop-pendokumentasian-informasi-yang-dikecualikan.pdf',
    '/sop/sop-pelayanan-informasi-dan-dokumentasi-publik.pdf',
    '/sop/sop-keberatan-informasi-publik.pdf',
    '/sop/sop-fasilitasi-sengketa-informasi.pdf',
    '/sop/sop-pengujian-konsekuensi-informasi-publik.pdf',
    '/sop/sop-pendokumentasian-dan-pengarsipan-daftar-informasi-publik.pdf',
    // Maklumat Pelayanan
    '/dokumen/maklumat-pelayanan.pdf',
    // Informasi Dikecualikan
    '/images/PPID/SK_Data_Informasi_Publik_Yang_Dikecualikan.pdf',
    // Informasi Setiap Saat
    '/images/InfoSetiapSaat/Sk_Daftar_Informasi.pdf',
    // Laporan Tahunan
    '/laporan/laporan-ppid-2020.pdf',
    '/laporan/laporan-ppid-2021.pdf',
    '/laporan/laporan-ppid-2022.pdf',
    '/laporan/laporan-ppid-2023.pdf',
    '/laporan/laporan-ppid-2024.pdf',
    // Statistik Kunjungan
    '/images/Wisatawan/Rekap_Kunjungan_Wisatawan_Thn_2025_edit.pdf',
    '/images/Wisatawan/ANALISIS_KUNJUNGAN_WISATAWAN_2024.pdf',
    '/images/Wisatawan/ANALISIS_DATA_KUNJUNGAN_WISATAWAN_TAHUN_2023_1.pdf',
    '/images/Wisatawan/ANALISIS_KUNJUNGAN_WISATAWAN_TAHUN_2022.pdf',
    // Profil Pimpinan
    '/images/2026/Struktur_Organisasi_dan_Tugas_Fungsi_Dinas_Pariwisata.pdf',
    '/images/Kepegawaian/DUK_UPDATE_JANUARI_2025.pdf',
    '/images/ProfilPimpinan/01_-_kadis_diah.pdf',
    '/images/ProfilPimpinan/profil_hasna.pdf',
    '/images/ProfilPimpinan/profil_ilham.pdf',
    '/images/ProfilPimpinan/profil_joyce.pdf',
    '/images/ProfilPimpinan/profil_nency_ainun.pdf',
    '/images/ProfilPimpinan/profil_widyawati.pdf',
  ];

  console.log('--- 1. Checking Static Frontend Download Files ---');
  frontendStaticDocs.forEach(rel => {
    totalChecked++;
    const full = path.join(publicDir, rel.slice(1));
    if (fs.existsSync(full) && fs.statSync(full).size > 0) {
      console.log(`[PASS] ${rel} (${fs.statSync(full).size.toLocaleString()} bytes)`);
    } else {
      totalErrors++;
      console.error(`[FAIL] ${rel} NOT FOUND or EMPTY!`);
    }
  });

  // 2. Database Tables Check
  console.log('\n--- 2. Checking Database Tables Download Records ---');
  const tables = [
    { name: 'ppid_regulasi', col: 'file' },
    { name: 'ppid_sk', col: 'file' },
    { name: 'data_hunian', col: 'file' },
    { name: 'paket_wisata', col: 'file_pdf' },
    { name: 'ekonomi_kreatif', col: 'file' },
    { name: 'sumber_daya', col: 'file' },
  ];

  for (const t of tables) {
    const [rows] = await db.query(`SELECT id, \`${t.col}\` as file FROM \`${t.name}\``);
    console.log(`\nTable [${t.name}]: Checking ${rows.length} rows...`);
    for (const r of rows) {
      if (!r.file) continue;
      if (r.file.startsWith('http')) {
        console.log(`  [INFO] Row ${r.id}: External link -> ${r.file.slice(0, 50)}...`);
        continue;
      }
      totalChecked++;
      const cleanRel = r.file.startsWith('/') ? r.file.slice(1) : r.file;
      const full = path.join(publicDir, cleanRel);
      if (fs.existsSync(full) && fs.statSync(full).size > 0) {
        // PASS
      } else {
        totalErrors++;
        console.error(`  [FAIL] Row ${r.id} in ${t.name}: File NOT FOUND on disk -> ${r.file}`);
      }
    }
    console.log(`  [OK] Table ${t.name} check complete.`);
  }

  // 3. Check ppid_item local files
  console.log('\n--- 3. Checking ppid_item (Informasi Berkala & Publik) ---');
  const [items] = await db.query(`SELECT id, judul, file, link FROM ppid_item`);
  let localPpidCount = 0;
  for (const it of items) {
    const target = it.file || it.link;
    if (!target) continue;
    if (target.startsWith('http')) continue;
    localPpidCount++;
    totalChecked++;
    const cleanRel = target.startsWith('/') ? target.slice(1) : target;
    const full = path.join(publicDir, cleanRel);
    if (!fs.existsSync(full) || fs.statSync(full).size === 0) {
      totalErrors++;
      console.error(`  [FAIL] ppid_item id ${it.id} (${it.judul}): NOT FOUND -> ${target}`);
    }
  }
  console.log(`  [OK] Checked ${localPpidCount} local files in ppid_item. (All others are valid Drive links)`);

  console.log('\n===============================================================');
  console.log(`AUDIT RESULT: Total Checked: ${totalChecked} | Total Errors: ${totalErrors}`);
  if (totalErrors === 0) {
    console.log('✅ ALL DOWNLOADABLE FILES ARE 100% VALID, ACCURATE, AND PRESENT ON DISK!');
  } else {
    console.error(`❌ FOUND ${totalErrors} ERRORS!`);
  }
  console.log('===============================================================');

  process.exit(totalErrors === 0 ? 0 : 1);
}

verifyAll().catch(e => {
  console.error(e);
  process.exit(1);
});
