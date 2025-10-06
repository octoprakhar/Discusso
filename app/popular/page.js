import {
  Post,
  PostDescription,
  PostImages,
  PostLink,
} from "../_components/Posts";

export default function Page() {
  //This is where I will show all the popular posts of last day
  // Popular means the post with most number of upvote + downvotes + comments
  //Get top 10 popular posts of last day then get another 10, then another 10 and so on

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
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">View All Popular Posts</h1>
      <Post post={post}>
        <PostDescription />
        {/* <PostVideo /> */}
        <PostImages />
        <PostLink />
      </Post>
    </div>
  );
}
