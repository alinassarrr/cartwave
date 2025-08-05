import React from "react";
import { BsPerson, BsBox } from "react-icons/bs";
import "./styles.css";

const ProfileSidebar = ({ activeTab, onTabChange }) => {
  const user = {
    name: "Ali Nassar",
    email: "ali.nassar@gmail.com",
    image: "public/img/itemcard/items.png",
  };

  return (
    <div className="profile-sidebar">
      <div className="user-info">
        <div className="user-image">
          <img
            src={user.image}
            alt={user.name}
            onError={(e) => {
              e.target.src = "";
            }}
          />
        </div>
        <h3 className="user-name">{user.name}</h3>
        <p className="user-email">{user.email}</p>
      </div>

      <div className="sidebar-buttons">
        <button
          className={`sidebar-btn ${activeTab === "profile" ? "active" : ""}`}
          onClick={() => onTabChange("profile")}
        >
          <BsPerson />
          <span>Profile</span>
        </button>

        <button
          className={`sidebar-btn ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => onTabChange("orders")}
        >
          <BsBox />
          <span>Orders</span>
        </button>
      </div>
    </div>
  );
};

export default ProfileSidebar;
