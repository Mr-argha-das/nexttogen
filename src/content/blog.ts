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
    title: "2026 me Web Development Career Kaise Banaye: Step-by-Step Roadmap",
    excerpt:
      "HTML se lekar deployment tak — ek fresher ko 6 mahine me job-ready banane wala realistic roadmap, free resources ke saath.",
    category: "Career",
    tags: ["Web Development", "Roadmap", "Fresher Jobs", "MERN"],
    readMinutes: 7,
    featured: true,
    author: "Rahul Sharma",
    authorRole: "Lead Trainer — Web Development",
    daysAgo: 3,
    coverImage: "/images/blog-web-roadmap.jpg",
    views: 1840,
    content: `Har saal hazaaron students poochhte hain — "sir, web development me career kaise start karein?" Answer simple hai, par uspar consistency chahiye. Ye roadmap hamare 2000+ students par test kiya gaya hai.

## Step 1 — Foundation (Week 1–4)
HTML aur CSS se shuru karein. Sirf video dekhna kaafi nahi — **roz 1 chhota page banayein**. Ek personal profile page, ek restaurant menu page, ek pricing table. Yahi habit aapko baaki students se aage rakhegi.

## Step 2 — JavaScript (Week 5–12)
Yahan 60% students ruk jaate hain. Isliye DOM manipulation aur events par extra time dein. Chhote projects banayein: to-do list, calculator, weather app (API ke saath). Har project ko GitHub par push karein — 12 commit se zyada kuch nahi lagta.

## Step 3 — Framework: React (Week 13–18)
React ka ek hi rule hai — **state aur props clear ho jayein to sab clear hai**. Router, forms, API calls aur custom hooks seekhne ke baad ek multi-page project banayein.

## Step 4 — Backend (Week 19–24)
Node.js + Express + MongoDB. Authentication (JWT), CRUD APIs, file upload aur validation — ye 4 cheezein 90% job interviews me poochhi jaati hain.

## Step 5 — Portfolio & Job Apply (Week 25–26)
- 2 bade projects (ek full-stack, ek API integration wala)
- 8 chhote projects GitHub par
- LinkedIn + Naukri profile me projects ka link
- Roz 10 applications + 1 referral message

## Reality check
Sirf certificate kaam nahi karta. Hum students ko isliye projects par zyada focus karate hain — interview me aapka GitHub khulta hai, aur wahi aapka sabse bada proof hota hai. NextToGen ke Full Stack batch me har student 12 projects banata hai.`,
  },
  {
    slug: "data-science-vs-ai-vs-machine-learning",
    title: "Data Science vs AI vs Machine Learning: Beginner Ke Liye Asaan Farq",
    excerpt:
      "Teen sabse zyada confuse karne wale terms — ek dum simple bhasha me, example ke saath, aur kaunsi job kis skill se milti hai.",
    category: "Data & AI",
    tags: ["Data Science", "AI", "Machine Learning", "Career Guide"],
    readMinutes: 6,
    featured: true,
    author: "Dr. Anjali Mehta",
    authorRole: "Head — Data Science & AI",
    daysAgo: 8,
    coverImage: "/images/blog-data-science.jpg",
    views: 1320,
    content: `"Data Science aur AI me kya farq hai?" — ye sawaal humse har counselling session me aata hai. Chaliye ek example se samjhte hain.

## Data Science
Data ko samajhna aur usse decisions nikalna. Aap Excel/Python me data saaf karte hain, charts banate hain aur report dete hain. Job titles: Data Analyst, Business Analyst, MIS Executive.

## Machine Learning
Data se **prediction** karna. Jaise "kaunse customer churn karenge" ya "agli mahine sales kitni hogi". Yah ML models ka kaam hai. Job titles: ML Engineer, Data Scientist.

## Artificial Intelligence
Sabse bada umbrella. ML iske andar aata hai. Aaj GenAI (chatbots, image generation) bhi isi ka hissa hai.

## Kaunsa pehle seekhein?
1. **Pehle analytics** — Python + SQL + visualization. Isse 2–3 mahine me internship mil sakti hai.
2. **Phir ML** — statistics aur scikit-learn.
3. **Phir GenAI** — LLM APIs aur prompt engineering.

## Salary reality (India, fresher)
- Data Analyst: ₹3.5–6 LPA
- ML Engineer: ₹6–12 LPA
- AI/GenAI specialist: ₹8–15 LPA

Shuruat ke liye skill se zyada important hai **portfolio**. Ek dashboard aur ek end-to-end ML project aapko interview tak pahucha dega.`,
  },
  {
    slug: "fresher-resume-kaise-banaye-2026",
    title: "Fresher Resume Kaise Banaye Jo Shortlist Ho Jaye (Format + Examples)",
    excerpt:
      "Fresher resume me sirf 3 cheezein matter karti hain: projects, skills aur clarity. Poora format aur common mistakes.",
    category: "Career",
    tags: ["Resume", "Interview", "Fresher", "Job Search"],
    readMinutes: 5,
    featured: false,
    author: "NextToGen Placement Cell",
    authorRole: "Placement Team",
    daysAgo: 14,
    coverImage: "/images/blog-resume.jpg",
    views: 2210,
    content: `HR ek resume par sabse pehle **6–8 second** deta hai. Isliye important cheezein upar rakhiye, kahani neeche.

## Resume ka structure (1 page)
1. **Naam + contact** — phone, email, city, LinkedIn, GitHub
2. **Objective (2 lines)** — "Fresher full-stack developer, 12 projects, MERN stack"
3. **Skills section** — technical tools, 8–12 keywords
4. **Projects** — 3 projects, har ek me: kaam kya tha, tools kya, result kya
5. **Education** — latest pehle
6. **Certifications / internships**

## Project lines kaise likhein
Bukhaar wali line: "Made a website."
Behtar line: "Built an e-commerce app with React & Node; Razorpay test payments; deployed on Vercel — 30 products, search aur cart functionality."

Formula: **Action + Tech + Result**.

## 5 common mistakes
- Photo aur "Father's name" (private jobs me zaroori nahi)
- MS Word ka fancy template — ATS ise parse nahi kar pata
- "Hard working, self motivated" jaise empty words
- Skills me sab kuch likh dena, jo aata nahi
- File name "resume_final_final.pdf" — iske badle "Aman_Sharma_Web_Developer.pdf"

## Talent vs honesty
Jo skill nahi aati, mat likhiye — interview me pakde jaayenge. Jo seekh rahe hain, uske liye "currently learning" likh dijiye. Humare placement cell me har student ka resume 3 baar review kiya jaata hai.`,
  },
  {
    slug: "digital-marketing-free-tools-2026",
    title: "Digital Marketing Ke 12 Free Tools Jo Har Fresher Ko Aane Chahiye",
    excerpt:
      "Bina ek rupya kharch kiye content, SEO, ads aur analytics ka kaam karne wale practical tools — kaam ke saath.",
    category: "Digital Marketing",
    tags: ["SEO", "Tools", "Google Ads", "Freelancing"],
    readMinutes: 4,
    featured: false,
    author: "Priya Agarwal",
    authorRole: "Faculty — Digital Marketing",
    daysAgo: 21,
    coverImage: "/images/blog-marketing-tools.jpg",
    views: 980,
    content: `Achhi khabar ye hai — digital marketing seekhne ke liye starting me paisa nahi lagta. Ye 12 tools har fresher ke laptop me hone chahiye.

## SEO & Research
1. **Google Search Console** — aapki site ka actual traffic aur errors
2. **Google Trends** — konsa topic abhi chal raha hai
3. **Ubersuggest / Keyword Planner** — free keyword ideas
4. **Screaming Frog (free 500 URLs)** — technical SEO audit

## Content & Creative
5. **Canva** — social creatives aur reels templates
6. **Google Looker Studio** — free client reporting dashboards
7. **ChatGPT / Gemini** — captions aur ad copy ka pehla draft
8. **CapCut** — reels aur YouTube shorts editing

## Ads & Analytics
9. **Meta Ads Manager** — real campaign practice (₹500 se shuru)
10. **Google Ads Editor** — bulk campaign editing
11. **GA4** — user behaviour samajhna
12. **Google Tag Manager** — conversion tracking

## Kaam kaise karein?
Har tool ka ek portfolio deliverable banayein: ek dashboard, ek audit report, ek ad campaign screenshot. Interview me "mujhe Canva aata hai" kehne se accha hai **file dikhana**.

NextToGen ke digital marketing batch me students live campaign chalate hain — isse confidence aur proof dono milta hai.`,
  },
  {
    slug: "government-vs-private-job-it-field",
    title: "Government vs Private Job: IT Field Me Kya Choose Karein?",
    excerpt:
      "Stability, growth, salary aur work-life balance — dono raaste ka honest comparison, ek training institute ki nazar se.",
    category: "Career",
    tags: ["Government Jobs", "Private Jobs", "Career Counseling"],
    readMinutes: 5,
    featured: false,
    author: "NextToGen Counselling Team",
    authorRole: "Career Counsellor",
    daysAgo: 30,
    coverImage: "/images/blog-career-choice.jpg",
    views: 1560,
    content: `Ye sawaal har student ke ghar me hota hai: "sarkari naukri karein ya private?" Sach ye hai — dono achhe hain, par aapki priority kya hai, wo decide karta hai.

## Government side
- Stability aur pension
- Fixed time table, leaves
- Selection process lamba (6 mahine - 2 saal)
- Technical skill growth slow ho sakti hai

Government IT jobs (Programmer, DEO, Computer Operator) ke liye **DCA, CCC, typing aur Tally** jaisi qualification kaam aati hai.

## Private side
- Fast growth aur skill learning
- Salary aapki skill ke hisaab se badhti hai
- Job security aapki skill hai, company ki nahi
- Starting me pressure zyada

Private IT me entry ke liye **projects + internship** sabse zyada matter karte hain.

## Behtar rasta: dono ke liye tayyari
1. Pehle ek technical skill skill seekhein (web, data, accounting ya marketing)
2. 2–3 projects bana kar portfolio banayein
3. Private jobs me apply karte rahein — experience milta rahega
4. Sarkari exams ke liye parallel me typing, DCA jaisi qualification rakhein

Bahut humare students ne exactly yahi kiya — din me private job, shaam ko sarkari exam prep, aur dono me success mili.`,
  },
  {
    slug: "cyber-security-career-india-guide",
    title: "Cyber Security Me Career: India Me Kaise Shuru Karein (2026 Guide)",
    excerpt:
      "SOC analyst se lekar bug bounty tak — entry ka rasta, zaroori certifications aur practical labs, sab ek jagah.",
    category: "Cyber Security",
    tags: ["Cyber Security", "Ethical Hacking", "Certification", "Jobs"],
    readMinutes: 6,
    featured: false,
    author: "Vikram Singh Rathore",
    authorRole: "Faculty — Cyber Security",
    daysAgo: 40,
    coverImage: "/images/blog-cyber-security.jpg",
    views: 1120,
    content: `Cyber security me job ke liye B.Tech zaroori nahi hai — **lab practice** zaroori hai. Lawa jaise yahan demand constant hai aur supply kam.

## Entry-level roles
- **SOC Analyst (L1)** — alerts monitor karna, log analysis. Freshers ke liye best entry.
- **VAPT Trainee** — vulnerability assessment aur penetration testing.
- **IT Security Support** — firewall, antivirus, endpoint management.

## Skills jo pehle chahiye
1. Networking — TCP/IP, ports, DNS
2. Linux command line
3. Python scripting basics
4. OWASP Top 10 aur Burp Suite
5. Report writing (ye 60% log ignore karte hain, aur yahi interview me farq daalti hai)

## Certifications
- **CEH** — costly par HR-friendly
- **CompTIA Security+** — fundamentals ke liye best
- **eJPT** — practical, budget-friendly
- Free: TryHackMe, Hack The Box ke learning paths

## Legal warning
Sirf apne lab ya jo systems aapko permission di gayi ho — sirf unhi par testing karein. Kisi bhi unauthorised system par testing Indian IT Act ke under punishable hai.

NextToGen ke course me 60+ isolated labs hain, jahan students legally practice karte hain. Legal padhte hain, uske baad tools chalate hain.`,
  },
];
