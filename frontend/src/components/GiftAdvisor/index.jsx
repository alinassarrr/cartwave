import React, { useState } from "react";
import { userService } from "../../api/user";
import "./styles.css";

const GiftAdvisor = () => {
  const [formData, setFormData] = useState({
    age: "",
    interests: "",
    budget: "",
    gender: "",
  });

  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.age || !formData.interests || !formData.budget) {
      setError("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await userService.getGiftRecommendation({
        age: parseInt(formData.age),
        interests: formData.interests,
        budget: parseFloat(formData.budget),
        gender: formData.gender,
      });

      setRecommendation(response.data);
    } catch (err) {
      setError(err.message || "Failed to get recommendation");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({ age: "", interests: "", budget: "", gender: "" });
    setRecommendation(null);
    setError(null);
  };

  return (
    <div className="gift-advisor">
      <div className="gift-advisor-header">
        <h2> AI Gift Advisor</h2>
        <p>Let our AI help you find the perfect gift!</p>
      </div>

      {!recommendation ? (
        <form onSubmit={handleSubmit} className="gift-form">
          <div className="form-row">
            <div className="form-group">
              <label>Age *</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                placeholder="Enter age"
                min="1"
                max="100"
                required
              />
            </div>

            <div className="form-group">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Interests *</label>
            <input
              type="text"
              name="interests"
              value={formData.interests}
              onChange={handleChange}
              placeholder="e.g., gaming, cooking, reading, sports"
              required
            />
          </div>

          <div className="form-group">
            <label>Budget ($) *</label>
            <input
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="Enter your budget"
              min="1"
              step="0.01"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            className="get-recommendation-btn"
            disabled={loading}
          >
            {loading ? "Getting Recommendation..." : " Get AI Recommendation"}
          </button>
        </form>
      ) : (
        <div className="recommendation-result">
          <h3>Your AI Recommendation</h3>
          <div className="recommendation-content">
            <p>{recommendation.suggestion}</p>
          </div>
          <div className="recommendation-actions">
            <button onClick={resetForm} className="try-again-btn">
              Try Another Recommendation
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftAdvisor;
