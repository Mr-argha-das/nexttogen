"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2, Send, ShieldCheck, User, Mail, Phone, MapPin, GraduationCap, Clock } from "lucide-react";
import type { Course } from "@/lib/types";
import { formatINR } from "@/lib/utils";

type Props = {
  courses: Pick<Course, "id" | "slug" | "title" | "fee" | "discountFee" | "duration" | "mode">[];
  preselected?: string;
  compact?: boolean;
};

export function ApplyForm({ courses, preselected, compact = false }: Props) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");
  const [courseId, setCourseId] = useState(
    courses.find((c) => c.slug === preselected)?.id ?? courses[0]?.id ?? "",
  );

  const selected = courses.find((c) => c.id === courseId);
  const payable = selected
    ? selected.discountFee && selected.discountFee < selected.fee
      ? selected.discountFee
      : selected.fee
    : 0;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    setError("");
    const formData = new FormData(event.currentTarget);
    const payload: Record<string, unknown> = Object.fromEntries(formData.entries());
    payload.courseId = courseId;
    payload.courseName = selected?.title ?? "";
    delete payload.website_confirm;

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "We could not submit your form");
      setReference(data.id ? String(data.id).slice(-6).toUpperCase() : "");
      setState("done");
      window.scrollTo({ top: 200, behavior: "smooth" });
    } catch (err) {
      setState("error");
      setError((err as Error).message);
    }
  }

  if (state === "done") {
    return (
      <div className="card animate-rise p-6 text-center sm:p-8">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <CheckCircle2 className="h-7 w-7" />
        </span>
        <h3 className="mt-4 font-heading text-xl font-bold">Application received! 🎉</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          {reference ? (
            <>
              Your reference number: <strong className="text-ink">#{reference}</strong>
              <br />
            </>
          ) : null}
          Our admission team will call you within 24 hours to confirm your counselling session and a demo class slot.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link href="/courses" className="btn btn-outline">
            Browse more courses
          </Link>
          <Link href="/faq" className="btn btn-primary">
            Read common questions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-5 p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="fullName">
            Full name *
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input id="fullName" name="fullName" required minLength={3} className="field pl-9" placeholder="Your full name" />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="phone">
            Mobile number *
          </label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="phone"
              name="phone"
              required
              inputMode="tel"
              pattern="[+0-9\s-]{10,15}"
              className="field pl-9"
              placeholder="98XXXXXXXX"
            />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="email">
            Email *
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input id="email" name="email" type="email" required className="field pl-9" placeholder="you@email.com" />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="city">
            City
          </label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input id="city" name="city" className="field pl-9" placeholder="Jaipur" />
          </div>
        </div>
        <div>
          <label className="label" htmlFor="courseId">
            Choose a course *
          </label>
          <select
            id="courseId"
            name="courseId"
            className="field"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          >
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title} — {course.duration}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="qualification">
            Last qualification
          </label>
          <div className="relative">
            <GraduationCap className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select id="qualification" name="qualification" className="field pl-9" defaultValue="12th">
              <option value="10th">10th</option>
              <option value="12th">12th</option>
              <option value="Graduate">Graduate</option>
              <option value="Post Graduate">Post Graduate</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
        <div>
          <label className="label" htmlFor="preferredMode">
            Preferred mode
          </label>
          <div className="relative">
            <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <select id="preferredMode" name="preferredMode" className="field pl-9" defaultValue="Offline">
              <option value="Offline">Offline (on campus)</option>
              <option value="Online">Online (live + recording)</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>
        <div>
          <label className="label" htmlFor="message">
            Anything you would like to ask? (optional)
          </label>
          <input id="message" name="message" className="field" placeholder="For example: I prefer the morning batch" />
        </div>
      </div>

      {selected && !compact ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-brand-50 px-4 py-3 text-sm">
          <span className="flex items-center gap-2 text-brand-800">
            <ShieldCheck className="h-4 w-4" />
            {selected.mode} · {selected.duration}
          </span>
          <span className="font-semibold text-brand-900">
            Fees: {formatINR(payable)}
            {selected.discountFee && selected.discountFee < selected.fee ? (
              <span className="ml-2 text-xs font-medium text-slate-500 line-through">{formatINR(selected.fee)}</span>
            ) : null}
            <span className="ml-2 text-xs font-medium text-emerald-700">0% EMI available</span>
          </span>
        </div>
      ) : null}

      {/* honeypot */}
      <input type="text" name="website_confirm" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      {state === "error" ? (
        <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{error}</p>
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={state === "loading"} className="btn btn-primary btn-lg">
          {state === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" /> Submit application
            </>
          )}
        </button>
        <p className="text-xs text-slate-500">
          By submitting this form you allow us to contact you by phone or WhatsApp. Your details stay private.
        </p>
      </div>
    </form>
  );
}
