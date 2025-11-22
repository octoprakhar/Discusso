"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { insertNewCommentAction } from "../_libs/actions";
import { useComment } from "../context/CommentContext";

function CommentSection() {
  const [isClick, setIsClick] = useState(false);
  const [comment, setComment] = useState("");

  const { postId, onNewComment } = useComment();

  const handleContainerClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsClick(true);
    }
  };

  const handleCancel = () => {
    setIsClick(false);
    setComment("");
  };

  const handleSend = async () => {
    // Before sending check the server whether the comments are empty or not
    try {
      setComment(comment);
      const formData = new FormData();
      formData.append("content", comment);
      formData.append("postId", postId);
      const res = await insertNewCommentAction(formData);
      if (res.error) {
        toast.error(res.error);
      }
      if (res.success && res.data) {
        onNewComment(res.data);
      }
      // console.log(
      //   "CommentSection.js: Got result after saving new comment: ",
      //   res.data
      // );
      toast.success("Successfully added your comment.");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsClick(false);
      setComment("");
    }
  };

  return (
    <div
      className="border-[1px] rounded-2xl px-4 py-2 w-full max-w-xl hover:bg-slate-200 cursor-text"
      onClick={handleContainerClick}
    >
      {!isClick ? (
        <span className="text-slate-400">Join the conversation</span>
      ) : (
        <div className="flex flex-col gap-2">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
            className="w-full min-h-[80px] resize-none outline-none bg-transparent overflow-y-scroll"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleCancel}
              className="px-4 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
            {/* Check in server too whether comment is empty or not */}

            <button
              onClick={handleSend}
              className="px-4 py-1 rounded-md text-sm bg-blue-600 text-white hover:bg-blue-700"
              disabled={!comment.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentSection;
