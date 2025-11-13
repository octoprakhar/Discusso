import { supabase } from "./supabase";

export async function findUserByEmail(email) {
  let { data, error } = await supabase
    .from("User")
    .select("*")
    .eq("email", email)
    .single();

  if (!data) {
    return null; // No user found
  }

  if (error) {
    console.error(error);
    throw new Error("Error while finding user by email");
  }

  return data;
}

export async function insertNewUser(query) {
  const { data, error } = await supabase.from("User").insert([query]).select();

  if (error) {
    console.error(error);
    throw new Error("Error while registering user");
  }

  return data;
}

export async function findRefreshTokenByEmail(email) {
  let { data, error } = await supabase
    .from("User")
    .select("refreshToken")
    .eq("email", email)
    .single();

  if (!data) {
    return null; // No token found
  }

  if (error) {
    console.error(error);
    throw new Error("Error while finding user by email");
  }

  return data;
}

export async function findUserIdbyEmail(email) {
  let { data, error } = await supabase
    .from("User")
    .select("id")
    .eq("email", email)
    .single();

  if (!data) {
    return null; // No userId found
  }

  if (error) {
    console.error(error);
    throw new Error("Error while finding user.");
  }

  return data.id;
}

export async function saveOrUpdateRefreshToken(email, token) {
  const { data, error } = await supabase
    .from("User")
    .update({ refreshToken: token })
    .eq("email", email)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error while registering user");
  }

  return data;
}

export async function updateUserLocation(email, userLocation) {
  const { data, error } = await supabase
    .from("User")
    .update({ userLocation: userLocation })
    .eq("email", email)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Error while updating user's location");
  }

  return data;
}

export async function uploadPostImages(image) {
  try {
    if (!image || !image.name) {
      throw new Error("Invalid image file");
    }

    //Defining a unique filename to avoid overwrites
    const filePath = `images/${Date.now()}_${image.name}`;

    // Uploading file to supabase
    const { data, error } = await supabase.storage
      .from("Posts")
      .upload(filePath, image, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload failed:", error);
      throw new Error("Something went wrong. Please try again later.");
    }

    //Getting a public URL for the uploaded file
    const { data: publicUrlData, error: publicUrlError } = supabase.storage
      .from("Posts")
      .getPublicUrl(data.path);

    if (publicUrlError) {
      console.error("Fetching uploaded image failed:", publicUrlError);
      throw new Error("Something went wrong. Please try again later.");
    }

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error("Error uploading image:", err.message);
    throw new Error("Something went wrong. Please try again later.");
  }
}

export async function getAllPosts(limit = 5, offset = 0) {
  let { data: Post, error } = await supabase
    .from("Post")
    .select("*")
    .order("createdAt", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("Posts fetching failed:", error);
    throw new Error("Something went wrong. Please try again later.");
  }

  return Post;
}

export async function insertPost(post) {
  const { data, error } = await supabase
    .from("Post")
    .insert([{ ...post }])
    .select();

  if (error) {
    console.error("Insertion failed:", error);
    throw new Error("Something went wrong. Please try again later.");
  }

  return data;
}

export async function getCommunityById(id) {
  let { data, error } = await supabase
    .from("Community")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) {
    return null; // No Community found
  }

  if (error) {
    console.error(error);
    throw new Error("Error while finding community");
  }

  return data;
}

export async function getNumberOfMemberInCommunity(communityId) {
  const { count, error } = await supabase
    .from("CommunityInteraction")
    .select("*", { count: "exact" })
    .eq("communityId", communityId)
    .eq("isMember", true);

  if (error) {
    console.error("Error counting members:", error);
    throw error;
  }

  return count ?? 0;
}

export async function getPostUpvotesOrDownvotesCount(postId, isCountUpvote) {
  const { count, error } = await supabase
    .from("PostInteraction")
    .select("*", { count: "exact" })
    .eq("postId", postId)
    .eq("vote", isCountUpvote ? 1 : -1);

  if (error) {
    console.error("Error counting votes:", error);
    throw error;
  }

  return count ?? 0;
}

export async function getPostCommentsCount(postId) {
  const { count, error } = await supabase
    .from("Comment")
    .select("*", { count: "exact" })
    .eq("postId", postId);

  if (error) {
    console.error("Error counting comments:", error);
    throw error;
  }

  return count ?? 0;
}

