<template>
  <table class="table table-hover table-bordered">
    <thead>
      <tr>
        <th>#</th>
        <th>Tên Đăng Nhập</th>
        <th>Họ Tên</th>
        <th>Email</th>
        <th>Số Điện Thoại</th>
        <th>Địa Chỉ</th>
        <th>Hành Động</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(customer, index) in customers" :key="customer.id">
        <td>{{ index + 1 }}</td>
        <td>{{ customer.username }}</td>
        <td>{{ customer.fullname }}</td>
        <td>{{ customer.email }}</td>
        <td>{{ customer.phone }}</td>
        <td>{{ customer.address }}</td>
        <td>
          <button class="btn btn-primary btn-sm me-2" @click="$emit('edit', customer)">Sửa</button>
          <button class="btn btn-danger btn-sm" @click="$emit('delete', customer.id)">Xóa</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
defineProps({
  customers: Array, // Danh sách khách hàng được truyền từ parent
});
defineEmits(['edit', 'delete']); // Emit sự kiện sửa và xóa
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
  color: #333;
}

input[type="text"] {
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

table thead {
  background-color: #f8f9fa;
  color: #495057;
}

table th,
table td {
  text-align: left;
  padding: 12px;
}

table tr:hover {
  background-color: #f1f1f1;
}

button {
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
}

button.btn-primary {
  background-color: #007bff;
  color: #fff;
}

button.btn-primary:hover {
  background-color: #0056b3;
}

button.btn-danger {
  background-color: #dc3545;
  color: #fff;
}

button.btn-danger:hover {
  background-color: #b21f2d;
}
</style>
