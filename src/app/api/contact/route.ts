import { NextResponse } from "next/server";
import { createMessage } from "@/lib/data";
import { contactSchema, firstError } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (body.website) return NextResponse.json({ ok: true, message: "Dhanyavaad!" });

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
      CONTACT: "Message mil gaya! Hamari team 24 ghante ke andar aapko contact karegi.",
      SUPPORT: "Support pledge ke liye dhanyavaad! Hum aapko payment details aur receipt ke liye contact karenge.",
      PARTNER: "Partnership request mil gayi. Hamari team aapse jaldi baat karegi.",
    };

    return NextResponse.json({ ok: true, message: messages[data.type ?? "CONTACT"] }, { status: 201 });
  } catch (error) {
    console.error("[api/contact]", error);
    return NextResponse.json({ error: "Message bhej nahi paye. Thodi der baad try karein." }, { status: 500 });
  }
}
