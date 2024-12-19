<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <button class="btn btn-secondary" @click="goBack">
        <i class="fa fa-arrow-left me-2"></i>Quay lại
      </button>
      <h1 class="text-center mb-0">Chi Tiết Đơn Hàng</h1>
    </div>

    <div v-if="!order" class="text-center text-muted mt-4">
      <p>Không tìm thấy thông tin đơn hàng.</p>
    </div>
    <div v-else>
      <div class="order-info mb-4">
        <h3>Mã Đơn Hàng: <strong>{{ order.code }}</strong></h3>
        <p>Ngày Tạo: {{ order.create_date }}</p>
        <p>Trạng Thái: 
          <span :class="['badge', getStatusClass(order.status)]">
            {{ order.status }}
          </span>
        </p>
        <p>Tên Khách Hàng: {{ order.customer_name }}</p>
        <p>Email: {{ order.customer_email }}</p>
        <p>Số Điện Thoại: {{ order.customer_phone }}</p>
        <p>Địa Chỉ: {{ order.customer_address }}</p>

        <!-- Hành động dựa trên trạng thái đơn hàng -->
        <div v-if="order.status === 'Chờ xác nhận'">
          <button class="btn btn-success" @click="confirmOrder">Xác nhận Đơn Hàng</button>
          <button class="btn btn-danger" @click="cancelOrder">Hủy Đơn Hàng</button>
        </div>
        <div v-else-if="order.status === 'Thành công'">
          <button class="btn btn-primary" @click="markAsShipping">Đánh dấu Đang Giao Hàng</button>
        </div>
        <div v-else-if="order.status === 'Đang giao hàng'">
          <button class="btn btn-success" @click="markAsDelivered">Hoàn tất Giao Hàng</button>
        </div>
      </div>

      <h4>Danh Sách Sản Phẩm</h4>
      <table class="table table-bordered table-striped">
        <thead class="table-dark">
          <tr>
            <th>#</th>
            <th>Tên Sản Phẩm</th>
            <th>Số Lượng</th>
            <th>Giá</th>
            <th>Thành Tiền</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in order.items" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ formatPrice(item.price / item.quantity) }}</td>
            <td>{{ formatPrice(item.price) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

  
<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const order = ref(null);

const fetchOrderDetails = async () => {
  const orderId = route.params.id;
  try {
    const response = await $fetch(`http://localhost:3001/api/orders/${orderId}`);
    order.value = response;
  } catch (error) {
    console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
  }
};

const confirmOrder = async () => {
  try {
    await $fetch(`http://localhost:3001/api/orders/${order.value.id}/confirm`, {
      method: 'PUT'
    });
    order.value.status = 'Thành công';
  } catch (error) {
    console.error('Lỗi khi xác nhận đơn hàng:', error);
  }
};

const cancelOrder = async () => {
  try {
    await $fetch(`http://localhost:3001/api/orders/${order.value.id}/cancel`, {
      method: 'PUT'
    });
    order.value.status = 'Hủy';
  } catch (error) {
    console.error('Lỗi khi hủy đơn hàng:', error);
  }
};

const markAsShipping = async () => {
  try {
    await $fetch(`http://localhost:3001/api/orders/${order.value.id}/shipping`, {
      method: 'PUT'
    });
    order.value.status = 'Đang giao hàng';
  } catch (error) {
    console.error('Lỗi khi đánh dấu đang giao hàng:', error);
  }
};

const markAsDelivered = async () => {
  try {
    await $fetch(`http://localhost:3001/api/orders/${order.value.id}/delivered`, {
      method: 'PUT'
    });
    order.value.status = 'Hoàn tất';
  } catch (error) {
    console.error('Lỗi khi hoàn tất giao hàng:', error);
  }
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const getStatusClass = (status) => {
  switch (status) {
    case "Thành công":
      return "bg-success";
    case "Chờ xác nhận":
      return "bg-warning text-dark";
    case "Hủy":
      return "bg-danger";
    case "Đang giao hàng":
      return "bg-info text-dark";
    case "Hoàn tất":
      return "bg-primary";
    default:
      return "bg-secondary";
  }
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  fetchOrderDetails();
});
</script>
<style scoped>
.container {
  max-width: 900px;
}

.order-info {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.badge {
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
}

.table {
  margin-top: 20px;
}

.btn {
  margin-right: 10px;
}
</style>

  