"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { cn, formatINR } from "@/lib/utils";

type Props = {
  variant?: "contact" | "support" | "partner";
  tiers?: { name: string; amount: number }[];
  className?: string;
};

const COPY = {
  contact: {
    button: "Send message",
    subjectLabel: "What is this about?",
    subjects: ["Admission enquiry", "Course & fees", "Batch timing", "Demo class", "Other"],
  },
  support: {
    button: "Send a support pledge",
    subjectLabel: "Type of support",
    subjects: ["One-time donation", "Student scholarship sponsor", "Lab / batch sponsor", "Laptop / equipment donate", "Guest lecture"],
  },
  partner: {
    button: "Send partnership request",
    subjectLabel: "Partnership type",
    subjects: ["Hiring / placement drive", "CSR collaboration", "Internship program", "Guest faculty"],
  },
} as const;

export function ContactForm({ variant = "contact", tiers = [], className }: Props) {
  const copy = COPY[variant];
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState<number>(tiers[1]?.amount ?? tiers[0]?.amount ?? 1000);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    const formData = new FormData(event.currentTarget);
    const payload: Record<string, unknown> = Object.fromEntries(formData.entries());
    payload.type = variant === "contact" ? "CONTACT" : variant === "support" ? "SUPPORT" : "PARTNER";
    if (variant === "support") payload.amount = amount;
    delete payload.plan;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "We could not send your message");
      setState("done");
      setMessage(data.message || "Message received! We will contact you shortly.");
      event.currentTarget.reset();
    } catch (error) {
      setState("error");
      setMessage((error as Error).message);
    }
  }

  if (state === "done") {
    return (
      <div className={cn("card animate-rise p-6 text-center", className)}>
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-6 w-6" />
        </span>
        <h3 className="mt-3 font-heading text-lg font-bold">Thank you! 🙏</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{message}</p>
        {variant === "support" ? (
          <p className="mt-3 rounded-xl bg-brand-50 px-4 py-3 text-xs text-brand-800">
            After the transfer, please send us the screenshot on WhatsApp — we will issue your 80G receipt and a thank-you certificate.
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className={cn("card space-y-4 p-5 sm:p-6", className)}>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor={`${variant}-name`}>
            Full name *
          </label>
          <input id={`${variant}-name`} name="name" required minLength={3} className="field" placeholder="Your full name" />
        </div>
        <div>
          <label className="label" htmlFor={`${variant}-phone`}>
            Mobile number
          </label>
          <input
            id={`${variant}-phone`}
            name="phone"
            inputMode="tel"
            pattern="[+0-9\s-]{0,15}"
            className="field"
            placeholder="98XXXXXXXX"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor={`${variant}-email`}>
            Email *
          </label>
          <input
            id={`${variant}-email`}
            name="email"
            type="email"
            required
            className="field"
            placeholder="you@email.com"
          />
        </div>
        <div className={variant === "support" ? "" : "sm:col-span-2"}>
          <label className="label" htmlFor={`${variant}-subject`}>
            {copy.subjectLabel}
          </label>
          {variant === "support" ? (
            <select
              id={`${variant}-subject`}
              name="subject"
              className="field"
              value={tiers.find((t) => t.amount === amount)?.name ?? "Custom amount"}
              onChange={(e) => {
                const chosen = tiers.find((t) => t.name === e.target.value);
                if (chosen) setAmount(chosen.amount);
              }}
            >
              {tiers.map((tier) => (
                <option key={tier.name} value={tier.name}>
                  {tier.name} — {formatINR(tier.amount)}
                </option>
              ))}
              <option value="Custom amount">Custom amount</option>
            </select>
          ) : (
            <select id={`${variant}-subject`} name="subject" className="field" defaultValue={copy.subjects[0]}>
              {copy.subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          )}
        </div>
        {variant === "support" ? (
          <div>
            <label className="label" htmlFor={`${variant}-amount`}>
              Amount (₹)
            </label>
            <input
              id={`${variant}-amount`}
              name="amount"
              type="number"
              min={100}
              step={100}
              className="field"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <p className="mt-1 text-[11px] text-slate-500">Minimum ₹100 · 80G receipt available</p>
          </div>
        ) : null}
        <div className="sm:col-span-2">
          <label className="label" htmlFor={`${variant}-message`}>
            {variant === "support" ? "Anything you would like to add? *" : "Message *"}
          </label>
          <textarea
            id={`${variant}-message`}
            name="message"
            required
            minLength={10}
            rows={4}
            className="field resize-y"
            placeholder={
              variant === "support"
                ? "For example: I would like to sponsor one student's full course fees…"
                : "Tell us your question or requirement…"
            }
          />
        </div>
      </div>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {state === "error" ? (
        <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{message}</p>
      ) : null}

      <button type="submit" disabled={state === "loading"} className="btn btn-primary btn-lg w-full sm:w-auto">
        {state === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> {copy.button}
          </>
        )}
      </button>
      <p className="text-xs text-slate-500">
        Your details are used only for communication and are never shared with third parties.
      </p>
    </form>
  );
}
