const pool = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = 'your-secret-key';

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {

    const [adminRows] = await pool.query('SELECT * FROM db_admin WHERE username = ?', [username]);
    if (adminRows.length > 0) {
      const admin = adminRows[0];


      if (password !== admin.password) {
        return res.status(401).json({ message: 'Mật khẩu không đúng' });
      }


      const token = jwt.sign({ id: admin.id, role: admin.role }, SECRET_KEY, { expiresIn: '1h' });

      return res.json({
        message: 'Đăng nhập thành công',
        token,
        user: { id: admin.id, username: admin.username, fullname: admin.fullname, role: admin.role },
      });
    }


    const [customerRows] = await pool.query('SELECT * FROM db_customer WHERE username = ?', [username]);

    if (customerRows.length > 0) {
      const customer = customerRows[0];


      if (!bcrypt.compareSync(password, customer.password)) {
        return res.status(401).json({ message: 'Mật khẩu không đúng.' });
      }


      const token = jwt.sign({ id: customer.id, role: 'customer' }, SECRET_KEY, { expiresIn: '1h' });

      return res.json({
        message: 'Đăng nhập thành công với vai trò customer',
        token,
        user: { id: customer.id, username: customer.username, fullname: customer.fullname, role: 'customer' },
      });
    }


    return res.status(401).json({ message: 'Tên đăng nhập không tồn tại.' });

  } catch (err) {
    console.error('Lỗi khi đăng nhập:', err.message);
    res.status(500).json({ error: 'Lỗi server' });
  }
};
