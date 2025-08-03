import React, { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader";
import OverviewCard from "../OverviewCard";
import {
  FaDollarSign,
  FaShoppingCart,
  FaCalendarAlt,
  FaPercent,
} from "react-icons/fa";
import "./styles.css";

const AnalyticsPageOverview = () => {
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    avgOrderValue: 0,
    conversionRate: 0,
  });

  const [notes, setNotes] = useState({
    totalRevenue: "+12% from last month",
    totalOrders: "+12% from last week",
    avgOrderValue: "+3.8 from last month",
    conversionRate: "-1.2% from last month",
  });

  useEffect(() => {
    /*
    fetch("api")
      .then((res) => res.json())
      .then((data) => {
        setMetrics(data.metrics);
        setNotes(data.notes);
      })
      .catch((err) => console.error("API error:", err));
    */

    setMetrics({
      totalRevenue: "$12,847",
      totalOrders: "347",
      avgOrderValue: "$37.02",
      conversionRate: "3.24%",
    });
  }, []);

  return (
    <div className="analytics-overview">
      <SectionHeader
        title="Analytics Dashboard"
        subtitle="Track your store and performance and insights"
      />

      <div className="overview-grid">
        <OverviewCard
          title="Total Revenue"
          value={metrics.totalRevenue}
          note={notes.totalRevenue}
          icon={<FaDollarSign />}
        />
        <OverviewCard
          title="Total Orders"
          value={metrics.totalOrders}
          note={notes.totalOrders}
          icon={<FaShoppingCart />}
        />
        <OverviewCard
          title="Avg Order Value"
          value={metrics.avgOrderValue}
          note={notes.avgOrderValue}
          icon={<FaCalendarAlt />}
        />
        <OverviewCard
          title="Conversion Rate"
          value={metrics.conversionRate}
          note={notes.conversionRate}
          icon={<FaPercent />}
        />
      </div>
    </div>
  );
};

export default AnalyticsPageOverview;
