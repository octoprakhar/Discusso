"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSetQueryParams } from "../_hooks/useSetQueryParams";

function SearchTypeSelector() {
  const searchParams = useSearchParams();
  const currentType = searchParams.get("searchType");
  const [searchType, setSearchType] = useState(currentType || "text");
  const { setQueryParam } = useSetQueryParams();

  useEffect(() => {
    if (!currentType) setQueryParam("searchType", searchType);
  }, [currentType, searchType, setQueryParam]);

  const handleSearchType = (searchType) => {
    setSearchType(searchType);
    setQueryParam("searchType", searchType);
  };

  return (
    <div className="flex gap-4 items-center justify-center">
      <button
        className={`px-4 py-2 text-lg cursor-pointer rounded-2xl ${
          searchType === "posts" ? "bg-sky-500" : "hover:bg-sky-200"
        }`}
        onClick={() => {
          handleSearchType("posts");
        }}
      >
        Posts
      </button>
      <button
        className={`px-4 py-2 text-lg cursor-pointer rounded-2xl ${
          searchType === "communities" ? "bg-sky-500" : "hover:bg-sky-200"
        }`}
        onClick={() => {
          handleSearchType("communities");
        }}
      >
        Communities
      </button>
    </div>
  );
}

export default SearchTypeSelector;
