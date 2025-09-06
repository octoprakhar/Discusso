import { faker } from "@faker-js/faker";

// Helper function to generate a random date within a time range
const randomDate = (start, end) => {
  const date = new Date(+start + Math.random() * (end - start));
  return date.toISOString();
};

// Function to generate random comments
export const generateComments = (numComments) => {
  const comments = [];

  for (let i = 1; i <= numComments; i++) {
    let replyToCommentId = null;

    if (i > 1 && Math.random() < 0.5) {
      // Pick a random earlier comment id
      const parent = comments[Math.floor(Math.random() * (i - 1))];
      replyToCommentId = parent.commentId;
    }

    const comment = {
      commentId: i, // simple int instead of UUID
      userId: Math.floor(Math.random() * 50) + 1,
      postId: 1, //Always same for each comment
      replyToCommentId, // int or null
      createdAt: randomDate(new Date(2023, 0, 1).getTime(), Date.now()),
      content: faker.lorem.sentence(),
      score: Math.floor(Math.random() * 21) - 10,
      upvotes: Math.floor(Math.random() * 100),
      downvotes: Math.floor(Math.random() * 50),
      hasUserUpvoted: false,
      hasUserDownvoted: false,
    };

    comments.push(comment);
  }

  return comments;
};
