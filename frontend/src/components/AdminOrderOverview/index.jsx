import { useEffect, useState } from "react";
import OrderSummaryCard from "../OrderSummaryCard";
import SectionHeader from "../SectionHeader";
import { adminService } from "../../api/admin";
import "./styles.css";

const AdminOrderOverview = () => {
  const [summary, setSummary] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    shippedToday: 0,
    revenueToday: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderSummary = async () => {
      try {
        setLoading(true);
        console.log("Fetching order summary...");
        const response = await adminService.getOrderSummary();
        console.log("Order summary response:", response);
        const data = response.data || response;
        console.log("Order summary data:", data);
        setSummary({
          totalOrders: data.total_orders || 0,
          pendingOrders: data.pending_orders || 0,
          shippedToday: data.shipped_today || 0,
          revenueToday: data.revenue_today || 0,
        });

        if (
          data.total_orders === 0 &&
          data.pending_orders === 0 &&
          data.shipped_today === 0 &&
          data.revenue_today === 0
        ) {
          console.log(
            "No orders found in database - this is normal for a new store"
          );
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching order summary:", err);
        console.error("Full error object:", err);
        setError(
          `Failed to load order summary: ${err.message || "Unknown error"}`
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrderSummary();
  }, []);

  if (loading) {
    return (
      <div className="admin-order-overview">
        <SectionHeader
          title="Order Management"
          subtitle="Manage and process customer order efficiently"
        />
        <div className="loading">Loading order summary...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-order-overview">
        <SectionHeader
          title="Order Management"
          subtitle="Manage and process customer order efficiently"
        />
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="admin-order-overview">
      <SectionHeader
        title="Order Management"
        subtitle="Manage and process customer order efficiently"
      />

      <div className="admin-order-cards">
        <OrderSummaryCard
          label="Total Orders"
          value={summary.totalOrders}
          icon=""
        />
        <OrderSummaryCard
          label="Pending Orders"
          value={summary.pendingOrders}
          icon="ℹ"
        />
        <OrderSummaryCard
          label="Shipped Today"
          value={summary.shippedToday}
          icon=""
        />
        <OrderSummaryCard
          label="Revenue Today"
          value={`$${summary.revenueToday.toLocaleString()}`}
          icon="$"
        />
      </div>
    </div>
  );
};

export default AdminOrderOverview;
