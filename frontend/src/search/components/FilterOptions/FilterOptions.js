import React, { useState } from "react";
import tags from "../../../data/tags";
import "./FilterOptions.css";

const FilterOptions = ({setFilteredRecipes}) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTags, setShowTags] = useState(false);

  const handleTagSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const applyFilters = async (selectedTags) => {
    try {
      const query = selectedTags.join(",");

      const response = await fetch(`http://localhost:5001/recipe/filter?tags=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error("Failed to fetch filtered recipes");
      }

      const data = await response.json();
      setFilteredRecipes(data.recipes); 
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const handleApplyFilters = () => {
    applyFilters(selectedTags);
  };

  const toggleTagVisibility = () => {
    setShowTags(!showTags);
  };

  return (
    <div className="filter-options">
      <button onClick={toggleTagVisibility}>
        {showTags ? "Hide Filters" : "Filter Results by Tags"}
      </button>
      {showTags && (
        <div>
          <div className="tags-container">
            {tags.map((tag) => (
              <div key={tag} className="tag-item">
                <label>
                  <input
                    type="checkbox"
                    value={tag}
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagSelection(tag)}
                  />
                  {tag}
                </label>
              </div>
            ))}
          </div>
          <button onClick={handleApplyFilters}>Apply Filters</button>
        </div>
      )}
    </div>
  );
};

export default FilterOptions;