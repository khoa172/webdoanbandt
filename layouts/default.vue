<template>
  <div>
    <!-- Nền -->
    <div class="background"></div>

    <!-- Hiệu ứng tuyết -->
    <div id="snow-container"></div>

    <!-- Nội dung trang -->
    <div class="layout-container">
      <!-- Header -->
      <defaultHeader />

      <!-- Nội dung chính -->
      <div class="content-container">
        <NuxtPage />
      </div>

      <!-- Footer -->
      <defaultFooter />
    </div>
  </div>
</template>

<script>
import defaultHeader from "~/components/Header/defaultHeader.vue";
import defaultFooter from "~/components/Footer/defaultFooter.vue";

export default {
  components: {
    defaultHeader,
    defaultFooter,
  },
};
</script>

<style scoped>
/* Nền mùa đông */
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/images/background.jpg'); /* URL ảnh của bạn */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1; /* Nền nằm dưới tất cả */
}

/* Hiệu ứng tuyết */
#snow-container {
  position: fixed; /* Tuyết cố định toàn màn hình */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* Không chặn sự kiện */
  z-index: 1000; /* Đảm bảo nằm trên tất cả nội dung */
}

/* Nội dung chính */
.layout-container {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  z-index: 0; /* Nội dung nằm dưới hiệu ứng tuyết */
}

/* Nội dung chính trong từng trang */
.content-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

/* Điều chỉnh nút */
button {
  background-color: #007bff;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1;
}

button:hover {
  background-color: #0056b3;
}
</style>
