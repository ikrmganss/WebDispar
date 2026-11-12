const express = require('express');
const router = express.Router();
const { getAll, getBySlug, create, update, delete: del } = require('../controllers/beritaController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', getAll);
router.get('/:slug', getBySlug);
router.post('/', verifyToken, isAdmin, upload.single('gambar'), create);
router.put('/:id', verifyToken, isAdmin, upload.single('gambar'), update);
router.delete('/:id', verifyToken, isAdmin, del);

module.exports = router;