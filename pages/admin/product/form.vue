<template>
  <div class="container mt-5">
    <h1>{{ isEdit ? "Sửa Sản Phẩm" : "Thêm Sản Phẩm" }}</h1>
    <form @submit.prevent="handleSubmit">
      <!-- Thông tin sản phẩm -->
      <div class="mb-3">
        <label for="name" class="form-label">Tên Sản Phẩm</label>
        <input type="text" id="name" v-model="form.name" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="code" class="form-label">Mã Sản Phẩm</label>
        <input type="text" id="code" v-model="form.code" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="price" class="form-label">Giá</label>
        <input type="number" id="price" v-model="form.price" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="quantity" class="form-label">Số Lượng</label>
        <input type="number" id="quantity" v-model="form.quantity" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="status" class="form-label">Trạng Thái</label>
        <select id="status" v-model="form.status" class="form-control">
          <option value="còn hàng">Còn Hàng</option>
          <option value="hết hàng">Hết Hàng</option>
          <option value="hàng sắp về">Hàng Sắp Về</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="id_brand" class="form-label">Thương Hiệu</label>
        <select id="id_brand" v-model="form.id_brand" class="form-control" required>
          <option v-for="brand in brands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="id_category" class="form-label">Danh Mục</label>
        <select id="id_category" v-model="form.id_category" class="form-control" required>
          <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
        </select>
      </div>

      <!-- Các thông số kỹ thuật -->
      <div class="mb-3">
        <label for="screen" class="form-label">Màn Hình</label>
        <input type="text" id="screen" v-model="form.screen" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="ram" class="form-label">RAM</label>
        <select id="ram" v-model="form.ram" class="form-control" required>
          <option disabled value="">Chọn RAM</option>
          <option value="4 GB">4 GB</option>
          <option value="6 GB">6 GB</option>
          <option value="8 GB">8 GB</option>
          <option value="12 GB">12 GB</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="cpu" class="form-label">CPU</label>
        <input type="text" id="cpu" v-model="form.cpu" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="memory" class="form-label">Bộ Nhớ</label>
        <input type="text" id="memory" v-model="form.memory" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="operating_system" class="form-label">Hệ Điều Hành</label>
        <input type="text" id="operating_system" v-model="form.operating_system" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="front_camera" class="form-label">Camera Trước</label>
        <input type="text" id="front_camera" v-model="form.front_camera" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="rear_camera" class="form-label">Camera Sau</label>
        <input type="text" id="rear_camera" v-model="form.rear_camera" class="form-control" />
      </div>

      <div class="mb-3">
        <label for="description" class="form-label">Mô Tả</label>
        <textarea
          id="description"
          v-model="form.description"
          class="form-control"
          rows="4"
          placeholder="Nhập mô tả sản phẩm..."
        ></textarea>
      </div>
      <!-- Hình ảnh -->
      <div class="mb-3">
        <label for="images" class="form-label">Hình Ảnh</label>
        <input
          type="file"
          id="images"
          class="form-control"
          multiple
          accept="image/*"
          @change="handleFileChange"
        />
        <div class="mt-2" v-if="previewImages.length > 0">
          <div v-for="(image, index) in previewImages" :key="index" class="mb-2">
            <img :src="image" alt="Preview" class="img-thumbnail" style="width: 150px; height: auto;" />
          </div>
        </div>
        <div class="mt-2" v-if="isEdit && existingImages.length > 0">
          <p>Hình ảnh hiện tại:</p>
          <div v-for="(image, index) in existingImages" :key="index" class="mb-2">
            <img
              :src="`http://localhost:3001/uploads/${image}`"
              alt="Existing Image"
              class="img-thumbnail"
              style="width: 150px; height: auto;"
            />
          </div>
        </div>
      </div>

      <!-- Nút hành động -->
      <button type="submit" class="btn btn-success">{{ isEdit ? "Cập Nhật" : "Thêm" }}</button>
      <button type="button" class="btn btn-secondary" @click="goBack">Hủy</button>
    </form>
  </div>
</template>




  
<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2";

const router = useRouter();
const route = useRoute();

const isEdit = ref(false);
const form = ref({
  id_category: null,
  id_brand: null,
  name: "",
  code: "",
  price: 0,
  quantity: 0,
  status: "còn hàng",
  description: "",
  screen: "",
  ram: "",
  cpu: "",
  memory: "",
  operating_system: "",
  front_camera: "",
  rear_camera: "",
});
const brands = ref([]); // Danh sách thương hiệu
const categories = ref([]); // Danh sách danh mục
const previewImages = ref([]); // Hình ảnh được chọn
const existingImages = ref([]); // Hình ảnh hiện tại của sản phẩm
const files = ref([]); // File ảnh mới được chọn

// Lấy danh sách thương hiệu và danh mục
const fetchBrandsAndCategories = async () => {
  try {
    brands.value = await $fetch("http://localhost:3001/api/brands");
    categories.value = await $fetch("http://localhost:3001/api/categories");
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
    Swal.fire("Lỗi", "Không thể tải danh sách thương hiệu và danh mục", "error");
  }
};

// Xử lý khi người dùng chọn ảnh
const handleFileChange = (event) => {
  const selectedFiles = Array.from(event.target.files);
  files.value = selectedFiles;
  previewImages.value = selectedFiles.map((file) => URL.createObjectURL(file));
};

// Xử lý khi gửi form
const handleSubmit = async () => {
  const formData = new FormData();
  for (const key in form.value) {
    formData.append(key, form.value[key]);
  }
  files.value.forEach((file) => formData.append("images", file));

  try {
    const url = `http://localhost:3001/api/products${isEdit.value ? `/${form.value.id}` : ""}`;
    const method = isEdit.value ? "PUT" : "POST";
    await $fetch(url, { method, body: formData });
    Swal.fire("Thành công!", isEdit.value ? "Cập nhật thành công!" : "Thêm thành công!", "success");
    router.push("/admin/product");
  } catch (error) {
    Swal.fire("Lỗi!", "Không thể xử lý yêu cầu.", "error");
  }
};

// Xử lý khi quay lại
const goBack = () => {
  router.push("/admin/product");
};

// Xử lý khi tải trang
onMounted(async () => {
  await fetchBrandsAndCategories();
  if (route.query.id) {
    isEdit.value = true;
    const product = await $fetch(`http://localhost:3001/api/products/${route.query.id}`);
    form.value = { ...product };
    if (product.images) {
      existingImages.value = JSON.parse(product.images);
    }
  }
});
</script>


  