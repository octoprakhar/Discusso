"use client";

import { useRouter } from "next/navigation";

function SearchSuggestedItem({ suggestion, suggestionType }) {
  const router = useRouter();

  const handleClick = () => {
    if (suggestionType === "community") {
      router.push(`/communities/${suggestion.id}`);
    } else {
      //If need user suggestion then just add one more else if block
      router.push(`/posts/${suggestion.postId}`);
    }
  };
  return (
    <div
      onClick={handleClick}
      className="px-2 py-1 cursor-pointer hover:bg-slate-200"
    >
      {" "}
      <p className="">
        {suggestionType === "community" ? suggestion.name : suggestion.title}
      </p>
      <hr />
    </div>
  );
}

export default SearchSuggestedItem;
