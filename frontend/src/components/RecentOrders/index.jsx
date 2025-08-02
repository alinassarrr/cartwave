import { useEffect, useState } from "react";
import InfoCard from "../InfoCard";
import "./styles.css";

const RecentOrders = () => {
  const [orders, setOrders] = useState([
    {
      id: "order",
      customer: "John Doe",
      amount: 199.99,
      status: "Pending",
    },
    {
      id: "order2",
      customer: "John Doe",
      amount: 199.99,
      status: "Shipped",
    },
    {
      id: "order3",
      customer: "John Doe",
      amount: 199.99,
      status: "Pending",
    },
    {
      id: "order4",
      customer: "John Doe",
      amount: 199.99,
      status: "Paid",
    },
  ]);

  useEffect(() => {
    // axios.get("/api/orders/recent")
    // .then (res => setOrders(res.data))
    // .catch (err=> console.error(err));
  }, []);

  return (
    <div className="recent-orders">
      <div className="recent-orders-header">
        <h3>Recent Orders</h3>
        <span className="view-all">View all</span>
      </div>

      <div className="order-list">
        {orders.map((order) => (
          <InfoCard
            icon="https://via.placeholder.com/36"
            title={order.id}
            subtitle={order.customer}
            amount={order.amount}
            status={order.status}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
