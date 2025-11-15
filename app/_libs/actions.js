"use server";

import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/tokenUtils";
import {
  findUserByEmail,
  findUserIdbyEmail,
  getAllPosts,
  getCommunityById,
  getNumberOfMemberInCommunity,
  getPostsWithFullData,
  getPostWithFullData,
  insertNewUser,
  insertPost,
  saveOrUpdateRefreshToken,
  updatePostInteraction,
  updateUserLocation,
  uploadPostImages,
  upsertPostInteraction,
  userInteractionWithPost,
} from "./data-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserId } from "../utils/userUtils";

export async function registerNewUser(formData) {
  //Validate the data points
  const email = formData.get("email");
  const username = formData.get("username");
  const password = formData.get("password");
  const lat = formData.get("lat");
  const lon = formData.get("lon");

  if (!username || !email || !password) {
    return { error: "Missing required fields." };
  }

  if (!lat || !lon) {
    return { error: "Cannot get user's location" };
  }

  const userLocation = { lat, lon };

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return { error: "Invalid email format." };
  }

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  // Check whether the session is already going on or not
  const cookieStore = await cookies();
  const existingAccess = cookieStore.get("access_token");
  const existingRefresh = cookieStore.get("refresh_token");

  if (existingAccess || existingRefresh) {
    return { error: "You are already logged in. Please logout first" };
  }

  //Checking if user already exists
  const isUserExists = await findUserByEmail(email);

  if (isUserExists !== null) {
    return { error: "Email already in use." };
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  //If everything is correct generate refresh token and then save the data.
  const refreshToken = await generateRefreshToken(email);

  //Insert user in database
  const newUser = {
    username,
    email,
    passwordHash: hashedPassword,
    refreshToken,
    userLocation,
  };
  const insertUser = await insertNewUser(newUser);
  if (!insertUser) {
    return { error: "User registration failed." };
  }

  //If user inserted then generate access token
  const accessToken = await generateAccessToken(email);

  console.log("Cookies before setting: ", cookieStore.getAll());

  cookieStore.set("access_token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 6, // 6 hours
  });

  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 10, // 10 days
  });

  console.log("Cookies after setting: ", cookieStore.getAll());

  //If data save correctly then generate access token with the help of refresh token with it's expiry
  return { success: true, message: "User registered successfully." };
}

export async function signInUser(formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const lat = formData.get("lat");
  const lon = formData.get("lon");

  //Checking whether tokens are there in cookies and whether they are expired or not
  //If tokens are there and valid just send an error message as "session is going on first logout"

  //1. Checking for active session (existing cookies)
  const cookieStore = await cookies();
  const existingAccess = cookieStore.get("access_token");
  const existingRefresh = cookieStore.get("refresh_token");

  if (existingAccess || existingRefresh) {
    return { error: "You are already logged in. Please logout first" };
  }

  if (!email || !password) {
    return { error: "Missing required fields." };
  }

  if (!lat || !lon) {
    return { error: "Cannot get user's location" };
  }

  const userLocation = { lat, lon };

  //2. Validate credentials from DB
  const user = await findUserByEmail(email);
  if (!user) {
    return { error: "User not found. Please register first." };
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return { error: "Invalid credentials" };
  }

  // Update user's location
  try {
    await updateUserLocation(email, userLocation);
  } catch (err) {
    return { error: err.message };
  }

  // 3. Generate new tokens
  const accessToken = await generateAccessToken(email);
  const refreshToken = await generateRefreshToken(email);

  // 4. Saving refresh token in DB (for verification later)
  try {
    await saveOrUpdateRefreshToken(email, refreshToken);
  } catch (err) {
    return { error: err.message };
  }

  // 5. Set cookies for tokens
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  };

  cookieStore.set({
    name: "access_token",
    value: accessToken,
    maxAge: 6 * 60 * 60, // 6 hours
    ...cookieOptions,
  });

  cookieStore.set({
    name: "refresh_token",
    value: refreshToken,
    maxAge: 10 * 24 * 60 * 60, // 10 days
    ...cookieOptions,
  });

  // 6. Return success message
  return { success: true, message: "User login successfully." };
}

