import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import SectionHeader from "../SectionHeader";
import "./styles.css";
// import axios from "axios";

const AdminEditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product details (mock for now)
  useEffect(() => {
    // axios.get(`/api/admin/products/${id}`)
    //   .then(res => {
    //     setProduct(res.data);
    //     setLoading(false);
    //   })
    //   .catch(err => {
    //     console.error("Failed to load product", err);
    //     setLoading(false);
    //   });

    setTimeout(() => {
      setProduct({
        id,
        name: "Wireless Bluetooth Headphones",
        description: "Premium noise-cancelling headphones",
        category: "Electronics",
        price: 199.99,
        stock: 25,
        status: "Active",
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    // axios.put(`/api/admin/products/${id}`, product)
    //   .then(() => alert("Product updated!"))
    //   .catch(err => console.error("Failed to update product", err));

    console.log("Saving updated product:", product);
  };

  if (loading || !product) return <div>Loading product...</div>;

  return (
    <div className="admin-edit-product">
      <SectionHeader
        title={`Edit Product #${product.id}`}
        subtitle="Update product information"
      />

      <form className="edit-product-form" onSubmit={handleSave}>
        <label>
          Product Name
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={product.description}
            onChange={handleChange}
          />
        </label>

        <label>
          Category
          <select
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Home">Home</option>
          </select>
        </label>

        <label>
          Price ($)
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            step="1.00"
          />
        </label>

        <label>
          Stock
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
          />
        </label>

        <label>
          Status
          <select name="status" value={product.status} onChange={handleChange}>
            <option value="Active">Active</option>
            <option value="Low">Low</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </label>

        <button type="submit" className="save-btn">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AdminEditProduct;
