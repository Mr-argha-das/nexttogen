export type Course = {
  slug: string;
  title: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  lessons: number;
  rating: number;
  reviews: number;
  price: string;
  oldPrice?: string;
  students: number;
  instructor: string;
  instructorRole: string;
  image: string;
  accent: string; // tailwind color classes
  bestseller?: boolean;
  description: string;
};

export const categories = [
  { name: "All Courses", count: 42, icon: "BookOpen" },
  { name: "Data & AI", count: 14, icon: "Cpu" },
  { name: "Design", count: 8, icon: "Palette" },
  { name: "Business", count: 9, icon: "Briefcase" },
  { name: "Marketing", count: 6, icon: "TrendingUp" },
  { name: "Career Skills", count: 5, icon: "Target" }
];

export const featuredCourses: Course[] = [
  {
    slug: "ai-ml-bootcamp",
    title: "AI & Machine Learning Bootcamp",
    category: "Data & AI",
    level: "Intermediate",
    duration: "6 months",
    lessons: 128,
    rating: 4.9,
    reviews: 1240,
    price: "₹48,000",
    oldPrice: "₹72,000",
    students: 3420,
    instructor: "Dr. Arjun Mehta",
    instructorRole: "Ex-Google Research Scientist",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=900&q=80",
    accent: "from-brand-700 to-brand-950",
    bestseller: true,
    description:
      "Master classical ML, deep learning, NLP, and LLMs with hands-on projects mentored by FAANG engineers."
  },
  {
    slug: "product-design-masterclass",
    title: "Product Design Masterclass",
    category: "Design",
    level: "Beginner",
    duration: "4 months",
    lessons: 86,
    rating: 4.8,
    reviews: 980,
    price: "₹32,000",
    oldPrice: "₹48,000",
    students: 2180,
    instructor: "Priya Nair",
    instructorRole: "Senior Designer, Adobe",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b8?auto=format&fit=crop&w=900&q=80",
    accent: "from-gold-500 to-gold-700",
    description:
      "From Figma fundamentals to shipping production-ready products — the complete UX/UI career program."
  },
  {
    slug: "full-stack-web",
    title: "Full-Stack Web Development",
    category: "Data & AI",
    level: "Beginner",
    duration: "6 months",
    lessons: 142,
    rating: 4.9,
    reviews: 1560,
    price: "₹42,000",
    oldPrice: "₹62,000",
    students: 4120,
    instructor: "Rahul Iyer",
    instructorRole: "Staff Engineer, Microsoft",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    accent: "from-brand-800 to-brand-600",
    bestseller: true,
    description:
      "Build production-grade apps with React, Next.js, Node.js and PostgreSQL — includes 3 capstones."
  }
];

