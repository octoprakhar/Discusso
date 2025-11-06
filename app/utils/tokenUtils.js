import { jwtVerify, SignJWT } from "jose";
import jsonwebtoken from "jsonwebtoken";

const encoder = new TextEncoder();

const Refresh_Secret = process.env.REFRESH_TOKEN_SECRET;
const Access_Secret = process.env.ACCESS_TOKEN_SECRET;

export async function generateRefreshToken(userId) {
  const payload = { userId };
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("10d")
    .sign(encoder.encode(Refresh_Secret));
  return token;
}

export async function generateAccessToken(userId) {
  const payload = { userId };
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("6h")
    .sign(encoder.encode(Access_Secret));
  return token;
}

export async function verifyAccessToken(token) {
  try {
    const { payload } = await jwtVerify(token, encoder.encode(Access_Secret));
    console.log("Access token verified successfully:", payload);
    return payload;
  } catch (err) {
    console.log("Error verifying access token:", err.message);
    throw err;
  }
}

export async function verifyRefreshToken(token) {
  try {
    const { payload } = await jwtVerify(token, encoder.encode(Refresh_Secret));
    return payload;
  } catch (err) {
    console.log("Error verifying refresh token:", err.message);
    throw new Error("Invalid or expired token");
  }
}
