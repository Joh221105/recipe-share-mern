import React from "react";
import UserProfile from "../../components/UserProfile/UserProfile";
import Navbar from "../../../common/components/Navbar/Navbar";
import Footer from "../../../common/components/Footer/Footer";
import "./UserProfilePage.css";

const UserProfilePage = () => {
  return (
    <div>
      <Navbar />
      <UserProfile />
      <Footer />
    </div>
  );
};

export default UserProfilePage;