export const allCourses: Course[] = [
  ...featuredCourses,
  {
    slug: "digital-marketing-pro",
    title: "Digital Marketing Pro",
    category: "Marketing",
    level: "Beginner",
    duration: "3 months",
    lessons: 72,
    rating: 4.7,
    reviews: 640,
    price: "₹18,000",
    oldPrice: "₹28,000",
    students: 1820,
    instructor: "Ananya Sharma",
    instructorRole: "Growth Lead, Flipkart",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    accent: "from-gold-500 to-brand-700",
    description:
      "Master SEO, SEM, content, social, and analytics — build campaigns that actually convert."
  },
  {
    slug: "data-analytics",
    title: "Data Analytics with Python",
    category: "Data & AI",
    level: "Beginner",
    duration: "3 months",
    lessons: 68,
    rating: 4.8,
    reviews: 820,
    price: "₹22,000",
    oldPrice: "₹34,000",
    students: 2240,
    instructor: "Kabir Singh",
    instructorRole: "Senior Analyst, Deloitte",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    accent: "from-brand-700 to-brand-900",
    description:
      "Turn raw data into decisions with Python, SQL, Pandas and Tableau. Real case studies included."
  },
  {
    slug: "leadership-excellence",
    title: "Leadership Excellence Program",
    category: "Business",
    level: "Advanced",
    duration: "5 months",
    lessons: 64,
    rating: 4.9,
    reviews: 420,
    price: "₹58,000",
    oldPrice: "₹86,000",
    students: 760,
    instructor: "Dr. Meera Kapoor",
    instructorRole: "Ex-McKinsey Partner",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80",
    accent: "from-gold-600 to-brand-900",
    description:
      "For emerging managers: strategy, communication, negotiation, and building high-performance teams."
  },
  {
    slug: "ux-research",
    title: "UX Research & Strategy",
    category: "Design",
    level: "Intermediate",
    duration: "2 months",
    lessons: 42,
    rating: 4.7,
    reviews: 310,
    price: "₹16,000",
    oldPrice: "₹24,000",
    students: 540,
    instructor: "Siddharth Rao",
    instructorRole: "Head of UX, Swiggy",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=80",
    accent: "from-brand-600 to-brand-900",
    description:
      "From user interviews to insight-driven roadmaps — learn how the best product teams research."
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps Specialization",
    category: "Data & AI",
    level: "Intermediate",
    duration: "4 months",
    lessons: 96,
    rating: 4.8,
    reviews: 710,
    price: "₹38,000",
    oldPrice: "₹56,000",
    students: 1380,
    instructor: "Vivek Nair",
    instructorRole: "SRE Lead, AWS",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80",
    accent: "from-brand-900 to-gold-600",
    description:
      "AWS, Docker, Kubernetes, Terraform & CI/CD — deploy, monitor and scale like a senior engineer."
  },
  {
    slug: "startup-founders",
    title: "Startup Founders' Launchpad",
    category: "Business",
    level: "Advanced",
    duration: "3 months",
    lessons: 52,
    rating: 4.9,
    reviews: 280,
    price: "₹44,000",
    oldPrice: "₹66,000",
    students: 420,
    instructor: "Ritu Malhotra",
    instructorRole: "Founder, 2 unicorns",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=900&q=80",
    accent: "from-gold-500 to-gold-700",
    description:
      "Idea to MVP to traction — a hands-on program with investor office hours and weekly mentoring."
  }
];

export type Testimonial = {
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
  course?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Aarav Sharma",
    role: "ML Engineer · Amazon",
    avatar: "https://i.pravatar.cc/150?img=12",
    quote:
      "NextToGen transformed my career. The AI bootcamp was brutal in the best way — within 8 weeks I was shipping production models, and within 6 months I landed my dream role.",
    rating: 5,
    course: "AI & Machine Learning Bootcamp"
  },
  {
    name: "Neha Kapoor",
    role: "Product Designer · Razorpay",
    avatar: "https://i.pravatar.cc/150?img=47",
    quote:
      "The mentors care deeply. I went from being a nervous graphic designer to a confident product designer leading payments UX at a top fintech.",
    rating: 5,
    course: "Product Design Masterclass"
  },
  {
    name: "Rohan Verma",
    role: "Founder · Stackwise",
    avatar: "https://i.pravatar.cc/150?img=33",
    quote:
      "Startup Launchpad gave me clarity, community and capital — we raised our seed round 3 months after graduating. Worth every rupee.",
    rating: 5,
    course: "Startup Founders' Launchpad"
  },
  {
    name: "Ishita Ghosh",
    role: "Data Analyst · Zomato",
    avatar: "https://i.pravatar.cc/150?img=45",
    quote:
      "I switched from non-tech to data analytics in 3 months. The projects and career coaching made all the difference.",
    rating: 5,
    course: "Data Analytics with Python"
  },
  {
    name: "Vikram Patel",
    role: "SDE-2 · Flipkart",
    avatar: "https://i.pravatar.cc/150?img=15",
    quote:
      "Full-stack program was structured, rigorous and extremely practical. I solved 200+ system design questions and cracked 4 offers.",
    rating: 5,
    course: "Full-Stack Web Development"
  },
  {
    name: "Sana Khan",
    role: "Senior Marketing Manager · Nykaa",
    avatar: "https://i.pravatar.cc/150?img=49",
    quote:
      "Best learning investment I've made. The Digital Marketing program paid for itself in the first 30 days of applying what I learned.",
    rating: 5,
    course: "Digital Marketing Pro"
  }
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  avatar: string;
  image: string;
};

