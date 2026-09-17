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
      return NextResponse.json({ error: "Chatbot abhi available nahi hai. Aap humein call kar lijiye." });
    }

    const context = { settings, courses: listCourses(), faqs: listFaqs() };
    const message = parsed.data.message.trim();
    const reply = message.length === 0 ? botGreeting(context) : answerMessage(message, context);

    return NextResponse.json(reply);
  } catch (error) {
    console.error("[api/chatbot]", error);
    return NextResponse.json(
      { text: "Thodi technical dikkat aa gayi 😅 Aap humein direct call ya WhatsApp kar lijiye." },
      { status: 500 },
    );
  }
}
