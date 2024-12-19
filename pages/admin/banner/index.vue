<template>
  <div class="container mt-5">
    <h2 class="mb-4 fw-bold">Quản Lý Banner</h2>

    <!-- Thêm banner -->
    <div class="card mb-4">
      <div class="card-header bg-light">
        <h5 class="mb-0 fw-bold">Thêm Banner</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="createBanner">
          <div class="mb-3">
            <label class="form-label fw-semibold">Chọn Ảnh</label>
            <input type="file" ref="fileInput" class="form-control" @change="onFileSelect" multiple required />
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Người Tạo</label>
            <input type="text" v-model="newUser" class="form-control" placeholder="Nhập tên người tạo..." required />
          </div>
          <button type="submit" class="btn btn-primary btn-sm">Thêm</button>
        </form>
      </div>
    </div>

    <!-- Danh sách banner -->
    <div class="card">
      <div class="card-header bg-light d-flex justify-content-between align-items-center">
        <h5 class="mb-0 fw-bold">Danh Sách Banner</h5>
        <button class="btn btn-outline-secondary btn-sm" @click="fetchSliders">
          <i class="bi bi-arrow-clockwise"></i> Tải Lại
        </button>
      </div>
      <div class="card-body p-0">
        <table class="table table-bordered table-striped table-hover align-middle mb-0">
          <thead class="table-dark">
            <tr>
              <th>ID</th>
              <th>Hình Ảnh</th>
              <th>Người Tạo</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(slider, index) in sliders" :key="slider.id">
              <td>{{ index + 1 }}</td>
              <td>
                <div v-for="img in slider.image" :key="img">
                  <img :src="`http://localhost:3001/uploads/${img}`" class="img-fluid mb-2" style="max-width: 150px" />
                </div>
              </td>
              <td>{{ slider.user }}</td>
              <td>
                <button class="btn btn-sm btn-warning me-2" @click="openEditModal(slider)">
                  <i class="bi bi-pencil-square"></i> Sửa
                </button>
                <button class="btn btn-sm btn-danger" @click="confirmDelete(slider.id)">
                  <i class="bi bi-trash"></i> Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
  definePageMeta({
    layout: "admin",
  });
import Swal from "sweetalert2";
import { ref, onMounted } from "vue";

const sliders = ref([]);
const newUser = ref("");
const newFiles = ref([]);
const fileInput = ref(null);

const fetchSliders = async () => {
  try {
    const { data, error } = await useFetch("/api/sliders", { baseURL: "http://localhost:3001" });
    if (error.value) throw new Error(error.value);
    sliders.value = data.value.map((slider) => ({
      ...slider,
      image: Array.isArray(slider.image) ? slider.image : [slider.image],
    }));
  } catch (error) {
    console.error("Lỗi khi lấy danh sách banner:", error);
  }
};

const onFileSelect = (e) => {
  newFiles.value = Array.from(e.target.files);
};

const createBanner = async () => {
  if (!newFiles.value.length || !newUser.value) return;
  try {
    const formData = new FormData();
    newFiles.value.forEach((file) => formData.append("image", file));
    formData.append("user", newUser.value);

    await useFetch("/api/sliders", {
      method: "POST",
      baseURL: "http://localhost:3001",
      body: formData,
    });

    newFiles.value = [];
    newUser.value = "";
    if (fileInput.value) fileInput.value.value = "";

    fetchSliders();
    Swal.fire("Thành công", "Banner đã được thêm!", "success");
  } catch (error) {
    console.error("Lỗi khi thêm banner:", error);
    Swal.fire("Thất bại", "Không thể thêm banner.", "error");
  }
};

const confirmDelete = async (id) => {
  const result = await Swal.fire({
    title: "Bạn có chắc chắn?",
    text: "Hành động này không thể hoàn tác!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Xóa",
    cancelButtonText: "Hủy",
  });

  if (result.isConfirmed) {
    try {
      await useFetch(`/api/sliders/${id}`, {
        method: "DELETE",
        baseURL: "http://localhost:3001",
      });
      fetchSliders();
      Swal.fire("Đã xóa!", "Banner đã được xóa.", "success");
    } catch (error) {
      console.error("Lỗi khi xóa banner:", error);
      Swal.fire("Thất bại", "Không thể xóa banner.", "error");
    }
  }
};

const openEditModal = (slider) => {
  let newImages = [];
  Swal.fire({
    title: "Sửa Banner",
    html: `
      <div>
        <label class="form-label">Người tạo:</label>
        <input type="text" id="editUser" class="swal2-input" value="${slider.user}">
      </div>
      <div>
        <label class="form-label">Hình ảnh hiện tại:</label>
        <div id="currentImages" style="display: flex; flex-wrap: wrap; gap: 10px;">
          ${slider.image
            .map(
              (img) =>
                `<div style="position: relative;">
                  <img src="http://localhost:3001/uploads/${img}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 5px;" />
                  <button type="button" class="btn btn-danger btn-sm delete-btn" style="position: absolute; top: 0; right: 0;" data-img="${img}">
                    &times;
                  </button>
                </div>`
            )
            .join("")}
        </div>
      </div>
      <div>
        <label class="form-label">Thêm ảnh mới:</label>
        <input type="file" id="editFiles" class="form-control" multiple>
      </div>
    `,
    didOpen: () => {
      document.querySelectorAll(".delete-btn").forEach((btn) =>
        btn.addEventListener("click", function () {
          const img = this.getAttribute("data-img");
          const parent = this.parentElement;
          parent.remove();
        })
      );
    },
    preConfirm: () => {
      const user = document.getElementById("editUser").value;
      const files = document.getElementById("editFiles").files;
      const currentImages = Array.from(
        document.querySelectorAll("#currentImages img")
      ).map((img) => img.src.split("/").pop());
      newImages = Array.from(files);
      return { user, currentImages };
    },
  }).then(async (result) => {
    if (result.isConfirmed) {
      await updateBanner(slider.id, result.value.user, newImages, result.value.currentImages);
    }
  });
};


const updateBanner = async (id, user, newFiles, currentImages) => {
  if (!id || !user) return;
  try {
    const formData = new FormData();
    formData.append("user", user);
    currentImages.forEach((img) => formData.append("currentImages", img));
    newFiles.forEach((file) => formData.append("image", file));

    await useFetch(`/api/sliders/${id}`, {
      method: "PUT",
      baseURL: "http://localhost:3001",
      body: formData,
    });

    fetchSliders();
    Swal.fire("Thành công", "Banner đã được cập nhật!", "success");
  } catch (error) {
    console.error("Lỗi khi cập nhật banner:", error);
    Swal.fire("Thất bại", "Không thể cập nhật banner.", "error");
  }
};

onMounted(fetchSliders);
</script>

<style scoped>
.container {
  max-width: 900px;
}
.img-fluid {
  border-radius: 5px;
}
</style>
