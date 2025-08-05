import React, { useState } from "react";
import { BsBell, BsCheck, BsTrash } from "react-icons/bs";
import "./styles.css";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Order Shipped",
      message: "Your order #ORD-001 has been shipped",
      isRead: false,
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "Order Delivered",
      message: "Your order #ORD-002 has been delivered",
      isRead: true,
      time: "1 day ago",
    },
    {
      id: 3,
      title: "Payment Confirmed",
      message: "Payment for order #ORD-003 confirmed",
      isRead: false,
      time: "3 hours ago",
    },
    {
      id: 4,
      title: "Order Cancelled",
      message: "Order #ORD-004 has been cancelled",
      isRead: true,
      time: "2 days ago",
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
          <h1>Notifications</h1>
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

export default NotificationPage;
