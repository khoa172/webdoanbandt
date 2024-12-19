const db = require('../db'); 

// Lấy danh sách thương hiệu
const getAllBrands = async (req, res) => {
  try {
    const [results] = await db.query('SELECT * FROM db_brand');
    res.json(results);
  } catch (err) {
    console.error('Lỗi khi lấy danh sách thương hiệu:', err);
    res.status(500).send('Lỗi khi lấy danh sách thương hiệu');
  }
};

// Thêm thương hiệu mới
const createBrand = async (req, res) => {
  const { name, code, description } = req.body;
  const create_date = new Date().toISOString();
  const user = 'Admin';
  const image = req.file ? req.file.filename : ''; // Lấy tên file hình ảnh

  try {
    await db.query(
      'INSERT INTO db_brand (name, code, image, description, create_date, user) VALUES (?, ?, ?, ?, ?, ?)',
      [name, code, image, description, create_date, user]
    );
    res.status(201).json({ message: 'Thương hiệu đã được thêm thành công!' });
  } catch (error) {
    console.error('Lỗi khi thêm thương hiệu:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

// Cập nhật thương hiệu
const updateBrand = async (req, res) => {
  const { id } = req.params;
  const { name, code, description } = req.body;
  const image = req.file ? req.file.filename : null; // Lấy tên file nếu có

  try {
    const updateQuery = image
      ? 'UPDATE db_brand SET name = ?, code = ?, image = ?, description = ? WHERE id = ?'
      : 'UPDATE db_brand SET name = ?, code = ?, description = ? WHERE id = ?';

    const values = image
      ? [name, code, image, description, id]
      : [name, code, description, id];

    await db.query(updateQuery, values);
    res.json({ message: 'Thương hiệu đã được cập nhật thành công!' });
  } catch (error) {
    console.error('Lỗi khi cập nhật thương hiệu:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};
// Xóa thương hiệu
const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const sql = 'DELETE FROM db_brand WHERE id = ?';
    await db.query(sql, [id]);
    res.send('Thương hiệu đã được xóa thành công!');
  } catch (err) {
    console.error('Lỗi khi xóa thương hiệu:', err);
    res.status(500).send('Lỗi khi xóa thương hiệu');
  }
};
// Lấy thông tin thương hiệu theo ID
const getBrandById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM db_brand WHERE id = ?', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Thương hiệu không tồn tại' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Lỗi khi lấy thương hiệu theo ID:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
};

module.exports = { getAllBrands, createBrand, updateBrand, deleteBrand ,getBrandById};
