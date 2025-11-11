import MainSideBar from "./_components/MainSideBar";
import {
  Post,
  PostDescription,
  PostImages,
  PostLink,
} from "./_components/Posts";

import {
  getAllPosts,
  getCommunityById,
  getNumberOfMemberInCommunity,
  getPostsWithFullData,
} from "./_libs/data-service";
import { getUserId } from "./utils/userUtils";

export default async function Home() {
  const posts = await getAllPosts();
  if (!posts) return <h1>No posts available right now.</h1>;

  const communityIds = posts.map((p) => p.communityId);

  const userId = await getUserId();

  // metadata enrichment
  const enrichedPosts = await getPostsWithFullData(posts, userId);

  // COMMUNITY DATA
  const communityDataList = await Promise.all(
    communityIds.map(async (id) => {
      const data = await getCommunityById(id);
      const members = await getNumberOfMemberInCommunity(id);

      return {
        communityId: data.id,
        communityName: data.name,
        logo: data.logo,
        description: data.description,
        totalCommunityMembers: members,
      };
    })
  );

  return (
    <>
      <MainSideBar />
      {enrichedPosts.map((post, i) => (
        <Post key={post.id} post={post} community={communityDataList[i]}>
          {post.description && <PostDescription />}
          {post.media?.images && <PostImages />}
          {post.links && <PostLink />}
        </Post>
      ))}
    </>
  );
}
