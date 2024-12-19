<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Quản Lý Sản Phẩm</h1>

    <!-- Tìm kiếm sản phẩm -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <input
        type="text"
        class="form-control w-50"
        placeholder="Tìm kiếm sản phẩm..."
        v-model="searchQuery"
      />
      <button class="btn btn-primary" @click="goToForm">
        <i class="fa fa-plus me-2"></i>Thêm Sản Phẩm
      </button>
    </div>

    <!-- Bảng sản phẩm -->
    <ProductTable
      :products="filteredProducts"
      @edit="editProduct"
      @delete="deleteProduct"
    />
  </div>
</template>


<script setup>
definePageMeta({
  layout: 'admin',
});

import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import ProductTable from "~/components/ProductTable.vue";
import Swal from "sweetalert2";

const router = useRouter();
const products = ref([]);
const searchQuery = ref("");

// Lấy danh sách sản phẩm
const fetchProducts = async () => {
  try {
    products.value = await $fetch("http://localhost:3001/api/products");
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
  }
};

// Điều hướng đến form thêm sản phẩm
const goToForm = () => {
  router.push("/admin/product/form");
};

// Chỉnh sửa sản phẩm
const editProduct = (product) => {
  router.push({
    path: "/admin/product/form",
    query: { id: product.id, product: encodeURIComponent(JSON.stringify(product)) },
  });
};

// Xóa sản phẩm
const deleteProduct = async (id) => {
  const result = await Swal.fire({
    title: "Xác nhận xóa",
    text: "Bạn có chắc chắn muốn xóa sản phẩm này?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
  });

  if (result.isConfirmed) {
    try {
      await $fetch(`http://localhost:3001/api/products/${id}`, { method: "DELETE" });
      Swal.fire("Đã xóa!", "Sản phẩm đã được xóa thành công.", "success");
      fetchProducts();
    } catch (error) {
      Swal.fire("Lỗi!", "Không thể xóa sản phẩm.", "error");
    }
  }
};

// Lọc sản phẩm dựa trên từ khóa tìm kiếm
const filteredProducts = computed(() =>
  products.value.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
);

onMounted(() => {
  fetchProducts();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
}

input[type="text"] {
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

button {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
}

button i {
  font-size: 18px;
}

table {
  width: 100%;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

table thead {
  background-color: #f8f9fa;
  color: #495057;
}

table th,
table td {
  text-align: left;
  padding: 12px;
}

table tr:hover {
  background-color: #f1f1f1;
}
</style>

