<template>
  <v-footer
    class="bg-dark text-white py-4"
    height="auto"
  >
    <v-container>
      <v-row>
        <!-- Cột Contact -->
        <v-col cols="12" md="3">
          <h6 class="font-weight-bold">VỀ CHÚNG TÔI</h6>
          <p>
            <nuxt-link to="/about" class="custom-link">About</nuxt-link>
          </p>
        </v-col>

        <v-col cols="12" md="4">
          <h6 class="font-weight-bold">Liên Hệ</h6>
          <p >
           Mobile: +8487654321
          </p>
          <p >
            Email: dienthoai@gmail.com
          </p>
        </v-col>

        <v-col cols="12" md="4" class="text-center">
          <h6 class="font-weight-bold">KẾT NỐI VỚI CHÚNG TÔI</h6>
          <v-btn
            v-for="(icon, index) in icons"
            :key="index"
            :icon="icon.icon"
            :href="icon.link"
            target="_blank"
            class="mx-2"
            variant="text"
            color="white"
          ></v-btn>
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>
      <div class="text-center">
        <p class="mb-0">&copy; Cảm ơn đã đến với website của chúng tôi !</p>
      </div>
      <v-divider class="my-4"></v-divider>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  data() {
    return {
      icons: [
        { icon: "mdi-facebook", link: "https://www.facebook.com" },
        { icon: "mdi-twitter", link: "https://www.twitter.com" },
        { icon: "mdi-instagram", link: "https://www.instagram.com" },
        { icon: "mdi-linkedin", link: "https://www.linkedin.com" },
      ],
    };
  },
};
</script>

<style scoped>
.custom-link {
  text-decoration: none; /* Xóa gạch chân */
  color: white; /* Màu chữ */
  font-weight: bold; /* Đậm chữ */
  transition: color 0.3s; /* Hiệu ứng khi hover */
}
.custom-link:hover {
  color: #f1c40f; /* Đổi màu khi hover */
}
.bg-dark {
  background-color: #b91111; /* Màu nền tối */
}

.text-white {
  color: white;
}

.v-btn {
  transition: transform 0.2s;
}

.v-btn:hover {
  transform: scale(1.1);
}
</style>