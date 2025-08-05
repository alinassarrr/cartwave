import React, { useRef, useState } from "react";
// import axios from "axios";
import Button from "../Button";
import "./styles.css";

const ProfilePictureSettings = () => {
  const fileInputRef = useRef(null);
  const [profilePic, setProfilePic] = useState(null);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setProfilePic(base64);

      /*
      axios.post("api", {
        image: base64,
      })
      .then(res => console.log("Uploaded:", res.data))
      .catch(err => console.error("Upload failed:", err));
      */
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setProfilePic(null);

    /*
    axios.delete("api")
      .then(res => console.log("Removed:", res.data))
      .catch(err => console.error("Remove failed:", err));
    */
  };

  return (
    <div className="profile-picture-settings">
      <h3>Profile Picture</h3>
      <div className="profile-picture-preview">
        {profilePic ? (
          <img src={profilePic} alt="Profile" />
        ) : (
          <div className="placeholder">No Picture</div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      <div className="button-row">
        <Button text="Upload New" onClick={handleUploadClick} />
        <Button text="Remove" onClick={handleRemove} className="remove-btn" />
      </div>
    </div>
  );
};

export default ProfilePictureSettings;