export async function userInteractionWithPost(userId, postId) {
  const { data, error } = await supabase
    .from("PostInteraction")
    .select("vote")
    .eq("postId", postId)
    .eq("userId", userId);

  if (error) {
    console.error("Error getting user vote:", error);
    return 0;
  }

  if (!data || data.length === 0) {
    return 0; // user has no interaction
  }

  return data[0].vote; // return 1 or -1
}

export async function upsertPostInteraction(userId, postId, columnName, value) {
  // Prevent modifying disallowed columns
  const allowedColumns = ["vote"];

  if (!allowedColumns.includes(columnName)) {
    throw new Error("Invalid column name");
  }

  const updateObj = {
    userId,
    postId,
    lastUpdatedAt: new Date().toISOString(),
    [columnName]: value, // dynamic column assignment
  };

  const { data, error } = await supabase
    .from("PostInteraction")
    .upsert(updateObj, {
      onConflict: "postId,userId",
    })
    .select();

  if (error) {
    console.error("Error upserting interaction:", error);
    throw new Error("Could not upsert post interaction");
  }

  return data;
}

//Get all data of only one post
export async function getPostWithFullData(postOrPostId, userId) {
  let post = null;
  let postId = null;

  // CASE 1: post object provided
  if (typeof postOrPostId === "object" && postOrPostId !== null) {
    post = postOrPostId;
    postId = post.id;
  }

  // CASE 2: only postId provided
  if (!post) {
    postId = postOrPostId;

    const { data, error } = await supabase
      .from("Post")
      .select("*")
      .eq("id", postId)
      .single();

    if (error) throw error;

    post = data;
  }

  // Fetch related metadata

  const [noOfUpvotes, noOfDownvotes, noOfComments, userVote] =
    await Promise.all([
      getPostUpvotesOrDownvotesCount(postId, true),
      getPostUpvotesOrDownvotesCount(postId, false),
      getPostCommentsCount(postId),
      userInteractionWithPost(userId, postId),
    ]);

  return {
    ...post,
    noOfUpvotes,
    noOfDownvotes,
    noOfComments,
    hasUserAlreadyUpvoted: userVote === 1,
    hasUserAlreadyDownvoted: userVote === -1,
  };
}

//Getting all the data for more than one post in least amount of queries
export async function getPostsWithFullData(posts, userId) {
  const postIds = posts.map((p) => p.id);

  if (postIds.length === 0) return posts;

  // Bulk fetch all data
  const [voteData, commentData, userInteractions] = await Promise.all([
    supabase
      .from("PostInteraction")
      .select("postId, vote")
      .in("postId", postIds),

    supabase.from("Comment").select("postId").in("postId", postIds),

    userId
      ? supabase
          .from("PostInteraction")
          .select("postId, vote")
          .eq("userId", userId)
          .in("postId", postIds)
      : { data: [] },
  ]);

  // Maps for fast lookups
  const upvotesMap = {};
  const downvotesMap = {};
  const commentsMap = {};
  const userInteractionMap = {};

  // Upvotes & downvotes
  voteData.data?.forEach((row) => {
    if (row.vote === 1) {
      upvotesMap[row.postId] = (upvotesMap[row.postId] || 0) + 1;
    } else if (row.vote === -1) {
      downvotesMap[row.postId] = (downvotesMap[row.postId] || 0) + 1;
    }
  });

  // Comments
  commentData.data?.forEach((row) => {
    commentsMap[row.postId] = (commentsMap[row.postId] || 0) + 1;
  });

  // User interactions
  userInteractions.data?.forEach((row) => {
    userInteractionMap[row.postId] = row.vote;
  });

  // Merge into the original posts
  return posts.map((post) => {
    const pid = post.id;
    const userVote = userInteractionMap[pid] ?? 0;

    return {
      ...post,
      noOfUpvotes: upvotesMap[pid] || 0,
      noOfDownvotes: downvotesMap[pid] || 0,
      noOfComments: commentsMap[pid] || 0,
      hasUserAlreadyUpvoted: userVote === 1,
      hasUserAlreadyDownvoted: userVote === -1,
    };
  });
}
