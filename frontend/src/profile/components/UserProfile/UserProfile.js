import React from "react";
import userData from "../../../data/userData";
import './UserProfile.css';

const UserProfile = () => {
  return (
    <div className="user-profile-container">
      <img alt="profile" src={userData[0].profileImage} />
      <h1>{userData[0].displayName}</h1>
      <img alt="cover" src={userData[0].coverImg} className="cover-image" />
      <p>{userData[0].email}</p>
      <p className="bio">{userData[0].bio}</p>
    </div>
  );
};

export default UserProfile;

//Remove user data and use database