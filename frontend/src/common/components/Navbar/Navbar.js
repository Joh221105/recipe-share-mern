import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import searchIcon from "../../../images/search.png";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    // Handle search functionality here
    console.log("Search clicked with query:", searchQuery);
  };

  return (
    <div className="navbar">
      <div className="logo">Recipe Circle</div>
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
      <div className="menu">
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/recipe">Recipe</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;