import React from "react";
import RecipeForm from "../../components/RecipeForm/RecipeForm";
import Navbar from "../../../common/components/Navbar/Navbar";
import Footer from "../../../common/components/Footer/Footer";
import "./RecipeFormPage.css";

const RecipeFormPage = () => {
  return (
    <div id="recipe-form-page-container">
      <Navbar />
      <RecipeForm />
      <Footer />
    </div>
  );
};

export default RecipeFormPage;
