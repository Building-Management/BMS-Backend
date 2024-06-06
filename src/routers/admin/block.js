const express = require('express');
const router = express.Router();
const block = require('../../controller/admin/blockController');

const { authorize } = require('../../middleware/authMiddleware');


router.post('/create-block', authorize('admin'), block.createBlock)
router.post('/count', authorize('admin'), block.countBlock)
router.put('/block-delete', authorize('admin'), block.deleteBlock)

module.exports = router;