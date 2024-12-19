export default defineNuxtPlugin(() => {
  if (process.client) {
    const style = document.createElement("style");
    style.innerHTML = `
      #snow-container {
        position: fixed; /* Đảm bảo phủ toàn màn hình */
        top: 0;
        left: 0;
        width: 100%; /* Chiều rộng toàn bộ màn hình */
        height: 100%; /* Chiều cao toàn bộ màn hình */
        pointer-events: none; /* Không ảnh hưởng đến tương tác người dùng */
        z-index: 9999; /* Cao hơn mọi thành phần khác */
      }

      .snowflake {
        position: absolute;
        top: -10px; /* Bắt đầu từ trên cùng */
        color: white; /* Màu trắng như tuyết */
        font-size: 8px; /* Kích thước mặc định */
        opacity: 0.8; /* Hơi trong suốt */
        animation: fall linear infinite, sway 3s ease-in-out infinite; /* Rơi và lắc nhẹ */
      }

     @keyframes fall {
        0% { top: -10px; }
        100% { top: 100vh; }
      }

      @keyframes sway {
        0%, 100% {
          transform: translateX(0); /* Không lệch */
        }
        50% {
          transform: translateX(10px); /* Lắc nhẹ sang phải */
        }
      }
    `;
    document.head.appendChild(style);

    const snowContainer = document.createElement("div");
    snowContainer.id = "snow-container";
    document.body.appendChild(snowContainer);

    function createSnowflake() {
      const snowflake = document.createElement("div");
      snowflake.classList.add("snowflake");
      snowflake.textContent = "❄";

      // Đặt vị trí ngẫu nhiên cho bông tuyết
      snowflake.style.left = Math.random() * 100 + "vw"; // Vị trí ngang ngẫu nhiên
      snowflake.style.top = "-10px"; // Bắt đầu từ trên cùng

      // Thời gian rơi và kích thước ngẫu nhiên
      snowflake.style.animationDuration = Math.random() * 5 + 4 + "s"; // Tốc độ rơi từ 3s đến 8s
      snowflake.style.fontSize = Math.random() * 10 + 8 + "px"; // Kích thước từ 8px đến 18px

      const snowContainer = document.getElementById("snow-container");
      snowContainer.appendChild(snowflake);

      // Xóa bông tuyết sau khi rơi xong
      setTimeout(() => {
        snowflake.remove();
      }, 8000); // Xóa sau 8 giây
    }

    // Tạo bông tuyết mới mỗi 400ms
    setInterval(createSnowflake, 400);
  }
});
