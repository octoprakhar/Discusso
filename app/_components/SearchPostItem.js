"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

function SearchPostItem({ post, maxChar = 100 }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/posts/${post.postId}`);
  };
  return (
    <div
      className="flex justify-between items-center px-4 py-2 bg-slate-100 rounded-2xl hover:bg-slate-300 cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2 text-sm md:text-base">
          <div className="relative w-6 h-6 md:w-8 md:h-8 rounded-full border-2">
            <Image
              src={post.communityLogo}
              alt={post.communityName}
              fill
              className="rounded-full object-cover object-center"
            />
          </div>
          <span>d/{post.communityName}</span>
        </div>
        <h1 className="text-lg md:text-2xl font-bold">
          {post.title.length >= maxChar
            ? post.title.substring(0, maxChar - 3) + "..."
            : post.title}
        </h1>
        <div className="flex items-center gap-2 text-sm md:text-base">
          <span>{post.upvotes + post.downvotes} Votes &middot;</span>
          <span>{post.noOfComments} Comments</span>
        </div>
      </div>
      <div className="relative w-12 h-12 md:w-18 md:h-18 rounded-xl">
        <Image
          src={post.images.at(0)}
          alt={post.userName}
          fill
          className="object-cover object-center rounded-xl"
        />
      </div>
    </div>
  );
}

export default SearchPostItem;
