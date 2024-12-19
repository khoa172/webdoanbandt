const db = require('../db');
const path = require('path');
const fs = require('fs');

// Lấy danh sách tất cả danh mục
const getAllCategories = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM db_category');
    res.json(results);
  } catch (err) {
    console.error('Lỗi khi lấy danh mục:', err);
    res.status(500).send('Lỗi khi lấy danh mục');
  }
};

// Lấy thông tin chi tiết của một danh mục theo ID
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await db.query('SELECT * FROM db_category WHERE id = ?', [id]);
    if (results.length === 0) {
      res.status(404).send('Danh mục không tồn tại');
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    console.error('Lỗi khi lấy danh mục theo ID:', err);
    res.status(500).send('Lỗi khi lấy danh mục theo ID');
  }
};

// Thêm danh mục mới
const createCategory = async (req, res) => {
  try {
    const { name, code, description } = req.body;
    const create_date = new Date().toISOString();
    const user = 'Admin'; // Gán mặc định là Admin

    let image = '';
    if (req.file) {
      image = req.file.filename; // Lấy tên file đã upload
    }

    const sql = `
      INSERT INTO db_category (name, code, image, description, create_date, user)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    await db.query(sql, [name, code, image, description, create_date, user]);
    res.status(201).send('Danh mục đã được thêm thành công!');
  } catch (err) {
    console.error('Lỗi khi thêm danh mục:', err);
    res.status(500).send('Lỗi khi thêm danh mục');
  }
};

// Cập nhật danh mục
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, code, description } = req.body;

    let image = req.body.image; // Nếu không có file mới, giữ nguyên hình ảnh cũ
    if (req.file) {
      image = req.file.filename;

      // Xóa hình ảnh cũ (nếu cần)
      const [oldCategory] = await db.query('SELECT image FROM db_category WHERE id = ?', [id]);
      if (oldCategory.length && oldCategory[0].image) {
        const oldImagePath = path.join(__dirname, '..', 'uploads', oldCategory[0].image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
    }

    const sql = `
      UPDATE db_category
      SET name = ?, code = ?, image = ?, description = ?
      WHERE id = ?
    `;
    await db.query(sql, [name, code, image, description, id]);
    res.send('Danh mục đã được cập nhật thành công!');
  } catch (err) {
    console.error('Lỗi khi cập nhật danh mục:', err);
    res.status(500).send('Lỗi khi cập nhật danh mục');
  }
};

// Xóa danh mục
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Xóa hình ảnh khỏi thư mục uploads
    const [category] = await db.query('SELECT image FROM db_category WHERE id = ?', [id]);
    if (category.length && category[0].image) {
      const imagePath = path.join(__dirname, '..', 'uploads', category[0].image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    const sql = 'DELETE FROM db_category WHERE id = ?';
    await db.query(sql, [id]);
    res.send('Danh mục đã được xóa thành công!');
  } catch (err) {
    console.error('Lỗi khi xóa danh mục:', err);
    res.status(500).send('Lỗi khi xóa danh mục');
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
