"use client";

import Image from "next/image";
import DescriptiveButton from "./DescriptiveButton";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { formatToTimeAgo } from "../utils/dateTimeUtils";
import { useState } from "react";
import toast from "react-hot-toast";
import { toggleCommentVote } from "../_libs/actions";

function UserCommentActivity({ comment, userName }) {
  const router = useRouter();
  const [isUpvoteLoading, setIsUpvoteLoading] = useState(false);
  const [isDownvoteLoading, setIsDownvoteLoading] = useState(false);
  const [isUserUpvoted, setIsUserUpvoted] = useState(comment.hasUserUpvoted);
  const [isUserDownvoted, setIsUserDownvoted] = useState(
    comment.hasUserDownvoted
  );
  const [upvoteCount, setUpvoteCount] = useState(comment.noOfUpvotes);
  const [downvoteCount, setDownvoteCount] = useState(comment.noOfDownvotes);
  //This component needs the following data
  /*
    1. Community Name: Where user has commented
    2. Community Icon: The icon of the specific community, whose post user has commented
    2. post title: title of the post user has commented
    4. username: Name of this user
    5. OP(own post) tag : Is the user commented on it's own created post or different person's post
    6. Replied person: Username of the person, To whom the user replied by commenting on the post
    7. createdAt timestamp = Comment Timestamp
    8. content = comment content
    9. upvote = No of upvotes
    10. downvotes= no of downvotes
    
    */
  // When I click on a specific comment it must take to that specific post page.

  //I am planning to use this component only to get all this details from the database

  const handleCommentVote = async (e, vote) => {
    e.preventDefault();
    e.stopPropagation();

    const prevUp = isUserUpvoted;
    const prevDown = isUserDownvoted;
    const prevUpCount = upvoteCount;
    const prevDownCount = downvoteCount;

    // OPTIMISTIC UI UPDATE
    if (vote === 1) {
      // user clicked UPVOTE

      if (prevUp) {
        // remove upvote
        setIsUserUpvoted(false);
        setUpvoteCount(prevUpCount - 1);
      } else {
        // add upvote
        setIsUserUpvoted(true);
        setUpvoteCount(prevUpCount + 1);

        if (prevDown) {
          // if user had downvoted earlier → remove downvote
          setIsUserDownvoted(false);
          setDownvoteCount(prevDownCount - 1);
        }
      }
      setIsUpvoteLoading(true);
    } else if (vote === -1) {
      // user clicked DOWNVOTE

      if (prevDown) {
        // remove downvote
        setIsUserDownvoted(false);
        setDownvoteCount(prevDownCount - 1);
      } else {
        // add downvote
        setIsUserDownvoted(true);
        setDownvoteCount(prevDownCount + 1);

        if (prevUp) {
          // remove upvote if previously upvoted
          setIsUserUpvoted(false);
          setUpvoteCount(prevUpCount - 1);
        }
      }
      setIsDownvoteLoading(true);
    }

    // SEND TO SERVER

    try {
      const formData = new FormData();
      formData.append("vote", vote);
      formData.append("commentId", comment.commentId);

      const res = await toggleCommentVote(formData);

      if (res.error) {
        toast.error(res.error);

        // REVERT UI
        setIsUserUpvoted(prevUp);
        setIsUserDownvoted(prevDown);
        setUpvoteCount(prevUpCount);
        setDownvoteCount(prevDownCount);
      } else {
        toast.success(res.success);
      }
    } catch (err) {
      toast.error("Vote failed!");

      // REVERT UI
      setIsUserUpvoted(prevUp);
      setIsUserDownvoted(prevDown);
      setUpvoteCount(prevUpCount);
      setDownvoteCount(prevDownCount);
    } finally {
      setIsUpvoteLoading(false);
      setIsDownvoteLoading(false);
    }
  };

  return (
    <div
      className="flex gap-1 my-4 text-sm md:text-lg hover:bg-slate-200 cursor-pointer"
      onClick={() => {
        router.push(`/posts/${comment.postId}`);
      }}
    >
      {/* Header with post title, community name, community icon */}
      <div className="relative w-6 h-6 md:w-10 md:h-10 rounded-full bg-slate-100">
        <Image
          src={comment.communityLogo}
          alt={comment.communityName}
          className="rounded-full object-cover object-center"
          fill
        />
      </div>
      <div className="space-y-1 md:space-y-2">
        <div className="flex gap-1 items-center flex-1">
          <p className="font-bold">d/{comment.communityName}</p>
          <p className="">{comment.postTitle}</p>
        </div>
        <div className="flex gap-1 items-center">
          <p className="font-bold">{userName}</p>
          <p>commented {formatToTimeAgo(comment.createdAt)} ago</p>
        </div>
        <p className="text-wrap">{comment.content}</p>
        <div className="flex gap-2">
          <DescriptiveButton
            icon={<ArrowUpIcon className="w-4 h-4" />}
            title={upvoteCount}
            isAlreadyClicked={isUserUpvoted}
            disable={isDownvoteLoading || isUpvoteLoading}
            onButtonClicked={async (e) => {
              await handleCommentVote(e, 1);
            }}
          />

          <DescriptiveButton
            icon={<ArrowDownIcon className="w-4 h-4" />}
            title={downvoteCount}
            isAlreadyClicked={isUserDownvoted}
            disable={isDownvoteLoading || isUpvoteLoading}
            onButtonClicked={async (e) => {
              await handleCommentVote(e, -1);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default UserCommentActivity;
