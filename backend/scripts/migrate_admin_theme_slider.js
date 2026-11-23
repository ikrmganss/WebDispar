const mysql = require('mysql2/promise');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function migrate() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'sulteng_tourism'
  });

  console.log('Migrating tables for Admin Theme & Slider...');

  await connection.query(`
    CREATE TABLE IF NOT EXISTS \`pengaturan_tema\` (
      \`id\` INT(11) NOT NULL PRIMARY KEY DEFAULT 1,
      \`primary_color\` VARCHAR(50) DEFAULT '#1F5BA6',
      \`secondary_color\` VARCHAR(50) DEFAULT '#383087',
      \`accent_color\` VARCHAR(50) DEFAULT '#5C2180',
      \`highlight_color\` VARCHAR(50) DEFAULT '#f59e0b',
      \`nama_tema\` VARCHAR(100) DEFAULT 'Sulteng Biru Ungu',
      \`badge_icon\` VARCHAR(50) DEFAULT 'none',
      \`seasonal_badge\` VARCHAR(255) DEFAULT '',
      \`updated_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
  console.log('✅ Table pengaturan_tema ready');

  await connection.query(`
    INSERT INTO \`pengaturan_tema\` (\`id\`, \`primary_color\`, \`secondary_color\`, \`accent_color\`, \`highlight_color\`, \`nama_tema\`, \`badge_icon\`, \`seasonal_badge\`)
    VALUES (1, '#1F5BA6', '#383087', '#5C2180', '#f59e0b', 'Sulteng Biru Ungu', 'none', '')
    ON DUPLICATE KEY UPDATE \`id\` = \`id\`;
  `);
  console.log('✅ Default tema row ready');

  await connection.query(`
    CREATE TABLE IF NOT EXISTS \`slider\` (
      \`id\` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
      \`judul\` VARCHAR(255) DEFAULT '',
      \`gambar\` VARCHAR(255) NOT NULL,
      \`urutan\` INT(11) DEFAULT 1,
      \`aktif\` TINYINT(1) DEFAULT 1,
      \`created_at\` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
  console.log('✅ Table slider ready');

  await connection.end();
  console.log('🎉 Migration completed successfully!');
}

migrate().catch((err) => {
  console.error('❌ Migration failed:', err.message);
  process.exit(1);
});
