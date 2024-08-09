import React, { useEffect, useState } from "react";
import "./SearchResults.css";
import RecipeCard from "../../../common/components/RecipeCard/RecipeCard";

const SearchResults = ({ matchingRecipes = [], filteredRecipes = [] }) => {
  const [recipesWithAuthors, setRecipesWithAuthors] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const combinedRecipes = matchingRecipes.length && filteredRecipes.length
      ? matchingRecipes.filter(recipe =>
          filteredRecipes.some(filteredRecipe => filteredRecipe._id === recipe._id)
        )
      : matchingRecipes.length
      ? matchingRecipes
      : filteredRecipes;

    if (!combinedRecipes || combinedRecipes.length === 0) {
      if (!noResults) {
        setNoResults(true);
        setRecipesWithAuthors([]); 
      }
      return; 
    }

    const fetchAuthorNames = async () => {
      const updatedRecipes = await Promise.all(
        combinedRecipes.map(async (recipe) => {
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
      setNoResults(false); 
    };

    fetchAuthorNames();
  }, [matchingRecipes, filteredRecipes, noResults]); 

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

  return (
    <div className="search-results">
      {noResults ? <p>No recipes found.</p> : matchingMapResult}
    </div>
  );
};

export default SearchResults;