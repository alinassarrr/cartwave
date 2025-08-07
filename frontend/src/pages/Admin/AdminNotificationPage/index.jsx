import React, { useState, useEffect } from "react";
import { BsBell, BsCheck, BsTrash } from "react-icons/bs";
import { adminService } from "../../../api/admin";
import "./styles.css";

const AdminNotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminService.getNotifications();
      setNotifications(response.data || []);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError(
        `Failed to load notifications: ${err.message || "Unknown error"}`
      );
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await adminService.updateNotification(id, { is_read: true });
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, is_read: true }
            : notification
        )
      );
    } catch (err) {
      console.error("Error marking notification as read:", err);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await adminService.deleteNotification(id);
      setNotifications((prev) =>
        prev.filter((notification) => notification.id !== id)
      );
    } catch (err) {
      console.error("Error deleting notification:", err);
    }
  };

  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter((n) => !n.is_read);
      await Promise.all(
        unreadNotifications.map((notification) =>
          adminService.updateNotification(notification.id, { is_read: true })
        )
      );
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, is_read: true }))
      );
    } catch (err) {
      console.error("Error marking all notifications as read:", err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  const createTestNotification = async () => {
    try {
      const testNotification = {
        user_id: 1, // Admin user ID
        title: "Test Notification",
        message:
          "This is a test notification created at " +
          new Date().toLocaleString(),
        type: "test",
      };

      await adminService.createNotification(testNotification);
      await fetchNotifications(); // Refresh the list
    } catch (err) {
      console.error("Error creating test notification:", err);
    }
  };

  if (loading) return <div className="loading">Loading notifications...</div>;

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container notification-page">
      <div className="header">
        <div className="header-left">
          <h1>Admin Notifications</h1>
          {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
        </div>
        <div className="header-actions">
          {unreadCount > 0 && (
            <button className="mark-all-btn" onClick={markAllAsRead}>
              Mark all as read
            </button>
          )}
          <button
            className="test-notification-btn"
            onClick={createTestNotification}
            style={{
              marginLeft: "10px",
              padding: "0.5rem 1rem",
              background: "#00b3b3",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Create Test Notification
          </button>
        </div>
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
                !notification.is_read ? "unread" : ""
              }`}
            >
              <div className="notification-content">
                <h3>{notification.title || "Notification"}</h3>
                <p>{notification.message}</p>
                <span className="time">
                  {new Date(notification.created_at).toLocaleString()}
                </span>
              </div>
              <div className="actions">
                {!notification.is_read && (
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
