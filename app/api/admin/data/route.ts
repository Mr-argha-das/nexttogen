import { NextResponse } from "next/server";
import { getSiteData, saveSiteData, SiteData, slugify } from "@/lib/db";

export async function GET() {
  // Public read endpoint — drives the public site from persisted DB.
  const data = await getSiteData();
  return NextResponse.json({ ok: true, data });
}

export async function POST(req: Request) {
  // Write endpoint — requires valid admin JWT.
  const cookieHeader = req.headers.get("cookie") || "";
  const tokenMatch = cookieHeader.match(/(?:^|;\s*)ntg_admin_token=([^;]+)/);
  if (!tokenMatch) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const { verifyToken } = await import("@/lib/auth");
  const session = await verifyToken(tokenMatch[1]);
  if (!session) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as Partial<SiteData>;
  const data = await getSiteData();
  const next: SiteData = { ...data, ...body };
  if (body.courses) {
    next.courses = body.courses.map((c) => ({
      ...c,
      slug: c.slug || slugify(c.title)
    }));
  }
  await saveSiteData(next);
  return NextResponse.json({ ok: true, data: next });
}
