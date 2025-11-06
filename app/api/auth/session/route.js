import { NextResponse } from "next/server";

const { jwtVerify } = require("jose");

const encoder = new TextEncoder();

const Refresh_Secret = process.env.REFRESH_TOKEN_SECRET;
const Access_Secret = process.env.ACCESS_TOKEN_SECRET;

async function verifyJwt(token, secret) {
  try {
    const { payload } = await jwtVerify(token, encoder.encode(secret));
    return payload;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function GET(req) {
  // console.log("Get request for session called.");
  try {
    const cookieHeader = req.headers.get("cookie") || "";
    const accessMatch = cookieHeader.match(/(?:^|;\s*)access_token=([^;]+)/);
    const refreshMatch = cookieHeader.match(/(?:^|;\s*)refresh_token=([^;]+)/);

    const accessToken = accessMatch ? decodeURIComponent(accessMatch[1]) : null;
    const refreshToken = refreshMatch
      ? decodeURIComponent(refreshMatch[1])
      : null;

    // If access token valid - quick accept
    if (accessToken) {
      const payload = await verifyJwt(accessToken, Access_Secret);
      if (payload) {
        return NextResponse.json({
          authenticated: true,
          userId: payload.userId,
        });
      }
    }

    // Else try refresh token (still do not re-issue token here; just check validity)
    if (refreshToken) {
      const payload = await verifyJwt(refreshToken, Refresh_Secret);
      if (payload)
        return NextResponse.json({
          authenticated: true,
          userId: payload.userId,
        });
    }

    return NextResponse.json({ authenticated: false });
  } catch (err) {
    console.error("Session check error:", err);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}
