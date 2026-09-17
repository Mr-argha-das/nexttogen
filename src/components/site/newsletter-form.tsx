"use client";

import { useState } from "react";
import { Loader2, Mail, CheckCircle2 } from "lucide-react";

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
      if (!res.ok) throw new Error(data.error || "Subscribe nahi ho paya");
      setState("done");
      setMessage(data.message || "Ho gaya! Ab career tips aapke inbox me aayenge.");
      setEmail("");
    } catch (error) {
      setState("error");
      setMessage((error as Error).message);
    }
  }

  if (state === "done") {
    return (
      <p className="flex items-center gap-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
        <CheckCircle2 className="h-4 w-4" /> {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className={compact ? "space-y-2" : "space-y-3"}>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="aapka@email.com"
            className="field bg-white/95 pl-9"
            aria-label="Email address"
          />
        </div>
        <button type="submit" disabled={state === "loading"} className="btn btn-accent shrink-0">
          {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : "Subscribe"}
        </button>
      </div>
      {state === "error" && <p className="text-xs font-medium text-rose-600">{message}</p>}
      <p className="text-xs text-slate-400">Career tips, new batch updates. Spam nahi bhejenge.</p>
    </form>
  );
}
