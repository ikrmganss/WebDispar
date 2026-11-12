const express = require('express');
const router = express.Router();
const {
  getKategori, getItemsByKategori, createItem,
  getRegulasi, createRegulasi,
  getSK, createSK,
  getLaporanTahunan,
  createPermohonan, createKeberatan, createSurvey
} = require('../controllers/ppidController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get('/kategori', getKategori);
router.get('/items/:kategoriId', getItemsByKategori);
router.post('/items', verifyToken, isAdmin, upload.single('file'), createItem);
router.get('/regulasi', getRegulasi);
router.post('/regulasi', verifyToken, isAdmin, upload.single('file'), createRegulasi);
router.get('/sk', getSK);
router.post('/sk', verifyToken, isAdmin, upload.single('file'), createSK);
router.get('/laporan-tahunan', getLaporanTahunan);
router.post('/permohonan', createPermohonan);
router.post('/keberatan', createKeberatan);
router.post('/survey', createSurvey);

module.exports = router;