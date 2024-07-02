import React from "react";
import "./SearchPage.css";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../common/components/Navbar/Navbar"
import Footer from "../../../common/components/Footer/Footer"

const SearchPage = () => {
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/searchresult?query=${query}`);
  };

  return (
    <div id="search-page-container">
      <Navbar/>
      <SearchBar onSearch={handleSearch} />
      <Footer/>
    </div>
  );
};

export default SearchPage;

