"use client";

import { useEffect, useRef, useState } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  GraduationCap
} from "lucide-react";
import clsx from "clsx";

type Msg = { from: "bot" | "user"; text: string };

const intents: { keys: string[]; reply: string }[] = [
  {
    keys: ["course", "program", "learn", "class"],
    reply:
      "We offer 40+ industry-led courses across Data Science, AI, Design, Business, Marketing and Career Skills. Head to the Courses page to explore them!"
  },
  {
    keys: ["apply", "enroll", "register", "sign up", "admission"],
    reply:
      "Wonderful! You can apply using our Apply Now form — just tap the gold button on the Home page or visit /apply. Admissions take ~48 hours to review."
  },
  {
    keys: ["fee", "cost", "price", "scholarship", "financial"],
    reply:
      "Tuition varies by program. We offer need-based scholarships and easy EMIs. Visit Support Us to donate or apply for a scholarship."
  },
  {
    keys: ["mentor", "teacher", "instructor"],
    reply:
      "Our mentors come from Google, Microsoft, ISRO, IIT, NID and top startups. Every learner gets 1:1 mentorship sessions weekly."
  },
  {
    keys: ["contact", "reach", "email", "phone"],
    reply:
      "You can reach us at hello@nexttogen.app or +91 12345 67890. We reply within 24 hours (Mon–Sat)."
  },
  {
    keys: ["blog", "article", "resource"],
    reply:
      "Our blog publishes deep dives, career guides and student stories every week — check /blog to read the latest."
  },
  {
    keys: ["support", "donate", "help"],
    reply:
      "Thank you for wanting to support! Visit /support to donate, volunteer, or partner with us."
  },
  {
    keys: ["hi", "hello", "hey", "hola"],
    reply:
      "Hi there! 👋 I'm Gen, the NextToGen assistant. Ask me anything about courses, admissions, mentors or support."
  }
];

function replyFor(text: string) {
  const t = text.toLowerCase();
  for (const it of intents) {
    if (it.keys.some((k) => t.includes(k))) return it.reply;
  }
  return "Great question! I can help with courses, admissions, mentors, scholarships, or how to reach us. What would you like to know?";
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([
    {
      from: "bot",
      text: "Hi! I'm Gen 👋 — your NextToGen assistant. How can I help you today?"
    }
  ]);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth"
    });
  }, [messages, typing, open]);

  const send = () => {
    const t = input.trim();
    if (!t) return;
    setMessages((m) => [...m, { from: "user", text: t }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: replyFor(t) }]);
      setTyping(false);
    }, 700);
  };

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          "fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full shadow-glow-gold transition",
          open
            ? "bg-brand-900 text-gold-400"
            : "bg-gold-400 text-brand-950 hover:bg-gold-500 hover:text-white animate-float"
        )}
        aria-label="Open chat"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
        {!open && (
          <span className="absolute -top-1 -right-1 inline-flex h-3 w-3 rounded-full bg-red-500 ring-2 ring-white" />
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[92vw] max-w-sm rounded-2xl bg-white shadow-2xl border border-ink-100 overflow-hidden animate-in">
          <div className="bg-gradient-to-br from-brand-900 to-brand-700 p-4 text-white">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 rounded-full bg-gold-400 text-brand-950 flex items-center justify-center">
                <Bot className="h-5 w-5" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-400 ring-2 ring-brand-700" />
              </div>
              <div>
                <p className="font-semibold flex items-center gap-1.5">
                  Gen <Sparkles className="h-3.5 w-3.5 text-gold-400" />
                </p>
                <p className="text-xs text-white/70">NextToGen Assistant · Online</p>
              </div>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="h-80 overflow-y-auto p-4 space-y-3 bg-brand-50/40"
          >
            {messages.map((m, i) => (
              <div
                key={i}
                className={clsx(
                  "flex gap-2",
                  m.from === "user" ? "justify-end" : "justify-start"
                )}
              >
                {m.from === "bot" && (
                  <div className="h-7 w-7 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center shrink-0">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                )}
                <div
                  className={clsx(
                    "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    m.from === "bot"
                      ? "bg-white text-ink-800 border border-ink-100 rounded-tl-sm"
                      : "bg-brand-800 text-white rounded-tr-sm"
                  )}
                >
                  {m.text}
                </div>
                {m.from === "user" && (
                  <div className="h-7 w-7 rounded-full bg-gold-400 text-brand-950 flex items-center justify-center shrink-0">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex gap-2">
                <div className="h-7 w-7 rounded-full bg-brand-100 text-brand-800 flex items-center justify-center shrink-0">
                  <GraduationCap className="h-4 w-4" />
                </div>
                <div className="bg-white border border-ink-100 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-ink-300 animate-bounce" />
                  <span className="h-2 w-2 rounded-full bg-ink-300 animate-bounce [animation-delay:0.15s]" />
                  <span className="h-2 w-2 rounded-full bg-ink-300 animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex items-center gap-2 p-3 border-t border-ink-100 bg-white"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about courses, apply, support…"
              className="flex-1 rounded-full bg-ink-50 border border-ink-100 px-4 py-2.5 text-sm focus:outline-none focus:border-brand-500 focus:bg-white"
            />
            <button
              type="submit"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold-400 text-brand-950 hover:bg-gold-500 hover:text-white transition"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
