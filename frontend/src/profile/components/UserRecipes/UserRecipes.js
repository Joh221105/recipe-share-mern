import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import RecipeCard from "../../../common/components/RecipeCard/RecipeCard";
import "./UserRecipes.css";

const UserRecipes = () => {
  const { userId } = useContext(AuthContext); // gets the userId from AuthContext
  const [recipes, setRecipes] = useState([]); // stores user recipes
  const [author, setAuthor] = useState(""); // stores the author's name

  useEffect(() => {
    const fetchUserRecipes = async () => {
      if (!userId) {
        return; // exits without error if no userId is found
      }

      try {
        // fetches user's profile by id
        const userResponse = await fetch(`http://localhost:5001/user/${userId}`);
        if (!userResponse.ok) {
          const errorMessage = await userResponse.text();
          throw new Error(`Failed to fetch user profile: ${errorMessage}`);
        }
        const userData = await userResponse.json();

        if (userData && userData.user) {
          setAuthor(userData.user.username); // sets the author's name

          const recipeIds = userData.user.recipes; // gets the array of recipe IDs

          // fetches all recipes
          const recipeData = await fetchAllRecipes(recipeIds);
          setRecipes(recipeData); // stores fetched recipes in state
        } else {
          throw new Error("User data does not contain recipes array");
        }
      } catch (error) {
        console.error("Error fetching user recipes:", error);
      }
    };

    fetchUserRecipes(); 
  }, [userId]); // re-runs useEffect if userId changes

  // fetches recipes by recipeId in user's created recipe array
  const fetchAllRecipes = async (recipeIds) => {
    try {
      const recipePromises = recipeIds.map(async (recipeId) => {
        const response = await fetch(`http://localhost:5001/recipe/${recipeId}`);
        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Failed to fetch recipe with ID: ${recipeId}: ${errorMessage}`);
        }
        return response.json(); 
      });
      return Promise.all(recipePromises); // waits for all recipes to be fetched
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return []; // returns empty array on error
    }
  };

  return (
    <div className="user-recipes-container">
      {recipes.length > 0 ? (
        recipes.map((recipeObject) => {
          const recipe = recipeObject.recipe;
          const imageUrl = recipe.img ? `http://localhost:5001/${recipe.img}` : "";
          return (
            <RecipeCard
              key={recipe._id}
              recipeId={recipe._id}
              title={recipe.title || "No Title"}
              author={author || "Unknown Author"}
              tags={recipe.tags ? recipe.tags.map(tag => JSON.parse(tag)).flat() : []}
              description={recipe.description || "No Description"}
              img={imageUrl}
            />
          );
        })
      ) : (
        <p>No recipes found. Create one now!</p>
      )}
    </div>
  );
};

export default UserRecipes;