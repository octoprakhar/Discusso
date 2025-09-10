"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Post, PostDescription, PostImages } from "./Posts";
import UserCommentActivity from "./UserCommentActivity";

function UserContent({ posts, comments }) {
  const searchParams = useSearchParams();
  const feeds = searchParams.get("feeds");
  const router = useRouter();

  if (feeds === "posts") {
    return posts.length > 0 ? (
      <div>
        {posts.map((post) => (
          <div
            key={post.postId}
            className="my-6 hover:bg-slate-200 cursor-pointer"
            onClick={() => {
              router.push(`/posts/${post.postId}`);
            }}
          >
            <Post post={post}>
              <PostImages />
              <PostDescription />
            </Post>
          </div>
        ))}
      </div>
    ) : (
      <p>There is no post shared by the user.</p>
    );
  }

  if (feeds === "comments") {
    return comments.length > 0 ? (
      <div>
        {comments.map((comment, idx) => (
          <UserCommentActivity key={`comment-${idx}`} comment={comment} />
        ))}
      </div>
    ) : (
      <p>There is no comment done by the user.</p>
    );
  }

  // Default state when nothing selected
  return (
    <div className="mt-6">
      Click on either posts or comments to see the activity of this user.
    </div>
  );
}

export default UserContent;
