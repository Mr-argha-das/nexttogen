import type { Metadata } from "next";
import { getSettings } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/site/page-hero";
import { Markdown } from "@/lib/markdown";

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSettings();
  return buildMetadata({
    settings,
    title: "Privacy Policy",
    description: `How your data is collected, used and protected — the privacy policy of ${settings.siteName}.`,
    path: "/privacy-policy",
  });
}

export default function PrivacyPage() {
  const settings = getSettings();
  const content = `## What data we collect
When you submit the Apply form, the Contact form or subscribe to our newsletter, we collect the following:
- Your name, email address and phone number
- Course preference, city and qualification as entered by you
- The message or subject you write

The website also collects some technical data automatically — IP address, browser type and pages visited — for analytics.

## How your data is used
- To respond to your admission enquiry by phone, WhatsApp or email
- For course counselling and batch allocation
- For fee receipts, certificates and student records
- For website improvement and analytics

## Who your data is shared with
We **never sell your data**. It is shared only in these cases:
- With our placement partners, at your request and only if you take part in placement drives
- With payment gateways and banks, to process fees or EMI
- Where legally required, such as under a court or government order

## How long we keep it
Admission enquiry records are kept for three years, and academic records of enrolled students are retained according to institute policy. You can unsubscribe from the newsletter at any time.

## Your rights
- The right to see, correct or delete your data
- The right to opt out of marketing communication
- The right to raise any complaint by writing to us at ${settings.email}

## Cookies
The website uses cookies for sessions, preferences and analytics. You can block cookies in your browser settings, though some features may then not work correctly.

## Security
Your data is stored on secure servers, and admin panel access is password-protected and limited to authorised staff. Online payments are processed through our payment partner's PCI-compliant gateway — we do not store card details.

## Contact
If you have any question about your data or privacy, write to ${settings.email} or call ${settings.phone}.`;
  return (
    <>
      <PageHero
        eyebrow="Policy"
        title="Privacy Policy"
        description={`Last updated: ${new Date().toLocaleDateString("en-IN", { month: "long", year: "numeric" })}`}
        crumbs={[{ label: "Privacy Policy" }]}
      />
      <section className="section pt-10">
        <div className="container-x max-w-3xl">
          <Markdown content={content} />
          <p className="mt-8 rounded-xl bg-amber-50 px-4 py-3 text-[13px] text-amber-900">
            This policy is a template. Before launch, have it verified by your legal advisor and update it with your
            institute&apos;s actual details.
          </p>
        </div>
      </section>
    </>
  );
}
