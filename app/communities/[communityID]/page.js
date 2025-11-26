import CommunityAboutSection from "@/app/_components/CommunityAboutSection";
import CommunityHeaderSection from "@/app/_components/CommunityHeaderSection";
import { Post, PostDescription, PostImages } from "@/app/_components/Posts";
import {
  getCommunityById,
  getPostsByCommunityId,
} from "@/app/_libs/data-service";
import { formatToReadableDate } from "@/app/utils/dateTimeUtils";
import { getUserId } from "@/app/utils/userUtils";

export default async function Page({ params }) {
  /*
    In this page I need:
    1. Community name
    2. Community Logo
    3. Whether the user has joined this community or not
    4. Community Title
    5. Community Description
    6. Created at
    7. Number of members
    8. All posts of this community
    */

  /*
    We will use the same post component, just with a slight difference, here we don't use the community name as the heading, instead user name.
    */

  const { communityID: communityId } = await params;

  console.log(`CommunityPage: Community id is : ${communityId}`);

  let data;
  let postData;
  try {
    data = await getCommunityById(communityId);
    const userId = await getUserId();
    postData = await getPostsByCommunityId(communityId, userId || null);
    // console.log(data);
    console.log(postData);
  } catch (err) {
    console.error(err);
  }

  const modifiedData = {
    id: data.id,
    communityName: data.name,
    communityLogo: data.logo,
    hasUserJoined: true, //I will modify it,
    communityTitle: data.title,
    communityDescription: data.description,
    createdAt: data.createdAt,
    noOfMembers: 122, //Need to get this data too
  };

  // const data = {
  //   communityName: "r/React",
  //   communityLogo: "/bg-1.jpg",
  //   hasUserJoined: true, //Somehow just calculate it
  //   communityTitle: "React – A JavaScript library for building user interfaces",
  //   communityDescription:
  //     "The (unofficial) React.js subreddit for all things React!",
  //   createdAt: "Created Sep 5, 2011", //Must make it in this format
  //   noOfMembers: 122,
  // };

  //Dummy data

  const posts = [
    {
      postId: 1,
      communityId: 3,
      userId: 2,
      userName: "u/nmon", // Need to get from somewhere using userID
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
        {
          chatGPT: "https://chatgpt.com/c/68b67c7a-d278-8322-ba2a-c7abd8fb37b4",
        },
      ],
      video: "/sample_video.mp4",
    },
    {
      postId: 2,
      communityId: 3,
      userId: 5,
      userName: "u/asdfusgb", // Need to get from somewhere using userID
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
        {
          chatGPT: "https://chatgpt.com/c/68b67c7a-d278-8322-ba2a-c7abd8fb37b4",
        },
      ],
      video: "/sample_video.mp4",
    },
    {
      postId: 3,
      communityId: 3,
      userId: 2,
      userName: "u/cricket", // Need to get from somewhere using userID
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
        {
          chatGPT: "https://chatgpt.com/c/68b67c7a-d278-8322-ba2a-c7abd8fb37b4",
        },
      ],
      video: "/sample_video.mp4",
    },
    {
      postId: 4,
      communityId: 3,
      userId: 2,
      userName: "u/terihkn", // Need to get from somewhere using userID
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
        {
          chatGPT: "https://chatgpt.com/c/68b67c7a-d278-8322-ba2a-c7abd8fb37b4",
        },
      ],
      video: "/sample_video.mp4",
    },
    {
      postId: 5,
      communityId: 3,
      userId: 2,
      userName: "u/sakari", // Need to get from somewhere using userID
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
        {
          chatGPT: "https://chatgpt.com/c/68b67c7a-d278-8322-ba2a-c7abd8fb37b4",
        },
      ],
      video: "/sample_video.mp4",
    },
    {
      postId: 6,
      communityId: 3,
      userId: 2,
      userName: "u/mando", // Need to get from somewhere using userID
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
        {
          chatGPT: "https://chatgpt.com/c/68b67c7a-d278-8322-ba2a-c7abd8fb37b4",
        },
      ],
      video: "/sample_video.mp4",
    },
  ];

  return (
    <div className="space-y-2">
      <CommunityHeaderSection
        communityLogo={modifiedData.communityLogo}
        communityName={modifiedData.communityName}
        hasUserJoined={modifiedData.hasUserJoined}
      />

      <CommunityAboutSection
        communityTitle={modifiedData.communityTitle}
        communityDescription={modifiedData.communityDescription}
        createdAt={formatToReadableDate(modifiedData.createdAt)}
      />

      {/* Decide which children to use depending on the available post */}
      {posts.map((post) => (
        <Post
          key={post.postId}
          post={post}
          showUserNameAsMainName={true}
          creatorName={post.userName}
        >
          <PostDescription />
          <PostImages />
        </Post>
      ))}
    </div>
  );
}
