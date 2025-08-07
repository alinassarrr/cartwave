import api from "./config";

export const cartService = {
  async getCart() {
    try {
      const response = await api.get("/user/cart");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  async addToCart(productId, quantity = 1) {
    try {
      const response = await api.post("/user/cart/add", {
        product_id: productId,
        quantity: quantity,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  async updateQuantity(cartItemId, quantity) {
    try {
      const response = await api.put(`/user/cart/${cartItemId}/quantity`, {
        quantity: quantity,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  async removeFromCart(cartItemId) {
    try {
      const response = await api.delete(`/user/cart/${cartItemId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  async clearCart() {
    try {
      const response = await api.delete("/user/cart");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
