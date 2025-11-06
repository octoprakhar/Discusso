import { findRefreshTokenByEmail } from "@/app/_libs/data-service";
import {
  generateAccessToken,
  verifyRefreshToken,
} from "@/app/utils/tokenUtils";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const cookieHeader = req.headers.get("cookie") || "";

    // Parse refresh_token manually
    const refreshCookie = (() => {
      const m = cookieHeader.match(/(?:^|;\s*)refresh_token=([^;]+)/);
      return m ? decodeURIComponent(m[1]) : null;
    })();

    if (!refreshCookie) {
      return NextResponse.json({ error: "No refresh token" }, { status: 401 });
    }

    // Verify refresh token
    let payload;
    try {
      payload = verifyRefreshToken(refreshCookie);
    } catch {
      return NextResponse.json(
        { error: "Invalid refresh token" },
        { status: 401 }
      );
    }

    const userId = payload.userId || payload.email;

    // Match DB-stored refresh token
    const data = await findRefreshTokenByEmail(userId);
    if (!data || data.refreshToken !== refreshCookie) {
      return NextResponse.json(
        { error: "Refresh token invalid or revoked" },
        { status: 401 }
      );
    }

    // Generate new access token
    const newAccessToken = generateAccessToken(userId);

    const res = NextResponse.json({ success: true });
    const maxAge = 60 * 60 * 6; // 6 hours

    res.headers.append(
      "Set-Cookie",
      `access_token=${newAccessToken}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Strict; Secure=${
        process.env.NODE_ENV === "production"
      }`
    );

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
