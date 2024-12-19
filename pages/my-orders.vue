<template>
  <div class="container mt-5">
    <div class="card shadow border-0">
      <div class="card-header bg-light text-center py-3">
        <h2 class="mb-0 fw-bold text-primary">
          <i class="bi bi-bag-check-fill me-2 text-success"></i>Đơn Hàng Của Tôi
        </h2>
      </div>
      <div class="card-body p-4">
        <!-- Hiển thị spinner khi đang tải -->
        <div v-if="isLoading" class="d-flex justify-content-center my-5">
          <div class="spinner-border text-primary" role="status" style="width: 3rem; height: 3rem;">
            <span class="visually-hidden">Đang tải...</span>
          </div>
          <p class="ms-3 my-auto text-muted">Đang tải danh sách đơn hàng...</p>
        </div>
        
        <!-- Không có đơn hàng -->
        <div v-else-if="orders.length === 0" class="text-center text-muted py-5">
          <i class="bi bi-emoji-frown fs-1"></i>
          <p class="fs-5 mt-3">Bạn chưa có đơn hàng nào.</p>
          <NuxtLink to="/" class="btn btn-outline-primary btn-sm mt-2">
            <i class="bi bi-shop me-1"></i> Tiếp tục mua sắm
          </NuxtLink>
        </div>
        
        <!-- Danh sách đơn hàng -->
        <div v-else>
          <div class="table-responsive">
            <table class="table table-bordered table-hover table-striped align-middle">
              <thead class="table-dark">
                <tr class="text-center">
                  <th>Mã Đơn Hàng</th>
                  <th>Ngày Tạo</th>
                  <th>Tổng Tiền</th>
                  <th>Trạng Thái</th>
                  <th>Hành Động</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in orders" :key="order.id" class="text-center">
                  <td class="fw-bold text-primary">{{ order.code }}</td>
                  <td>{{ formatDate(order.create_date) }}</td>
                  <td class="text-danger fw-semibold">{{ formatPrice(order.total_price) }}</td>
                  <td>
                    <span :class="['badge', getStatusClass(order.status)]">{{ order.status }}</span>
                  </td>
                  <td>
                    <NuxtLink :to="`/order/${order.id}`" class="btn btn-sm btn-primary d-inline-flex align-items-center">
                      <i class="bi bi-eye me-1"></i>Xem Chi Tiết
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="card-footer text-center bg-light">
        <NuxtLink to="/" class="btn btn-outline-secondary btn-sm">
          <i class="bi bi-arrow-left me-1"></i>Quay về Trang Chủ
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const orders = ref([]);
const isLoading = ref(true);
const router = useRouter();

const loadOrders = async () => {
  const userId = localStorage.getItem('userId'); 
  if (!userId) {
    // Nếu chưa đăng nhập, chuyển hướng tới trang đăng nhập
    router.push('/auth');
    return;
  }

  try {
    const response = await fetch(`http://localhost:3001/api/orders/user/${userId}`);
    if (response.ok) {
      orders.value = await response.json();
    } else if (response.status === 404) {
      orders.value = [];
    } else {
      throw new Error('Không thể tải danh sách đơn hàng');
    }
  } catch (error) {
    console.error('Lỗi:', error.message);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  loadOrders();
});

const formatPrice = (price) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr.replace(' ', 'T'));
  return date.toLocaleString('vi-VN', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit'
  });
};

const getStatusClass = (status) => {
  switch (status) {
    case "Thành công":
      return "bg-success text-light";
    case "Chờ xác nhận":
      return "bg-warning text-dark";
    case "Hủy":
      return "bg-danger text-light";
    case "Đang giao hàng":
      return "bg-info text-dark";
    case "Hoàn tất":
      return "bg-primary text-light";
    default:
      return "bg-secondary text-light";
  }
};
</script>

<style scoped>
.container {
  max-width: 900px;
}

.card {
  border-radius: 10px;
}

.table thead th {
  font-size: 0.9rem;
}

.table tbody td {
  font-size: 0.85rem;
}

.badge {
  font-size: 0.8rem;
  padding: 0.4em 0.6em;
}
</style>
