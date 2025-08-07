import React, { useState } from "react";
import { adminService } from "../../api/admin";
import "./styles.css";

const ProductInformation = ({
  onChange,
  initialData = {},
  pricingInfo = {},
}) => {
  const [formData, setFormData] = useState({
    name: initialData.name || "",
    sku: initialData.sku || "",
    description: initialData.description || "",
    category: initialData.category || "",
    category_id: initialData.category_id || "",
    color: initialData.color || "",
    size: initialData.size || "",
    status: "Active",
  });

  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    onChange?.(updated);
  };

  const generateAIDescription = async () => {
    if (
      !formData.name ||
      !formData.color ||
      !formData.size ||
      !pricingInfo.price
    ) {
      setAiError(
        "Please fill in Product Name, Color, Size, and Price before generating AI description"
      );
      return;
    }

    try {
      setAiLoading(true);
      setAiError(null);

      const response = await adminService.generateAIDescription({
        name: formData.name,
        price: parseFloat(pricingInfo.price),
        color: formData.color,
        size: formData.size,
      });

      const updated = { ...formData, description: response.description };
      setFormData(updated);
      onChange?.(updated);
    } catch (error) {
      setAiError(error.message || "Failed to generate AI description");
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="product-info">
      <h3>Product Information</h3>
      <div className="input-row">
        <div className="input-group">
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </div>
        <div className="input-group">
          <label>SKU</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="Enter product SKU"
          />
        </div>
      </div>

      <div className="input-row">
        <div className="input-group">
          <label>Color</label>
          <select name="color" value={formData.color} onChange={handleChange}>
            <option value="">Select Color</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="red">Red</option>
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="yellow">Yellow</option>
            <option value="orange">Orange</option>
            <option value="purple">Purple</option>
            <option value="pink">Pink</option>
            <option value="gray">Gray</option>
            <option value="brown">Brown</option>
            <option value="navy">Navy</option>
            <option value="beige">Beige</option>
            <option value="gold">Gold</option>
            <option value="silver">Silver</option>
          </select>
        </div>
        <div className="input-group">
          <label>Size</label>
          <select name="size" value={formData.size} onChange={handleChange}>
            <option value="">Select Size</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="2XL">2XL</option>
            <option value="3XL">3XL</option>
          </select>
        </div>
      </div>

      <div className="input-group">
        <div className="description-header">
          <label>Description</label>
          <button
            type="button"
            className="ai-generate-btn"
            onClick={generateAIDescription}
            disabled={aiLoading}
          >
            {aiLoading ? "Generating..." : "Generate AI Description"}
          </button>
        </div>
        {aiError && <div className="ai-error">{aiError}</div>}
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description or use AI to generate one"
        ></textarea>
      </div>

      <div className="input-row">
        <div className="input-group">
          <label>Category</label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={(e) => {
              const { value } = e.target;
              const updated = {
                ...formData,
                category_id: value,
                category: e.target.options[e.target.selectedIndex]?.text || "",
              };
              setFormData(updated);
              onChange?.(updated);
            }}
          >
            <option value="">Select Category</option>
            <option value="1">Clothing</option>
            <option value="2">Electronics</option>
            <option value="3">Books</option>
            <option value="4">Accessories</option>
          </select>
        </div>

        <div className="input-group">
          <label>Status</label>
          <input type="text" name="status" value="Active" readOnly />
        </div>
      </div>
    </div>
  );
};

export default ProductInformation;
