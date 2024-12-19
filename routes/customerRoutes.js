const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

// Route quản lý admin (Phải đặt trước /:id)
router.get('/admin/:id', customerController.getAdminById);

// Lấy danh sách khách hàng
router.get('/', customerController.getCustomers);

// Lấy thông tin khách hàng theo ID
router.get('/:id', customerController.getCustomerById);

// Cập nhật thông tin khách hàng
router.put('/:id', customerController.updateCustomer);

// Xóa khách hàng
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
