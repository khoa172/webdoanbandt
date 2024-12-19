const express = require("express");
const router = express.Router();
const { createMomoPayment, momoNotify } = require("../controllers/momocontroller");

// Endpoint tạo thanh toán MoMo
router.post("/momo-payment", createMomoPayment);

// Endpoint nhận thông báo từ MoMo
router.post("/momo-notify", momoNotify);

module.exports = router;
