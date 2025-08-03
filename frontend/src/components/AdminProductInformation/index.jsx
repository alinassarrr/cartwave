import React, { useState } from "react";
import "./styles.css";

const ProductInformation = ({ onChange }) => {
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    description: "",
    category: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    onChange?.(updated);
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

      <div className="input-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter product description"
        ></textarea>
      </div>

      <div className="input-row">
        <div className="input-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="Clothing">Clothing</option>
            <option value="Electronics">Electronics</option>
            <option value="Books">Books</option>
            <option value="Accessories">Accessories</option>
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
