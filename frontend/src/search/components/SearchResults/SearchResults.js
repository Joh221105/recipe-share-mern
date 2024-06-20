import React from "react";
import './SearchResults.css'

const SearchResults = ({ results }) => {
  return (
    <div className="search-results">
      {results.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          {/* Display other recipe details */}
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
