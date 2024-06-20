import React from "react";
import RecipeForm from "../components/RecipeForm";
import Navbar from "../../common/components/Navbar";
import Footer from "../../common/components/Footer";

const RecipeFormPage = () => {
  return (
    <div>
      <Navbar />
      <RecipeForm />
      <Footer />
    </div>
  );
};

export default RecipeFormPage;
