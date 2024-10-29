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

  return (
    <div className="h-[3rem] flex items-center w-full max-w-lg bg-white border border-gray-300 rounded-md shadow-md overflow-hidden">
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="flex-grow p-3 text-gray-800 border-none focus:outline-none "
      />
      <span
        onClick={handleSearch}
        className="h-full hover:cursor-pointer p-3 text-white bg-blue-600 hover:bg-blue-700 focus:outline-none rounded-r-md"
      >
        <FaSearch className="w-5 h-full" />
      </span>
    </div>
  );
};

export default SearchBar;
