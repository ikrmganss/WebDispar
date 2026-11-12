const db = require('../config/db');

exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM rencana_terbit ORDER BY jadwal_rilis DESC');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  const { judul, jadwal_rilis, status } = req.body;
  try {
    await db.query('INSERT INTO rencana_terbit (judul, jadwal_rilis, status) VALUES (?, ?, ?)', [judul, jadwal_rilis, status || 'Belum Rilis']);
    res.status(201).json({ message: 'Rencana Terbit berhasil dibuat' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  const { judul, jadwal_rilis, status } = req.body;
  try {
    await db.query('UPDATE rencana_terbit SET judul=?, jadwal_rilis=?, status=? WHERE id=?', [judul, jadwal_rilis, status, req.params.id]);
    res.json({ message: 'Rencana Terbit berhasil diupdate' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await db.query('DELETE FROM rencana_terbit WHERE id = ?', [req.params.id]);
    res.json({ message: 'Rencana Terbit berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};