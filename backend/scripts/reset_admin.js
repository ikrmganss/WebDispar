const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function resetAdmin() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sulteng_tourism'
  });

  const username = 'admin';
  const plainPassword = 'admin123';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  const [existing] = await connection.query('SELECT * FROM users WHERE username = ?', [username]);
  if (existing.length > 0) {
    await connection.query('UPDATE users SET password = ?, role = ? WHERE username = ?', [hashedPassword, 'superadmin', username]);
    console.log(`✅ Password untuk user '${username}' berhasil diupdate menjadi: '${plainPassword}'`);
  } else {
    await connection.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, 'superadmin']);
    console.log(`✅ User baru '${username}' berhasil dibuat dengan password: '${plainPassword}'`);
  }

  await connection.end();
}

resetAdmin().catch((err) => {
  console.error('❌ Gagal mereset admin:', err.message);
});
