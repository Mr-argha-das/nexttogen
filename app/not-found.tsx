import Link from "next/link";
import { GraduationCap, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center">
      <div className="container-x text-center py-20">
        <div className="mx-auto h-20 w-20 rounded-2xl bg-brand-900 text-gold-400 flex items-center justify-center shadow-glow-brand">
          <GraduationCap className="h-10 w-10" />
        </div>
        <p className="mt-8 text-xs uppercase tracking-[0.3em] text-gold-600 font-bold">
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
