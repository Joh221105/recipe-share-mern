import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import RecipeCard from "../../common/components/RecipeCard";

const UserSavedRecipes = () => {
  const { userId } = useContext(AuthContext); // gets the userId from AuthContext
  const [recipes, setRecipes] = useState([]); // stores user recipes

  useEffect(() => {
    const fetchUserRecipes = async () => {
      if (!userId) {
        return; // exits without error if no userId is found
      }

      try {
        // Fetch user's profile by ID
        const userResponse = await fetch(`http://localhost:5001/user/${userId}`);
        if (!userResponse.ok) {
          const errorMessage = await userResponse.text();
          throw new Error(`Failed to fetch user profile: ${errorMessage}`);
        }

        const userData = await userResponse.json();
        if (userData && userData.user) {
          const recipeIds = userData.user.saved; // Get the array of recipe IDs

          // Fetch all recipes
          const recipeData = await fetchAllRecipes(recipeIds);
          setRecipes(recipeData); // Store fetched recipes in state
        } else {
          throw new Error("User data does not contain recipes array");
        }
      } catch (error) {
        console.error("Error fetching user recipes:", error);
      }
    };

    fetchUserRecipes();
  }, [userId]); // Re-runs useEffect if userId changes

  // Fetches recipes by recipeId in user's saved recipe array
  const fetchAllRecipes = async (recipeIds) => {
    try {
      const recipePromises = recipeIds.map(async (recipeId) => {
        const response = await fetch(`http://localhost:5001/recipe/${recipeId}`);
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Failed to fetch recipe with ID: ${recipeId}: ${errorMessage}`);
        }

        const recipeData = await response.json();
        const authorId = recipeData.recipe.author; // Get the author's userId

        // Fetch the author's profile using their userId
        const authorResponse = await fetch(`http://localhost:5001/user/${authorId}`);
        if (!authorResponse.ok) {
          const errorMessage = await authorResponse.text();
          throw new Error(`Failed to fetch author with ID: ${authorId}: ${errorMessage}`);
        }

        const authorData = await authorResponse.json();
        return { ...recipeData.recipe, author: authorData.user.username }; // Add the username to the recipe object
      });

      return Promise.all(recipePromises); // Waits for all recipes to be fetched
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return []; // Returns empty array on error
    }
  };

  return (
    <div className="user-recipes-container">
      {recipes.length > 0 ? (
        recipes.map((recipe) => {
          const imageUrl = recipe.img ? `http://localhost:5001/${recipe.img}` : "";
          
          return (
            <RecipeCard
              key={recipe._id}
              recipeId={recipe._id}
              title={recipe.title || "No Title"}
              author={recipe.author || "Unknown Author"} 
              tags={recipe.tags ? recipe.tags.map(tag => JSON.parse(tag)).flat() : []}
              description={recipe.description || "No Description"}
              img={imageUrl}
            />
          );
        })
      ) : (
        <p>No saved recipes, go find some now!</p>
      )}
    </div>
  );
};

export default UserSavedRecipes;
