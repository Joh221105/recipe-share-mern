import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import defaultProfilePic from "../../images/defaultpfp.jpg";
import UserRecipes from "./UserRecipes"; 
import UserSavedRecipes from "./UserSavedRecipes";
import Accordion from "../../common/components/Accordion"
const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const baseUrl = "http://localhost:5001/uploads/";

  if (!user) {
    return <div>Loading...</div>;
  }

  const profilePicUrl = user.image ? `${baseUrl}${user.image}` : defaultProfilePic;

  return (
    <div className="min-h-screen flex flex-col bg-[#D9E6D9]">
      <div className="flex flex-grow p-4">
        {/* Profile Card */}
        <div className="flex flex-col w-1/3 bg-white shadow-lg rounded-lg text-center p-6 border border-gray-200">
          <img
            alt="profile"
            src={profilePicUrl}
            className="w-36 h-36 rounded-full object-cover mx-auto my-4 border-4 border-text"
          />
          <h1 className="text-2xl font-bold text-text my-2">{user.username}</h1>
          <p className="text-gray-700 my-2">{user.email}</p>
          <Link
            to="/edit-profile"
            className="text-blue-600 font-semibold hover:underline my-4 block border-b-2 w-3/4 mx-auto border-blue-200 pb-2"
          >
            Edit Profile
          </Link>
          <p className="text-gray-700 text-lg p-4 border border-gray-300 rounded-md">
            {user.biography}
          </p>
        </div>
  
        {/* Recipes Section */}
        <div className="flex-grow ml-4">
          <div className="space-y-4 bg-accent rounded-lg">
            <Accordion title="Saved Recipes">
              <UserSavedRecipes />
            </Accordion>
          </div>
          <div className=" space-y-4 bg-primary rounded-lg">
          <Accordion title="Your Recipes">
              <UserRecipes />
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default UserProfile;
