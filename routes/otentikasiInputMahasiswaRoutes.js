const express = require('express');
const router = express.Router();
const otentikasiInputMahasiswaController = require('../controllers/otentikasiInputMahasiswaController');
const checkUserAgent = require('../middlewares/checkUserAgent');
const { checkHeaders2 } = require('../middlewares/checkHeaders');

// Middleware khusus untuk user routes
router.use(checkUserAgent);
router.use(checkHeaders2);

// Endpoint
router.post('/sessions/input-mahasiswa', otentikasiInputMahasiswaController.inputMahasiswa);

module.exports = router;