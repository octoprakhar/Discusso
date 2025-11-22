"use client";

import { useState } from "react";
import Comments from "./Comments";
import CommentSection from "./CommentSection";
import { insertCommentRecursively } from "../utils/commentUtils";
import { CommentContextProvider } from "../context/CommentContext";

function CommentsClient({ initialComments, postId }) {
  const [comments, setComments] = useState(initialComments);

  const handleNewComment = (newComment) => {
    setComments((prev) => insertCommentRecursively(prev, newComment));
  };
  return (
    <>
      {" "}
      <CommentContextProvider postId={postId} onNewComment={handleNewComment}>
        <CommentSection />
        {/* Here we have replied to id */}
        <Comments comments={comments} />;
      </CommentContextProvider>
    </>
  );
}

export default CommentsClient;
