/*
This page will show:
1. all the recommended community name with help of user's upvote, downvote pattern
2.  similar communities which user has joined already joined. Maybe mixture of members that has joined that community has joined others or something.
3. Same areas top community
*/

import CommunityRecommendationByLocation from "../_components/CommunityRecommendationByLocation";
import RecommendedCommunityItem from "../_components/RecommendedCommunityItem";
import SimilarCommunityItem from "../_components/SimilarCommunityItem";

export default function Page() {
  //Get signed in user id, if not signedIN it must not open this page

  //Get all communities the user has joined. and analyze for each community with other users if one joined this it may join that one too like that.

  const userJoinedCommunities = [
    {
      id: 11,
      name: "joined1",
    },
    {
      id: 21,
      name: "joined2",
    },
    {
      id: 311,
      name: "joined3",
    },
    {
      id: 41,
      name: "joined4",
    },
  ];

  //I need to show the top communities with respect to top 10 most joined community of that country same as signed in user. And also that community is not joined by user
  const userLocation = "India";

  return (
    <div className="px-2 space-y-4">
      <h1 className="text-3xl md:text-4xl font-bold">Explore Communities</h1>
      <h2 className="text-lg md:text-2xl font-bold">Recommended for you</h2>
      <RecommendedCommunityItem signedInUserId={1} />
      {userJoinedCommunities.map((community) => (
        <div key={community.id} className="space-y-1">
          <h2 className="text-lg md:text-2xl font-bold">
            More Like {community.name}
          </h2>
          <SimilarCommunityItem alreadyJoinedCommunity={community} />
        </div>
      ))}
      <div className="space-y-1">
        <h2 className="text-lg md:text-2xl font-bold">
          Trending Communities in {userLocation}.
        </h2>
        <CommunityRecommendationByLocation userLocation={userLocation} />
      </div>
    </div>
  );
}
