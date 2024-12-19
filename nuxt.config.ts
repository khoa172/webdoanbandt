import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-17',

  // Thêm Vuetify CSS và MDI Icons CSS vào
  css: [
    'bootstrap/dist/css/bootstrap.min.css',
    'vuetify/styles', // Thêm Vuetify styles
    '@mdi/font/css/materialdesignicons.css', // Thêm MDI icons
    'font-awesome/css/font-awesome.css',  // Thêm Font Awesome CSS
    "bootstrap-icons/font/bootstrap-icons.css"
  ],
  

  // Cấu hình build để Vuetify được biên dịch đúng
  build: {
    transpile: ['vuetify'], // Đảm bảo Vuetify được biên dịch
  },

  // Cấu hình Vite để sử dụng Vuetify plugin
  vite: {
    plugins: [vuetify()] // Thêm Vuetify plugin cho Vite
  },
  
  runtimeConfig: {
    public: {
      apiBase: 'http://localhost:3001',
    },
  },
  modules: ['@pinia/nuxt'],

  plugins: ["~/plugins/snow.js"],
});
