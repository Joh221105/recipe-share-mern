import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RecipeDetail.css";

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [authorName, setAuthorName] = useState("");

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:5001/recipe/${recipeId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }
        const data = await response.json();
        data.recipe.ingredients = JSON.parse(data.recipe.ingredients || "[]");
        data.recipe.directions = JSON.parse(data.recipe.directions || "[]");
        data.recipe.tags = JSON.parse(data.recipe.tags || "[]"); 

        setRecipe(data.recipe);

        const userResponse = await fetch(`http://localhost:5001/user/${data.recipe.author}`);
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const userData = await userResponse.json();
        setAuthorName(userData.user.username);
      } catch (error) {
        console.error("Error fetching recipe or user:", error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const { title, description, img, tags, createdAt, ingredients, directions } = recipe;

  const ingredientsList = ingredients.map((ingredient, index) => (
    <li key={index}>
      {ingredient.name}: {ingredient.amount} {ingredient.measurement}
    </li>
  ));

  const directionsList = directions.map((step, index) => (
    <li key={index}>{step}</li>
  ));

  const imageUrl = recipe.img ? `http://localhost:5001/${recipe.img}` : "";

  return (
    <div className="recipe-details-container">
      <img src={imageUrl} alt={title} />
      <h2>{title}</h2>
      <p>Author: {authorName}</p>
      <p>{description}</p>
      <p>Tags: {Array.isArray(tags) ? tags.join(", ") : tags}</p>
      <p>Date Created: {new Date(createdAt).toLocaleDateString()}</p>

      <h3>Ingredients:</h3>
      <ul>{ingredientsList}</ul>

      <h3>Directions:</h3>
      <ol>{directionsList}</ol>
    </div>
  );
};

export default RecipeDetail;