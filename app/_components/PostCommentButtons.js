// It gives the list of all the buttons that each comment can have either upvote,downvote, reply
"use client";

import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChatBubbleOvalLeftIcon,
} from "@heroicons/react/24/outline";
import DescriptiveButton from "./DescriptiveButton";
import { useState } from "react";
import toast from "react-hot-toast";
import { insertNewCommentAction, toggleCommentVote } from "../_libs/actions";
import { useComment } from "../context/CommentContext";

function PostCommentButtons({
  upvotes,
  downvotes,
  hasUserUpvoted,
  hasUserDownvoted,
  commentId,
}) {
  const [isReplying, setIsReplying] = useState(false);
  const [comment, setComment] = useState("");
  const [localUpvote, setLocalUpvote] = useState(hasUserUpvoted);
  const [localDownvote, setLocalDownvote] = useState(hasUserDownvoted);
  const [localUpvoteCount, setLocalUpvoteCount] = useState(upvotes);
  const [localDownvoteCount, setLocalDownvoteCount] = useState(downvotes);

  const { postId, onNewComment: onNewComments } = useComment();

  // console.log(`🧐 PostCommentButtons.js: Got post id as: ${postId}`);

  const handleSubmit = async () => {
    //Handle checking using action and submitting
    setIsReplying(false);
    const formData = new FormData();
    formData.append("parentCommentId", commentId);
    formData.append("content", comment);
    formData.append("postId", postId);

    try {
      const res = await insertNewCommentAction(formData);
      if (res.error) {
        toast.error("Error happened while replying. Please try again later.");
        console.log(
          "PostCommentButtons.js : Error occured while replying: ",
          res.error
        );
      }

      if (res.data) {
        console.log("PostCommentButton.js: Got data as: \n", res.data);
        onNewComments(res.data);
      }
    } catch (err) {
      toast.error(err.message);
      console.error("PostCommentButtons.js: Error occured as : ", err);
    }
  };

  const toggleReply = () => {
    setIsReplying((reply) => !reply);
  };

  const handleVote = async (vote) => {
    // Previous values – for rollback
    const prevUpvote = localUpvote;
    const prevDownvote = localDownvote;
    const prevUpvoteCount = localUpvoteCount;
    const prevDownvoteCount = localDownvoteCount;

    if (vote === 1) {
      // User pressed UPVOTE
      if (!localUpvote) {
        //  Add upvote
        setLocalUpvote(true);
        setLocalUpvoteCount((c) => c + 1);

        if (localDownvote) {
          // remove existing downvote
          setLocalDownvote(false);
          setLocalDownvoteCount((c) => c - 1);
        }
      } else {
        //  Remove upvote
        setLocalUpvote(false);
        setLocalUpvoteCount((c) => c - 1);
      }
    }

    if (vote === -1) {
      // User pressed DOWNVOTE
      if (!localDownvote) {
        //  Add downvote
        setLocalDownvote(true);
        setLocalDownvoteCount((c) => c + 1);

        if (localUpvote) {
          // remove existing upvote
          setLocalUpvote(false);
          setLocalUpvoteCount((c) => c - 1);
        }
      } else {
        //  Remove downvote
        setLocalDownvote(false);
        setLocalDownvoteCount((c) => c - 1);
      }
    }

    try {
      const formData = new FormData();
      formData.append("commentId", commentId);
      formData.append("vote", vote);

      const res = await toggleCommentVote(formData);

      if (res.error) {
        toast.error(res.error);

        //  ROLLBACK
        setLocalUpvote(prevUpvote);
        setLocalDownvote(prevDownvote);
        setLocalUpvoteCount(prevUpvoteCount);
        setLocalDownvoteCount(prevDownvoteCount);

        return;
      }

      if (res.success) {
        toast.success(res.success);
      }
    } catch (err) {
      toast.error(err.message);

      //  ROLLBACK
      setLocalUpvote(prevUpvote);
      setLocalDownvote(prevDownvote);
      setLocalUpvoteCount(prevUpvoteCount);
      setLocalDownvoteCount(prevDownvoteCount);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 items-center">
        <DescriptiveButton
          icon={<ArrowUpIcon className="w-4 h-4" />}
          title={localUpvoteCount}
          isAlreadyClicked={localUpvote}
          onButtonClicked={async () => handleVote(1)}
        />
        <DescriptiveButton
          icon={<ArrowDownIcon className="w-4 h-4" />}
          title={localDownvoteCount}
          isAlreadyClicked={localDownvote}
          onButtonClicked={async () => handleVote(-1)}
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
          <textarea
            className="w-full px-2 py-1 focus:outline-none"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

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
