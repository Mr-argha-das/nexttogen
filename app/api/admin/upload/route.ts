import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import { verifyToken } from "@/lib/auth";

// Admin-only image upload endpoint. Accepts a file via FormData field "file",
// saves to public/uploads/, returns { url }.
export async function POST(req: Request) {
  // Auth
  const cookieHeader = req.headers.get("cookie") || "";
  const m = cookieHeader.match(/(?:^|;\s*)ntg_admin_token=([^;]+)/);
  if (!m) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  const session = await verifyToken(m[1]);
  if (!session) return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "No file" }, { status: 400 });
  }

  // Validate type
  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ ok: false, error: "Only images allowed" }, { status: 400 });
  }
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ ok: false, error: "Max 5 MB" }, { status: 400 });
  }

  const ext = (file.type.split("/")[1] || "jpg").replace("jpeg", "jpg");
  const safeExt = ["jpg", "png", "webp", "gif"].includes(ext) ? ext : "jpg";
  const fname = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${safeExt}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(dir, { recursive: true });
  const buf = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(dir, fname), buf);

  return NextResponse.json({ ok: true, url: `/uploads/${fname}` });
}

export const dynamic = "force-dynamic";
