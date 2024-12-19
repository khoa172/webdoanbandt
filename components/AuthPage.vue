<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <LoginForm v-if="currentForm === 'login'" @switchToRegister="showRegisterForm" />
              <RegisterForm v-else @switchToLogin="showLoginForm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import LoginForm from './LoginForm.vue';
  import RegisterForm from './RegisterForm.vue';
  
  const currentForm = ref('login');
  
  const showRegisterForm = () => {
    currentForm.value = 'register';
  };
  
  const showLoginForm = () => {
    currentForm.value = 'login';
  };
  </script>
  
  <style scoped>
  .container {
    margin-top: 100px;
  }
  .card {
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  </style>
  