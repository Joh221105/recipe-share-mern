import React, { useEffect, useState } from "react";
import RecipeCard from "../../common/components/RecipeCard";

const SearchResults = ({ matchingRecipes = [], filteredRecipes = [] }) => {
  // stores recipes with their corresponding author names
  const [recipesWithAuthors, setRecipesWithAuthors] = useState([]);
  // handles the case when no matching results are found
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    // combines the matching and filtered recipes
    const combinedRecipes = matchingRecipes.length && filteredRecipes.length
      ? matchingRecipes.filter(recipe =>
          filteredRecipes.some(filteredRecipe => filteredRecipe._id === recipe._id)
        )
      : matchingRecipes.length
      ? matchingRecipes
      : filteredRecipes;

    // handles the case when no recipes match the criteria
    if (!combinedRecipes || combinedRecipes.length === 0) {
      if (!noResults) {
        setNoResults(true);
        setRecipesWithAuthors([]); // clears any previous results
      }
      return; 
    }

    // fetch author names for the combined recipes
    const fetchAuthorNames = async () => {
      const updatedRecipes = await Promise.all(
        combinedRecipes.map(async (recipe) => {
          // fetch the author's user profile based on the recipe's author ID
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