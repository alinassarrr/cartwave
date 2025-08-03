import React from "react";
import SectionHeader from "../SectionHeader";
import ProfilePictureSettings from "../ProfilePictureSettings";
import AccountInfoForm from "../AccountInfoForm";
import "./styles.css";

const SettingsPageOverview = () => {
  return (
    <div className="settings-overview">
      <SectionHeader
        title="Account Settings"
        subtitle="Update your profile information and account preferences"
      />

      <div className="settings-content">
        <ProfilePictureSettings />
        <AccountInfoForm />
      </div>
    </div>
  );
};

export default SettingsPageOverview;
