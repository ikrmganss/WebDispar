const db = require('../config/db');

exports.getPengunjung = async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const [todayRows] = await db.query('SELECT COUNT(*) as total FROM pengunjung WHERE tanggal = ?', [today]);
    const [yesterdayRows] = await db.query('SELECT COUNT(*) as total FROM pengunjung WHERE tanggal = DATE_SUB(?, INTERVAL 1 DAY)', [today]);
    const [weekRows] = await db.query('SELECT COUNT(*) as total FROM pengunjung WHERE YEARWEEK(tanggal) = YEARWEEK(?)', [today]);
    const [monthRows] = await db.query('SELECT COUNT(*) as total FROM pengunjung WHERE MONTH(tanggal) = MONTH(?) AND YEAR(tanggal) = YEAR(?)', [today, today]);
    const [allRows] = await db.query('SELECT COUNT(*) as total FROM pengunjung');
    res.json({
      today: todayRows[0].total,
      yesterday: yesterdayRows[0].total,
      thisWeek: weekRows[0].total,
      thisMonth: monthRows[0].total,
      allDays: allRows[0].total
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.trackVisitor = async (req, res) => {
  const ip = req.ip || req.connection.remoteAddress;
  const today = new Date().toISOString().split('T')[0];
  try {
    const [existing] = await db.query('SELECT * FROM pengunjung WHERE ip = ? AND tanggal = ?', [ip, today]);
    if (existing.length > 0) {
      await db.query('UPDATE pengunjung SET hits = hits + 1 WHERE id = ?', [existing[0].id]);
    } else {
      await db.query('INSERT INTO pengunjung (ip, tanggal, hits) VALUES (?, ?, 1)', [ip, today]);
    }
    res.json({ message: 'Visitor tracked' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getWisatawan = async (req, res) => {
  try {
    // Ambil tahun terbaru dari data resmi yang ada di tabel statistik_kunjungan
    const [yearRows] = await db.query('SELECT MAX(CAST(tahun AS UNSIGNED)) as latestYear FROM statistik_kunjungan');
    const tahun = req.query.tahun || (yearRows[0]?.latestYear ? String(yearRows[0].latestYear) : '2024');

    const [sumRows] = await db.query(
      'SELECT SUM(domestik) as total_domestik, SUM(mancanegara) as total_mancanegara FROM statistik_kunjungan WHERE tahun = ?',
      [tahun]
    );

    const domestic = Number(sumRows[0]?.total_domestik || 0);
    const international = Number(sumRows[0]?.total_mancanegara || 0);
    const total = domestic + international;

    // Perbandingan dengan tahun sebelumnya untuk persentase pertumbuhan resmi
    const tahunLalu = String(Number(tahun) - 1);
    const [prevRows] = await db.query(
      'SELECT SUM(domestik) as total_domestik, SUM(mancanegara) as total_mancanegara FROM statistik_kunjungan WHERE tahun = ?',
      [tahunLalu]
    );
    const prevTotal = Number(prevRows[0]?.total_domestik || 0) + Number(prevRows[0]?.total_mancanegara || 0);
    const growth = prevTotal > 0 ? Number((((total - prevTotal) / prevTotal) * 100).toFixed(2)) : 0;

    res.json({
      tahun,
      domestic,
      international,
      total,
      growth,
      prevTahun: prevTotal > 0 ? tahunLalu : null
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getIKM = async (req, res) => {
  try {
    // Data IKM statis atau dari database
    res.json({
      nilai: 89.444,
      predikat: 'SANGAT BAIK',
      unsur: [
        { kode: 'U1', nama: 'Persyaratan', nilai: 3533 },
        { kode: 'U2', nama: 'Prosedur', nilai: 3533 },
        { kode: 'U3', nama: 'Waktu Pelayanan', nilai: 3350 },
        { kode: 'U4', nama: 'Biaya/Tarif', nilai: 3983 },
        { kode: 'U5', nama: 'Produk Layanan', nilai: 3383 },
        { kode: 'U6', nama: 'Kompetensi Pelaksana', nilai: 3600 },
        { kode: 'U7', nama: 'Perilaku Pelaksana', nilai: 3617 },
        { kode: 'U8', nama: 'Sarana dan Prasarana', nilai: 3350 },
        { kode: 'U9', nama: 'Penanganan Pengaduan', nilai: 3850 }
      ]
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};