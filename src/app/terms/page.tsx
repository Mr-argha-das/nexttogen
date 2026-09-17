import type { Metadata } from "next";
import { getSettings } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/site/page-hero";
import { Markdown } from "@/lib/markdown";

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return buildMetadata({
    settings,
    title: "Terms & Conditions",
    description: `Rules covering admission, fees, refunds and certificates — the terms and conditions of ${settings.siteName}.`,
    path: "/terms",
  });
}

export default function TermsPage() {
  const settings = getSettings();
  const content = `## 1. Admission
Admission is confirmed once counselling and the application form are complete and the fees have been paid. The institute reserves the right to reject any application without stating a reason — for example where documents are invalid or the batch is full.

## 2. Fees and instalments
- At least 20% of the fees is payable at the time of registration
- The balance is paid during the course according to the agreed schedule (EMI or lump sum)
- If fees are overdue, attendance at the batch may be temporarily suspended
- Only our official receipt is valid proof of payment — always collect a receipt from the office for cash payments

## 3. Refund policy
- Registration and processing charges are non-refundable
- If you cancel up to 7 days before the batch begins, the remaining fees are refunded
- After 7 days no refund is issued, but we do offer a batch change or a course swap
- If the institute ever closes, the remaining fees are refunded

## 4. Classes and attendance
- Batch timings are announced on the website and on the notice board
- A minimum of 75% attendance is required to receive the certificate
- Recordings of missed classes (where available for the course) are provided in the student portal

## 5. Placement support
We provide 100% placement **assistance** — resume building, mock interviews, placement drives and referrals. The final hiring decision always belongs to the company, so no legal "placement guarantee" is offered. Students are expected to attend placement drives.

## 6. Student behaviour
Mobile phones during class, abusive language and any form of ragging are not permitted. Such cases may lead to cancellation of admission without a refund. Complaints of ragging may always be made anonymously.

## 7. Certificate
A certificate is issued after you complete the course, clear all fees and pass the assessment. A nominal fee applies for a duplicate certificate.

## 8. Content and copyright
All website content, study material and class recordings are the property of ${settings.legalName}. Sharing, copying or selling them without permission is not allowed.

## 9. Website use
Information on the website (fees, batches, syllabus) may change. For the final and current details, please confirm with the admission office.

## 10. Contact
If you have any question about these terms, write to ${settings.email}.`;
  return (
    <>
      <PageHero
        eyebrow="Policy"
        title="Terms & Conditions"
        description={`Last updated: ${new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}`}
        crumbs={[{ label: "Terms & Conditions" }]}
      />
      <section className="section pt-10">
        <div className="container-x max-w-3xl">
          <Markdown content={content} />
          <p className="mt-8 rounded-xl bg-amber-50 px-4 py-3 text-[13px] text-amber-900">
            These terms are a draft. Before launch, have them verified by your legal advisor and update them to match
            your institute&apos;s actual policy.
          </p>
        </div>
      </section>
    </>
  );
}
