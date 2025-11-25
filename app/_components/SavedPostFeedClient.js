"use client";

import { useQuery } from "@tanstack/react-query";
import SmallSpinner from "./SmallSpinner";
import { Post, PostDescription, PostImages, PostLink } from "./Posts";

async function fetchSavedPosts() {
  const res = await fetch("/api/saved-posts", { method: "POST" });
  const json = await res.json();
  if (!json.success)
    throw new Error(json.error || "Failed to load saved posts");
  return json.savedPosts;
}

function SavedPostFeedClient() {
  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["saved-posts"],
    queryFn: fetchSavedPosts,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <SmallSpinner />;
  if (error) return <p>Failed to load saved posts</p>;
  if (!posts || !posts.enrichedPosts) return <p>No saved posts</p>;

  // build a map from communityId -> community object for O(1) lookup
  const communityById = (posts.communityDataList || []).reduce((acc, c) => {
    if (c?.communityId) acc[c.communityId] = c;
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">View All Saved Post</h1>
      {posts.enrichedPosts.map((post) => {
        const community = communityById[post.communityId] || null;
        return (
          <Post key={post.id} post={post} community={community}>
            {post.description && <PostDescription />}
            {post.media?.images && <PostImages />}
            {post.links && <PostLink />}
          </Post>
        );
      })}
    </div>
  );
}

export default SavedPostFeedClient;
