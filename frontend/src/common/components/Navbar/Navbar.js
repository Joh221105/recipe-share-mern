import React, { useState } from "react";
import FilterOptions from "../FilterOptions/FilterOptions";
import { Link } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterModal = () => {
    setShowFilterModal((prevShowFilterModal) => !prevShowFilterModal);
  };

  const handleApplyFilters = (filters) => {
    setSelectedFilters(filters);
    setShowFilterModal(false);
  };

  return (
    <div className="navbar">
      <div className="logo">Logo</div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <button onClick={handleFilterModal}>Filter Recipes</button>
      <div className="selected-filters">
        {selectedFilters.length > 0 && (
          <div>
            Selected Filters:
            {selectedFilters.map((filter) => (
              <span key={filter} className="filter-item">
                {filter}{" "}
                <button
                  onClick={() =>
                    setSelectedFilters((prevFilters) =>
                      prevFilters.filter((f) => f !== filter)
                    )
                  }
                >
                  X
                </button>
              </span>
            ))}
          </div>
        )}
        <button>Search</button>
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
      {showFilterModal && <FilterOptions applyFilters={handleApplyFilters} />}
    </div>
  );
};

export default Navbar;
