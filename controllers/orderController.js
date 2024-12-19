const db = require("../db");

// API Tạo đơn hàng
exports.createOrder = async (req, res) => {
  console.log("Dữ liệu nhận từ frontend:", req.body);

  const { customer, items, totalPrice, paymentMethod } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (
    !customer ||
    !customer.name ||
    !customer.phone ||
    !customer.email ||
    !customer.address ||
    !Array.isArray(items) ||
    items.length === 0 ||
    typeof totalPrice !== "number" ||
    !paymentMethod
  ) {
    console.error("Dữ liệu không hợp lệ:", req.body);
    return res.status(400).json({ message: "Dữ liệu không hợp lệ", body: req.body });
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Lưu đơn hàng
    const [orderResult] = await connection.query(
      `INSERT INTO db_order 
       (custom_id, customer_name, customer_phone, customer_email, customer_address, total_price, total_num_product, create_date, note, payment_method, status, time, code, date_confirm) 
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), ?, ?, 'Chờ xác nhận', NOW(), ?, NOW())`,
      [
        customer.id || null,
        customer.name,
        customer.phone,
        customer.email,
        customer.address, // Lưu địa chỉ trực tiếp từ frontend
        totalPrice,
        items.length,
        customer.note || "",
        paymentMethod,
        `ORD-${Date.now()}`,
      ]
    );

    const orderId = orderResult.insertId;

    // Lưu chi tiết đơn hàng
    const detailData = items.map((item) => [orderId, item.id, item.quantity, item.price * item.quantity]);
    await connection.query(
      "INSERT INTO db_detail_order (id_order, id_product, qty, sub_total_price) VALUES ?",
      [detailData]
    );

    await connection.commit();
    res.status(201).json({ message: "Đơn hàng đã được tạo thành công", orderId });
  } catch (error) {
    await connection.rollback();
    console.error("Lỗi khi tạo đơn hàng:", error);
    res.status(500).json({ message: "Đã xảy ra lỗi khi tạo đơn hàng", error: error.message });
  } finally {
    connection.release();
  }
};

// API Lấy danh sách đơn hàng của người dùng
exports.getUserOrders = async (req, res) => {
  const { userId } = req.params;

  if (!userId || isNaN(userId)) {
    return res.status(400).json({ message: "Thiếu thông tin userId hợp lệ" });
  }

  try {
    const [orders] = await db.query(
      `SELECT id, code, total_price, create_date, status 
       FROM db_order WHERE custom_id = ? ORDER BY create_date DESC`,
      [userId]
    );

    if (orders.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy đơn hàng nào" });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    res.status(500).json({ message: "Lỗi server khi lấy danh sách đơn hàng", error: error.message });
  }
};

// API Lấy chi tiết đơn hàng
exports.getOrderDetails = async (req, res) => {
  const { orderId } = req.params;

  if (!orderId || isNaN(orderId)) {
    return res.status(400).json({ message: "Thiếu thông tin orderId hợp lệ" });
  }

  try {
    const [order] = await db.query(
      `SELECT 
         o.id, 
         o.code, 
         o.total_price, 
         o.total_num_product, 
         o.create_date, 
         o.status, 
         o.note, 
         o.payment_method, 
         o.customer_address, -- Lấy địa chỉ từ trường lưu trực tiếp
         o.customer_name, 
         o.customer_phone, 
         o.customer_email 
       FROM db_order o
       WHERE o.id = ?`,
      [orderId]
    );

    if (order.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy thông tin đơn hàng" });
    }

    const [orderItems] = await db.query(
      `SELECT p.name, d.qty AS quantity, d.sub_total_price AS price
       FROM db_detail_order d 
       JOIN db_product p ON d.id_product = p.id
       WHERE d.id_order = ?`,
      [orderId]
    );

    res.status(200).json({ ...order[0], items: orderItems });
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
    res.status(500).json({ message: "Lỗi server khi lấy chi tiết đơn hàng", error: error.message });
  }
};

// API Lấy tất cả đơn hàng cho quản trị viên
exports.getAllOrders = async (req, res) => {
  try {
    const [orders] = await db.query(
      `SELECT o.id, o.code, o.total_price, o.total_num_product, o.create_date, o.status, 
       c.fullname AS customer_name
       FROM db_order o
       JOIN db_customer c ON o.custom_id = c.id
       ORDER BY o.create_date DESC`
    );

    res.status(200).json(orders);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    res.status(500).json({ message: "Lỗi server khi lấy danh sách đơn hàng", error: error.message });
  }
};

// API Xóa đơn hàng
exports.deleteOrder = async (req, res) => {
  const { orderId } = req.params;

  if (!orderId || isNaN(orderId)) {
    return res.status(400).json({ message: "Thiếu thông tin orderId hợp lệ" });
  }

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // Xóa chi tiết đơn hàng
    await connection.query("DELETE FROM db_detail_order WHERE id_order = ?", [orderId]);

    // Xóa đơn hàng
    await connection.query("DELETE FROM db_order WHERE id = ?", [orderId]);

    await connection.commit();
    res.status(200).json({ message: "Đơn hàng đã được xóa thành công" });
  } catch (error) {
    await connection.rollback();
    console.error("Lỗi khi xóa đơn hàng:", error);
    res.status(500).json({ message: "Lỗi server khi xóa đơn hàng", error: error.message });
  } finally {
    connection.release();
  }
};

