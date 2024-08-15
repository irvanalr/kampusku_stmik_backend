const express = require('express');
const router = express.Router();
const otentikasiDeletedMahasiswaController = require('../controllers/otentikasiDeletedMahasiswaController');
const checkUserAgent = require('../middlewares/checkUserAgent');
const { checkHeaders2 } = require('../middlewares/checkHeaders');

// Middleware khusus untuk user routes
router.use(checkUserAgent);
router.use(checkHeaders2);

// Endpoint
router.delete('/sessions/deleted-mahasiswa/:nama', otentikasiDeletedMahasiswaController.deletedDataMahasiswa);

module.exports = router;