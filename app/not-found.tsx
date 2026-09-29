import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center">
      <div className="container-x text-center py-20">
        <div className="mx-auto h-20 w-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-glow-brand">
          <LogoMark className="h-11 w-auto" />
        </div>
        <p className="mt-8 text-xs uppercase tracking-[0.3em] text-gold-300 font-bold">
          404
        </p>
        <h1 className="heading mt-3 text-4xl md:text-6xl">Page not found</h1>
        <p className="mt-4 text-ink-600 max-w-md mx-auto">
          The page you're looking for seems to have wandered off. Let's get you
          back on track.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link href="/" className="btn-gold">
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </Link>
          <Link href="/courses" className="btn-outline">
            Browse Courses
          </Link>
        </div>
      </div>
    </section>
  );
}
