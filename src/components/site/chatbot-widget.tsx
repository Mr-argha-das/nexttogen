"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bot, MessageCircle, Send, X, Sparkles, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

type BotLink = { label: string; href: string };
type ChatMessage = { role: "user" | "bot"; text: string; suggestions?: string[]; links?: BotLink[] };

type Props = {
  botName: string;
  welcome: string;
  phone: string;
  whatsapp: string;
};

const STORAGE_KEY = "ntg-chat-history";

const STARTER_PROMPTS = [
  "What are the course fees?",
  "How does admission work?",
  "What are the batch timings?",
  "Do you provide placement support?",
];

export function ChatbotWidget({ botName, welcome, phone, whatsapp }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Greet on the first visit; restore the conversation on later visits.
  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as ChatMessage[];
        if (Array.isArray(parsed) && parsed.length) {
          setMessages(parsed);
          return;
        }
      } catch {
        /* ignore malformed history */
      }
    }
    setMessages([{ role: "bot", text: welcome, suggestions: STARTER_PROMPTS }]);
  }, [welcome]);

  useEffect(() => {
    if (messages.length) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-20)));
  }, [messages]);

  useEffect(() => {
    const timer = window.setTimeout(() => setTeaser(true), 6000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading, open]);

  async function send(text: string) {
    const value = text.trim();
    if (!value || loading) return;
    setInput("");
    setMessages((previous) => [...previous, { role: "user", text: value }]);
    setLoading(true);
    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: value,
          history: messages.slice(-6).map((message) => ({ role: message.role, text: message.text })),
        }),
      });
      const data = (await response.json()) as {
        text?: string;
        suggestions?: string[];
        links?: BotLink[];
        error?: string;
      };
      setMessages((previous) => [
        ...previous,
        {
          role: "bot",
          text:
            data.text ||
            data.error ||
            "Sorry, something went wrong on our side. Please call the admission desk and we will help you right away.",
          suggestions: data.suggestions,
          links: data.links,
        },
      ]);
    } catch {
      setMessages((previous) => [
        ...previous,
        {
          role: "bot",
          text: "It looks like there is a network issue. You can call us directly and we will assist you immediately.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="no-print fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* Teaser bubble */}
      {!open && teaser && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="animate-pop hidden max-w-[240px] rounded-2xl rounded-br-md border border-slate-200 bg-white p-3 text-left text-sm shadow-xl sm:block"
        >
          <span className="flex items-center gap-2 font-semibold text-ink">
            <Sparkles className="h-4 w-4 text-brand-600" /> {botName} is here!
          </span>
          <span className="mt-1 block text-xs text-slate-500">
            Ask about courses, fees or admission — you will get an instant answer.
          </span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="animate-pop flex h-[min(560px,80vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-brand-600 to-brand-800 px-4 py-3 text-white">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white/15">
                <Bot className="h-5 w-5" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-brand-700 bg-emerald-400" />
              </span>
              <span>
                <span className="block text-sm font-semibold">{botName} · Admission Assistant</span>
                <span className="block text-[11px] text-white/70">Online · instant replies</span>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-lg p-1.5 transition-colors hover:bg-white/15"
            >
              <X className="h-4.5 w-4.5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-canvas px-3.5 py-4">
            {messages.map((message, index) => (
              <div key={index} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                <div className="max-w-[86%] space-y-2">
                  <div
                    className={cn(
                      "whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[13px] leading-6 shadow-sm",
                      message.role === "user"
                        ? "rounded-br-md bg-brand-600 text-white"
                        : "rounded-bl-md border border-slate-200 bg-white text-slate-700",
                    )}
                  >
                    {message.text}
                  </div>
                  {message.role === "bot" && (message.links?.length || message.suggestions?.length) ? (
                    <div className="space-y-2">
                      {message.links?.length ? (
                        <div className="flex flex-wrap gap-1.5">
                          {message.links.map((link) =>
                            link.href.startsWith("http") || link.href.startsWith("tel:") ? (
                              <a
                                key={link.href}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="chip"
                              >
                                {link.label}
                              </a>
                            ) : (
                              <Link key={link.href} href={link.href} className="chip" onClick={() => setOpen(false)}>
                                {link.label}
                              </Link>
                            ),
                          )}
                        </div>
                      ) : null}
                      {message.suggestions?.length ? (
                        <div className="flex flex-wrap gap-1.5">
                          {message.suggestions.map((suggestion) => (
                            <button
                              key={suggestion}
                              type="button"
                              onClick={() => send(suggestion)}
                              className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:border-brand-200 hover:text-brand-700"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-slate-200 bg-white px-4 py-3">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-brand-400 [animation-delay:-0.2s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-brand-500 [animation-delay:-0.1s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-brand-600" />
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-slate-200 bg-white p-3">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type your question…"
                className="field flex-1"
                aria-label="Message"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="btn btn-primary h-10 w-10 !p-0 disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
              <span>Rule-based assistant — answers come from live course data</span>
              <span className="flex items-center gap-2">
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-1 hover:text-brand-600">
                  <Phone className="h-3 w-3" /> Call
                </a>
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-600"
                >
                  WhatsApp
                </a>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Floating buttons */}
      {!open && (
        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg transition-transform hover:scale-105"
          >
            <MessageCircle className="h-5.5 w-5.5" />
          </a>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Chat with ${botName}`}
            className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-brand-600 to-brand-800 px-4 py-3 text-sm font-semibold text-white shadow-xl transition-transform hover:scale-105"
          >
            <Bot className="h-5 w-5" />
            <span className="hidden sm:inline">Ask us anything</span>
            <span className="sm:hidden">{botName}</span>
          </button>
        </div>
      )}
    </div>
  );
}
