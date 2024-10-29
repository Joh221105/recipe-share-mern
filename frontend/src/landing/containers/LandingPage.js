import React from "react";
import About from "../components/About";
import RecipeExample from "../components/RecipeExample";
import Navbar from "../../common/components/Navbar";
import Footer from "../../common/components/Footer";
import landingImage from "../../images/landingImage.jpg";

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
          <h1
            className="p-[6rem] border-4 border-accent text-text font-bold text-7xl shadow-2xl w-[25rem] h-[25rem] flex items-center justify-center rounded-full"
            style={{
              background: "radial-gradient(circle, #F4A261, #E76F51)",
            }}
          >
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
