-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1:3306
-- Thời gian đã tạo: Th12 18, 2024 lúc 09:43 AM
-- Phiên bản máy phục vụ: 8.3.0
-- Phiên bản PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `webdoan`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `db_admin`
--

DROP TABLE IF EXISTS `db_admin`;
CREATE TABLE IF NOT EXISTS `db_admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `mail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `phone` varchar(10) NOT NULL,
  `address` varchar(255) NOT NULL,
  `role` enum('admin','manager') NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `db_admin`
--

INSERT INTO `db_admin` (`id`, `username`, `password`, `fullname`, `mail`, `phone`, `address`, `role`, `create_date`) VALUES
(1, 'admin', 'admin123', 'Admin User', 'admin@example.com', '0123456789', 'Admin Address', 'admin', '2024-11-17 03:48:44');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `db_brand`
--

DROP TABLE IF EXISTS `db_brand`;
CREATE TABLE IF NOT EXISTS `db_brand` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `create_date` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `db_brand`
--

INSERT INTO `db_brand` (`id`, `name`, `code`, `image`, `description`, `create_date`, `user`) VALUES
(12, 'iPhone', '1', '1733030168518-pngegg.png', '', '2024-12-01T05:16:08.520Z', 'Admin'),
(13, 'Samsung', '2', '1733388097414-logosamsung.png', '', '2024-12-05T08:41:37.417Z', 'Admin'),
(14, 'Oppo', '3', '1733979354713-a03c557d7ce8760b42f1fa7d77e79c67.webp', '', '2024-12-12T04:55:54.715Z', 'Admin'),
(15, 'Xiaomi', '4', '1733979439731-pngegg (1).png', '', '2024-12-12T04:57:19.733Z', 'Admin'),
(16, 'Vivo', '5', '1733979474591-avfhqtek8.webp', '', '2024-12-12T04:57:54.593Z', 'Admin'),
(17, 'Realme', '6', '1733979555704-Realme Logo (PNG480p) - Vector69Com.png', '', '2024-12-12T04:59:15.705Z', 'Admin');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `db_category`
--

