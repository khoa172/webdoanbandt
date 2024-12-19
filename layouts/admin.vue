<template>
    <div>
      <defaultHeader />
      <div class="d-flex">
        <!-- Sidebar -->
        <Sidebar />
        <!-- Nội dung động -->
        <div class="flex-grow-1 p-3">
          <NuxtPage />
        </div>
      </div>
      <defaultFooter />
    </div>
  </template>
  
  <script>
  import defaultHeader from '~/components/Header/adminHeader.vue';
  import defaultFooter from '~/components/Footer/defaultFooter.vue';
  import Sidebar from '~/components/SidebarAdmin.vue';
  
  export default {
    components: {
      defaultHeader,
      defaultFooter,
      Sidebar,
    },
  };
  </script>
  
  <style scoped>
  .d-flex {
    height: 100vh;
    overflow: hidden;
  }
  
  .flex-grow-1 {
    overflow-y: auto;
  }
  </style>
  