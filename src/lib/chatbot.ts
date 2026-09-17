/**
 * Rule-based chatbot engine — no API key required.
 * It reads live data (courses, fees, FAQs, settings) from the database, so whenever
 * an admin updates a course or fee, the assistant's answers update automatically.
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
  "What are the course fees?",
  "How does admission work?",
  "What are the batch timings?",
  "Do you provide placement support?",
  "Where is the campus located?",
];

const norm = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^\w\s\u0900-\u097F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const has = (text: string, words: string[]) => words.some((word) => text.includes(word));

/** Find a course mentioned in the message (title words, slug words and common aliases). */
function findCourse(text: string, courses: Course[]): Course | null {
  let best: { course: Course; score: number } | null = null;
  for (const course of courses) {
    const titleWords = norm(course.title)
      .split(" ")
      .filter((word) => word.length > 3);
    const slugWords = course.slug.split("-").filter((word) => word.length > 3);
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
  const map: Record<string, string[]> = {
    "full-stack-web-development": ["full stack", "mern", "web dev", "web development", "developer", "react"],
    "python-data-science-ai": ["data science", "python", "machine learning", "data analyst", "data course"],
    "digital-marketing-mastery": ["digital marketing", "marketing", "seo", "google ads", "social media", "ads"],
    "ui-ux-graphic-design": ["ui ux", "ui/ux", "design", "figma", "graphic", "photoshop"],
    "tally-gst-accounting": ["tally", "gst", "account", "accounting", "commerce"],
    "cyber-security-ethical-hacking": ["cyber", "hacking", "security", "ethical hacking", "pentest"],
    "dca-computer-applications": ["dca", "computer basics", "ms office", "basic computer", "diploma"],
    "spoken-english-personality": ["english", "spoken", "communication", "personality"],
  };
  return map[course.slug] ?? [];
}

function courseLine(course: Course): string {
  const payable = course.discountFee && course.discountFee < course.fee ? course.discountFee : course.fee;
  const discount =
    course.discountFee && course.discountFee < course.fee
      ? ` (discounted from ${formatINR(course.fee)} — you save ${formatINR(course.fee - course.discountFee)})`
      : "";
  return `• ${course.title}\n  ${course.duration} · ${course.mode} · Fees ${formatINR(payable)}${discount}`;
}

export function botGreeting(ctx: BotContext): BotReply {
  return {
    text: `${ctx.settings.chatbotWelcome}\n\nHere are a few things you can ask me 👇`,
    suggestions: QUICK_SUGGESTIONS,
    links: [
      { label: "Browse courses", href: "/courses" },
      { label: "Apply online", href: "/apply" },
    ],
  };
}

export function answerMessage(rawMessage: string, ctx: BotContext): BotReply {
  const text = norm(rawMessage);
  const { settings, courses, faqs } = ctx;
  const course = findCourse(text, courses);

  const reply = (body: string, suggestions: string[] = QUICK_SUGGESTIONS, links: BotLink[] = []): BotReply => ({
    text: body,
    suggestions,
    links,
  });

  /* ---------- greetings ---------- */
  if (!text) return botGreeting(ctx);
  if (has(text, ["hi", "hello", "hey", "good morning", "good evening"]) && text.length < 20) {
    return botGreeting(ctx);
  }
  if (has(text, ["thank", "thanks", "appreciate"])) {
    return reply(
      "You are most welcome! If you need anything else, do let me know — our admission team is always happy to help.",
      ["How do I apply?", "What is the phone number?"],
      [
        { label: "Apply online", href: "/apply" },
        { label: "Contact us", href: "/contact" },
      ],
    );
  }
  if (has(text, ["bye", "goodbye", "see you"])) {
    return reply(`Thank you for stopping by. You can reach our admission desk any time on ${settings.phone}. 📞`);
  }

  /* ---------- contact details ---------- */
  if (
    has(text, ["call", "phone", "number", "contact", "talk to", "agent", "human", "admission office", "whatsapp", "email"])
  ) {
    return reply(
      `You can reach us in any of these ways:\n\n📞 Phone: ${settings.phone}${
        settings.alternatePhone ? ` / ${settings.alternatePhone}` : ""
      }\n💬 WhatsApp: wa.me/${settings.whatsapp}\n✉️ Email: ${settings.admissionsEmail}\n\nOffice hours: ${settings.officeHours}`,
      ["Where is the campus?", "What are the fees?", "Do you have online batches?"],
      [
        { label: "Chat on WhatsApp", href: `https://wa.me/${settings.whatsapp}` },
        { label: "Contact page", href: "/contact" },
        { label: "Application form", href: "/apply" },
      ],
    );
  }

  /* ---------- campus location ---------- */
  if (has(text, ["address", "location", "where", "campus", "reach", "map", "office", "branch", "visit"])) {
    return reply(
      `Our campus:\n\n📍 ${settings.addressLine1}${settings.addressLine2 ? `, ${settings.addressLine2}` : ""}\n${settings.city}, ${settings.state} – ${settings.pincode}\n\n🕒 ${settings.officeHours}`,
      ["What is the phone number?", "When can I visit?", "What are the fees?"],
      [
        { label: "View on the map", href: "/contact#map" },
        {
          label: "Open in Google Maps",
          href: `https://www.google.com/maps/search/${encodeURIComponent(
            `${settings.siteName} ${settings.addressLine1} ${settings.city}`,
          )}`,
        },
      ],
    );
  }

  /* ---------- fees ---------- */
  if (has(text, ["fee", "fees", "price", "cost", "charge", "how much", "payment", "afford", "budget"])) {
    if (course) {
      const payable = course.discountFee && course.discountFee < course.fee ? course.discountFee : course.fee;
      const emi = Math.ceil(payable / 6 / 100) * 100;
      return reply(
        `Fees for ${course.title}:\n\n💰 Total: ${formatINR(course.fee)}${
          course.discountFee && course.discountFee < course.fee
            ? `\n🎉 Current discounted fee: ${formatINR(course.discountFee)}`
            : ""
        }\n\n💳 Flexible payment options:\n• Pay 20% at registration and the rest during the course\n• 0% interest EMI of about ${formatINR(
          emi,
        )} per month (6 instalments)\n• Scholarships can reduce fees by up to 15%\n\nDuration: ${course.duration}`,
        ["Can I get a scholarship?", "What are the batch timings?", "How do I apply?"],
        [
          { label: "Apply online", href: `/apply?course=${course.slug}` },
          { label: "Course details", href: `/courses/${course.slug}` },
        ],
      );
    }
    return reply(
      `Our course fees vary by programme 👇\n\n${courses.map(courseLine).join("\n\n")}\n\nName any one course and I will share its complete fee structure and EMI details.`,
      courses.slice(0, 4).map((item) => `Fees for ${item.title}`),
      [{ label: "See all courses", href: "/courses" }],
    );
  }

  /* ---------- course list ---------- */
  if (
    has(text, [
      "course",
      "courses",
      "what do you teach",
      "programs",
      "list",
      "available",
      "options",
      "curriculum",
      "training",
    ])
  ) {
    if (course) return courseDetails(course, ctx);
    return reply(
      `We offer ${courses.length} courses:\n\n${courses
        .map((item) => `• ${item.title} — ${item.duration} (${item.mode})`)
        .join("\n")}\n\nWhich one would you like to know more about?`,
      courses.slice(0, 4).map((item) => `Tell me about ${item.title}`),
      [{ label: "Browse all courses", href: "/courses" }],
    );
  }

  /* ---------- single course details ---------- */
  if (
    course &&
    has(text, [
      "detail",
      "details",
      "syllabus",
      "learn",
      "duration",
      "how long",
      "timing",
      "batch",
      "mode",
      "online",
      "offline",
      "about",
      "info",
      "information",
      "certificate",
      "eligibility",
      "who can join",
      "requirements",
    ])
  ) {
    return courseDetails(course, ctx);
  }

  /* ---------- batch timings ---------- */
  if (has(text, ["timing", "timings", "batch", "shift", "schedule", "when does", "start", "weekend", "working"])) {
    return reply(
      `We run three batches every day:\n\n🌅 Morning: 8:00 – 10:00 AM\n☀️ Afternoon: 12:00 – 2:00 PM\n🌆 Evening: 5:00 – 7:00 PM\n\nA dedicated weekend batch (Saturday and Sunday) is also available and is the most popular choice among working professionals.\n\n${
        course
          ? `${course.title} batches start ${
              course.startDate
                ? `on ${new Date(course.startDate).toLocaleDateString("en-IN", { day: "numeric", month: "long" })}`
                : "soon"
            }.`
          : "New batches begin every month."
      }`,
      ["What are the fees?", "Can I attend a demo class?", "How do I apply?"],
      [
        { label: "Apply online", href: course ? `/apply?course=${course.slug}` : "/apply" },
        { label: "Contact us", href: "/contact" },
      ],
    );
  }

  /* ---------- admission process ---------- */
  if (
    has(text, ["admission", "apply", "form", "enroll", "enrol", "join", "register", "registration", "process", "how do i"])
  ) {
    return reply(
      `Admission takes just four steps:\n\n1️⃣ Free counselling — tell us your goal and we recommend the right course\n2️⃣ Demo class — check the timing and choose a batch\n3️⃣ Application form and documents (Aadhaar, photographs, last marksheet)\n4️⃣ Fees or EMI, and your classes begin 🎉\n\nYou can complete the online form in about two minutes using the link below.`,
      ["Which documents are needed?", "What are the fees?", "When can I attend a demo?"],
      [
        { label: "Fill the application form", href: course ? `/apply?course=${course.slug}` : "/apply" },
        { label: "Call us", href: `tel:${settings.phone.replace(/\s/g, "")}` },
      ],
    );
  }

  /* ---------- documents ---------- */
  if (has(text, ["document", "documents", "papers", "marksheet", "aadhaar", "photo", "id proof", "certificate required"])) {
    return reply(
      `You will need these documents for admission:\n\n• Aadhaar card (copy)\n• Two passport-size photographs\n• Last qualification marksheet\n• Previous course certificate, if any\n\nAll of them can be uploaded online, so visiting the campus is optional.`,
      ["How does admission work?", "What are the fees?", "How do I apply?"],
      [{ label: "Application form", href: "/apply" }],
    );
  }

  /* ---------- demo class ---------- */
  if (has(text, ["demo", "free class", "trial", "sample class"])) {
    return reply(
      `Yes! Every prospective student gets two free demo classes before admission, so you can meet the trainer, sit in a live batch and assess the teaching style. 😊\n\nJust mention "demo class" in the application form and we will confirm a slot for you.`,
      ["What are the batch timings?", "What are the fees?", "How do I apply?"],
      [{ label: "Book a demo class", href: "/apply" }],
    );
  }

  /* ---------- placement ---------- */
  if (
    has(text, ["placement", "job", "jobs", "salary", "package", "recruit", "interview", "company", "hiring", "career"])
  ) {
    return reply(
      `Placement support is one of our strongest offerings 💪\n\n• Resume and LinkedIn profile building\n• Five mock interviews covering technical and HR rounds\n• ${settings.placementRate}% placement record\n• Referrals to 120+ partner companies such as Infosys, TCS, Genpact, Reliance Retail and fast-growing startups\n• Continued guidance even after the course is complete\n\nTo be transparent: our record is ${settings.placementRate}%, but we do not use the word guarantee. What we do promise is that you will be thoroughly interview-ready.`,
      ["What do I need for placement?", "What do students say?", "What are the fees?"],
      [
        { label: "Read student reviews", href: "/testimonials" },
        { label: "Apply online", href: "/apply" },
      ],
    );
  }

  /* ---------- scholarship and EMI ---------- */
  if (has(text, ["scholarship", "emi", "instalment", "installment", "discount", "concession", "loan", "financial"])) {
    return reply(
      `There is no need to worry about paying everything at once:\n\n🎓 Scholarship — 15% off for 75%+ in 12th or 70%+ in graduation\n👩 Additional concessions for girl students and SC/ST/OBC candidates\n💳 0% interest EMI — 3, 6 or 9 instalments (for example, ₹40,000 works out to about ₹6,700 a month over six months)\n📝 Only 20% is due at registration\n\nWe also hold a scholarship test for 50 seats every year.`,
      ["How do I apply?", "What are the fees?", "How can I support the institute?"],
      [{ label: "Apply online", href: "/apply" }],
    );
  }

  /* ---------- certification ---------- */
  if (has(text, ["certificate", "certification", "degree", "diploma", "valid", "recognised", "recognized"])) {
    return reply(
      `Every course ends with a certificate that records your attendance, projects and assessment marks.\n\n${
        course
          ? `📜 ${course.title}: ${course.certification ?? "Course completion certificate"}`
          : "📜 Course completion certificate\n📜 Internship / project experience letter\n📜 Exam form filling support for courses such as Tally and DCA"
      }\n\nCertificates are accepted for both job applications and higher studies.`,
      ["What are the fees?", "Do you provide placement?", "Tell me the syllabus"],
      [{ label: "Course details", href: course ? `/courses/${course.slug}` : "/courses" }],
    );
  }

  /* ---------- online vs offline ---------- */
  if (has(text, ["online", "offline", "hybrid", "recording", "distance", "another city", "remote"])) {
    return reply(
      `Both options are available:\n\n🏫 Offline — daily classes on campus, lab practice and placement drives\n💻 Online — live classes, recordings and WhatsApp doubt support\n🔀 Hybrid — a mix of both, which is our most flexible plan\n\nFor students outside the city, the online or hybrid plan works best — you only need to visit the campus for exams or demos.`,
      ["Is there a fee difference?", "What are the batch timings?", "How do I apply?"],
      [{ label: "Browse courses", href: "/courses" }],
    );
  }

  /* ---------- support and donations ---------- */
  if (has(text, ["donate", "donation", "support", "csr", "sponsor", "contribute", "volunteer", "help the institute"])) {
    return reply(
      `That is very generous of you 🙏 Here is how you can support us:\n\n💳 Donation: UPI ${settings.supportUpiId}\n🏦 Bank transfer: ${settings.supportBankName}, A/c ${settings.supportAccountNumber} (IFSC ${settings.supportIfsc})\n💻 Donate a laptop, monitor or printer\n🎤 Deliver a guest lecture\n\nSupport tiers range from ₹1,000 to ₹1,50,000 on the Support Us page, and 80G tax exemption receipts are issued.`,
      ["How is the money used?", "Do you offer tax exemption?", "How do I contact the team?"],
      [{ label: "Visit the Support Us page", href: "/support" }],
    );
  }

  /* ---------- about the institute ---------- */
  if (has(text, ["about", "who are you", "institute", "history", "established", "accreditation", "trust", "when was"])) {
    return reply(
      `${settings.siteName} was founded in ${settings.foundedYear} and has trained more than ${Number(
        settings.studentsTrained,
      ).toLocaleString("en-IN")} students since then.\n\n• Practical, project-based training\n• Small batches of up to 30 students\n• ${settings.placementRate}% placement record\n• Average student rating of ${settings.averageRating}/5\n• Affordable fees with scholarships and EMI\n\nRegistered name: ${settings.legalName}`,
      ["Who are the trainers?", "Show me the courses", "What do students say?"],
      [
        { label: "About us", href: "/about" },
        { label: "Testimonials", href: "/testimonials" },
      ],
    );
  }

  /* ---------- reviews ---------- */
  if (has(text, ["review", "reviews", "testimonial", "testimonials", "feedback", "experience", "students say"])) {
    return reply(
      `Our students rate us ${settings.averageRating}/5 on average ⭐\n\n"The placement cell fixed my resume and ran five mock interviews — two offers followed." — Aman Sharma, Infosys\n\n"The Power BI dashboard project is what cleared my interview." — Priyanka Chouhan, Genpact\n\nThe full list, with photographs and videos, is on our testimonials page.`,
      ["What is the placement record?", "Show me the courses", "How do I apply?"],
      [{ label: "Read testimonials", href: "/testimonials" }],
    );
  }

  /* ---------- blog ---------- */
  if (has(text, ["blog", "article", "articles", "tips", "roadmap", "guide", "resume help"])) {
    return reply(
      `We publish career guides and practical tips on our blog 📚\n\n• How to build a web development career in 2026\n• How to write a fresher resume that gets shortlisted\n• Data Science vs AI vs Machine Learning\n• Building a cyber security career in India\n\nWhich topic would you like to read first?`,
      ["Web development roadmap", "Resume tips", "Data science guide"],
      [{ label: "Read the blog", href: "/blog" }],
    );
  }

  /* ---------- FAQ fallback using the database ---------- */
  for (const faq of faqs) {
    const questionWords = norm(faq.question)
      .split(" ")
      .filter((word) => word.length > 4);
    const matched = questionWords.filter((word) => text.includes(word)).length;
    if (matched >= 2) {
      return reply(faq.answer, QUICK_SUGGESTIONS, [{ label: "Application form", href: "/apply" }]);
    }
  }

  /* ---------- course mentioned without a keyword ---------- */
  if (course) return courseDetails(course, ctx);

  /* ---------- fallback ---------- */
  return reply(
    `Sorry, I did not quite follow that 🤔 Here is what I can definitely help with:\n\n• Courses, fees and syllabus\n• Admission process and documents\n• Batch timings and demo classes\n• Placement and certificates\n• Campus address and contact details\n\nFeel free to rephrase, or call our admission desk directly on ${settings.phone}.`,
    QUICK_SUGGESTIONS,
    [
      { label: `Call ${settings.phone}`, href: `tel:${settings.phone.replace(/\s/g, "")}` },
      { label: "WhatsApp", href: `https://wa.me/${settings.whatsapp}` },
    ],
  );
}

function courseDetails(course: Course, ctx: BotContext): BotReply {
  const payable = course.discountFee && course.discountFee < course.fee ? course.discountFee : course.fee;
  const modules = course.syllabus
    .slice(0, 5)
    .map((module) => `• ${module.title}`)
    .join("\n");

  return {
    text: `📘 ${course.title}\n${course.tagline ? `${course.tagline}\n\n` : "\n"}${course.shortDesc}\n\n⏳ Duration: ${
      course.duration
    }\n🏫 Mode: ${course.mode}\n🎯 Level: ${course.level}\n💰 Fees: ${formatINR(payable)}${
      course.discountFee && course.discountFee < course.fee
        ? ` (discounted from ${formatINR(course.fee)})`
        : ""
    }\n👥 Seats: ${course.seats}\n\nSyllabus highlights:\n${modules}${
      course.syllabus.length > 5 ? `\n• and ${course.syllabus.length - 5} more modules` : ""
    }\n\nEligibility: ${course.eligibility ?? "12th pass or graduate"}`,
    suggestions: ["How does the EMI work?", "What are the batch timings?", "How do I apply?"],
    links: [
      { label: "See the full syllabus", href: `/courses/${course.slug}` },
      { label: "Apply online", href: `/apply?course=${course.slug}` },
    ],
  };
}
