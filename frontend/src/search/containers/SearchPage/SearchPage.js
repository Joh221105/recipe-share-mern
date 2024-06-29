import React from 'react';
import './SearchPage.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import Navbar from '../../../common/components/Navbar/Navbar';
import Footer from '../../../common/components/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
  const navigate = useNavigate();

  const handleSearch = (searchQuery) => {
    navigate(`/searchresult?query=${searchQuery}`);
  };

  return (
    <div id="search-page-container">
      <Navbar />
      <SearchBar onSearch={handleSearch} />
      <Footer />
    </div>
  );
};

export default SearchPage;