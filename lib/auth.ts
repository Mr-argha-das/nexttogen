import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE_NAME = "ntg_admin_token";

function getSecret() {
  const s = process.env.ADMIN_JWT_SECRET || "dev-secret-change-me";
  if (s.length < 32 && process.env.NODE_ENV === "production") {
    console.warn(
      "[auth] ADMIN_JWT_SECRET is shorter than 32 characters. Generate a strong secret with: openssl rand -base64 48"
    );
  }
  return new TextEncoder().encode(s);
}

export async function signToken(email: string) {
  return new SignJWT({ email, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifyToken(token: string): Promise<{ email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return { email: String(payload.email) };
  } catch {
    return null;
  }
}

export async function getAdminSession() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export const AUTH_COOKIE = COOKIE_NAME;
