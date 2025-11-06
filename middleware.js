import { NextResponse } from "next/server";
import {
  verifyAccessToken,
  verifyRefreshToken,
  generateAccessToken,
} from "./app/utils/tokenUtils";
import { findRefreshTokenByEmail } from "./app/_libs/data-service";

export const config = {
  matcher: ["/user/:path*", "/settings/:path*"],
};

export async function middleware(request) {
  const cookieHeader = request.headers.get("cookie") || "";
  console.log("🟣 Middleware activated");

  // --- Extract cookies manually ---
  const accessMatch = cookieHeader.match(/(?:^|;\s*)access_token=([^;]+)/);
  const refreshMatch = cookieHeader.match(/(?:^|;\s*)refresh_token=([^;]+)/);

  const accessToken = accessMatch ? decodeURIComponent(accessMatch[1]) : null;
  const refreshToken = refreshMatch
    ? decodeURIComponent(refreshMatch[1])
    : null;

  console.log("Access Token (middleware):", accessToken);
  console.log("Refresh Token (middleware):", refreshToken);

  // === 1: Verify access token ===
  if (accessToken) {
    try {
      await verifyAccessToken(accessToken);
      console.log("✅ Access token valid, continuing request.");
      return NextResponse.next();
    } catch (err) {
      console.warn("⚠️ Access token invalid or expired:", err.message);
    }
  }

  // === 2: Access token invalid → try refresh token ===
  if (refreshToken) {
    try {
      const payload = await verifyRefreshToken(refreshToken);
      const userId = payload.userId || payload.email;

      // Check refresh token in database (security layer)
      const data = await findRefreshTokenByEmail(userId);

      if (!data || data.refreshToken !== refreshToken) {
        console.log("🚫 Refresh token mismatch in DB. Redirecting to login.");
        return redirectToLogin(request, true);
      }

      //  Valid refresh token → generate new access token
      const newAccessToken = await generateAccessToken(userId);
      console.log("♻️ Generated new access token");

      // Send new access token cookie back
      const response = NextResponse.next();
      response.headers.append(
        "Set-Cookie",
        `access_token=${newAccessToken}; HttpOnly; Path=/; Max-Age=${
          6 * 60 * 60
        }; SameSite=Strict; Secure=${process.env.NODE_ENV === "production"}`
      );

      return response;
    } catch (err) {
      console.error("❌ Refresh token invalid:", err.message);
      return redirectToLogin(request, true);
    }
  }

  // === STEP 3: No valid token → redirect to login ===
  console.log("🚨 No valid access/refresh tokens. Redirecting to login.");
  return redirectToLogin(request, false);
}

// --- Helper: redirect to login and clear cookies ---
function redirectToLogin(request, expired) {
  const url = new URL("/login", request.url);
  if (expired) url.searchParams.set("sessionExpired", "true");

  const res = NextResponse.redirect(url);

  // Clear old cookies
  res.headers.append(
    "Set-Cookie",
    "access_token=; Path=/; HttpOnly; Max-Age=0; SameSite=Strict"
  );
  res.headers.append(
    "Set-Cookie",
    "refresh_token=; Path=/; HttpOnly; Max-Age=0; SameSite=Strict"
  );

  return res;
}
