// This page will tell you all of my posts.
import { Post, PostDescription, PostImages } from "@/app/_components/Posts";
import { getUserProfileDetailByUserId } from "@/app/_libs/data-service";
import { getUserId } from "@/app/utils/userUtils";

export const dynamic = "force-dynamic";

export default async function Page() {
  //Get all the created post from the user

  //Dummy data

  let data;
  try {
    const signedInUserId = await getUserId();
    data = await getUserProfileDetailByUserId(signedInUserId, signedInUserId);
    // console.log("🎁UserId page.js: Got data as :", data);
  } catch (err) {
    console.error(err);
  }

  const { posts } = data;

  // const posts = [
  //   {
  //     postId: 1,
  //     communityId: 3,
  //     userId: 2,
  //     userName: "u/nmon", // Need to get from somewhere using userID
  //     title: "My First post",
  //     description: "This is the description of the post",
  //     noOfComments: 233,
  //     downvotes: 12,
  //     upvotes: 221,
  //     hasUserAlreadyUpvoted: true,
  //     hasUserAlreadyDownvoted: false,
  //     createdAt: "2025-09-01T14:23:00.000Z", //I will be given a simple date-time string need to convert in this format
  //     images: ["/bg-1.jpg", "/discusso_logo.png"],
  //     links: [
  //       { github: "https://github.com/" },
  //       {
  //         chatGPT: "https://chatgpt.com/c/68b67c7a-d278-8322-ba2a-c7abd8fb37b4",
  //       },
  //     ],
  //     video: "/sample_video.mp4",
  //   },
  //   {
  //     postId: 2,
  //     communityId: 3,
  //     userId: 5,
  //     userName: "u/asdfusgb", // Need to get from somewhere using userID
  //     title: "My First post",
  //     description: "This is the description of the post",
  //     noOfComments: 233,
  //     downvotes: 12,
  //     upvotes: 221,
  //     hasUserAlreadyUpvoted: true,
  //     hasUserAlreadyDownvoted: false,
  //     createdAt: "2025-09-01T14:23:00.000Z", //I will be given a simple date-time string need to convert in this format
  //     images: ["/bg-1.jpg", "/discusso_logo.png"],
  //     links: [
  //       { github: "https://github.com/" },
  //       {
  //         chatGPT: "https://chatgpt.com/c/68b67c7a-d278-8322-ba2a-c7abd8fb37b4",
  //       },
  //     ],
  //     video: "/sample_video.mp4",
  //   },
  //   {
  //     postId: 3,
  //     communityId: 3,
  //     userId: 2,
  //     userName: "u/cricket", // Need to get from somewhere using userID
  //     title: "My First post",
  //     description: "This is the description of the post",
  //     noOfComments: 233,
  //     downvotes: 12,
  //     upvotes: 221,
  //     hasUserAlreadyUpvoted: true,
  //     hasUserAlreadyDownvoted: false,
  //     createdAt: "2025-09-01T14:23:00.000Z", //I will be given a simple date-time string need to convert in this format
  //     images: ["/bg-1.jpg", "/discusso_logo.png"],
  //     links: [
  //       { github: "https://github.com/" },
  //       {
  //         chatGPT: "https://chatgpt.com/c/68b67c7a-d278-8322-ba2a-c7abd8fb37b4",
  //       },
  //     ],
  //     video: "/sample_video.mp4",
  //   },
  //   {
  //     postId: 4,
  //     communityId: 3,
  //     userId: 2,
  //     userName: "u/terihkn", // Need to get from somewhere using userID
  //     title: "My First post",
  //     description: "This is the description of the post",
  //     noOfComments: 233,
  //     downvotes: 12,
  //     upvotes: 221,
  //     hasUserAlreadyUpvoted: true,
  //     hasUserAlreadyDownvoted: false,
  //     createdAt: "2025-09-01T14:23:00.000Z", //I will be given a simple date-time string need to convert in this format
  //     images: ["/bg-1.jpg", "/discusso_logo.png"],
  //     links: [
  //       { github: "https://github.com/" },
  //       {
  //         chatGPT: "https://chatgpt.com/c/68b67c7a-d278-8322-ba2a-c7abd8fb37b4",
  //       },
  //     ],
  //     video: "/sample_video.mp4",
  //   },
  //   {
  //     postId: 5,
  //     communityId: 3,
  //     userId: 2,
  //     userName: "u/sakari", // Need to get from somewhere using userID
  //     title: "My First post",
  //     description: "This is the description of the post",
  //     noOfComments: 233,
  //     downvotes: 12,
  //     upvotes: 221,
  //     hasUserAlreadyUpvoted: true,
  //     hasUserAlreadyDownvoted: false,
  //     createdAt: "2025-09-01T14:23:00.000Z", //I will be given a simple date-time string need to convert in this format
  //     images: ["/bg-1.jpg", "/discusso_logo.png"],
  //     links: [
  //       { github: "https://github.com/" },
  //       {
  //         chatGPT: "https://chatgpt.com/c/68b67c7a-d278-8322-ba2a-c7abd8fb37b4",
  //       },
  //     ],
  //     video: "/sample_video.mp4",
  //   },
  //   {
  //     postId: 6,
  //     communityId: 3,
  //     userId: 2,
  //     userName: "u/mando", // Need to get from somewhere using userID
  //     title: "My First post",
  //     description: "This is the description of the post",
  //     noOfComments: 233,
  //     downvotes: 12,
  //     upvotes: 221,
  //     hasUserAlreadyUpvoted: true,
  //     hasUserAlreadyDownvoted: false,
  //     createdAt: "2025-09-01T14:23:00.000Z", //I will be given a simple date-time string need to convert in this format
  //     images: ["/bg-1.jpg", "/discusso_logo.png"],
  //     links: [
  //       { github: "https://github.com/" },
  //       {
  //         chatGPT: "https://chatgpt.com/c/68b67c7a-d278-8322-ba2a-c7abd8fb37b4",
  //       },
  //     ],
  //     video: "/sample_video.mp4",
  //   },
  // ];

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">View All My Post</h1>
      {posts.map((post) => (
        <Post
          key={post.postId}
          post={post}
          // showUserNameAsMainName={false}
          creatorName={post.userName}
          toShowSavePostButton={true}
        >
          <PostDescription />
          <PostImages />
        </Post>
      ))}
    </div>
  );
}
