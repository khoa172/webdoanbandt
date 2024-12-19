<template>
    <div class="container mt-5">
      <h1 class="text-center mb-4">Quản Lý Đơn Hàng</h1>
  
      <!-- Tìm kiếm đơn hàng -->
      <div class="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          class="form-control w-50"
          placeholder="Tìm kiếm đơn hàng..."
          v-model="searchQuery"
        />
      </div>
  
      <!-- Bảng đơn hàng -->
      <OrderTable
        :orders="filteredOrders"
        @view="viewOrderDetails"
        @delete="deleteOrder"
      />
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    layout: "admin",
  });
  
  import { ref, onMounted, computed } from "vue";
  import { useRouter } from "vue-router";
  import OrderTable from "~/components/OrderTable.vue";
  import Swal from "sweetalert2";
  
  const router = useRouter();
  const orders = ref([]);
  const searchQuery = ref("");
  
  // Lấy danh sách đơn hàng
  const fetchOrders = async () => {
    try {
      orders.value = await $fetch("http://localhost:3001/api/orders");
    } catch (error) {
      console.error("Lỗi khi lấy danh sách đơn hàng:", error);
    }
  };
  
  // Xem chi tiết đơn hàng
  const viewOrderDetails = (order) => {
    router.push(`/admin/order/details/${order.id}`);
  };
  
  // Xóa đơn hàng
  const deleteOrder = async (id) => {
    const result = await Swal.fire({
      title: "Xác nhận xóa",
      text: "Bạn có chắc chắn muốn xóa đơn hàng này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });
  
    if (result.isConfirmed) {
      try {
        await $fetch(`http://localhost:3001/api/orders/${id}`, { method: "DELETE" });
        Swal.fire("Đã xóa!", "Đơn hàng đã được xóa thành công.", "success");
        fetchOrders();
      } catch (error) {
        Swal.fire("Lỗi!", "Không thể xóa đơn hàng.", "error");
      }
    }
  };
  
  // Lọc đơn hàng dựa trên từ khóa tìm kiếm
  const filteredOrders = computed(() =>
    Array.isArray(orders.value)
      ? orders.value.filter((order) =>
          order.code.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      : []
  );
  
  onMounted(() => {
    fetchOrders();
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
  