const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.post('/login', login);
router.post('/register', verifyToken, isAdmin, register);

module.exports = router;