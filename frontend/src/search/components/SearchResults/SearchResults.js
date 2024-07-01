import React from "react";
import "./SearchResults.css";
import RecipeCard from "../../../common/components/RecipeCard/RecipeCard";

const SearchResults = ({ matchingRecipes }) => {
  let matchingMapResult = matchingRecipes.map((recipe) => {
    return (
      <RecipeCard
        key={recipe.id}
        title={recipe.title}
        author={recipe.author}
        tags={recipe.tags}
        description={recipe.description}
        img={recipe.img}
      />
    );
  });

  return <div className="search-results">{matchingMapResult}</div>;
};

export default SearchResults;