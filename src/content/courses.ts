export type SeedCourse = {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  level: string;
  mode: string;
  duration: string;
  fee: number;
  discountFee?: number;
  seats: number;
  startDateDays: number;
  coverImage: string;
  shortDesc: string;
  description: string;
  syllabus: { title: string; topics: string[] }[];
  highlights: string[];
  tools: string[];
  eligibility: string;
  certification: string;
  featured: boolean;
  sortOrder: number;
};

export const SEED_COURSES: SeedCourse[] = [
  {
    slug: "full-stack-web-development",
    title: "Full Stack Web Development (MERN)",
    tagline: "Zero se job-ready developer tak — 6 mahine, 12 live projects",
    category: "Web Development",
    level: "Beginner",
    mode: "Hybrid",
    duration: "6 Months",
    fee: 45000,
    discountFee: 39999,
    seats: 30,
    startDateDays: 14,
    coverImage: "/images/course-web-development.jpg",
    shortDesc:
      "HTML se React, Node.js aur MongoDB tak — poora MERN stack, 12 real projects aur GitHub portfolio ke saath.",
    description: `## Course kya sikhaata hai?
Is course me aap frontend se backend tak poora web development stack seekhte hain. Basic HTML/CSS se shuru karke React, Node.js, Express, MongoDB aur deployment tak — taaki aap ek complete product khud bana sakein.

## Ye course kis ke liye hai?
- Students jo 12th / B.Tech / BSc ke baad IT me career banana chahte hain
- Working professionals jo career switch karna chahte hain
- Freelancers jo client projects professionally deliver karna chahte hain

## Kaam kaise hota hai?
Har week 2 live classes + 1 doubt session. Har module ke baad ek graded project. Course ke end tak aapke GitHub par 12 projects honge.

## Placement support
Course complete hone par resume banate hain, mock interviews karate hain aur partner companies me referral dete hain.`,
    syllabus: [
      { title: "Module 1 — Web Foundations", topics: ["HTML5 semantics & accessibility", "CSS3, Flexbox & Grid", "Responsive design", "Git & GitHub basics"] },
      { title: "Module 2 — JavaScript Deep Dive", topics: ["ES6+ syntax, arrays & objects", "DOM manipulation & events", "Fetch API & async/await", "Error handling"] },
      { title: "Module 3 — React & Modern Frontend", topics: ["Components, props & state", "Hooks (useState, useEffect, custom)", "React Router & forms", "Tailwind CSS component design"] },
      { title: "Module 4 — Node.js & REST APIs", topics: ["Node runtime & npm", "Express routing & middleware", "Authentication with JWT", "Validation & file uploads"] },
      { title: "Module 5 — Databases", topics: ["MongoDB & Mongoose", "SQL basics (MySQL)", "Schema design", "Aggregation & indexing"] },
      { title: "Module 6 — Deployment & DevOps Basics", topics: ["Environment variables & secrets", "Vercel / Railway deployment", "Logging & monitoring", "Performance basics"] },
      { title: "Module 7 — Capstone & Interview Prep", topics: ["Full-stack capstone project", "150 DSA warm-up problems", "Resume + LinkedIn optimisation", "Mock interviews (5 rounds)"] },
    ],
    highlights: [
      "12 industry-level projects (portfolio ready)",
      "Live classes + lifetime recorded access",
      "1:1 mentor doubt sessions every week",
      "Internship certificate on capstone project",
      "Resume, LinkedIn & GitHub profile review",
      "Placement assistance with mock interviews",
    ],
    tools: ["VS Code", "Git & GitHub", "React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Postman", "Vercel"],
    eligibility: "12th pass / Graduate. Basic computer knowledge kaafi hai — coding background zaroori nahi.",
    certification: "NextToGen Full Stack Developer Diploma + project experience letter.",
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "python-data-science-ai",
    title: "Python, Data Science & AI",
    tagline: "Python + Pandas + Machine Learning + GenAI — 10 live datasets par kaam",
    category: "Data & AI",
    level: "Beginner",
    mode: "Hybrid",
    duration: "5 Months",
    fee: 42000,
    discountFee: 36999,
    seats: 25,
    startDateDays: 21,
    coverImage: "/images/course-data-science.jpg",
    shortDesc:
      "Python programming, data analysis, visualization, machine learning aur GenAI tools — complete data career track.",
    description: `## Kyun Data Science?
Banking, healthcare, e-commerce — har industry data par chalti hai. Data analysts aur ML engineers ki demand bohot tezi se badh rahi hai, aur freshers ka entry-level package ₹4–8 LPA se shuru hota hai.

## Is course me kya milega
Python ki strong foundation, Pandas/NumPy se data cleaning, Matplotlib & Power BI dashboards, statistics, machine learning (regression, classification, clustering) aur GenAI/LLM basics — sab hands-on datasets par.

## Final outcome
Course ke end me aap ek complete data project (dashboard + ML model + report) banayenge, jo interview me sabse zyada value rakhta hai.`,
    syllabus: [
      { title: "Module 1 — Python Programming", topics: ["Syntax, loops, functions", "OOP & modules", "File & error handling", "Virtual environments"] },
      { title: "Module 2 — Data Analysis", topics: ["NumPy arrays", "Pandas dataframes", "Cleaning & merging data", "Group-by & pivots"] },
      { title: "Module 3 — Visualization & BI", topics: ["Matplotlib & Seaborn", "Plotly dashboards", "Power BI reports", "Storytelling with data"] },
      { title: "Module 4 — Statistics", topics: ["Descriptive statistics", "Probability & distributions", "Hypothesis testing", "A/B testing"] },
      { title: "Module 5 — Machine Learning", topics: ["Supervised vs unsupervised", "Regression & classification", "Model evaluation metrics", "scikit-learn pipelines"] },
      { title: "Module 6 — AI & GenAI", topics: ["Neural network basics", "Intro to TensorFlow", "Prompt engineering", "LLM APIs & chatbots"] },
      { title: "Module 7 — Capstone & Interview Prep", topics: ["End-to-end ML project", "SQL for analytics", "Case study interviews", "Resume & portfolio"] },
    ],
    highlights: [
      "10 real datasets par hands-on practice",
      "Power BI + Python dashboard portfolio",
      "Kaggle competition participation",
      "Statistics se ML tak complete path",
      "GenAI & chatbot project",
      "Placement assistance with analytics referrals",
    ],
    tools: ["Python", "Jupyter", "Pandas", "NumPy", "scikit-learn", "Power BI", "MySQL", "Streamlit", "GitHub"],
    eligibility: "Graduate (any stream) ya 12th with Maths. Programming experience zaroori nahi.",
    certification: "NextToGen Data Science & AI Professional Certificate + capstone project report.",
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "digital-marketing-mastery",
    title: "Digital Marketing & Social Media Mastery",
    tagline: "Meta & Google Ads, SEO, content aur analytics — real client campaign ke saath",
    category: "Digital Marketing",
    level: "All Levels",
    mode: "Online",
    duration: "4 Months",
    fee: 28000,
    discountFee: 23999,
    seats: 40,
    startDateDays: 7,
    coverImage: "/images/course-digital-marketing.jpg",
    shortDesc:
      "SEO, Google & Meta ads, content marketing, email automation aur analytics — live ad budget practice ke saath.",
    description: `## Sirf theory nahi — real campaigns
Is course me students live ad campaigns chalate hain. Har batch ko practice ad budget milta hai jisse aap real CPC, CTR aur conversions samajhte hain.

## Kaun kar sakta hai?
Shop owners, freelancers, job seekers, students — koi coding ya technical background zaroori nahi. 10th pass bhi ye course aaram se kar sakta hai.

## Career options
Digital marketing executive, SEO analyst, performance marketer, social media manager ya freelancer — starting package ₹3–6 LPA, aur freelancing me client per ₹15,000+ tak.`,
    syllabus: [
      { title: "Module 1 — Marketing Foundations", topics: ["Customer personas", "Funnel & funnel metrics", "Positioning & offers", "Marketing plan basics"] },
      { title: "Module 2 — SEO", topics: ["Keyword research", "On-page & technical SEO", "Backlinks & off-page", "Local SEO for shops"] },
      { title: "Module 3 — Google Ads", topics: ["Search campaigns", "Shopping & Performance Max", "Bidding strategies", "Conversion tracking"] },
      { title: "Module 4 — Meta & Social Ads", topics: ["Facebook & Instagram ads", "Creative testing", "Retargeting funnels", "Reels planning"] },
      { title: "Module 5 — Content & Email", topics: ["Content calendar", "Copywriting frameworks", "Email automation flows", "WhatsApp marketing"] },
      { title: "Module 6 — Analytics & Freelancing", topics: ["GA4 & Looker Studio", "Reporting dashboards", "Client proposals & pricing", "Freelance profile setup"] },
    ],
    highlights: [
      "Live ad campaign practice budget",
      "Google & Meta certification guidance",
      "30-day content calendar template",
      "Freelancing & client handling training",
      "E-commerce (Shopify) marketing module",
      "Lifetime access to recorded classes",
    ],
    tools: ["Google Ads", "Meta Ads Manager", "GA4", "Search Console", "Canva", "Mailchimp", "Looker Studio"],
    eligibility: "10th pass ya usse upar. Koi technical background zaroori nahi.",
    certification: "NextToGen Advanced Digital Marketing Certificate + Google/Meta certification support.",
    featured: true,
    sortOrder: 3,
  },
  {
    slug: "ui-ux-graphic-design",
    title: "UI/UX & Graphic Design",
    tagline: "Figma, Photoshop, Illustrator — portfolio ready designer ban jaiye",
    category: "Design",
    level: "Beginner",
    mode: "Offline",
    duration: "4 Months",
    fee: 32000,
    discountFee: 27000,
    seats: 20,
    startDateDays: 10,
    coverImage: "/images/course-ui-ux.jpg",
    shortDesc:
      "Design thinking, Figma prototyping, branding, print aur social media creatives — 15 portfolio projects ke saath.",
    description: `## Design ek skill hai, talent nahi
Design ke principles — colour, typography, layout, spacing — step by step sikhaye jaate hain. Uske baad Figma me app & website designs, wireframes aur clickable prototypes banate hain.

## Portfolio hi aapka resume hai
Course ke end tak aapke paas 15 projects honge — mobile app redesign, e-commerce website, brand identity, poster series aur ek complete case study.

## Kaha kaam milta hai?
Design agencies, IT companies, D2C brands, print houses — ya freelancing me per-project ₹5,000–₹50,000 tak.`,
    syllabus: [
      { title: "Module 1 — Design Fundamentals", topics: ["Colour theory", "Typography & grid", "Layout & spacing", "Visual hierarchy"] },
      { title: "Module 2 — Graphic Design", topics: ["Photoshop retouching", "Illustrator vector art", "Poster & print design", "Brand identity kits"] },
      { title: "Module 3 — UI Design in Figma", topics: ["Auto layout & components", "Design systems", "Mobile & web layouts", "Responsive screens"] },
      { title: "Module 4 — UX & Research", topics: ["User research basics", "Wireframing & user flows", "Usability testing", "Accessibility basics"] },
      { title: "Module 5 — Prototyping & Handoff", topics: ["Interactive prototypes", "Micro-interactions", "Developer handoff", "Design critique sessions"] },
      { title: "Module 6 — Portfolio & Freelance", topics: ["Case study writing", "Behance/Dribbble profile", "Client pricing", "Mock design interviews"] },
    ],
    highlights: [
      "15 portfolio projects + Behance profile setup",
      "Adobe + Figma me live practice",
      "Real client brief se project kaam",
      "Design system banane ki training",
      "Weekly design critique session",
      "Freelance pricing & client communication",
    ],
    tools: ["Figma", "Adobe Photoshop", "Illustrator", "Canva Pro", "Miro", "Notion"],
    eligibility: "10th/12th pass. Creative interest hona chahiye, drawing skill zaroori nahi.",
    certification: "NextToGen UI/UX Designer Certificate + portfolio review report.",
    featured: false,
    sortOrder: 4,
  },
  {
    slug: "tally-gst-accounting",
    title: "Tally Prime with GST & Accounting",
    tagline: "Accounts job ke liye India ka sabse practical course — 100% hands-on",
    category: "Accounting",
    level: "Beginner",
    mode: "Offline",
    duration: "3 Months",
    fee: 15000,
    discountFee: 11999,
    seats: 35,
    startDateDays: 5,
    coverImage: "/images/course-accounting.jpg",
    shortDesc:
      "Tally Prime, GST returns, TDS, payroll aur Excel — accounts executive job ke liye complete preparation.",
    description: `## Har shop aur company ko accountant chahiye
Tally + GST jaanne wale candidates ki demand har sheher me hai. Ye course 100% practical hai — real company ke vouchers par kaam karate hain.

## Course ke baad aap kya kar payenge
Sales/purchase entry, GST invoices, GSTR-1 & GSTR-3B filing, TDS, payroll, bank reconciliation aur final accounts — sab confidently.

## Job scope
Accounts Executive, Tally Operator, GST Practitioner, Billing Executive — starting ₹2.4–4 LPA, aur 1–2 saal experience ke baad ₹6 LPA tak.`,
    syllabus: [
      { title: "Module 1 — Accounting Basics", topics: ["Golden rules of accounting", "Journal & ledger", "Trial balance", "Final accounts"] },
      { title: "Module 2 — Tally Prime", topics: ["Company creation", "Masters & voucher entries", "Inventory management", "Cost centres & budgets"] },
      { title: "Module 3 — GST Practical", topics: ["GST registration", "GSTR-1 & 3B filing", "Input tax credit", "E-way bill basics"] },
      { title: "Module 4 — TDS & Payroll", topics: ["TDS sections & entries", "Salary processing", "PF/ESI basics", "TDS returns"] },
      { title: "Module 5 — Excel for Accounts", topics: ["VLOOKUP & pivot tables", "Bank reconciliation", "MIS reports", "Data validation"] },
    ],
    highlights: [
      "Real company vouchers par practice",
      "GST return filing simulator",
      "Excel + Tally combined training",
      "Interview question bank",
      "Small business setup guidance",
      "Certificate with experience references",
    ],
    tools: ["Tally Prime", "MS Excel", "GST Portal (simulator)", "Busy (basics)"],
    eligibility: "12th pass (Commerce preferred, baaki streams bhi chalega).",
    certification: "NextToGen Advanced Accounting with Tally & GST Certificate.",
    featured: false,
    sortOrder: 5,
  },
  {
    slug: "cyber-security-ethical-hacking",
    title: "Cyber Security & Ethical Hacking",
    tagline: "Practical labs, network security aur bug bounty basics",
    category: "Cyber Security",
    level: "Intermediate",
    mode: "Hybrid",
    duration: "5 Months",
    fee: 48000,
    discountFee: 42999,
    seats: 20,
    startDateDays: 30,
    coverImage: "/images/course-cyber-security.jpg",
    shortDesc:
      "Network & web security, penetration testing labs, Linux, Kali tools aur bug bounty practice — hands-on hacking labs ke saath.",
    description: `## Offensive + defensive security
Aap attacker ki tarah sochna seekhenge — isse defense strong banti hai. Practice isolated lab environment me hoti hai, jahan aap real tools chalate hain.

## Lab based learning
60+ guided labs: network scanning, vulnerability assessment, web app testing (OWASP Top 10), password attacks, privilege escalation, wifi security aur reporting.

## Career
SOC analyst, penetration tester, security engineer — starting ₹4–8 LPA. Bank, fintech, IT services aur government projects me constant demand.`,
    syllabus: [
      { title: "Module 1 — Networking & Linux", topics: ["TCP/IP, OSI model", "Linux command line", "DNS, DHCP, routing", "Virtual lab setup"] },
      { title: "Module 2 — Security Fundamentals", topics: ["CIA triad", "Cryptography basics", "Authentication & IAM", "Security policies"] },
      { title: "Module 3 — Recon & Scanning", topics: ["Footprinting", "Nmap & enumeration", "Vulnerability scanners", "OSINT techniques"] },
      { title: "Module 4 — Web Application Security", topics: ["OWASP Top 10", "Burp Suite practical", "SQL injection & XSS labs", "Secure coding fixes"] },
      { title: "Module 5 — System & Network Attacks", topics: ["Password cracking", "Metasploit basics", "Privilege escalation", "Wifi security"] },
      { title: "Module 6 — Blue Team & Reporting", topics: ["SIEM & log analysis", "Incident response", "Firewall & IDS rules", "Report writing"] },
      { title: "Module 7 — Bug Bounty & Certification", topics: ["Bug bounty platforms", "CVE research basics", "CEH / CompTIA prep", "Mock certification test"] },
    ],
    highlights: [
      "60+ isolated hacking labs",
      "Kali Linux + Burp Suite practical",
      "Live CTF competitions",
      "Bug bounty platform profile setup",
      "CEH / CompTIA certification guidance",
      "Reporting & communication skills",
    ],
    tools: ["Kali Linux", "Nmap", "Burp Suite", "Metasploit", "Wireshark", "Splunk (basics)", "VirtualBox"],
    eligibility: "Graduate ya final-year student (IT background preferred).",
    certification: "NextToGen Cyber Security Diploma + CEH exam preparation support.",
    featured: false,
    sortOrder: 6,
  },
  {
    slug: "dca-computer-applications",
    title: "DCA — Diploma in Computer Applications",
    tagline: "Computer basics se MS Office, internet aur typing tak — job ke liye zaroori skill",
    category: "Computer Basics",
    level: "Beginner",
    mode: "Offline",
    duration: "12 Months",
    fee: 18000,
    discountFee: 14499,
    seats: 50,
    startDateDays: 3,
    coverImage: "/images/course-computer-basics.jpg",
    shortDesc:
      "Windows, MS Word/Excel/PowerPoint, internet, typing, Tally basics aur DTP — beginners ke liye complete diploma.",
    description: `## Zero se computer expert
Jo log pehli baar computer chalate hain — housewives, school students, shop staff, government exam candidates — unke liye best course.

## Kya sikhate hain
Typing speed, MS Office (Word, Excel, PowerPoint), internet & email, Google Drive, online form filling, digital payment, printing & scanning, aur Tally basics.

## Government job & exam ke liye perfect
RS-CIT, DCA, CCC jaisi qualification ki demand hoti hai. Ye course usi tarah structured hai, plus extra practical training.`,
    syllabus: [
      { title: "Semester 1 — Basics", topics: ["Computer & Windows basics", "Files & folder management", "Typing (Hindi + English)", "Internet, email & online safety"] },
      { title: "Semester 2 — MS Office", topics: ["MS Word documents", "MS Excel sheets & formulas", "PowerPoint presentations", "Google Docs & Sheets"] },
      { title: "Semester 3 — Practical Skills", topics: ["Online form filling", "Digital payment & UPI", "Printing, scanning & DTP", "Photo editing basics"] },
      { title: "Semester 4 — Job Skills", topics: ["Tally basics", "Resume & interview prep", "Data entry practice", "Typing speed test"] },
    ],
    highlights: [
      "Bilingual teaching (Hindi + English)",
      "Daily 1 hour lab practice included",
      "Government exam form filling training",
      "Typing certificate with speed record",
      "Flexible batches (morning/evening)",
      "Course completion certificate",
    ],
    tools: ["Windows 11", "MS Office", "Google Workspace", "Typing Tutor", "Canva", "Tally (basics)"],
    eligibility: "10th pass. Koi prior computer knowledge zaroori nahi — bilkul zero se shuru.",
    certification: "NextToGen DCA Diploma (government exam forms ke liye valid).",
    featured: false,
    sortOrder: 7,
  },
  {
    slug: "spoken-english-personality",
    title: "Spoken English & Personality Development",
    tagline: "Fluency, confidence aur interview speaking — 90 din ka practical program",
    category: "Soft Skills",
    level: "All Levels",
    mode: "Hybrid",
    duration: "3 Months",
    fee: 12000,
    discountFee: 8999,
    seats: 30,
    startDateDays: 4,
    coverImage: "/images/course-spoken-english.jpg",
    shortDesc:
      "Grammar basics, daily conversation practice, group discussions, interview speaking aur presentation skills.",
    description: `## English sirf subject nahi — confidence hai
Interview me reject hone ki sabse badi wajah English speaking hoti hai. Ye course grammar ratwata nahi — bolna sikhata hai.

## Class kaise hoti hai
Roz 20 minute grammar, 30 minute pair/group conversation, aur weekly recording-based feedback. Har student ko 15 minute ka speaking slot milta hai.

## Kya milega
Interview me apna introduction, group discussion me participation, customer handling, email writing aur presentation skills.`,
    syllabus: [
      { title: "Month 1 — Foundation Speaking", topics: ["Tenses made simple", "Daily use sentences", "Self introduction", "Pronunciation practice"] },
      { title: "Month 2 — Real Conversations", topics: ["Telephone & office English", "Shopping, travel & bank", "Group discussion practice", "Vocabulary building"] },
      { title: "Month 3 — Professional Communication", topics: ["Interview questions & answers", "Email & message writing", "Presentation skills", "Body language & confidence"] },
    ],
    highlights: [
      "Daily 15-minute personal speaking slot",
      "Recording + feedback every week",
      "Mock interviews in English",
      "Vocabulary app access",
      "Group discussion sessions",
      "Certificate with fluency assessment",
    ],
    tools: ["Language lab", "Pronunciation app", "Recording tools", "Reading material"],
    eligibility: "10th pass. Beginner se lekar working professionals — sab ke liye.",
    certification: "NextToGen Spoken English Certificate (fluency level ke saath).",
    featured: false,
    sortOrder: 8,
  },
];
