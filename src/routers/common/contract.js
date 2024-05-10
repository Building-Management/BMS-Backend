// src/routes/job.js

const express = require('express');
const router = express.Router();
const contractController = require('../../controller/common/contractController');
const { authorize } = require('../../middleware/authMiddleware');

// Route for user login
router.post('/create-contract', authorize('admin'), contractController.createContract);
router.get('/', authorize('admin', 'rentee'), contractController.getAllContracts);
router.put('/:contractId', authorize('admin'), contractController.updateContract);
router.get('/:contractId', authorize('admin'), contractController.getContractsById);

module.exports = router;