import Comments from "@/app/_components/Comments";
import CommentSection from "@/app/_components/CommentSection";
import { Post, PostDescription, PostImages } from "@/app/_components/Posts";

async function page({ params }) {
  const param = await params;
  const postId = param.postID;

  //   Get the post from postID, and get user from userID from post like this

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

  const user = {
    userId: 2,
    username: "CupPrize1581",
  };

  /* 
 Comment Table must be something like this 
 {
 commentId: UUID/INT,
 userId: Int, //Connecting to the user who wrote the comment
 postId: Int, //Connecting to the post in which this comment has been written
 replyToCommentId: Int?, //Is this the comment written to reply any comment, if yes give the comment Id of that primary comment , Null means it is the root comment of this post
 createdAt: Date_time,
 content: String, // The content of comment
 score: Int , //Upvote - downvote
 upvotes: Int,// Number of upvotes
 downvotes: Int, // Number of downvotes for each comments
 hasUserUpvoted: Boolean,
 hasUserDownvoted: Boolean

 }
*/

  // Get all the comments respect to this post, using postID. We will get the array of comments. Now we rearrange them in this way
  /*
  We will make array of an object starting from each root comment(the comments with "replyToCommentId" is NULL), and then we will start to make
  make the array of objects inside it with their replies as their value. Unitil we won't get each last nodes key value pair as {key:NULL};
  eg.
  [
  {root_comment_1: NULL}, //It means we got the root comment 1 but there is not replies to that comment
  {root_comment_2: [
  c_1 : [{x1: NULL},{x2:NULL},{x3:NULL}],  //It means c_1 was a reply comment to root_comment_2, and x1,x2,x3 are reply comments of c_1. No comment is reply comment of x1,x2,x3
  c_2: NULL
  ]}
  ]
*/
  return (
    <div className="lg:flex lg:gap-4">
      <div className="overflow-x-hidden w-full sm:w-xl md:w-2xl sm:mx-auto border-t-[1px] border-b-[1px] px-2 py-1 flex flex-col flex-1">
        <Post post={post} creatorName={user.username} toShowBackButton={true}>
          <PostImages />
          <PostDescription />
        </Post>

        {/* Comment Section */}
        <div className="mt-2">
          <h2 className="font-bold text-3xl mb-2">Comments on this Post</h2>
          <CommentSection />
          <Comments />
        </div>
      </div>
      <div className="w-52 h-72 border-2 bg-slate-300"></div>
    </div>
  );
}

export default page;
