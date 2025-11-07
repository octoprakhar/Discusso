import MainSideBar from "./_components/MainSideBar";
import {
  Description,
  Post,
  PostDescription,
  PostImages,
  PostLink,
  PostVideo,
} from "./_components/Posts";
import { getAllPosts } from "./_libs/data-service";

export default async function Home() {
  //Getting all the posts in the starting of the page
  const posts = await getAllPosts();

  if (!posts) {
    return <h1>We do not have any posts to show for now.</h1>;
  }

  console.log(posts);
  {
    /* Creating Dummy post */
  }
  const post = {
    postId: 1,
    communityId: 3,
    userId: 2,
    title: "My First post",
    description: "This is the description of the post",
    noOfComments: 233,
    downvotes: 12,
    upvotes: 221,
    hasUserAlreadyUpvoted: true,
    hasUserAlreadyDownvoted: false,
    createdAt: "2025-09-01T14:23:00.000Z", //I will be given a simple date-time string need to convert in this format
    images: ["/bg-1.jpg", "/discusso_logo.png"],
    links: [
      { github: "https://github.com/" },
      { chatGPT: "https://chatgpt.com/c/68b67c7a-d278-8322-ba2a-c7abd8fb37b4" },
    ],
    video: "/sample_video.mp4",
  };

  return (
    <>
      <MainSideBar />
      {posts.map((post) => (
        <Post key={post.postId} post={post}>
          {post.description && <PostDescription />}
          {post.media?.images && <PostImages />}
          {post.links && <PostLink />}
        </Post>
      ))}
    </>
  );
}
