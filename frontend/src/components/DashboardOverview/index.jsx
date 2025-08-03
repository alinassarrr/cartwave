import { useEffect, useState } from "react";
import OverviewCard from "../OverviewCard";
import SectionHeader from "../SectionHeader";
//import Axios from "axios"  after chadi and abd finishes

import "./styles.css";

const DashboardOverview = () => {
  const [stats, setStats] = useState({
    totalOrders: 1247,
    revenue: 24890,
    products: 156,
    customers: 800,
  });

  useEffect(() => {
    //axios.get("api/dashboard/overview")
    //.then (res=> setStats(res.data))
    //.catch(err=>console.error(err));
  }, []);

  return (
    <div className="dashboard-overview">
      <SectionHeader
        title="Dashboard Overview"
        subtitle="Monitor your store performance and manage operations"
      />

      <div className="overview-grid">
        <OverviewCard
          title="Total Orders"
          value={stats.totalOrders}
          note="+12% from last month"
        />
        <OverviewCard
          title="Revenue"
          value={`$${stats.revenue.toLocaleString()}`}
          note="+8% from last month"
        />
        <OverviewCard
          title="Products"
          value={stats.products}
          note="+3 new this week"
        />
        <OverviewCard
          title="Customers"
          value={stats.customers}
          note="+15% from last month"
        />
      </div>
    </div>
  );
};

export default DashboardOverview;
