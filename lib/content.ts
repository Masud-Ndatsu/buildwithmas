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
  /** Long-form case study, shown only on the project's own page. */
  details?: {
    overview: string;
    built: { title: string; body: string }[];
    learned: string;
  };
};

export const profile = {
  name: "Mas'ud Ndatsu",
  headline: "I build the software behind ambitious ideas.",
  intro:
    "I help startups and businesses turn ideas into reliable digital products, backend systems, and AI-powered experiences.",
  email: "masudndatsu@gmail.com",
  github: { label: "GitHub", href: "https://github.com/Masud-Ndatsu" },
  // The handle from the earlier design was wrong. Add the real one and it
  // appears everywhere links are listed.
  linkedin: null as { label: string; href: string } | null,
  x: null as { label: string; href: string } | null,
};

export const channels = [
  { label: "Email", href: `mailto:${profile.email}`, text: profile.email },
  {
    label: "GitHub",
    href: profile.github.href,
    text: "github.com/Masud-Ndatsu",
  },
  ...(profile.linkedin
    ? [
        {
          label: "LinkedIn",
          href: profile.linkedin.href,
          text: profile.linkedin.label,
        },
      ]
    : []),
  ...(profile.x
    ? [{ label: "X", href: profile.x.href, text: profile.x.label }]
    : []),
];

export const whatIDo = {
  title: "From idea to working product.",
  intro:
    "I work across the parts of a product that matter most — turning ideas into software, building the systems behind them, and improving them as they grow.",
  items: [
    {
      title: "Build products",
      body: "Turn an idea, business process, or opportunity into a working digital product.",
    },
    {
      title: "Build systems",
      body: "Design and build the backend systems, APIs, integrations, and infrastructure that keep products running reliably.",
    },
    {
      title: "Build with AI",
      body: "Add practical AI capabilities that make products more useful, automated, and intelligent.",
    },
    {
      title: "Improve existing software",
      body: "Fix bottlenecks, modernize systems, improve reliability, and help existing products move forward.",
    },
  ],
};

