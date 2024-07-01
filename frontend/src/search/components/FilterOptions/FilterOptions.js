import React, { useState } from 'react';
import tags from '../../../data/tags';
import './FilterOptions.css';

const FilterOptions = ({applyFilters }) => {
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagSelection = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleApplyFilters = () => {
    applyFilters(selectedTags);
  };

  return (
    <div className="filter-options">
      <h2>Filter by Tags</h2>
      {tags.map((tag) => (
        <div key={tag}>
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
      <button onClick={handleApplyFilters}>Apply Filters</button>
    </div>
  );
};

export default FilterOptions;