<template>
  <div>
    <div class="header-area">
      <div class="container">
        <div class="row">
          <div class="col-md-9">
            <div class="user-menu">
              <ul>
                <li v-if="isLoggedIn">
                  <i class="fa fa-user"></i>
                  <NuxtLink to="/my-account">My Account</NuxtLink>
                </li>
                <li v-if="isLoggedIn">
                  <i class="fa fa-list"></i>
                  <NuxtLink to="/my-orders">My Orders</NuxtLink>
                </li>
                <li v-if="isLoggedIn && isAdmin">
                  <i class="fa fa-cogs"></i>
                  <NuxtLink to="/admin">Quản Lý</NuxtLink>
                </li>
                <li v-if="isLoggedIn">
                  <a href="#" @click.prevent="logout"><i class="fa fa-sign-out"></i> Logout</a>
                </li>
                <li v-else>
                  <i class="fa fa-user"></i>
                  <NuxtLink to="/auth">Login</NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="site-branding-area">
      <div class="container">
        <div class="row align-items-center">
          <!-- Phần logo -->
          <div class="col-sm-6">
            <div class="logo">
              <h1>
                <a href="/">
                  <img src="/images/logo.png" alt="logo" class="responsive-img" />
                </a>
              </h1>
            </div>
          </div>
          <!-- Phần shopping item -->
          <div class="col-sm-6">
            <NuxtLink to="/cart/cart">
              <div class="shopping-item shopping-link" >
                <i class="fa fa-shopping-cart cart-icon"></i> Giỏ hàng
                <span class="product-count">{{ cart.total_num }}</span>
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>





<script setup>
import { useCartStore } from '@/stores/cart'; // Import store
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const cart = useCartStore(); // Access cart store
const isLoggedIn = ref(false);
const isAdmin = ref(false); 
const user = ref({});
const router = useRouter();

onMounted(() => {
  const token = localStorage.getItem('token');
  const userData = localStorage.getItem('user');
  cart.loadCartFromLocalStorage(); // Tải giỏ hàng từ localStorage

  if (token && userData) {
    isLoggedIn.value = true;
    user.value = JSON.parse(userData);
    isAdmin.value = user.value.role === 'admin'; 
  }
});

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('cart'); // Xóa giỏ hàng khỏi localStorage
  isLoggedIn.value = false;
  isAdmin.value = false;
  cart.clearCart(); // Xóa giỏ hàng trong store
  router.push('/auth');
};
</script>



<style scoped>

ul li a, ul li i {
  text-decoration: none; /* Loại bỏ gạch chân */
  color: white; /* Đảm bảo các icon và liên kết cũng có màu trắng */
  font-weight: bold;
}

ul li a:hover, ul li i:hover {
  color: #23d25d; /* Màu khi hover để dễ nhận diện */
  text-decoration: none; /* Loại bỏ gạch chân */
}
.header-area a {
  color: #f5f2f2;
}
.user-menu ul {
  list-style: outside none none;
  margin: 0;
  padding: 0;
}
.user-menu li {
  display: inline-flex;
  align-items: center; /* Căn chỉnh icon và văn bản theo chiều dọc */
  margin-right: 10px; /* Nếu muốn thêm khoảng cách giữa các mục */
}
.user-menu li a {
  display: block;
  font-size: 13px;
  margin-right: 5px;
  padding: 10px;
}
.user-menu li a i.fa {
  margin-right: 5px;
}
.header-right ul.list-inline {
  margin: 0;
  text-align: right;
}
.header-right ul.list-inline li a {
  display: block;
  padding: 9px;
}
.header-right ul.list-inline li ul a {
  padding: 5px 15px;
}
.header-right ul.list-inline li ul {
  border: medium none;
  border-radius: 0;
  left: 50%;
  margin-left: -50px;
  min-width: 100px;
  text-align: center;
}
.logo {
  width: 15%;
}
.logo h1 {
  font-size: 30px;
  margin: 20px 0;
  font-weight: 400;
}
.logo h1 a {
  color: #f4f1f1;
}
.logo h1 a:hover {
  text-decoration: none;
  opacity: .7;
}
.logo h1 a span {
  color: #ee5057;
}


/* ////////////// */
.shopping-item {
  border: 2px solid rgba(255, 0, 0, 0); /* Thêm border màu đỏ cho thẻ div */
  float: right;
  font-size: 17px; /* Giảm kích thước chữ "Giỏ hàng" */
  font-weight: bold;
  margin-top: 40px;
  padding: 10px;
  position: relative;
  border-radius: 25px; /* Thêm góc bo tròn cho thẻ */
}

.shopping-link {
  color: #f00 !important; /* Đổi màu chữ "Giỏ hàng" thành đỏ */
}

.shopping-link:hover {
  color: #d31818 !important; /* Đổi màu chữ thành trắng khi hover */
}

.shopping-item i.fa {
  color: #f00; /* Màu đỏ cho icon giỏ hàng */
  margin-left: 10px;
  font-size: 30px; /* Tăng kích thước của icon giỏ hàng */
}

.product-count {
  background-color: #f00; /* Màu đỏ cho vòng tròn số lượng */
  border-radius: 50%;
  color: #fff;
  display: inline-block;
  font-size: 10px;
  height: 20px;
  padding-top: 2px;
  position: absolute;
  right: -10px;
  text-align: center;
  top: -10px;
  width: 20px;
}

.shopping-item:hover {
  background-color: #e9b0b0; /* Màu nền khi hover */
}

.shopping-item:hover a {
  color: #fff; /* Đổi màu chữ thành trắng khi hover */
  text-decoration: none;
}

.shopping-item:hover .cart-amunt {
  color: #fff; /* Màu chữ trong phần cart-amunt khi hover */
}

.shopping-item:hover .product-count {
  background-color: #000; /* Màu nền của số lượng giỏ hàng khi hover */
}

/* ////////// */
.responsive-img {
  width: 100px; 
  height: auto;
}
.align-items-center {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.header-area {
  position: relative;
  background-image: url('/images/header.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px 0;
}

.header-area::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(197, 194, 194, 0); /* Màu phủ (đen, trong suốt) */
  z-index: 1;
}

.header-area .container {
  position: relative;
  z-index: 2; /* Đảm bảo nội dung hiển thị phía trên lớp phủ */
}
</style>
