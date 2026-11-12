const express = require('express');
const router = express.Router();
const { getByKategori, getPejabat, createProfil, updateProfil, createPejabat, deletePejabat } = require('../controllers/profilController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get('/:kategori', getByKategori);
router.get('/pejabat/all', getPejabat);
router.post('/', verifyToken, isAdmin, upload.single('gambar'), createProfil);
router.put('/:id', verifyToken, isAdmin, upload.single('gambar'), updateProfil);
router.post('/pejabat', verifyToken, isAdmin, upload.single('foto'), createPejabat);
router.delete('/pejabat/:id', verifyToken, isAdmin, deletePejabat);

module.exports = router;