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
  BookmarkSquareIcon,
  MinusCircleIcon,
  XCircleIcon,
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
import toast from "react-hot-toast";
import { togglePostPreferences, togglePostVote } from "../_libs/actions";
import { useQueryClient } from "@tanstack/react-query";
import SmallSpinner from "./SmallSpinner";
/*But each post has something common that 
from which community it is, time(how much time ago), number of upvotes, number of downvote, community image,
I think I will ask these things in the parent component only
Maybe I will pass all this values using context
*/

//Creating the PostsContext so that each value will be shared with ContextAPI

const PostsContext = createContext(null);

function Post({
  children,
  post,
  community = {
    communityId: 3,
    logo: "/discusso_logo.png",
    communityName: "d/myFirstBlogs",
    totalCommunityMembers: 122,
    description:
      "A community for discussing anything related to the React UI framework and its ecosystem. Join the Reactiflux Discord (reactiflux.com) for additional React discussion and help.",
  },
  showUserNameAsMainName = false,
  creatorName = "",
  toShowBackButton = false,
}) {
  //Get community using community id from post
  // const community = {

  // };

  const router = useRouter();
  const [updatedPost, setUpdatedPost] = useState(post);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPostSaved, setIsPostSaved] = useState(post.hasUserSavedPost);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const handlePostVote = async (vote) => {
    if (isProcessing) return; // prevent spamming click
    setIsProcessing(true);

    // store old state for rollback
    const oldState = updatedPost;
    let optimistic = { ...updatedPost };

    // ---- Optimistic UI ----
    if (vote === 1) {
      if (optimistic.hasUserAlreadyUpvoted) {
        // remove upvote
        optimistic.noOfUpvotes -= 1;
        optimistic.hasUserAlreadyUpvoted = false;
      } else {
        // add upvote
        optimistic.noOfUpvotes += 1;
        optimistic.hasUserAlreadyUpvoted = true;

        // remove downvote (if previously clicked)
        if (optimistic.hasUserAlreadyDownvoted) {
          optimistic.noOfDownvotes -= 1;
          optimistic.hasUserAlreadyDownvoted = false;
        }
      }
    }

    if (vote === -1) {
      if (optimistic.hasUserAlreadyDownvoted) {
        // remove downvote
        optimistic.noOfDownvotes -= 1;
        optimistic.hasUserAlreadyDownvoted = false;
      } else {
        // add downvote
        optimistic.noOfDownvotes += 1;
        optimistic.hasUserAlreadyDownvoted = true;

        if (optimistic.hasUserAlreadyUpvoted) {
          optimistic.noOfUpvotes -= 1;
          optimistic.hasUserAlreadyUpvoted = false;
        }
      }
    }

    // Update UI instantly
    setUpdatedPost(optimistic);

    try {
      const formData = new FormData();
      formData.append("postId", updatedPost.id);
      formData.append("vote", vote);

      const res = await togglePostVote(formData);

      if (res.error) {
        setUpdatedPost(oldState);
        toast.error(res.error);
      } else {
        setUpdatedPost(res.post); // use server authoritative value
        toast.success(res.success);
      }
    } catch (err) {
      setUpdatedPost(oldState);
      toast.error("Failed to update vote");
    }

    setIsProcessing(false);
  };

  // console.log("Got posts as ", updatedPost);
  //Each post has, created_time, upvote count, downvote count, comments, share button,title, hasUserUpvoted/downvoted/none,number of comments
  return (
    <PostsContext.Provider value={updatedPost}>
      {" "}
      <div
        className="overflow-x-hidden w-full sm:w-xl md:w-2xl sm:mx-auto border-t-[1px] border-b-[1px] px-2 py-1 flex flex-col gap-1 cursor-pointer hover:bg-slate-200"
        onClick={() => {
          router.push(`/posts/${updatedPost.id}`);
        }}
      >
        {/* Basic header */}
        <header className="flex justify-between">
          <div className="flex gap-1">
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
                  className="object-fill rounded-full"
                />
              </div>
              {/* Community name */}
              <div className="relative inline-block group">
                {/* Trigger */}
                <span
                  className="text-sm hover:cursor-pointer hover:text-indigo-500"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering parent div's onClick
                    router.push(`/communities/${community.communityId}`);
                  }}
                >
                  {showUserNameAsMainName
                    ? creatorName
                    : community.communityName}{" "}
                  ·{" "}
                  {formatDistanceToNow(new Date(updatedPost.createdAt), {
                    addSuffix: true,
                  })}
                </span>

                {/* Hover card */}
                <div className="absolute top-full left-0 mt-2 opacity-0 scale-95 translate-y-2 pointer-events-none transition-all duration-300 ease-out group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:pointer-events-auto z-50">
                  <SmallCommunityInfo community={community} />
                </div>
              </div>
            </div>
            {creatorName && !showUserNameAsMainName && (
              <span
                className="hover:text-sky-600 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/user/${updatedPost.userId}?feeds=posts`);
                }}
              >
                {creatorName}
              </span>
            )}
          </div>
          {isPostSaved === false ? (
            isLoading === false ? (
              <BookmarkSquareIcon
                className="h-6 w-6 md:h-8 md:w-8 hover:fill-sky-600"
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  //Pass userId and postId to server through action then navigate to saved page after saving the post
                  try {
                    setIsLoading(true);
                    const formData = new FormData();
                    formData.append("postId", updatedPost.id);
                    formData.append("preference", "isSaved");
                    const res = await togglePostPreferences(formData);
                    if (res.error) {
                      toast.error(res.error);
                    } else {
                      setIsPostSaved(true);
                      queryClient.invalidateQueries(["saved-posts"]);

                      toast.success(res.success);
                    }
                  } catch (err) {
                    console.log(
                      "💣 Post.js: Error occured in saving/removing posts. \n",
                      err
                    );
                    toast.error(
                      "Something went wrong. Please try again later."
                    );
                  } finally {
                    setIsLoading(false);
                  }
                }}
              />
            ) : (
              <SmallSpinner />
            )
          ) : isLoading === false ? (
            <XCircleIcon
              className="h-6 w-6 md:h-8 md:w-8 hover:fill-sky-600"
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                //Pass userId and postId to server through action then navigate to saved page after saving the post
                try {
                  setIsLoading(true);
                  const formData = new FormData();
                  formData.append("postId", updatedPost.id);
                  formData.append("preference", "isSaved");
                  const res = await togglePostPreferences(formData);
                  if (res.error) {
                    toast.error(res.error);
                  } else {
                    setIsPostSaved(false);
                    queryClient.invalidateQueries(["saved-posts"]);

                    toast.success(res.success);
                  }
                } catch (err) {
                  console.log(
                    "💣 Post.js: Error occured in saving/removing posts. \n",
                    err
                  );
                  toast.error("Something went wrong. Please try again later.");
                } finally {
                  setIsLoading(false);
                }
              }}
            />
          ) : (
            <SmallSpinner />
          )}
        </header>

        <main>
          {/* Title */}
          <h1 className="text-lg font-bold">{updatedPost.title}</h1>
          {/* Children */}
          {children}
        </main>
        {/* Footer buttons of post */}
        <footer className="flex gap-1">
          {/* If user already upvoted or not */}
          <DescriptiveButton
            onButtonClicked={async (e) => {
              e.stopPropagation();
              await handlePostVote(1);
            }}
            icon={<ArrowUpSolid className="w-4 h-4" />}
            title={updatedPost.noOfUpvotes}
            isAlreadyClicked={updatedPost.hasUserAlreadyUpvoted}
          />
          <DescriptiveButton
            onButtonClicked={async (e) => {
              e.stopPropagation();
              await handlePostVote(-1);
            }}
            icon={<ArrowDownSolid className="w-4 h-4" />}
            title={updatedPost.noOfDownvotes}
            isAlreadyClicked={updatedPost.hasUserAlreadyDownvoted}
          />

          <DescriptiveButton
            icon={<ChatBubbleOvalLeftIcon className="w-4 h-4" />}
            title={updatedPost.noOfComments}
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
  const updatedPost = useContext(PostsContext);
  return <p>{updatedPost?.description}</p>;
}

//Images will be array of string and I need to show them as a button to previous and next and also previous and next button
function PostImages() {
  const post = useContext(PostsContext);
  const images = post?.media?.images || [];
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
        onClick={(e) => {
          e.stopPropagation();
          goToPrev();
        }}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full cursor-pointer"
      >
        ‹
      </button>

      {/* Next Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          goToNext();
        }}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full cursor-pointer"
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

//This will be a object of key value pairs
function PostLink() {
  const post = useContext(PostsContext);

  // Ensure post.links exists and is a valid object
  if (!post.links || typeof post.links !== "object") {
    return null;
  }

  return (
    <div className="border-[1px] rounded-b-2xl p-4 w-full flex gap-4 mb-2 flex-wrap">
      {Object.entries(post.links).map(([key, value], idx) => (
        <Link
          key={idx}
          href={value}
          target="_blank"
          className="text-blue-500 underline hover:text-blue-700"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          {key}
        </Link>
      ))}
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
