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
    description: "Naam, tagline aur legal details — header, footer aur SEO me use hote hain.",
    fields: [
      { key: "siteName", label: "Institute ka poora naam" },
      { key: "siteShortName", label: "Short name (header/logo)" },
      { key: "siteTagline", label: "Tagline / motto" },
      { key: "legalName", label: "Legal / registered name" },
      { key: "foundedYear", label: "Stablished year", hint: "Experience calculate karne ke liye" },
    ],
  },
  {
    title: "Contact & address",
    icon: Phone,
    description: "Contact page, footer aur chatbot inhi details se jawab deta hai.",
    fields: [
      { key: "phone", label: "Primary phone" },
      { key: "alternatePhone", label: "Alternate phone" },
      { key: "whatsapp", label: "WhatsApp number", hint: "Country code ke saath, jaise 919000012345" },
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
    description: "Colors badalte hi poori website (buttons, badges, gradients) update ho jaati hai.",
    fields: [
      { key: "brandPrimary", label: "Primary colour", type: "color" },
      { key: "brandAccent", label: "Accent colour", type: "color" },
    ],
  },
  {
    title: "Website numbers",
    icon: Share2,
    description: "Home page ke stats aur ratings yahan se update hote hain.",
    fields: [
      { key: "studentsTrained", label: "Students trained (number)" },
      { key: "placementRate", label: "Placement rate (%)" },
      { key: "averageRating", label: "Google rating" },
      { key: "googleAnalyticsId", label: "Google Analytics ID", hint: "G-XXXXXXX (khali chhodein to analytics off)" },
    ],
  },
  {
    title: "Chatbot",
    icon: MessageSquare,
    description: "Rule-based assistant — courses, fees aur FAQ data se live jawab deta hai.",
    fields: [
      { key: "chatbotEnabled", label: "Chatbot on/off", hint: "true ya false likhein" },
      { key: "chatbotName", label: "Chatbot ka naam" },
      { key: "chatbotWelcome", label: "Welcome message", full: true },
    ],
  },
  {
    title: "Support / donation",
    icon: HeartHandshake,
    description: "Support Us page aur chatbot me ye payment details dikhti hain.",
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
    description: "Footer me icons ke saath dikhte hain. Khali chhodein to icon hide ho jaayega.",
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
              <Loader2 className="h-4 w-4 animate-spin" /> Save ho raha hai…
            </>
          ) : (
            "Settings save karein"
          )}
        </button>
        <p className="text-[12.5px] text-slate-500">
          Save karte hi poori website (header, footer, colors, chatbot) update ho jaati hai.
        </p>
      </div>
    </form>
  );
}
