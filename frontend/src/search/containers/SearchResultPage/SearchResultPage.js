import React, { useState, useEffect } from "react";
import "./SearchResultPage.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchResults from "../../components/SearchResults/SearchResults";
import { useLocation } from "react-router-dom";
import Navbar from "../../../common/components/Navbar/Navbar";
import Footer from "../../../common/components/Footer/Footer";

const SearchResultPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  const [matchingRecipes, setMatchingRecipes] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      fetchRecipes(query);
    }
  }, [query]);

  const fetchRecipes = async (searchQuery) => {
    setError(null);
    setMatchingRecipes([]);
    try {
      const response = await fetch(
        `http://localhost:5001/recipe/search?keyword=${searchQuery}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMatchingRecipes(data.recipes);
      } else {
        console.error("Error response:", data);
        setError(data.message || "Failed to fetch recipes");
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to fetch recipes");
    }
  };

  const handleSearch = (searchQuery) => {
    fetchRecipes(searchQuery);
  };

  return (
    <div id="search-result-page-container">
      <Navbar />
      <SearchBar onSearch={handleSearch} initialQuery={query} />
      {error && <p>{error}</p>}
      <SearchResults matchingRecipes={matchingRecipes} />
      <Footer />
    </div>
  );
};

export default SearchResultPage;
