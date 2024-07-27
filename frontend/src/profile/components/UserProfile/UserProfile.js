import React, { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext"; 
import './UserProfile.css';

const UserProfile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile-container">
      {/* <img alt="profile" src={user.profileImage} />  */}
      <h1>{user.username}</h1>
      {/* <img alt="cover" src={user.coverImg} className="cover-image" /> */}
      <p>{user.email}</p>
      {/* <p className="bio">{user.biography}</p> */}
    </div>
  );
};

export default UserProfile;