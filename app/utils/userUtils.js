import { cookies } from "next/headers";
import { verifyRefreshToken } from "./tokenUtils";
import { findUserIdbyEmail } from "../_libs/data-service";

export async function getUserId() {
  let userId = null;
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (refreshToken) {
      const payload = await verifyRefreshToken(refreshToken);
      const email = payload.userId || payload.email;
      userId = await findUserIdbyEmail(email);
    }
  } catch (err) {
    console.error("Error reading user token:", err);
  }

  return userId;
}
