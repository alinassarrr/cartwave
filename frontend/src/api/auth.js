import api from "./config";

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error("Backend login error:", error.response?.data);
      console.error("Backend error:", error.response?.data);
      console.error("Full login error:", error);
      throw error.response?.data || error.message;
    }
  },

  async register(userData) {
    try {
      const response = await api.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  async logout() {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      throw error.response?.data || error.message;
    }
  },

  async getCurrentUser() {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  async refreshToken() {
    try {
      const response = await api.post("/auth/refresh");
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};
