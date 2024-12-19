<template>
    <div>
      <h2 v-if="isEdit" class="mt-4">Sửa Thông Tin Khách Hàng</h2>
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="fullname" class="form-label">Họ Tên</label>
          <input type="text" v-model="form.fullname" class="form-control" id="fullname" required />
        </div>
        <div class="mb-3">
          <label for="mail" class="form-label">Email</label>
          <input type="email" v-model="form.mail" class="form-control" id="mail" required />
        </div>
        <div class="mb-3">
          <label for="phone" class="form-label">Số Điện Thoại</label>
          <input type="tel" v-model="form.phone" class="form-control" id="phone" required />
        </div>
        <div class="mb-3">
          <label for="address" class="form-label">Địa Chỉ</label>
          <textarea v-model="form.address" class="form-control" id="address" rows="3" required></textarea>
        </div>
        <button type="submit" class="btn btn-success">{{ isEdit ? "Cập Nhật" : "Thêm" }}</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, toRefs } from 'vue';
  
  // Nhận props từ admin.vue
  const props = defineProps({
    isEdit: Boolean,
    formData: Object, // Dữ liệu khách hàng cần sửa (nếu có)
  });
  
  // Emit sự kiện để thông báo admin.vue
  const emit = defineEmits(['submit']);
  
  // Tạo bản sao của dữ liệu form để không làm thay đổi trực tiếp props
  const form = ref({ ...props.formData });
  
  // Theo dõi thay đổi props.formData
  watch(() => props.formData, (newVal) => {
    form.value = { ...newVal };
  });
  
  // Gửi sự kiện khi submit form
  const submitForm = () => {
    emit('submit', { ...form.value });
  };
  </script>
  