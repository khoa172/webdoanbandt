const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Tạo đơn hàng
router.post("/", orderController.createOrder);

// Lấy danh sách đơn hàng của người dùng theo userId
router.get("/user/:userId", orderController.getUserOrders);

// Lấy chi tiết một đơn hàng cụ thể theo orderId
router.get("/:orderId", orderController.getOrderDetails);

// Lấy danh sách tất cả các đơn hàng (dành cho quản trị viên)
router.get("/", orderController.getAllOrders);

// Xóa một đơn hàng theo orderId
router.delete("/:orderId", orderController.deleteOrder);

router.put('/:orderId/confirm', orderController.confirmOrder);
router.put('/:orderId/shipping', orderController.markAsShipping);
router.put('/:orderId/delivered', orderController.markAsDelivered);
router.put('/:orderId/cancel', orderController.cancelOrder);

module.exports = router;
