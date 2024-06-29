import React, { useState } from "react";
import "./SearchBar.css"; 
import searchIcon from "../../../images/search.png"

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery); 
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button className="search-button" onClick={handleSearch}>
        <img src={searchIcon} alt="Search" />
      </button>
    </div>
  );
};

export default SearchBar;