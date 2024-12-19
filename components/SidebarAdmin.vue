<template>
    <div class="d-flex flex-column flex-shrink-0 p-3 bg-light vh-100" style="width: 250px;">
      <a class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
        <span class="fs-4">Quản Lý</span>
      </a>
      <hr>
      <ul class="nav nav-pills flex-column mb-auto">
        <li class="nav-item">
          <nuxt-link to="/admin" class="nav-link" exact-active-class="active">
            Quản Lý Khách Hàng
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/admin/product" class="nav-link" exact-active-class="active">
            Quản Lý Sản Phẩm
          </nuxt-link>
        </li>
        <li>
        <nuxt-link to="/admin/product/brandAndCategory" class="nav-link" exact-active-class="active">
          Quản Lý Thương Hiệu và Danh Mục
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/admin/order" class="nav-link" exact-active-class="active">
          Quản Lý Đơn Hàng
        </nuxt-link>
      </li>
      <li>
        <nuxt-link to="/admin/banner" class="nav-link" exact-active-class="active">
          Quản Lý Banner
        </nuxt-link>
      </li>
      </ul>
    </div>
  </template>
  
  <style scoped>
  .active {
    font-weight: bold;
    color: #0d6efd;
  }
  </style>
  