export async function signOutUser(formData) {
  const cookieStore = await cookies();

  // 1. Read cookies
  const accessToken = cookieStore.get("access_token")?.value;
  const refreshToken = cookieStore.get("refresh_token")?.value;

  if (!accessToken && !refreshToken) {
    return { error: "No active session found." };
  }

  try {
    // 2. Verify refresh token and extract email (or userId)
    const payload = await verifyRefreshToken(refreshToken);
    const email = payload.userId || payload.email;

    // 3. Remove refresh token from DB
    await saveOrUpdateRefreshToken(email, "");
  } catch (err) {
    console.error("Error during logout:", err.message);
  }

  // 4️. Clear cookies
  cookieStore.set("access_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  cookieStore.set("refresh_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  // redirect after logout
  // redirect("/login");
  return { success: true, message: "User login successfully." };
}

// Action related to Posts
export async function createPost(formData) {
  const title = formData.get("title");
  const description = formData.get("description");
  // const media = formData.get("media");
  const communityId = formData.get("communityId") || null;

  // Validating whther communityId and title shouldn't be null
  if (!communityId) {
    return { error: "Post can only be created in a given community." };
  }

  if (!title) {
    return { error: "Title is required." };
  }

  //TODO verify whether user has joined that community or not.

  //Parse links JSON
  const linksJson = JSON.parse(formData.get("links") || "[]");

  //We will convert [{key, value}] to {key:value} to upload to database
  const linksObject = {};
  linksJson.forEach((l) => {
    if (l.key && l.value) {
      linksObject[l.key] = l.value;
    }
  });

  //Uploading the media files to supabase and get all the links
  const files = formData.getAll("media");
  const uploadedUrls = [];

  try {
    for (const file of files) {
      const publicUrl = await uploadPostImages(file);
      uploadedUrls.push(publicUrl);
    }

    //Getting userId to prepare post object before uploading

    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;
    const payload = await verifyRefreshToken(refreshToken);
    const email = payload.userId || payload.email;

    const userId = await findUserIdbyEmail(email);
    if (!userId) {
      return { error: "No user found. Please register yourself again." };
    }

    // Preparing post object
    const post = {
      communityId,
      userId,
      title,
      description,
      media: { images: uploadedUrls },
      links: linksObject,
    };

    await insertPost(post);
  } catch (err) {
    return { error: err.message };
  }

  // console.log(uploadedUrls);

  // console.log(linksObject);

  // console.log(formData);
  // console.log(communityId == "null"); // True

  return { success: "User Created succesfully" };
}

export async function getAllPostsAction(formData) {
  const offset = formData.get("offset");
  const limit = formData.get("limit");

  if (!offset || !limit || offset < 0 || limit < 0) {
    return { error: "Invalid data is sent for pagination." };
  }

  // console.log(`ServerAction: Got offset as ${offset}, and limit as ${limit}`);

  try {
    const userId = await getUserId();

    // console.log(`Got userId as ${userId}`);

    // Fetch enriched posts directly from Supabase RPC
    const rawPosts = await getPostsWithFullData(userId, limit, offset);

    // console.log("Raw RPC posts:", rawPosts);

    // Transform into camelCase and split
    const enrichedPosts = rawPosts.map((p) => ({
      id: userId ? p.post_id : p.id,
      title: p.title,
      description: p.description,
      media: p.media,
      links: p.links,
      createdAt: userId ? p.created_at : p.createdAt,
      userId: userId ? p.user_id : p.userId,

      noOfUpvotes: userId ? p.noofupvotes : p.noOfUpvotes,
      noOfDownvotes: userId ? p.noofdownvotes : p.noOfDownvotes,
      noOfComments: userId ? p.noofcomments : p.noOfComments,

      hasUserAlreadyUpvoted: userId ? p.hasuseralreadyupvoted : false,
      hasUserAlreadyDownvoted: userId ? p.hasuseralreadydownvoted : false,

      communityId: userId ? p.community_id : p.communityId, // still needed inside enrichedPosts
    }));

    // Extract community data list
    const communityDataList = rawPosts.map((p) => ({
      communityId: userId ? p.community_id : p.communityId,
      communityName: userId ? p.community_name : p.communityName,
      logo: userId ? p.community_logo : p.communityLogo,
      description: userId ? p.community_description : p.communityDescription,
      totalCommunityMembers: userId
        ? p.total_community_members
        : p.totalCommunityMembers,
    }));

    // console.log("enrichedPosts", enrichedPosts);
    // console.log("communityDataList", communityDataList);

    return {
      success: "Post fetched succesfully",
      hasMore: rawPosts.length === limit,
      enrichedPosts,
      communityDataList,
    };
  } catch (err) {
    console.error(err);
    return { error: err.message };
  }
}

export async function togglePostVote(formData) {
  //Check which vote to toggle(upvote or downvote)
  const postId = formData.get("postId");
  const vote = Number(formData.get("vote"));

  if (!vote || !postId) {
    return { error: "Incomplete Data... We can't complete this operation" };
  }

  //Check whether any session is going on or not, if no session is going on, just redirect the user to signIn
  const cookieStore = await cookies();
  const existingAccess = cookieStore.get("access_token");
  const existingRefresh = cookieStore.get("refresh_token");

  if (!existingAccess || !existingRefresh) {
    return { error: "You need to sign in before performing this action" };
  }

  try {
    //Check user's interaction with the post
    const payload = await verifyRefreshToken(existingRefresh.value);
    const email = payload.userId || payload.email;

    const userId = await findUserIdbyEmail(email);

    const userExistingInteraction = await userInteractionWithPost(
      userId,
      postId
    );

    //For upvote
    if (vote === 1) {
      if (userExistingInteraction === 1) {
        //if user has already upvoted then remove the upvote, i.e delete that post interaction row
        // We will update the vote to 0 and not delete. Coz in future if I add more columns for post interaction it won't be the only reason to delete the row
        await upsertPostInteraction(userId, postId, "vote", 0); // vote is 0 means no vote, just not deleted the row.
      } else if (userExistingInteraction === -1) {
        //If user has already downvoted then update from from -1 to 1.
        await upsertPostInteraction(userId, postId, "vote", 1);
      } else {
        //if no interaction was present then just add new interaction with vote 1
        await upsertPostInteraction(userId, postId, "vote", 1);
      }
    } else {
      if (userExistingInteraction === 1) {
        await upsertPostInteraction(userId, postId, "vote", -1); // vote is 0 means no vote, just not deleted the row.
      } else if (userExistingInteraction === -1) {
        //If user has already downvoted then update from from -1 to 1.
        await upsertPostInteraction(userId, postId, "vote", 0);
      } else {
        await upsertPostInteraction(userId, postId, "vote", -1);
      }
    }

    //Then refetch the post data again for the screen/ (If possible only fetch that post's updated data, to reduce lagging)
    const updatedPost = await getPostWithFullData(postId, userId);

    console.log(`Updated Posts : ${updatedPost}`);

    return {
      success: "Post voted successfully",
      post: {
        ...updatedPost,
        noOfUpvotes: updatedPost.noofupvotes,
        noOfDownvotes: updatedPost.noofdownvotes,
        noOfComments: updatedPost.noofcomments,
        hasUserAlreadyUpvoted: updatedPost.hasuseralreadyupvoted,
        hasUserAlreadyDownvoted: updatedPost.hasuseralreadydownvoted,
      },
    };
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong." };
  }
}
