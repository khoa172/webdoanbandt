const express = require('express');
const router = express.Router();
const sliderController = require('../controllers/sliderController');
const multer = require('multer');

// Cấu hình multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Thư mục lưu ảnh
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage: storage });

// Routes
router.get('/', sliderController.getAllSliders);
router.get('/:id', sliderController.getSliderById);
router.post('/', upload.array('image', 5), sliderController.createSlider); // Hỗ trợ upload nhiều ảnh
router.put('/:id', upload.array('image', 5), sliderController.updateSlider); // Cập nhật hỗ trợ nhiều ảnh
router.delete('/:id', sliderController.deleteSlider);

module.exports = router;
