"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import { useSetQueryParams } from "../_hooks/useSetQueryParams";

export default function CreatePostButton({ communityId }) {
  const { setQueryParam } = useSetQueryParams("/user/create-post");

  const handleAddPostClick = () => {
    // const communityId = "1234";
    setQueryParam("com", communityId);
  };

  return (
    <div className="border-[1px] rounded-full p-2 cursor-pointer hover:bg-slate-200">
      <PlusIcon
        onClick={handleAddPostClick}
        className="h-6 w-6 md:h-10 md:w-10"
      />
    </div>
  );
}
