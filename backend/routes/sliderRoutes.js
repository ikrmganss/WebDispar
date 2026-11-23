const express = require('express');
const router = express.Router();
const { getAll, getActive, create, toggle, delete: del } = require('../controllers/sliderController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', getActive);
router.get('/all', getAll);
router.post('/', verifyToken, isAdmin, upload.single('gambar'), create);
router.patch('/:id/toggle', verifyToken, isAdmin, toggle);
router.delete('/:id', verifyToken, isAdmin, del);

module.exports = router;
