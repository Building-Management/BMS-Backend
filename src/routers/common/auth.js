// src/routes/auth.js

const express = require('express');
const router = express.Router();
const authController = require('../../controller/common/authController');

// Route for user login
router.post('/login', authController.login);

module.exports = router;