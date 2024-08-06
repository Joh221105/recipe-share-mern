import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RecipeDetail.css";

const RecipeDetail = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/recipe/${recipeId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }
        const data = await response.json();
        data.recipe.ingredients = JSON.parse(data.recipe.ingredients);
        setRecipe(data.recipe);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  const {
    title,
    description,
    img,
    tags,
    author,
    createdAt,
    ingredients,
    directions,
  } = recipe;

  
  const ingredientsList = ingredients.map((ingredient, index) => (
    <li key={index}>
      {ingredient.name}: {ingredient.amount} {ingredient.measurement}
    </li>
  ));

  return (
    <div className="recipe-details-container">
      <img src={img} alt={title} />
      <h2>{title}</h2>
      <p>Author: {author}</p>
      <p>{description}</p>
      <p>Tags: {Array.isArray(tags) ? tags.join(", ") : tags}</p>
      <p>Date Created: {new Date(createdAt).toLocaleDateString()}</p>

      <h3>Ingredients:</h3>
      <ul>{ingredientsList}</ul>

      <h3>Directions:</h3>
      <ol>
        {Array.isArray(directions) && directions.length > 0 ? (
          directions.map((step, index) => <li key={index}>{step}</li>)
        ) : (
          <li>No directions listed</li>
        )}
      </ol>
    </div>
  );
};

export default RecipeDetail;
