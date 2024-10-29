import React from "react";
import UserProfile from "../components/UserProfile";
import Navbar from "../../common/components/Navbar";
import Footer from "../../common/components/Footer";

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
