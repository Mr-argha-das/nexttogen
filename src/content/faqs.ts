export type SeedFaq = { question: string; answer: string; category: string; sortOrder: number };

export const SEED_FAQS: SeedFaq[] = [
  {
    question: "What documents are required for admission?",
    answer:
      "Your Aadhaar card, two passport-size photographs, a copy of your last qualification marksheet and, if available, any previous course certificate. You can upload everything online or bring the documents to the campus.",
    category: "Admission",
    sortOrder: 1,
  },
  {
    question: "Do I have to pay the full fees at once? Is an EMI option available?",
    answer:
      "No. You can pay in 0% interest instalments spread over 3, 6 or 9 months. Only 20% is due at registration and the rest is paid during the course.",
    category: "Fees",
    sortOrder: 2,
  },
  {
    question: "Can I attend a demo class before paying?",
    answer:
      "Absolutely. Every prospective student gets two free demo classes so you can meet the trainer, sit in a live batch and judge the teaching style. Simply mention 'demo class' in the application form.",
    category: "Admission",
    sortOrder: 3,
  },
  {
    question: "Is placement guaranteed after completing the course?",
    answer:
      "We provide full placement assistance — resume building, mock interviews and referrals to 120+ partner companies. We do not use the word guarantee because the final hiring decision rests with the employer, but our placement record is 92% and every student leaves interview-ready.",
    category: "Placement",
    sortOrder: 4,
  },
  {
    question: "What if I miss a class? Do I get the recording?",
    answer:
      "Yes. Every live class is recorded and available in the student portal for twelve months. Students on the online plan get lifetime access.",
    category: "Classes",
    sortOrder: 5,
  },
  {
    question: "What are the batch timings? I have a job.",
    answer:
      "Three batches run every day — 8:00–10:00 AM, 12:00–2:00 PM and 5:00–7:00 PM. Working professionals usually prefer the evening or the weekend (Saturday and Sunday) batch.",
    category: "Classes",
    sortOrder: 6,
  },
  {
    question: "Who is eligible for a scholarship?",
    answer:
      "Students with 75% or above in 12th, or 70% or above in graduation, receive a 15% scholarship. Separate concessions are available for SC/ST/OBC candidates and girl students. We also run a scholarship test for 50 seats every year — ask the admission office for the next date.",
    category: "Fees",
    sortOrder: 7,
  },
  {
    question: "Will I receive a certificate after the course?",
    answer:
      "Yes. Every course ends with a certificate that records your attendance, project list and assessment marks. It is useful for both job applications and higher studies.",
    category: "Certification",
    sortOrder: 8,
  },
  {
    question: "How can I support NextGen Institute?",
    answer:
      "You can donate through the Support Us page using UPI, bank transfer or cheque, donate an old laptop or monitor, or deliver a guest lecture. 80G tax exemption receipts are issued for all donations.",
    category: "Support",
    sortOrder: 9,
  },
  {
    question: "What is the difference between the online and offline courses?",
    answer:
      "The curriculum is identical. Offline batches include daily lab practice, in-person doubt sessions and on-campus placement drives. Online batches offer live classes, recordings and WhatsApp doubt support, with slightly different fees.",
    category: "Classes",
    sortOrder: 10,
  },
  {
    question: "Can I repeat the course after finishing it?",
    answer:
      "Yes. Once you have paid the fees, you may attend the same course again by paying only the lab charges. Many students use this revision batch before interviews.",
    category: "Classes",
    sortOrder: 11,
  },
  {
    question: "When can I visit the campus?",
    answer:
      "Monday to Saturday from 8:00 AM to 8:00 PM, and Sunday from 10:00 AM to 2:00 PM. Walk-ins are welcome, but booking through the contact page ensures a counsellor is free when you arrive.",
    category: "General",
    sortOrder: 12,
  },
];
