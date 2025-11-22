"use client";
import Image from "next/image";
import { generateComments } from "../utils/data_generator";
import { formatComments } from "../utils/postUtils";
import PostCommentButtons from "./PostCommentButtons";
import { useState } from "react";
import DescriptiveButton from "./DescriptiveButton";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";

// Single Comment component (recursive)
function Comment({ comment, userName = "", userProfilePhoto = "" }) {
  const [showReplies, setShowReplies] = useState(false);
  const user = userName ? userName : `Test${comment.userId}`;
  const photo = userProfilePhoto ? userProfilePhoto : "/bg-1.jpg";

  const toggleShowReply = () => {
    setShowReplies((showReply) => !showReply);
  };

  return (
    <div className="ml-4 mt-2">
      <div className="flex gap-1 items-center">
        <div className="relative w-6 h-6 rounded-full border-[1px]">
          <Image
            src={photo}
            alt={user}
            fill
            className="object-cover rounded-full"
          />
        </div>
        <h5 className="text-sm">{user}</h5>
      </div>
      {/* Comment content */}
      <p className="text-wrap font-bold">{comment.content}</p>
      <PostCommentButtons
        upvotes={comment.upvotes}
        downvotes={comment.downvotes}
        hasUserDownvoted={comment.hasUserDownvoted}
        hasUserUpvoted={comment.hasUserUpvoted}
        commentId={comment.commentId}
      />

      {/* Replies */}
      {comment.replies.length > 0 &&
        (showReplies ? (
          <>
            <button
              className="px-2 py-1 cursor-pointer bg-slate-300 hover:bg-slate-600 hover:text-white rounded-2xl text-sm mt-1 flex gap-1"
              onClick={toggleShowReply}
            >
              <ArrowUpIcon className="w-4 h-4" /> <span>Hide Replies</span>
            </button>
            <div className="ml-4 text-wrap">
              {comment.replies.map((reply) => (
                <Comment
                  key={reply.commentId}
                  comment={reply}
                  userName={reply.commentCreatorName}
                  userProfilePhoto={reply.commentUserLogo}
                />
              ))}
            </div>
          </>
        ) : (
          <button
            className="px-2 py-1 cursor-pointer bg-slate-300 hover:bg-slate-600 hover:text-white rounded-2xl text-sm mt-1 flex gap-1"
            onClick={toggleShowReply}
          >
            <ArrowDownIcon className="w-4 h-4" /> <span>Show Replies</span>
          </button>
        ))}
    </div>
  );
}

export default function Comments({ comments }) {
  // const comments = generateComments(20);
  const formattedComments = formatComments(comments);

  return (
    <div className="mt-4">
      {formattedComments.map((comment) => (
        <Comment
          key={comment.commentId}
          comment={comment}
          userName={comment.commentCreatorName}
          userProfilePhoto={comment.commentUserLogo}
        />
      ))}
    </div>
  );
}
