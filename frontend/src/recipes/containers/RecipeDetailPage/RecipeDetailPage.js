import React from "react";
import RecipeDetail from "../../components/RecipeDetail/RecipeDetail";
import Navbar from "../../../common/components/Navbar/Navbar";
import Footer from "../../../common/components/Footer/Footer";
import recipeData from "../../../data/recipeData";
import './RecipeDetailPage.css'

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
