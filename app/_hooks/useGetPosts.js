"use client";

import { useCallback, useState } from "react";
import { getAllPostsAction } from "../_libs/actions";
import toast from "react-hot-toast";

export function useGetPosts() {
  const [posts, setPosts] = useState([]);
  const [communities, setCommunities] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 5;

  const fetchPosts = useCallback(async () => {
    try {
      // if (loading || !hasMore) return;
      setLoading(true);

      const nextPage = page + 1;
      const offset = (nextPage - 1) * limit;

      const formData = new FormData();
      formData.append("offset", offset);
      formData.append("limit", limit);

      const res = await getAllPostsAction(formData);

      if (res.error) {
        toast.error(res.error);
        return;
      }

      setPosts((prev) => {
        const newPosts = res.enrichedPosts.filter(
          (newPost) => !prev.some((oldPost) => oldPost.id === newPost.id)
        );
        return [...prev, ...newPosts];
      });

      setCommunities((prev) => {
        const newCommunities = res.communityDataList.filter(
          (newComm) =>
            !prev.some((oldComm) => oldComm.communityId === newComm.communityId)
        );
        return [...prev, ...newCommunities];
      });
      // setHasMore(res.hasMore);
      setPage(nextPage);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  return { posts, communities, loading, fetchPosts };
}
