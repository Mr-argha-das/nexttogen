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
    description: `Admission, fees, refund aur certificate ke niyam — ${settings.siteName} ke terms and conditions.`,
    path: "/terms",
  });
}

export default function TermsPage() {
  const settings = getSettings();
  const content = `## 1. Admission
Admission counselling aur form bharne ke baad, fees jama hone par confirm hota hai. Institute kisi bhi application ko bina reason reject karne ka adhikaar rakhta hai (jaise galat documents ya seat full hona).

## 2. Fees aur installments
- Registration ke time minimum 20% fees dena zaroori hai
- Baaki fees course ke dauraan decided schedule ke hisaab se (EMI/lump sum)
- Fees late hone par batch se temporary rok lag sakti hai
- Fees ke badle humare official receipt hi valid hain — cash ke liye office se receipt zaroor lein

## 3. Refund policy
- Registration/processing charges non-refundable hote hain
- Batch shuru hone se 7 din pehle tak cancellation par baaki fees refund ho jaati hai
- 7 din ke baad refund nahi hota, lekin hum chain change (batch badalna) ya course swap ka option dete hain
- Institute band hone ki sthiti me (agar kabhi ho) remaining fees refund ki jaati hai

## 4. Classes & attendance
- Batch timings website/notice board par announce hoti hain
- Minimum 75% attendance certificate ke liye zaroori hai
- Chhooti hui class ki recording (available courses me) student portal par mil jaati hai

## 5. Placement support
Hum 100% placement **assistance** dete hain — resume building, mock interviews, placement drives aur referrals. Job ka final decision company ka hota hai, isliye koi legal "placement guarantee" nahi di jaati. Students ko placement drives attend karna zaroori hai.

## 6. Student behaviour
Class ke dauraan mobile, galat bhasha, ya kisi bhi tarah ki ragging allowed nahi hai. Is tarah ke case me admission bina refund cancel ho sakta hai. Raging ki complaint hamesha anonymously di ja sakti hai.

## 7. Certificate
Course complete hone par, fees clear hone aur assessment pass hone ke baad certificate milta hai. Certificate duplicate lene par nominal fee lagti hai.

## 8. Content & copyright
Website ka saara content, study material aur class recordings ${settings.legalName} ki property hain. Bina permission share, copy ya bechna allowed nahi hai.

## 9. Website use
Website par di gayi information (fees, batch, syllabus) change ho sakti hai. Final aur current information ke liye admission office se confirm karna better hai.

## 10. Contact
In niyamon se juda koi bhi sawaal ho to likhiye: ${settings.email}.`;
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
            Ye draft terms hain — launch se pehle apne legal advisor se verify karke institute ki actual policy ke hisaab se
            update kar lijiye.
          </p>
        </div>
      </section>
    </>
  );
}
