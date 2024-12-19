<template>
    <div class="container mt-5">
      <h1>{{ isEdit ? "Sửa Thương Hiệu" : "Thêm Thương Hiệu" }}</h1>
      <form @submit.prevent="handleBrandSubmit">
        <div class="mb-3">
          <label for="brand-name" class="form-label">Tên Thương Hiệu</label>
          <input
            type="text"
            id="brand-name"
            v-model="brandForm.name"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="brand-code" class="form-label">Mã Thương Hiệu</label>
          <input
            type="text"
            id="brand-code"
            v-model="brandForm.code"
            class="form-control"
            required
          />
        </div>
        <div class="mb-3">
          <label for="brand-image" class="form-label">Hình Ảnh</label>
          <input
            type="file"
            id="brand-image"
            @change="handleImageChange"
            class="form-control"
            accept="image/*"
          />
          <div v-if="previewImage || brandForm.image" class="mt-3">
            <p>Xem trước hình ảnh:</p>
            <img
              :src="previewImage || getBrandImageUrl(brandForm.image)"
              alt="Preview"
              class="img-thumbnail"
              style="max-width: 200px;"
            />
          </div>
        </div>
        <div class="mb-3">
          <label for="brand-description" class="form-label">Mô Tả</label>
          <textarea
            id="brand-description"
            v-model="brandForm.description"
            class="form-control"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-success">{{ isEdit ? "Cập Nhật" : "Thêm" }}</button>
        <button type="button" class="btn btn-secondary" @click="goBack">Hủy</button>
      </form>
    </div>
  </template>
  
  
  <script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import Swal from 'sweetalert2';

const router = useRouter();
const route = useRoute();

const isEdit = ref(false);
const brandForm = ref({
  name: '',
  code: '',
  image: '', // Tên file hình ảnh từ server
  description: '',
});
const imageFile = ref(null); // Lưu trữ file hình ảnh mới
const previewImage = ref(''); // Lưu trữ URL để xem trước hình ảnh mới

// Tải thông tin thương hiệu khi sửa
onMounted(async () => {
  const brandId = route.query.id; // Lấy ID từ query
  if (brandId) {
    isEdit.value = true;
    try {
      const brand = await $fetch(`http://localhost:3001/api/brands/${brandId}`);
      brandForm.value = { ...brand };
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu thương hiệu:', error);
      Swal.fire('Lỗi', 'Không thể tải dữ liệu thương hiệu', 'error');
    }
  }
});

// Xử lý URL hình ảnh từ server
const getBrandImageUrl = (image) => {
  return image ? `http://localhost:3001/uploads/${image}` : '/default-image.jpg';
};

// Xử lý khi chọn hình ảnh
const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    previewImage.value = URL.createObjectURL(file); // Xem trước hình ảnh mới
  }
};

// Submit form
const handleBrandSubmit = async () => {
  const formData = new FormData();
  formData.append('name', brandForm.value.name);
  formData.append('code', brandForm.value.code);
  formData.append('description', brandForm.value.description);
  if (imageFile.value) {
    formData.append('image', imageFile.value); // Gửi file hình ảnh mới nếu có
  }

  try {
    const url = isEdit.value
      ? `http://localhost:3001/api/brands/${route.query.id}`
      : 'http://localhost:3001/api/brands';
    const method = isEdit.value ? 'PUT' : 'POST';

    await $fetch(url, {
      method,
      body: formData,
    });

    Swal.fire('Thành công', isEdit.value ? 'Thương hiệu đã được cập nhật' : 'Thương hiệu đã được thêm', 'success');
    router.push('/admin/product/brandAndCategory');
  } catch (error) {
    console.error('Lỗi khi gửi yêu cầu:', error);
    Swal.fire('Lỗi', 'Không thể xử lý yêu cầu', 'error');
  }
};

// Quay lại danh sách
const goBack = () => {
  router.push('/admin/product/brandAndCategory');
};
</script>
  