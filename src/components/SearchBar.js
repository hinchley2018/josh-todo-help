import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ handleSearch, searchInput }) => {
  return (
    <div className="search-bar-container">
      <div className="search-input">
        <SearchIcon id="search-icon" />
        <input
          type="text"
          placeholder="Search Todo's"
          value={searchInput}
          onChange={(e) => handleSearch(e)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
