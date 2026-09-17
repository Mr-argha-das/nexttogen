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
    description: `Aapka data kaise collect, use aur protect kiya jaata hai — ${settings.siteName} ki privacy policy.`,
    path: "/privacy-policy",
  });
}

export default function PrivacyPage() {
  const settings = getSettings();
  const content = `## Kaunsa data collect karte hain
Jab aap Apply form, Contact form ya Newsletter subscribe karte hain, hum ye information collect karte hain:
- Naam, email address aur phone number
- Course preference, city aur qualification (jaise aap bharte hain)
- Message/subject jo aap likhte hain

Website automatically kuch technical data bhi collect karti hai — IP address, browser type aur pages visited (analytics ke liye).

## Data ka use kaha hota hai
- Aapki admission enquiry ka reply dene ke liye (call/WhatsApp/email)
- Course counselling aur batch allotment ke liye
- Fee receipts, certificates aur student records ke liye
- Website improvement aur analytics ke liye

## Data kis ke saath share hota hai
Hum aapka data **bechte nahi** hain. Sirf ye cases me share hota hai:
- Aapki request par humari placement partners (agar aap placement drives me participate karein)
- Payment gateway aur bank (fees/EMI ke liye)
- Kanooni requirement par (court ya government authority ke order par)

## Data kitne din rakhte hain
Admission enquiry records 3 saal tak, aur enrolled students ke academic records institute policy ke hisaab se keep kiye jaate hain. Newsletter me se aap kabhi bhi unsubscribe kar sakte hain.

## Aapke rights
- Apna data dekhne ka, correct karwane ka aur delete karwane ka right
- Marketing communication se opt-out karne ka right
- Kisi bhi complaint ke liye humein ${settings.email} par likh sakte hain

## Cookies
Website sessions, preferences aur analytics ke liye cookies use karti hai. Aap browser settings se cookies block kar sakte hain — kuch features tab theek se kaam nahi kar sakte.

## Security
Aapka data secure servers par store hota hai, aur admin panel access sirf authorised staff ke paas password-protected hota hai. Online payments humare payment partner ke PCI-compliant gateway se hote hain — card details hum store nahi karte.

## Contact
Data ya privacy se juda koi bhi sawaal ho to likhiye: ${settings.email} ya call kijiye ${settings.phone}.`;
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
            Ye policy template hai — launch se pehle apne legal advisor se verify karke apni institute details ke hisaab se
            update kar lijiye.
          </p>
        </div>
      </section>
    </>
  );
}
