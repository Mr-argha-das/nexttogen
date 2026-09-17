import Link from "next/link";
import { ArrowRight, Compass, Home, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="mesh pointer-events-none absolute inset-0 opacity-50" />
      <div className="container-x relative flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
          <Compass className="h-8 w-8" />
        </span>
        <p className="mt-6 font-heading text-[3rem] font-extrabold leading-none text-brand-700">404</p>
        <h1 className="mt-2 font-heading text-2xl font-bold">Ye page nahi mila</h1>
        <p className="mt-3 max-w-md text-[14.5px] leading-7 text-slate-600">
          Ho sakta hai link purana ho ya page ka naam badal gaya ho. Niche se aage badh jaiye — ya humein call kar lijiye,
          hum raasta bata denge.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">
            <Home className="h-4 w-4" /> Home par jaiye
          </Link>
          <Link href="/courses" className="btn btn-outline">
            Courses dekhein <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/contact" className="btn btn-ghost">
            <Phone className="h-4 w-4" /> Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
