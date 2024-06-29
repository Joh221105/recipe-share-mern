import React, {useState} from 'react'
import './SearchResultPage.css'
import FilterOptions from '../../components/FilterOptions/FilterOptions'
import Navbar from '../../../common/components/Navbar/Navbar'
import Footer from '../../../common/components/Footer/Footer'

const SearchResultPage = () => {

  const[showFilter, setShowFilter] = useState(false)

  const toggleFilter = () => {
    setShowFilter(prevFilter => !prevFilter)
  }
  return (
    <div id="search-result-page-container">
      <Navbar/>
      <button onClick ={toggleFilter}>Filter Search</button>
      {showFilter ? <FilterOptions/> : ""}
      <Footer/>
    </div>
  )
}

export default SearchResultPage