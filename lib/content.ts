export type Project = {
  slug: string;
  name: string;
  /** One sentence, plain language: what the product is. */
  tagline: string;
  /** Small category label, e.g. "Product · Backend · AI". */
  category: string;
  role: string;
  challenge: string;
  did: string;
  result: string;
  /** Real, verifiable numbers only. */
  metrics?: string[];
  technology: string[];
  liveUrl?: string;
  image?: { src: string; alt: string };
};

export const profile = {
  name: "Mas'ud Ndatsu",
  headline: "I turn ideas into reliable digital products.",
  intro:
    "I help startups and businesses build digital products, backend systems and AI-powered solutions.",
  short:
    "I'm Mas'ud, a software engineer focused on building reliable digital products, backend systems and AI-powered experiences.",
  email: "masudndatsu@gmail.com",
  github: { label: "GitHub", href: "https://github.com/Masud-Ndatsu" },
  // The handle from the earlier design was wrong. Add the real one and it
  // appears everywhere links are listed.
  linkedin: null as { label: string; href: string } | null,
};

export const channels = [
  { label: "Email", href: `mailto:${profile.email}`, text: profile.email },
  { label: "GitHub", href: profile.github.href, text: "github.com/Masud-Ndatsu" },
  ...(profile.linkedin
    ? [{ label: "LinkedIn", href: profile.linkedin.href, text: profile.linkedin.label }]
    : []),
];

export const whatIDo = [
  {
    title: "Build products",
    body: "Turn an idea into a working digital product.",
  },
  {
    title: "Build systems",
    body: "Build the backend and infrastructure that power products.",
  },
  {
    title: "Add AI",
    body: "Integrate useful AI capabilities into products and business workflows.",
  },
  {
    title: "Improve products",
    body: "Modernize, scale and improve existing software.",
  },
];

export const projects: Project[] = [
  {
    slug: "intera",
    name: "Intera",
    tagline:
      "A platform that helps international students settle into life abroad, with AI guidance, coaches and local events.",
    category: "Product · Mobile · AI",
    role: "Product engineering across the backend, mobile app and admin dashboard",
    challenge:
      "Moving to a new country means juggling visas, housing, building a community and finding work, usually with advice scattered across forums and group chats.",
    did:
      "Helped build the platform end to end: an AI assistant that answers questions based on a student's visa situation, a settling-in checklist, a coach marketplace where students book sessions, and events. It ships as a mobile app for students and coaches, with an internal admin dashboard for the team to run it.",
    result:
      "Live at joinintera.com, with the app available on the App Store and Google Play.",
    technology: ["Mobile app", "Admin dashboard", "AI assistant", "Backend APIs"],
    liveUrl: "https://www.joinintera.com/",
  },
  {
    slug: "ambitful",
    name: "Ambitful",
    tagline: "An AI-powered platform that helps people find scholarships, fellowships and grants.",
    category: "Product · Backend · AI",
    role: "Backend and AI systems",
    challenge:
      "Opportunities are scattered across hundreds of inconsistent websites, and listings go out of date faster than any team can keep up by hand.",
    did:
      "Built the pipeline that finds opportunities and reads them with AI, so adding a new source doesn't need new code. Every record is reviewed by a moderator before it is published, because a wrong deadline is worse than a slow one.",
    result:
      "Live at ambitful.ai, with 1,000+ opportunities sourced and 2,500+ applications generated, saving users an estimated 4,000+ hours of manual work.",
    metrics: ["1,000+ opportunities", "2,500+ applications", "4,000+ hours saved"],
    technology: ["NestJS", "Next.js", "PostgreSQL", "Redis", "RabbitMQ", "Gemini", "AWS"],
    liveUrl: "https://ambitful.ai",
    image: { src: "/images/projects/ambitful-home.jpg", alt: "The Ambitful homepage" },
  },
  {
    slug: "nebulaengage",
    name: "NebulaEngage",
    tagline: "A coaching marketplace connecting career-seekers with professional coaches.",
    category: "Product · Backend",
    role: "Backend and platform infrastructure",
    challenge:
      "Coaches needed to publish programs that clients could discover, follow and book. That sits between a marketplace and a social network.",
    did:
      "Designed the backend so that following and discovery activity runs separately from booking and payments. A spike in browsing can't slow down the parts that make the platform money.",
    result:
      "Live at nebulaengage.com, connecting 30+ coaches from companies like Google, Meta, McKinsey and Goldman Sachs with 500+ users.",
    metrics: ["30+ coaches", "500+ users"],
    technology: ["Node.js", "PostgreSQL", "Redis", "Cloud infrastructure"],
    liveUrl: "https://nebulaengage.com",
    image: { src: "/images/projects/nebulaengage-home.jpg", alt: "The NebulaEngage homepage" },
  },
  {
    slug: "kayode-kolade",
    name: "Kayode Kolade",
    tagline:
      "A personal website for an executive coach and operating advisor, built to turn visitors into conversations.",
    category: "Product · Web",
    role: "Design and web development",
    challenge:
      "An advisor with a premium, one-to-one practice needed a site that explains his work clearly to executives and founders, and gives them an easy way to get in touch.",
    did:
      "Built the website: clear pages for each area of his work, a home for his writing, testimonials and an impact page, plus contact and newsletter signup.",
    result: "Live at thekayodekolade.com.",
    technology: ["Web development", "Content publishing", "Newsletter"],
    liveUrl: "https://www.thekayodekolade.com/",
  },
  {
    slug: "carbon-adjust",
    name: "Carbon Adjust",
    tagline: "The backend behind energy, payments and carbon-tracking workflows.",
    category: "Backend · Payments",
    role: "Backend engineering",
    challenge:
      "Energy usage, customer wallets and carbon accounting each had their own rules, and money had to stay correct across all three.",
    did:
      "Built a transaction core where every payment is safe to retry, wallet changes follow explicit rules, and energy data, payments and reporting are cleanly separated.",
    result: "A working platform foundation, currently in development.",
    technology: ["Node.js", "PostgreSQL", "Redis", "Stripe"],
  },
  {
    slug: "user-management",
    name: "User Management System",
    tagline: "Shared sign-in and account infrastructure that several products can rely on.",
    category: "Backend · Infrastructure",
    role: "Architecture and backend engineering",
    challenge:
      "Several products needed the same identity features without sharing databases or being forced to release at the same time.",
    did:
      "Split identity into independent services with their own databases, token-based sign-in and a documented contract between them.",
    result: "A reusable account system, currently in development.",
    technology: ["NestJS", "PostgreSQL", "Redis", "Docker", "RabbitMQ"],
  },
];

export const featuredProjects = projects.slice(0, 3);

export const experience = [
  {
    period: "2024 — Present",
    role: "Backend Engineer",
    org: "Oaks Intelligence",
    body: "Building backend systems and software products.",
  },
];

export const capabilities = [
  { title: "Backend", body: "APIs · Applications · Databases" },
  { title: "AI", body: "AI features · Agents · Automation" },
  { title: "Systems", body: "Architecture · Infrastructure · Integrations" },
  { title: "Product", body: "Product development · Technical strategy" },
];
