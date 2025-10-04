"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function ExploringCommunityItem({ community }) {
  const [isJoined, setIsjoined] = useState(false);

  const toggleJoined = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsjoined((join) => !join);
    if (isJoined) {
      console.log(`Unjoined the community with id ${community.id}`);
    } else {
      console.log(`Joined the community with id ${community.id}`);
    }
  };
  return (
    <Link
      className="block w-[95%] mx-auto rounded-xl border-[1px] space-y-1 px-2 py-1 hover:bg-slate-200 cursor-pointer"
      href={`/communities/${community.id}`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1">
          <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-2">
            <Image
              src={community.icon}
              alt={community.name}
              fill
              className="object-cover object-center rounded-full"
            />
          </div>
          <div>
            <h3 className="text-lg md:text-2xl font-bold">{community.name}</h3>
            <p className="md:text-xl">{community.noOfMembers} members</p>
          </div>
        </div>
        {!isJoined ? (
          <button
            className="px-2 py-1 rounded-2xl bg-sky-600 text-white hover:bg-sky-800 cursor-pointer md:text-xl"
            onClick={toggleJoined}
          >
            Join
          </button>
        ) : (
          <button
            className="px-2 py-1 rounded-2xl bg-slate-100 hover:bg-slate-300 cursor-pointer md:text-xl border-2"
            onClick={toggleJoined}
          >
            Joined
          </button>
        )}
      </div>
      <p className="md:text-lg">{community.description}</p>
    </Link>
  );
}

export default ExploringCommunityItem;
