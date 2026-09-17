import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getFaqById } from "@/lib/data";
import { FaqForm } from "@/components/admin/faq-form";

export default async function EditFaqPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const faq = getFaqById(id);
  if (!faq) notFound();

  return (
    <div className="space-y-5">
      <div>
        <Link href="/admin/faqs" className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand-700">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to FAQs
        </Link>
        <h1 className="mt-2 font-heading text-xl font-extrabold sm:text-2xl">Edit FAQ</h1>
      </div>
      <div className="card p-5">
        <FaqForm faq={faq} />
      </div>
    </div>
  );
}
