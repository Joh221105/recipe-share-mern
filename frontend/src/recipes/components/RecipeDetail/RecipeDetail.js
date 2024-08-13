import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./RecipeDetail.css";

const RecipeDetail = () => {
  const { recipeId } = useParams(); // gets recipeId from the URL parameters
  const [recipe, setRecipe] = useState(null); // stores recipe details
  const [authorName, setAuthorName] = useState(""); // stores the author's name

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // fetches recipe data by recipeId
        const response = await fetch(`http://localhost:5001/recipe/${recipeId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch recipe");
        }
        const data = await response.json();

        // parses ingredients, directions, and tags if they are not empty
        data.recipe.ingredients = JSON.parse(data.recipe.ingredients || "[]");
        data.recipe.directions = JSON.parse(data.recipe.directions || "[]");
        data.recipe.tags = JSON.parse(data.recipe.tags || "[]");

        setRecipe(data.recipe); // sets the fetched recipe data to the state

        // fetches author details using the author ID from the recipe data
        const userResponse = await fetch(`http://localhost:5001/user/${data.recipe.author}`);
        if (!userResponse.ok) {
          throw new Error("Failed to fetch user profile"); 
        }
        const userData = await userResponse.json();
        setAuthorName(userData.user.username); // Set the author's username to the state
      } catch (error) {
        console.error("Error fetching recipe or user:", error); 
      }
    };

    fetchRecipe(); 
  }, [recipeId]); // useEffect runs when recipeId changes

  // displays loading message while recipe data is being fetched
  if (!recipe) {
    return <div>Loading...</div>;
  }

  // destructures recipe data for conciseness
  const { title, description, tags, createdAt, ingredients, directions } = recipe;

  // generates a list of ingredients
  const ingredientsList = ingredients.map((ingredient, index) => (
    <li key={index}>
      {ingredient.name}: {ingredient.amount} {ingredient.measurement}
    </li>
  ));

  // generates a list of directions
  const directionsList = directions.map((step, index) => (
    <li key={index}>{step}</li>
  ));

  // sets the image URL if an image exists, otherwise use an empty string
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