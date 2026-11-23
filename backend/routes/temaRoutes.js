const express = require('express');
const router = express.Router();
const { getTema, updateTema, resetTema } = require('../controllers/temaController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', getTema);
router.put('/', verifyToken, isAdmin, updateTema);
router.post('/reset', verifyToken, isAdmin, resetTema);

module.exports = router;
