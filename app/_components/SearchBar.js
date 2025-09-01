//This is the part of main header, I make it alone from other because it depends on different screen sizes.
"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

function SearchBar() {
  const isSmUp = useMediaQuery({ query: "(min-width: 640px)" });
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  if (!isSmUp) {
    return <MagnifyingGlassIcon className="h-6 w-6" />;
  }
  if (isSmUp) {
    //Give space as an input field
    return (
      <div
        className="bg-slate-300 flex items-center gap-2 px-2 py-1 rounded-2xl"
        onClick={handleFocus}
      >
        <MagnifyingGlassIcon className="h-6 w-6 md:h-12 md:w-10 2xl:h-8 2xl:w-8 cursor-pointer" />
        <input
          ref={inputRef}
          placeholder="Search..."
          className="border-none outline-none focus:outline-none bg-transparent w-[20rem] md:w-lg md:h-12 md:text-3xl 2xl:h-8"
        />
      </div>
    );
  }
}

export default SearchBar;
