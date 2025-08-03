import React, { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader";
// import axios from "axios";
import { FaDollarSign, FaUser } from "react-icons/fa";
import "./styles.css";

const NotificationsPageOverview = () => {
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    /*
    axios.get("api")
      .then(res => setNotifications(res.data))
      .catch(err => console.error("Failed to load notifications", err));
    */

    // Mock data
    setNotifications([
      {
        id: 1,
        title: "New user order",
        message: "The order1 has be requested",
        time: "2 mins ago",
        type: "order",
      },
      {
        id: 2,
        title: "New user order",
        message: "The order2 has be requested",
        time: "5 mins ago",
        type: "order",
      },
      {
        id: 3,
        title: "Order Delivered",
        message: "The order deliverd",
        time: "1 hr ago",
        type: "delivery",
      },
      {
        id: 4,
        title: "Order Delivered",
        message: "The order deliverd",
        time: "2 days ago",
        type: "delivery",
      },
    ]);
  }, []);

  const handleRemove = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));

    /*
    axios.delete(`api}`)
      .then(() => console.log("Deleted"))
      .catch(err => console.error("Delete error", err));
    */
  };

  const filteredNotifs =
    filter === "All"
      ? notifications
      : notifications.filter((n) => n.type === filter.toLowerCase());

  return (
    <div className="notifications-overview">
      <SectionHeader
        title="Notifications"
        subtitle="Your most recent system messages and order updates"
      />

      <div className="notifs-header">
        <div className="notifs-filter">
          <label>Filter by:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All Notifications</option>
            <option value="order">Order Requests</option>
            <option value="delivery">Delivered Orders</option>
          </select>
        </div>
        <div className="notifs-count">{filteredNotifs.length} messages</div>
      </div>

      <div className="notifs-list">
        {filteredNotifs.map((notif) => (
          <div className="notif-row" key={notif.id}>
            <div className="notif-icon">
              {notif.type === "order" ? <FaUser /> : <FaDollarSign />}
            </div>
            <div className="notif-content">
              <strong>{notif.title}</strong>
              <p>{notif.message}</p>
            </div>
            <div className="notif-meta">
              <span>{notif.time}</span>
              <button onClick={() => handleRemove(notif.id)}>X</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPageOverview;
