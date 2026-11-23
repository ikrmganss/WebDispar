const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { getAll, create, toggle, delete: del } = require('../controllers/sliderController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Slider.jsx menampilkan gambar dari `${BASE_URL}/uploads/slider/<nama file>`,
// sedangkan app.js menyajikan folder backend/uploads/ di URL /uploads.
// Karena uploadMiddleware bawaan menyimpan semua file langsung di uploads/
// (tanpa subfolder), route ini memakai storage multer sendiri yang menyimpan
// file ke backend/uploads/slider/ agar URL di atas benar-benar mengembalikan file.
// Folder dibuat otomatis saat server start (masuk .gitignore via backend/uploads/*,
// jadi tidak ikut ter-commit; hanya berisi file hasil upload).
const sliderDir = path.join(__dirname, '../uploads/slider');
fs.mkdirSync(sliderDir, { recursive: true });

const sliderStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, sliderDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|gif/;
  const ext = allowed.test(path.extname(file.originalname).toLowerCase());
  const mime = allowed.test(file.mimetype);
  if (ext && mime) cb(null, true);
  else cb(new Error('Format file tidak didukung'));
};

const uploadSlider = multer({ storage: sliderStorage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

router.get('/all', getAll);
router.post('/', verifyToken, isAdmin, uploadSlider.single('gambar'), create);
router.patch('/:id/toggle', verifyToken, isAdmin, toggle);
router.delete('/:id', verifyToken, isAdmin, del);

module.exports = router;
