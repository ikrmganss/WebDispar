# Website Resmi Dinas Pariwisata Provinsi Sulawesi Tengah

Portal informasi resmi Dinas Pariwisata Provinsi Sulawesi Tengah yang menyajikan data destinasi, berita pariwisata, kalender event, layanan informasi publik (PPID), dan dokumen regulasi resmi.

---

## 🛠️ Prasyarat Sistem
Sebelum menjalankan aplikasi, pastikan komputer Anda telah terpasang:
- **Node.js** (v18.x atau v20.x LTS direkomendasikan) & **npm**
- **MySQL Server** (versi 8.x) atau **XAMPP / Laragon**
- **Git**

---

## 🚀 Panduan Setup Lokal (Langkah Cepat)

### 1. Clone Repository
```bash
git clone https://github.com/draconik514/WebDispar.git
cd WebDispar
```

---

### 2. Setup Database MySQL
1. Buka MySQL Client Anda (phpMyAdmin, DBeaver, HeidiSQL, atau Terminal MySQL).
2. Buat database baru bernama **`sulteng_tourism`**:
   ```sql
   CREATE DATABASE sulteng_tourism CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
3. Import file database yang sudah disediakan di folder `database/`:
   - File: **`database/sulteng_tourism.sql`**
   - Atau lewat terminal:
     ```bash
     mysql -u root -p sulteng_tourism < database/sulteng_tourism.sql
     ```

---

### 3. Setup Backend API
1. Masuk ke direktori `backend`:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Salin template `.env.example` menjadi `.env`:
   ```bash
   # Windows (PowerShell / Command Prompt)
   copy .env.example .env

   # Linux / macOS / Git Bash
   cp .env.example .env
   ```
4. Buka file `.env` di text editor dan sesuaikan kredensial MySQL lokal Anda:
   ```env
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=isi_password_mysql_anda
   DB_NAME=sulteng_tourism
   JWT_SECRET=rahasia_sulteng_2026
   ```
5. Jalankan server Backend:
   ```bash
   npm run dev
   ```
   > Backend akan berjalan di: **`http://localhost:5000`**

---

### 4. Setup Frontend
1. Buka terminal baru, lalu masuk ke direktori `frontend`:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Jalankan server Frontend:
   ```bash
   npm run dev
   ```
   > Frontend akan berjalan di: **`http://localhost:3000`**

---

## 📂 Struktur Direktori
```text
├── backend/
│   ├── config/          # Konfigurasi database & koneksi
│   ├── controllers/     # Controller logika bisnis (berita, PPID, profil, dll.)
│   ├── middlewares/     # Middleware auth JWT & upload file (Multer)
│   ├── routes/          # Definisi endpoint REST API
│   ├── uploads/         # Folder penampung media unggahan pengguna
│   ├── .env.example     # Template variabel lingkungan backend
│   └── server.js        # Entry point server Express
│
├── frontend/
│   ├── public/          # Dokumen publik (PDF regulasi, banner, gambar statis)
│   ├── src/             # Source code React (Components, Pages, Hooks)
│   ├── .env.example     # Template variabel lingkungan frontend (opsional)
│   └── vite.config.js   # Konfigurasi Vite & API Proxy
│
└── database/
    └── sulteng_tourism.sql # Dump database lengkap skema & data awal
```

---

## 📌 Catatan Tambahan
- **Dokumen Regulasi & Media Statis:** Seluruh dokumen resmi PDF (seperti dokumen Permenpar, Kepmendagri, dan Ripparda) tersimpan di folder `frontend/public/images/Regulasi/` dan otomatis ter-load saat frontend berjalan.
- **Folder Uploads:** Folder `backend/uploads/` disiapkan untuk menyimpan file unggahan baru saat ada penambahan konten melalui admin panel.

---

## 📊 Logika & Arsitektur Statistik Kunjungan Wisatawan
1. **Bagaimana Grafik Wisatawan Bekerja:**
   - Statistik kunjungan wisatawan **TIDAK dianalisis menggunakan AI saat admin upload PDF** (karena parsing PDF otomatis rentan error dan membebani server).
   - Data grafik dibaca langsung dari tabel terstruktur database **`statistik_kunjungan`** (kolom: `tahun`, `bulan`, `domestik`, `mancanegara`).
   - Dokumen PDF resmi (seperti `ANALISIS_KUNJUNGAN_WISATAWAN_2024.pdf`) berfungsi sebagai **arsip publik dan lampiran resmi rilis Dispar & BPS** yang dapat diunduh langsung oleh masyarakat.
2. **Data Resmi yang Digunakan (Dispar & BPS Sulteng):**
   - **Tahun 2025:** 11.668.933 Wisnus, 28.165 Wisman (Total 11.697.098 — Realisasi 129,65% Target). Puncak kunjungan di bulan April & Desember, puncak wisman di bulan Agustus. Disahkan Dispar Sulteng 03 Februari 2026.
   - **Tahun 2024:** 9.216.969 Wisnus, 23.973 Wisman (Total 9.240.942 — Capaian 167,58% Target). Puncak kunjungan di bulan April & Desember, terendah bulan Agustus.
   - **Tahun 2023:** 5.139.979 Wisnus, 8.382 Wisman (Total 5.148.361). Puncak di bulan Mei, terendah bulan November.
   - **Tahun 2022:** 1.317.958 Wisnus, 3.280 Wisman (Total 1.321.238).
   - Data tahun 2026 belum diterbitkan karena tahun 2026 merupakan tahun berjalan (*running year*) dan baru akan direkapitulasi secara tahunan setelah tahun berakhir.

---

## 📄 Lisensi
Hak Cipta © 2026 Dinas Pariwisata Provinsi Sulawesi Tengah.
