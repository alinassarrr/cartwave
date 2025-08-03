import { useEffect, useState } from "react";
import OrderSummaryCard from "../OrderSummaryCard";
import SectionHeader from "../SectionHeader";
import "./styles.css";

const AdminOrderOverview = () => {
  const [summary, setSummary] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    shippedToday: 0,
    revenueToday: "$0.00",
  });

  useEffect(() => {
    // axios.get("/api/admin/order-summary")
    // .then(res=>setSummary(res.data))
    // .catch(err=>console.error(err));

    setSummary({
      totalOrders: 6,
      pendingOrders: 1,
      shippedToday: 0,
      revenueToday: "$10.00",
    });
  }, []);

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
          value={summary.revenueToday}
          icon="$"
        />
      </div>
    </div>
  );
};

export default AdminOrderOverview;
