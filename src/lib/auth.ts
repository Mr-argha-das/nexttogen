/**
 * Admin authentication — signed JWT session cookie (jose) + bcrypt password hashes.
 * Login page: /admin/login. Admin routes call requireAdmin() on the server side.
 */
import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { findUserByEmail, getSettings } from "./data";

export const SESSION_COOKIE = "ntg_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secretKey() {
  const secret = process.env.AUTH_SECRET || "nexttogen-dev-secret-change-me-please-1234567890";
  return new TextEncoder().encode(secret);
}

export type SessionUser = { id: string; name: string; email: string; role: string };

export async function createSession(user: SessionUser) {
  const token = await new SignJWT({ ...user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(secretKey());

  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function getSessionUser(): Promise<SessionUser | null> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    if (!payload.email) return null;
    return {
      id: String(payload.id ?? ""),
      name: String(payload.name ?? "Admin"),
      email: String(payload.email),
      role: String(payload.role ?? "ADMIN"),
    };
  } catch {
    return null;
  }
}

export async function requireAdmin(): Promise<SessionUser> {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  return user;
}

export async function verifyCredentials(email: string, password: string): Promise<SessionUser | null> {
  const user = findUserByEmail(email.trim());
  if (!user) return null;
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return null;
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

export function hashPassword(password: string) {
  return bcrypt.hashSync(password, 10);
}

/** The login page heading and logo come from the database settings, resolved on the server. */
export function siteBranding() {
  const settings = getSettings();
  return {
    siteName: settings.siteName,
    siteShortName: settings.siteShortName,
    primary: settings.brandPrimary,
    accent: settings.brandAccent,
  };
}
