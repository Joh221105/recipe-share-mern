import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const RecipeDetail = () => {
  const { recipeId } = useParams(); // gets recipeId from the URL parameters
  const [recipe, setRecipe] = useState(null); // stores recipe details
  const [authorName, setAuthorName] = useState(""); // stores the author's name

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // fetches recipe data by recipeId
        const response = await fetch(
          `http://localhost:5001/recipe/${recipeId}`
        );
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
        const userResponse = await fetch(
          `http://localhost:5001/user/${data.recipe.author}`
        );
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
    return <div className="text-center text-text">Loading...</div>;
  }

  // destructures recipe data for conciseness
  const { title, description, tags, createdAt, ingredients, directions } =
    recipe;

  // generates a list of ingredients
  const ingredientsList = ingredients.map((ingredient, index) => (
    <li key={index} className="text-text">
      {ingredient.name}: {ingredient.amount} {ingredient.measurement}
    </li>
  ));

  // generates a list of directions
  const directionsList = directions.map((step, index) => (
    <li key={index} className="text-text">{step}</li>
  ));

  // sets the image URL if an image exists, otherwise use an empty string
  const imageUrl = recipe.img ? `http://localhost:5001/${recipe.img}` : "";

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white border-2 border-[#2A9D8F] shadow-2xl rounded-lg my-10">
      <img src={imageUrl} alt={title} className="w-full h-80 object-cover rounded-lg mb-6" />
      <h2 className="text-2xl font-bold text-[#264653] uppercase border-b-2 py-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
        <div className="p-4 bg-[#D9E6D9] rounded-lg shadow-inner">
          <p className="text-[#264653] font-semibold">Author:</p>
          <p className="text-[#264653] font-light">{authorName}</p>
        </div>
        <div className="p-4 bg-[#D9E6D9] rounded-lg shadow-inner">
          <p className="text-[#264653] font-semibold">Date Created:</p>
          <p className="text-[#264653] font-light">{new Date(createdAt).toLocaleDateString()}</p>
        </div>
        <div className="col-span-1 sm:col-span-2 p-4 bg-[#D9E6D9] rounded-lg shadow-inner">
          <p className="text-[#264653] font-semibold">Tags:</p>
          <p className="text-[#264653] font-light">{Array.isArray(tags) ? tags.join(", ") : tags}</p>
        </div>
      </div>
      <div className="my-5 py-4 border-t border-b border-gray-300">
        <h3 className="text-lg font-semibold text-[#264653] mb-2">Description</h3>
        <p className="text-[#264653] leading-relaxed">{description || "No description provided."}</p>
      </div>
      <h3 className="text-xl font-semibold text-[#264653] mt-6 mb-2">Ingredients:</h3>
      <ul className="list-disc list-inside mb-4 text-[#264653]">{ingredientsList}</ul>
      <h3 className="text-xl font-semibold text-[#264653] mt-6 mb-2">Directions:</h3>
      <ol className="list-decimal list-inside text-[#264653]">{directionsList}</ol>
    </div>
  );
  
};

export default RecipeDetail;
