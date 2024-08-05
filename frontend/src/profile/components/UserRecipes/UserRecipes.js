import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import "./UserRecipes.css";

const UserRecipes = () => {
  const { userId } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchUserRecipes = async () => {
      if (!userId) {
        return;
      }

      try {
        // Fetch user's profile
        const userResponse = await fetch(`http://localhost:5001/user/${userId}`);
        if (!userResponse.ok) {
          const errorMessage = await userResponse.text();
          throw new Error(`Failed to fetch user profile: ${errorMessage}`);
        }
        const userData = await userResponse.json();

        if (userData && userData.user) {
          setAuthor(userData.user.username);

          const recipeIds = userData.user.recipes;

          // Fetch all recipes
          const recipeData = await fetchAllRecipes(recipeIds);
          setRecipes(recipeData);
        } else {
          throw new Error("User data does not contain recipes array");
        }
      } catch (error) {
        console.error("Error fetching user recipes:", error);
      }
    };

    fetchUserRecipes();
  }, [userId]);

  // Fetches recipes by recipeId in user's created recipe array
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
      return Promise.all(recipePromises);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      return [];
    }
  };

  return (
    <div className="user-recipes-container">
      {recipes.length > 0 ? (
        recipes.map((recipeObject, index) => {
          const recipe = recipeObject.recipe;
          return (
            <div key={recipe._id} className="recipe-card">
              <h1>{recipe.title || "No Title"}</h1>
              <h2>{author || "Unknown Author"}</h2>
              <p>{recipe.description || "No Description"}</p>
              <p>{recipe.createdAt || "No Date Created"}</p>
              <img alt="recipe" src={recipe.img || "default-image-url"} />
              <p className="tags">
                {recipe.tags && recipe.tags.length > 0 ? (
                  recipe.tags.map((tag, index) => (
                    <span key={index}>{JSON.parse(tag).join(', ')}</span>
                  ))
                ) : (
                  <span>No Tags</span>
                )}
              </p>
            </div>
          );
        })
      ) : (
        <p>No recipes found. Create one now!</p>
      )}
    </div>
  );
};

export default UserRecipes;