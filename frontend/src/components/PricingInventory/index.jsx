import React, { useState } from "react";
import "./styles.css";

const PricingInventory = ({ onChange }) => {
  const [pricingData, setPricingData] = useState({
    price: "",
    comparePrice: "",
    stockQuantity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...pricingData, [name]: value };
    setPricingData(updated);
    onChange?.(updated);
  };

  return (
    <div className="pricing-inventory">
      <h3>Pricing & Inventory</h3>

      <div className="input-group">
        <label>Price</label>
        <input
          type="number"
          name="price"
          value={pricingData.price}
          onChange={handleChange}
          placeholder="$ 0.00"
        />
      </div>

      <div className="input-group">
        <label>Compare Price</label>
        <input
          type="number"
          name="comparePrice"
          value={pricingData.comparePrice}
          onChange={handleChange}
          placeholder="$ 0.00"
        />
      </div>

      <div className="input-group">
        <label>Stock Quantity</label>
        <input
          type="number"
          name="stockQuantity"
          value={pricingData.stockQuantity}
          onChange={handleChange}
          placeholder="0"
        />
      </div>
    </div>
  );
};

export default PricingInventory;
