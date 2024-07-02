import React, { useState, useEffect } from "react";
import "./SearchResultPage.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchResults from "../../components/SearchResults/SearchResults";
import recipeData from "../../../data/recipeData";
import { useLocation } from "react-router-dom";
import Navbar from "../../../common/components/Navbar/Navbar";
import Footer from "../../../common/components/Footer/Footer";

const SearchResultPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  const [matchingRecipes, setMatchingRecipes] = useState([]);

  useEffect(() => {
    const filteredRecipes = recipeData.filter((recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    setMatchingRecipes(filteredRecipes);
  }, [query]);

  const handleSearch = (searchQuery) => {
    const filteredRecipes = recipeData.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setMatchingRecipes(filteredRecipes);
  };

  return (
    <div id="search-result-page-container">
      <Navbar />
      <SearchBar onSearch={handleSearch} initialQuery={query} />
      <SearchResults matchingRecipes={matchingRecipes} />
      <Footer />
    </div>
  );
};

export default SearchResultPage;