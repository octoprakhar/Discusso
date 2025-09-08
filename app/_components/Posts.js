"use client";

import Image from "next/image";
// I want to create one compound component pattern for all different types of posts in my app
//like post with just title + description, or title_description+tag+image, ....

import { createContext, useContext, useState } from "react";
import DescriptiveButton from "./DescriptiveButton";
// outline icons
import {
  ArrowUpIcon as ArrowUpOutline,
  ArrowDownIcon as ArrowDownOutline,
  ChatBubbleOvalLeftIcon as MessageOutline,
  ShareIcon as ShareOutline,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";

// solid (filled) icons
import {
  ArrowUpIcon as ArrowUpSolid,
  ArrowDownIcon as ArrowDownSolid,
  ChatBubbleOvalLeftIcon as MessageSolid,
  ShareIcon as ShareSolid,
  ArrowLeftCircleIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import SmallCommunityInfo from "./SmallCommunityInfo";
import { useRouter } from "next/navigation";
/*But each post has something common that 
from which community it is, time(how much time ago), number of upvotes, number of downvote, community image,
I think I will ask these things in the parent component only
Maybe I will pass all this values using context
*/

//Creating the PostsContext so that each value will be shared with ContextAPI

const PostsContext = createContext(null);

function Post({ children, post, creatorName = "", toShowBackButton = false }) {
  //Get community using community id from post
  const community = {
    communityId: 3,
    logo: "/discusso_logo.png",
    communityName: "d/myFirstBlogs",
    totalCommunityMembers: 122,
    description:
      "A community for discussing anything related to the React UI framework and its ecosystem. Join the Reactiflux Discord (reactiflux.com) for additional React discussion and help.",
  };

  const router = useRouter();

  //Each post has, created_time, upvote count, downvote count, comments, share button,title, hasUserUpvoted/downvoted/none,number of comments
  return (
    <PostsContext.Provider value={post}>
      {" "}
      <div
        className="overflow-x-hidden w-full sm:w-xl md:w-2xl sm:mx-auto border-t-[1px] border-b-[1px] px-2 py-1 flex flex-col gap-1 cursor-pointer hover:bg-slate-200"
        onClick={() => {
          router.push(`/posts/${post.postId}`);
        }}
      >
        {/* Basic header */}
        <header className="flex gap-1">
          {toShowBackButton && (
            <ArrowLeftCircleIcon
              className="w-6 h-6"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering parent div's onClick
                router.push("/");
              }}
            />
          )}
          <div className="flex gap-0.5 items-center">
            {/* Community logo container */}
            <div className="relative w-5 h-5 border-[1px] rounded-full">
              <Image
                src={community.logo}
                alt={community.communityName.at(2).toUpperCase()}
                fill
                className="object-fill"
              />
            </div>
            {/* Community name */}
            <div className="relative inline-block group">
              {/* Trigger */}
              <span className="text-sm hover:cursor-pointer hover:text-indigo-500">
                {community.communityName} ·{" "}
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </span>

              {/* Hover card */}
              <div className="absolute top-full left-0 mt-2 opacity-0 scale-95 translate-y-2 pointer-events-none transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:pointer-events-auto z-50">
                <SmallCommunityInfo community={community} />
              </div>
            </div>
          </div>
          {creatorName && (
            <span
              className="hover:text-sky-600 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/user/${post.userId}`);
              }}
            >
              {creatorName}
            </span>
          )}
        </header>

        <main>
          {/* Title */}
          <h1 className="text-lg font-bold">{post.title}</h1>
          {/* Children */}
          {children}
        </main>
        {/* Footer buttons of post */}
        <footer className="flex gap-1">
          {/* If user already upvoted or not */}
          <DescriptiveButton
            icon={<ArrowUpSolid className="w-4 h-4" />}
            title={post.upvotes}
            isAlreadyClicked={post.hasUserAlreadyUpvoted}
          />
          <DescriptiveButton
            icon={<ArrowDownSolid className="w-4 h-4" />}
            title={post.downvotes}
            isAlreadyClicked={post.hasUserAlreadyDownvoted}
          />

          <DescriptiveButton
            icon={<ChatBubbleOvalLeftIcon className="w-4 h-4" />}
            title={post.noOfComments}
          />
          <DescriptiveButton
            icon={<ShareOutline className="w-4 h-4" />}
            title="Share"
          />
        </footer>
      </div>
    </PostsContext.Provider>
  );
}

function PostDescription() {
  const post = useContext(PostsContext);
  return <p>{post.description}</p>;
}

//Images will be array of string and I need to show them as a button to previous and next and also previous and next button
function PostImages() {
  const post = useContext(PostsContext);
  const images = post?.images || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) {
    return <p className="text-gray-400">No images available</p>;
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full mx-auto">
      {/* Image */}
      <div className="relative w-full h-64 md:h-80 lg:h-80 xl:h-96 rounded-2xl shadow">
        <Image
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          fill
          className="object-contain"
        />
      </div>

      {/* Prev Button */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
      >
        ‹
      </button>

      {/* Next Button */}
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full"
      >
        ›
      </button>

      {/* Indicators */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`w-3 h-3 rounded-full ${
              i === currentIndex ? "bg-indigo-500" : "bg-slate-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

//This will be array of key value pairs
function PostLink() {
  const post = useContext(PostsContext);

  return (
    <div className="border-[1px] rounded-b-2xl p-4 w-full flex gap-4 mb-2">
      {post.links.map((obj, idx) => {
        const [key, value] = Object.entries(obj)[0]; // get first pair
        return (
          <Link
            key={idx}
            href={value}
            target="_blank"
            className="text-blue-500 underline"
          >
            {key}
          </Link>
        );
      })}
    </div>
  );
}

function PostVideo() {
  const post = useContext(PostsContext);

  return (
    <div className="p-4 flex justify-center">
      <video
        src={post.video}
        controls
        className="w-[400px] h-[250px] object-cover rounded-lg"
      />
    </div>
  );
}

export { Post, PostDescription, PostImages, PostLink, PostVideo };
