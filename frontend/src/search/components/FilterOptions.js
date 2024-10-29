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
    setShowTags(false); // Close the filter options when applying filters
  };

  const toggleTagVisibility = () => {
    setShowTags(!showTags);
  };

  return (
    <div className={`p-4 bg-background rounded-lg ${showTags ? 'w-full' : 'w-1/4'} shadow-2xl my-10 text-center transition-all duration-300`}>
      <button
        onClick={toggleTagVisibility}
        className="mb-2 text-[#E76F51] hover:underline font-semibold"
      >
        {showTags ? "Hide Filters" : "Filter Results by Tags"}
      </button>
      {showTags && (
        <div>
          <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto pr-2">
            {tags.map((tag) => (
              <div
                key={tag}
                onClick={() => handleTagSelection(tag)}
                className={`flex items-center flex-shrink-0 p-2 cursor-pointer rounded-md border border-gray-300 transition-colors ${
                  selectedTags.includes(tag) ? 'bg-[#D9E6D9]' : 'bg-[#FAF3E0]'
                }`}
              >
                <span className="text-[#264653]">{tag}</span>
              </div>
            ))}
          </div>
          <button
            onClick={handleApplyFilters}
            className="mt-4 px-4 py-2 bg-[#E76F51] text-white rounded-md hover:bg-[#F4A261] transition-colors w-full"
          >
            Apply Filters
          </button>
        </div>
      )}
    
      {selectedTags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {selectedTags.map((tag) => (
            <span
              key={tag}
              onClick={() => handleTagSelection(tag)} 
              className="bg-[#D9E6D9] text-[#264653] rounded-full px-3 py-1 border border-gray-300 cursor-pointer transition-colors hover:bg-[#F4A261] hover:text-white"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterOptions;
