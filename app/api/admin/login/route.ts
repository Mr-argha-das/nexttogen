import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyCredentials } from "@/lib/db";
import { signToken, AUTH_COOKIE } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ ok: false, error: "Email and password required" }, { status: 400 });
    }
    const ok = await verifyCredentials(String(email), String(password));
    if (!ok) {
      return NextResponse.json({ ok: false, error: "Invalid email or password" }, { status: 401 });
    }
    const token = await signToken(String(email).trim().toLowerCase());
    cookies().set({
      name: AUTH_COOKIE,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message || "Server error" }, { status: 500 });
  }
}
