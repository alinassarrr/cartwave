import React, { useState } from "react";
import { BsPerson, BsShield, BsBell, BsPalette, BsGear } from "react-icons/bs";
import { FiUser, FiLock, FiBell, FiSettings } from "react-icons/fi";
import { PiPaletteThin } from "react-icons/pi";
import "./styles.css";

const AdminSettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    firstName: "Admin",
    lastName: "User",
    email: "admin@cartwave.com",
    phone: "+1 (555) 123-4567",
    businessName: "CartWave Store",
    role: "Administrator",
    notifications: {
      email: true,
      push: false,
      sms: true,
    },
    theme: "light",
    language: "en",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type],
      },
    }));
  };

  const handleSave = () => {
    console.log("Saving settings:", formData);
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: FiUser },
    { id: "security", label: "Security", icon: FiLock },
    { id: "notifications", label: "Notifications", icon: FiBell },
    { id: "appearance", label: "Appearance", icon: PiPaletteThin },
    { id: "preferences", label: "Preferences", icon: FiSettings },
  ];

  return (
    <div className="admin-settings-page">
      <div className="settings-header">
        <h1>Admin Settings</h1>
        <p>Manage your account settings and preferences</p>
      </div>

      <div className="settings-container">
        <div className="settings-sidebar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon size={18} />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="settings-content">
          {activeTab === "profile" && (
            <div className="settings-section">
              <h2>Profile Information</h2>
              <div className="form-grid">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                  />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                  />
                </div>
                <div className="form-group">
                  <label>Business Name</label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="Enter business name"
                  />
                </div>
                <div className="form-group">
                  <label>Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    disabled
                    className="disabled"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="settings-section">
              <h2>Security Settings</h2>
              <div className="security-options">
                <div className="security-item">
                  <div className="security-info">
                    <h3>Change Password</h3>
                    <p>Update your account password for better security</p>
                  </div>
                  <button className="btn-secondary">Change Password</button>
                </div>
                <div className="security-item">
                  <div className="security-info">
                    <h3>Two-Factor Authentication</h3>
                    <p>Add an extra layer of security to your account</p>
                  </div>
                  <button className="btn-secondary">Enable 2FA</button>
                </div>
                <div className="security-item">
                  <div className="security-info">
                    <h3>Login History</h3>
                    <p>View recent login activity and sessions</p>
                  </div>
                  <button className="btn-secondary">View History</button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="settings-section">
              <h2>Notification Preferences</h2>
              <div className="notification-options">
                <div className="notification-item">
                  <div className="notification-info">
                    <h3>Email Notifications</h3>
                    <p>Receive notifications via email</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={formData.notifications.email}
                      onChange={() => handleNotificationChange("email")}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="notification-info">
                    <h3>Push Notifications</h3>
                    <p>Receive browser push notifications</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={formData.notifications.push}
                      onChange={() => handleNotificationChange("push")}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="notification-item">
                  <div className="notification-info">
                    <h3>SMS Notifications</h3>
                    <p>Receive notifications via SMS</p>
                  </div>
                  <label className="toggle">
                    <input
                      type="checkbox"
                      checked={formData.notifications.sms}
                      onChange={() => handleNotificationChange("sms")}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="settings-section">
              <h2>Appearance Settings</h2>
              <div className="appearance-options">
                <div className="form-group">
                  <label>Theme</label>
                  <select
                    name="theme"
                    value={formData.theme}
                    onChange={handleInputChange}
                  >
                    <option value="light">Light Theme</option>
                    <option value="dark">Dark Theme</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Language</label>
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleInputChange}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="settings-section">
              <h2>General Preferences</h2>
              <div className="preferences-options">
                <div className="preference-item">
                  <div className="preference-info">
                    <h3>Auto-save Forms</h3>
                    <p>Automatically save form data as you type</p>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="preference-item">
                  <div className="preference-info">
                    <h3>Show Analytics</h3>
                    <p>Display analytics data on dashboard</p>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="preference-item">
                  <div className="preference-info">
                    <h3>Email Reports</h3>
                    <p>Send weekly reports via email</p>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                </div>
              </div>
            </div>
          )}

          <div className="settings-actions">
            <button className="btn-primary" onClick={handleSave}>
              Save Changes
            </button>
            <button className="btn-secondary">Reset to Default</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
