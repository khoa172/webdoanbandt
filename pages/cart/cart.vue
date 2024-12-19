<template>
  <div class="container mt-5">
    <div class="d-flex align-items-center justify-content-center mb-4">
      <h2 class="fw-bold text-dark mb-0">
        <i class="bi bi-cart-check-fill me-2 text-success"></i>Giỏ Hàng
      </h2>
    </div>

    <!-- Nếu giỏ hàng trống -->
    <div v-if="cartItems.length === 0" class="text-center py-5">
      <i class="bi bi-cart-x fs-1 text-muted"></i>
      <p class="fs-5 text-muted mt-3">Giỏ hàng của bạn hiện tại trống.</p>
      <router-link to="/" class="btn btn-outline-primary mt-3">
        Tiếp tục mua sắm
      </router-link>
    </div>

    <!-- Nếu giỏ hàng có sản phẩm -->
    <div v-else>
      <div class="cart-list">
        <div
          class="cart-item row align-items-center mb-3 p-3 rounded"
          v-for="item in cartItems"
          :key="item.id"
          :class="{ 'selected-item': selectedItems.includes(item) }"
        >
          <!-- Cột Checkbox -->
          <div class="col-auto text-center">
            <input
              type="checkbox"
              v-model="selectedItems"
              :value="item"
              class="form-check-input"
              style="transform: scale(1.2); cursor: pointer;"
            />
          </div>

          <!-- Cột Ảnh sản phẩm và tên (điều hướng đến trang chi tiết sản phẩm) -->
          <div
            class="col-6 d-flex align-items-center product-info"
            @click="goToDetail(item.id)"
            style="cursor: pointer;"
          >
            <img
              :src="item.image"
              alt="product image"
              class="img-fluid rounded shadow-sm me-3"
              style="max-width: 90px; max-height: 90px; object-fit: cover;"
            />
            <div>
              <h5 class="mb-1 text-primary text-truncate" style="max-width: 200px;">
                {{ item.name }}
              </h5>
              <p class="text-muted mb-1">Mã SP: {{ item.code }}</p>
              <p class="text-muted mb-0">{{ item.price.toLocaleString() }} VND</p>
            </div>
          </div>

          <!-- Cột Điều chỉnh số lượng -->
          <div class="col-2 text-center">
            <div class="d-flex justify-content-center align-items-center">
              <button
                class="btn btn-outline-secondary btn-sm"
                @click="decreaseQuantity(item.id)"
              >
                -
              </button>
              <span class="mx-3">{{ item.quantity }}</span>
              <button
                class="btn btn-outline-secondary btn-sm"
                @click="increaseQuantity(item.id)"
              >
                +
              </button>
            </div>
          </div>

          <!-- Cột Tổng tiền -->
          <div class="col-2 text-center">
            <strong class="text-success fs-6">
              {{ (item.price * item.quantity).toLocaleString() }} VND
            </strong>
          </div>

          <!-- Cột Xóa -->
          <div class="col-auto text-center">
            <button
              class="btn btn-outline-danger btn-sm"
              @click="removeFromCart(item.id)"
            >
              <i class="bi bi-trash"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Phần Tổng tiền -->
      <div class="cart-summary mt-4 p-3 rounded bg-light border">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="mb-0 text-secondary">Tạm tính:</h5>
          <h5 class="mb-0 text-primary fs-4">
            {{ selectedTotalPrice.toLocaleString() }} VND
          </h5>
        </div>
        <div class="text-end">
          <button
            class="btn btn-success px-4 py-2 fs-6"
            :disabled="selectedItems.length === 0"
            @click="proceedToCheckout"
          >
            <i class="bi bi-cash-stack me-1"></i>Mua Ngay
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import Swal from "sweetalert2";

const router = useRouter();
const cartStore = useCartStore();

const cartItems = computed(() => cartStore.items);
const selectedItems = ref([]);

// Tính tổng giá trị của các sản phẩm đã chọn
const selectedTotalPrice = computed(() =>
  selectedItems.value.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0
  )
);

const goToDetail = (productId) => {
  router.push(`/product/${productId}`);
};

const removeFromCart = (productId) => {
  cartStore.removeFromCart(productId);
};

const decreaseQuantity = (productId) => {
  cartStore.decreaseQuantity(productId);
};

const increaseQuantity = (productId) => {
  cartStore.addToCart({ id: productId });
};

// Điều hướng đến trang checkout
const proceedToCheckout = () => {
  if (selectedItems.value.length > 0) {
    router.push({
      name: "checkout",
      query: {
        items: JSON.stringify(selectedItems.value),
      },
    });
  } else {
    Swal.fire({
      title: "Chưa chọn sản phẩm",
      text: "Vui lòng chọn ít nhất một sản phẩm để thanh toán.",
      icon: "warning",
    });
  }
};

onMounted(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    Swal.fire({
      title: "Bạn chưa đăng nhập",
      text: "Hãy đăng nhập để tiếp tục.",
      icon: "info",
      confirmButtonText: "Đăng nhập",
    }).then(() => {
      router.push("/auth");
    });
  }
});
</script>

<style scoped>
.cart-item {
  background-color: #fff;
  border: 1px solid #ddd;
  transition: transform 0.3s, box-shadow 0.3s;
}

.cart-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.cart-item.selected-item {
  background-color: #eaf5ff;
  border-color: #0d6efd;
}

.product-info:hover h5 {
  color: #0a58ca !important;
}

.cart-summary {
  background-color: #fafafa;
}

.cart-summary h5 {
  font-weight: 600;
}
</style>
