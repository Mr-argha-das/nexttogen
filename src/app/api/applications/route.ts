import { NextResponse } from "next/server";
import { createApplication, getCourseById } from "@/lib/data";
import { applicationSchema, firstError } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot — bots ise bharte hain
    if (body.website_confirm) {
      return NextResponse.json({ ok: true, id: "app_ignored" });
    }

    const parsed = applicationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: firstError(parsed.error) }, { status: 400 });
    }
    const data = parsed.data;

    let courseName = data.courseName ?? null;
    if (data.courseId) {
      const course = getCourseById(data.courseId);
      courseName = course?.title ?? courseName;
    }

    const id = createApplication({
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      courseId: data.courseId ?? null,
      courseName,
      city: data.city ?? null,
      qualification: data.qualification ?? null,
      preferredMode: data.preferredMode ?? null,
      message: data.message ?? null,
    });

    return NextResponse.json({ ok: true, id }, { status: 201 });
  } catch (error) {
    console.error("[api/applications]", error);
    return NextResponse.json(
      { error: "Application save nahi ho payi. Aap humein call ya WhatsApp kar lijiye." },
      { status: 500 },
    );
  }
}
