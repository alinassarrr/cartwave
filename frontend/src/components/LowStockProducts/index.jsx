import { useEffect, useState } from "react";
import InfoCard from "../InfoCard";
import "./styles.css";

const LowStockProducts = () => {
  const [products, setProducts] = useState([
    {
      id: "Wireless Headphones",
      sku: "SKU: WH-001",
      quantity: "3 left",
      status: "Low Stock",
    },
    {
      id: "watch",
      sku: "SKU: WH-002",
      quantity: "3 left",
      status: "Low Stock",
    },
    {
      id: "usb",
      sku: "SKU: WH-003",
      quantity: "2 left",
      status: "Low Stock",
    },
    {
      id: "hardisk",
      sku: "SKU: WH-004",
      quantity: "1 left",
      status: "Low Stock",
    },
  ]);

  useEffect(() => {
    // axios.get("/api/orders/low-stock")
    // .then (res => setOrders(res.data))
    // .catch (err=> console.error(err));
  }, []);

  return (
    <div className="low-stock-products">
      <div className="low-stock-header">
        <h3>Low Stock Products</h3>
        <span className="view-all">View all</span>
      </div>

      <div className="product-list">
        {products.map((product, index) => (
          <InfoCard
            icon="https://via.placeholder.com/36"
            key={index}
            title={product.id}
            subtitle={product.sku}
            amount={product.quantity}
            status={product.status}
          />
        ))}
      </div>
    </div>
  );
};

export default LowStockProducts;
