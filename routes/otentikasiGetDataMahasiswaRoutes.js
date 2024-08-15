const express = require('express');
const router = express.Router();
const otentikasiGetDataMahasiswaController = require('../controllers/otentikasiGetDataMahasiswaController');
const checkUserAgent = require('../middlewares/checkUserAgent');
const { checkHeaders2 } = require('../middlewares/checkHeaders');

// Middleware khusus untuk user routes
router.use(checkUserAgent);
router.use(checkHeaders2);

// Endpoint
router.get('/sessions/get-mahasiswa', otentikasiGetDataMahasiswaController.getDataMahasiswa);

module.exports = router;