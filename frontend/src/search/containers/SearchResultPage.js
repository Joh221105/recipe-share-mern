import React from "react";
import SearchResults from "../components/SearchResults";
import Navbar from "../../common/components/Navbar";
import Footer from "../../common/components/Footer";

const SearchResultPage = () => {
  return (
    <div>
      <Navbar />
      <SearchResults />
      <Footer />
    </div>
  );
};

export default SearchResultPage;
