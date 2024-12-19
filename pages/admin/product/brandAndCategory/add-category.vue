<template>
    <div class="container mt-5">
      <h1>{{ isEdit ? "Sửa Danh Mục" : "Thêm Danh Mục" }}</h1>
      <form @submit.prevent="handleCategorySubmit">
        <div class="mb-3">
          <label for="category-name" class="form-label">Tên Danh Mục</label>
          <input type="text" id="category-name" v-model="categoryForm.name" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="category-code" class="form-label">Mã Danh Mục</label>
          <input type="text" id="category-code" v-model="categoryForm.code" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="category-image" class="form-label">Hình Ảnh</label>
          <input
            type="file"
            id="category-image"
            @change="handleImageChange"
            class="form-control"
            accept="image/*"
          />
          <div v-if="previewImage || categoryForm.image" class="mt-3">
            <p>Xem trước hình ảnh:</p>
            <img
              :src="previewImage || getCategoryImageUrl(categoryForm.image)"
              alt="Preview"
              class="img-thumbnail"
              style="max-width: 200px;"
            />
          </div>
        </div>
        <div class="mb-3">
          <label for="category-description" class="form-label">Mô Tả</label>
          <textarea id="category-description" v-model="categoryForm.description" class="form-control"></textarea>
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
const categoryForm = ref({
  name: '',
  code: '',
  image: '', // Tên file hình ảnh hiện tại
  description: '',
});
const imageFile = ref(null); // File hình ảnh mới
const previewImage = ref(''); // Xem trước hình ảnh mới

// Tải dữ liệu danh mục khi chỉnh sửa
onMounted(async () => {
  if (route.query.id) {
    isEdit.value = true;
    try {
      const category = await $fetch(`http://localhost:3001/api/categories/${route.query.id}`);
      categoryForm.value = { ...category };
    } catch (error) {
      Swal.fire('Lỗi', 'Không thể tải dữ liệu danh mục', 'error');
    }
  }
});

// Xử lý URL hình ảnh từ server
const getCategoryImageUrl = (image) => {
  return image ? `http://localhost:3001/uploads/${image}` : '/default-image.jpg';
};

// Xử lý khi chọn hình ảnh mới
const handleImageChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    imageFile.value = file;
    previewImage.value = URL.createObjectURL(file); // Tạo URL xem trước
  }
};

// Submit form
const handleCategorySubmit = async () => {
  const formData = new FormData();
  formData.append('name', categoryForm.value.name);
  formData.append('code', categoryForm.value.code);
  formData.append('description', categoryForm.value.description);
  if (imageFile.value) {
    formData.append('image', imageFile.value); // Thêm hình ảnh mới nếu có
  }

  try {
    const url = isEdit.value
      ? `http://localhost:3001/api/categories/${route.query.id}`
      : 'http://localhost:3001/api/categories';
    const method = isEdit.value ? 'PUT' : 'POST';

    await $fetch(url, {
      method,
      body: formData,
    });

    Swal.fire('Thành công', isEdit.value ? 'Danh mục đã được cập nhật' : 'Danh mục đã được thêm', 'success');
    router.push('/admin/product/brandAndCategory');
  } catch (error) {
    Swal.fire('Lỗi', 'Không thể xử lý yêu cầu', 'error');
  }
};

// Quay lại danh sách
const goBack = () => {
  router.push('/admin/product/brandAndCategory');
};
</script>