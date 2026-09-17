/**
 * Rule-based chatbot engine — koi API key nahi chahiye.
 * Ye live DB data (courses, fees, FAQs, settings) se jawab banata hai,
 * isliye admin jab course/fees update karta hai to bot bhi update ho jaata hai.
 */
import type { Course, Faq, SiteSettings } from "./types";
import { formatINR } from "./utils";

export type BotLink = { label: string; href: string };
export type BotReply = { text: string; suggestions: string[]; links: BotLink[] };

export type BotContext = {
  courses: Course[];
  faqs: Faq[];
  settings: SiteSettings;
};

const QUICK_SUGGESTIONS = [
  "Courses ki fees kitni hai?",
  "Admission process kya hai?",
  "Batch timing bataiye",
  "Placement milti hai?",
  "Address kya hai?",
];

const norm = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s\u0900-\u097F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const has = (text: string, words: string[]) => words.some((w) => text.includes(w));

/** Course ka naam message me dhoondho (slug words, title words, aur short codes) */
function findCourse(text: string, courses: Course[]): Course | null {
  let best: { course: Course; score: number } | null = null;
  for (const course of courses) {
    const titleWords = norm(course.title).split(" ").filter((w) => w.length > 3);
    const slugWords = course.slug.split("-").filter((w) => w.length > 3);
    let score = 0;
    for (const word of [...new Set([...titleWords, ...slugWords])]) {
      if (text.includes(word)) score += 1;
    }
    for (const alias of aliasesFor(course)) if (text.includes(alias)) score += 2;
    if (score > 0 && (!best || score > best.score)) best = { course, score };
  }
  return best?.course ?? null;
}

function aliasesFor(course: Course): string[] {
  const slug = course.slug;
  const map: Record<string, string[]> = {
    "full-stack-web-development": ["full stack", "mern", "web dev", "web development", "developer", "react"],
    "python-data-science-ai": ["data science", "python", "machine learning", "ml ", "ai course", "data analyst", "data"],
    "digital-marketing-mastery": ["digital marketing", "marketing", "seo", "google ads", "social media", "ads"],
    "ui-ux-graphic-design": ["ui ux", "ui/ux", "design", "figma", "graphic", "photoshop"],
    "tally-gst-accounting": ["tally", "gst", "account", "accounting", "commerce"],
    "cyber-security-ethical-hacking": ["cyber", "hacking", "security", "ethical hacking", "pentest"],
    "dca-computer-applications": ["dca", "computer basics", "ms office", "basic computer", "diploma"],
    "spoken-english-personality": ["english", "spoken", "communication", "personality", "interview english"],
  };
  return map[slug] ?? [];
}

function courseCard(course: Course): string {
  const fee = course.discountFee && course.discountFee < course.fee ? course.discountFee : course.fee;
  const discount =
    course.discountFee && course.discountFee < course.fee
      ? ` (${formatINR(course.fee)} se discount — bachat ${formatINR(course.fee - course.discountFee)})`
      : "";
  return `• ${course.title}\n  ${course.duration} · ${course.mode} · Fees ${formatINR(fee)}${discount}`;
}

export function botGreeting(ctx: BotContext): BotReply {
  return {
    text: `${ctx.settings.chatbotWelcome}\n\nAap in me se kuch bhi poochh sakte hain 👇`,
    suggestions: QUICK_SUGGESTIONS,
    links: [
      { label: "Courses dekhein", href: "/courses" },
      { label: "Apply karein", href: "/apply" },
    ],
  };
}

