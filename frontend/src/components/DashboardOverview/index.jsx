import { useEffect, useState } from "react";
import OverviewCard from "../OverviewCard";
import SectionHeader from "../SectionHeader";
import { adminService } from "../../api/admin";
import "./styles.css";

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    // totalOrders: 1247,
    // revenue: 24890,
    // products: 156,
    // customers: 800,
    totalOrders: { value: 0, note: "" },
    revenue: { value: 0, note: "" },
    products: { value: 0, note: "" },
    customers: { value: 0, note: "" },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //axios.get("api/dashboard/overview")
    //.then (res=> setStats(res.data))
    //.catch(err=>console.error(err));
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await adminService.getDashboardOverview();
        const data = response.data || response;
        setStats({
          totalOrders: data.total_orders || { value: 0, note: "No data" },
          revenue: data.revenue || { value: 0, note: "No data" },
          products: data.products || { value: 0, note: "No data" },
          customers: data.customers || { value: 0, note: "No data" },
        });
        setError(null);
      } catch (err) {
        console.error("Error fetching dashboard overview:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);
  if (loading) {
    return (
      <div className="dashboard-overview">
        <SectionHeader
          title="Dashboard Overview"
          subtitle="Monitor your store performance and manage operations"
        />
        <div className="overview-grid">
          <div className="loading">Loading dashboard data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-overview">
        <SectionHeader
          title="Dashboard Overview"
          subtitle="Monitor your store performance and manage operations"
        />
        <div className="overview-grid">
          <div className="error">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-overview">
      <SectionHeader
        title="Dashboard Overview"
        subtitle="Monitor your store performance and manage operations"
      />

      <div className="overview-grid">
        <OverviewCard
          title="Total Orders"
          value={stats.totalOrders.value || 0}
          note={stats.totalOrders.note || ""}
        />
        <OverviewCard
          title="Revenue"
          value={`$${(stats.revenue.value || 0).toLocaleString()}`}
          note={stats.revenue.note || ""}
        />
        <OverviewCard
          title="Products"
          value={stats.products.value || 0}
          note={stats.products.note || ""}
        />
        <OverviewCard
          title="Customers"
          value={stats.customers.value || 0}
          note={stats.customers.note || ""}
        />
      </div>
    </div>
  );
};

export default DashboardOverview;
