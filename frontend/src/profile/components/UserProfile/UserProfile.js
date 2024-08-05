import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";
import "./UserProfile.css";
import defaultProfilePic from "../../../images/defaultpfp.jpg";


const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const baseUrl = "http://localhost:5001/"

  if (!user) {
    return <div>Loading...</div>;
  }

  // full image url
  const profilePicUrl = user.image ? `${baseUrl}${user.image}` : defaultProfilePic;

  return (
    <div className="user-profile-container">
      <Link to="/edit-profile">Edit Profile</Link>
      <img id="profile-pic" alt="profile" src={profilePicUrl} />
      <h1>{user.username}</h1>
      <p>{user.email}</p>
      <p className="bio">{user.biography}</p>
    </div>
  );
};

export default UserProfile;