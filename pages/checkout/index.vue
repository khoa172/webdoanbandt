<template>
  <div class="container mt-5">
    <h2 class="text-center fw-bold mb-4">
      <i class="bi bi-credit-card-fill text-success me-2"></i>Thông Tin Thanh Toán
    </h2>

    <!-- Thông báo yêu cầu đăng nhập -->
    <div v-if="!customer.id" class="alert alert-warning text-center">
      Bạn cần <a href="/login" class="alert-link fw-semibold">đăng nhập</a> trước khi đặt hàng.
    </div>

    <div v-else>
      <!-- Thông tin sản phẩm -->
      <div class="product-summary mb-5">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-light border-0">
            <h4 class="mb-0 fw-bold text-primary">
              <i class="bi bi-cart-check me-2"></i>Thông tin sản phẩm
            </h4>
          </div>
          <div class="card-body p-0">
            <table class="table table-bordered text-center align-middle mb-0">
              <thead class="table-dark">
                <tr>
                  <th>Hình ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Giá</th>
                  <th>Số lượng</th>
                  <th>Tạm tính</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in selectedItems" :key="item.id">
                  <td>
                    <img
                      :src="item.image"
                      alt="Product Image"
                      class="img-thumbnail shadow-sm"
                      style="max-width: 70px; max-height: 70px;"
                    />
                  </td>
                  <td>{{ item.name }}</td>
                  <td>{{ item.price.toLocaleString() }} VND</td>
                  <td>{{ item.quantity }}</td>
                  <td class="fw-bold text-success">{{ (item.price * item.quantity).toLocaleString() }} VND</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Thông tin khách hàng -->
      <div class="customer-info mb-4">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-light border-0">
            <h4 class="mb-0 fw-bold text-primary">
              <i class="bi bi-person-badge me-2"></i>Thông tin khách hàng
            </h4>
          </div>
          <div class="card-body">
            <form @submit.prevent="submitOrder">
              <div class="row mb-3">
                <div class="col-md-6 mb-3 mb-md-0">
                  <label for="customerName" class="form-label fw-semibold">Họ và tên <span class="text-danger">*</span></label>
                  <input
                    type="text"
                    id="customerName"
                    v-model="customer.name"
                    class="form-control"
                    required
                    placeholder="Ví dụ: Nguyễn Văn A"
                  />
                </div>
                <div class="col-md-6">
                  <label for="customerPhone" class="form-label fw-semibold">Số điện thoại <span class="text-danger">*</span></label>
                  <input
                    type="text"
                    id="customerPhone"
                    v-model="customer.phone"
                    class="form-control"
                    required
                    @blur="validatePhone"
                    placeholder="Ví dụ: 0901234567"
                  />
                </div>
              </div>

              <div class="mb-3">
                <label for="customerEmail" class="form-label fw-semibold">Email <span class="text-danger">*</span></label>
                <input
                  type="email"
                  id="customerEmail"
                  v-model="customer.email"
                  class="form-control"
                  required
                  @blur="validateEmail"
                  placeholder="ví dụ: email@example.com"
                />
              </div>

              <hr class="my-4" />

              <h5 class="fw-bold text-secondary mb-3">
                <i class="bi bi-geo-alt-fill me-1 text-danger"></i>Địa chỉ giao hàng
              </h5>
              <div class="mb-3">
                <label for="province" class="form-label fw-semibold">Tỉnh/Thành phố <span class="text-danger">*</span></label>
                <select
                  id="province"
                  v-model="selectedProvince"
                  @change="fetchDistricts"
                  class="form-select"
                  required
                >
                  <option value="" disabled>Chọn Tỉnh/Thành phố</option>
                  <option
                    v-for="province in provinces"
                    :key="province.code"
                    :value="province.code"
                  >
                    {{ province.name }}
                  </option>
                </select>
              </div>
              <div class="mb-3" v-if="districts.length">
                <label for="district" class="form-label fw-semibold">Quận/Huyện <span class="text-danger">*</span></label>
                <select
                  id="district"
                  v-model="selectedDistrict"
                  @change="fetchWards"
                  class="form-select"
                  required
                >
                  <option value="" disabled>Chọn Quận/Huyện</option>
                  <option
                    v-for="district in districts"
                    :key="district.code"
                    :value="district.code"
                  >
                    {{ district.name }}
                  </option>
                </select>
              </div>
              <div class="mb-3" v-if="wards.length">
                <label for="ward" class="form-label fw-semibold">Phường/Xã <span class="text-danger">*</span></label>
                <select
                  id="ward"
                  v-model="selectedWard"
                  class="form-select"
                  required
                >
                  <option value="" disabled>Chọn Phường/Xã</option>
                  <option
                    v-for="ward in wards"
                    :key="ward.code"
                    :value="ward.code"
                  >
                    {{ ward.name }}
                  </option>
                </select>
              </div>

              <!-- Địa chỉ chi tiết -->
              <div class="mb-3">
                <label for="customerAddress" class="form-label fw-semibold">Địa chỉ chi tiết <span class="text-danger">*</span></label>
                <textarea
                  id="customerAddress"
                  v-model="customer.address"
                  class="form-control"
                  required
                  placeholder="Ví dụ: Số nhà 123, Đường ABC..."
                ></textarea>
              </div>

              <hr class="my-4" />

              <!-- Phương thức thanh toán -->
              <h5 class="fw-bold text-secondary mb-3">
                <i class="bi bi-cash-stack me-1 text-success"></i>Phương thức thanh toán
              </h5>
              <div class="mb-3">
                <div class="form-check mb-2">
                  <input
                    type="radio"
                    id="cod"
                    value="COD"
                    v-model="paymentMethod"
                    class="form-check-input"
                    required
                  />
                  <label for="cod" class="form-check-label fw-semibold">Thanh toán khi nhận hàng (COD)</label>
                </div>
               
                <div class="form-check">
                  <input
                    type="radio"
                    id="direct"
                    value="Direct"
                    v-model="paymentMethod"
                    class="form-check-input"
                    required
                  />
                  
                  <label for="direct" class="form-check-label fw-semibold">Thanh toán online</label>
                 
                </div>

              </div>

              <div class="mb-3">
                <label for="customerNote" class="form-label fw-semibold">Ghi chú</label>
                <textarea
                  id="customerNote"
                  v-model="customer.note"
                  class="form-control"
                  placeholder="Nhập ghi chú cho đơn hàng (nếu có)"
                ></textarea>
              </div>

              <hr class="my-4" />

              <div class="d-flex justify-content-between align-items-center">
                <strong class="text-primary fs-5">
                  Tổng tiền: {{ totalPrice.toLocaleString() }} VND
                </strong>
                <button class="btn btn-success px-5 py-2 fs-6">
                  <i class="bi bi-check2-circle me-1"></i>Xác nhận
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useCartStore } from "@/stores/cart";

