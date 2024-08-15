const express = require('express');
const router = express.Router();
const credentialLoginController = require('../controllers/credentialLoginController');
const checkUserAgent = require('../middlewares/checkUserAgent');
const { checkHeaders1 } = require('../middlewares/checkHeaders');

// Middleware khusus untuk user routes
router.use(checkUserAgent);
router.use(checkHeaders1);

// Endpoint
router.post('/sessions/login', credentialLoginController.login);

module.exports = router;