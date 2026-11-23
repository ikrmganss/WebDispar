const express = require('express');
const router = express.Router();
const {
  getKategori, getItemsByKategori, createItem, deleteItem,
  getRegulasi, createRegulasi, deleteRegulasi,
  getSK, createSK, deleteSK,
  getLaporanTahunan,
  createPermohonan, createKeberatan, createSurvey,
  getBerkala
} = require('../controllers/ppidController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get('/kategori', getKategori);
router.get('/berkala', getBerkala);
router.get('/items/:kategoriId', getItemsByKategori);
router.post('/items', verifyToken, isAdmin, upload.single('file'), createItem);
router.delete('/items/:id', verifyToken, isAdmin, deleteItem);
router.get('/regulasi', getRegulasi);
router.post('/regulasi', verifyToken, isAdmin, upload.single('file'), createRegulasi);
router.delete('/regulasi/:id', verifyToken, isAdmin, deleteRegulasi);
router.get('/sk', getSK);
router.post('/sk', verifyToken, isAdmin, upload.single('file'), createSK);
router.delete('/sk/:id', verifyToken, isAdmin, deleteSK);
router.get('/laporan-tahunan', getLaporanTahunan);
router.post('/permohonan', createPermohonan);
router.post('/keberatan', createKeberatan);
router.post('/survey', createSurvey);

module.exports = router;