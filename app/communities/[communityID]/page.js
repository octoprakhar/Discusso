import CommunityAboutSection from "@/app/_components/CommunityAboutSection";
import CommunityHeaderSection from "@/app/_components/CommunityHeaderSection";
import { Post, PostDescription, PostImages } from "@/app/_components/Posts";
import { getCommunityById } from "@/app/_libs/data-service";
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

  let posts;
  let community;
  try {
    const userId = await getUserId();
    const data = await getCommunityById(communityId, userId || null);
    ({ posts, community } = data);
    // console.log("🎉 CommunityId Page.js: got data as : \n", );
  } catch (err) {
    console.error(err);
  }

  const modifiedData = {
    id: community.id,
    communityName: community.name,
    communityLogo: community.logo,
    hasUserJoined: community.isUserMember,
    communityTitle: community.title,
    communityDescription: community.description,
    createdAt: community.createdAt,
    noOfMembers: community.numberOfMembers,
  };

  return (
    <div className="space-y-2">
      <CommunityHeaderSection
        communityLogo={modifiedData.communityLogo}
        communityName={modifiedData.communityName}
        hasUserJoined={modifiedData.hasUserJoined}
        communityId={modifiedData.id}
      />

      <CommunityAboutSection
        communityTitle={modifiedData.communityTitle}
        communityDescription={modifiedData.communityDescription}
        createdAt={formatToReadableDate(modifiedData.createdAt)}
      />

      {/* Decide which children to use depending on the available post */}
      {posts.map((post) => (
        <Post
          key={post.id}
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
