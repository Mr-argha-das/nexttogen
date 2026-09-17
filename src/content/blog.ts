export type SeedPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  readMinutes: number;
  featured: boolean;
  author: string;
  authorRole: string;
  daysAgo: number;
  coverImage: string;
  views: number;
};

export const SEED_POSTS: SeedPost[] = [
  {
    slug: "web-development-career-roadmap-2026",
    title: "How to Build a Web Development Career in 2026: A Step-by-Step Roadmap",
    excerpt:
      "A realistic six-month roadmap that takes you from HTML to deployment — with the projects and habits that actually get freshers hired.",
    category: "Career",
    tags: ["Web Development", "Roadmap", "Fresher Jobs", "MERN"],
    readMinutes: 7,
    featured: true,
    author: "Rahul Sharma",
    authorRole: "Lead Trainer — Web Development",
    daysAgo: 3,
    coverImage: "/images/blog-web-roadmap.jpg",
    views: 1840,
    content: `Thousands of students ask us the same question every year: "How do I start a career in web development?" The answer is simple, but it demands consistency. This roadmap has been tested on more than 2,000 of our students.

## Step 1 — Foundations (Week 1–4)
Start with HTML and CSS. Watching videos is not enough: build **one small page every day**. A personal profile page, a restaurant menu page, a pricing table. That habit alone will put you ahead of most beginners.

## Step 2 — JavaScript (Week 5–12)
This is where nearly 60% of learners stop. Give DOM manipulation and events extra time. Build small projects: a to-do list, a calculator, a weather app that calls an API. Push every project to GitHub — it takes a minute and becomes your proof of work.

## Step 3 — A framework: React (Week 13–18)
React becomes easy once **state and props are clear in your head**. Learn routing, forms, API calls and custom hooks, then build one multi-page project from scratch.

## Step 4 — Backend (Week 19–24)
Node.js, Express and MongoDB. Authentication with JWT, CRUD APIs, file uploads and validation — these four topics appear in 90% of entry-level interviews.

## Step 5 — Portfolio and applications (Week 25–26)
- Two large projects (one full-stack, one API integration)
- Eight smaller projects on GitHub
- LinkedIn and job portal profiles linking your work
- Ten applications and one referral message every day

## A reality check
A certificate by itself rarely gets you hired. That is why we push projects so hard: in an interview your GitHub opens first, and that is your strongest evidence. Every student in our Full Stack batch builds 12 projects before graduating.`,
  },
  {
    slug: "data-science-vs-ai-vs-machine-learning",
    title: "Data Science vs AI vs Machine Learning: A Simple Guide for Beginners",
    excerpt:
      "The three terms everyone mixes up — explained in plain English with examples, plus which job each skill set actually leads to.",
    category: "Data & AI",
    tags: ["Data Science", "AI", "Machine Learning", "Career Guide"],
    readMinutes: 6,
    featured: true,
    author: "Dr. Anjali Mehta",
    authorRole: "Head — Data Science & AI",
    daysAgo: 8,
    coverImage: "/images/blog-data-science.jpg",
    views: 1320,
    content: `"What is the difference between data science and AI?" This question comes up in almost every counselling session. Here is the simplest way to think about it.

## Data Science
Understanding data and turning it into decisions. You clean data in Python or Excel, build charts and deliver reports. Job titles: Data Analyst, Business Analyst, MIS Executive.

## Machine Learning
Using data to **predict**. Which customers are likely to leave? What will next month's sales look like? Those predictions are machine learning models. Job titles: ML Engineer, Data Scientist.

## Artificial Intelligence
The largest umbrella. Machine learning sits inside it, and today's generative AI — chatbots and image generation — is part of the same field.

## What should you learn first?
1. **Start with analytics** — Python, SQL and visualisation. This alone can earn you an internship within two to three months.
2. **Then machine learning** — statistics and scikit-learn.
3. **Then generative AI** — LLM APIs and prompt engineering.

## Salary reality (India, freshers)
- Data Analyst: ₹3.5–6 LPA
- ML Engineer: ₹6–12 LPA
- AI and GenAI specialist: ₹8–15 LPA

At the start, your portfolio matters more than your certificate. One serious dashboard and one end-to-end machine learning project will carry you into interviews.`,
  },
  {
    slug: "fresher-resume-that-gets-shortlisted",
    title: "How to Write a Fresher Resume That Gets Shortlisted (Format + Examples)",
    excerpt:
      "Only three things matter on a fresher resume: projects, skills and clarity. Here is a format you can copy, plus the mistakes to avoid.",
    category: "Career",
    tags: ["Resume", "Interview", "Fresher", "Job Search"],
    readMinutes: 5,
    featured: false,
    author: "NextGen Placement Cell",
    authorRole: "Placement Team",
    daysAgo: 14,
    coverImage: "/images/blog-resume.jpg",
    views: 2210,
    content: `A recruiter spends **six to eight seconds** on a resume before deciding. Keep the important things at the top and the story below.

## A structure that works (one page)
1. **Name and contact** — phone, email, city, LinkedIn, GitHub
2. **Objective (two lines)** — "Fresher full-stack developer with 12 projects in the MERN stack"
3. **Skills** — 8 to 12 technical keywords
4. **Projects** — three projects, each with what you built, the tools used and the outcome
5. **Education** — most recent first
6. **Certifications and internships**

## How to write project bullet points
Weak: "Made a website."
Better: "Built an e-commerce app with React and Node; integrated test payments; deployed on Vercel with 30 products and cart search."

The formula is **action + technology + result**.

## Five common mistakes
- Photos and personal details that private employers do not need
- Fancy Word templates that applicant tracking systems cannot parse
- Empty phrases such as "hard working and self motivated"
- Listing skills you cannot demonstrate
- File names like "resume_final_final.pdf" — use "Aman_Sharma_Web_Developer.pdf" instead

## Be honest about skills
If you cannot use a tool yet, leave it out — interviews expose it quickly. If you are learning it, write "currently learning". In our placement cell, every student's resume is reviewed three times before it goes out.`,
  },
  {
    slug: "digital-marketing-free-tools-2026",
    title: "12 Free Digital Marketing Tools Every Fresher Should Know",
    excerpt:
      "Practical, zero-cost tools for content, SEO, ads and analytics — and exactly what to build with each one to prove your skills.",
    category: "Digital Marketing",
    tags: ["SEO", "Tools", "Google Ads", "Freelancing"],
    readMinutes: 4,
    featured: false,
    author: "Priya Agarwal",
    authorRole: "Faculty — Digital Marketing",
    daysAgo: 21,
    coverImage: "/images/blog-marketing-tools.jpg",
    views: 980,
    content: `The good news about digital marketing is that you do not need to spend money to start learning. These twelve tools should be installed on every fresher's laptop.

## SEO and research
1. **Google Search Console** — the real traffic and errors for any site you manage
2. **Google Trends** — which topics are rising right now
3. **Ubersuggest or Keyword Planner** — free keyword ideas
4. **Screaming Frog (free tier)** — technical SEO audits

## Content and creative
5. **Canva** — social creatives and Reels templates
6. **Google Looker Studio** — free client reporting dashboards
7. **ChatGPT or Gemini** — first drafts of captions and ad copy
8. **CapCut** — Reels and YouTube Shorts editing

## Ads and analytics
9. **Meta Ads Manager** — real campaign practice (start with a small budget)
10. **Google Ads Editor** — bulk campaign editing
11. **GA4** — understanding user behaviour
12. **Google Tag Manager** — conversion tracking

## How to actually use them
Turn each tool into a portfolio deliverable: a dashboard, an audit report, a campaign screenshot. In an interview, showing the file beats saying "I know Canva".

Students in our digital marketing batches run live campaigns, which builds both confidence and proof.`,
  },
  {
    slug: "government-vs-private-job-it-field",
    title: "Government vs Private Jobs: What Should You Choose in IT?",
    excerpt:
      "Stability, growth, salary and work-life balance compared honestly — from the perspective of a training institute.",
    category: "Career",
    tags: ["Government Jobs", "Private Jobs", "Career Counselling"],
    readMinutes: 5,
    featured: false,
    author: "NextGen Counselling Team",
    authorRole: "Career Counsellor",
    daysAgo: 30,
    coverImage: "/images/blog-career-choice.jpg",
    views: 1560,
    content: `Almost every student hears this at home: "Should I prepare for a government job or go private?" Both paths are good — your priority decides which one suits you.

## The government side
- Job security and a pension
- Fixed working hours and leave benefits
- Long selection cycle, often six months to two years
- Technical skills can grow more slowly

Government IT roles such as Programmer, Data Entry Operator and Computer Operator value qualifications like **DCA, CCC, typing speed and Tally**.

## The private side
- Fast growth and constant learning
- Salary grows with your skills
- Job security depends on your skill, not the company's promise
- Initial pressure is higher

Private IT hiring weighs **projects and internships** more than marks.

## The smarter approach: prepare for both
1. Learn one technical skill first — web, data, accounting or marketing
2. Build two or three projects and a portfolio
3. Keep applying privately while you prepare for exams
4. Maintain government-ready qualifications like typing and DCA in parallel

Many of our students did exactly this: a private job during the day, exam preparation in the evening, and success on both fronts.`,
  },
  {
    slug: "cyber-security-career-india-guide",
    title: "Building a Cyber Security Career in India: A Complete 2026 Guide",
    excerpt:
      "From SOC analyst roles to bug bounty income — the entry path, the certifications worth paying for and the labs that build real skill.",
    category: "Cyber Security",
    tags: ["Cyber Security", "Ethical Hacking", "Certification", "Jobs"],
    readMinutes: 6,
    featured: false,
    author: "Vikram Singh Rathore",
    authorRole: "Faculty — Cyber Security",
    daysAgo: 40,
    coverImage: "/images/blog-cyber-security.jpg",
    views: 1120,
    content: `You do not need a B.Tech to work in cyber security — you need **lab practice**. Demand is steady and the supply of skilled candidates is still limited.

## Entry-level roles
- **SOC Analyst (L1)** — monitoring alerts and analysing logs; the best entry point for freshers
- **VAPT Trainee** — vulnerability assessment and penetration testing
- **IT Security Support** — firewalls, antivirus and endpoint management

## The skills to build first
1. Networking — TCP/IP, ports and DNS
2. The Linux command line
3. Basic Python scripting
4. The OWASP Top 10 and Burp Suite
5. Report writing, which 60% of candidates neglect and which decides interviews

## Certifications worth considering
- **CEH** — expensive but recognised by recruiters
- **CompTIA Security+** — strong on fundamentals
- **eJPT** — practical and budget friendly
- Free options: TryHackMe and Hack The Box learning paths

## A legal warning
Only test systems you own or have written permission to test. Unauthorised testing is punishable under the Indian IT Act.

Our course includes more than 60 isolated labs where students practise legally. We teach the law first, then hand over the tools.`,
  },
];

