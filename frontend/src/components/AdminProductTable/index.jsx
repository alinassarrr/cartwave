import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import Button from "../Button";
import AdminProductFilters from "../AdminProductFilter";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { adminService } from "../../api/admin";

const AdminProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    per_page: 15,
    total: 0,
  });
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStock, setSelectedStock] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    productId: null,
    productName: "",
  });
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      setError(null);
      console.log("Fetching products with filters:", {
        page,
        search: searchTerm,
        category_id: selectedCategory,
        status: selectedStock,
      });

      const params = {
        page,
        per_page: 15,
        search: searchTerm || undefined,
        category_id: selectedCategory || undefined,
        status: selectedStock || undefined,
      };

      const response = await adminService.getProducts(params);
      console.log("Products response:", response);

      const data = response.data || response;
      console.log("Products data:", data);
      console.log("Data type:", typeof data);
      console.log("Data keys:", Object.keys(data));
      console.log("Is Array:", Array.isArray(data));

      // Convert object with numeric keys to array if needed
      let productsArray = [];
      if (Array.isArray(data)) {
        productsArray = data;
      } else if (typeof data === "object" && data !== null) {
        // Convert object with numeric keys to array
        productsArray = Object.values(data).filter(
          (item) => typeof item === "object"
        );
      }

      console.log("Products array:", productsArray);
      setProducts(productsArray);

      setPagination({
        current_page: data.current_page || 1,
        last_page: data.last_page || 1,
        per_page: data.per_page || 15,
        total: data.total || 0,
      });
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(`Failed to load products: ${err.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory, selectedStock]);

  const handlePageChange = (page) => {
    fetchProducts(page);
  };
  const handleDeleteClick = (product) => {
    setDeleteConfirm({
      show: true,
      productId: product.id,
      productName: product.name || "this product",
    });
  };

  const handleDeleteConfirm = async () => {
    try {
      setDeleting(true);
      console.log("Deleting product:", deleteConfirm.productId);

      await adminService.deleteProduct(deleteConfirm.productId);
      console.log("Product deleted successfully");

      // Refresh the products list
      await fetchProducts(pagination.current_page);

      // Close confirmation dialog
      setDeleteConfirm({ show: false, productId: null, productName: "" });
    } catch (err) {
      console.error("Error deleting product:", err);
      alert(`Failed to delete product: ${err.message || "Unknown error"}`);
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ show: false, productId: null, productName: "" });
  };

  if (loading) return <div className="loading">Loading products...</div>;

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-product-table">
      <h3>Products</h3>

      {deleteConfirm.show && (
        <div className="delete-confirmation-overlay">
          <div className="delete-confirmation-modal">
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to delete{" "}
              <strong>"{deleteConfirm.productName}"</strong>?
            </p>
            <p className="warning-text">
              This action cannot be undone. The product will be permanently
              removed from the database.
            </p>
            <div className="confirmation-buttons">
              <button
                className="cancel-btn"
                onClick={handleDeleteCancel}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className="delete-btn"
                onClick={handleDeleteConfirm}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete Product"}
              </button>
            </div>
          </div>
        </div>
      )}
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
      {products.length === 0 ? (
        <div className="no-products">
          <p>No products found</p>
        </div>
      ) : (
        products.map((product) => {
          console.log("Rendering product:", product);
          return (
            <div className="product-table-row" key={product.id}>
              <div className="product-name">
                <strong>{product.name || "Unnamed Product"}</strong>
                <p>{product.description || "No description"}</p>
              </div>
              <span>{product.sku || "N/A"}</span>
              <span>{product.category?.name || "No Category"}</span>
              <span>${(Number(product.price) || 0).toFixed(2)}</span>
              <span>{product.stock || 0}</span>
              <span
                className={`status ${
                  (product.stock || 0) > 0 ? "in-stock" : "out-of-stock"
                }`}
              >
                {(product.stock || 0) > 0 ? "In Stock" : "Out of Stock"}
              </span>
              <div className="product-actions">
                <Button
                  className="action-icon"
                  icon={<FaEdit />}
                  onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                />
                <Button
                  className="action-icon"
                  icon={<FaTrash />}
                  onClick={() => handleDeleteClick(product)}
                />
              </div>
            </div>
          );
        })
      )}

      {pagination.total > 0 && (
        <div className="product-pagination">
          <p>
            Showing {(pagination.current_page - 1) * pagination.per_page + 1} to{" "}
            {Math.min(
              pagination.current_page * pagination.per_page,
              pagination.total
            )}{" "}
            of {pagination.total} products
          </p>
          <div className="pagination-controls">
            <button
              disabled={pagination.current_page === 1}
              onClick={() => handlePageChange(pagination.current_page - 1)}
            >
              Previous
            </button>
            {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  className={page === pagination.current_page ? "active" : ""}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              )
            )}
            <button
              disabled={pagination.current_page === pagination.last_page}
              onClick={() => handlePageChange(pagination.current_page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductTable;
