import api from "./config";

export const productsService = {
  async getAllProducts(params = {}) {
    try {
      console.log("API: Fetching products with params:", params);
      const startTime = Date.now();
      const response = await api.get("/user/products", { params });
      const endTime = Date.now();
      console.log(`API: Products fetched in ${endTime - startTime}ms`);
      return response.data;
    } catch (error) {
      console.error("API: Error fetching products:", error);
      throw error.response?.data || error.message;
    }
  },

  async getProductById(id) {
    try {
      const response = await api.get(`/user/products/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
