import React, { useState } from "react";
// import axios from "axios";
import Button from "../Button";
import "./styles.css";

const AccountInfoForm = () => {
  const [formData, setFormData] = useState({
    username: "admin_user",
    email: "admin@example.com",
    phone: "+961 71 234 567",
    businessName: "My Store",
    role: "Admin",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    console.log("Saving:", formData);

    /*
    try {
      const res = await axios.put("api", formData);
      console.log("Saved:", res.data);
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
    */
  };

  return (
    <div className="account-info-form">
      <h3>Account Information</h3>
      <div className="input-group">
        <label>Username</label>
        <input
          name="username"
          type="text"
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <label>Contact Number</label>
        <input
          name="phone"
          type="text"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <label>Business Name</label>
        <input
          name="businessName"
          type="text"
          value={formData.businessName}
          onChange={handleChange}
        />
      </div>

      <div className="input-group">
        <label>Role</label>
        <input type="text" value={formData.role} disabled />
      </div>

      <Button text="Save Changes" onClick={handleSave} className="save-btn" />
    </div>
  );
};

export default AccountInfoForm;
