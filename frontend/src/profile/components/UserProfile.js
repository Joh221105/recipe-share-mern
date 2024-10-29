import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import defaultProfilePic from "../../images/defaultpfp.jpg";
import UserRecipes from "./UserRecipes"; 

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const baseUrl = "http://localhost:5001/uploads/";

  if (!user) {
    return <div>Loading...</div>;
  }

  // Full image URL
  const profilePicUrl = user.image ? `${baseUrl}${user.image}` : defaultProfilePic;

  return (
    <div className="min-h-screen flex flex-col bg-[#D9E6D9]">
      <div className="flex flex-grow p-4">
        <div className="flex flex-col w-1/3 bg-white shadow-md rounded-lg text-center p-4 border border-gray-200">
          <img
            alt="profile"
            src={profilePicUrl}
            className="w-36 h-36 rounded-full object-cover mx-auto my-3 border-4 border-text"
          />
          <h1 className="text-2xl font-bold text-text my-2">{user.username}</h1>
          <p className="text-[#4A4A4A] my-3">{user.email}</p> 
          <Link to="/edit-profile" className="text-blue-600 font-semibold hover:underline my-3 block border-b-2 w-[75%] self-center border-blue-200 pb-5">
            Edit Profile
          </Link>
          <p className="text-[#4A4A4A] text-lg p-4 border-2 border-gray-300 mt-2 rounded-md">{user.biography}</p> 
        </div>
        <div className="flex-grow ml-4">
          <div className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200">
            <h2 className="text-xl font-semibold mb-2 text-text">Recommended Recipes</h2>
            <p className="text-[#4A4A4A]">Placeholder for recommended recipes...</p> 
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <h2 className="text-xl font-semibold mb-5 text-text">Your Recipes</h2>
            <UserRecipes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
