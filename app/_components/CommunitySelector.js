"use client";

import {
  ArrowDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CommunityBrief from "./CommunityBrief";

function CommunitySelector({
  communityList,
  draftedCommunity = "",
  draftedCommunityId = -1,
}) {
  const [filteredCommunity, setFilteredCommunity] = useState(communityList);
  const [toShowInput, setToShowInput] = useState(false);
  const containerRef = useRef(null); // ref for outside click detection
  const [selectedCommunityId, setSelectedCommunityId] = useState(
    draftedCommunityId > 0 ? draftedCommunityId : null
  );
  const [inputCommunityName, setInputCommunityName] =
    useState(draftedCommunity);

  const openInputField = () => {
    setToShowInput(true);
  };

  const closeInputField = () => {
    setToShowInput(false);
  };

  const changeInput = (e) => {
    setInputCommunityName(e.target.value);
    // console.log(inputCommunityName);
  };

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        closeInputField();
      }
    }

    if (toShowInput) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toShowInput]);

  //Handle community selection
  const handleCommunitySelect = (id) => {
    setSelectedCommunityId(id);

    const selectedCommunity = communityList.find(
      (community) => community.communityId === id
    );

    if (selectedCommunity) {
      setInputCommunityName(selectedCommunity.name);
    }
    closeInputField();
  };

  //Filtering the list
  useEffect(() => {
    if (inputCommunityName.trim()) {
      const search = inputCommunityName.toLowerCase();

      const filteredList = communityList.filter((community) => {
        // Remove the "d/" prefix before comparing
        const nameWithoutPrefix = community.name
          .toLowerCase()
          .replace(/^d\//, "");
        return nameWithoutPrefix.includes(search);
      });

      setFilteredCommunity(filteredList);
    } else {
      setFilteredCommunity(communityList);
    }
  }, [inputCommunityName, communityList]);

  return (
    <div ref={containerRef}>
      {!toShowInput ? (
        <div
          className="w-fit flex gap-4 items-center px-2 py-1 rounded-2xl bg-slate-200 cursor-pointer hover:bg-slate-300"
          onClick={openInputField}
        >
          <div className="relative h-6 w-6 md:h-12 md:w-12 rounded-full">
            <Image
              src={
                selectedCommunityId
                  ? communityList.find(
                      (c) => c.communityId === selectedCommunityId
                    ).icon
                  : "/discusso_logo.png"
              }
              alt="Logo"
              fill
              className="object-cover object-center rounded-full"
            />
          </div>
          <span className="md:text-2xl">
            {inputCommunityName ? inputCommunityName : "Select a community"}
          </span>
          <ArrowDownIcon className="h-6 w-6 md:h-8 md:w-8" />
        </div>
      ) : (
        <div className="relative space-y-1 md:text-2xl">
          <div className="flex gap-1 items-center px-2 py-1 text-lg w-[95%] mx-auto border-2 border-sky-400 bg-slate-300 rounded-2xl cursor-pointer">
            <MagnifyingGlassIcon className="h-6 w-6" />
            <input
              className="w-full focus:outline-none md:text-2xl"
              placeholder="Select a community"
              value={inputCommunityName}
              onChange={changeInput}
              autoFocus
            />
          </div>
          <div className="absolute w-[80%] top-12 left-[10%] max-h-64 px-2 py-1 border-2 overflow-y-scroll space-y-2 bg-slate-50 rounded-xl">
            {filteredCommunity.map((community) => (
              <CommunityBrief
                key={community.communityId}
                community={community}
                onSelect={handleCommunitySelect}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CommunitySelector;
