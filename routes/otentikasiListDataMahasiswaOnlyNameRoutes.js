const express = require('express');
const router = express.Router();
const otentikasiListDataMahasiswaOnlyNameController = require('../controllers/otentikasiListDataMahasiswaOnlyNameController');
const checkUserAgent = require('../middlewares/checkUserAgent');
const { checkHeaders2 } = require('../middlewares/checkHeaders');

// Middleware khusus untuk user routes
router.use(checkUserAgent);
router.use(checkHeaders2);

// Endpoint
router.get('/sessions/get-list-mahasiswa', otentikasiListDataMahasiswaOnlyNameController.getDataMahasiswaByName);

module.exports = router;