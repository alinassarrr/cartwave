import "./styles.css";

const AdminProductFilters = ({
  selectedCategory,
  setSelectedCategory,
  selectedStock,
  setSelectedStock,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="admin-product-filters">
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Accessories">Accessories</option>
        <option value="Home">Home</option>
      </select>

      <select
        value={selectedStock}
        onChange={(e) => setSelectedStock(e.target.value)}
      >
        <option value="">All Stock Status</option>
        <option value="in_stock">In Stock</option>
        <option value="low_stock">Low Stock</option>
        <option value="out_of_stock">Out of Stock</option>
      </select>

      <input
        type="text"
        placeholder="Search Products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default AdminProductFilters;
