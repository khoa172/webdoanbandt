const axios = require("axios");
const crypto = require("crypto");

exports.createMomoPayment = async (req, res) => {
  const { orderId, orderInfo, amount } = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!orderId || !orderInfo || !amount || amount <= 0) {
    return res.status(400).json({ message: "Thiếu thông tin thanh toán hoặc số tiền không hợp lệ" });
  }

  const partnerCode = "MOMO";
  const accessKey = "F8BBA842ECF85";
  const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  const endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";

  const requestId = `REQ-${Date.now()}`;
  const returnUrl = "http://localhost:3000/my-orders"; // URL khi thanh toán thành công
  const notifyUrl = "http://localhost:3001/api/momo/momo-notify"; // URL nhận thông báo từ MoMo
  const requestType = "captureWallet";
  const extraData = ""; // Trường dữ liệu bổ sung, nếu không có để trống

  // Tạo chữ ký (signature)
  const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${notifyUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${returnUrl}&requestId=${requestId}&requestType=${requestType}`;
  const signature = crypto.createHmac("sha256", secretKey).update(rawSignature).digest("hex");

  console.log("Raw Signature:", rawSignature);
  console.log("Signature:", signature);

  try {
    // Gửi yêu cầu đến API MoMo
    const response = await axios.post(endpoint, {
      partnerCode,
      accessKey,
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl: returnUrl,
      ipnUrl: notifyUrl,
      extraData,
      requestType,
      signature,
    });

    console.log("Phản hồi từ MoMo:", response.data);

    if (response.data.resultCode === 0) {
      // Trả về liên kết thanh toán cho frontend
      res.json({ payUrl: response.data.payUrl });
    } else {
      // Xử lý lỗi từ phía MoMo
      res.status(400).json({ message: response.data.message, resultCode: response.data.resultCode });
    }
  } catch (error) {
    console.error("Lỗi khi tạo thanh toán MoMo:", error.response?.data || error.message);
    res.status(500).json({
      message: "Lỗi khi tạo thanh toán qua MoMo",
      error: error.response?.data || error.message,
    });
  }
};
exports.momoNotify = (req, res) => {
  const { partnerCode, orderId, requestId, amount, errorCode, message, localMessage, signature } = req.body;

  // Kiểm tra chữ ký
  const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  const rawSignature = `partnerCode=${partnerCode}&orderId=${orderId}&requestId=${requestId}&amount=${amount}&errorCode=${errorCode}&message=${message}&localMessage=${localMessage}`;
  const generatedSignature = crypto.createHmac("sha256", secretKey).update(rawSignature).digest("hex");

  console.log("Raw Signature for Notify:", rawSignature);
  console.log("Generated Signature:", generatedSignature);

  if (signature !== generatedSignature) {
    console.error("Chữ ký không hợp lệ");
    return res.status(400).json({ message: "Invalid signature" });
  }

  // Xử lý kết quả thanh toán
  if (errorCode === 0) {
    console.log("Thanh toán thành công:", { orderId, amount });
    // TODO: Cập nhật trạng thái đơn hàng trong database, ví dụ:
    // updateOrderStatus(orderId, "success");
  } else {
    console.error("Thanh toán thất bại:", { message });
    // TODO: Cập nhật trạng thái đơn hàng là thất bại
    // updateOrderStatus(orderId, "failed");
  }

  res.status(200).json({ message: "Notify received" });
};
