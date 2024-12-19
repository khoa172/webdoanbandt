<template>
  <div class="container mt-5">
    <div class="card shadow-sm">
      <div class="card-header bg-dark text-light text-center py-3">
        <h2 class="mb-0">
          <i class="fa-solid fa-circle-user me-2"></i>
          Thông Tin Tài Khoản
        </h2>
      </div>
      <div class="card-body p-4">
        <!-- Hiển thị thông tin -->
        <div v-if="!isEditing">
          <div class="mb-2">
            <strong class="text-muted">Tên Đăng Nhập:</strong>
            <span class="ms-2">{{ user.username }}</span>
          </div>
          <div class="mb-2">
            <strong class="text-muted">Họ và Tên:</strong>
            <span class="ms-2">{{ user.fullname }}</span>
          </div>
          <div class="mb-2">
            <strong class="text-muted">Email:</strong>
            <span class="ms-2">{{ user.mail }}</span>
          </div>
          <div class="mb-2">
            <strong class="text-muted">Số Điện Thoại:</strong>
            <span class="ms-2">{{ user.phone }}</span>
          </div>
          <div class="mb-2">
            <strong class="text-muted">Địa Chỉ:</strong>
            <span class="ms-2">{{ user.address }}</span>
          </div>
          <button class="btn btn-primary mt-4 w-100" @click="toggleEdit">
            <i class="fa-solid fa-pen-to-square me-1"></i> Sửa Thông Tin
          </button>
        </div>

        <!-- Form chỉnh sửa -->
        <div v-else>
          <form @submit.prevent="updateAccount">
            <div class="mb-3">
              <label for="fullname" class="form-label fw-bold">Họ và Tên <span class="text-danger">*</span></label>
              <input
                type="text"
                id="fullname"
                v-model="editForm.fullname"
                class="form-control"
                placeholder="Nhập họ và tên"
                required
              />
            </div>
            <div class="mb-3">
              <label for="mail" class="form-label fw-bold">Email <span class="text-danger">*</span></label>
              <input
                type="email"
                id="mail"
                v-model="editForm.mail"
                class="form-control"
                placeholder="Nhập địa chỉ email"
                required
              />
            </div>
            <div class="mb-3">
              <label for="phone" class="form-label fw-bold">Số Điện Thoại <span class="text-danger">*</span></label>
              <input
                type="tel"
                id="phone"
                v-model="editForm.phone"
                class="form-control"
                placeholder="Nhập số điện thoại"
                required
              />
            </div>
            <div class="mb-3">
              <label for="address" class="form-label fw-bold">Địa Chỉ <span class="text-danger">*</span></label>
              <input
                type="text"
                id="address"
                v-model="editForm.address"
                class="form-control"
                placeholder="Nhập địa chỉ"
                required
              />
            </div>
            <hr class="my-4">
            <p class="text-muted" style="font-size: 0.9rem;">
              Để cập nhật thông tin hoặc đổi mật khẩu, vui lòng nhập mật khẩu cũ để xác thực.
            </p>
            <div class="mb-3">
              <label for="old_password" class="form-label fw-bold">Mật Khẩu Cũ <span class="text-danger">*</span></label>
              <div class="input-group">
                <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                <input
                  type="password"
                  id="old_password"
                  v-model="editForm.old_password"
                  class="form-control"
                  placeholder="Nhập mật khẩu cũ"
                  required
                />
              </div>
            </div>
            <div class="mb-3">
              <label for="new_password" class="form-label fw-bold">Mật Khẩu Mới</label>
              <div class="input-group">
                <span class="input-group-text"><i class="fa-solid fa-key"></i></span>
                <input
                  type="password"
                  id="new_password"
                  v-model="editForm.new_password"
                  class="form-control"
                  placeholder="Nhập mật khẩu mới (nếu muốn thay đổi)"
                />
              </div>
              <small class="text-muted">
                Có thể để trống nếu bạn không muốn đổi mật khẩu.
              </small>
            </div>
            <div class="d-flex gap-2 mt-4">
              <button type="submit" class="btn btn-success w-100">
                <i class="fa-solid fa-floppy-disk me-1"></i> Cập Nhật
              </button>
              <button type="button" class="btn btn-secondary w-100" @click="toggleEdit">
                <i class="fa-solid fa-xmark me-1"></i> Hủy
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="card-footer text-center bg-light">
        <small class="text-muted">© 2024 - Thông Tin Tài Khoản</small>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useRuntimeConfig } from "#app";
import Swal from "sweetalert2";
import { useHead } from '#imports'

useHead({
  link: [
    {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css',
      integrity: 'sha512-Fo3rlrZj/k7ujTnHq6S7CWetVlG2nMD7pZy36R14jFRvCE5oROVFK3c4Pl3DyzwjD/fZqnJ4o6xzQf/+K/c5Rg==',
      crossorigin: 'anonymous',
      referrerpolicy: 'no-referrer'
    }
  ]
})

const user = ref({});
const editForm = ref({
  fullname: "",
  mail: "",
  phone: "",
  address: "",
  old_password: "",
  new_password: "",
});
const isEditing = ref(false);
const { public: { apiBase } } = useRuntimeConfig();
const router = useRouter();

// Lấy thông tin tài khoản
const fetchUserDetails = async () => {
  try {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData || !userData.id) {
      console.error("User ID không tồn tại trong localStorage.");
      router.push("/auth");
      return;
    }

    const endpoint = `${apiBase}/api/customers/${userData.id}`;
    const response = await $fetch(endpoint);
    user.value = response;
    editForm.value = { ...response, old_password: "", new_password: "" };
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng:", error);
  }
};

// Chuyển đổi giữa hiển thị và chỉnh sửa
const toggleEdit = () => {
  isEditing.value = !isEditing.value;
};

// Cập nhật thông tin tài khoản
const updateAccount = async () => {
  try {
    if (!editForm.value.old_password) {
      Swal.fire("Lỗi", "Vui lòng nhập mật khẩu cũ để xác nhận.", "error");
      return;
    }

    const endpoint = `${apiBase}/api/customers/${user.value.id}`;
    const response = await $fetch(endpoint, {
      method: "PUT",
      body: editForm.value,
    });

    if (response.message === "Mật khẩu cũ không đúng.") {
      Swal.fire("Lỗi", "Mật khẩu cũ không đúng.", "error");
      return;
    }

    Swal.fire("Thành công", "Thông tin tài khoản đã được cập nhật!", "success");
    isEditing.value = false;
    fetchUserDetails(); // Tải lại thông tin mới
  } catch (error) {
    console.error("Lỗi khi cập nhật tài khoản:", error);
    Swal.fire("Lỗi", "Không thể cập nhật tài khoản.", "error");
  }
};

// Lấy thông tin khi trang tải
onMounted(() => {
  fetchUserDetails();
});
</script>

<style scoped>
.container {
  max-width: 600px;
}
.card-header h2 {
  font-size: 1.4rem;
}
.card-body {
  font-size: 0.95rem;
}
</style>
