"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import type { Faq } from "@/lib/types";
import { cn } from "@/lib/utils";

export function FaqAccordion({ faqs, defaultOpen = 0 }: { faqs: Faq[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-[var(--line)] overflow-hidden rounded-[1.5rem] border border-line bg-white shadow-[var(--shadow-md)]">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        return (
          <div key={faq.id} className={cn("transition-colors", isOpen && "bg-canvas/60")}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition-colors hover:bg-canvas sm:px-6"
            >
              <span className="flex flex-1 gap-4">
                <span
                  className={cn(
                    "hidden h-7 w-7 shrink-0 items-center justify-center rounded-lg font-heading text-[12px] font-extrabold transition-colors sm:flex",
                    isOpen ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-700",
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  <span
                    className={cn(
                      "block font-heading text-[15px] font-bold leading-snug transition-colors",
                      isOpen ? "text-brand-800" : "text-ink",
                    )}
                  >
                    {faq.question}
                  </span>
                  {faq.category ? (
                    <span className="mt-1.5 inline-block text-[10.5px] font-bold uppercase tracking-[0.14em] text-brand-500">
                      {faq.category}
                    </span>
                  ) : null}
                </span>
              </span>
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                  isOpen
                    ? "rotate-180 bg-[var(--grad-brand)] text-white shadow-[var(--shadow-sm)]"
                    : "bg-canvas text-slate-500",
                )}
              >
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            {isOpen ? (
              <div className="animate-fade px-5 pb-6 pl-5 text-[14px] leading-7 text-slate-600 sm:px-6 sm:pl-17">
                {faq.answer}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
