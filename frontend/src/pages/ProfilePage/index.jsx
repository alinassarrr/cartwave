import React, { useState } from "react";
import ProfileSidebar from "../../components/UserProfile/ProfileSideBar/ProfileSideBar";
import ProfileForm from "../../components/UserProfile/ProfileForm/ProfileForm";
import ProfileStats from "../../components/UserProfile/ProfileStats/ProfileStats";
import OrdersList from "../../components/UserProfile/OrderList/OrderList";
import "./styles.css";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="profile-page">
      <div className="container profile-container">
        <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="profile-content">
          {activeTab === "profile" && (
            <>
              <ProfileForm />
              <ProfileStats />
            </>
          )}
          {activeTab === "orders" && <OrdersList />}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
