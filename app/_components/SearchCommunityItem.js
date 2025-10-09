"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function SearchCommunityItem({ community, maxChar = 100 }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/communities/${community.id}`);
  };
  return (
    <div
      className="px-4 py-2 bg-slate-100 rounded-2xl hover:bg-slate-300 cursor-pointer space-y-1"
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        <div className="relative w-12 h-12 md:w-18 md:h-18 rounded-full">
          <Image
            src={community.icon}
            alt={community.name}
            fill
            className="object-cover object-center rounded-full"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <h1 className="font-bold">d/{community.name}</h1>
          <p>
            {community.title.length >= maxChar
              ? community.title.substring(0, maxChar - 3) + "..."
              : community.title}
          </p>
          <p className="text-sm text-slate-600">
            {community.noOfMembers} members.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SearchCommunityItem;