export const projects: Project[] = [
  {
    slug: "intera",
    name: "Intera",
    tagline:
      "A platform helping international students settle into life abroad through AI guidance, coaching, and local experiences.",
    category: "Product · Mobile · AI",
    role: "Product engineering across the backend, mobile application, and admin platform.",
    challenge:
      "Moving to a new country means juggling visas, housing, building a community and finding work, usually with advice scattered across forums and group chats.",
    did: "Helped build the platform end to end: an AI assistant that answers questions based on a student's visa situation, a settling-in checklist, a coach marketplace where students book sessions, and events. It ships as a mobile app for students and coaches, with an internal admin dashboard for the team to run it.",
    result:
      "Live at joinintera.com, with the app available on the App Store and Google Play.",
    technology: [
      "Mobile app",
      "Admin dashboard",
      "AI assistant",
      "Backend APIs",
    ],
    liveUrl: "https://www.joinintera.com/",
    image: {
      src: "/images/projects/intera-home.png",
      alt: "The Intera homepage",
    },
  },
  {
    slug: "ambitful",
    name: "Ambitful",
    tagline:
      "An AI-powered platform helping people discover scholarships, fellowships, and grants.",
    category: "Product · Backend · AI",
    role: "Backend engineering and AI systems.",
    challenge:
      "Opportunities are scattered across hundreds of inconsistent websites, and listings go out of date faster than any team can keep up by hand.",
    did: "Built the pipeline that finds opportunities and reads them with AI, so adding a new source doesn't need new code. Every record is reviewed by a moderator before it is published, because a wrong deadline is worse than a slow one.",
    result:
      "Live at ambitful.ai, with 1,000+ opportunities sourced and 2,500+ applications generated, saving users an estimated 4,000+ hours of manual work.",
    metrics: [
      "1,000+ opportunities",
      "2,500+ applications",
      "4,000+ hours saved",
    ],
    technology: [
      "NestJS",
      "Next.js",
      "PostgreSQL",
      "Redis",
      "RabbitMQ",
      "Gemini",
      "AWS",
    ],
    liveUrl: "https://ambitful.ai",
    image: {
      src: "/images/projects/ambitful-home.jpg",
      alt: "The Ambitful homepage",
    },
  },
  {
    slug: "nebulaengage",
    name: "NebulaEngage",
    tagline:
      "A coaching marketplace connecting people with professional coaches.",
    category: "Product · Backend · Infrastructure",
    role: "Backend engineering, platform infrastructure, and core product systems.",
    challenge:
      "Coaches needed to publish programs that clients could discover, follow and book. That sits between a marketplace and a social network.",
    did: "Designed the backend so that following and discovery activity runs separately from booking and payments. A spike in browsing can't slow down the parts that make the platform money.",
    result:
      "Live at nebulaengage.com, connecting 30+ coaches from companies like Google, Meta, McKinsey and Goldman Sachs with 500+ users.",
    metrics: ["30+ coaches", "500+ users"],
    technology: ["Node.js", "PostgreSQL", "Redis", "Cloud infrastructure"],
    liveUrl: "https://nebulaengage.com",
    image: {
      src: "/images/projects/nebulaengage-home.jpg",
      alt: "The NebulaEngage homepage",
    },
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
    did: "Built the website: clear pages for each area of his work, a home for his writing, testimonials and an impact page, plus contact and newsletter signup.",
    result: "Live at thekayodekolade.com.",
    technology: ["Web development", "Content publishing", "Newsletter"],
    liveUrl: "https://www.thekayodekolade.com/",
    image: {
      src: "/images/projects/mr-kay-home.png",
      alt: "The Kayode Kolade website homepage",
    },
  },
  {
    slug: "carbon-adjust",
    name: "Carbon Adjust",
    tagline:
      "A NestJS backend for an energy and carbon platform: demand-flexibility dispatch, IoT device control and carbon analytics.",
    category: "Backend · Energy · Payments",
    role: "Backend engineer on a team of several, across commerce, authentication, flexibility dispatch and user analytics.",
    challenge:
      "Energy usage, physical devices, payments and carbon accounting each had their own rules, and the numbers had to agree across all of them.",
    did: "Built flexibility and spot-flex dispatch, user analytics for corporate and home-owner users, phone/OTP and SSO authentication, and the commerce layer, shipping through staging in small, reviewable pull requests.",
    result:
      "Contributed to a production backend connecting users, businesses and physical devices to energy and carbon outcomes.",
    technology: [
      "NestJS",
      "TypeScript",
      "MongoDB",
      "Redis",
      "BullMQ",
      "Socket.IO",
      "Stripe",
      "Firebase",
      "Tuya IoT",
    ],
    details: {
      overview:
        "Carbon Adjust connects users, businesses and physical devices to energy and carbon outcomes. I was one of several engineers on the backend, contributing across features, bug fixes and releases. My work spanned the commerce layer, authentication and admin tooling, flexibility dispatch, and user analytics.",
      built: [
        {
          title: "Flexibility and spot-flex dispatch",
          body: "Order endpoints, dispatch logic, ramp-down package handling and flexibility-completion rules. I also tuned the scheduled jobs (polling interval, cron timing) that pull device logs and move orders from ongoing to completed.",
        },
        {
          title: "User analytics",
          body: "Dashboards for corporate and home-owner users, including chart metrics, income, expense and transaction reporting, and carbon-footprint endpoints. I fixed data-synchronisation and mismatch issues between user types, and started on data export.",
        },
        {
          title: "Authentication and access control",
          body: "Phone/OTP verification (including OTP-gated virtual card views), role-scoped admin access, country assignment for admin staff, and SSO for the Discourse community forum.",
        },
        {
          title: "Commerce",
          body: "Package browsing and filtering by country, cart and favourites, location-based coupons with an apply-coupon endpoint, Stripe webhook handling, and super-merchant claims.",
        },
        {
          title: "Delivery workflow",
          body: "Short-lived feature and fix branches, then staging, then main, through numbered pull requests. I reverted and redid risky work, such as an AI API-key integration, to keep staging stable.",
        },
      ],
      learned:
        "Most of the hard problems sat between systems. Scheduled jobs had to stay consistent with real device state, analytics had to agree with the underlying transactions, and payment webhooks had to be reliable. I learned to keep scheduled work idempotent, to treat data reconciliation as a feature rather than a patch, and to ship changes through staging in small, reviewable PRs.",
    },
  },
  {
    slug: "user-management",
    name: "User Management System",
    tagline:
      "Shared sign-in and account infrastructure that several products can rely on.",
    category: "Backend · Infrastructure",
    role: "Architecture and backend engineering",
    challenge:
      "Several products needed the same identity features without sharing databases or being forced to release at the same time.",
    did: "Split identity into independent services with their own databases, token-based sign-in and a documented contract between them.",
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
