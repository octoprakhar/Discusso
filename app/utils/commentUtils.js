export function insertCommentRecursively(list, newComment) {
  // Case 1: It is a root comment
  if (!newComment.replyToCommentId) {
    return [{ ...newComment, replies: [] }, ...list];
  }

  // Case 2: It is a reply, find the parent
  return list.map((comment) => {
    if (comment.commentId === newComment.replyToCommentId) {
      return {
        ...comment,
        replies: [{ ...newComment, replies: [] }, ...(comment.replies || [])],
      };
    }

    // Search deeper in nested replies
    return {
      ...comment,
      replies: insertCommentRecursively(comment.replies || [], newComment),
    };
  });
}
