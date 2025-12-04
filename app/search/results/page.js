import SearchCommunityItem from "@/app/_components/SearchCommunityItem";
import SearchPostItem from "@/app/_components/SearchPostItem";
import SearchTypeSelector from "@/app/_components/SearchTypeSelector";
import { getSearchResults } from "@/app/_libs/data-service";

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const query = params.q || "";
  const searchType = params.searchType || "";

  //Get top 10 postId and communityID , and then get posts, community from the given query. Get community name and icon of that community from the community Id we will get from post
  const { postSearchData: posts, communitySearchData: communities } =
    await getSearchResults(query);
  console.log("🤩 Action.js: Got data for post as,", posts);
  console.log("🤩 Action.js: Got data for community as,", communities);
  // const posts = [
  //   {
  //     postId: 1,
  //     communityId: 3,
  //     communityName: "usdfjb", //Get name of community from community ID.
  //     communityLogo: "/discusso_logo.png", //Get from the community ID.
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
  //     communityName: "usdfjb", //Get name of community from community ID.
  //     communityLogo: "/discusso_logo.png", //Get from the community ID.
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
  //     communityName: "usdfjb", //Get name of community from community ID.
  //     communityLogo: "/discusso_logo.png", //Get from the community ID.
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
  //     communityName: "usdfjb", //Get name of community from community ID.
  //     communityLogo: "/discusso_logo.png", //Get from the community ID.
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
  //     communityName: "usdfjb", //Get name of community from community ID.
  //     communityLogo: "/discusso_logo.png", //Get from the community ID.
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
  //     communityName: "usdfjb", //Get name of community from community ID.
  //     communityLogo: "/discusso_logo.png", //Get from the community ID.
  //     userId: 2,
  //     userName: "u/mando", // Need to get from somewhere using userID
  //     title:
  //       "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
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

  // const communities = [
  //   {
  //     id: 1,
  //     icon: "/bg-1.jpg",
  //     name: "asdfweg",
  //     title: "This is the title",
  //     noOfMembers: 122,
  //   },
  //   {
  //     id: 2,
  //     icon: "/bg-1.jpg",
  //     name: "asdfweg",
  //     title: "This is the title",
  //     noOfMembers: 122,
  //   },
  //   {
  //     id: 3,
  //     icon: "/bg-1.jpg",
  //     name: "asdfweg",
  //     title: "This is the title",
  //     noOfMembers: 122,
  //   },
  //   {
  //     id: 4,
  //     icon: "/bg-1.jpg",
  //     name: "asdfweg",
  //     title: "This is the title",
  //     noOfMembers: 122,
  //   },
  //   {
  //     id: 5,
  //     icon: "/bg-1.jpg",
  //     name: "asdfweg",
  //     title: "This is the title",
  //     noOfMembers: 122,
  //   },
  //   {
  //     id: 6,
  //     icon: "/bg-1.jpg",
  //     name: "asdfweg",
  //     title: "This is the title",
  //     noOfMembers: 122,
  //   },
  //   {
  //     id: 7,
  //     icon: "/bg-1.jpg",
  //     name: "asdfweg",
  //     title: "This is the title",
  //     noOfMembers: 122,
  //   },
  //   {
  //     id: 8,
  //     icon: "/bg-1.jpg",
  //     name: "asdfweg",
  //     title: "This is the title",
  //     noOfMembers: 122,
  //   },
  // ];

  return (
    <div className="px-2 py-1 space-y-2">
      <SearchTypeSelector />
      {searchType == "posts" ? (
        <div className="sm:w-[80%] mx-auto space-y-1">
          {posts.map((post) => (
            <SearchPostItem key={post.postId} post={post} />
          ))}
        </div>
      ) : (
        <div className="sm:w-[80%] mx-auto space-y-1">
          {communities.map((community) => (
            <SearchCommunityItem key={community.id} community={community} />
          ))}
        </div>
      )}
    </div>
  );
}
