// It gives the list of all the buttons that each comment can have either upvote,downvote, reply
"use client";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
import DescriptiveButton from "./DescriptiveButton";
import { useState } from "react";

function PostCommentButtons({
  upvotes,
  downvotes,
  hasUserUpvoted,
  hasUserDownvoted,
}) {
  const [isReplying, setIsReplying] = useState(false);

  const handleSubmit = () => {
    //Handle checking using action and submitting
    setIsReplying(false);
    alert("Message Submitted");
  };

  const toggleReply = () => {
    setIsReplying((reply) => !reply);
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 items-center">
        <DescriptiveButton
          icon={<ArrowUpIcon className="w-4 h-4" />}
          title={upvotes}
          isAlreadyClicked={hasUserUpvoted}
        />
        <DescriptiveButton
          icon={<ArrowDownIcon className="w-4 h-4" />}
          title={downvotes}
          isAlreadyClicked={hasUserDownvoted}
        />
        <DescriptiveButton
          icon={<ChatBubbleOvalLeftIcon className="w-4 h-4" />}
          title="Reply"
          isAlreadyClicked={false}
          onButtonClicked={toggleReply}
        />
      </div>
      {isReplying && (
        <div className="w-full min-h-12 border-2 rounded-2xl">
          <textarea className="w-full px-2 py-1 focus:outline-none" />

          {/* Action buttons */}
          <div className="w-full px-4 py-2 flex gap-2 justify-end items-center">
            <button
              className="px-2 py-1 bg-slate-300 hover:bg-slate-600 text-black hover:text-white rounded-2xl cursor-pointer"
              onClick={toggleReply}
            >
              Cancel
            </button>
            <button
              className="px-2 py-1 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl cursor-pointer"
              onClick={handleSubmit}
            >
              Reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostCommentButtons;
