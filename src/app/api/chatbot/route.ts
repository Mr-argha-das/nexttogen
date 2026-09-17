import { NextResponse } from "next/server";
import { getSettings, listCourses, listFaqs } from "@/lib/data";
import { answerMessage, botGreeting } from "@/lib/chatbot";
import { chatbotSchema, firstError } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = chatbotSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: firstError(parsed.error) }, { status: 400 });
    }

    const settings = getSettings();
    if (settings.chatbotEnabled === "false") {
      return NextResponse.json({ error: "The chatbot is unavailable right now. Please call us and we will help you directly." });
    }

    const context = { settings, courses: listCourses(), faqs: listFaqs() };
    const message = parsed.data.message.trim();
    const reply = message.length === 0 ? botGreeting(context) : answerMessage(message, context);

    return NextResponse.json(reply);
  } catch (error) {
    console.error("[api/chatbot]", error);
    return NextResponse.json(
      { text: "We hit a small technical issue 😅 Please call or WhatsApp us directly and we will take it from there." },
      { status: 500 },
    );
  }
}
