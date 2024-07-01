import React from 'react';
import './FilterResult.css'

const FilterResult = ({ selectedFilters }) => {
  return (
    <div>
      <h2>Filtered Results</h2>
      <p>Selected Filters: {selectedFilters.join(', ')}</p>
    </div>
  );
};

export default FilterResult;