const cartStore = useCartStore();
const route = useRoute();
const router = useRouter();
const selectedItems = ref([]);
const provinces = ref([]);
const districts = ref([]);
const wards = ref([]);
const selectedProvince = ref("");
const selectedDistrict = ref("");
const selectedWard = ref("");
const paymentMethod = ref("");

const customer = ref({
  id: null,
  name: "",
  phone: "",
  email: "",
  address: "",
});

const totalPrice = computed(() =>
  selectedItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
);

const validatePhone = () => {
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(customer.value.phone)) {
    Swal.fire("Lỗi", "Số điện thoại không hợp lệ.", "error");
  }
};

const validateEmail = () => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(customer.value.email)) {
    Swal.fire("Lỗi", "Email không hợp lệ.", "error");
  }
};

const fetchProvinces = async () => {
  try {
    const response = await fetch("https://provinces.open-api.vn/api/p/");
    provinces.value = await response.json();
  } catch (error) {
    console.error("Lỗi khi lấy danh sách tỉnh/thành phố:", error);
  }
};

const fetchDistricts = async () => {
  try {
    const response = await fetch(
      `https://provinces.open-api.vn/api/p/${selectedProvince.value}?depth=2`
    );
    const data = await response.json();
    districts.value = data.districts || [];
  } catch (error) {
    console.error("Lỗi khi lấy danh sách quận/huyện:", error);
  }
};

