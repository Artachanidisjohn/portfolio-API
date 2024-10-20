const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// Δημιουργία του POST route για την αποστολή email
router.post('/', emailController.sendEmailController);

module.exports = router;
