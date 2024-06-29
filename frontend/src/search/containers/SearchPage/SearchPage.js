import React from 'react'
import SearchBar from '../../components/SearchBar/SearchBar'
import Navbar from '../../../common/components/Navbar/Navbar'
import Footer from '../../../common/components/Footer/Footer'

const SearchPage = () => {
  return (
    <div id="search-page-container">
        <Navbar/>
        <SearchBar/>
        <Footer/>
    </div>
  )
}

export default SearchPage