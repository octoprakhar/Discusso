"use server";

import bcrypt from "bcrypt";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/tokenUtils";
import {
  findUserByEmail,
  insertNewUser,
  saveOrUpdateRefreshToken,
} from "./data-service";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function registerNewUser(formData) {
  //Validate the data points
  const email = formData.get("email");
  const username = formData.get("username");
  const password = formData.get("password");

  if (!username || !email || !password) {
    return { error: "Missing required fields." };
  }

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

  //Checking whether tokens are there in cookies and whether they are expired or not
  //If tokens are there and valid just send an error message as "session is going on first logout"

  //1. Checking for active session (existing cookies)
  const cookieStore = await cookies();
  const existingAccess = cookieStore.get("access_token");
  const existingRefresh = cookieStore.get("refresh_token");

  if (existingAccess || existingRefresh) {
    return { error: "You are already logged in. Please logout first" };
  }

  //2. Validate credentials from DB
  const user = await findUserByEmail(email);
  if (!user) {
    return { error: "User not found. Please register first." };
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return { error: "Invalid credentials" };
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
