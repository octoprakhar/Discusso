import { Post, PostDescription, PostImages } from "@/app/_components/Posts";
import TextBackgroundButton from "@/app/_components/TextBackgroundButton";
import UserCommonAboutSection from "@/app/_components/UserCommonAboutSection";
import UserContent from "@/app/_components/UserContent";
import { getUserProfileDetailByUserId } from "@/app/_libs/data-service";
import { getUserId } from "@/app/utils/userUtils";
import Image from "next/image";

async function page({ params }) {
  const param = await params;
  const userId = param.userID;

  //I need four things for this page majorily
  /**
   1. User's detail for this userID.
   2. Posts that this user has created
   3. Title of the post in which this user has commented
   4. Comments that user has made
   5. And username of the users whose comments the user was replaying to it maybe an array with something like this [{userID: userName},{userID: userName},{userID: userName}.....]
   */
  let data;
  try {
    const signedInUserId = await getUserId();
    console.log(
      `🎁 UserId page.js: Got targetUserId as ${userId} and type is ${typeof userId}`
    );
    console.log(
      `🎁 UserId page.js: Got signedInUserId as ${signedInUserId} and type is ${typeof signedInUserId}`
    );
    data = await getUserProfileDetailByUserId(
      userId,
      signedInUserId || undefined
    );
    // console.log("🎁UserId page.js: Got data as :", data);
  } catch (err) {
    console.error(err);
  }

  const { user, comments: allComments, posts: allPost } = data;
  // console.log(
  //   `🎁UserId page.js: Got posts of length ${allPost.length} as :`,
  //   allPost
  // );
  // console.log(`🎁UserId page.js: Got user as :`, user);
  console.log(`🎁UserId page.js: Got comments as :`, allComments);
  // const user = {
  //   userId: userId,
  //   createdAt: new Date(),
  //   userName: "Individual-Horse",
  //   userIcon: "/bg-1.jpg",
  //   totalUpvotes: 12, //Total upvotes in every post made by this user
  //   totalDownvotes: 2, //Total upvotes in every post made by this user
  //   totalCommunities: 24, //Number of communities user has joined
  //   totalContributions: 123, //No of sum of total posts + comments of this user
  // };

  // const post = {
  //   postId: 1,
  //   communityId: 3,
  //   userId: 2,
  //   title: "My First post",
  //   description: "This is the description of the post",
  //   noOfComments: 233,
  //   tag: "Help", //Try to generate automated using ML
  //   downvotes: 12,
  //   upvotes: 221,
  //   hasUserAlreadyUpvoted: true,
  //   hasUserAlreadyDownvoted: false,
  //   createdAt: "2025-09-01T14:23:00.000Z", //I will be given a simple date-time string need to convert in this format
  //   images: ["/bg-1.jpg", "/discusso_logo.png"],
  //   links: [
  //     { github: "https://github.com/" },
  //     { chatGPT: "https://chatgpt.com/c/68b67c7a-d278-8322-ba2a-c7abd8fb37b4" },
  //   ],
  //   video: "/sample_video.mp4",
  // };

  // //Getting the all posts created by this user
  // const allPost = [
  //   {
  //     postId: 1,
  //     communityId: 3,
  //     userId: 2,
  //     title: "My First post",
  //     description: "This is the description of the post",
  //     noOfComments: 233,
  //     tag: "Help", //Try to generate automated using ML
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
  //     title: "My First post",
  //     description: "This is the description of the post",
  //     noOfComments: 233,
  //     tag: "Help", //Try to generate automated using ML
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
  //     title: "My First post",
  //     description: "This is the description of the post",
  //     noOfComments: 233,
  //     tag: "Help", //Try to generate automated using ML
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
  // // const user = {
  // //   userId: 2,
  // //   username: "CupPrize1581",
  // // };

  // //Get all the comments done by this user
  // const allComments = [
  //   "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
  //   "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
  //   "when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  //   "It was popularised in the 1960s with the release of Letraset",
  //   "with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  // ];

  return (
    <div className="px-4 py-2">
      {/* Header of user */}
      <div>
        {/* Image container */}
        <div className="relative h-28 w-28 md:h-36 md:w-36 rounded-full bg-sky-100">
          <Image
            src={user.userIcon}
            alt={user.userName}
            fill
            className="object-contain rounded-full"
          />
        </div>
        <p className="font-bold text-lg md:text-xl">{user.userName}</p>
        <p className="text-sm md:text-lg">u/{user.userName}</p>
      </div>
      {/* About section */}
      <UserCommonAboutSection user={user} />

      <div className="flex gap-8">
        <TextBackgroundButton text="Posts" urlParamKey="feeds" />
        <TextBackgroundButton text="Comments" urlParamKey="feeds" />
      </div>
      <UserContent posts={allPost} comments={allComments} user={user} />
    </div>
  );
}

export default page;
