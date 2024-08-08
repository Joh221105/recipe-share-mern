import React, { useEffect, useState } from "react";
import "./SearchResults.css";
import RecipeCard from "../../../common/components/RecipeCard/RecipeCard";

const SearchResults = ({ matchingRecipes }) => {
  const [recipesWithAuthors, setRecipesWithAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthorNames = async () => {
      const updatedRecipes = await Promise.all(
        matchingRecipes.map(async (recipe) => {
          const userResponse = await fetch(`http://localhost:5001/user/${recipe.author}`);
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

  const matchingMapResult = recipesWithAuthors.map((recipe) => (
    <RecipeCard
      key={recipe.id}
      title={recipe.title}
      author={recipe.authorName}
      tags={recipe.tags}
      description={recipe.description}
      img={recipe.img}
    />
  ));

  return <div className="search-results">{matchingMapResult}</div>;
};

export default SearchResults;