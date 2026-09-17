"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Palette, Phone, MessageSquare, HeartHandshake, Building2, Share2 } from "lucide-react";
import type { SiteSettings } from "@/lib/types";
import { saveSettingsAction, type ActionState } from "@/app/admin/actions";
import { Toast } from "./ui";

type Group = {
  title: string;
  icon: typeof Palette;
  description: string;
  fields: { key: keyof SiteSettings; label: string; hint?: string; type?: string; full?: boolean }[];
};

const GROUPS: Group[] = [
  {
    title: "Institute details",
    icon: Building2,
    description: "Name, tagline and legal details — used in the header, footer and SEO metadata.",
    fields: [
      { key: "siteName", label: "Institute ka poora naam" },
      { key: "siteShortName", label: "Short name (header/logo)" },
      { key: "siteTagline", label: "Tagline / motto" },
      { key: "legalName", label: "Legal / registered name" },
      { key: "foundedYear", label: "Established year", hint: "Used to calculate years of experience" },
    ],
  },
  {
    title: "Contact & address",
    icon: Phone,
    description: "The contact page, footer and chatbot all use these details.",
    fields: [
      { key: "phone", label: "Primary phone" },
      { key: "alternatePhone", label: "Alternate phone" },
      { key: "whatsapp", label: "WhatsApp number", hint: "Include the country code, for example 919000012345" },
      { key: "email", label: "Email" },
      { key: "admissionsEmail", label: "Admissions email" },
      { key: "officeHours", label: "Office hours" },
      { key: "addressLine1", label: "Address line 1" },
      { key: "addressLine2", label: "Address line 2 (landmark)" },
      { key: "city", label: "City" },
      { key: "state", label: "State" },
      { key: "pincode", label: "Pincode" },
      { key: "mapEmbedUrl", label: "Map embed URL", hint: "OpenStreetMap/Google Maps ka embed link", full: true },
    ],
  },
  {
    title: "Brand colours",
    icon: Palette,
    description: "Changing the colors instantly updates the whole website — buttons, badges and gradients.",
    fields: [
      { key: "brandPrimary", label: "Primary colour", type: "color" },
      { key: "brandAccent", label: "Accent colour", type: "color" },
    ],
  },
  {
    title: "Website numbers",
    icon: Share2,
    description: "The home page statistics and ratings are updated from here.",
    fields: [
      { key: "studentsTrained", label: "Students trained (number)" },
      { key: "placementRate", label: "Placement rate (%)" },
      { key: "averageRating", label: "Google rating" },
      { key: "googleAnalyticsId", label: "Google Analytics ID", hint: "G-XXXXXXX (leave empty to disable analytics)" },
    ],
  },
  {
    title: "Chatbot",
    icon: MessageSquare,
    description: "A rule-based assistant that answers live from your course, fee and FAQ data.",
    fields: [
      { key: "chatbotEnabled", label: "Chatbot on/off", hint: "Enter true or false" },
      { key: "chatbotName", label: "Chatbot ka naam" },
      { key: "chatbotWelcome", label: "Welcome message", full: true },
    ],
  },
  {
    title: "Support / donation",
    icon: HeartHandshake,
    description: "These payment details appear on the Support Us page and in the chatbot.",
    fields: [
      { key: "supportUpiId", label: "UPI ID" },
      { key: "supportBankName", label: "Bank name" },
      { key: "supportAccountName", label: "Account holder name" },
      { key: "supportAccountNumber", label: "Account number" },
      { key: "supportIfsc", label: "IFSC code" },
    ],
  },
  {
    title: "Social links",
    icon: Share2,
    description: "Shown as icons in the footer. Leave a field empty to hide that icon.",
    fields: [
      { key: "facebook", label: "Facebook URL" },
      { key: "instagram", label: "Instagram URL" },
      { key: "youtube", label: "YouTube URL" },
      { key: "linkedin", label: "LinkedIn URL" },
      { key: "twitter", label: "X (Twitter) URL" },
      { key: "telegram", label: "Telegram URL" },
    ],
  },
];

export function SettingsForm({ settings }: { settings: SiteSettings }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [state, setState] = useState<ActionState>(null);

  function submit(formData: FormData) {
    const payload: Record<string, string> = {};
    for (const group of GROUPS) {
      for (const field of group.fields) {
        const value = formData.get(field.key);
        payload[field.key] = value === null ? "" : String(value);
      }
    }
    startTransition(async () => {
      const result = await saveSettingsAction(payload);
      setState(result);
      if (result?.ok) router.refresh();
    });
  }

  return (
    <form action={submit} className="space-y-5 pb-10">
      <Toast state={state} />
      {GROUPS.map((group) => (
        <div key={group.title} className="card p-5">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
              <group.icon className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-heading text-[15px] font-bold">{group.title}</h2>
              <p className="text-[12.5px] text-slate-500">{group.description}</p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {group.fields.map((field) => {
              const isColor = field.type === "color";
              return (
                <div key={String(field.key)} className={field.full ? "sm:col-span-2" : ""}>
                  <label className="label" htmlFor={String(field.key)}>
                    {field.label}
                  </label>
                  <input
                    id={String(field.key)}
                    name={String(field.key)}
                    type={isColor ? "color" : field.type ?? "text"}
                    defaultValue={String(settings[field.key] ?? "")}
                    className={isColor ? "h-11 w-full rounded-xl border border-slate-200 p-1" : "field"}
                  />
                  {field.hint ? <p className="mt-1 text-[11.5px] text-slate-500">{field.hint}</p> : null}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="sticky bottom-4 flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white/95 p-4 backdrop-blur">
        <button type="submit" disabled={pending} className="btn btn-primary btn-lg">
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Saving…
            </>
          ) : (
            "Save settings"
          )}
        </button>
        <p className="text-[12.5px] text-slate-500">
          Saving updates the entire website instantly — header, footer, colors and chatbot.
        </p>
      </div>
    </form>
  );
}
