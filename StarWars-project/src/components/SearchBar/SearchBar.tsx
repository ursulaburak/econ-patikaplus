// src/components/SearchBar/SearchBar.tsx
import React from "react";
import type { ChangeEvent } from "react";
import "./../../styles/components/SearchBar/SearchBar.css";

interface SearchBarProps {
  value: string;
  onChange: (newValue: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="searchBarWrapper">
      <input
        type="text"
        placeholder="Search starships..."
        value={value}
        onChange={handleChange}
        className="searchInput"
      />
    </div>
  );
};

export default SearchBar;
