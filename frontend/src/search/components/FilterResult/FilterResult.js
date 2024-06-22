import React, {useState} from 'react'
import './FilterResult.css'
import '../FilterOptions/FilterOptions'

const FilterResult = () => {

    const [showFilterModal, setShowFilterModal] = useState(false);
    const [selectedFilters, setSelectedFilters] = useState([]);

    const handleFilterModal = () => {
        setShowFilterModal((prevShowFilterModal) => !prevShowFilterModal);
      };
    
      const handleApplyFilters = (filters) => {
        setSelectedFilters(filters);
        setShowFilterModal(false);
      };

  return (
    <div>
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
      </div>
      {showFilterModal && <FilterOptions applyFilters={handleApplyFilters} />}
    </div>
  )
}

export default FilterResult