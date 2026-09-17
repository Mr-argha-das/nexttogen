/**
 * Default site settings — everything here is editable from the admin panel (Settings page).
 * Brand colors flow into globals.css variables, so changing them re-themes the whole site.
 */
export const DEFAULT_SETTINGS: Record<string, string> = {
  siteName: "NextGen Institute",
  siteShortName: "NextGen",
  siteTagline: "Skills that build industry-ready careers",
  legalName: "NextGen Institute of Technology & Skill Development",
  phone: "+91 90000 12345",
  alternatePhone: "+91 90000 12346",
  whatsapp: "919000012345",
  email: "info@nextgeninstitute.in",
  admissionsEmail: "admissions@nextgeninstitute.in",
  addressLine1: "3rd Floor, Shreeji Tower, Tonk Road",
  addressLine2: "Near Gandhi Nagar Railway Station",
  city: "Jaipur",
  state: "Rajasthan",
  pincode: "302015",
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=75.78%2C26.86%2C75.83%2C26.91&layer=mapnik",
  officeHours: "Mon – Sat, 8:00 AM – 8:00 PM",
  facebook: "https://facebook.com/",
  instagram: "https://instagram.com/",
  youtube: "https://youtube.com/",
  linkedin: "https://linkedin.com/",
  twitter: "https://x.com/",
  telegram: "https://t.me/",
  // Theme tokens — set these to the exact colors from the visiting card.
  brandPrimary: "#0b2a5b",
  brandAccent: "#f5a623",
  chatbotEnabled: "true",
  chatbotName: "Nova",
  chatbotWelcome:
    "Hello! I am Nova, the admission assistant at NextGen Institute. Ask me anything about our courses, fees, batch timings or the admission process.",
  foundedYear: "2014",
  studentsTrained: "12500",
  placementRate: "92",
  averageRating: "4.8",
  googleAnalyticsId: "",
  supportUpiId: "nextgeninstitute@upi",
  supportBankName: "State Bank of India",
  supportAccountName: "NextGen Institute",
  supportAccountNumber: "3912 4567 8890",
  supportIfsc: "SBIN0031234",
};

/** Site-wide marketing content (edit in code; courses/blogs/FAQs are managed from the admin panel). */
export const SITE_CONTENT = {
  stats: [
    { label: "Students trained", valueKey: "studentsTrained", suffix: "+" },
    { label: "Placement rate", valueKey: "placementRate", suffix: "%" },
    { label: "Years of training", valueSinceKey: "foundedYear", suffix: "+" },
    { label: "Average rating", valueKey: "averageRating", suffix: "/5" },
  ],
  features: [
    {
      title: "Live classes with lifetime recordings",
      description:
        "Daily classroom sessions, and every class is recorded for online students. Missed a class? Watch it any time.",
      icon: "presentation",
    },
    {
      title: "Trainers from the industry",
      description:
        "Our faculty have 8+ years of real experience at companies like Infosys, TCS and fast-growing startups.",
      icon: "users",
    },
    {
      title: "Project-first learning",
      description:
        "Every course includes portfolio projects. You leave with work you can show, not just a certificate.",
      icon: "hammer",
    },
    {
      title: "Placement & interview cell",
      description:
        "Resume building, mock interviews, HR rounds and referrals across 120+ hiring partner companies.",
      icon: "briefcase",
    },
    {
      title: "Small batches, personal attention",
      description:
        "Maximum 30 students per batch, with weekly doubt-clearing sessions and one-to-one mentoring.",
      icon: "target",
    },
    {
      title: "Affordable with EMI options",
      description: "0% interest instalments, merit scholarships and concessions for SC/ST/OBC and girl students.",
      icon: "wallet",
    },
  ],
  placementPartners: [
    "Infosys",
    "TCS",
    "Wipro",
    "HCLTech",
    "Tech Mahindra",
    "Genpact",
    "Paytm",
    "Zomato",
    "Reliance Retail",
    "ICICI Bank",
    "IndiaMART",
    "Startek",
  ],
  faculty: [
    {
      name: "Rahul Sharma",
      role: "Lead Trainer — Web & App Development",
      experience: "12 years",
      bio: "Former senior engineer at a product startup. Has trained 60+ batches in MERN, Next.js and cloud deployment.",
      initials: "RS",
    },
    {
      name: "Dr. Anjali Mehta",
      role: "Head — Data Science & AI",
      experience: "14 years",
      bio: "PhD in Statistics. Consults on banking analytics and machine learning projects across India.",
      initials: "AM",
    },
    {
      name: "Vikram Singh Rathore",
      role: "Faculty — Cyber Security",
      experience: "10 years",
      bio: "CEH certified with a SOC analyst background. Active security researcher on bug bounty platforms.",
      initials: "VR",
    },
    {
      name: "Priya Agarwal",
      role: "Faculty — Digital Marketing & Design",
      experience: "9 years",
      bio: "Handles performance marketing and UI/UX projects for direct-to-consumer brands.",
      initials: "PA",
    },
  ],
  admissionsSteps: [
    { step: "01", title: "Free counselling", text: "We understand your goal and recommend the right course." },
    { step: "02", title: "Course & batch selection", text: "Attend a demo class, then choose your timing and mode." },
    { step: "03", title: "Application & documents", text: "Fill the online form and submit your ID and marksheets." },
    { step: "04", title: "Fees & enrolment", text: "Pay in full or use 0% EMI, and your classes begin." },
  ],
  supportTiers: [
    {
      name: "Supporter",
      amount: 1000,
      period: "one-time",
      description: "Sponsor one student's lab and internet access for a month.",
      perks: ["Digital thank-you certificate", "Your name on the donor wall", "Quarterly impact newsletter"],
      highlight: false,
    },
    {
      name: "Scholarship Patron",
      amount: 25000,
      period: "per student",
      description: "Fund the complete course fee for one underprivileged student.",
      perks: [
        "Progress report for your sponsored student (anonymous)",
        "Invitation to the annual function",
        "80G tax exemption receipt",
        "Patron listing on the website",
      ],
      highlight: true,
    },
    {
      name: "Lab / Batch Sponsor",
      amount: 150000,
      period: "per year",
      description: "Sponsor a full computer lab (10 systems) or an entire batch.",
      perks: [
        "Plaque with your name at the lab",
        "CSR report and social media feature",
        "Annual impact report with photographs",
        "Quarterly campus visit invitation",
      ],
      highlight: false,
    },
  ],
  supportOtherWays: [
    "Donate old laptops, monitors or printers — we refurbish them for rural students.",
    "Deliver a guest lecture and share your industry journey with our students.",
    "Build an internship and hiring pipeline for your company.",
    "Refer five students from your area to our courses.",
  ],
};
