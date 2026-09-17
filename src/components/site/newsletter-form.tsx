"use client";

import { useState } from "react";
import { Loader2, Mail, CheckCircle2, ArrowRight } from "lucide-react";

export function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Subscription failed");
      setState("done");
      setMessage(data.message || "Done! Career tips will now reach your inbox.");
      setEmail("");
    } catch (error) {
      setState("error");
      setMessage((error as Error).message);
    }
  }

  if (state === "done") {
    return (
      <p className="flex items-center gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3.5 text-[13.5px] font-semibold text-emerald-700">
        <CheckCircle2 className="h-4.5 w-4.5 shrink-0" /> {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "space-y-2" : "space-y-3"}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@email.com"
            className="field h-12 !border-white/15 !bg-white/95 pl-10 text-[14px]"
            aria-label="Email address"
          />
        </div>
        <button
          type="submit"
          disabled={state === "loading"}
          className="btn btn-accent h-12 shrink-0 justify-center px-6"
        >
          {state === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Subscribe <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
      {state === "error" ? <p className="text-xs font-semibold text-rose-300">{message}</p> : null}
      <p className="flex items-center gap-2 text-[12px] text-white/45">
        <CheckCircle2 className="h-3.5 w-3.5" /> Career tips and new batch updates. No spam, ever.
      </p>
    </form>
  );
}