export const featuredPosts: BlogPost[] = [
  {
    slug: "future-of-ai-education",
    title: "The Future of AI in Education: What Learners Must Know in 2026",
    excerpt:
      "AI isn't replacing learners — it's replacing learners who don't use AI. Here's how to stay ahead in a fast-changing world.",
    category: "AI & Future",
    date: "Sep 12, 2026",
    readTime: "7 min read",
    author: "Dr. Arjun Mehta",
    avatar: "https://i.pravatar.cc/100?img=12",
    image:
      "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80"
  },
  {
    slug: "design-thinking-products",
    title: "Design Thinking: How Top Teams Build Products People Love",
    excerpt:
      "A behind-the-scenes look at the design frameworks used at Apple, Airbnb and our very own NextToGen studios.",
    category: "Design",
    date: "Sep 05, 2026",
    readTime: "9 min read",
    author: "Priya Nair",
    avatar: "https://i.pravatar.cc/100?img=47",
    image:
      "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    slug: "career-switch-playbook",
    title: "The Career-Switch Playbook: From Non-Tech to Top-Tech in 6 Months",
    excerpt:
      "A real, actionable plan based on 2,000+ NextToGen alumni who made the leap successfully.",
    category: "Career",
    date: "Aug 28, 2026",
    readTime: "11 min read",
    author: "Ritu Malhotra",
    avatar: "https://i.pravatar.cc/100?img=5",
    image:
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80"
  }
];

export const allPosts: BlogPost[] = [
  ...featuredPosts,
  {
    slug: "mentorship-matters",
    title: "Why 1:1 Mentorship is the Secret Sauce of Effective Learning",
    excerpt:
      "Research shows that mentorship improves retention by 76%. Here's how we designed our mentorship program.",
    category: "Learning",
    date: "Aug 20, 2026",
    readTime: "6 min read",
    author: "Dr. Meera Kapoor",
    avatar: "https://i.pravatar.cc/100?img=23",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    slug: "indian-startups-2026",
    title: "The State of Indian Startups in 2026: Opportunities & Talent Gaps",
    excerpt:
      "What founders are hiring for, which sectors are booming, and how to position yourself for the boom.",
    category: "Business",
    date: "Aug 12, 2026",
    readTime: "8 min read",
    author: "Kabir Singh",
    avatar: "https://i.pravatar.cc/100?img=33",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80"
  },
  {
    slug: "learning-how-to-learn",
    title: "Learning How to Learn: The Science of Rapid Skill Acquisition",
    excerpt:
      "Spaced repetition, deliberate practice, and other evidence-backed techniques used by world-class performers.",
    category: "Learning",
    date: "Aug 03, 2026",
    readTime: "10 min read",
    author: "Ishita Ghosh",
    avatar: "https://i.pravatar.cc/100?img=45",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80"
  }
];

export const faqs = [
  {
    q: "How long do I get access to the course material?",
    a: "You get lifetime access to all course content, including future updates. Our community and mentorship sessions remain available to alumni forever."
  },
  {
    q: "Are there any prerequisites to enroll?",
    a: "Beginner programs require no prior experience. Intermediate and advanced programs list prerequisites on their detail pages, and our admissions team can help you pick the right level."
  },
  {
    q: "Do you offer job placement support?",
    a: "Yes — we offer resume reviews, mock interviews, employer introductions, and dedicated career coaching until you get hired. Our placement rate is 94%."
  },
  {
    q: "Can I pay in installments or get a scholarship?",
    a: "Absolutely. We offer 0% EMIs and need-based scholarships covering up to 100% of tuition. Visit the Support Us page to apply."
  },
  {
    q: "What if I'm not satisfied with the course?",
    a: "We offer a 14-day money-back guarantee on all our programs. If it's not right for you, we'll refund every rupee, no questions asked."
  }
];
