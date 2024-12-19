<template>
  <div class="container mt-5">
    <!-- Phần Banner (Slider) trên cùng -->
    <div class="row mb-3" v-if="sliders.length > 0">
      <div class="col-12">
        <div id="topSlider" class="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
          <div class="carousel-inner">
            <div 
              v-for="(slider, index) in sliders" 
              :key="slider.id" 
              :class="['carousel-item', { active: index === 0 }]"
            >
              <img 
                :src="`http://localhost:3001/uploads/${slider.image[currentImageIndexes[index]]}`" 
                class="d-block w-100 rounded" 
                alt="Banner Image"
                style="object-fit:cover; height:200px;"
              >
            </div>
          </div>
          <!-- Nút chuyển banner -->
        </div>
      </div>
    </div>

    <!-- Thanh và nút lọc -->
    <div class="d-flex justify-content-between align-items-center mb-4">
     
      <button class="btn btn-outline-primary btn-sm" @click="toggleFilters">
        <i class="bi bi-funnel-fill me-1"></i>Lọc sản phẩm
      </button>
    </div>

    <div class="row g-4">
      <!-- Sidebar bộ lọc -->
      <div class="col-12 col-md-3" v-if="showFilters">
        <div class="card shadow-sm border-0">
          <div class="card-body p-3">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h5 class="fw-bold text-primary mb-0">
                <i class="bi bi-funnel-fill me-2"></i>Lọc sản phẩm
              </h5>
              <button class="btn btn-sm btn-light" @click="toggleFilters">
                <i class="bi bi-x"></i>
              </button>
            </div>

            <!-- Tìm kiếm -->
            <div class="mb-4">
              <label class="form-label fw-bold text-muted">
                <i class="bi bi-search me-1"></i>Tìm kiếm
              </label>
              <input
                type="text"
                class="form-control"
                placeholder="Nhập tên sản phẩm..."
                v-model="searchQuery"
              />
            </div>

            <!-- Sắp xếp -->
            <div class="mb-4">
              <label class="form-label fw-bold text-muted">
                <i class="bi bi-sort-alpha-down me-1"></i>Sắp xếp theo
              </label>
              <select class="form-select mb-2" v-model="sortBy">
                <option value="">Mặc định</option>
                <option value="name">Tên sản phẩm</option>
                <option value="price">Giá</option>
              </select>
              <select class="form-select" v-model="sortOrder">
                <option value="asc">Tăng dần</option>
                <option value="desc">Giảm dần</option>
              </select>
            </div>

            <!-- Lọc theo thương hiệu -->
            <div class="mb-4">
              <label class="form-label fw-bold text-muted">
                <i class="bi bi-tags-fill me-1"></i>Thương hiệu
              </label>
              <select class="form-select" v-model="selectedBrand">
                <option value="">Tất cả</option>
                <option
                  v-for="brand in brands"
                  :key="brand.id"
                  :value="brand.id"
                >
                  {{ brand.name }}
                </option>
              </select>
            </div>

            <!-- Lọc theo danh mục -->
            <div class="mb-4">
              <label class="form-label fw-bold text-muted">
                <i class="bi bi-list-ul me-1"></i>Danh mục
              </label>
              <select class="form-select" v-model="selectedCategory">
                <option value="">Tất cả</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>

            <!-- Lọc theo RAM -->
            <div>
              <label class="form-label fw-bold text-muted">
                <i class="bi bi-memory me-1"></i>Dung lượng RAM
              </label>
              <select class="form-select" v-model="selectedRam">
                <option value="">Tất cả</option>
                <option v-for="ram in ramOptions" :key="ram" :value="ram">
                  {{ ram }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Danh sách sản phẩm -->
      <div :class="showFilters ? 'col-md-9' : 'col-12'">
        <div class="card border-0 shadow-sm">
          <div class="card-header bg-light d-flex align-items-center justify-content-between">
            <h5 class="mb-0 fw-bold text-secondary" v-if="searchQuery || selectedBrand || selectedCategory || selectedRam || sortBy">
              <i class="bi bi-grid-3x3-gap-fill me-1"></i>Kết quả: {{ filteredProducts.length }} sản phẩm
            </h5>
            <!-- Gợi ý thêm phân trang hoặc sắp xếp nâng cao tại đây -->
          </div>
          <div class="card-body">
            <div class="row g-3">
              <div
                v-for="product in filteredProducts"
                :key="product.id"
                class="col-6 col-sm-4 col-md-3 col-lg-2"
              >
                <div class="card h-100 shadow-sm border-0 product-card">
                  <div class="p-3 text-center bg-light">
                    <img
                      :src="`http://localhost:3001/uploads/${product.image}`"
                      class="img-fluid"
                      alt="Product Image"
                      style="max-height: 150px; object-fit: contain;"
                    />
                  </div>
                  <div class="card-body d-flex flex-column">
                    <h6 class="card-title text-truncate mb-2 fw-bold">
                      {{ product.name }}
                    </h6>
                    <p class="card-text text-danger fw-bold mb-3">
                      {{ formatPrice(product.price) }}
                    </p>
                    <button
                      class="btn btn-primary btn-sm mt-auto product-card-button " 
                      @click="goToDetail(product.id)"
                    >
                      Xem Chi Tiết
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Thông báo khi không có sản phẩm -->
            <div v-if="filteredProducts.length === 0" class="text-center mt-5">
              <i class="bi bi-emoji-frown fs-1 text-muted"></i>
              <p class="text-muted mt-3">
                Không tìm thấy sản phẩm phù hợp.<br/>
                Hãy thử thay đổi tiêu chí lọc hoặc sắp xếp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const products = ref([]);
const brands = ref([]);
const categories = ref([]);
const sliders = ref([]); // Lưu danh sách banner từ API
const ramOptions = ref(["4 GB", "6 GB", "8 GB", "12 GB"]); 
const searchQuery = ref("");
const sortBy = ref("");
const sortOrder = ref("asc");
const selectedBrand = ref("");
const selectedCategory = ref("");
const selectedRam = ref("");
const showFilters = ref(false);

const router = useRouter();

const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

const fetchProducts = async () => {
  try {
    const response = await $fetch("http://localhost:3001/api/products");
    products.value = response.map((product) => ({
      ...product,
      image: JSON.parse(product.images || "[]")[0] || "placeholder.jpg",
    }));
  } catch (error) {
    console.error("Lỗi khi lấy danh sách sản phẩm:", error);
  }
};

const fetchBrandsAndCategories = async () => {
  try {
    brands.value = await $fetch("http://localhost:3001/api/brands");
    categories.value = await $fetch("http://localhost:3001/api/categories");
  } catch (error) {
    console.error("Lỗi khi lấy danh sách thương hiệu và danh mục:", error);
  }
};

// Lấy danh sách banner
const currentImageIndexes = ref([]); // Lưu vị trí ảnh hiện tại của từng slider

// Lấy danh sách banner
const fetchSliders = async () => {
  try {
    const data = await $fetch("http://localhost:3001/api/sliders");
    sliders.value = data.map((slider) => ({
      ...slider,
      image: Array.isArray(slider.image) ? slider.image : [slider.image],
    }));
    // Khởi tạo chỉ mục ảnh cho mỗi slider
    currentImageIndexes.value = sliders.value.map(() => 0);
    console.log(sliders.value);
    console.log("Sliders:", sliders.value);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách banner:", error);
  }
};

// Hàm tự động chuyển ảnh
const rotateImages = () => {
  setInterval(() => {
    currentImageIndexes.value = currentImageIndexes.value.map((currentIndex, sliderIndex) => {
      const totalImages = sliders.value[sliderIndex].image.length;
      return (currentIndex + 1) % totalImages; // Chuyển sang ảnh tiếp theo, quay lại đầu nếu hết
    });
  }, 3000); // Chuyển ảnh mỗi 3 giây
};


const filteredProducts = computed(() => {
  let filtered = [...products.value];

  if (searchQuery.value) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (selectedBrand.value) {
    filtered = filtered.filter((p) => p.id_brand === selectedBrand.value);
  }

  if (selectedCategory.value) {
    filtered = filtered.filter((p) => p.id_category === selectedCategory.value);
  }

  if (selectedRam.value) {
    filtered = filtered.filter((p) => p.ram === selectedRam.value);
  }

  if (sortBy.value) {
    filtered.sort((a, b) => {
      if (sortOrder.value === "asc") {
        return a[sortBy.value] > b[sortBy.value] ? 1 : -1;
      }
      return a[sortBy.value] < b[sortBy.value] ? 1 : -1;
    });
  }

  return filtered;
});

const goToDetail = (productId) => {
  router.push(`/product/${productId}`);
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

onMounted(async () => {
  await fetchProducts();
  await fetchBrandsAndCategories();
  await fetchSliders(); 
  rotateImages();// Lấy dữ liệu banner từ API
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}

.card {
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(4, 80, 151, 0.911);
}

.card img {
  border-radius: 10px;
}

.card-title {
  font-size: 0.9rem;
}

.card-text {
  font-size: 0.85rem;
}

.product-card .card-body {
  display: flex;
  flex-direction: column;
}

.form-label {
  font-size: 0.9rem;
}

.bi {
  vertical-align: -0.125em; 
}

.product-card-button {
  transition: background-color 0.3s, border-color 0.3s;
}

.product-card-button:hover {
  background-color: #3fe529; 
  border-color: #082f8b;
}

.product-card-button {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: inherit;
  display: block; 
  text-align: center;
}

@media (max-width: 576px) {
  .product-card-button {
    font-size: 0.85rem; 
    padding: 0.4rem 0.6rem; 
  }
}

</style>