import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeDetail from "../../components/RecipeDetail/RecipeDetail";
import Navbar from "../../../common/components/Navbar/Navbar";
import Footer from "../../../common/components/Footer/Footer";
import "./RecipeDetailPage.css";

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
