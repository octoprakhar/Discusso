"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { Post, PostDescription, PostImages, PostLink } from "./Posts";
import SmallSpinner from "./SmallSpinner";
import fetchPosts from "../_libs/fetchPosts";

export default function PostFeedClient() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["posts"],
      queryFn: ({ pageParam = 0 }) => fetchPosts({ pageParam, limit: 5 }),
      getNextPageParam: (lastPage, allPages) => {
        if (!lastPage.hasMore) return undefined;
        return allPages.reduce(
          (total, page) => total + page.enrichedPosts.length,
          0
        ); // next offset
      },
    });

  console.log(
    `PostFeedClient.js: Got data as \n1. data => ${data}\n2. fetchNextPage => ${fetchNextPage}\n3. hasNextPage => ${hasNextPage}\n4. isFetchingNextPage => ${isFetchingNextPage}\n5. isLoading => ${isLoading}`
  );

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
        <SmallSpinner />
      </div>
    );
  }

  return (
    <>
      {data?.pages.map((page) =>
        page.enrichedPosts.map((post, i) => (
          <Post key={post.id} post={post} community={page.communityDataList[i]}>
            {post.description && <PostDescription />}
            {post.media?.images && <PostImages />}
            {post.links && <PostLink />}
          </Post>
        ))
      )}

      <div className="text-center my-4">
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage || !hasNextPage}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          {isFetchingNextPage ? (
            <SmallSpinner color="border-sky-500" />
          ) : hasNextPage ? (
            "Load More"
          ) : (
            "No more posts"
          )}
        </button>
      </div>
    </>
  );
}
