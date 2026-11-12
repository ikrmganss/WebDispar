const express = require('express');
const router = express.Router();
const { getAll, create, update, delete: del } = require('../controllers/rencanaTerbitController');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

router.get('/', getAll);
router.post('/', verifyToken, isAdmin, create);
router.put('/:id', verifyToken, isAdmin, update);
router.delete('/:id', verifyToken, isAdmin, del);

module.exports = router;