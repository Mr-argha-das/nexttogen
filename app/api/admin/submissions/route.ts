import { NextResponse } from "next/server";
import {
  addApplication,
  getApplications,
  updateApplicationStatus,
  deleteApplication,
  addMessage,
  getMessages,
  markMessageRead,
  deleteMessage
} from "@/lib/db";
import { verifyToken } from "@/lib/auth";

async function requireAdmin(req: Request): Promise<boolean> {
  const cookieHeader = req.headers.get("cookie") || "";
  const m = cookieHeader.match(/(?:^|;\s*)ntg_admin_token=([^;]+)/);
  if (!m) return false;
  const s = await verifyToken(m[1]);
  return !!s;
}

export async function GET(req: Request) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const url = new URL(req.url);
  const kind = url.searchParams.get("kind");
  if (kind === "applications") {
    return NextResponse.json({ ok: true, applications: await getApplications() });
  }
  if (kind === "messages") {
    return NextResponse.json({ ok: true, messages: await getMessages() });
  }
  return NextResponse.json({ ok: false, error: "?kind=applications|messages" }, { status: 400 });
}

// Public submit endpoints
export async function POST(req: Request) {
  const url = new URL(req.url);
  const kind = url.searchParams.get("kind");
  const body = await req.json().catch(() => ({}));

  if (kind === "application") {
    const id = "NTG-" + Math.floor(100000 + Math.random() * 900000).toString();
    const a = {
      id,
      submittedAt: new Date().toISOString(),
      status: "new" as const,
      firstName: String(body.firstName || "").trim(),
      lastName: String(body.lastName || "").trim(),
      email: String(body.email || "").trim(),
      phone: String(body.phone || "").trim(),
      country: String(body.country || "India").trim(),
      city: String(body.city || "").trim(),
      course: String(body.course || "").trim(),
      startDate: String(body.startDate || "").trim(),
      experience: String(body.experience || "").trim(),
      education: String(body.education || "").trim(),
      goals: String(body.goals || "").trim(),
      linkedin: String(body.linkedin || "").trim(),
      resume: String(body.resume || "").trim(),
      hearAbout: String(body.hearAbout || "").trim(),
      scholarship: Boolean(body.scholarship)
    };
    if (!a.firstName || !a.email || !a.course) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }
    await addApplication(a);
    return NextResponse.json({ ok: true, id });
  }

  if (kind === "message") {
    const id = "MSG-" + Math.floor(100000 + Math.random() * 900000).toString();
    const m = {
      id,
      submittedAt: new Date().toISOString(),
      read: false,
      name: String(body.name || "").trim(),
      email: String(body.email || "").trim(),
      subject: String(body.subject || "General").trim(),
      message: String(body.message || "").trim()
    };
    if (!m.name || !m.email || !m.message) {
      return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
    }
    await addMessage(m);
    return NextResponse.json({ ok: true, id });
  }

  return NextResponse.json({ ok: false, error: "?kind=application|message" }, { status: 400 });
}

// Admin updates (status/read/delete)
export async function PATCH(req: Request) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const url = new URL(req.url);
  const kind = url.searchParams.get("kind");
  const body = await req.json().catch(() => ({}));
  if (kind === "application") {
    const ok = await updateApplicationStatus(String(body.id), String(body.status) as any);
    return NextResponse.json({ ok });
  }
  if (kind === "message") {
    const ok = await markMessageRead(String(body.id));
    return NextResponse.json({ ok });
  }
  return NextResponse.json({ ok: false }, { status: 400 });
}

export async function DELETE(req: Request) {
  if (!(await requireAdmin(req))) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  const url = new URL(req.url);
  const kind = url.searchParams.get("kind");
  const id = url.searchParams.get("id") || "";
  if (kind === "application") {
    const ok = await deleteApplication(id);
    return NextResponse.json({ ok });
  }
  if (kind === "message") {
    const ok = await deleteMessage(id);
    return NextResponse.json({ ok });
  }
  return NextResponse.json({ ok: false }, { status: 400 });
}
