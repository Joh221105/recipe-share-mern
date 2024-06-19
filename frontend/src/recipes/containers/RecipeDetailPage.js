import React from "react";
import RecipeDetail from "../components/RecipeDetail";
import Navbar from "../../common/components/Navbar";
import Footer from "../../common/components/Footer";
import recipeData from "../../recipeData";

const RecipeDetailPage = () => {
  return (
    <div>
      <Navbar />
      <RecipeDetail recipe={recipeData[0]} />
      <Footer />
    </div>
  );
};

export default RecipeDetailPage;
