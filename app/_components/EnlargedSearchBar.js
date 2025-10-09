"use client";

import { useEffect, useRef, useState } from "react";
import SearchSuggestionContainer from "./SearchSuggestionContainer";
import { useRouter } from "next/navigation";

function EnlargedSearchBar() {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleSearchText = (e) => {
    setSearchText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchText.trim()) {
      router.push(
        `/search/results?q=${encodeURIComponent(
          searchText.trim()
        )}&searchType=posts`
      );
    }
  };

  const handleSuggestionClick = (text) => {
    router.push(
      `/search/results?q=${encodeURIComponent(text)}&searchType=posts`
    );
  };
  return (
    <>
      <input
        ref={inputRef}
        className="w-full px-4 py-1 rounded-2xl text-lg border-2 focus:outline-sky-400"
        placeholder="Search Here..."
        onChange={handleSearchText}
        value={searchText}
        onKeyDown={handleKeyDown}
      />
      {searchText && (
        <SearchSuggestionContainer
          searchText={searchText}
          onSuggestionClick={handleSuggestionClick}
        />
      )}
    </>
  );
}

export default EnlargedSearchBar;
