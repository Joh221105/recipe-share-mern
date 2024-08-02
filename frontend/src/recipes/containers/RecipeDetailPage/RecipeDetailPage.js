import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RecipeDetail from "../../components/RecipeDetail/RecipeDetail";
import Navbar from "../../../common/components/Navbar/Navbar";
import Footer from "../../../common/components/Footer/Footer";
import "./RecipeDetailPage.css";

const RecipeDetailPage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/recipes/${recipeId}`
        );
        const data = await response.json();
        setRecipe(data.recipe);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  return (
    <div>
      <Navbar />
      {recipe && <RecipeDetail recipe={recipe} />}
      <Footer />
    </div>
  );
};

export default RecipeDetailPage;
