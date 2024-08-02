import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import "./UserProfile.css";
import defaultProfilePic from "../../../images/defaultpfp.jpg";

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile-container">
      <Link to="/edit-profile">Edit Profile</Link>
      <img
        id="profile-pic"
        alt="profile"
        src={user.image || defaultProfilePic}
      />
      <h1>{user.username}</h1>
      <p>{user.email}</p>
      <p className="bio">{user.biography}</p>
    </div>
  );
};

export default UserProfile;
