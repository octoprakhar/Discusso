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
