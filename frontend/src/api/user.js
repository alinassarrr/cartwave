import api from "./config";

export const userService = {
  // Gift Advisor API
  async getGiftRecommendation(giftData) {
    try {
      const response = await api.post("/user/gift-advisor/recommend", giftData);
      return response.data;
    } catch (error) {
      console.error("API: Error getting gift recommendation:", error);
      throw error.response?.data || error.message;
    }
  },
};
