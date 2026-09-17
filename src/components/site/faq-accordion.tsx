"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { Faq } from "@/lib/types";
import { cn } from "@/lib/utils";

export function FaqAccordion({ faqs, defaultOpen = 0 }: { faqs: Faq[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 bg-white">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        return (
          <div key={faq.id}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-slate-50"
            >
              <span className="flex-1">
                <span className="block font-heading text-[15px] font-semibold text-ink">{faq.question}</span>
                {faq.category ? (
                  <span className="mt-1 inline-block text-[11px] font-semibold uppercase tracking-wide text-brand-600">
                    {faq.category}
                  </span>
                ) : null}
              </span>
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors",
                  isOpen ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-600",
                )}
              >
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            {isOpen ? (
              <div className="animate-fade px-5 pb-5 text-[14px] leading-7 text-slate-600">{faq.answer}</div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
