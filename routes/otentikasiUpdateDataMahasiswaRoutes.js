const express = require('express');
const router = express.Router();
const otentikasiUpdateDataMahasiswaController = require('../controllers/otentikasiUpdateDataMahasiswaController');
const checkUserAgent = require('../middlewares/checkUserAgent');
const { checkHeaders2 } = require('../middlewares/checkHeaders');

// Middleware khusus untuk user routes
router.use(checkUserAgent);
router.use(checkHeaders2);

// Endpoint
router.put('/sessions/mahasiswa/:nama', otentikasiUpdateDataMahasiswaController.updateDataMahasiswa);

module.exports = router;