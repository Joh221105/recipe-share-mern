import React from "react";
import RecipeDetail from "../components/RecipeDetail";
import Navbar from "../../common/components/Navbar";
import Footer from "../../common/components/Footer";

const RecipeDetailPage = () => {
  return (
    <div>
      <Navbar />
      <RecipeDetail/>
      <Footer />
    </div>
  );
};

export default RecipeDetailPage;
