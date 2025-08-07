import React, { useState, useEffect } from "react";
import { BsBox, BsCurrencyDollar, BsStar } from "react-icons/bs";
import "./styles.css";

const ProfileStats = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    averageRating: 0,
  });

  // useEffect(() => {
  //   // Calculate stats from localStorage orders
  //   const orders = JSON.parse(localStorage.getItem("orders") || "[]");

  //   const totalOrders = orders.length;
  //   const totalSpent = orders.reduce(
  //     (sum, order) => sum + order.totals.total,
  //     0
  //   );
  //   const averageRating = orders.length > 0 ? 4.5 : 0; // Mock rating

  //   setStats({
  //     totalOrders,
  //     totalSpent,
  //     averageRating,
  //   });
  // }, []);

  return (
    <div className="profile-stats">
      <h3>Account Statistics</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <BsBox />
          </div>
          <div className="stat-content">
            <h4>{stats.totalOrders}</h4>
            <p>Total Orders</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <BsCurrencyDollar />
          </div>
          <div className="stat-content">
            <h4>${stats.totalSpent.toFixed(2)}</h4>
            <p>Total Spent</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <BsStar />
          </div>
          <div className="stat-content">
            <h4>{stats.averageRating}</h4>
            <p>Average Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileStats;
