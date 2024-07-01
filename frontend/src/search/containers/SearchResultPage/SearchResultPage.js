import React, { useState } from 'react';
import './SearchResultPage.css';
import FilterOptions from '../../components/FilterOptions/FilterOptions';
import FilterResult from '../../components/FilterResult/FilterResult';
import Navbar from '../../../common/components/Navbar/Navbar';
import SearchResults from '../../components/SearchResults/SearchResults';
import Footer from '../../../common/components/Footer/Footer';

const SearchResultPage = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const toggleFilter = () => {
    setShowFilter((prevFilter) => !prevFilter);
  };

  const handleApplyFilters = (filters) => {
    setSelectedFilters(filters);
    setShowFilter(false);
  };

  return (
    <div id="search-result-page-container">
      <Navbar />
      <button onClick={toggleFilter}>Filter Search</button>
      {showFilter && (
        <FilterOptions
          selectedFilters={selectedFilters}
          applyFilters={handleApplyFilters}
        />
      )}
      <FilterResult selectedFilters={selectedFilters} />
      <SearchResults />
      <Footer />
    </div>
  );
};

export default SearchResultPage;