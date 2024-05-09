// src/routes/users.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authorize } = require('../middleware/authMiddleware');

// Route for accessing user data (requires authentication)
router.get('/', authorize('admin', 'manager'), userController.getAllUsers);

// Route for adding a new user (requires specific role)
router.post('/', authorize('admin'), userController.createUser);

module.exports = router;