const fetchWards = async () => {
  try {
    const response = await fetch(
      `https://provinces.open-api.vn/api/d/${selectedDistrict.value}?depth=2`
    );
    const data = await response.json();
    wards.value = data.wards || [];
  } catch (error) {
    console.error("Lỗi khi lấy danh sách phường/xã:", error);
  }
};
const initiateMomoPayment = async () => {
  const orderId = `ORDER-${Date.now()}`; // Tạo mã đơn hàng duy nhất
  const orderInfo = "Thanh toán đơn hàng qua MoMo";
  const amount = totalPrice.value;

  if (!amount || amount <= 0) {
    Swal.fire("Lỗi", "Số tiền thanh toán không hợp lệ.", "error");
    return;
  }

  try {
    const response = await fetch("http://localhost:3001/api/momo/momo-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, orderInfo, amount }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Chi tiết lỗi:", errorData);
      throw new Error(errorData.message || "Không thể khởi tạo thanh toán MoMo");
    }

    const result = await response.json();

    // Chuyển hướng đến liên kết thanh toán MoMo
    if (result.payUrl) {
      window.location.href = result.payUrl;
    } else {
      Swal.fire("Lỗi", "Không nhận được liên kết thanh toán từ MoMo.", "error");
    }
  } catch (error) {
    console.error("Lỗi thanh toán MoMo:", error);
    Swal.fire("Lỗi", error.message || "Không thể khởi tạo thanh toán qua MoMo.", "error");
  }
};


const submitOrder = async () => {
  if (!paymentMethod.value) {
    Swal.fire("Lỗi", "Vui lòng chọn phương thức thanh toán.", "error");
    return;
  }

  if (paymentMethod.value === "Direct") {
    // Xử lý thanh toán qua MoMo
    await initiateMomoPayment();
  } else {
    // Xử lý COD hoặc các phương thức khác
    Swal.fire("Thành công", "Đơn hàng của bạn đã được xác nhận (COD).", "success");
  }


  const selectedProvinceName = provinces.value.find((p) => p.code === selectedProvince.value)?.name || "";
  const selectedDistrictName = districts.value.find((d) => d.code === selectedDistrict.value)?.name || "";
  const selectedWardName = wards.value.find((w) => w.code === selectedWard.value)?.name || "";

  // Gộp địa chỉ chi tiết với Tỉnh/Thành, Quận/Huyện, Phường/Xã
  const fullAddress = `${customer.value.address}, ${selectedWardName}, ${selectedDistrictName}, ${selectedProvinceName}`;

  const orderData = {
    customer: {
      id: customer.value.id,
      name: customer.value.name,
      phone: customer.value.phone,
      email: customer.value.email,
      address: fullAddress, // Lưu đầy đủ thông tin vào address
      note: customer.value.note || "",
    },
    items: selectedItems.value.map((item) => ({
      id: item.id,
      price: item.price,
      quantity: item.quantity,
    })),
    totalPrice: totalPrice.value,
    paymentMethod: paymentMethod.value,
    // Vẫn gửi riêng nếu cần xử lý phía backend
    selectedProvince: selectedProvinceName,
    selectedDistrict: selectedDistrictName,
    selectedWard: selectedWardName,
  };

  try {
    const response = await fetch("http://localhost:3001/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) throw new Error("Lỗi khi gửi đơn hàng");

    const result = await response.json();
    Swal.fire("Thành công", `Đơn hàng của bạn đã được tạo với mã: ${result.orderId}`, "success");

    selectedItems.value.forEach(item => {
      cartStore.removeFromCart(item.id);
    });

    router.push("/my-orders");
  } catch (error) {
    console.error("Lỗi khi gửi đơn hàng:", error);
    Swal.fire("Lỗi", "Đã xảy ra lỗi khi tạo đơn hàng.", "error");
  }
};



onMounted(async () => {
  const userId = localStorage.getItem("userId");
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
    return;
  }

  if (!userId) {
    Swal.fire({
      title: "Yêu cầu đăng nhập",
      text: "Bạn cần đăng nhập để tiếp tục thanh toán.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đăng nhập",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        router.push("/auth");
      } else {
        router.push("/cart");
      }
    });
    return;
  }

  customer.value.id = parseInt(userId, 10);

  const itemsQuery = route.query.items;
  if (itemsQuery) {
    try {
      selectedItems.value = JSON.parse(itemsQuery);
    } catch (error) {
      console.error("Lỗi khi giải mã dữ liệu sản phẩm:", error);
    }
  }

  await fetchProvinces();
});
</script>

<style scoped>
.container {
  max-width: 800px;
}
.card-header {
  font-size: 1.1rem;
}
.card {
  border-radius: 8px;
}
.table thead th {
  font-size: 0.9rem;
  font-weight: 700;
}
.table tbody td {
  font-size: 0.85rem;
}
.form-label {
  font-size: 0.9rem;
}
.form-select, .form-control {
  font-size: 0.9rem;
}
</style>
