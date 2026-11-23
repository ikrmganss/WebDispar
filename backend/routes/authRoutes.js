const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { login, register } = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Brute-force protection: batas 10 percobaan per 15 menit per IP
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Terlalu banyak percobaan login gagal dari IP ini. Silakan coba lagi setelah 15 menit demi keamanan.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/login', loginLimiter, login);
router.post('/register', verifyToken, isAdmin, register);

module.exports = router;
