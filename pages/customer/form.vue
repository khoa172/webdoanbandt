<template>
    <div class="container mt-5">
      <h1>{{ isEdit ? 'Sửa Thông Tin Khách Hàng' : 'Thêm Khách Hàng Mới' }}</h1>
      <form @submit.prevent="handleSubmit">
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
        <button  type="button" class="btn btn-secondary" @click="goBack">Hủy</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import Swal from 'sweetalert2';

  const router = useRouter();
  const route = useRoute();
  const isEdit = ref(false);
  const form = ref({
    id: null,
    fullname: '',
    mail: '',
    phone: '',
    address: '',
  });
  
  // Xác định xem là sửa hay thêm
  onMounted(() => {
    if (route.query.id) {
      isEdit.value = true;
      form.value = JSON.parse(decodeURIComponent(route.query.customer));
    }
  });
  
  // Submit form
  const handleSubmit = async () => {
    const result = await Swal.fire({
    title: isEdit.value ? 'Xác nhận cập nhật' : 'Xác nhận thêm mới',
    text: isEdit.value
      ? 'Bạn có chắc chắn muốn cập nhật thông tin khách hàng này?'
      : 'Bạn có chắc chắn muốn thêm khách hàng này?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: isEdit.value ? 'Cập nhật' : 'Thêm',
    cancelButtonText: 'Hủy',
  });

  if (!result.isConfirmed) {
    return; 
  }

  const { public: { apiBase } } = useRuntimeConfig();
  try {
    if (isEdit.value) {
      await $fetch(`${apiBase}/api/customers/${form.value.id}`, {
        method: 'PUT',
        body: { ...form.value },
      });
      Swal.fire('Thành công!', 'Thông tin khách hàng đã được cập nhật.', 'success');
    } else {
      await $fetch(`${apiBase}/api/customers`, {
        method: 'POST',
        body: { ...form.value },
      });
      Swal.fire('Thành công!', 'Khách hàng mới đã được thêm.', 'success');
    }
    router.push('/admin');
  } catch (error) {
    console.error('Lỗi khi xử lý form khách hàng:', error);
    Swal.fire('Lỗi!', 'Không thể xử lý yêu cầu.', 'error');
  }
  };
  
  // Hủy và quay lại
  const goBack = () => {
    router.push('/admin');
  };
  </script>
  
