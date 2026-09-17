export type SeedFaq = { question: string; answer: string; category: string; sortOrder: number };

export const SEED_FAQS: SeedFaq[] = [
  {
    question: "Admission ke liye kya documents chahiye?",
    answer:
      "Aadhaar card, 2 passport size photos, last qualification ki marksheet ki copy, aur (agar ho) previous course ka certificate. Sab documents online upload kar sakte hain ya campus par le aaiye.",
    category: "Admission",
    sortOrder: 1,
  },
  {
    question: "Fees ek saath dena zaroori hai? Kya EMI ka option hai?",
    answer:
      "Nahi. Aap 0% interest EMI me monthly fees de sakte hain (3, 6 ya 9 instalments). Registration ke time sirf 20% amount lagta hai, baaki course ke dauraan.",
    category: "Fees",
    sortOrder: 2,
  },
  {
    question: "Kya demo class milti hai?",
    answer:
      "Bilkul. Admission se pehle 2 free demo classes hoti hain — jisme aap trainer, batch aur teaching style dekh sakte hain. Demo ke liye website ke Apply form me 'Demo class' likh dijiye.",
    category: "Admission",
    sortOrder: 3,
  },
  {
    question: "Course complete hone par placement guaranteed hai?",
    answer:
      "Hum 100% placement assistance dete hain — resume banwana, mock interviews, aur 120+ partner companies me referral. Guarantee legal terms ke hisaab se nahi di jaati, lekin hamara placement record 92% hai aur aap interview-ready banti/banta hai.",
    category: "Placement",
    sortOrder: 4,
  },
  {
    question: "Kya class chhoot jaaye to recording milti hai?",
    answer:
      "Haan. Har live class ki recording student portal me 12 mahine tak available rehti hai. Online students ko lifetime access milta hai.",
    category: "Classes",
    sortOrder: 5,
  },
  {
    question: "Batch timings kya hain? Main job karta/karti hoon.",
    answer:
      "Roz 3 batch chalti hain — subah 8:00–10:00, dopahar 12:00–2:00 aur shaam 5:00–7:00. Working professionals ke liye shaam aur weekend (Saturday/Sunday) batch best rehti hai.",
    category: "Classes",
    sortOrder: 6,
  },
  {
    question: "Kaun kaun scholarship le sakta hai?",
    answer:
      "12th me 75%+ marks ya graduation me 70%+ marks par 15% scholarship. SC/ST/OBC aur girl students ke liye alag concession. Har saal 50 seats par scholarship test bhi hota hai — next date admission office se poochh lijiye.",
    category: "Fees",
    sortOrder: 7,
  },
  {
    question: "Course ke baad certificate milta hai?",
    answer:
      "Haan. Har course ka certificate milta hai jisme aapki attendance, project list aur assessment marks likhe hote hain. Ye certificate job applications aur higher study dono me kaam aata hai.",
    category: "Certification",
    sortOrder: 8,
  },
  {
    question: "NextToGen ko support kaise kar sakte hain?",
    answer:
      "Aap Support Us page se donation de sakte hain (UPI, bank transfer ya cheque), purana laptop/monitor donate kar sakte hain, ya guest lecture de sakte hain. 80G tax exemption receipt di jaati hai.",
    category: "Support",
    sortOrder: 9,
  },
  {
    question: "Online aur offline course me farq kya hai?",
    answer:
      "Content same hai. Offline batch me daily lab practice, doubt session aur campus placement drives milte hain. Online me live class + recording aur WhatsApp doubt support. Fees me thoda farq hota hai.",
    category: "Classes",
    sortOrder: 10,
  },
  {
    question: "Course ke baad dobara padhne ka mauka milta hai?",
    answer:
      "Haan — ek baar fees dene ke baad aap same course dobara attend kar sakte hain (repeat batch), sirf lab charges ke saath. Bahut students interview se pehle revision ke liye iska use karte hain.",
    category: "Classes",
    sortOrder: 11,
  },
  {
    question: "Campus visit ka time kya hai?",
    answer:
      "Mon–Sat 8:00 AM se 8:00 PM, Sunday 10:00 AM–2:00 PM. Bina appointment bhi aa sakte hain, par form bharke aayein to counsellor free milta hai — website ke Contact page se slot book kar lijiye.",
    category: "General",
    sortOrder: 12,
  },
];
