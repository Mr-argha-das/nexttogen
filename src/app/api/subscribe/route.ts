import { NextResponse } from "next/server";
import { subscribe } from "@/lib/data";
import { firstError, subscribeSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = subscribeSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: firstError(parsed.error) }, { status: 400 });
    }

    const isNew = subscribe(parsed.data.email);
    return NextResponse.json({
      ok: true,
      message: isNew ? "Subscribe ho gaya! Batch updates aapko milte rahenge." : "Aap pehle se subscribed hain 😊",
    });
  } catch (error) {
    console.error("[api/subscribe]", error);
    return NextResponse.json({ error: "Subscribe nahi ho paya. Dobara try karein." }, { status: 500 });
  }
}
