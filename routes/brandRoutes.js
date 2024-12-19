const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getAllBrands, getBrandById, createBrand, updateBrand, deleteBrand } = require('../controllers/brandController');

// Cấu hình multer để upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Thư mục lưu file
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Tên file
  },
});

const upload = multer({ storage }); // Khởi tạo multer

// Lấy tất cả thương hiệu
router.get('/', getAllBrands);

// Lấy thương hiệu theo ID
router.get('/:id', getBrandById);

// Thêm thương hiệu mới
router.post('/', upload.single('image'), createBrand);

// Cập nhật thương hiệu
router.put('/:id', upload.single('image'), updateBrand);

// Xóa thương hiệu
router.delete('/:id', deleteBrand);

module.exports = router;
