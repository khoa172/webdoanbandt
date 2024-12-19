import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    id_customer: null, // ID khách hàng
    total_num: 0, // Tổng số lượng sản phẩm
    total_price: 0, // Tổng giá trị giỏ hàng
    items: [], // Danh sách sản phẩm trong giỏ hàng
  }),

  actions: {
    /**
     * Khởi tạo thông tin khách hàng từ localStorage.
     */
    initializeCustomer() {
      try {
        const userData = localStorage.getItem("user");
        if (userData) {
          const user = JSON.parse(userData);
          if (user.id) this.id_customer = user.id;
        }
      } catch (error) {
        console.error("Lỗi khi tải thông tin khách hàng:", error);
      }
    },

    /**
     * Thêm sản phẩm vào giỏ hàng.
     * @param {Object} product - Sản phẩm cần thêm.
     */
    addToCart(product) {
      const existingItem = this.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.items.push({
          ...product,
          quantity: 1,
          image: product.image
            ? `http://localhost:3001/uploads/${product.image}`
            : `http://localhost:3001/uploads/${product.images?.[0] || "default.jpg"}`,
        });
      }
      this.updateCartInfo();
      this.saveCartToLocalStorage();
    },

    /**
     * Giảm số lượng sản phẩm.
     * @param {Number} productId - ID sản phẩm.
     */
    decreaseQuantity(productId) {
      const item = this.items.find((item) => item.id === productId);
      if (item) {
        item.quantity > 1
          ? (item.quantity -= 1)
          : this.removeFromCart(productId);
        this.updateCartInfo();
        this.saveCartToLocalStorage();
      }
    },

    /**
     * Xóa sản phẩm khỏi giỏ hàng.
     * @param {Number} productId - ID sản phẩm.
     */
    removeFromCart(productId) {
      this.items = this.items.filter((item) => item.id !== productId);
      this.updateCartInfo();
      this.saveCartToLocalStorage();
    },

    /**
     * Xóa toàn bộ giỏ hàng.
     */
    clearCart() {
      this.items = [];
      this.updateCartInfo();
      this.saveCartToLocalStorage();
    },

    /**
     * Cập nhật thông tin tổng số lượng và giá trị.
     */
    updateCartInfo() {
      this.total_num = this.items.reduce((total, item) => total + item.quantity, 0);
      this.total_price = this.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    /**
     * Lưu trạng thái giỏ hàng vào localStorage.
     */
    saveCartToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.items));
    },

    /**
     * Tải trạng thái giỏ hàng từ localStorage.
     */
    loadCartFromLocalStorage() {
      try {
        const savedCart = localStorage.getItem("cart");
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart)) {
            this.items = parsedCart.map((item) => ({
              ...item,
              image: item.image || `http://localhost:3001/uploads/${item.image || "default.jpg"}`,
            }));
            this.updateCartInfo();
          } else {
            console.error("Dữ liệu giỏ hàng không hợp lệ:", parsedCart);
          }
        }
      } catch (error) {
        console.error("Lỗi khi tải giỏ hàng:", error);
      }
    },
  },
});
