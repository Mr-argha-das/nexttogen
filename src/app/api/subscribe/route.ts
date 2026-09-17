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
      message: isNew ? "You are subscribed! Batch updates will now reach your inbox." : "You are already subscribed 😊",
    });
  } catch (error) {
    console.error("[api/subscribe]", error);
    return NextResponse.json({ error: "Subscription failed. Please try again." }, { status: 500 });
  }
}