export function answerMessage(rawMessage: string, ctx: BotContext): BotReply {
  const text = norm(rawMessage);
  const { settings, courses, faqs } = ctx;
  const course = findCourse(text, courses);

  const reply = (text: string, suggestions: string[] = QUICK_SUGGESTIONS, links: BotLink[] = []): BotReply => ({
    text,
    suggestions,
    links,
  });

  /* ---------- greeting / thanks / bye ---------- */
  if (!text) return botGreeting(ctx);
  if (has(text, ["hi", "hello", "hey", "namaste", "namaskar", "hii", "helo"]) && text.length < 14) {
    return botGreeting(ctx);
  }
  if (has(text, ["thank", "shukriya", "dhanyavad", "ok thanks"])) {
    return reply(`Aapka swagat hai! 😊 Kuch aur jaanna ho to bataiye — admission team bhi aapki madad ke liye available hai.`, [
      "Apply form bhej dijiye",
      "Phone number dijiye",
    ], [
      { label: "Apply karein", href: "/apply" },
      { label: "Contact", href: "/contact" },
    ]);
  }
  if (has(text, ["bye", "goodbye", "alvida"])) {
    return reply("Dhanyavaad! Phir milte hain. Admission ke liye humein call kar sakte hain " + settings.phone + " 📞");
  }

  /* ---------- human / contact ---------- */
  if (has(text, ["call", "phone", "number", "contact", "baat karni", "agent", "human", "admission office", "whatsapp"])) {
    return reply(
      `Aap humse ye tarike se baat kar sakte hain:\n\n📞 Phone: ${settings.phone}${
        settings.alternatePhone ? ` / ${settings.alternatePhone}` : ""
      }\n💬 WhatsApp: wa.me/${settings.whatsapp}\n✉️ Email: ${settings.admissionsEmail}\n\nOffice hours: ${settings.officeHours}`,
      ["Address kya hai?", "Fees kitni hai?", "Online batch hai?"],
      [
        { label: "WhatsApp par baat karein", href: `https://wa.me/${settings.whatsapp}` },
        { label: "Contact page", href: "/contact" },
        { label: "Apply form", href: "/apply" },
      ],
    );
  }

  /* ---------- address / location ---------- */
  if (has(text, ["address", "location", "kaha", "kahan", "pata", "reach", "map", "office", "branch", "campus"])) {
    return reply(
      `Humara campus:\n\n📍 ${settings.addressLine1}${settings.addressLine2 ? `, ${settings.addressLine2}` : ""}\n${settings.city}, ${settings.state} – ${settings.pincode}\n\n🕒 ${settings.officeHours}`,
      ["Contact number dijiye", "Campus visit ka time?", "Course fees"],
      [
        { label: "Map par dekhein", href: "/contact#map" },
        { label: "Directions (Google Maps)", href: `https://www.google.com/maps/search/${encodeURIComponent(
          `${settings.siteName} ${settings.addressLine1} ${settings.city}`,
        )}` },
      ],
    );
  }

  /* ---------- fees ---------- */
  if (has(text, ["fee", "fees", "price", "kitna", "kitni", "cost", "charge", "paise", "paisa", "rupay", "rupees"])) {
    if (course) {
      const payable = course.discountFee && course.discountFee < course.fee ? course.discountFee : course.fee;
      const emi = Math.ceil(payable / 6 / 100) * 100;
      return reply(
        `${course.title} ki fees:\n\n💰 Total: ${formatINR(course.fee)}${
          course.discountFee && course.discountFee < course.fee
            ? `\n🎉 Discounted (current offer): ${formatINR(course.discountFee)}`
            : ""
        }\n\n💳 Easy payment options:\n• 20% registration par, baaki course ke dauraan\n• 0% interest EMI — approx ${formatINR(
          emi,
        )}/month (6 instalments)\n• Scholarship se 15% tak kam\n\nDuration: ${course.duration}`,
        ["Scholarship milegi?", "Batch timing?", "Apply kaise karein?"],
        [
          { label: "Apply karein", href: `/apply?course=${course.slug}` },
          { label: "Course details", href: `/courses/${course.slug}` },
        ],
      );
    }
    return reply(
      `Humare courses ki fees course ke hisaab se alag hain 👇\n\n${courses.map(courseCard).join("\n\n")}\n\nKisi ek course ka naam likh dijiye, main uski poori fees aur EMI detail bata dunga.`,
      courses.slice(0, 4).map((c) => `${c.title} ki fees`),
      [{ label: "Saare courses", href: "/courses" }],
    );
  }

  /* ---------- course list ---------- */
  if (has(text, ["course", "courses", "kya sikhate", "kaun kaun", "list", "available", "options", "class kya"])) {
    if (course) return courseDetails(course, ctx);
    return reply(
      `Humare paas ${courses.length} courses hain:\n\n${courses
        .map((c) => `• ${c.title} — ${c.duration} (${c.mode})`)
        .join("\n")}\n\nKis course ke baare me detail chahiye?`,
      courses.slice(0, 4).map((c) => `${c.title} ke baare me bataiye`),
      [{ label: "Saare courses dekhein", href: "/courses" }],
    );
  }

  /* ---------- single course details ---------- */
  if (course && has(text, ["detail", "syllabus", "kya sikha", "duration", "kitne mahine", "timing", "batch", "mode", "online", "offline", "baare", "bare", "info", "information", "certificate", "eligibility", "kaun kar sakta"])) {
    return courseDetails(course, ctx);
  }

  /* ---------- batch timing ---------- */
  if (has(text, ["timing", "time", "batch", "shift", "schedule", "kab se", "chhutti", "working"])) {
    return reply(
      `Roz 3 batch chalti hain:\n\n🌅 Subah: 8:00 – 10:00\n☀️ Dopahar: 12:00 – 2:00\n🌆 Shaam: 5:00 – 7:00\n\nAur weekend (Sat/Sun) special batch bhi chal rahi hai — working professionals ke liye best.\n\n${
        course ? `${course.title} ki nayi batch ${course.startDate ? new Date(course.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "long" }) + " se shuru" : "jaldi shuru ho rahi hai"}.` : "Nayi batches har mahine shuru hoti hain."
      }`,
      ["Fees kitni hai?", "Demo class milti hai?", "Apply kaise karein?"],
      [
        { label: "Apply karein", href: course ? `/apply?course=${course.slug}` : "/apply" },
        { label: "Contact", href: "/contact" },
      ],
    );
  }

  /* ---------- admission / apply ---------- */
  if (has(text, ["admission", "apply", "form", "enroll", "join", "register", "dakhila", "process kaise", "kaise le"])) {
    return reply(
      `Admission sirf 4 step me:\n\n1️⃣ Free counselling — apna goal bataiye, hum sahi course suggest karenge\n2️⃣ Demo class — timing check karke batch chuniye\n3️⃣ Apply form + documents (Aadhaar, photos, last marksheet)\n4️⃣ Fees/EMI aur class start 🎉\n\nOnline form 2 minute me bhar sakte hain — link niche hai.`,
      ["Kya documents chahiye?", "Fees kitni hai?", "Demo class kab milegi?"],
      [
        { label: "Apply form bharein", href: course ? `/apply?course=${course.slug}` : "/apply" },
        { label: "Phone karein", href: `tel:${settings.phone.replace(/\s/g, "")}` },
      ],
    );
  }

  /* ---------- documents ---------- */
  if (has(text, ["document", "documents", "kagaz", "papers", "marksheet", "aadhaar", "photo"])) {
    return reply(
      `Admission ke liye ye documents chahiye:\n\n• Aadhaar card (copy)\n• 2 passport size photos\n• Last qualification ki marksheet\n• Previous course certificate (agar ho)\n\nSab online bhi upload ho jaata hai — campus aana zaroori nahi.`,
      ["Admission process?", "Fees kitni hai?", "Apply kaise karein?"],
      [{ label: "Apply form", href: "/apply" }],
    );
  }

  /* ---------- demo ---------- */
  if (has(text, ["demo", "free class", "trial"])) {
    return reply(
      `Ji haan! Admission se pehle 2 free demo classes milti hain — jisme aap trainer, batch aur teaching style dekh sakte hain. 😊\n\nApply form me "Demo class chahiye" likh dijiye, hum aapko slot confirm kar denge.`,
      ["Batch timing?", "Fees kitni hai?", "Apply kaise karein?"],
      [{ label: "Demo class book karein", href: "/apply" }],
    );
  }

  /* ---------- placement ---------- */
  if (has(text, ["placement", "job", "naukri", "salary", "package", "recruit", "interview", "company"])) {
    return reply(
      `Placement support humara sabse strong part hai 💪\n\n• Resume + LinkedIn profile banwana\n• 5 mock interviews (technical + HR)\n• ${settings.placementRate}% students ko placement\n• 120+ partner companies me referral (Infosys, TCS, Genpact, Reliance Retail aur startups)\n• Interview clear hone tak support — ek baar course ho gaya to bhi guidance milti hai\n\nNote: humara record ${settings.placementRate}% hai, lekin hum legal "guarantee" nahi dete — hum aapko poora interview-ready banate hain.`,
      ["Placement ke liye kya chahiye?", "Top students ke reviews", "Course fees"],
      [
        { label: "Student reviews", href: "/testimonials" },
        { label: "Apply karein", href: "/apply" },
      ],
    );
  }

  /* ---------- scholarship / EMI ---------- */
  if (has(text, ["scholarship", "emi", "installment", "instalment", "chhoot", "concession", "loan"])) {
    return reply(
      `Fees ki tension nahi — ye options hain:\n\n🎓 Scholarship: 12th me 75%+ ya graduation me 70%+ par 15% off.\n👩 Girl student / SC-ST-OBC concession available.\n💳 0% interest EMI: 3, 6 ya 9 instalments (example: ₹40,000 = approx ₹6,700 × 6 mahine).\n📝 Registration ke time sirf 20% dena hota hai.\n\nHar saal 50 seats par scholarship test bhi hota hai.`,
      ["Apply kaise karein?", "Fees kitni hai?", "Support kaise kar sakta hoon?"],
      [{ label: "Apply karein", href: "/apply" }],
    );
  }

  /* ---------- certification ---------- */
  if (has(text, ["certificate", "certification", "degree", "diploma", "valid"])) {
    return reply(
      `Har course ke end me certificate milta hai jisme attendance, projects aur assessment marks likhe hote hain.\n\n${
        course
          ? `📜 ${course.title}: ${course.certification ?? "Course completion certificate"}`
          : "📜 Course completion certificate\n📜 Internship / project experience letter\n📜 Tally, DCA jaise courses me exam form filling support bhi milta hai"
      }\n\nCertificate job application aur higher study dono me kaam aata hai.`,
      ["Course fees", "Placement milti hai?", "Syllabus bataiye"],
      [{ label: "Course details", href: course ? `/courses/${course.slug}` : "/courses" }],
    );
  }

  /* ---------- online / offline ---------- */
  if (has(text, ["online", "offline", "hybrid", "recording", "distant", "bahar", "other city"])) {
    return reply(
      `Dono options available hain:\n\n🏫 Offline: campus par daily class + lab practice + placement drives\n💻 Online: live class + recorded access + WhatsApp doubt support\n🔀 Hybrid: aap dono use kar sakte hain\n\nBaahar ke students ke liye online/hybrid best rehta hai — sirf exam/demo ke liye campus aana hota hai.`,
      ["Fees me farq hai?", "Batch timing?", "Apply kaise karein?"],
      [{ label: "Courses dekhein", href: "/courses" }],
    );
  }

  /* ---------- support / donate ---------- */
  if (has(text, ["donate", "donation", "support", "help karna", "csr", "sponsor", "chanda", "contribute", "nyaay", "seva"])) {
    return reply(
      `Ye bohot achhi baat hai 🙏 Aap in tarike se support kar sakte hain:\n\n💳 Donation: UPI ${settings.supportUpiId}\n🏦 Bank: ${settings.supportBankName}, A/c ${settings.supportAccountNumber} (IFSC ${settings.supportIfsc})\n💻 Old laptop/monitor donate karein\n🎤 Guest lecture dein\n\n1,000 se 1,50,000 tak ke support tiers Support Us page par hain, aur 80G receipt milti hai.`,
      ["Support page kholiye", "Tax exemption?", "Contact team"],
      [{ label: "Support Us page", href: "/support" }],
    );
  }

  /* ---------- about ---------- */
  if (has(text, ["about", "kaun ho", "institute", "history", "kab shuru", "accreditation", "trust", "kaunse saal"])) {
    return reply(
      `${settings.siteName} ${settings.foundedYear} me shuru hua tha, aur ab tak ${Number(
        settings.studentsTrained,
      ).toLocaleString("en-IN")}+ students train kar chuka hai.\n\n• Practical, project-based training\n• Small batches (max 30 students)\n• ${settings.placementRate}% placement record\n• Google rating ${settings.averageRating}/5\n• Affordable fees + scholarship\n\nLegal name: ${settings.legalName}`,
      ["Faculty kaun hain?", "Courses dekhein", "Student reviews"],
      [
        { label: "About Us", href: "/about" },
        { label: "Testimonials", href: "/testimonials" },
      ],
    );
  }

  /* ---------- reviews ---------- */
  if (has(text, ["review", "testimonial", "student bolte", "feedback", "experience", "rishta", "kya kehte"])) {
    return reply(
      `Hamare students ka feedback ${settings.averageRating}/5 rating par hai ⭐\n\n"Placement cell ne resume theek kiya, 5 mock interviews karaye — phir 2 offers aaye." — Aman Sharma, Infosys\n\n"Power BI dashboard project ne hi mera interview clear karaya." — Priyanka Chouhan, Genpact\n\nPoori list videos aur photos ke saath Testimonials page par hai.`,
      ["Placement record?", "Courses dekhein", "Apply karein"],
      [{ label: "Testimonials padhein", href: "/testimonials" }],
    );
  }

  /* ---------- blog ---------- */
  if (has(text, ["blog", "article", "tips", "roadmap", "kaise bane", "guide", "resume"])) {
    return reply(
      `Blog par career guides aur practical tips likhte rehte hain 📚\n\n• Web development career roadmap 2026\n• Fresher resume kaise banaye\n• Data Science vs AI vs ML\n• Cyber security me career kaise shuru karein\n\nKaunsa topic pehle padhna hai?`,
      ["Web development roadmap", "Resume tips", "Data science guide"],
      [{ label: "Blog padhein", href: "/blog" }],
    );
  }

  /* ---------- fees FAQ fallback from DB ---------- */
  for (const faq of faqs) {
    const questionWords = norm(faq.question)
      .split(" ")
      .filter((w) => w.length > 4);
    const matched = questionWords.filter((w) => text.includes(w)).length;
    if (matched >= 2) {
      return reply(faq.answer, QUICK_SUGGESTIONS, [{ label: "Apply form", href: "/apply" }]);
    }
  }

  /* ---------- course mention without keyword ---------- */
  if (course) return courseDetails(course, ctx);

  /* ---------- fallback ---------- */
  return reply(
    `Sorry, ye main exactly samajh nahi paya 🤔 Par main in cheezon me pakka madad kar sakta hoon:\n\n• Courses, fees, syllabus\n• Admission process & documents\n• Batch timing aur demo class\n• Placement & certificates\n• Address aur contact\n\nAap thoda simple likh dijiye, ya admission team ko direct call kar lijiye: ${settings.phone}`,
    QUICK_SUGGESTIONS,
    [
      { label: `Call ${settings.phone}`, href: `tel:${settings.phone.replace(/\s/g, "")}` },
      { label: "WhatsApp", href: `https://wa.me/${settings.whatsapp}` },
    ],
  );
}

