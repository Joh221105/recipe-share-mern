import React, { useState } from "react";
import tags from "../../../data/tags";
import "./FilterOptions.css";

const FilterOptions = ({ applyFilters }) => {
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