import React, { useState } from "react";
import { BsBell, BsCheck, BsTrash } from "react-icons/bs";
import "./styles.css";

const AdminNotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Order Received",
      message: "Order #ORD-001 has been placed by customer John Doe",
      isRead: false,
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Order Status Updated",
      message: "Order #ORD-002 status changed to 'Shipped'",
      isRead: true,
      time: "1 day ago",
    },
    {
      id: 3,
      title: "New Customer Registration",
      message: "New customer Jane Smith has registered",
      isRead: false,
      time: "3 hours ago",
    },
    {
      id: 4,
      title: "Low Stock Alert",
      message: "Product 'Wireless Headphones' is running low on stock",
      isRead: true,
      time: "2 days ago",
    },
    {
      id: 5,
      title: "Payment Received",
      message: "Payment for order #ORD-003 has been confirmed",
      isRead: false,
      time: "1 hour ago",
    },
    {
      id: 6,
      title: "Order Cancelled",
      message: "Order #ORD-004 has been cancelled by customer",
      isRead: true,
      time: "4 hours ago",
    },
  ]);

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="container notification-page">
      <div className="header">
        <div className="header-left">
          <h1>Admin Notifications</h1>
          {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
        </div>
        {unreadCount > 0 && (
          <button className="mark-all-btn" onClick={markAllAsRead}>
            Mark all as read
          </button>
        )}
      </div>
      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="empty">
            <BsBell className="empty-icon" />
            <p>No notifications</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`notification-card ${
                !notification.isRead ? "unread" : ""
              }`}
            >
              <div className="notification-content">
                <h3>{notification.title}</h3>
                <p>{notification.message}</p>
                <span className="time">{notification.time}</span>
              </div>
              <div className="actions">
                {!notification.isRead && (
                  <button
                    className="read-btn"
                    onClick={() => markAsRead(notification.id)}
                  >
                    <BsCheck />
                  </button>
                )}
                <button
                  className="delete-btn"
                  onClick={() => deleteNotification(notification.id)}
                >
                  <BsTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminNotificationPage;
