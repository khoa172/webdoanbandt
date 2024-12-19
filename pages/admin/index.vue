<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center">Quản Lý Khách Hàng</h1>
    
    <!-- Tìm kiếm khách hàng -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <input
        type="text"
        class="form-control w-50"
        placeholder="Tìm kiếm khách hàng..."
        v-model="searchQuery"
      />
    </div>

    <!-- Bảng khách hàng -->
    <CustomerTable
      :customers="filteredCustomers"
      @edit="editCustomer"
      @delete="deleteCustomer"
    />
  </div>
</template>


<script setup>
definePageMeta({
  layout: 'admin',
});

import { ref, onMounted, computed } from 'vue';
import CustomerTable from '~/components/CustomerTable.vue';
import { useRouter } from 'vue-router';
import Swal from 'sweetalert2';

const customers = ref([]);
const searchQuery = ref(''); // Từ khóa tìm kiếm
const router = useRouter();
const { public: { apiBase } } = useRuntimeConfig();

// Lấy danh sách khách hàng
const fetchCustomers = async () => {
  try {
    customers.value = await $fetch(`${apiBase}/api/customers`);
  } catch (error) {
    console.error('Lỗi khi lấy danh sách khách hàng:', error);
  }
};

// Lọc khách hàng theo từ khóa tìm kiếm
const filteredCustomers = computed(() => {
  return customers.value.filter((customer) =>
    customer.fullname?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Xóa khách hàng
const deleteCustomer = async (id) => {
  const result = await Swal.fire({
    title: 'Xác nhận xóa',
    text: "Bạn có chắc chắn muốn xóa khách hàng này? Hành động này không thể hoàn tác!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xóa',
    cancelButtonText: 'Hủy',
  });

  if (!result.isConfirmed) {
    return; // Người dùng chọn "Hủy"
  }

  try {
    await $fetch(`${apiBase}/api/customers/${id}`, { method: 'DELETE' });
    Swal.fire('Đã xóa!', 'Khách hàng đã được xóa thành công.', 'success');
    fetchCustomers(); // Refresh danh sách khách hàng
  } catch (error) {
    console.error('Lỗi khi xóa khách hàng:', error);
    Swal.fire('Lỗi!', 'Không thể xóa khách hàng. Vui lòng thử lại.', 'error');
  }
};

// Sửa thông tin khách hàng
const editCustomer = (customer) => {
  router.push({
    path: '/customer/form',
    query: {
      id: customer.id,
      customer: encodeURIComponent(JSON.stringify(customer)),
    },
  });
};

onMounted(() => {
  fetchCustomers();
});
</script>


