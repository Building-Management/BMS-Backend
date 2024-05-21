const express = require('express');
const router = express.Router();
const noticeRentee = require('../../controller/rentee/noticeController')
const { authorize } = require('../../middleware/authMiddleware');

// Route for user login
router.post('/create-message', authorize('admin'), noticeRentee.createMessage);
router.get('/{id}', authorize('rentee', 'admin'), noticeRentee.getMessage)