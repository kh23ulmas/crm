const express = require('express');
const controller = require('../controllers/analytics');
const router = express.Router();

//localhost:5000/api/auth/login
router.get('/overview', controller.overview);
router.get('/analytics', controller.analytics);
module.exports = router;
