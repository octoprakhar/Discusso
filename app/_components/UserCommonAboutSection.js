"use client";

import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function UserCommonAboutSection() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((open) => !open);
  };

  return (
    <>
      {/* Toggle Button */}
      <div
        className="w-full mb-4 rounded-xl p-2 flex justify-between items-center bg-slate-200 my-3 cursor-pointer"
        onClick={handleToggle}
      >
        <p className="text-3xl">About</p>
        {isOpen ? (
          <ArrowUpIcon className="w-6 h-6 md:w-10 md:h-10" />
        ) : (
          <ArrowDownIcon className="w-6 h-6 md:w-10 md:h-10" />
        )}
      </div>

      {/* Expanding Section */}
      <div
        className={`
          grid grid-cols-2 grid-rows-2 gap-4 
          w-full px-4 py-2 md:text-2xl rounded-2xl mb-2 bg-slate-100
          overflow-hidden transition-all duration-500 ease-in-out
          ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        {/* Always render content for smooth animation */}
        <div>
          <p className="font-bold">89</p>
          <p>karma</p>
        </div>
        <div>
          <p className="font-bold">68</p>
          <p>Contribution</p>
        </div>
        <div>
          <p className="font-bold">3w</p>
          <p>Reddit Age</p>
        </div>
        <div>
          <p className="font-bold">5</p>
          <p>Active in &gt;</p>
        </div>
      </div>
    </>
  );
}

export default UserCommonAboutSection;
