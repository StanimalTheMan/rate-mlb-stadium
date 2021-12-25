// @ts-nocheck
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import Wrapper from "../styles/Search";
import { SearchIcon } from "./Icons";

function Search({ filterStadiums }) {
  const history = useHistory();
  const pathname = useLocation();

  function handleSubmit(event) {
    event.preventDefault();
    const searchQuery = event.target.elements.search.value;

    // if (!searchQuery.trim()) return;
    filterStadiums(searchQuery);
    history.push("/");
  }

  function handleChange(event) {
    event.preventDefault();
    const searchQuery = event.target.value;

    // if (!searchQuery.trim()) return;
    filterStadiums(searchQuery);
    history.push("/");
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          id="search"
          type="text"
          placeholder="Search"
        />
        <button aria-label="Search videos and channels" type="submit">
          <SearchIcon />
        </button>
      </form>
    </Wrapper>
  );
}

export default Search;
