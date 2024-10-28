import React from "react";
import About from "../../components/About/About";
import RecipeExample from "../../components/RecipeExample/RecipeExample";
import Navbar from "../../../common/components/Navbar/Navbar";
import Footer from "../../../common/components/Footer/Footer";
import landingImage from "../../../images/landingImage.jpg";

const LandingPage = () => {
  return (
    <div className="relative">
      <Navbar />
      <div
        className="min-w-full h-screen"
        style={{
          backgroundImage: `url(${landingImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.9,
        }}
      >
        <div className="flex items-center justify-center h-full">
          <h1 className="bg-red-100 text-gray-800 font-bold text-7xl shadow-2xl p-10 rounded-md">
            RECIPE CIRCLE
          </h1>
        </div>
      </div>
      <About />
      <RecipeExample />
      <Footer />
    </div>
  );
};

export default LandingPage;
