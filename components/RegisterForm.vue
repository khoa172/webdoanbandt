<template>
  <div>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="username" class="form-label">Tên đăng nhập</label>
        <input
          type="text"
          v-model="username"
          class="form-control"
          id="username"
          placeholder="Nhập tên đăng nhập"
          required
        />
      </div>
      <div class="mb-3 position-relative">
        <label for="password" class="form-label">Mật khẩu</label>
        <input
          :type="showPassword ? 'text' : 'password'"
          v-model="password"
          class="form-control"
          id="password"
          placeholder="Nhập mật khẩu"
          required
        />
        <button
          type="button"
          class="btn btn-sm btn-light position-absolute end-0 top-50 translate-middle-y"
          @click="togglePasswordVisibility"
          style="right: 10px;"
        >
          {{ showPassword ? 'Ẩn' : 'Hiện' }}
        </button>
      </div>
      <div class="mb-3">
        <label for="fullname" class="form-label">Họ và tên</label>
        <input
          type="text"
          v-model="fullname"
          class="form-control"
          id="fullname"
          placeholder="Nhập họ và tên"
          required
        />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          v-model="email"
          class="form-control"
          id="email"
          placeholder="Nhập email"
          required
        />
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Số điện thoại</label>
        <input
          type="tel"
          v-model="phone"
          class="form-control"
          id="phone"
          placeholder="Nhập số điện thoại"
          required
        />
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Địa chỉ</label>
        <textarea
          v-model="address"
          class="form-control"
          id="address"
          rows="3"
          placeholder="Nhập địa chỉ"
          required
        ></textarea>
      </div>
      <button type="submit" class="btn btn-success w-100 mt-3">Đăng ký</button>
      <p v-if="error" class="text-danger mt-3 text-center">{{ error }}</p>
    </form>
    <div class="text-center mt-4">
      <p>
        Đã có tài khoản?
        <a href="#" class="text-primary" @click.prevent="$emit('switchToLogin')">Đăng nhập ngay</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Swal from 'sweetalert2'; // Import SweetAlert2 trong Nuxt.js

const username = ref('');
const password = ref('');
const fullname = ref('');
const email = ref('');
const phone = ref('');
const address = ref('');
const error = ref('');
const showPassword = ref(false);
const emit = defineEmits(['switchToLogin']);

const runtimeConfig = useRuntimeConfig(); // Sử dụng `useRuntimeConfig` trong Nuxt.js để lấy API base URL.

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const submitForm = async () => {
  try {
    const response = await $fetch('/api/customersregister/register', {
      method: 'POST',
      baseURL: runtimeConfig.public.apiBase, // Lấy baseURL từ cấu hình Nuxt 3.
      body: {
        username: username.value,
        password: password.value,
        fullname: fullname.value,
        mail: email.value,
        phone: phone.value,
        address: address.value,
      },
    });

    if (response.message) {
      // Hiển thị thông báo với SweetAlert2
      await Swal.fire({
        title: 'Thành công!',
        text: 'Tài khoản của bạn đã được tạo thành công.',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      // Chuyển hướng về trang đăng nhập sau khi người dùng nhấn OK
      emit('switchToLogin');
    }
  } catch (err) {
    error.value = err.response?._data?.message || 'Đăng ký thất bại';
  }
};
</script>

<style scoped>
.container {
  margin-top: 100px;
}
.text-primary {
  text-decoration: none;
}
.text-primary:hover {
  text-decoration: underline;
}
</style>
