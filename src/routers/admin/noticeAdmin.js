const express = require('express');
const router = express.Router();
const noticeAdmin = require('../../controller/admin/noticeController');

const { authorize } = require('../../middleware/authMiddleware');


// Ensure the functions are defined
if (!noticeAdmin.createMessage || !noticeAdmin.getMessage) {
    throw new Error('Notice Admin handlers are not properly defined');
}

// Route for user login
router.post('/create-message', authorize('admin'), noticeAdmin.createMessage);
router.get('/', authorize('admin'), noticeAdmin.getMessage)

module.exports = router;