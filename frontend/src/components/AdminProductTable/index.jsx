import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Button from "../Button";
import AdminProductFilters from "../AdminProductFilter";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const AdminProductTable = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStock, setSelectedStock] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // axios.get("/api/admin/products")
    //   .then(res => setProducts(res.data))
    //   .catch(err => console.error("Failed to fetch products", err));

    setProducts([
      {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        description: "Premium noise-cancelling headphones",
        sku: "WH-001",
        category: "Electronics",
        price: 199.99,
        stock: 25,
        status: "Active",
      },
      {
        id: 2,
        name: "Wireless Bluetooth Headphones",
        description: "Premium noise-cancelling headphones",
        sku: "WH-001",
        category: "Electronics",
        price: 199.99,
        stock: 25,
        status: "Active",
      },
      {
        id: 3,
        name: "Wireless Bluetooth Headphones",
        description: "Premium noise-cancelling headphones",
        sku: "WH-001",
        category: "Electronics",
        price: 199.99,
        stock: 25,
        status: "Active",
      },
      {
        id: 4,
        name: "Wireless Bluetooth Headphones",
        description: "Premium noise-cancelling headphones",
        sku: "WH-001",
        category: "Electronics",
        price: 19.99,
        stock: 25,
        status: "Active",
      },
      {
        id: 5,
        name: "Wireless Bluetooth Headphones",
        description: "Premium noise-cancelling headphones",
        sku: "WH-001",
        category: "Electronics",
        price: 199.99,
        stock: 25,
        status: "Active",
      },
    ]);
  }, []);

  return (
    <div className="admin-product-table">
      <h3>Products</h3>
      <AdminProductFilters
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedStock={selectedStock}
        setSelectedStock={setSelectedStock}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className="product-table-header">
        <span>Product</span>
        <span>SKU</span>
        <span>Category</span>
        <span>Price</span>
        <span>Stock</span>
        <span>Status</span>
        <span>Actions</span>
      </div>

      {products.map((product) => (
        <div className="product-table-row" key={product.id}>
          <div className="product-name">
            <strong>{product.name}</strong>
            <p>{product.description}</p>
          </div>
          <span>{product.sku}</span>
          <span>{product.category}</span>
          <span>${product.price.toFixed(2)}</span>
          <span>{product.stock}</span>
          <span>{product.status}</span>
          <div className="product-actions">
            {/* <Button
              className="action-icon"
              icon={<FaEye />}
              onClick={() => navigate(`/admin/products/${product.id}`)}
            /> */}
            <Button
              className="action-icon"
              icon={<FaEdit />}
              onClick={() => navigate(`/admin/products/${product.id}/edit`)}
            />
            <Button
              className="action-icon"
              icon={<FaTrash />}
              onClick={() => console.log("Delete product", product.id)}
            />
          </div>
        </div>
      ))}

      <div className="product-pagination">
        <p>Showing 1 to 7 of {products.length} products</p>
        <div className="pagination-controls">
          <button disabled>Previous</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  );
};

export default AdminProductTable;
