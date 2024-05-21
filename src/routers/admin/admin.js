// src/routes/admin.js

const express = require('express');
const router = express.Router();
const renteeController = require('../../controller/admin/renteeController');
const adminController = require('../../controller/admin/adminController');
const { authorize } = require('../../middleware/authMiddleware');

//Route for adding admin in to the system
router.post('/add', adminController.createUser);

// Route for accessing user data (requires authentication)
// router.get('/', authorize('admin', 'manager'), renteeController.getAllUsers);
router.get('/', renteeController.getAllUsers);
// Route for adding a new user (requires specific role)
router.post('/', authorize('admin'), renteeController.createUser);
// router.post('/', renteeController.createUser);

// Route for updating specific rentee
router.put('/:userId', authorize('admin', 'rentee'), renteeController.updateUser);

//Route for deleting rentee
router.delete('/:userId', authorize('admin'), renteeController.deleteUserById);

module.exports = router;