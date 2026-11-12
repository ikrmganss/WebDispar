const db = require('../config/db');

// Daftar Informasi Publik
exports.getKategori = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM ppid_kategori ORDER BY urutan ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getItemsByKategori = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM ppid_item WHERE kategori_id = ?', [req.params.kategoriId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createItem = async (req, res) => {
  const { kategori_id, judul, link, tahun } = req.body;
  const file = req.file ? req.file.filename : null;
  try {
    await db.query('INSERT INTO ppid_item (kategori_id, judul, file, link, tahun) VALUES (?, ?, ?, ?, ?)', [kategori_id, judul, file, link, tahun]);
    res.status(201).json({ message: 'Item berhasil dibuat' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Regulasi
exports.getRegulasi = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM ppid_regulasi ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createRegulasi = async (req, res) => {
  const { judul, kategori } = req.body;
  const file = req.file ? req.file.filename : null;
  try {
    await db.query('INSERT INTO ppid_regulasi (judul, file, kategori) VALUES (?, ?, ?)', [judul, file, kategori || 'umum']);
    res.status(201).json({ message: 'Regulasi berhasil dibuat' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// SK
exports.getSK = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM ppid_sk ORDER BY tahun DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createSK = async (req, res) => {
  const { judul, tahun } = req.body;
  const file = req.file ? req.file.filename : null;
  try {
    await db.query('INSERT INTO ppid_sk (judul, tahun, file) VALUES (?, ?, ?)', [judul, tahun, file]);
    res.status(201).json({ message: 'SK berhasil dibuat' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Laporan Tahunan
exports.getLaporanTahunan = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM ppid_item WHERE kategori_id = (SELECT id FROM ppid_kategori WHERE slug='laporan-tahunan') ORDER BY tahun DESC");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Form Permohonan
exports.createPermohonan = async (req, res) => {
  const { nama, alamat, email, no_telp, rincian, cara_mendapatkan } = req.body;
  try {
    await db.query('INSERT INTO permohonan_informasi (nama, alamat, email, no_telp, rincian, cara_mendapatkan) VALUES (?, ?, ?, ?, ?, ?)', [nama, alamat, email, no_telp, rincian, cara_mendapatkan]);
    res.status(201).json({ message: 'Permohonan berhasil dikirim' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Form Keberatan
exports.createKeberatan = async (req, res) => {
  const { tanggal, nomor_registrasi, nomor_permohonan, tujuan, nama, alamat, no_telp, alasan, kasus_posisi } = req.body;
  try {
    await db.query('INSERT INTO keberatan_informasi (tanggal, nomor_registrasi, nomor_permohonan, tujuan, nama, alamat, no_telp, alasan, kasus_posisi) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [tanggal, nomor_registrasi, nomor_permohonan, tujuan, nama, alamat, no_telp, alasan, kasus_posisi]);
    res.status(201).json({ message: 'Keberatan berhasil dikirim' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Survey Kepuasan
exports.createSurvey = async (req, res) => {
  const { nama, nik, jawaban } = req.body;
  try {
    await db.query('INSERT INTO survey_kepuasan (nama, nik, jawaban) VALUES (?, ?, ?)', [nama, nik, JSON.stringify(jawaban)]);
    res.status(201).json({ message: 'Survey berhasil dikirim' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};