"use client";

import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/data";
import { useState } from "react";

function initials(name: string) {
  return name.split(" ").map((s) => s[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();
}

export default function TestimonialCard({ t }: { t: Testimonial }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImg = t.avatar && !imgFailed;
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-7 hover:border-gold-400/40 transition">
      <Quote className="h-10 w-10 text-gold-400/60" />
      <p className="mt-4 font-serif italic text-base md:text-xl leading-[1.55] text-white/90">"{t.quote}"</p>

      <div className="mt-6 flex items-center gap-1">
        {[...Array(t.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
        {showImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={t.avatar}
            alt={t.name}
            onError={() => setImgFailed(true)}
            className="h-11 w-11 rounded-full object-cover border-2 border-gold-400"
          />
        ) : (
          <div className="h-11 w-11 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 text-brand-950 border-2 border-gold-400 flex items-center justify-center font-bold text-sm">
            {initials(t.name)}
          </div>
        )}
        <div className="min-w-0">
          <p className="font-semibold text-white truncate">{t.name}</p>
          <p className="text-xs text-white/60 truncate">{t.role}</p>
          {t.course && (
            <p className="text-[10px] uppercase tracking-wider text-gold-400 mt-0.5 truncate">
              {t.course}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
