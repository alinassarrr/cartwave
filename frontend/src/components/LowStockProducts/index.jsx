import { useEffect, useState } from "react";
import InfoCard from "../InfoCard";
import { adminService } from "../../api/admin";
import "./styles.css";

const LowStockProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const [products, setProducts] = useState([
  //   {
  //     id: "Wireless Headphones",
  //     sku: "SKU: WH-001",
  //     quantity: "3 left",
  //     status: "Low Stock",
  //   },
  //   {
  //     id: "watch",
  //     sku: "SKU: WH-002",
  //     quantity: "3 left",
  //     status: "Low Stock",
  //   },
  //   {
  //     id: "usb",
  //     sku: "SKU: WH-003",
  //     quantity: "2 left",
  //     status: "Low Stock",
  //   },
  //   {
  //     id: "hardisk",
  //     sku: "SKU: WH-004",
  //     quantity: "1 left",
  //     status: "Low Stock",
  //   },
  // ]);

  useEffect(() => {
    const fetchLowStockProducts = async () => {
      try {
        setLoading(true);
        const response = await adminService.getLowStockProducts();
        setProducts(response.data);
        // console.log(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching low stock products:", err);
        setError("Failed to load low stock products");
      } finally {
        setLoading(false);
      }
    };

    fetchLowStockProducts();
  }, []);

  if (loading) {
    return (
      <div className="low-stock-products">
        <div className="low-stock-header">
          <h3>Low Stock Products</h3>
        </div>
        <div className="loading">Loading low stock products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="low-stock-products">
        <div className="low-stock-header">
          <h3>Low Stock Products</h3>
        </div>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="low-stock-products">
      <div className="low-stock-header">
        <h3>Low Stock Products</h3>
        <span className="view-all">View all</span>
        {/* //button navigate to products  */}
      </div>

      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <InfoCard
              key={product.id}
              icon="https://via.placeholder.com/36"
              title={product.name}
              subtitle={`SKU: ${product.sku || "N/A"}`}
              amount={`${product.stock} left`}
              status="Low Stock"
            />
          ))
        ) : (
          <div className="no-products">All products are well stocked!</div>
        )}
      </div>
    </div>
  );
};

export default LowStockProducts;
