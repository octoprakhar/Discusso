import { Post, PostDescription, PostImages } from "@/app/_components/Posts";
import UserCommentActivity from "@/app/_components/UserCommentActivity";
import { getUserProfileDetailByUserId } from "@/app/_libs/data-service";
import { getUserId } from "@/app/utils/userUtils";
import { CameraIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Page() {
  /*
    a. I need all the posts from the user that has logged in.
    b. Need some user details:
        1. user icon
        2. username
        3. no. of upvotes upvotes user got
        4. no. of downvotes downvotes user got
        5. Total number of user's posts + comments to calculate contribution
        6. user joined discusso date

    
    */

  let data;
  try {
    const signedInUserId = await getUserId();
    data = await getUserProfileDetailByUserId(signedInUserId, signedInUserId);
    // console.log("🎁UserId page.js: Got data as :", data);
  } catch (err) {
    console.error(err);
  }

  const { user, comments: allComments, posts } = data;

  console.log("🎁 MyProfile Page.js : Got user's as: ", user);
  console.log("🎁 MyProfile Page.js : Got comments as: ", allComments);
  console.log("🎁 MyProfile Page.js : Got posts as: ", posts);

  //Dummy data

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
  //     userId: 2,
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
    <div className="space-y-4 px-2 md:px-6">
      <div className="flex gap-4 px-2 py-1 items-center">
        <div className="relative">
          <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full">
            <Image
              src={
                user.userIcon === "" || !user.userIcon
                  ? "/discusso_logo.png"
                  : user.userIcon
              }
              alt={user.userName}
              fill
              className="object-cover object-center rounded-full"
            />
            <Link
              className="absolute top-16 left-16 md:top-20 md:left-20 p-1 rounded-full bg-slate-100 cursor-pointer hover:bg-slate-200"
              href="/settings"
            >
              <CameraIcon className="h-6 w-6 md:h-10 md:w-10" />
            </Link>
          </div>
        </div>
        <div className="space-y-1">
          <h1 className="text-xl md:text-3xl font-bold">
            {user.displayName || user.userName}
          </h1>
          <h4 className="md:text-xl">u/{user.userName}</h4>
        </div>
      </div>
      <div className="flex flex-wrap justify-between rounded-2xl border-2 border-slate-800 bg-slate-300 px-2 py-1 md:px-6">
        <div>
          <p className="text-center text-lg md:text-2xl font-bold">
            {user.karma}
          </p>
          <p>Karmas</p>
        </div>
        <div>
          <p className="text-center text-lg md:text-2xl font-bold">
            {user.noOfTotalUpvotes}
          </p>
          <p>Upvotes</p>
        </div>
        <div>
          <p className="text-center text-lg md:text-2xl font-bold">
            {user.noOfTotalDownvotes}
          </p>
          <p>Downvotes</p>
        </div>
        <div>
          <p className="text-center text-lg md:text-2xl font-bold">
            {user.noOfContributions}
          </p>
          <p>Contributions</p>
        </div>
      </div>
      {/* Decide which children to use depending on the available post */}
      {posts.map((post) => (
        <Post
          key={post.postId}
          post={post}
          showUserNameAsMainName={false}
          creatorName={post.userName}
        >
          <PostDescription />
          <PostImages />
        </Post>
      ))}

      <h2 className="text-5xl font-bold mt-6">View All My Comments:</h2>
      {allComments.map((comment, idx) => (
        <UserCommentActivity
          key={comment.commentId}
          comment={comment}
          userName={user.userName}
        />
      ))}
    </div>
  );
}
