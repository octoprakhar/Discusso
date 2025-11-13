"use client";

import { useEffect } from "react";
import { useGetPosts } from "../_hooks/useGetPosts";
import { Post, PostDescription, PostImages, PostLink } from "./Posts";
import SmallSpinner from "./SmallSpinner";

function PostFeedClient() {
  const { posts, communities, loading, fetchPosts } = useGetPosts();

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      {posts.map((post, i) => (
        <Post key={post.id} post={post} community={communities[i]}>
          {post.description && <PostDescription />}
          {post.media?.images && <PostImages />}
          {post.links && <PostLink />}
        </Post>
      ))}

      <div className="text-center my-4">
        <button
          onClick={fetchPosts}
          disabled={loading}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          {loading ? <SmallSpinner color="border-sky-500" /> : "Load More"}
        </button>
      </div>
    </>
  );
}

export default PostFeedClient;