function courseDetails(course: Course, ctx: BotContext): BotReply {
  const payable = course.discountFee && course.discountFee < course.fee ? course.discountFee : course.fee;
  const modules = course.syllabus.slice(0, 5).map((m) => `• ${m.title}`).join("\n");
  return {
    text: `📘 ${course.title}\n${course.tagline ? `${course.tagline}\n\n` : "\n"}${
      course.shortDesc
    }\n\n⏳ Duration: ${course.duration}\n🏫 Mode: ${course.mode}\n🎯 Level: ${course.level}\n💰 Fees: ${formatINR(
      payable,
    )}${course.discountFee && course.discountFee < course.fee ? ` (${formatINR(course.fee)} se discount)` : ""}\n👥 Seats: ${
      course.seats
    }\n\nSyllabus (top modules):\n${modules}${course.syllabus.length > 5 ? `\n• +${course.syllabus.length - 5} more modules` : ""}\n\nEligibility: ${
      course.eligibility ?? "12th pass / Graduate"
    }`,
    suggestions: ["Fees ki EMI kaise hogi?", "Batch timing bataiye", "Apply kaise karein?"],
    links: [
      { label: "Poora syllabus dekhein", href: `/courses/${course.slug}` },
      { label: "Apply karein", href: `/apply?course=${course.slug}` },
    ],
  };
}
