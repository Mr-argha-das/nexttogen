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
  instructorBio?: string;
  image: string;
  bannerImage?: string;
  accent: string; // tailwind color classes
  bestseller?: boolean;
  description: string;
  longDescription?: string; // markdown-like paragraphs
  whatYouLearn?: string[];
  requirements?: string[];
  curriculum?: { title: string; lessons: string[] }[];
  includes?: string[]; // sidebar bullets
};

export const categories = [
  { name: "All Courses", count: 7, icon: "BookOpen" },
  { name: "Design", count: 2, icon: "Palette" },
  { name: "Motion & Video", count: 2, icon: "Film" },
  { name: "3D & Animation", count: 1, icon: "Box" },
  { name: "Development", count: 1, icon: "Code" },
  { name: "AI", count: 1, icon: "Cpu" }
];

export const allCourses: Course[] = [
  {
    slug: "graphic-design",
    title: "Graphic Design",
    category: "Design",
    level: "Beginner",
    duration: "4 months",
    lessons: 96,
    rating: 0,
    reviews: 0,
    price: "₹28,000",
    oldPrice: "₹40,000",
    students: 0,
    instructor: "",
    instructorRole: "",
    image: "/courses/graphic-design.jpg",
    accent: "from-brand-700 to-brand-950",
    bestseller: true,
    description:
      "Master the fundamentals of visual design — typography, colour, layout and branding — using Photoshop, Illustrator and Figma to build a standout portfolio.",
    longDescription:
      "Learn to think like a designer and communicate ideas visually. From the principles of composition and colour theory to building complete brand identities, this program takes you from the basics to industry-ready.\n\nYou will work on real briefs — logos, posters, social media kits and brand systems — and finish with a polished portfolio that gets you hired or freelance-ready.",
    whatYouLearn: [
      "Design principles: layout, balance, hierarchy & grids",
      "Typography and colour theory in practice",
      "Adobe Photoshop, Illustrator & Figma workflows",
      "Logo design and complete brand identity systems",
      "Social media, print & marketing creatives",
      "Building a professional design portfolio"
    ],
    requirements: [
      "No prior design experience needed",
      "A laptop capable of running design software",
      "Curiosity and willingness to practise"
    ],
    curriculum: [
      { title: "Design Foundations", lessons: ["Principles of design", "Colour theory", "Typography basics", "Composition & grids"] },
      { title: "Tools of the Trade", lessons: ["Photoshop essentials", "Illustrator & vectors", "Figma for designers", "Image editing & retouching"] },
      { title: "Branding & Identity", lessons: ["Logo design process", "Building brand systems", "Social & print creatives", "Style guides"] },
      { title: "Portfolio", lessons: ["Live client brief", "Case studies", "Portfolio build", "Presentation & review"] }
    ],
    includes: [
      "Lifetime access to all content",
      "Hands-on live projects",
      "1:1 mentor feedback",
      "Portfolio-ready work",
      "Certificate on completion"
    ]
  },
  {
    slug: "video-editing",
    title: "Video Editing",
    category: "Motion & Video",
    level: "Beginner",
    duration: "3 months",
    lessons: 72,
    rating: 0,
    reviews: 0,
    price: "₹26,000",
    oldPrice: "₹38,000",
    students: 0,
    instructor: "",
    instructorRole: "",
    image: "/courses/video-editing.jpg",
    accent: "from-brand-800 to-brand-950",
    description:
      "Cut, colour and craft cinematic videos with Premiere Pro and DaVinci Resolve — from reels and ads to YouTube and short films.",
    longDescription:
      "Editing is storytelling. In this program you will learn the craft of pacing, sound and colour that turns raw footage into engaging video.\n\nWork across real formats — social reels, brand ads, YouTube content and short films — and leave with a reel that shows off your editing style.",
    whatYouLearn: [
      "Editing workflow in Premiere Pro & DaVinci Resolve",
      "Cutting for pace, rhythm and storytelling",
      "Colour correction and cinematic colour grading",
      "Sound design, music and audio mixing",
      "Transitions, titles and export settings",
      "Editing reels, ads and long-form content"
    ],
    requirements: [
      "No prior editing experience required",
      "A laptop that can run editing software",
      "Sample footage (provided) to practise with"
    ],
    curriculum: [
      { title: "Editing Basics", lessons: ["The editing mindset", "Premiere Pro interface", "Timeline & cutting", "Organising footage"] },
      { title: "Colour & Sound", lessons: ["Colour correction", "Cinematic grading", "Audio cleanup & mixing", "Music & sound design"] },
      { title: "Polish & Deliver", lessons: ["Transitions & effects", "Titles & motion", "Export presets", "Publishing for platforms"] }
    ],
    includes: [
      "Lifetime access to all content",
      "Practice footage packs",
      "1:1 mentor feedback",
      "Reel-ready projects",
      "Certificate on completion"
    ]
  },
  {
    slug: "motion-graphic-design",
    title: "Motion Graphic Design",
    category: "Motion & Video",
    level: "Intermediate",
    duration: "4 months",
    lessons: 88,
    rating: 0,
    reviews: 0,
    price: "₹34,000",
    oldPrice: "₹48,000",
    students: 0,
    instructor: "",
    instructorRole: "",
    image: "/courses/motion-graphics.jpg",
    accent: "from-brand-700 to-brand-950",
    bestseller: true,
    description:
      "Bring designs to life with After Effects — animated logos, explainer videos, kinetic typography and slick UI motion.",
    longDescription:
      "Motion design sits at the intersection of graphic design and animation. Learn to animate with intention — timing, easing and rhythm — using Adobe After Effects.\n\nBuild animated logos, explainer videos, kinetic typography and interface animations that feel alive and professional.",
    whatYouLearn: [
      "After Effects workflow and keyframing",
      "Animation principles: timing, easing, anticipation",
      "Animated logos and brand stings",
      "Kinetic typography and text animation",
      "Explainer videos and infographics",
      "UI/UX motion and micro-interactions"
    ],
    requirements: [
      "Basic familiarity with design tools helps",
      "A laptop that can run After Effects",
      "Completion of Graphic Design (or equivalent) recommended"
    ],
    curriculum: [
      { title: "Motion Foundations", lessons: ["Principles of animation", "After Effects interface", "Keyframes & easing", "Shape layers"] },
      { title: "Animating Design", lessons: ["Animated logos", "Kinetic typography", "Icon & UI animation", "Working with audio"] },
      { title: "Explainers & Delivery", lessons: ["Explainer video build", "Camera & 3D layers", "Rendering & export", "Portfolio piece"] }
    ],
    includes: [
      "Lifetime access to all content",
      "Project files & templates",
      "1:1 mentor feedback",
      "Portfolio-ready animations",
      "Certificate on completion"
    ]
  },
  {
    slug: "3d-animation",
    title: "3D Animation",
    category: "3D & Animation",
    level: "Intermediate",
    duration: "6 months",
    lessons: 120,
    rating: 0,
    reviews: 0,
    price: "₹52,000",
    oldPrice: "₹72,000",
    students: 0,
    instructor: "",
    instructorRole: "",
    image: "/courses/3d-animation.jpg",
    accent: "from-brand-800 to-brand-950",
    description:
      "Model, texture, rig and animate in Blender — create 3D characters, product renders and animated scenes from scratch.",
    longDescription:
      "Step into the world of 3D. Using Blender, you will learn the full pipeline — modelling, texturing, lighting, rigging and animation — to create stunning 3D visuals.\n\nFrom product renders to animated characters, you will build a demo reel that showcases real 3D craft.",
    whatYouLearn: [
      "3D modelling and sculpting in Blender",
      "Materials, texturing and UV mapping",
      "Lighting and photorealistic rendering",
      "Rigging characters and objects",
      "Keyframe and character animation",
      "Product renders and animated scenes"
    ],
    requirements: [
      "No prior 3D experience needed",
      "A computer with a dedicated GPU recommended",
      "Patience — 3D rewards practice"
    ],
    curriculum: [
      { title: "3D Modelling", lessons: ["Blender fundamentals", "Modelling techniques", "Sculpting basics", "UV unwrapping"] },
      { title: "Look Development", lessons: ["Materials & shaders", "Texturing", "Lighting", "Rendering & cameras"] },
      { title: "Animation", lessons: ["Rigging basics", "Keyframe animation", "Character animation", "Physics & simulation"] },
      { title: "Demo Reel", lessons: ["Product render", "Animated scene", "Compositing", "Reel assembly"] }
    ],
    includes: [
      "Lifetime access to all content",
      "Starter assets & scenes",
      "1:1 mentor feedback",
      "Demo-reel projects",
      "Certificate on completion"
    ]
  },
  {
    slug: "web-design",
    title: "Web Design",
    category: "Design",
    level: "Beginner",
    duration: "3 months",
    lessons: 78,
    rating: 0,
    reviews: 0,
    price: "₹30,000",
    oldPrice: "₹42,000",
    students: 0,
    instructor: "",
    instructorRole: "",
    image: "/courses/web-design.jpg",
    accent: "from-brand-700 to-brand-950",
    description:
      "Design beautiful, user-friendly websites and apps with Figma — UX fundamentals, responsive layouts, design systems and prototypes.",
    longDescription:
      "Great products start with great design. Learn UI/UX from the ground up — research, wireframes, visual design and interactive prototypes — all in Figma.\n\nYou will design responsive websites and mobile apps, build a reusable design system, and finish with case-study projects for your portfolio.",
    whatYouLearn: [
      "UX fundamentals and user research",
      "Wireframing and information architecture",
      "Visual UI design and design systems",
      "Responsive web and mobile layouts",
      "Interactive prototyping in Figma",
      "Handoff and design-to-dev workflow"
    ],
    requirements: [
      "No prior experience required",
      "A laptop and a free Figma account",
      "An eye for detail"
    ],
    curriculum: [
      { title: "UX Foundations", lessons: ["Design thinking", "User research", "Wireframes", "Information architecture"] },
      { title: "UI Design", lessons: ["Figma mastery", "Visual design", "Design systems & components", "Responsive layouts"] },
      { title: "Prototype & Ship", lessons: ["Interactive prototypes", "Usability testing", "Developer handoff", "Portfolio case studies"] }
    ],
    includes: [
      "Lifetime access to all content",
      "Figma component kits",
      "1:1 mentor feedback",
      "Portfolio case studies",
      "Certificate on completion"
    ]
  },
  {
    slug: "web-development",
    title: "Web Development",
    category: "Development",
    level: "Beginner",
    duration: "6 months",
    lessons: 140,
    rating: 0,
    reviews: 0,
    price: "₹45,000",
    oldPrice: "₹64,000",
    students: 0,
    instructor: "",
    instructorRole: "",
    image: "/courses/web-development.jpg",
    accent: "from-brand-800 to-brand-950",
    bestseller: true,
    description:
      "Become a full-stack developer — HTML, CSS, JavaScript, React, Next.js and Node.js — and ship real, production-ready web apps.",
    longDescription:
      "Go from zero to full-stack. Start with the fundamentals of the web, then build modern interfaces with React and Next.js and power them with a Node.js backend and database.\n\nYou will ship multiple real projects and finish with production-grade apps deployed live — the portfolio that lands developer jobs.",
    whatYouLearn: [
      "HTML, CSS and modern JavaScript",
      "React and Next.js for modern UIs",
      "Node.js APIs and databases",
      "Authentication, deployment and Git",
      "Responsive, accessible interfaces",
      "Building and shipping full-stack apps"
    ],
    requirements: [
      "No prior coding experience needed",
      "A laptop and internet connection",
      "Consistency and problem-solving mindset"
    ],
    curriculum: [
      { title: "Web Fundamentals", lessons: ["How the web works", "HTML & semantics", "CSS & layouts", "JavaScript basics"] },
      { title: "Frontend with React", lessons: ["Modern JavaScript", "React fundamentals", "Next.js & routing", "State & data fetching"] },
      { title: "Backend & Data", lessons: ["Node.js & APIs", "Databases", "Authentication", "REST & server logic"] },
      { title: "Ship It", lessons: ["Git & collaboration", "Deployment", "Capstone project", "Portfolio & interviews"] }
    ],
    includes: [
      "Lifetime access to all content",
      "3 capstone projects",
      "1:1 mentor feedback",
      "Deployed live apps",
      "Certificate on completion"
    ]
  },
  {
    slug: "ai",
    title: "Artificial Intelligence",
    category: "AI",
    level: "Intermediate",
    duration: "5 months",
    lessons: 110,
    rating: 0,
    reviews: 0,
    price: "₹49,000",
    oldPrice: "₹68,000",
    students: 0,
    instructor: "",
    instructorRole: "",
    image: "/courses/ai.jpg",
    accent: "from-brand-700 to-brand-950",
    bestseller: true,
    description:
      "Understand and build with AI — Python, machine learning, deep learning and generative AI, including LLMs and prompt engineering.",
    longDescription:
      "AI is reshaping every industry. This program gives you both the intuition and the hands-on skills — from Python and classical machine learning to deep learning and modern generative AI.\n\nBuild real projects: predictive models, computer-vision apps and generative-AI tools powered by large language models, and learn how to apply them responsibly.",
    whatYouLearn: [
      "Python for data and AI",
      "Machine learning fundamentals",
      "Deep learning and neural networks",
      "Natural language processing basics",
      "Generative AI, LLMs and prompt engineering",
      "Building and deploying AI-powered apps"
    ],
    requirements: [
      "Basic maths and logical thinking",
      "Some programming exposure helps (not mandatory)",
      "A laptop with internet access"
    ],
    curriculum: [
      { title: "Foundations", lessons: ["Python essentials", "Data handling with pandas", "Maths intuition for ML", "The AI landscape"] },
      { title: "Machine Learning", lessons: ["Supervised learning", "Model evaluation", "Feature engineering", "Real ML project"] },
      { title: "Deep Learning", lessons: ["Neural networks", "Computer vision", "NLP basics", "Training & tuning"] },
      { title: "Generative AI", lessons: ["LLMs explained", "Prompt engineering", "Building with APIs", "Capstone AI app"] }
    ],
    includes: [
      "Lifetime access to all content",
      "Hands-on notebooks & datasets",
      "1:1 mentor feedback",
      "Deployable AI projects",
      "Certificate on completion"
    ]
  }
];

export const featuredCourses: Course[] = allCourses.slice(0, 3);


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
  content?: string; // rich text paragraphs separated by \n\n
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
