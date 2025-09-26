"use client";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarDateRangeIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

function CommunityAboutSection({
  communityTitle,
  communityDescription,
  createdAt,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((open) => !open);
  };

  return (
    <>
      {/* Toggle Button */}
      <div
        className="w-[95%] mx-auto mb-4 rounded-xl p-2 flex justify-between items-center bg-slate-200 my-3 cursor-pointer"
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
          w-[95%] mx-auto px-4 py-2 md:text-2xl space-y-1 rounded-2xl mb-2 bg-slate-100
          overflow-hidden transition-all duration-500 ease-in-out
          ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
        `}
      >
        {/* Always render content for smooth animation */}
        <h3 className="font-bold">{communityTitle}</h3>
        <p>{communityDescription}</p>
        <div className="flex items-center gap-1 mt-2">
          <CalendarDateRangeIcon className="h-6 w-6" />
          <p>{createdAt}</p>
        </div>
      </div>
    </>
  );
}

export default CommunityAboutSection;
