<template>
  <div class="container mt-5">
    <div class="card shadow-lg">
      <div class="card-header bg-primary text-white text-center">
        <h3>Chi Tiết Đơn Hàng</h3>
      </div>
      <div v-if="!order" class="card-body text-center text-muted">
        <p class="fs-5">Không tìm thấy thông tin đơn hàng.</p>
      </div>
      <div v-else class="card-body">
        <!-- Thông tin đơn hàng -->
        <div class="mb-4">
          <h6 class="text-secondary fw-bold">Thông Tin Đơn Hàng</h6>
          <hr />
          <p class="mb-1"><strong>Mã Đơn Hàng:</strong> {{ order.code }}</p>
          <p class="mb-1"><strong>Ngày Tạo:</strong> {{ order.create_date }}</p>
          <p class="mb-1">
            <strong>Trạng Thái:</strong>
            <span :class="statusClass(order.status)">
              {{ order.status }}
            </span>
          </p>
          <p class="mb-1">
            <strong>Phương Thức Thanh Toán:</strong> {{ order.payment_method }}
          </p>
          <p class="mb-1"><strong>Địa Chỉ Giao Hàng:</strong> {{ order.customer_address }}</p>
          <p class="mb-1"><strong>Ghi Chú:</strong> {{ order.note || "Không có" }}</p>
        </div>

        <!-- Danh sách sản phẩm -->
        <div class="mb-4">
          <h6 class="text-secondary fw-bold">Danh Sách Sản Phẩm</h6>
          <hr />
          <table class="table table-hover">
            <thead class="table-dark">
              <tr>
                <th class="text-center">Tên Sản Phẩm</th>
                <th class="text-center">Số Lượng</th>
                <th class="text-center">Đơn Giá</th>
                <th class="text-center">Tổng</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in order.items" :key="index">
                <td>{{ item.name }}</td>
                <td class="text-center">{{ item.quantity }}</td>
                <td class="text-end">{{ formatPrice(item.price / item.quantity) }}</td>
                <td class="text-end">{{ formatPrice(item.price) }}</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-end fw-bold">Tổng Thanh Toán:</td>
                <td class="text-end fw-bold">{{ formatPrice(order.total_price) }}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <!-- Nút quay lại và hủy đơn hàng (nếu khả dụng) -->
        <div class="d-flex justify-content-end gap-2">
          <button class="btn btn-secondary" @click="goBack">
            Quay Lại
          </button>
          <button
            class="btn btn-danger"
            v-if="order.status === 'Chờ xác nhận'"
            @click="cancelOrder"
          >
            Hủy Đơn Hàng
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";

const route = useRoute();
const router = useRouter();
const order = ref(null);

const loadOrderDetails = async () => {
  const { id } = route.params;
  try {
    const response = await fetch(`http://localhost:3001/api/orders/${id}`);
    if (response.ok) {
      order.value = await response.json();
    } else {
      throw new Error("Không thể tải chi tiết đơn hàng.");
    }
  } catch (error) {
    console.error(error.message);
  }
};

const goBack = () => {
  router.back();
};

onMounted(() => {
  loadOrderDetails();
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const statusClass = (status) => {
  switch (status) {
    case "Thành công":
      return "text-success fw-bold";
    case "Chờ xác nhận":
      return "text-warning fw-bold";
    case "Hủy":
      return "text-danger fw-bold";
    default:
      return "text-muted";
  }
};

const cancelOrder = async () => {
  const { id } = route.params;
  try {
    const response = await fetch(`http://localhost:3001/api/orders/${id}/cancel`, {
      method: "PUT",
    });
    if (response.ok) {
      Swal.fire("Thành công", "Đơn hàng đã được hủy", "success");
      await loadOrderDetails(); // Tải lại thông tin đơn hàng (để cập nhật trạng thái)
    } else {
      const errData = await response.json();
      Swal.fire("Lỗi", errData.message || "Không thể hủy đơn hàng", "error");
    }
  } catch (error) {
    console.error(error.message);
    Swal.fire("Lỗi", "Đã xảy ra lỗi khi hủy đơn hàng", "error");
  }
};
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  font-family: "Arial", sans-serif;
}

.card-header h3 {
  font-size: 1.5rem;
  margin: 0;
}

.card-body p {
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
}

.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}

.text-secondary {
  color: #6c757d;
}

.text-muted {
  color: #adb5bd;
}

button {
  font-size: 0.875rem;
  padding: 0.5rem 1.5rem;
}
</style>
