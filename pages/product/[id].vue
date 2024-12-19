<template>
  <div class="container mt-5">
    <div v-if="product" class="card shadow-lg border-0 p-3">
      <div class="row g-4">

        <!-- Cột Hình ảnh sản phẩm -->
        <div class="col-md-6">
          <div v-if="product.images && product.images.length > 1" id="productCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-inner rounded shadow-sm">
              <div
                v-for="(img, index) in product.images"
                :key="index"
                class="carousel-item"
                :class="{ active: index === 0 }"
              >
                <img
                  :src="`http://localhost:3001/uploads/${img}`"
                  class="d-block w-100"
                  alt="Product Image"
                  style="object-fit: cover; max-height: 400px;"
                />
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
          </div>

          <div v-else class="text-center">
            <img
              :src="product.images && product.images[0] ? `http://localhost:3001/uploads/${product.images[0]}` : '/path/to/default-image.jpg'"
              class="img-fluid rounded shadow-sm"
              alt="Product Image"
              style="max-height: 400px; object-fit: cover;"
            />
          </div>
        </div>

        <!-- Cột Thông tin sản phẩm -->
        <div class="col-md-6">
          <div class="card-body h-100 d-flex flex-column">
            <!-- Brand và Category (nếu có) -->
            <div class="d-flex align-items-center mb-2">
              <span v-if="product.brand_name" class="badge bg-info text-dark me-2">
                <i class="bi bi-tags-fill me-1"></i>{{ product.brand_name }}
              </span>
              <span v-if="product.category_name" class="badge bg-secondary">
                <i class="bi bi-list-ul me-1"></i>{{ product.category_name }}
              </span>
            </div>

            <h2 class="card-title fw-bold text-primary">{{ product.name }}</h2>
            <h4 class="card-subtitle mb-3 text-danger">
              {{ formatPrice(product.price) }}
            </h4>
            <p class="card-text text-muted" style="white-space: pre-line;">
              {{ product.description }}
            </p>

            <hr class="my-4" />

            <!-- Thông số kỹ thuật -->
            <h5 class="fw-bold mb-3">
              <i class="bi bi-info-circle me-1 text-primary"></i>Thông Số Kỹ Thuật
            </h5>
            <ul class="list-group list-group-flush mb-4">
              <li class="list-group-item d-flex justify-content-between">
                <strong>Màn Hình:</strong> <span>{{ product.screen }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>RAM:</strong> <span>{{ product.ram }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>CPU:</strong> <span>{{ product.cpu }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Bộ Nhớ:</strong> <span>{{ product.memory }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Hệ Điều Hành:</strong> <span>{{ product.operating_system }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Camera Trước:</strong> <span>{{ product.front_camera }}</span>
              </li>
              <li class="list-group-item d-flex justify-content-between">
                <strong>Camera Sau:</strong> <span>{{ product.rear_camera }}</span>
              </li>
            </ul>

            <div class="mt-auto">
              <div class="d-flex gap-3">
                <button class="btn btn-primary btn-lg flex-fill" @click="buyNow">
                  <i class="bi bi-lightning-fill me-1"></i>Mua Ngay
                </button>
                <button
                  class="btn btn-outline-secondary btn-lg flex-fill"
                  @click="addToCart"
                >
                  <i class="bi bi-cart-plus me-1"></i>Thêm Vào Giỏ Hàng
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Hiển thị thông báo khi đang tải -->
    <div v-else>
      <div class="text-center mt-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Đang tải...</span>
        </div>
        <p class="mt-3 text-muted">Đang tải thông tin sản phẩm...</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCartStore } from "@/stores/cart";
import Swal from "sweetalert2";

const cartStore = useCartStore();
const route = useRoute();
const router = useRouter();
const product = ref(null);

// Lấy chi tiết sản phẩm từ API
const fetchProductDetails = async () => {
  try {
    const productId = route.params.id;
    const response = await $fetch(`http://localhost:3001/api/products/${productId}`);
    product.value = {
      ...response,
      images: response.images ? JSON.parse(response.images) : [], // Xử lý mảng hình ảnh
    };
  } catch (error) {
    console.error("Lỗi khi tải chi tiết sản phẩm:", error);
  }
};

// Mua ngay
const buyNow = () => {
  if (product.value) {
    router.push({
      name: "checkout",
      query: {
        items: JSON.stringify([
          {
            id: product.value.id,
            name: product.value.name,
            price: product.value.price,
            quantity: 1,
            image: product.value.images && product.value.images[0] ? `http://localhost:3001/uploads/${product.value.images[0]}` : "/path/to/default-image.jpg",
          },
        ]),
      },
    });
  }
};

// Thêm vào giỏ hàng
const addToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value);
    Swal.fire({
      icon: "success",
      title: "Đã thêm vào giỏ hàng!",
      text: `${product.value.name} đã được thêm vào giỏ hàng của bạn.`,
      showConfirmButton: false,
      timer: 2000,
    });
  }
};

// Định dạng giá
const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

onMounted(fetchProductDetails);
</script>

<style scoped>
.card {
  border-radius: 10px;
}

.badge {
  font-size: 0.85rem;
}

.card-title {
  font-size: 1.8rem;
  line-height: 1.2;
}

.card-subtitle {
  font-size: 1.5rem;
  font-weight: bold;
}

.card-text {
  font-size: 1rem;
  line-height: 1.5;
}

.list-group-item {
  font-size: 0.95rem;
}

.spinner-border {
  width: 3rem;
  height: 3rem;
}
</style>
