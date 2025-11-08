import toast from "react-hot-toast";
import MainSideBar from "./_components/MainSideBar";
import {
  Description,
  Post,
  PostDescription,
  PostImages,
  PostLink,
  PostVideo,
} from "./_components/Posts";
import {
  getAllPosts,
  getCommunityById,
  getNumberOfMemberInCommunity,
  getPostCommentsCount,
  getPostUpvotesOrDownvotesCount,
} from "./_libs/data-service";

export default async function Home() {
  //Getting all the posts in the starting of the page
  const posts = await getAllPosts();
  const communityIds = posts?.map((post) => post.communityId) || [];
  const postIds = posts?.map((post) => post.id) || [];

  const postsWithVotesCount = await Promise.all(
    posts.map(async (post) => {
      const [noOfComments, noOfUpvotes, noOfDownvotes] = await Promise.all([
        getPostCommentsCount(post.id),
        getPostUpvotesOrDownvotesCount(post.id, true),
        getPostUpvotesOrDownvotesCount(post.id, false),
      ]);

      return { ...post, noOfComments, noOfUpvotes, noOfDownvotes };
    })
  );

  //Getting all the community related data required to sent to post components
  const communityDataList = [];
  try {
    for (const id of communityIds) {
      const communityData = await getCommunityById(id);
      const numberOfMembers = await getNumberOfMemberInCommunity(id);
      const community = {
        communityId: communityData.id,
        communityName: communityData.name,
        logo: communityData.logo,
        description: communityData.description,
        totalCommunityMembers: numberOfMembers,
      };

      communityDataList.push(community);
    }
  } catch (err) {
    console.error(err);
  }

  console.log(postsWithVotesCount);

  if (!posts) {
    return <h1>We do not have any posts to show for now.</h1>;
  }

  // console.log(posts, communityIds);
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
      {postsWithVotesCount.map((post, i) => (
        <Post key={post.postId} post={post} community={communityDataList[i]}>
          {post.description && <PostDescription />}
          {post.media?.images && <PostImages />}
          {post.links && <PostLink />}
        </Post>
      ))}
    </>
  );
}
