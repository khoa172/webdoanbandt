<template>
    <div class="container mt-5">
      <h1>Quản Lý Thương Hiệu và Danh Mục</h1>
      <div class="row">
        <!-- Quản lý Thương Hiệu -->
        <div class="col-md-6">
          <h3>Quản Lý Thương Hiệu</h3>
          <button class="btn btn-success mb-3" @click="goToAddBrand">Thêm Thương Hiệu</button>
          <ul class="list-group">
            <li
              v-for="brand in brands"
              :key="brand.id"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <div class="d-flex align-items-center">
                <!-- Hiển thị hình ảnh -->
                <img
                  :src="getBrandImage(brand.image)"
                  alt="Brand Image"
                  class="img-thumbnail me-3"
                  style="width: 50px; height: 50px; object-fit: cover;"
                />
                {{ brand.name }}
              </div>
              <div>
                <button class="btn btn-primary btn-sm" @click="goToEditBrand(brand)">Sửa</button>
                <button class="btn btn-danger btn-sm" @click="deleteBrand(brand.id)">Xóa</button>
              </div>
            </li>
          </ul>
        </div>
  
        <!-- Quản lý Danh Mục -->
        <div class="col-md-6">
          <h3>Quản Lý Danh Mục</h3>
          <button class="btn btn-success mb-3" @click="goToAddCategory">Thêm Danh Mục</button>
          <ul class="list-group">
            <li
              v-for="category in categories"
              :key="category.id"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <div class="d-flex align-items-center">
                <!-- Hiển thị hình ảnh -->
                <img
                  :src="getCategoryImage(category.image)"
                  alt="Category Image"
                  class="img-thumbnail me-3"
                  style="width: 50px; height: 50px; object-fit: cover;"
                />
                {{ category.name }}
              </div>
              <div>
                <button class="btn btn-primary btn-sm" @click="goToEditCategory(category)">Sửa</button>
                <button class="btn btn-danger btn-sm" @click="deleteCategory(category.id)">Xóa</button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup>
definePageMeta({
  layout: 'admin',
});

import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';

// State
const brands = ref([]);
const categories = ref([]);
const router = useRouter();

// API calls
const fetchBrands = async () => {
  try {
    brands.value = await $fetch('http://localhost:3001/api/brands');
  } catch (error) {
    Swal.fire('Lỗi', 'Không thể tải danh sách thương hiệu', 'error');
    console.error(error);
  }
};

const fetchCategories = async () => {
  try {
    categories.value = await $fetch('http://localhost:3001/api/categories');
  } catch (error) {
    Swal.fire('Lỗi', 'Không thể tải danh sách danh mục', 'error');
    console.error(error);
  }
};

// Utility: Lấy đường dẫn hình ảnh
const getBrandImage = (image) => {
  return image ? `http://localhost:3001/uploads/${image}` : '/default-image.jpg';
};

const getCategoryImage = (image) => {
  return image ? `http://localhost:3001/uploads/${image}` : '/default-image.jpg';
};

// Navigation
const goToAddBrand = () => {
  router.push('/admin/product/brandAndCategory/add-brand');
};

const goToEditBrand = (brand) => {
  router.push({ path: '/admin/product/brandAndCategory/add-brand', query: { id: brand.id } });
};

const deleteBrand = async (id) => {
  try {
    await $fetch(`http://localhost:3001/api/brands/${id}`, { method: 'DELETE' });
    Swal.fire('Thành công', 'Thương hiệu đã được xóa', 'success');
    fetchBrands();
  } catch (error) {
    Swal.fire('Lỗi', 'Không thể xóa thương hiệu', 'error');
    console.error(error);
  }
};

const goToAddCategory = () => {
  router.push('/admin/product/brandAndCategory/add-category');
};

const goToEditCategory = (category) => {
  router.push({ path: '/admin/product/brandAndCategory/add-category', query: { id: category.id } });
};

const deleteCategory = async (id) => {
  try {
    await $fetch(`http://localhost:3001/api/categories/${id}`, { method: 'DELETE' });
    Swal.fire('Thành công', 'Danh mục đã được xóa', 'success');
    fetchCategories();
  } catch (error) {
    Swal.fire('Lỗi', 'Không thể xóa danh mục', 'error');
    console.error(error);
  }
};

// Fetch data on mount
onMounted(() => {
  fetchBrands();
  fetchCategories();
});
</script>
  