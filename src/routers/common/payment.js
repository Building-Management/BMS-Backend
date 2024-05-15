// src/routes/common/payment.js

const express = require('express');
const router = express.Router();
const paymentController = require('../../controller/common/paymentController');
const { authorize } = require('../../middleware/authMiddleware');


//Route for the payment
router.post('/payment/:blockId', authorize('rentee'), paymentController.createPayment);

router.post('/verifypayment', paymentController.verifyPayment);

module.exports = router;