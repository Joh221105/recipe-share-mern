import React, { useState } from "react";
import tags from "../../data/tags"; 

const FilterOptions = ({ setFilteredRecipes }) => {
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
      const response = await fetch(
        `http://localhost:5001/recipe/filter?tags=${encodeURIComponent(query)}`
      );

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
    <div className="p-4 bg-gray-100 rounded-lg w-full">
      <button
        onClick={toggleTagVisibility}
        className="mb-2 text-blue-600 hover:underline"
      >
        {showTags ? "Hide Filters" : "Filter Results by Tags"}
      </button>
      {showTags && (
        <div>
          <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto pr-2">
            {tags.map((tag) => (
              <div key={tag} className="flex items-center flex-shrink-0">
                <label className="flex items-center bg-gray-200 rounded-md p-2 cursor-pointer">
                  <input
                    type="checkbox"
                    value={tag}
                    checked={selectedTags.includes(tag)}
                    onChange={() => handleTagSelection(tag)}
                    className="mr-2"
                  />
                  {tag}
                </label>
              </div>
            ))}
          </div>
          <button
            onClick={handleApplyFilters}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default FilterOptions;
