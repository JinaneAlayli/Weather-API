import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ SearchByCity }) => {
  const [input, setInput] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        SearchByCity(input);
      }}
    >
      <input
        type="text"
        placeholder="Search city..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit">⌕</button>
    </form>
  );
};

export default SearchBar;