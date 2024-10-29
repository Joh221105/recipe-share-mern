import React from "react";
import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import Navbar from "../../common/components/Navbar";
import Footer from "../../common/components/Footer";

const SearchPage = () => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    if (!query) {
      // Navigate to search results with a keyword to fetch all recipes
      navigate(`/searchresult?query=all`);
    } else {
      navigate(`/searchresult?query=${query}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <Navbar />
      <div className="flex flex-grow flex-col items-center justify-center text-center px-4">
        <h1 className="text-7xl font-bold text-gray-800 mb-10 shadow-2xl">
          DISCOVER YOUR NEXT OBSESSION
        </h1>
        <SearchBar onSearch={handleSearch} />
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
