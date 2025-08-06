import { useEffect, useState } from "react";
import InfoCard from "../InfoCard";
import { adminService } from "../../api/admin";
import "./styles.css";

const RecentOrders = () => {
  // const [orders, setOrders] = useState([
  //   {
  //     id: "order",
  //     customer: "John Doe",
  //     amount: 199.99,
  //     status: "Pending",
  //   },
  //   {
  //     id: "order2",
  //     customer: "John Doe",
  //     amount: 199.99,
  //     status: "Shipped",
  //   },
  //   {
  //     id: "order3",
  //     customer: "John Doe",
  //     amount: 199.99,
  //     status: "Pending",
  //   },
  //   {
  //     id: "order4",
  //     customer: "John Doe",
  //     amount: 199.99,
  //     status: "Paid",
  //   },
  // ]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        setLoading(true);
        const response = await adminService.getRecentOrders();
        // setOrders(response);
        const data = response.data || response; // Handle both wrapped and direct responses
        setOrders(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error("Error fetching recent orders:", err);
        setError("Failed to load recent orders");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, []);

  if (loading) {
    return (
      <div className="recent-orders">
        <div className="recent-orders-header">
          <h3>Recent Orders</h3>
        </div>
        <div className="loading">Loading recent orders...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recent-orders">
        <div className="recent-orders-header">
          <h3>Recent Orders</h3>
        </div>
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="recent-orders">
      <div className="recent-orders-header">
        <h3>Recent Orders</h3>
        <span className="view-all">View all</span>
      </div>

      <div className="order-list">
        {orders.length > 0 ? (
          orders.map((order) => (
            <InfoCard
              key={order.id}
              icon="https://via.placeholder.com/36"
              title={`Order #${order.id}`}
              subtitle={order.customer}
              amount={`$${order.amount}`}
              status={order.status}
            />
          ))
        ) : (
          <div className="no-orders">No recent orders found</div>
        )}
      </div>
    </div>
  );
};

export default RecentOrders;
