"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Upload,
  FileText,
  User,
  Mail,
  Phone,
  GraduationCap,
  BookOpen,
  ArrowRight,
  ArrowLeft,
  Lock,
  Sparkles
} from "lucide-react";
import { allCourses } from "@/lib/data";

const steps = [
  { id: 1, title: "Personal Info" },
  { id: 2, title: "Program Choice" },
  { id: 3, title: "Background" },
  { id: 4, title: "Review & Submit" }
];

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [appId, setAppId] = useState<string>("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "India",
    city: "",
    course: allCourses[0].title,
    startDate: "Fall 2026 (Oct)",
    experience: "Student (0-1 yrs)",
    education: "Bachelor's",
    goals: "",
    linkedin: "",
    resume: "",
    hearAbout: "Social Media",
    scholarship: false,
    agree: false
  });

  const set = (k: keyof typeof form, v: any) => setForm((f) => ({ ...f, [k]: v }));

  const progress = (step / steps.length) * 100;

  if (submitted) {
    return (
      <section className="section">
        <div className="container-x max-w-2xl text-center">
          <div className="mx-auto h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="heading mt-6 text-3xl md:text-5xl">
            Application received!
          </h1>
          <p className="mt-4 text-ink-600 text-lg">
            Thank you, <b>{form.firstName || "friend"}</b>. We've sent a
            confirmation to <b>{form.email}</b>. Our admissions team will review
            your application and reach out within 48 hours.
          </p>
          <p className="mt-2 text-ink-500 text-sm">
            Application ID: {appId}
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="relative bg-brand-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-hero-radial" />
        <div className="relative container-x pt-16 pb-16 md:pt-20 md:pb-20">
          <span className="eyebrow !border-gold-400/40 !bg-gold-400/10 !text-gold-300">
            <Sparkles className="h-3.5 w-3.5" /> Admissions
          </span>
          <h1 className="heading mt-5 text-4xl md:text-6xl text-white">
            Apply to NextToGen.
          </h1>
          <p className="mt-5 text-white/75 max-w-2xl text-lg">
            Begin your journey in under 5 minutes. Our admissions team reviews
            every application personally.
          </p>
        </div>
      </section>

      <section className="container-x -mt-10 relative z-10 pb-24">
        <div className="glass !bg-white p-6 md:p-10">
          {/* Stepper */}
          <div className="mb-10">
            <div className="flex items-center justify-between">
              {steps.map((s) => (
                <div key={s.id} className="flex items-center flex-1 last:flex-none">
                  <div
                    className={`flex items-center justify-center h-10 w-10 rounded-full text-sm font-bold transition ${
                      step >= s.id
                        ? "bg-gold-400 text-brand-950 shadow-glow-gold"
                        : "bg-ink-100 text-ink-400"
                    }`}
                  >
                    {step > s.id ? <CheckCircle2 className="h-5 w-5" /> : s.id}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className="text-xs uppercase tracking-wider text-ink-400">
                      Step {s.id}
                    </p>
                    <p
                      className={`text-sm font-semibold ${
                        step >= s.id ? "text-brand-900" : "text-ink-400"
                      }`}
                    >
                      {s.title}
                    </p>
                  </div>
                  {s.id < steps.length && (
                    <div className="flex-1 h-[2px] mx-3 bg-ink-100 relative overflow-hidden">
                      <div
                        className="h-full bg-gold-400 transition-all"
                        style={{ width: step > s.id ? "100%" : "0%" }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 h-1.5 w-full rounded-full bg-ink-100 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-brand-700 to-gold-400 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="min-h-[380px]">
            {step === 1 && (
              <div className="grid gap-5 md:grid-cols-2">
                <Field icon={User} label="First Name" required>
                  <input
                    value={form.firstName}
                    onChange={(e) => set("firstName", e.target.value)}
                    placeholder="Arjun"
                    className={inputCls}
                  />
                </Field>
                <Field icon={User} label="Last Name" required>
                  <input
                    value={form.lastName}
                    onChange={(e) => set("lastName", e.target.value)}
                    placeholder="Sharma"
                    className={inputCls}
                  />
                </Field>
                <Field icon={Mail} label="Email" required>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    placeholder="you@example.com"
                    className={inputCls}
                  />
                </Field>
                <Field icon={Phone} label="Phone" required>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    placeholder="+91 98765 43210"
                    className={inputCls}
                  />
                </Field>
                <Field icon={Globe} label="Country">
                  <select
                    value={form.country}
                    onChange={(e) => set("country", e.target.value)}
                    className={inputCls}
                  >
                    <option>India</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>Other</option>
                  </select>
                </Field>
                <Field icon={MapPin} label="City">
                  <input
                    value={form.city}
                    onChange={(e) => set("city", e.target.value)}
                    placeholder="Jaipur"
                    className={inputCls}
                  />
                </Field>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <Field icon={BookOpen} label="Which program do you want to join?" required>
                  <select
                    value={form.course}
                    onChange={(e) => set("course", e.target.value)}
                    className={inputCls}
                  >
                    {allCourses.map((c) => (
                      <option key={c.slug}>{c.title}</option>
                    ))}
                  </select>
                </Field>
                <Field icon={GraduationCap} label="Preferred Start Date">
                  <div className="grid sm:grid-cols-3 gap-3">
                    {["Fall 2026 (Oct)", "Winter 2027 (Jan)", "Spring 2027 (Apr)"].map(
                      (d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => set("startDate", d)}
                          className={`rounded-xl border p-4 text-left transition ${
                            form.startDate === d
                              ? "border-brand-800 bg-brand-50 ring-2 ring-brand-200"
                              : "border-ink-200 hover:border-brand-500"
                          }`}
                        >
                          <p className="font-semibold text-brand-900">{d}</p>
                          <p className="text-xs text-ink-500 mt-1">Cohort starts</p>
                        </button>
                      )
                    )}
                  </div>
                </Field>

                <label className="flex items-start gap-3 p-4 rounded-xl bg-gold-50 border border-gold-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.scholarship}
                    onChange={(e) => set("scholarship", e.target.checked)}
                    className="mt-1 h-4 w-4 accent-gold-500"
                  />
                  <div>
                    <p className="font-semibold text-brand-900">
                      Apply for a need-based scholarship
                    </p>
                    <p className="text-xs text-ink-600 mt-1">
                      We offer scholarships up to 100% for deserving candidates.
                    </p>
                  </div>
                </label>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-5 md:grid-cols-2">
                <Field icon={Briefcase} label="Current Experience Level">
                  <select
                    value={form.experience}
                    onChange={(e) => set("experience", e.target.value)}
                    className={inputCls}
                  >
                    <option>Student (0-1 yrs)</option>
                    <option>1-3 years</option>
                    <option>3-5 years</option>
                    <option>5+ years</option>
                    <option>Founder / Entrepreneur</option>
                  </select>
                </Field>
                <Field icon={GraduationCap} label="Highest Education">
                  <select
                    value={form.education}
                    onChange={(e) => set("education", e.target.value)}
                    className={inputCls}
                  >
                    <option>High School</option>
                    <option>Bachelor's</option>
                    <option>Master's</option>
                    <option>PhD</option>
                    <option>Other</option>
                  </select>
                </Field>
                <Field
                  icon={Linkedin}
                  label="LinkedIn / Portfolio"
                  className="md:col-span-2"
                >
                  <input
                    value={form.linkedin}
                    onChange={(e) => set("linkedin", e.target.value)}
                    placeholder="https://linkedin.com/in/yourname"
                    className={inputCls}
                  />
                </Field>
                <Field
                  icon={FileText}
                  label="Tell us about your goals"
                  className="md:col-span-2"
                  required
                >
                  <textarea
                    value={form.goals}
                    onChange={(e) => set("goals", e.target.value)}
                    rows={4}
                    placeholder="What do you hope to achieve after completing this program?"
                    className={inputCls + " resize-none"}
                  />
                </Field>
                <Field icon={Upload} label="Resume / CV" className="md:col-span-2">
                  <label className="flex items-center justify-center gap-2 border-2 border-dashed border-ink-200 rounded-xl p-6 cursor-pointer hover:border-brand-500 hover:bg-brand-50/50 transition">
                    <Upload className="h-5 w-5 text-brand-700" />
                    <span className="text-sm text-ink-600">
                      Click to upload (PDF, DOC) — or drag & drop
                    </span>
                    <input type="file" className="hidden" />
                  </label>
                </Field>
                <Field icon={Ear} label="How did you hear about us?">
                  <select
                    value={form.hearAbout}
                    onChange={(e) => set("hearAbout", e.target.value)}
                    className={inputCls}
                  >
                    <option>Social Media</option>
                    <option>Friend / Colleague</option>
                    <option>Google Search</option>
                    <option>YouTube</option>
                    <option>Blog / Newsletter</option>
                    <option>Other</option>
                  </select>
                </Field>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <div className="rounded-2xl border border-brand-100 bg-brand-50/50 p-6">
                  <h3 className="font-display text-xl font-bold text-brand-900">
                    Review your application
                  </h3>
                  <div className="mt-5 grid sm:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                    <Review label="Name" value={`${form.firstName} ${form.lastName}`} />
                    <Review label="Email" value={form.email} />
                    <Review label="Phone" value={form.phone} />
                    <Review label="Location" value={`${form.city}, ${form.country}`} />
                    <Review label="Program" value={form.course} />
                    <Review label="Cohort" value={form.startDate} />
                    <Review label="Experience" value={form.experience} />
                    <Review label="Education" value={form.education} />
                    <Review
                      label="Scholarship"
                      value={form.scholarship ? "Applied" : "Not applied"}
                    />
                    <Review label="Referred by" value={form.hearAbout} />
                  </div>
                </div>

                <label className="flex items-start gap-3 p-4 rounded-xl border border-ink-200 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.agree}
                    onChange={(e) => set("agree", e.target.checked)}
                    className="mt-1 h-4 w-4 accent-gold-500"
                  />
                  <span className="text-sm text-ink-700">
                    I agree to the{" "}
                    <a className="text-brand-800 underline">Terms of Service</a> and{" "}
                    <a className="text-brand-800 underline">Privacy Policy</a>, and
                    consent to NextToGen contacting me about my application.
                  </span>
                </label>
                <div className="flex items-center gap-2 text-xs text-ink-500">
                  <Lock className="h-3.5 w-3.5" /> Your information is encrypted and
                  never shared.
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-10 flex items-center justify-between gap-3">
            <button
              type="button"
              disabled={step === 1}
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              className="btn-outline disabled:opacity-40"
            >
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
            {step < steps.length ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(steps.length, s + 1))}
                className="btn-gold"
              >
                Continue <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                type="button"
                disabled={!form.agree}
                onClick={async () => {
                if (!form.agree) return;
                setSubmitting(true);
                setSubmitError(null);
                try {
                  const res = await fetch("/api/admin/submissions?kind=application", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form)
                  });
                  const j = await res.json();
                  if (!res.ok || !j.ok) throw new Error(j.error || "Submission failed");
                  setAppId(j.id);
                  setSubmitted(true);
                } catch (e: any) {
                  setSubmitError(e.message || "Could not submit application. Please try again.");
                } finally {
                  setSubmitting(false);
                }
              }}
                className="btn-gold disabled:opacity-40"
              >
                Submit Application <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

const inputCls =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-800 placeholder-ink-400 focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-100 transition";

import { Globe, MapPin, Briefcase, Linkedin, Ear } from "lucide-react";

function Field({
  icon: Icon,
  label,
  children,
  required,
  className = ""
}: {
  icon: any;
  label: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold uppercase tracking-wider text-ink-500 mb-2">
        <span className="inline-flex items-center gap-1.5">
          <Icon className="h-3.5 w-3.5" /> {label}
          {required && <span className="text-red-500">*</span>}
        </span>
      </label>
      {children}
    </div>
  );
}

function Review({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-ink-500">{label}</p>
      <p className="mt-1 font-semibold text-brand-900">{value || "—"}</p>
    </div>
  );
}
