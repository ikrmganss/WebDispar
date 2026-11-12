const express = require('express');
const router = express.Router();
const { getPengunjung, trackVisitor, getIKM, getWisatawan } = require('../controllers/statistikController');

router.get('/pengunjung', getPengunjung);
router.post('/track', trackVisitor);
router.get('/ikm', getIKM);
router.get('/wisatawan', getWisatawan);

module.exports = router;