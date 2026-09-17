import { NextResponse } from "next/server";
import { createMessage } from "@/lib/data";
import { contactSchema, firstError } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.website) return NextResponse.json({ ok: true, message: "Thank you!" });

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: firstError(parsed.error) }, { status: 400 });
    }
    const data = parsed.data;

    createMessage({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      subject: data.subject || null,
      message: data.message,
      type: data.type ?? "CONTACT",
      amount: data.amount ?? null,
    });

    const messages: Record<string, string> = {
      CONTACT: "Message received! Our team will contact you within 24 hours.",
      SUPPORT: "Thank you for your support pledge! We will contact you with payment details and your receipt.",
      PARTNER: "Your partnership request has reached us. Our team will be in touch shortly.",
    };

    return NextResponse.json({ ok: true, message: messages[data.type ?? "CONTACT"] }, { status: 201 });
  } catch (error) {
    console.error("[api/contact]", error);
    return NextResponse.json({ error: "We could not send your message. Please try again in a moment." }, { status: 500 });
  }
}
