import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "../../../components/SectionHeader";
import Button from "../../../components/Button";
import ProductInformation from "../../../components/AdminProductInformation";
import PricingInventory from "../../../components/PricingInventory";
import ProductImages from "../../../components/ProductImages";
import { adminService } from "../../../api/admin";
import "./styles.css";

const AdminCreateProduct = () => {
  const navigate = useNavigate();
  const [productInfo, setProductInfo] = useState({});
  const [pricingInfo, setPricingInfo] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateProduct = async () => {
    try {
      setLoading(true);
      setError(null);

      // Validate required fields
      if (
        !productInfo.name ||
        !productInfo.description ||
        !pricingInfo.price ||
        !productInfo.category_id
      ) {
        setError(
          "Please fill in all required fields (Name, Description, Price, Category)"
        );
        return;
      }

      const payload = {
        name: productInfo.name,
        description: productInfo.description,
        category_id: parseInt(productInfo.category_id),
        price: parseFloat(pricingInfo.price),
        stock: parseInt(pricingInfo.stockQuantity || 0),
        sku: productInfo.sku || "", // Let backend generate SKU if empty
        color: productInfo.color || "",
        size: productInfo.size || "",
        // Note: For now, we'll handle images separately if needed
        // images: images.map((img) => img.base64),
      };

      console.log("Creating product with data:", payload);

      const response = await adminService.createProduct(payload);
      console.log("Product created successfully:", response);

      // Navigate back to products list
      navigate("/admin/products");
    } catch (err) {
      console.error("Error creating product:", err);

      // Handle specific database errors
      let errorMessage = "Failed to create product";

      if (
        err.message &&
        err.message.includes("Integrity constraint violation")
      ) {
        if (err.message.includes("sku")) {
          errorMessage = "SKU already exists. Please use a unique SKU.";
        } else if (err.message.includes("category_id")) {
          errorMessage = "Invalid category selected.";
        } else {
          errorMessage =
            "Database constraint violation. Please check your input.";
        }
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/products");
  };

  const generateUniqueSKU = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `SKU-${timestamp}-${random}`;
  };

  const handleSaveDraft = async () => {
    // For now, save as draft is the same as create
    // In the future, you could add a 'status' field to save as draft
    await handleCreateProduct();
  };

  return (
    <div className="add-product-page">
      <SectionHeader
        title="Add New Product"
        subtitle="Create a new product for your catalog"
      />

      {error && <div className="error-message">{error}</div>}

      <div className="form-sections">
        <ProductInformation 
          onChange={setProductInfo} 
          pricingInfo={pricingInfo}
        />
        <PricingInventory onChange={setPricingInfo} />
      </div>

      <ProductImages onChange={setImages} />

      <div className="button-row">
        <button
          className="cancel-btn"
          onClick={handleCancel}
          disabled={loading}
        >
          Cancel
        </button>
        <button
          className="draft-btn"
          onClick={handleSaveDraft}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save as Draft"}
        </button>
        <button
          className="create-btn"
          onClick={handleCreateProduct}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </div>
    </div>
  );
};

export default AdminCreateProduct;
