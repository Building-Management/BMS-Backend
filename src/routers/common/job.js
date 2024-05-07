// src/routes/job.js

const express = require('express');
const router = express.Router();
const jobController = require('../../controller/common/jobController');
const { authorize } = require('../../middleware/authMiddleware');

// Route for user login
router.post('/create-job', authorize('admin'), jobController.createJob);
router.get('/jobs', authorize('admin', 'freelancer'), jobController.getAllJobs)

module.exports = router;