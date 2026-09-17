import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { listFaqs } from "@/lib/data";
import { DeleteButton } from "@/components/admin/ui";
import { FaqForm } from "@/components/admin/faq-form";
import { deleteFaqAction } from "@/app/admin/actions";

export default function AdminFaqsPage() {
  const faqs = listFaqs(true);
  const groups = faqs.reduce<Record<string, typeof faqs>>((acc, faq) => {
    acc[faq.category] = acc[faq.category] ?? [];
    acc[faq.category].push(faq);
    return acc;
  }, {});

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-heading text-xl font-extrabold sm:text-2xl">FAQs</h1>
        <p className="mt-1 text-[13.5px] text-slate-600">
          {faqs.length} sawaal · {Object.keys(groups).length} categories. Ye FAQs website par aur chatbot me bhi use hote
          hain — chatbot inke jawab de deta hai.
        </p>
      </div>

      <details className="card overflow-hidden">
        <summary className="flex cursor-pointer items-center gap-2 px-5 py-4 font-heading text-[15px] font-bold">
          <Plus className="h-4 w-4 text-brand-600" /> Nayi FAQ add karein
        </summary>
        <div className="border-t border-slate-100 p-5">
          <FaqForm />
        </div>
      </details>

      <div className="space-y-6">
        {Object.entries(groups).map(([category, items]) => (
          <div key={category} className="card overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 bg-canvas px-5 py-3">
              <h2 className="font-heading text-[14px] font-bold">{category}</h2>
              <span className="text-[12px] text-slate-500">{items.length} questions</span>
            </div>
            <ul className="divide-y divide-slate-100">
              {items.map((faq) => (
                <li key={faq.id} className="px-5 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="max-w-3xl">
                      <p className="text-[13.5px] font-semibold text-ink">{faq.question}</p>
                      <p className="mt-1 text-[12.5px] leading-6 text-slate-600">{faq.answer}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                          faq.published ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {faq.published ? "Live" : "Hidden"}
                      </span>
                      <Link href={`/admin/faqs/${faq.id}`} className="btn btn-outline btn-sm">
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </Link>
                      <DeleteButton action={deleteFaqAction} id={faq.id} label="" confirmText="Ye FAQ delete karni hai?" />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
        {!faqs.length ? (
          <p className="card p-6 text-center text-[13.5px] text-slate-500">Abhi koi FAQ nahi hai — upar se add karein.</p>
        ) : null}
      </div>
    </div>
  );
}
