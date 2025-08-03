import React, { useState } from "react";
import SectionHeader from "../../../components/SectionHeader";
import Button from "../../../components/Button";
import ProductInformation from "../../../components/AdminProductInformation";
import PricingInventory from "../../../components/PricingInventory";
import ProductImages from "../../../components/ProductImages";
import "./styles.css";

const AdminCreateProduct = () => {
  const [productInfo, setProductInfo] = useState({});
  const [pricingInfo, setPricingInfo] = useState({});
  const [images, setImages] = useState([]);

  const handleCreateProduct = async () => {
    const payload = {
      ...productInfo,
      ...pricingInfo,
      images: images.map((img) => img.base64),
    };

    console.log("Product Data", payload);

    /*
    try {
      const res = await fetch("https://your-backend-url.com/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log("Product created:", data);
    } catch (error) {
      console.error("Error creating product:", error);
    }
    */
  };

  return (
    <div className="add-product-page">
      <SectionHeader
        title="Add New Product"
        subtitle="Create a new product for your catalog"
      />

      <div className="form-sections">
        <ProductInformation onChange={setProductInfo} />
        <PricingInventory onChange={setPricingInfo} />
      </div>

      <ProductImages onChange={setImages} />

      <div className="button-row">
        <Button
          text="Cancel"
          className="cancel-btn"
          onClick={() => console.log("Cancelled")}
        />
        <Button
          text="Save as Draft"
          className="draft-btn"
          onClick={() => console.log("Saved Draft")}
        />
        <Button
          text="Create Product"
          className="create-btn"
          onClick={handleCreateProduct}
        />
      </div>
    </div>
  );
};

export default AdminCreateProduct;
