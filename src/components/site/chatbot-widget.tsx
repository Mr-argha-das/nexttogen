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
          className="animate-pop card-glass hidden max-w-[262px] rounded-2xl rounded-br-md p-3.5 text-left shadow-[var(--shadow-lg)] sm:block"
        >
          <span className="flex items-center gap-2.5">
            <span className="relative flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--grad-brand)] text-white">
              <Sparkles className="h-4 w-4" />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
            </span>
            <span className="text-[13.5px] font-bold text-ink">{botName} is online</span>
          </span>
          <span className="mt-2 block text-[12.5px] leading-5 text-slate-500">
            Ask about courses, fees or admission and get an instant answer.
          </span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="animate-pop flex h-[min(580px,80vh)] w-[min(392px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[26px] border border-white/60 bg-white shadow-[var(--shadow-xl)]">
          <div className="relative overflow-hidden bg-[var(--grad-brand-deep)] px-4 py-3.5 text-white">
            <div className="dot-grid pointer-events-none absolute inset-0 opacity-[0.15]" />
            <div className="relative flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-white/12 ring-1 ring-white/20">
                  <Bot className="h-5 w-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-brand-800 bg-emerald-400" />
                </span>
                <span>
                  <span className="block text-[13.5px] font-bold">{botName} · Admission assistant</span>
                  <span className="flex items-center gap-1.5 text-[11px] text-white/60">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Online · instant replies
                  </span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-xl p-1.5 text-white/70 transition-colors hover:bg-white/15 hover:text-white"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3.5 overflow-y-auto bg-canvas px-3.5 py-4">
            {messages.map((message, index) => (
              <div key={index} className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}>
                <div className="max-w-[86%] space-y-2">
                  <div
                    className={cn(
                      "whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-[13px] leading-6",
                      message.role === "user"
                        ? "rounded-br-md bg-[var(--grad-brand)] font-medium text-white shadow-[var(--shadow-brand)]"
                        : "rounded-bl-md border border-line bg-white text-slate-700 shadow-[var(--shadow-xs)]",
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
                                className="chip chip-accent"
                              >
                                {link.label}
                              </a>
                            ) : (
                              <Link key={link.href} href={link.href} className="chip chip-accent" onClick={() => setOpen(false)}>
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
                              className="rounded-full border border-line bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-700 hover:shadow-[var(--shadow-xs)]"
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
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-line bg-white px-4 py-3 shadow-[var(--shadow-xs)]">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-brand-400 [animation-delay:-0.2s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-brand-500 [animation-delay:-0.1s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-brand-600" />
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-line bg-white p-3">
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
                className="btn btn-primary h-10 w-10 !p-0 shadow-[var(--shadow-brand)] disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
            <div className="mt-2.5 flex items-center justify-between text-[10.5px] text-slate-400">
              <span className="hidden sm:inline">Answers come from live course data</span>
              <span className="sm:hidden">Live course data</span>
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
            className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_14px_30px_-8px_rgba(16,185,129,0.6)] ring-1 ring-emerald-400/40 transition-transform hover:scale-105"
          >
            <MessageCircle className="h-5.5 w-5.5" />
          </a>
          <span className="relative inline-flex">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-brand-500/30 [animation-duration:3s]"
            />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={`Chat with ${botName}`}
              className="relative flex items-center gap-2.5 rounded-full bg-[var(--grad-brand)] py-3 pl-3.5 pr-5 text-[13.5px] font-bold text-white shadow-[var(--shadow-brand)] ring-1 ring-white/20 transition-transform hover:scale-[1.03]"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                <Bot className="h-4 w-4" />
              </span>
              <span className="hidden sm:inline">Ask us anything</span>
              <span className="sm:hidden">{botName}</span>
              <span className="absolute right-0 top-0 h-3 w-3 translate-x-1/3 -translate-y-1/3 rounded-full bg-accent-400 ring-2 ring-white" />
            </button>
          </span>
        </div>
      )}
    </div>
  );
}
