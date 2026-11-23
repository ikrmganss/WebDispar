const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function importDatabase() {
  const mysqlBin = 'D:\\laragon\\laragon\\bin\\mysql\\mysql-8.4.3-winx64\\bin\\mysql.exe';

  console.log('1. Creating database sulteng_tourism if not exists...');
  execSync(`"${mysqlBin}" -u root -e "CREATE DATABASE IF NOT EXISTS sulteng_tourism CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"`);
  console.log('Database sulteng_tourism ready.');

  const sqlPath = path.join(__dirname, 'sulteng_tourism.sql');
  console.log('2. Importing SQL dump (skipping corrupt 6-byte header, decoding UTF-16, piping into MySQL)...');

  const mysqlProcess = spawn(mysqlBin, ['-u', 'root', '--default-character-set=utf8mb4', 'sulteng_tourism'], {
    stdio: ['pipe', 'inherit', 'inherit']
  });

  // Skip the 6 corrupted BOM bytes and read the rest as utf16le
  const readStream = fs.createReadStream(sqlPath, { start: 6, encoding: 'utf16le' });

  readStream.pipe(mysqlProcess.stdin);

  mysqlProcess.on('close', (code) => {
    if (code === 0) {
      console.log('3. Migration completed successfully with code 0!');
    } else {
      console.error(`Migration process exited with code ${code}`);
    }
  });
}

importDatabase().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
