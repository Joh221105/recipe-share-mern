import React, { useState } from "react";
import tags from "../../../data/tags"; 
import "./FilterOptions.css"; 

const FilterOptions = ({ setFilteredRecipes }) => {
  // states to manage selected tags and visibility of the tag selection UI
  const [selectedTags, setSelectedTags] = useState([]);
  const [showTags, setShowTags] = useState(false);

  // handles the selection or deselection of a tag
  const handleTagSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      // If the tag is already selected, remove it from selectedTags
      setSelectedTags(
        selectedTags.filter((selectedTag) => selectedTag !== tag)
      );
    } else {
      // add the tag to the selectedTags if not selected already
      setSelectedTags([...selectedTags, tag]);
    }
  };

  // fetch and apply the filters based on the selected tags
  const applyFilters = async (selectedTags) => {
    try {
      // creates a query string from the selected tags
      const query = selectedTags.join(",");

      // fetches filtered recipes from the backend based on the selected tags
      const response = await fetch(
        `http://localhost:5001/recipe/filter?tags=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch filtered recipes");
      }

      // parses the JSON response and update the filtered recipes state
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