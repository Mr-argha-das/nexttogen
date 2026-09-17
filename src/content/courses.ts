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
    tagline: "From zero to job-ready developer — 6 months, 12 real projects",
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
      "Master the complete MERN stack — HTML, CSS, React, Node.js and MongoDB — with 12 portfolio projects and a GitHub profile recruiters can see.",
    description: `## What this course covers
You start from the basics of HTML and CSS and progress to React, Node.js, Express, MongoDB and deployment. By the end of the programme you can design, build, test and ship a complete web application on your own.

## Who is this course for?
- Students who want an IT career after 12th, B.Tech or BSc
- Working professionals planning a career switch into development
- Freelancers who want to deliver professional client projects

## How the classes work
Two live classes plus one doubt session every week. Each module ends with a graded project, so you finish the course with 12 projects on your GitHub profile.

## Placement support
Once the course is complete, we rewrite your resume, run five mock interviews and refer you to our partner companies.`,
    syllabus: [
      { title: "Module 1 — Web Foundations", topics: ["HTML5 semantics and accessibility", "CSS3, Flexbox and Grid", "Responsive design", "Git and GitHub basics"] },
      { title: "Module 2 — JavaScript Deep Dive", topics: ["ES6+ syntax, arrays and objects", "DOM manipulation and events", "Fetch API and async/await", "Error handling"] },
      { title: "Module 3 — React and Modern Frontend", topics: ["Components, props and state", "Hooks (useState, useEffect, custom)", "React Router and forms", "Tailwind CSS and component design"] },
      { title: "Module 4 — Node.js and REST APIs", topics: ["Node runtime and npm", "Express routing and middleware", "Authentication with JWT", "Validation and file uploads"] },
      { title: "Module 5 — Databases", topics: ["MongoDB and Mongoose", "SQL basics (MySQL)", "Schema design", "Aggregation and indexing"] },
      { title: "Module 6 — Deployment and DevOps Basics", topics: ["Environment variables and secrets", "Deployment on Vercel or Railway", "Logging and monitoring", "Performance fundamentals"] },
      { title: "Module 7 — Capstone and Interview Prep", topics: ["Full-stack capstone project", "150 DSA warm-up problems", "Resume and LinkedIn optimisation", "Five mock interviews"] },
    ],
    highlights: [
      "12 industry-level projects, portfolio ready",
      "Live classes plus lifetime access to recordings",
      "One-to-one mentor doubt sessions every week",
      "Internship certificate on the capstone project",
      "Resume, LinkedIn and GitHub profile review",
      "Placement assistance with mock interviews",
    ],
    tools: ["VS Code", "Git and GitHub", "React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Postman", "Vercel"],
    eligibility: "12th pass or graduate. Basic computer knowledge is enough — no coding background required.",
    certification: "NextGen Full Stack Developer Diploma plus a project experience letter.",
    featured: true,
    sortOrder: 1,
  },
  {
    slug: "python-data-science-ai",
    title: "Python, Data Science & AI",
    tagline: "Python, Pandas, Machine Learning and GenAI — practised on 10 live datasets",
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
      "Python programming, data analysis, visualisation, machine learning and GenAI tools — a complete data career track built on hands-on datasets.",
    description: `## Why data science?
Every industry — banking, healthcare, e-commerce — runs on data. Demand for analysts and machine learning engineers keeps rising, and entry-level packages in India start between ₹4 and ₹8 LPA.

## What you will learn
A strong Python foundation, data cleaning with Pandas and NumPy, dashboards in Matplotlib and Power BI, statistics, machine learning (regression, classification, clustering) and GenAI basics — all practised on real datasets.

## Final outcome
You finish with a complete data project: a dashboard, a machine learning model and a written report. That is the portfolio interviewers actually ask about.`,
    syllabus: [
      { title: "Module 1 — Python Programming", topics: ["Syntax, loops and functions", "Object-oriented programming and modules", "File and error handling", "Virtual environments"] },
      { title: "Module 2 — Data Analysis", topics: ["NumPy arrays", "Pandas dataframes", "Cleaning and merging data", "Group-by and pivots"] },
      { title: "Module 3 — Visualisation and BI", topics: ["Matplotlib and Seaborn", "Plotly dashboards", "Power BI reports", "Storytelling with data"] },
      { title: "Module 4 — Statistics", topics: ["Descriptive statistics", "Probability and distributions", "Hypothesis testing", "A/B testing"] },
      { title: "Module 5 — Machine Learning", topics: ["Supervised vs unsupervised learning", "Regression and classification", "Model evaluation metrics", "scikit-learn pipelines"] },
      { title: "Module 6 — AI and GenAI", topics: ["Neural network basics", "Introduction to TensorFlow", "Prompt engineering", "LLM APIs and chatbots"] },
      { title: "Module 7 — Capstone and Interview Prep", topics: ["End-to-end ML project", "SQL for analytics", "Case-study interviews", "Resume and portfolio"] },
    ],
    highlights: [
      "Hands-on practice on 10 real datasets",
      "Power BI and Python dashboard portfolio",
      "Kaggle competition participation",
      "Complete path from statistics to machine learning",
      "GenAI and chatbot project",
      "Placement assistance with analytics referrals",
    ],
    tools: ["Python", "Jupyter", "Pandas", "NumPy", "scikit-learn", "Power BI", "MySQL", "Streamlit", "GitHub"],
    eligibility: "Graduate in any stream, or 12th with Mathematics. No programming experience required.",
    certification: "NextGen Data Science and AI Professional Certificate plus a capstone project report.",
    featured: true,
    sortOrder: 2,
  },
  {
    slug: "digital-marketing-mastery",
    title: "Digital Marketing & Social Media Mastery",
    tagline: "Meta and Google Ads, SEO, content and analytics — with a real client campaign",
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
      "SEO, Google and Meta Ads, content marketing, email automation and analytics — with live ad budget practice in every batch.",
    description: `## Real campaigns, not just theory
Students run live ad campaigns during the course. Every batch gets practice ad budget so you understand real CPC, CTR and conversion data.

## Who can join?
Shop owners, freelancers, job seekers and students. No coding or technical background is needed, and the course is comfortably doable after 10th standard.

## Career options
Digital marketing executive, SEO analyst, performance marketer, social media manager or freelancer. Starting packages range from ₹3 to ₹6 LPA, and freelance clients pay ₹15,000 or more per project.`,
    syllabus: [
      { title: "Module 1 — Marketing Foundations", topics: ["Customer personas", "Funnels and funnel metrics", "Positioning and offers", "Marketing plan basics"] },
      { title: "Module 2 — Search Engine Optimisation", topics: ["Keyword research", "On-page and technical SEO", "Backlinks and off-page SEO", "Local SEO for shops"] },
      { title: "Module 3 — Google Ads", topics: ["Search campaigns", "Shopping and Performance Max", "Bidding strategies", "Conversion tracking"] },
      { title: "Module 4 — Meta and Social Ads", topics: ["Facebook and Instagram ads", "Creative testing", "Retargeting funnels", "Reels planning"] },
      { title: "Module 5 — Content and Email", topics: ["Content calendar", "Copywriting frameworks", "Email automation flows", "WhatsApp marketing"] },
      { title: "Module 6 — Analytics and Freelancing", topics: ["GA4 and Looker Studio", "Reporting dashboards", "Client proposals and pricing", "Freelance profile setup"] },
    ],
    highlights: [
      "Live ad campaign practice budget",
      "Guidance for Google and Meta certification exams",
      "30-day content calendar template",
      "Freelancing and client handling training",
      "E-commerce (Shopify) marketing module",
      "Lifetime access to recorded classes",
    ],
    tools: ["Google Ads", "Meta Ads Manager", "GA4", "Search Console", "Canva", "Mailchimp", "Looker Studio"],
    eligibility: "10th pass or above. No technical background required.",
    certification: "NextGen Advanced Digital Marketing Certificate with Google and Meta certification support.",
    featured: true,
    sortOrder: 3,
  },
  {
    slug: "ui-ux-graphic-design",
    title: "UI/UX & Graphic Design",
    tagline: "Figma, Photoshop and Illustrator — become a portfolio-ready designer",
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
      "Design thinking, Figma prototyping, branding, print and social creatives — with 15 portfolio projects you can show clients.",
    description: `## Design is a skill, not a talent
You learn design principles step by step — colour, typography, layout and spacing. Then you build app and website screens, wireframes and clickable prototypes in Figma.

## Your portfolio is your resume
By the end of the course you have 15 projects: a mobile app redesign, an e-commerce website, a brand identity, a poster series and a complete case study.

## Where the work comes from
Design agencies, IT companies, direct-to-consumer brands and print houses. As a freelancer you can charge ₹5,000 to ₹50,000 per project.`,
    syllabus: [
      { title: "Module 1 — Design Fundamentals", topics: ["Colour theory", "Typography and grids", "Layout and spacing", "Visual hierarchy"] },
      { title: "Module 2 — Graphic Design", topics: ["Photoshop retouching", "Illustrator vector art", "Poster and print design", "Brand identity kits"] },
      { title: "Module 3 — UI Design in Figma", topics: ["Auto layout and components", "Design systems", "Mobile and web layouts", "Responsive screens"] },
      { title: "Module 4 — UX and Research", topics: ["User research basics", "Wireframing and user flows", "Usability testing", "Accessibility fundamentals"] },
      { title: "Module 5 — Prototyping and Handoff", topics: ["Interactive prototypes", "Micro-interactions", "Developer handoff", "Design critique sessions"] },
      { title: "Module 6 — Portfolio and Freelancing", topics: ["Case study writing", "Behance and Dribbble profiles", "Client pricing", "Mock design interviews"] },
    ],
    highlights: [
      "15 portfolio projects and a Behance profile setup",
      "Live practice in Adobe tools and Figma",
      "One project built from a real client brief",
      "Training in building design systems",
      "Weekly design critique sessions",
      "Freelance pricing and client communication",
    ],
    tools: ["Figma", "Adobe Photoshop", "Illustrator", "Canva Pro", "Miro", "Notion"],
    eligibility: "10th or 12th pass. Creative interest is required — drawing skill is not.",
    certification: "NextGen UI/UX Designer Certificate plus a portfolio review report.",
    featured: false,
    sortOrder: 4,
  },
  {
    slug: "tally-gst-accounting",
    title: "Tally Prime with GST & Accounting",
    tagline: "India's most practical accounts course — 100% hands-on",
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
      "Tally Prime, GST returns, TDS, payroll and Excel — complete preparation for an accounts executive role.",
    description: `## Every business needs an accountant
Candidates who know Tally and GST are in demand in every city. This course is entirely practical: you work on real company vouchers, not sample data.

## What you will be able to do
Record sales and purchase entries, raise GST invoices, file GSTR-1 and GSTR-3B, handle TDS and payroll, reconcile bank statements and prepare final accounts.

## Job scope
Accounts Executive, Tally Operator, GST Practitioner and Billing Executive roles start at ₹2.4 to ₹4 LPA, and reach ₹6 LPA after one or two years of experience.`,
    syllabus: [
      { title: "Module 1 — Accounting Basics", topics: ["Golden rules of accounting", "Journal and ledger", "Trial balance", "Final accounts"] },
      { title: "Module 2 — Tally Prime", topics: ["Company creation", "Masters and voucher entries", "Inventory management", "Cost centres and budgets"] },
      { title: "Module 3 — Practical GST", topics: ["GST registration", "GSTR-1 and GSTR-3B filing", "Input tax credit", "E-way bill basics"] },
      { title: "Module 4 — TDS and Payroll", topics: ["TDS sections and entries", "Salary processing", "PF and ESI basics", "TDS returns"] },
      { title: "Module 5 — Excel for Accounts", topics: ["VLOOKUP and pivot tables", "Bank reconciliation", "MIS reports", "Data validation"] },
    ],
    highlights: [
      "Practice on real company vouchers",
      "GST return filing simulator",
      "Combined Excel and Tally training",
      "Interview question bank for accounts roles",
      "Guidance on setting up books for small businesses",
      "Certificate with experience references",
    ],
    tools: ["Tally Prime", "MS Excel", "GST Portal (simulator)", "Busy (basics)"],
    eligibility: "12th pass. Commerce is preferred, but other streams are welcome.",
    certification: "NextGen Advanced Accounting with Tally and GST Certificate.",
    featured: false,
    sortOrder: 5,
  },
  {
    slug: "cyber-security-ethical-hacking",
    title: "Cyber Security & Ethical Hacking",
    tagline: "Practical labs, network security and bug bounty fundamentals",
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
      "Network and web security, penetration testing labs, Linux, Kali tools and bug bounty practice — with 60+ guided hands-on labs.",
    description: `## Offensive and defensive security
You learn to think like an attacker, which is what makes defence effective. All practice happens in isolated lab environments where you run real tools safely and legally.

## Lab-based learning
Over 60 guided labs cover network scanning, vulnerability assessment, web application testing (OWASP Top 10), password attacks, privilege escalation, wireless security and professional reporting.

## Career scope
SOC analyst, penetration tester and security engineer roles start between ₹4 and ₹8 LPA, with steady demand across banking, fintech, IT services and government projects.`,
    syllabus: [
      { title: "Module 1 — Networking and Linux", topics: ["TCP/IP and the OSI model", "Linux command line", "DNS, DHCP and routing", "Virtual lab setup"] },
      { title: "Module 2 — Security Fundamentals", topics: ["The CIA triad", "Cryptography basics", "Authentication and IAM", "Security policies"] },
      { title: "Module 3 — Reconnaissance and Scanning", topics: ["Footprinting", "Nmap and enumeration", "Vulnerability scanners", "OSINT techniques"] },
      { title: "Module 4 — Web Application Security", topics: ["OWASP Top 10", "Burp Suite in practice", "SQL injection and XSS labs", "Secure coding fixes"] },
      { title: "Module 5 — System and Network Attacks", topics: ["Password cracking", "Metasploit basics", "Privilege escalation", "Wireless security"] },
      { title: "Module 6 — Blue Team and Reporting", topics: ["SIEM and log analysis", "Incident response", "Firewall and IDS rules", "Professional report writing"] },
      { title: "Module 7 — Bug Bounty and Certification", topics: ["Bug bounty platforms", "CVE research basics", "CEH and CompTIA preparation", "Mock certification test"] },
    ],
    highlights: [
      "60+ isolated hacking labs",
      "Hands-on Kali Linux and Burp Suite training",
      "Live CTF competitions",
      "Bug bounty platform profile setup",
      "CEH and CompTIA certification guidance",
      "Reporting and communication skills",
    ],
    tools: ["Kali Linux", "Nmap", "Burp Suite", "Metasploit", "Wireshark", "Splunk (basics)", "VirtualBox"],
    eligibility: "Graduate or final-year student, with an IT background preferred.",
    certification: "NextGen Cyber Security Diploma plus CEH exam preparation support.",
    featured: false,
    sortOrder: 6,
  },
  {
    slug: "dca-computer-applications",
    title: "DCA — Diploma in Computer Applications",
    tagline: "From computer basics to MS Office, internet and typing — the skills every job needs",
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
      "Windows, MS Word, Excel and PowerPoint, internet, typing, Tally basics and DTP — a complete diploma designed for absolute beginners.",
    description: `## From zero to confident computer user
This is the right course for anyone using a computer for the first time — school students, homemakers, shop staff and candidates preparing for government exams.

## What you will learn
Typing speed, MS Office (Word, Excel, PowerPoint), internet and email, Google Drive, online form filling, digital payments, printing, scanning and the basics of Tally.

## Perfect for government job preparation
Qualifications such as RS-CIT, DCA and CCC are widely required. This programme is structured the same way, with extra practical training hours.`,
    syllabus: [
      { title: "Semester 1 — Fundamentals", topics: ["Computer and Windows basics", "Files and folder management", "Typing in English and Hindi", "Internet, email and online safety"] },
      { title: "Semester 2 — MS Office", topics: ["MS Word documents", "MS Excel sheets and formulas", "PowerPoint presentations", "Google Docs and Sheets"] },
      { title: "Semester 3 — Practical Skills", topics: ["Online form filling", "Digital payments and UPI", "Printing, scanning and DTP", "Photo editing basics"] },
      { title: "Semester 4 — Job Skills", topics: ["Tally basics", "Resume and interview preparation", "Data entry practice", "Typing speed test"] },
    ],
    highlights: [
      "Bilingual teaching support",
      "One hour of supervised lab practice daily",
      "Training in filling government exam forms",
      "Typing certificate with recorded speed",
      "Flexible morning and evening batches",
      "Course completion certificate",
    ],
    tools: ["Windows 11", "MS Office", "Google Workspace", "Typing Tutor", "Canva", "Tally (basics)"],
    eligibility: "10th pass. No prior computer knowledge required — we start from absolute zero.",
    certification: "NextGen DCA Diploma, valid for government exam applications.",
    featured: false,
    sortOrder: 7,
  },
  {
    slug: "spoken-english-personality",
    title: "Spoken English & Personality Development",
    tagline: "Fluency, confidence and interview speaking — a 90-day practical programme",
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
      "Grammar essentials, daily conversation practice, group discussions, interview speaking and presentation skills.",
    description: `## English is not a subject, it is confidence
The most common reason candidates are rejected in interviews is spoken English. This course does not make you memorise grammar rules — it makes you speak.

## How classes run
Twenty minutes of grammar, thirty minutes of pair and group conversation, and weekly recording-based feedback. Every student gets a 15-minute speaking slot each day.

## What you take away
A confident self-introduction, active participation in group discussions, customer handling skills, email writing and presentation ability.`,
    syllabus: [
      { title: "Month 1 — Speaking Foundations", topics: ["Tenses made simple", "Everyday sentences", "Self introduction", "Pronunciation practice"] },
      { title: "Month 2 — Real Conversations", topics: ["Telephone and office English", "Shopping, travel and banking", "Group discussion practice", "Vocabulary building"] },
      { title: "Month 3 — Professional Communication", topics: ["Interview questions and answers", "Email and message writing", "Presentation skills", "Body language and confidence"] },
    ],
    highlights: [
      "A personal 15-minute speaking slot every day",
      "Weekly recordings with individual feedback",
      "Mock interviews conducted in English",
      "Vocabulary app access",
      "Group discussion sessions",
      "Certificate with a fluency assessment",
    ],
    tools: ["Language lab", "Pronunciation app", "Recording tools", "Reading material"],
    eligibility: "10th pass and above — suitable for complete beginners and working professionals alike.",
    certification: "NextGen Spoken English Certificate with a recorded fluency level.",
    featured: false,
    sortOrder: 8,
  },
];