DROP TABLE IF EXISTS `db_category`;
CREATE TABLE IF NOT EXISTS `db_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `create_date` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `db_category`
--

INSERT INTO `db_category` (`id`, `name`, `code`, `image`, `description`, `create_date`, `user`) VALUES
(3, 'Điện thoại ', '1', '1733033630870-default-image.jpg', '', '2024-12-01T05:16:29.661Z', 'Admin');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `db_customer`
--

DROP TABLE IF EXISTS `db_customer`;
CREATE TABLE IF NOT EXISTS `db_customer` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `address` text NOT NULL,
  `create_date` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `db_customer`
--

INSERT INTO `db_customer` (`id`, `username`, `password`, `fullname`, `mail`, `phone`, `address`, `create_date`) VALUES
(6, 'nguyenvana', 'matkhau123', 'Nguyễn Văn A2', 'nguyenvana@gmail.com', '0912345678', '123 Đường Láng, Hà Nội', '2024-01-01 10:00:00'),
(7, 'tranthib', 'matkhau456', 'Trần Thị B', 'tranthib@gmail.com', '0987654321', '456 Nguyễn Trãi, TP.HCM', '2024-01-02 11:00:00'),
(8, 'phamvanhoa', 'matkhau789', 'Phạm Văn Hòa', 'phamhoa@gmail.com', '0934567890', '789 Hai Bà Trưng, Đà Nẵng', '2024-01-03 12:00:00'),
(9, 'hoangthixuan', 'matkhau321', 'Hoàng Thị Xuân', 'xuanhoang@gmail.com', '0901234567', '101 Phan Đình Phùng, Hải Phòng', '2024-01-04 13:00:00'),
(11, 'dangngocanh', 'matkhau987', 'Đặng Ngọc Anh', 'ngocanh@gmail.com', '0978901234', '303 Lý Tự Trọng, Cần Thơ', '2024-01-06 15:00:00'),
(12, 'ngothilinh', 'matkhau741', 'Ngô Thị Linh', 'ngothilinh@gmail.com', '0923456789', '404 Lê Lợi, Quảng Ninh', '2024-01-07 16:00:00'),
(13, 'votuananh', 'matkhau852', 'Võ Tuấn Anh', 'tuananh@gmail.com', '0967890123', '505 Phạm Văn Đồng, Vũng Tàu', '2024-01-08 17:00:00'),
(14, 'nguyenthuykieu', 'matkhau963', 'Nguyễn Thúy Kiều', 'thuykieu@gmail.com', '0913456789', '606 Trần Hưng Đạo, Huế', '2024-01-09 18:00:00'),
(20, 'khoaquoc1', '$2b$10$18FjsUcKYUQ3A8MpUCTf3OfDist2Fcit7ThhYS7YQfvEMVljx1f0K', 'khoanguyen', 'khoaquoc21@gmail.com', '070 671 89', '123', '2024-11-21T03:13:08.984Z'),
(23, 'khoaquoc', '$2b$10$i64iCdSfJwVPQD2w.P2WT.eXuZIMUuwLeGvvXof9qBqI1n4/QvB5K', 'khoanguyen2', 'khoa12@gmail.com', '070 671 89', '1', '2024-12-01T06:26:31.861Z');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `db_detail_order`
--

DROP TABLE IF EXISTS `db_detail_order`;
CREATE TABLE IF NOT EXISTS `db_detail_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_order` int NOT NULL,
  `id_product` int NOT NULL,
  `qty` int NOT NULL,
  `sub_total_price` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_product` (`id_product`),
  KEY `id_order` (`id_order`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `db_detail_order`
--

INSERT INTO `db_detail_order` (`id`, `id_order`, `id_product`, `qty`, `sub_total_price`) VALUES
(32, 17, 10, 1, 9690000),
(33, 18, 11, 1, 24990000),
(34, 19, 11, 1, 24990000),
(41, 26, 10, 1, 9690000),
(42, 27, 12, 1, 16590000);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `db_order`
--

DROP TABLE IF EXISTS `db_order`;
CREATE TABLE IF NOT EXISTS `db_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `custom_id` int NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_phone` varchar(15) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_address` text NOT NULL,
  `total_price` float NOT NULL,
  `total_num_product` int NOT NULL,
  `create_date` varchar(255) NOT NULL,
  `note` text NOT NULL,
  `payment_method` varchar(255) NOT NULL,
  `status` enum('Thành công','Chờ xác nhận','Hủy','Đang giao hàng','Hoàn tất') NOT NULL,
  `time` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `date_confirm` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `db_order_ibfk_1` (`custom_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `db_order`
--

INSERT INTO `db_order` (`id`, `custom_id`, `customer_name`, `customer_phone`, `customer_email`, `customer_address`, `total_price`, `total_num_product`, `create_date`, `note`, `payment_method`, `status`, `time`, `code`, `date_confirm`) VALUES
(17, 23, 'khoanguyen12344545', '1234567890', 'HJdd@gmail.com', '123, Xã Hoàng Việt, Huyện Văn Lãng, Tỉnh Lạng Sơn', 9690000, 1, '2024-12-18 15:30:07', '', 'COD', 'Hoàn tất', '2024-12-18 15:30:07', 'ORD-1734510607788', '2024-12-18 15:30:24'),
(18, 23, 'nguyen van c', '3321030123', 'K@gmail.com', '123, Xã Hạ Long, Huyện Vân Đồn, Tỉnh Quảng Ninh', 24990000, 1, '2024-12-18 15:35:25', '', 'COD', 'Hoàn tất', '2024-12-18 15:35:25', 'ORD-1734510925771', '2024-12-18 15:35:53'),
(19, 23, 'khoanguyen12344545', '1234567890', 'K@gmail.com', '123, Xã Thọ Văn, Huyện Tam Nông, Tỉnh Phú Thọ', 24990000, 1, '2024-12-18 15:53:43', '', 'COD', 'Hủy', '2024-12-18 15:53:43', 'ORD-1734512023427', '2024-12-18 15:53:43'),
(26, 23, 'khoanguyen12344545', '3321030123', 'HJdd@gmail.com', '123, Xã Quan Lạn, Huyện Vân Đồn, Tỉnh Quảng Ninh', 9690000, 1, '2024-12-18 16:25:16', '', 'COD', 'Chờ xác nhận', '2024-12-18 16:25:16', 'ORD-1734513916921', '2024-12-18 16:25:16'),
(27, 23, 'khoanguyen', '1234567890', 'HJdd@gmail.com', '123, Xã Tư Mại, Huyện Yên Dũng, Tỉnh Bắc Giang', 16590000, 1, '2024-12-18 16:41:49', '', 'Direct', 'Chờ xác nhận', '2024-12-18 16:41:49', 'ORD-1734514909304', '2024-12-18 16:41:49');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `db_product`
--

DROP TABLE IF EXISTS `db_product`;
CREATE TABLE IF NOT EXISTS `db_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_category` int NOT NULL,
  `id_brand` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `price` float NOT NULL,
  `quantity` int NOT NULL,
  `status` enum('còn hàng','hết hàng','hàng sắp về') NOT NULL,
  `description` text NOT NULL,
  `screen` varchar(255) NOT NULL,
  `ram` varchar(255) NOT NULL,
  `cpu` varchar(255) NOT NULL,
  `memory` varchar(255) NOT NULL,
  `operating_system` varchar(255) NOT NULL,
  `front_camera` varchar(255) NOT NULL,
  `rear_camera` varchar(255) NOT NULL,
  `user` varchar(255) NOT NULL,
  `create_date` varchar(255) NOT NULL,
  `images` text,
  PRIMARY KEY (`id`),
  KEY `id_brand` (`id_brand`),
  KEY `id_category` (`id_category`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `db_product`
--

INSERT INTO `db_product` (`id`, `id_category`, `id_brand`, `name`, `code`, `price`, `quantity`, `status`, `description`, `screen`, `ram`, `cpu`, `memory`, `operating_system`, `front_camera`, `rear_camera`, `user`, `create_date`, `images`) VALUES
(8, 3, 12, 'iPhone 14', '1', 16590000, 100, 'còn hàng', 'iPhone 14 128GB được xem là mẫu sxmartphone bùng nổ của nhà táo trong năm 2022, ấn tượng với ngoại hình trẻ trung, màn hình chất lượng đi kèm với những cải tiến về hệ điều hành và thuật toán xử lý hình ảnh, giúp máy trở thành cái tên thu hút được đông đảo người dùng quan tâm tại thời điểm ra mắt.', 'OLED', '6 GB', 'Apple A15 Bionic', '128 GB', 'iOS 17', '12 MP', '2 camera 12 MP', 'Admin', '2024-12-01', '[\"1733031102777-iphone-14_1.webp\"]'),
(9, 3, 12, 'iPhone 16 Pro Max 256GB', '2', 33690000, 1000, 'còn hàng', 'Đặc điểm nổi bật của iPhone 16 Pro Max 256GB\r\nMàn hình Super Retina XDR 6,9 inch lớn hơn có viền mỏng hơn, đem đến cảm giác tuyệt vời khi cầm trên tay.\r\nĐiều khiển Camera - Chỉ cần trượt ngón tay để điều chỉnh camera giúp chụp ảnh hoặc quay video đẹp hoàn hảo và siêu nhanh.\r\niPhone 16 Pro Max có thiết kế titan cấp 5 với lớp hoàn thiện mới, tinh tế được xử lý bề mặt vi điểm.\r\niPhone 16 Pro Max được cài đặt sẵn hệ điều hành iOS 18, cho giao diện trực quan, dễ sử dụng và nhiều tính năng hữu ích.', 'Super Retina XDR OLED', '6 GB', 'CPU 6 lõi mới với 2 lõi hiệu năng và 4 lõi hiệu suất', '256 GB', 'iOS 18', '12MP, ƒ/1.9, Tự động lấy nét theo pha Focus Pixels', 'Camera chính: 48MP, f/1.78, 24mm, 2µm, chống rung quang học dịch chuyển cảm biến thế hệ thứ hai, Focus Pixels 100% Telephoto 2x 12MP: 52 mm, ƒ/1.6 Camera góc siêu rộng: 48MP, 13 mm,ƒ/2.2 và trường ảnh 120°, Hybrid Focus Pixels, ảnh có độ phân giải', 'Admin', '2024-12-03', '[\"1733239940811-iphone-16-pro-max.webp\"]'),
(10, 3, 12, 'iPhone 11 128GB', '3', 9690000, 1000, 'còn hàng', 'iPhone 11 128GB chính hãng có thiết kế hiện đại, thừa hưởng khá nhiều từ sự các thế hệ trước như Xs hay X. Khung viền nhôm chắc chắn cùng với mặt kính đem lại vẻ sang trọng, đẳng cấp. Các góc cạnh được bo tròn. Mặt kính cường lực không chỉ giúp màn hình “mạnh mẽ” hơn mà còn chống xước, chống bám vân tay tốt hơn so với đời trước.', ' IPS LCD', '4 GB', ' Apple A13 Bionic (7 nm+)', '128 GB', ' iOS 13', ' 12 MP, f/2.2', ' 12 MP + 12 MP,', 'Admin', '2024-12-03', '[\"1733236052282-1683605592281_thumb_iphone_11_didongviet.webp\"]'),
(11, 3, 13, 'Samsung Galaxy Z Flip6 12GB 256GB', '4', 24990000, 100, 'còn hàng', 'Đặc điểm nổi bật của Samsung Galaxy Z Flip6 12GB 256GB\r\nChip Snapdragon 8 Gen 3 8 nhân mang đến hiệu năng mạnh mẽ, cho phép bạn xử lý các tác vụ hàng ngày một cách mượt mà.\r\nMàn hình gập 6.7 inch Dynamic AMOLED 2X 120Hz mang đến trải nghiệm hình ảnh tuyệt vời, với độ phân giải cao.\r\nCamera sau 50MP + 12MP cho phép bạn chụp ảnh chất lượng cao, với độ chi tiết cao và màu sắc rực rỡ. \r\nPin dung lượng 4000 mAh cho phép bạn sử dụng điện thoại cả ngày dài mà không cần lo lắng về việc hết pin. \r\nSamsung Z Flip 6 là chiếc điện thoại gập vỏ sò chạy chip Snapdragon 8 Gen 3 for Galaxy mạnh mẽ bậc nhất hiện nay. Máy có cụm camera kép độ phân giải 50MP sắc nét. Đi kèm là bộ nhớ RAM 12GB và thời lượng pin được nâng cấp thêm 4 tiếng sử dụng. Màn hình ngoài Z Flip6 tăng kích thước lên 3.4 inch cho khả năng đa nhiệm vượt trội. Sản phẩm chính thức được ra mắt ngày 10/7/2024 tại sự kiện Galaxy Unpacked diễn ra ở thủ đô Paris nước Pháp.', 'Dynamic AMOLED 2X', '12 GB', ' Snapdragon 8 Gen 3 for Galaxy Tăng lên 42% AI', '256 GB', 'Android', '10.0 MP, f/2.2', 'Camera góc chụp rộng: 50.0 MP, f/1.8, thu phóng quang học 2x Góc chụp siêu rộng: 12.0 MP, f/2.2', 'Admin', '2024-12-05', '[\"1733388272527-flip-vang.webp\"]'),
(12, 3, 12, 'iPhone 14 128GB', '1', 16590000, 100, 'còn hàng', 'iPhone 14 128GB với hiệu năng mạnh mẽ, camera cải tiến, pin bền, màn hình OLED đẹp.', 'OLED', '6 GB', 'Apple A15 Bionic', '128 GB', 'iOS 15', '12 MP', '2 camera 12 MP', 'Admin', '2024-12-06', '[\"1733981058312-iPhone 14 128GB.webp\"]'),
(13, 3, 12, 'iPhone 14 Pro 256GB', '2', 25990000, 200, 'còn hàng', 'iPhone 14 Pro màn hình ProMotion, camera tele, chip A16, thiết kế sang trọng.', 'OLED 120Hz', '6 GB', 'Apple A16 Bionic', '256 GB', 'iOS 16', '12 MP', '3 camera 48 MP', 'Admin', '2024-12-06', '[\"1733981087160-iPhone 14 Pro 256GB.webp\"]'),
(14, 3, 13, 'Samsung Galaxy S23 128GB', '3', 17990000, 300, 'còn hàng', 'Galaxy S23 hiệu năng cao, màn hình AMOLED 120Hz, camera sắc nét, pin ổn.', 'AMOLED 120Hz', '8 GB', 'Snapdragon 8 Gen 2', '128 GB', 'Android 13', '10 MP', '3 camera 50 MP', 'Admin', '2024-12-07', '[\"1733981154925-Samsung Galaxy S23 128GB.webp\"]'),
(15, 3, 13, 'Samsung Galaxy S23 Ultra 512GB', '4', 31990000, 150, 'còn hàng', 'S23 Ultra bút S Pen, camera 200MP, màn hình cong, đỉnh cao công nghệ Samsung.', 'Dynamic AMOLED 120Hz', '12 GB', 'Snapdragon 8 Gen 2', '512 GB', 'Android 13', '12 MP', '4 camera 200 MP', 'Admin', '2024-12-07', '[\"1733981182015-Samsung Galaxy S23 Ultra 512GB.webp\"]'),
(16, 3, 14, 'OPPO Reno8 Pro', '5', 12990000, 500, 'còn hàng', 'Reno8 Pro thiết kế mỏng, camera chụp đêm, sạc nhanh, màn hình AMOLED mượt.', 'AMOLED 90Hz', '8 GB', 'MediaTek Dimensity 1300', '256 GB', 'Android 13', '32 MP', '3 camera 50 MP', 'Admin', '2024-12-08', '[\"1733981243440-OPPO Reno8 Pro.webp\"]'),
(17, 3, 14, 'OPPO Find X5 Pro', '6', 21990000, 150, 'còn hàng', 'Find X5 Pro camera Hasselblad, màn hình LTPO 120Hz, sạc 80W, hiệu năng mạnh.', 'LTPO AMOLED 120Hz', '12 GB', 'Snapdragon 8 Gen 1', '256 GB', 'Android 13', '32 MP', '3 camera 50 MP Hasselblad', 'Admin', '2024-12-08', '[\"1733981299774-OPPO Find X5 Pro.webp\"]'),
(18, 3, 15, 'Xiaomi 12 256GB', '7', 13990000, 400, 'còn hàng', 'Xiaomi 12 nhỏ gọn, camera tốt, sạc nhanh 67W, màn hình AMOLED 120Hz.', 'AMOLED 120Hz', '8 GB', 'Snapdragon 8 Gen 1', '256 GB', 'Android 13', '32 MP', '3 camera 50 MP', 'Admin', '2024-12-09', '[\"1733981365867-Xiaomi 12 256GB.webp\"]'),
(19, 3, 15, 'Xiaomi 12T Pro', '8', 15990000, 300, 'còn hàng', '12T Pro camera 200MP, sạc 120W, hiệu năng cao, màn hình tuyệt đẹp.', 'AMOLED 120Hz', '12 GB', 'Snapdragon 8+ Gen 1', '256 GB', 'Android 13', '20 MP', '3 camera 200 MP', 'Admin', '2024-12-09', '[\"1733981400035-Xiaomi 12T Pro.webp\"]'),
(20, 3, 16, 'Vivo X90', '9', 12990000, 350, 'còn hàng', 'Vivo X90 camera Zeiss, màn hình AMOLED E5, sạc nhanh 120W.', 'AMOLED E5', '8 GB', 'Dimensity 9000', '128 GB', 'Android 13', '32 MP', '3 camera 50 MP Zeiss', 'Admin', '2024-12-10', '[\"1733981434245-Vivo X90.webp\"]'),
(21, 3, 16, 'Vivo V27 Pro', '10', 9990000, 500, 'còn hàng', 'V27 Pro thiết kế mỏng, camera selfie tốt, màn hình cong, màu sắc trẻ trung.', 'AMOLED 120Hz', '8 GB', 'Dimensity 8200', '128 GB', 'Android 13', '50 MP', '3 camera 64 MP', 'Admin', '2024-12-10', '[\"1733981466595-Vivo V27 Pro.webp\"]'),
(22, 3, 17, 'Realme GT2 Pro', '11', 11990000, 250, 'còn hàng', 'GT2 Pro hiệu năng mạnh, màn hình LTPO 120Hz, camera góc siêu rộng 150°.', 'LTPO AMOLED 120Hz', '12 GB', 'Snapdragon 8 Gen 1', '256 GB', 'Android 13', '32 MP', '3 camera 50 MP', 'Admin', '2024-12-11', '[\"1733981497875-Realme GT2 Pro.webp\"]'),
(23, 3, 17, 'Realme 10 Pro+', '12', 8990000, 600, 'còn hàng', 'Realme 10 Pro+ giá tốt, màn hình cong AMOLED, sạc nhanh 67W, camera ổn.', 'AMOLED 120Hz', '8 GB', 'Dimensity 1080', '128 GB', 'Android 13', '16 MP', '3 camera 108 MP', 'Admin', '2024-12-11', '[\"1733981531845-Realme 10 Pro+.webp\"]'),
(24, 3, 15, 'Xiaomi Redmi Note 11 Pro', '13', 7490000, 500, 'còn hàng', 'Redmi Note 11 Pro pin 5000mAh, sạc 67W, màn hình AMOLED 120Hz, camera 108MP.', 'AMOLED 120Hz', '6 GB', 'MediaTek G96', '128 GB', 'Android 12', '16 MP', '3 camera 108 MP', 'Admin', '2024-12-12', '[\"1733981577556-Xiaomi Redmi Note 11 Pro.webp\"]'),
(25, 3, 14, 'OPPO A96', '14', 5490000, 700, 'còn hàng', 'OPPO A96 giá rẻ, pin lớn 5000mAh, sạc 33W, hiệu năng đủ dùng, camera ổn.', 'IPS LCD', '8 GB', 'Snapdragon 680', '128 GB', 'Android 12', '16 MP', '2 camera 50 MP', 'Admin', '2024-12-12', '[\"1733981673896-OPPO A96.png\"]'),
(26, 3, 12, 'iPhone 15 128GB', '19', 19990000, 300, 'còn hàng', 'iPhone 15 cải tiến camera, chip A16, cổng USB-C, màn hình sáng hơn, pin bền.', 'OLED', '6 GB', 'Apple A16 Bionic', '128 GB', 'iOS 16', '12 MP', '2 camera 48 MP', 'Admin', '2024-12-13', '[\"1733981706549-iPhone 15 128GB.webp\"]'),
(27, 3, 13, 'Samsung Galaxy A34 5G', '20', 8990000, 500, 'còn hàng', 'A34 5G giá hợp lý, màn hình AMOLED 90Hz, camera tốt, hỗ trợ 5G.', 'AMOLED 90Hz', '6 GB', 'Dimensity 1080', '128 GB', 'Android 13', '13 MP', '3 camera 48 MP', 'Admin', '2024-12-13', '[\"1733981734111-Samsung Galaxy A34 5G.webp\"]'),
(28, 3, 16, 'Vivo Y78', '21', 5990000, 600, 'còn hàng', 'Vivo Y78 giá rẻ, pin lớn 5000mAh, camera ổn, màn hình IPS đủ dùng.', 'IPS LCD', '4 GB', 'Snapdragon 695', '64 GB', 'Android 13', '8 MP', '2 camera 50 MP', 'Admin', '2024-12-14', '[\"1733981780190-Vivo Y78.webp\"]'),
(29, 3, 17, 'Realme C55', '22', 3990000, 800, 'còn hàng', 'Realme C55 giá rất rẻ, hiệu năng cơ bản, pin to 5000mAh, camera đủ xài.', 'IPS LCD', '4 GB', 'Helio G88', '64 GB', 'Android 12', '8 MP', '2 camera 50 MP', 'Admin', '2024-12-14', '[\"1733981810160-Realme C55.webp\"]'),
(30, 3, 13, 'Samsung Galaxy M34', '23', 5990000, 500, 'còn hàng', 'M34 pin 6000mAh, màn hình AMOLED, hiệu năng tầm trung, thích hợp đa số người dùng.', 'AMOLED', '6 GB', 'Exynos 1280', '128 GB', 'Android 13', '13 MP', '3 camera 50 MP', 'Admin', '2024-12-15', '[\"1733981847794-Samsung Galaxy M34.webp\"]'),
(31, 3, 15, 'Xiaomi Redmi 12C', '24', 2990000, 1000, 'còn hàng', 'Redmi 12C giá siêu rẻ, pin lớn, màn hình to, hiệu năng cơ bản cho nhu cầu nhẹ.', 'IPS LCD', '4 GB', 'Helio G35', '64 GB', 'Android 12', '5 MP', '2 camera 50 MP', 'Admin', '2024-12-15', '[\"1733981879951-Xiaomi Redmi 12C.webp\"]');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `db_slider`
--

DROP TABLE IF EXISTS `db_slider`;
CREATE TABLE IF NOT EXISTS `db_slider` (
  `id` int NOT NULL AUTO_INCREMENT,
  `image` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `user` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Đang đổ dữ liệu cho bảng `db_slider`
--

INSERT INTO `db_slider` (`id`, `image`, `user`) VALUES
(21, '[\"1734507286103-banner1.webp\",\"1734507286104-banner2.webp\",\"1734507286104-banner3.webp\"]', '1');

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `db_detail_order`
--
ALTER TABLE `db_detail_order`
  ADD CONSTRAINT `db_detail_order_ibfk_1` FOREIGN KEY (`id_product`) REFERENCES `db_product` (`id`),
  ADD CONSTRAINT `db_detail_order_ibfk_2` FOREIGN KEY (`id_order`) REFERENCES `db_order` (`id`);

--
-- Các ràng buộc cho bảng `db_order`
--
ALTER TABLE `db_order`
  ADD CONSTRAINT `db_order_ibfk_1` FOREIGN KEY (`custom_id`) REFERENCES `db_customer` (`id`);

--
-- Các ràng buộc cho bảng `db_product`
--
ALTER TABLE `db_product`
  ADD CONSTRAINT `db_product_ibfk_1` FOREIGN KEY (`id_brand`) REFERENCES `db_brand` (`id`),
  ADD CONSTRAINT `db_product_ibfk_2` FOREIGN KEY (`id_category`) REFERENCES `db_category` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
