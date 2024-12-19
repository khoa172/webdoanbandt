const fs = require('fs');
const path = require('path');
const db = require('../db');

// Lấy danh sách sản phẩm
const getAllProducts = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM db_product');
    res.json(results);
  } catch (err) {
    console.error('Lỗi khi lấy danh sách sản phẩm:', err);
    res.status(500).send('Lỗi khi lấy danh sách sản phẩm');
  }
};

// Lấy sản phẩm theo ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await db.query('SELECT * FROM db_product WHERE id = ?', [id]);
    if (results.length === 0) {
      res.status(404).send('Sản phẩm không tồn tại');
    } else {
      res.json(results[0]);
    }
  } catch (err) {
    console.error('Lỗi khi lấy sản phẩm theo ID:', err);
    res.status(500).send('Lỗi khi lấy sản phẩm theo ID');
  }
};

// Thêm sản phẩm mới
const createProduct = async (req, res) => {
  try {
    const product = req.body;

    // Gán mặc định
    product.user = 'Admin';
    product.create_date = new Date().toISOString().split('T')[0];
    product.images = req.files ? JSON.stringify(req.files.map((file) => file.filename)) : '[]';

    const sql = 'INSERT INTO db_product SET ?';
    await db.query(sql, product);
    res.status(201).send('Sản phẩm đã được thêm thành công!');
  } catch (err) {
    console.error('Lỗi khi thêm sản phẩm:', err);
    res.status(500).send('Lỗi khi thêm sản phẩm');
  }
};

// Cập nhật sản phẩm
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = req.body;

    // Lấy sản phẩm hiện tại để xóa tệp cũ nếu cần
    const [existingProduct] = await db.query('SELECT images FROM db_product WHERE id = ?', [id]);
    if (existingProduct.length === 0) {
      return res.status(404).send('Sản phẩm không tồn tại');
    }

    const existingImages = JSON.parse(existingProduct[0].images || '[]');

    // Nếu có tệp mới được tải lên, xóa tệp cũ
    if (req.files && req.files.length > 0) {
      updatedProduct.images = JSON.stringify(req.files.map((file) => file.filename));
      deleteFiles(existingImages);
    } else {
      updatedProduct.images = JSON.stringify(existingImages);
    }

    const sql = 'UPDATE db_product SET ? WHERE id = ?';
    await db.query(sql, [updatedProduct, id]);
    res.send('Sản phẩm đã được cập nhật thành công!');
  } catch (err) {
    console.error('Lỗi khi cập nhật sản phẩm:', err);
    res.status(500).send('Lỗi khi cập nhật sản phẩm');
  }
};

// Hàm xóa tệp trong thư mục uploads
const deleteFiles = (images) => {
  images.forEach((file) => {
    const filePath = path.join(__dirname, '../uploads', file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });
};

// Xóa sản phẩm
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Lấy thông tin sản phẩm trước khi xóa
    const [product] = await db.query('SELECT images FROM db_product WHERE id = ?', [id]);
    if (product.length === 0) {
      return res.status(404).send('Sản phẩm không tồn tại');
    }

    // Xóa các tệp ảnh liên quan
    if (product[0].images) {
      const images = JSON.parse(product[0].images);
      deleteFiles(images);
    }

    // Xóa sản phẩm trong cơ sở dữ liệu
    const sql = 'DELETE FROM db_product WHERE id = ?';
    await db.query(sql, [id]);
    res.send('Sản phẩm đã được xóa thành công!');
  } catch (err) {
    console.error('Lỗi khi xóa sản phẩm:', err);
    res.status(500).send('Lỗi khi xóa sản phẩm');
  }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
