import api from "./config";

export const ordersService = {
  async createOrder(orderData) {
    try {
      const response = await api.post("/user/orders", orderData);
      return response.data;
    } catch (error) {
      console.error("API: Error creating order:", error);
      throw error.response?.data || error.message;
    }
  },

  async getUserOrders(params = {}) {
    try {
      const response = await api.get("/user/orders", { params });
      return response.data;
    } catch (error) {
      console.error("API: Error fetching user orders:", error);
      throw error.response?.data || error.message;
    }
  },

  async getOrderById(orderId) {
    try {
      const response = await api.get(`/user/orders/${orderId}`);
      return response.data;
    } catch (error) {
      console.error("API: Error fetching order:", error);
      throw error.response?.data || error.message;
    }
  },

  async cancelOrder(orderId) {
    try {
      const response = await api.post(`/user/orders/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      console.error("API: Error canceling order:", error);
      throw error.response?.data || error.message;
    }
  },

  async getOrderStatus(orderId) {
    try {
      const response = await api.get(`/user/orders/${orderId}/status`);
      return response.data;
    } catch (error) {
      console.error("API: Error fetching order status:", error);
      throw error.response?.data || error.message;
    }
  },
};
