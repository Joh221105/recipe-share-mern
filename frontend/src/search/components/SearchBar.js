import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="h-[3rem] flex items-center w-full max-w-lg bg-white border border-gray-300 rounded-md shadow-md overflow-hidden">
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchQuery}
        onChange={handleSearchChange}
        onKeyDown={handleKeyPress}
        className="flex-grow p-3 text-gray-800 border-none focus:outline-none"
      />
      <span
        onClick={handleSearch}
        className="h-full hover:cursor-pointer p-3 text-white bg-[#E76F51] hover:bg-[#F4A261] focus:outline-none rounded-r-md"
      >
        <FaSearch className="w-5 h-full" />
      </span>
    </div>
  );
  
};

export default SearchBar;
