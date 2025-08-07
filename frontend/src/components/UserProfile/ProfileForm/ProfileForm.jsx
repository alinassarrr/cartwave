import React, { useState } from "react";
import "./styles.css";

const ProfileForm = () => {
  const [formData, setFormData] = useState({
    firstName: "Ali",
    lastName: "Nassar",
    email: "ali.nassar@gmail.com",
    phone: "+96123412",
    dateOfBirth: "2001-02-12",
    memberSince: "2025-08-04",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(formData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data
    const savedData = JSON.parse(localStorage.getItem("userProfile") || "{}");
    setFormData(savedData);
    setIsEditing(false);
  };

  return (
    <div className="profile-form-section">
      <div className="form-header">
        <h2>Profile Information</h2>
        {!isEditing ? (
          <button className="edit-btn" onClick={() => setIsEditing(true)}>
            Edit Profile
          </button>
        ) : (
          <div className="form-actions">
            <button className="save-btn" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        )}
      </div>

      <form className="profile-form">
        <div className="form-row">
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
          </div>
          <div className="form-group">
            <label>Member Since</label>
            <input
              type="date"
              name="memberSince"
              value={formData.memberSince}
              onChange={handleInputChange}
              disabled={true}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
