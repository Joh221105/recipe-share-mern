import React, { useState, useEffect } from "react";
import "./SearchResultPage.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import SearchResults from "../../components/SearchResults/SearchResults";
import { useLocation } from "react-router-dom";
import Navbar from "../../../common/components/Navbar/Navbar";
import Footer from "../../../common/components/Footer/Footer";
import FilterOptions from "../../../search/components/FilterOptions/FilterOptions";

const SearchResultPage = () => {
  // gets the search query from the URL parameters
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query") || "";

  // stores recipes that match the search query
  const [matchingRecipes, setMatchingRecipes] = useState([]);
  // stores recipes that match the selected filters
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  // handles any errors during the fetch process
  const [error, setError] = useState(null);

  useEffect(() => {
    // fetches recipes based on the search query
    if (query) {
      fetchRecipes(query);
    }
  }, [query]);

  // function to fetch recipes based on the search query
  const fetchRecipes = async (searchQuery) => {
    setError(null); // Reset any previous errors
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
        // updates matchingRecipes with the fetched recipes
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

  // handles search input from the SearchBar component
  const handleSearch = (searchQuery) => {
    fetchRecipes(searchQuery);
  };

  return (
    <div id="search-result-page-container">
      <Navbar />
      <SearchBar onSearch={handleSearch} initialQuery={query} />
      {error && <p>{error}</p>}
      <FilterOptions setFilteredRecipes={setFilteredRecipes} />
      <SearchResults
        matchingRecipes={matchingRecipes}
        filteredRecipes={filteredRecipes}
      />
      <Footer />
    </div>
  );
};

export default SearchResultPage;
