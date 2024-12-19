const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Cấu hình Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Thư mục lưu trữ ảnh
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Định nghĩa routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", upload.array("images", 10), createProduct); // Cho phép upload tối đa 10 ảnh
router.put("/:id", upload.array("images", 10), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
