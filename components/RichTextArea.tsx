"use client";

import { TextareaHTMLAttributes } from "react";

// Simple rich-ish textarea: plain text with blank lines = paragraph breaks,
// lines starting with "- " = bullet items. Good enough for admin use without
// pulling a heavy WYSIWYG library. Renders are done with renderRich().
export default function RichTextArea({
  value,
  onChange,
  minHeight = 180,
  ...rest
}: {
  value: string;
  onChange: (v: string) => void;
  minHeight?: number;
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange">) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ minHeight }}
      className={
        "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-800 placeholder-ink-400 focus:outline-none focus:border-brand-700 focus:ring-2 focus:ring-brand-100 transition font-sans leading-relaxed"
      }
      {...rest}
    />
  );
}

// Render simple rich text (from RichTextArea) into React nodes safely-ish.
export function RenderRich({ text, className = "" }: { text: string; className?: string }) {
  if (!text) return null;
  const blocks = text.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  return (
    <div className={className}>
      {blocks.map((block, i) => {
        if (block.split("\n").every((l) => /^\s*[-*•]\s+/.test(l))) {
          const items = block.split("\n").map((l) => l.replace(/^\s*[-*•]\s+/, "").trim()).filter(Boolean);
          return (
            <ul key={i} className="my-4 space-y-2 list-disc pl-5 text-ink-700">
              {items.map((it, j) => <li key={j}>{it}</li>)}
            </ul>
          );
        }
        return <p key={i} className="my-3 leading-[1.8] text-ink-700">{block}</p>;
      })}
    </div>
  );
}
