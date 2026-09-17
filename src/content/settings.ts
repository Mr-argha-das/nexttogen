/**
 * Default site settings — admin panel (Settings page) se sab editable hai.
 * Colors yahin se aate hain: brandPrimary + brandAccent → globals.css variables.
 */
export const DEFAULT_SETTINGS: Record<string, string> = {
  siteName: "NextToGen Institute",
  siteShortName: "NextToGen",
  siteTagline: "Skills jo aapko job-ready banayein",
  legalName: "NextToGen Institute of Technology & Skill Development",
  phone: "+91 90000 12345",
  alternatePhone: "+91 90000 12346",
  whatsapp: "919000012345",
  email: "info@nexttogen.in",
  admissionsEmail: "admissions@nexttogen.in",
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
  // Theme tokens (PDF aane par yahan exact hex daal dena)
  brandPrimary: "#4f46e5",
  brandAccent: "#f59e0b",
  chatbotEnabled: "true",
  chatbotName: "Nexti",
  chatbotWelcome:
    "Namaste! Main Nexti hoon — NextToGen Institute ka admission assistant. Courses, fees, batch timing ya admission process ke baare me kuch bhi poochhiye.",
  foundedYear: "2014",
  studentsTrained: "12500",
  placementRate: "92",
  averageRating: "4.8",
  googleAnalyticsId: "",
  supportUpiId: "nexttogen@upi",
  supportBankName: "State Bank of India",
  supportAccountName: "NextToGen Institute",
  supportAccountNumber: "3912 4567 8890",
  supportIfsc: "SBIN0031234",
};

/** Site-wide marketing content (admin se nahi badalta, code me simple rakha hai). */
export const SITE_CONTENT = {
  stats: [
    { label: "Students trained", valueKey: "studentsTrained", suffix: "+" },
    { label: "Placement rate", valueKey: "placementRate", suffix: "%" },
    { label: "Years of training", valueSinceKey: "foundedYear", suffix: "+" },
    { label: "Google rating", valueKey: "averageRating", suffix: "/5" },
  ],
  features: [
    {
      title: "Live classroom + recorded backup",
      description:
        "Offline batches me daily classes, aur online students ke liye har class ka recording — chhut gayi class? Kabhi bhi dekh lijiye.",
      icon: "presentation",
    },
    {
      title: "Industry mentors",
      description:
        "Trainers jo khud 8+ saal se industry me kaam kar rahe hain — Infosys, TCS, Zomato, freelancing aur startups ka real experience.",
      icon: "users",
    },
    {
      title: "Project-first learning",
      description:
        "Har course me portfolio projects. Sirf certificate nahi — aapke paas dikhane ke liye kaam hota hai.",
      icon: "hammer",
    },
    {
      title: "Placement & interview cell",
      description:
        "Resume building, mock interviews, HR round practice aur 120+ partner companies me referral.",
      icon: "briefcase",
    },
    {
      title: "Small batches",
      description:
        "Maximum 30 students per batch — har student par personal attention, aur weekly doubt-clearing sessions.",
      icon: "target",
    },
    {
      title: "Affordable with EMI",
      description:
        "0% interest instalments, scholarship test aur SC/ST/OBC & girl student concession ke saath.",
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
      bio: "Ex-Senior Engineer (product startup). MERN, Next.js aur cloud par 60+ batches train kar chuke hain.",
      initials: "RS",
    },
    {
      name: "Dr. Anjali Mehta",
      role: "Head — Data Science & AI",
      experience: "14 years",
      bio: "PhD (Statistics). Banking analytics aur machine learning projects par industry consulting karti hain.",
      initials: "AM",
    },
    {
      name: "Vikram Singh Rathore",
      role: "Faculty — Cyber Security",
      experience: "10 years",
      bio: "CEH certified, SOC analyst background. Bug bounty platforms par active security researcher.",
      initials: "VR",
    },
    {
      name: "Priya Agarwal",
      role: "Faculty — Digital Marketing & Design",
      experience: "9 years",
      bio: "D2C brands ke saath performance marketing aur UI/UX projects handle karti hain.",
      initials: "PA",
    },
  ],
  admissionsSteps: [
    { step: "01", title: "Free counselling", text: "Career goal samajhte hain aur sahi course suggest karte hain." },
    { step: "02", title: "Course & batch selection", text: "Demo class attend kijiye, timing aur mode chuniye." },
    { step: "03", title: "Apply form + documents", text: "Online form bharein, ID aur marksheet ki copy jama karein." },
    { step: "04", title: "Fees & enrolment", text: "Full payment ya 0% EMI option, phir class shuru." },
  ],
  supportTiers: [
    {
      name: "Supporter",
      amount: 1000,
      period: "one-time",
      description: "Ek student ki ek mahine ki lab & internet cost sponsor karein.",
      perks: ["Digital thank-you certificate", "Donor wall par naam", "Quarterly impact newsletter"],
      highlight: false,
    },
    {
      name: "Scholarship Patron",
      amount: 25000,
      period: "per student",
      description: "Ek underprivileged student ki poori course fees sponsor karein.",
      perks: [
        "Student ka progress report (name ke bina)",
        "Annual function me invitation",
        "80G tax exemption receipt",
        "Website par patron listing",
      ],
      highlight: true,
    },
    {
      name: "Lab / Batch Sponsor",
      amount: 150000,
      period: "per year",
      description: "Ek computer lab (10 systems) ya poore batch ka sponsorship.",
      perks: [
        "Lab par aapke naam ki plaque",
        "CSR report & social media feature",
        "Annual impact report with photos",
        "Quarterly campus visit invitation",
      ],
      highlight: false,
    },
  ],
  supportOtherWays: [
    "Old laptop, monitor ya printer donate karein — hum refurbish karke rural students ko dete hain.",
    "Guest lecture dein — apni industry journey students ke saath share karein.",
    "Company ke liye internship / hiring pipeline banwaiye.",
    "Apne area me 5 students ko humare course ke liye refer karein.",
  ],
};
