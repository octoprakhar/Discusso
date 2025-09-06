import MainSideBar from "./_components/MainSideBar";
import {
  Description,
  Post,
  PostDescription,
  PostImages,
  PostLink,
  PostVideo,
} from "./_components/Posts";

export default function Home() {
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
      <Post post={post}>
        <PostDescription />
        {/* <PostVideo /> */}
        <PostImages />
        <PostLink />
      </Post>
    </>
  );
}
