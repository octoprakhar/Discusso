function buildCommentTree(comments, parentId = null) {
  return comments
    .filter((comment) => comment.replyToCommentId === parentId) // find children
    .map((comment) => ({
      ...comment, // spread this one comment’s fields
      replies: buildCommentTree(comments, comment.commentId), // recurse
    }));
}

export function formatComments(comments) {
  return buildCommentTree(comments, null);
}

export function transformPostData(raw) {
  const { post, comments, community } = raw;

  // ---------------- POST ------------------
  const transformedPost = {
    id: post.post_id,
    communityId: post.community_id,
    userId: post.userId,
    creatorName: post.post_creator_name,

    title: post.title,
    description: post.description,

    noOfComments: comments?.length || 0,

    tag: "Help", // (I will replace this using ML later)

    noOfDownvotes: post.noofdownvotes,
    noOfUpvotes: post.noofupvotes,
    hasUserAlreadyUpvoted: post.hasuserupvotedpost,
    hasUserAlreadyDownvoted: post.hasuserdownvotedpost,
    hasUserSavedPost: post.hasusersavedpost,

    createdAt: new Date(post.createdAt).toISOString(),

    media: post.media ?? {},
    links: post.links ?? {},
  };

  // ---------------- COMMENTS ------------------
  const transformedComments = comments
    ? comments.map((c) => ({
        commentId: c.id,
        userId: c.userId, // you didn’t receive this earlier, so add in RPC later if needed
        commentCreatorName: c.commentCreatorName,
        commentUserLogo: c.commentCreatorLogo,

        postId: post.post_id,

        replyToCommentId: c.parentCommentId,
        createdAt: new Date(c.createdAt).toISOString(),
        content: c.content,

        score: c.noOfUpvotesOfComments - c.noOfDownvotes,

        upvotes: c.noOfUpvotesOfComments,
        downvotes: c.noOfDownvotes,

        hasUserUpvoted: c.hasUserUpvotedComment,
        hasUserDownvoted: c.hasUserDownvotedComment,
      }))
    : [];

  // ---------------- COMMUNITY ------------------
  const transformedCommunity = {
    communityId: community.id,
    logo: community.logo,
    communityName: community.name,
    totalCommunityMembers: community.noOfMembers,
    title: community.title,
    description: community.description,
    createdAt: community.createdAt,
    hasUserJoinedCommunity: community.hasUserJoinedCommunity,
  };

  return {
    post: transformedPost,
    comments: transformedComments,
    community: transformedCommunity,
  };
}
