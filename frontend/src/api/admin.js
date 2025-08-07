import api from "./config";

export const adminService = {
  async getDashboardOverview() {
    try {
      const response = await api.get("/admin/dashboard/overview");
      return response.data;
    } catch (error) {
      console.error("API: Error fetching dashboard overview:", error);
      throw error.response?.data || error.message;
    }
  },

  async getRecentOrders() {
    try {
      const response = await api.get("/admin/dashboard/recent-orders");
      return response.data;
    } catch (error) {
      console.error("API: Error fetching recent orders:", error);
      throw error.response?.data || error.message;
    }
  },

  async getLowStockProducts() {
    try {
      const response = await api.get("/admin/dashboard/low-stock");
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("API: Error fetching low stock products:", error);
      throw error.response?.data || error.message;
    }
  },

  async getProductOverview() {
    try {
      const response = await api.get("/admin/products/overview");
      return response.data;
    } catch (error) {
      console.error("API: Error fetching product overview:", error);
      throw error.response?.data || error.message;
    }
  },

  async getRevenue(params = {}) {
    try {
      const response = await api.get("/admin/analytics/revenue", { params });
      return response.data;
    } catch (error) {
      console.error("API: Error fetching revenue analytics:", error);
      throw error.response?.data || error.message;
    }
  },

  async getOrdersPerHour(params = {}) {
    try {
      const response = await api.get("/admin/analytics/orders-per-hour", {
        params,
      });
      return response.data;
    } catch (error) {
      console.error("API: Error fetching orders per hour:", error);
      throw error.response?.data || error.message;
    }
  },

  async getProducts(params = {}) {
    try {
      const response = await api.get("/admin/products", { params });
      return response.data;
    } catch (error) {
      console.error("API: Error fetching admin products:", error);
      throw error.response?.data || error.message;
    }
  },

  async getProductById(id) {
    try {
      const response = await api.get(`/admin/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("API: Error fetching admin product:", error);
      throw error.response?.data || error.message;
    }
  },

  async createProduct(productData) {
    try {
      const response = await api.post("/admin/products", productData);
      return response.data;
    } catch (error) {
      console.error("API: Error creating product:", error);
      throw error.response?.data || error.message;
    }
  },

  async updateProduct(id, productData) {
    try {
      const response = await api.put(`/admin/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error("API: Error updating product:", error);
      throw error.response?.data || error.message;
    }
  },

  async deleteProduct(id) {
    try {
      const response = await api.delete(`/admin/products/${id}`);
      return response.data;
    } catch (error) {
      console.error("API: Error deleting product:", error);
      throw error.response?.data || error.message;
    }
  },

  async bulkDeleteProducts(productIds) {
    try {
      const response = await api.post("/admin/products/bulk-delete", {
        product_ids: productIds,
      });
      return response.data;
    } catch (error) {
      console.error("API: Error bulk deleting products:", error);
      throw error.response?.data || error.message;
    }
  },

  async getOrders(params = {}) {
    try {
      const response = await api.get("/admin/orders", { params });
      return response.data;
    } catch (error) {
      console.error("API: Error fetching admin orders:", error);
      throw error.response?.data || error.message;
    }
  },

  async getOrderSummary() {
    try {
      const response = await api.get("/admin/orders/summary");
      return response.data;
    } catch (error) {
      console.error("API: Error fetching order summary:", error);
      throw error.response?.data || error.message;
    }
  },

  async getOrderById(id) {
    try {
      const response = await api.get(`/admin/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error("API: Error fetching admin order:", error);
      throw error.response?.data || error.message;
    }
  },

  async updateOrderStatus(id, status) {
    try {
      const response = await api.put(`/admin/orders/${id}/status`, { status });
      return response.data;
    } catch (error) {
      console.error("API: Error updating order status:", error);
      throw error.response?.data || error.message;
    }
  },

  async getCustomers(params = {}) {
    try {
      const response = await api.get("/admin/customers", { params });
      return response.data;
    } catch (error) {
      console.error("API: Error fetching customers:", error);
      throw error.response?.data || error.message;
    }
  },

  async getCustomerById(id) {
    try {
      const response = await api.get(`/admin/customers/${id}`);
      return response.data;
    } catch (error) {
      console.error("API: Error fetching customer:", error);
      throw error.response?.data || error.message;
    }
  },

  async getNotifications(params = {}) {
    try {
      const response = await api.get("/admin/notifications", { params });
      return response.data;
    } catch (error) {
      console.error("API: Error fetching admin notifications:", error);
      throw error.response?.data || error.message;
    }
  },

  async createNotification(notificationData) {
    try {
      const response = await api.post("/admin/notifications", notificationData);
      return response.data;
    } catch (error) {
      console.error("API: Error creating notification:", error);
      throw error.response?.data || error.message;
    }
  },

  async updateNotification(id, notificationData) {
    try {
      const response = await api.put(
        `/admin/notifications/${id}`,
        notificationData
      );
      return response.data;
    } catch (error) {
      console.error("API: Error updating notification:", error);
      throw error.response?.data || error.message;
    }
  },

  async deleteNotification(id) {
    try {
      const response = await api.delete(`/admin/notifications/${id}`);
      return response.data;
    } catch (error) {
      console.error("API: Error deleting notification:", error);
      throw error.response?.data || error.message;
    }
  },

  // AI APIs
  async generateAIDescription(productData) {
    try {
      const response = await api.post(
        "/admin/products/ai-description",
        productData
      );
      return response.data;
    } catch (error) {
      console.error("API: Error generating AI description:", error);
      throw error.response?.data || error.message;
    }
  },
};
