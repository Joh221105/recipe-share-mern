import React, { useEffect, useState } from "react";
import "./SearchResults.css";
import RecipeCard from "../../../common/components/RecipeCard/RecipeCard";

const SearchResults = ({ matchingRecipes }) => {
  const [recipesWithAuthors, setRecipesWithAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthorNames = async () => {
      const updatedRecipes = await Promise.all(
        matchingRecipes.map(async (recipe) => {
          const userResponse = await fetch(
            `http://localhost:5001/user/${recipe.author}`
          );
          if (!userResponse.ok) {
            throw new Error("Failed to fetch user profile");
          }
          const userData = await userResponse.json();
          const authorName = userData.user.username;

          return {
            ...recipe,
            authorName,
          };
        })
      );
      setRecipesWithAuthors(updatedRecipes);
    };

    fetchAuthorNames();
  }, [matchingRecipes]);

  const matchingMapResult = recipesWithAuthors.map((recipe) => {
    const imageUrl = recipe.img ? `http://localhost:5001/${recipe.img}` : "";

    return (
      <RecipeCard
        key={recipe._id}
        recipeId={recipe._id}
        title={recipe.title || "No Title"}
        author={recipe.authorName || "Unknown Author"}
        tags={
          recipe.tags ? recipe.tags.map((tag) => JSON.parse(tag)).flat() : []
        }
        description={recipe.description || "No Description"}
        img={imageUrl}
      />
    );
  });

  return <div className="search-results">{matchingMapResult}</div>;
};

export default SearchResults;
