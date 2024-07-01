import React, { useState } from "react";
import "./SearchPage.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import Navbar from "../../../common/components/Navbar/Navbar";
import Footer from "../../../common/components/Footer/Footer";
import SearchResults from "../../components/SearchResults/SearchResults";
import recipeData from "../../../data/recipeData";

const SearchPage = () => {
  const [matchingRecipes, setMatchingRecipes] = useState([]);

  const handleSearch = (query) => {
    const filteredRecipes = recipeData.filter((recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    setMatchingRecipes(filteredRecipes);
  };

  return (
    <div id="search-page-container">
      <Navbar />
      <SearchBar onSearch={handleSearch} />
      <SearchResults matchingRecipes={matchingRecipes} />
      <Footer />
    </div>
  );
};

export default SearchPage;