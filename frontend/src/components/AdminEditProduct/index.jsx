import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SectionHeader from "../SectionHeader";
import { adminService } from "../../api/admin";
import "./styles.css";

const AdminEditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching product for editing:", productId);

        const response = await adminService.getProductById(productId);
        console.log("Product data:", response);

        const data = response.data || response;
        setProduct({
          id: data.id,
          name: data.name || "",
          description: data.description || "",
          category: data.category?.name || "",
          category_id: data.category_id || "",
          price: data.price || 0,
          stock: data.stock || 0,
          status: data.stock > 0 ? "Active" : "Out of Stock",
          sku: data.sku || "",
        });
      } catch (err) {
        console.error("Error fetching product:", err);
        setError(`Failed to load product: ${err.message || "Unknown error"}`);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError(null);

      const payload = {
        name: product.name,
        description: product.description,
        category_id: product.category_id,
        price: product.price,
        stock: product.stock,
        sku: product.sku,
      };

      console.log("Updating product with data:", payload);

      const response = await adminService.updateProduct(productId, payload);
      console.log("Product updated:", response);

      navigate("/admin/products");
    } catch (err) {
      console.error("Error updating product:", err);
      setError(`Failed to update product: ${err.message || "Unknown error"}`);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/products");
  };

  if (loading) return <div className="loading">Loading product...</div>;

  if (error) return <div className="error">{error}</div>;

  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="admin-edit-product">
      <SectionHeader
        title={`Edit Product #${product.id}`}
        subtitle="Update product information"
      />

      <form className="edit-product-form" onSubmit={handleSave}>
        <div className="form-row">
          <label>
            Product Name
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
            />
          </label>

          <label>
            SKU
            <input
              type="text"
              name="sku"
              value={product.sku}
              onChange={handleChange}
              placeholder="Enter product SKU"
            />
          </label>
        </div>

        <label>
          Description
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter product description"
          />
        </label>

        <div className="form-row">
          <label>
            Category
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
              <option value="Home">Home</option>
            </select>
          </label>

          <label>
            Status
            <select
              name="status"
              value={product.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Low">Low</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </label>
        </div>

        <div className="form-row">
          <label>
            Price ($)
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              step="0.01"
              placeholder="0.00"
            />
          </label>

          <label>
            Stock
            <input
              type="number"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              placeholder="0"
            />
          </label>
        </div>

        <div className="button-row">
          <button type="button" className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="save-btn" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEditProduct;
