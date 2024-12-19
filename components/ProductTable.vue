<template>
  <div>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Tên Sản Phẩm</th>
          <th>Giá</th>
          <th>Số Lượng</th> <!-- Thêm cột số lượng -->
          <th>Hình Ảnh</th>
          <th>Hành Động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.id">
          <td>{{ index + 1 }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.price.toLocaleString() }} VND</td>
          <td>{{ product.quantity }}</td> <!-- Hiển thị số lượng sản phẩm -->
          <td>
            <div v-if="product.images">
              <img
                v-for="(image, imgIndex) in JSON.parse(product.images)"
                :key="imgIndex"
                :src="`http://localhost:3001/uploads/${image}`"
                alt="Product Image"
                class="img-thumbnail me-2"
                style="width: 80px; height: auto;"
              />
            </div>
          </td>
          <td>
            <button class="btn btn-warning btn-sm me-2" @click="$emit('edit', product)">Sửa</button>
            <button class="btn btn-danger btn-sm" @click="$emit('delete', product.id)">Xóa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

  
  <script setup>
  defineProps(['products']);
  </script>
  