// API xác nhận đơn hàng
exports.confirmOrder = async (req, res) => {
  const { orderId } = req.params;

  if (!orderId || isNaN(orderId)) {
    return res.status(400).json({ message: "Thiếu thông tin orderId hợp lệ" });
  }

  try {
    await db.query(
      `UPDATE db_order SET status = 'Thành công', date_confirm = NOW() WHERE id = ?`,
      [orderId]
    );

    res.status(200).json({ message: "Đơn hàng đã được xác nhận thành công" });
  } catch (error) {
    console.error("Lỗi khi xác nhận đơn hàng:", error);
    res.status(500).json({ message: "Lỗi server khi xác nhận đơn hàng", error: error.message });
  }
};

// API hủy đơn hàng
exports.cancelOrder = async (req, res) => {
  const { orderId } = req.params;

  if (!orderId || isNaN(orderId)) {
    return res.status(400).json({ message: "Thiếu thông tin orderId hợp lệ" });
  }

  try {
    await db.query(
      `UPDATE db_order SET status = 'Hủy' WHERE id = ?`,
      [orderId]
    );

    res.status(200).json({ message: "Đơn hàng đã được hủy thành công" });
  } catch (error) {
    console.error("Lỗi khi hủy đơn hàng:", error);
    res.status(500).json({ message: "Lỗi server khi hủy đơn hàng", error: error.message });
  }
};
// API Đánh dấu đơn hàng là "Đang giao hàng"
exports.markAsShipping = async (req, res) => {
  const { orderId } = req.params;

  if (!orderId || isNaN(orderId)) {
    return res.status(400).json({ message: "Thiếu thông tin orderId hợp lệ" });
  }

  try {
    await db.query(
      `UPDATE db_order SET status = 'Đang giao hàng' WHERE id = ?`,
      [orderId]
    );

    res.status(200).json({ message: "Đơn hàng đã được đánh dấu là Đang giao hàng" });
  } catch (error) {
    console.error("Lỗi khi đánh dấu đơn hàng là Đang giao hàng:", error);
    res.status(500).json({ message: "Lỗi server khi cập nhật trạng thái đơn hàng", error: error.message });
  }
};
// API Đánh dấu đơn hàng là "Hoàn tất giao hàng"
exports.markAsDelivered = async (req, res) => {
  const { orderId } = req.params;

  if (!orderId || isNaN(orderId)) {
    return res.status(400).json({ message: "Thiếu thông tin orderId hợp lệ" });
  }

  try {
    await db.query(
      `UPDATE db_order SET status = 'Hoàn tất' WHERE id = ?`,
      [orderId]
    );

    res.status(200).json({ message: "Đơn hàng đã được đánh dấu là Hoàn tất" });
  } catch (error) {
    console.error("Lỗi khi đánh dấu đơn hàng là Hoàn tất:", error);
    res.status(500).json({ message: "Lỗi server khi cập nhật trạng thái đơn hàng", error: error.message });
  }
};
