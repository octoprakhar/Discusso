"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSetQueryParams } from "../_hooks/useSetQueryParams";

function PostTypeSelector() {
  const searchParams = useSearchParams();
  const currentType = searchParams.get("postType");
  const [postType, setPostType] = useState(currentType || "text");
  const { setQueryParam } = useSetQueryParams();

  useEffect(() => {
    if (!currentType) setQueryParam("postType", postType);
  }, [currentType, postType, setQueryParam]);

  const handlePostType = (postType) => {
    setPostType(postType);
    setQueryParam("postType", postType);
  };

  return (
    <div className="flex gap-4 items-center">
      <button
        className={`px-2 py-1 text-lg cursor-pointer ${
          postType === "text" ? "border-b-2 border-sky-500" : ""
        }`}
        onClick={() => {
          handlePostType("text");
        }}
      >
        Text
      </button>
      <button
        className={`px-2 py-1 text-lg cursor-pointer ${
          postType === "media" ? "border-b-2 border-sky-500" : ""
        }`}
        onClick={() => {
          handlePostType("media");
        }}
      >
        Images & Videos
      </button>
      <button
        className={`px-2 py-1 text-lg cursor-pointer ${
          postType === "link" ? "border-b-2 border-sky-500" : ""
        }`}
        onClick={() => {
          handlePostType("link");
        }}
      >
        Link
      </button>
    </div>
  );
}

export default PostTypeSelector;
