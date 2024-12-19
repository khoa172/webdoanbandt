const db = require("../db");
const fs = require("fs");
const path = require("path");

// Lấy danh sách tất cả banner
exports.getAllSliders = async (req, res) => {
  try {
    const [sliders] = await db.query("SELECT * FROM db_slider ORDER BY id DESC");
    sliders.forEach(s => {
      try {
        s.image = JSON.parse(s.image || "[]");
      } catch (error) {
        console.warn(`Không thể parse JSON: ${s.image}`);
        s.image = [s.image];
      }
    });
    res.status(200).json(sliders);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách banner:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Lấy chi tiết banner theo id
exports.getSliderById = async (req, res) => {
  const { id } = req.params;
  try {
    const [slider] = await db.query("SELECT * FROM db_slider WHERE id = ?", [id]);
    if (slider.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy banner" });
    }
    try {
      slider[0].image = JSON.parse(slider[0].image || "[]");
    } catch (error) {
      console.warn(`Không thể parse JSON: ${slider[0].image}`);
      slider[0].image = [slider[0].image];
    }
    res.status(200).json(slider[0]);
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết banner:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Thêm banner mới
exports.createSlider = async (req, res) => {
  const { user } = req.body;
  let images = [];
  if (req.files && req.files.length > 0) {
    images = req.files.map(file => file.filename);
  } else if (req.body.image) {
    images = Array.isArray(req.body.image) ? req.body.image : [req.body.image];
  }

  if (!user || images.length === 0) {
    return res.status(400).json({ message: "Thiếu thông tin (image, user)" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO db_slider (image, user) VALUES (?, ?)",
      [JSON.stringify(images), user]
    );
    res.status(201).json({
      message: "Thêm banner thành công",
      id: result.insertId,
      images,
      user
    });
  } catch (error) {
    console.error("Lỗi khi thêm banner:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// Cập nhật banner
exports.updateSlider = async (req, res) => {
  const { id } = req.params;
  const { user, currentImages } = req.body;

  try {
    const [sliderExist] = await db.query("SELECT * FROM db_slider WHERE id = ?", [id]);
    if (sliderExist.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy banner" });
    }

    const existingImages = JSON.parse(sliderExist[0].image || "[]");
    const currentImagesList = Array.isArray(currentImages) ? currentImages : [currentImages];
    const newImages = req.files ? req.files.map((file) => file.filename) : [];

    // Xóa các ảnh cũ không còn trong danh sách currentImages
    const imagesToDelete = existingImages.filter((img) => !currentImagesList.includes(img));
    imagesToDelete.forEach((img) => {
      const filePath = path.join(__dirname, "../uploads", img);
      fs.unlink(filePath, (err) => {
        if (err) console.warn(`Không thể xóa file: ${filePath}`, err.message);
      });
    });

    // Gộp ảnh hiện tại và ảnh mới
    const updatedImages = [...currentImagesList, ...newImages];

    // Cập nhật database
    await db.query(
      "UPDATE db_slider SET image = ?, user = ? WHERE id = ?",
      [JSON.stringify(updatedImages), user || sliderExist[0].user, id]
    );

    res.status(200).json({ message: "Cập nhật banner thành công", images: updatedImages });
  } catch (error) {
    console.error("Lỗi khi cập nhật banner:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};


// Xóa banner
exports.deleteSlider = async (req, res) => {
  const { id } = req.params;
  try {
    const [sliderExist] = await db.query("SELECT * FROM db_slider WHERE id = ?", [id]);
    if (sliderExist.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy banner để xóa" });
    }

    // Parse image field để lấy danh sách ảnh
    let images = [];
    try {
      images = JSON.parse(sliderExist[0].image || "[]");
    } catch (error) {
      console.warn(`Không thể parse JSON: ${sliderExist[0].image}`);
      images = [sliderExist[0].image];
    }

    // Xóa các file ảnh
    images.forEach((img) => {
      const filePath = path.join(__dirname, "../uploads", img);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.warn(`Không thể xóa file: ${filePath}`, err.message);
        }
      });
    });

    // Xóa record trong database
    await db.query("DELETE FROM db_slider WHERE id = ?", [id]);
    res.status(200).json({ message: "Xóa banner thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa banner:", error);
    res.status(500).json({ message: "Lỗi server" });
  }
};
