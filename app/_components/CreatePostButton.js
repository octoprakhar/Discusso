"use client";

import { useRouter } from "next/navigation";
import Header from "./Header";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function CreatePostButton() {
  const router = useRouter();

  const handleAddPostClick = () => {
    router.push("/user/create-post");
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
