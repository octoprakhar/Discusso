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

export async function getCommunityById(communityId, userId) {
  const { data, error } = await supabase.rpc("get_community_details", {
    community_id: communityId,
    uid: userId,
  });

  // console.log("🎉 Data-service.js: Got data as", data);

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
export async function getPostWithFullData(postId, userId) {
  const { data, error } = await supabase.rpc("get_single_post_with_metadata", {
    pid: postId,
    uid: userId,
  });

  if (error) throw error;
  return data[0];
}

//Using view to load data for not signed in user
export async function getPostswithoutUserData(limit, offset) {
  const { data, error } = await supabase.rpc("get_guest_posts", {
    limit_count: limit,
    offset_count: offset,
  });

  if (error) throw error;
  return data;
}

export async function getPostsWithUserData(userId, limit, offset) {
  const { data, error } = await supabase.rpc(
    "get_posts_with_user_data_and_community",
    {
      uid: userId,
      limit_count: limit,
      offset_count: offset,
    }
  );

  if (error) throw error;
  return data;
}

//Getting all the data for more than one post in least amount of queries
export async function getPostsWithFullData(userId, limit = 5, offset = 0) {
  if (userId) {
    // user is logged in → use SQL function
    return await getPostsWithUserData(userId, limit, offset);
  } else {
    // user is guest → use SQL view
    return await getPostswithoutUserData(limit, offset);
  }
}

export async function getPostDataWithCommentsForSignedInUser(userId, postId) {
  //get_post_full_data_for_signedin_user_with_comments
  const { data, error } = await supabase.rpc(
    "get_post_full_data_for_signedin_user_with_comments",
    {
      uid: userId,
      target_post_id: postId,
    }
  );

  if (error) throw error;
  return data;
}

export async function toggleCommunityJoin(
  userId,
  communityId,
  hasUserAlreadyJoin
) {
  const updateObj = {
    userId,
    communityId,
    joinedAt: new Date().toISOString(),
    isMember: !hasUserAlreadyJoin,
  };

  // console.log(`Updated object is \n`, updateObj);

  const { data, error } = await supabase
    .from("CommunityInteraction")
    .upsert(updateObj, {
      onConflict: "userId,communityId",
    })
    .select();

  if (error) {
    console.error("Error upserting interaction:", error);
    throw new Error("Could not upsert community interaction");
  }

  return data;
}

export async function insertNewComment(
  userId,
  parentCommentId,
  postId,
  content
) {
  const insertObj = {
    postId,
    userId,
    parentCommentId: parentCommentId || null, //Whether it is a reply or not
    createdAt: new Date().toISOString(),
    content,
  };

  const { data, error } = await supabase
    .from("Comment")
    .insert(insertObj)
    .select()
    .single();

  if (error) {
    console.error("Error inserting comment:", error);
    throw new Error("Could not insert you comment");
  }

  //fetching required data
  const { id } = data;

  const { data: fullCommentData, error: fullCommentError } = await supabase.rpc(
    "get_comment_details",
    {
      input_comment_id: id,
      input_user_id: userId,
    }
  );

  if (fullCommentError) {
    console.error("Error inserting comment:", fullCommentError);
    throw new Error("Could not insert you comment");
  }

  // console.log("🎁 data-service.js: Got fullCommentData as : ", fullCommentData);
  return fullCommentData;
}

export async function userInteractionWithComment(userId, commentId) {
  const { data, error } = await supabase
    .from("CommentInteraction")
    .select("vote")
    .eq("commentId", commentId)
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

export async function upsertCommentInteraction(
  userId,
  commentId,
  columnName,
  value
) {
  // Prevent modifying disallowed columns
  const allowedColumns = ["vote"];

  if (!allowedColumns.includes(columnName)) {
    throw new Error("Invalid column name");
  }

  const updateObj = {
    userId,
    commentId,
    lastUpdatedAt: new Date().toISOString(),
    [columnName]: value, // dynamic column assignment
  };

  const { data, error } = await supabase
    .from("CommentInteraction")
    .upsert(updateObj, {
      onConflict: "commentId,userId",
    })
    .select();

  if (error) {
    console.error("Error upserting interaction:", error);
    throw new Error("Could not upsert comment interaction");
  }

  return data;
}

export async function upsertPostPreferences(userId, postId, columnName, value) {
  // Prevent modifying disallowed columns
  const allowedColumns = ["isSaved"];

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
    .from("PostPreferences")
    .upsert(updateObj, {
      onConflict: "postId,userId",
    })
    .select();

  if (error) {
    console.error("Error upserting preference:", error);
    throw new Error("Could not upsert post preference");
  }

  return data;
}

export async function getAPostPreference(userId, postId, columnName) {
  // Prevent modifying disallowed columns
  const allowedColumns = ["isSaved"];

  if (!allowedColumns.includes(columnName)) {
    throw new Error("Invalid column name");
  }

  const { data, error } = await supabase
    .from("PostPreferences")
    .select(columnName)
    .eq("postId", postId)
    .eq("userId", userId);

  if (error) {
    console.error("Error getting user preference:", error);
    return 0;
  }

  if (!data || data.length === 0) {
    return false; // user has no preference data
  }

  return data[0][columnName]; // return true or false
}

export async function getAllSavedPostId(userId) {
  const { data: postIds, error } = await supabase
    .from("PostPreferences")
    .select("postId")
    .eq("userId", userId)
    .eq("isSaved", true);

  if (error) {
    console.error("Error getting saved posts id:", error);
    throw new Error("Could not get saved post");
  }

  return postIds;
}

export async function getAllSavedPosts(userId, postIds) {
  const { data, error } = await supabase.rpc(
    "get_multiple_posts_with_metadata_for_post_ids",
    { pids: postIds, uid: userId }
  );

  if (error) {
    console.error("Error getting saved post:", error);
    throw new Error("Could not get saved post");
  }

  return data;
}

export async function getPostsByCommunityId(communityId, userId) {
  const { data, error } = await supabase.rpc("get_posts_by_community", {
    in_input_community_id: communityId,
    in_user_id: userId,
  });

  if (error) {
    console.error("Error getting post of community:", error);
    throw new Error("Could not get posts of this community");
  }

  return data;
}

export async function getCommunitiesByUserId(userId) {
  const { data, error } = await supabase.rpc("get_user_communities", {
    uid: userId,
  });

  if (error) {
    console.error("Error getting community by userId:", error);
    throw new Error("Could not get community of this user");
  }

  return data;
}

export async function getUserProfileDetailByUserId(
  targetUserId,
  signedInUserId
) {
  const { data, error } = await supabase.rpc("get_user_profile_details", {
    target_user_id: targetUserId,
    signed_in_user_id: signedInUserId,
  });

  if (error) {
    console.error("Error getting uder by userId:", error);
    throw new Error("Could not get details of this user");
  }

  return data;
}

export async function getUserById(userId) {
  const { data, error } = await supabase
    .from("User")
    .select("displayName,gender,email")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("Error getting setting data", error);
    throw new Error("Could not get details of this user");
  }

  // console.log("🎁 Data-service.js: Got userid as :", userId);
  // console.log("🎁 Data-service.js: GetuserById data as: ", data);

  return data;
}

export async function updateUserData(value, column, userId) {
  const allowedColumns = ["displayName", "email", "gender", "userIcon"];

  if (!allowedColumns.includes(column)) {
    throw new Error("Invalid column name");
  }

  let avatarpublicImage;
  if (column === "userIcon") {
    //Upload image to database
    //Defining a unique filename to avoid overwrites
    const filePath = `${Date.now()}_${value.name}`;

    // Uploading file to supabase
    const { data, error } = await supabase.storage
      .from("Users")
      .upload(filePath, value, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error("Upload failed:", error);
      throw new Error("Something went wrong. Please try again later.");
    }

    //Getting a public URL for the uploaded file
    const { data: publicUrlData, error: publicUrlError } = supabase.storage
      .from("Users")
      .getPublicUrl(data.path);

    if (publicUrlError) {
      console.error("Fetching uploaded image failed:", publicUrlError);
      throw new Error("Something went wrong. Please try again later.");
    }
    avatarpublicImage = publicUrlData.publicUrl;
  }

  const { data, error } = await supabase
    .from("User")
    .update({
      [column]:
        column === "userIcon" && avatarpublicImage ? avatarpublicImage : value,
    })
    .eq("id", userId)
    .select();

  if (error) {
    console.error("Error updating user data", error);
    throw new Error("Could not update details of this user");
  }

  return data;
}

export async function getUserKarma(userId) {
  const { data, error } = await supabase.rpc("get_user_karma", {
    target_user_id: userId,
  });

  if (error) {
    console.error("Error getting karma by userId:", error);
    throw new Error("Could not get karma of this user");
  }

  return data;
}

export async function insertNewCommunity(community) {
  const { data, error } = await supabase
    .from("Community")
    .insert([community])
    .select();

  if (error) throw error;

  return data;
}
