import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/lib/data";

export default function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-7 hover:border-gold-400/40 transition">
      <Quote className="h-10 w-10 text-gold-400/60" />
      <p className="mt-4 font-serif italic text-xl leading-[1.55] text-white/90">"{t.quote}"</p>

      <div className="mt-6 flex items-center gap-1">
        {[...Array(t.rating)].map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
        <img
          src={t.avatar}
          alt={t.name}
          className="h-11 w-11 rounded-full object-cover border-2 border-gold-400"
        />
        <div>
          <p className="font-semibold text-white">{t.name}</p>
          <p className="text-xs text-white/60">{t.role}</p>
          {t.course && (
            <p className="text-[10px] uppercase tracking-wider text-gold-400 mt-0.5">
              {t.course}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
