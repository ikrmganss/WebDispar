const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, judul, gambar, urutan, CAST(aktif AS UNSIGNED) AS aktif, created_at FROM slider ORDER BY urutan ASC, id ASC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  const { judul } = req.body;
  const urutan = parseInt(req.body.urutan) || 1;
  const gambar = req.file ? req.file.filename : null;
  try {
    await db.query('INSERT INTO slider (judul, gambar, urutan, aktif) VALUES (?, ?, ?, 1)', [judul || null, gambar, urutan]);
    res.status(201).json({ message: 'Slider berhasil dibuat' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggle = async (req, res) => {
  const aktif = Number(req.body.aktif);
  if (aktif !== 0 && aktif !== 1) {
    return res.status(400).json({ message: 'Nilai aktif harus 0 atau 1' });
  }
  try {
    await db.query('UPDATE slider SET aktif = ? WHERE id = ?', [aktif, req.params.id]);
    res.json({ message: 'Status slider berhasil diubah', aktif });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await db.query('DELETE FROM slider WHERE id = ?', [req.params.id]);
    res.json({ message: 'Slider berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
