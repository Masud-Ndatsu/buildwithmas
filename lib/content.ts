export type SectionKey = "projects" | "services" | "about" | "contact";

export type Social = {
  label: string;
  href: string;
};

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectStatus = "live" | "in-development" | "private";

export const statusLabels: Record<ProjectStatus, string> = {
  live: "Live",
  "in-development": "In development",
  private: "Private",
};

export type Project = {
  num: string;
  name: string;
  descriptor: string;
  /** One line, panel-visible: what made this non-trivial. Omit until written. */
  constraint?: string;
  problem: string;
  solution: string;
  /** Measurable, verifiable result. Omit rather than approximate. */
  outcome?: string;
  /** Short stat chips backing the outcome — real numbers only. */
  metrics?: string[];
  arch: string[];
  stack: string[];
  /**
   * Deployment state shown on the panel. Placeholder — every project is set
   * to "in-development" so nothing claims to be reachable when it is not.
   * Set the real value per project, and add `liveUrl` for the live ones.
   */
  status: ProjectStatus;
  /** Public URL, linked from the status badge when the project is live. */
  liveUrl?: string;
  /** Rendered in the panel footer. Omit until a real destination exists. */
  links?: ProjectLink[];
  /**
   * Optional capture shown beside the architecture diagram. Drop the file in
   * `public/` and point `src` at it; a missing file falls back to a labelled
   * frame rather than breaking the layout.
   */
  shot?: { src: string; alt: string };
};

export type Service = {
  num: string;
  title: string;
  blurb: string;
  items: string[];
};

export const sections: Record<SectionKey, { title: string; meta: string }> = {
  projects: { title: "Projects", meta: "04 Selected" },
  services: { title: "Services", meta: "04 Areas" },
  about: { title: "About", meta: "Profile" },
  contact: { title: "Contact", meta: "Available" },
};

/**
 * How a section reads. The canvas suits sets of peer items; About is one
 * continuous piece of biography, so it scrolls top to bottom instead.
 */
export const sectionLayout: Record<SectionKey, "canvas" | "document"> = {
  projects: "canvas",
  services: "canvas",
  about: "document",
  contact: "canvas",
};

export const sectionOrder: SectionKey[] = [
  "projects",
  "services",
  "about",
  "contact",
];

export const profile = {
  name: "Mas'ud Ndatsu",
  role: "Backend & Distributed\nSystems Engineer",
  headline: "I build systems that\nare designed to scale.",
  summary:
    "I design and build reliable backend systems, infrastructure, and distributed applications.",
  /** About intro: the display statement and the paragraph supporting it. */
  bio: {
    statement:
      "I'm Mas'ud, a backend-focused software engineer interested in the infrastructure behind modern software systems.",
    detail:
      "I work on the parts of a product that have to keep working: services, data models, queues, deployments, and the operational surface around them.",
  },
  disciplines: [
    "Backend Engineering",
    "Distributed Systems",
    "Cloud Infrastructure",
    "DevOps",
    "AI Systems",
  ],
  location: "Abuja, NG · 09°04′N 07°29′E",
  email: "masudndatsu@gmail.com",
  github: {
    label: "github.com/Masud-Ndatsu",
    href: "https://github.com/Masud-Ndatsu",
  },
  /**
   * The handle from the design file was not correct. Fill this in and the
   * contact panel entry and the `sameAs` structured data both reappear.
   */
  linkedin: null as Social | null,
};

export const projects: Project[] = [
  {
    num: "01",
    name: "Ambitful",
    descriptor: "AI-powered opportunity discovery platform",
    constraint:
      "Scholarship, fellowship and grant listings go stale faster than manual curation can keep up, across hundreds of inconsistent sources.",
    problem:
      "Scholarships, fellowships, internships and grants are scattered across hundreds of inconsistent sources, and listings go stale faster than any team can curate them by hand.",
    solution:
      "Extraction runs on Gemini instead of hand-written scrapers per source, so adding a new opportunity site doesn't mean shipping new parsing code. But the model's output isn't trusted directly: every extracted record sits behind a moderator approval step before it reaches search, because a wrong deadline or funding amount is a worse failure than a slower publish.",
    outcome:
      "Live at ambitful.ai. The pipeline has sourced 1,000+ opportunities and produced 2,500+ generated applications, reclaiming an estimated 4,000+ hours of manual application work for users.",
    metrics: ["1,000+ opportunities", "2,500+ applications", "4,000+ hrs reclaimed"],
    arch: [
      "Automated opportunity sourcing workers",
      "Gemini-assisted field extraction",
      "Fingerprint-based duplicate detection",
      "Moderator approval workflow",
      "Faceted search and filtering",
      "Notification infrastructure",
    ],
    stack: [
      "NestJS",
      "Next.js",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "RabbitMQ",
      "Gemini",
      "Cloudinary",
      "AWS",
    ],
    status: "live",
    liveUrl: "https://ambitful.ai",
    links: [{ label: "Visit Ambitful", href: "https://ambitful.ai" }],
    shot: { src: "/images/projects/ambitful-home.jpg", alt: "Ambitful homepage" },
  },
  {
    num: "02",
    name: "Carbon Adjust",
    descriptor: "Backend platform for energy, financial and carbon workflows",
    problem:
      "Energy usage data, customer wallets and carbon accounting each carried their own rules, and settlement had to stay correct across all three.",
    solution:
      "A transactional core with an idempotent ledger, wallet operations behind explicit state transitions, and clear API boundaries between energy ingestion, payment processing and reporting.",
    arch: [
      "Wallet and ledger infrastructure",
      "Stripe payment and payout flows",
      "Energy data ingestion",
      "Versioned API architecture",
      "Idempotent transaction processing",
    ],
    stack: ["Node.js", "PostgreSQL", "Redis", "Stripe", "Cloud Infrastructure"],
    status: "in-development",
  },
  {
    num: "03",
    name: "NebulaEngage",
    descriptor: "Coaching marketplace connecting experts with career-seekers",
    constraint:
      "Coaches needed to publish programs and have clients discover, follow and book them — part marketplace, part social graph.",
    problem:
      "Coaches wanted to publish structured programs — mock interviews, mentorship tracks, career guidance — and have clients discover, follow and book them, which sits between a marketplace and a social graph rather than fitting cleanly into either.",
    solution:
      "Coach profiles and programs live in an ordinary marketplace catalogue, but follows and discovery activity run through a separate write path instead of being bolted onto the catalogue schema — so a spike in social activity can't degrade the booking and payment reads that actually make the platform money.",
    outcome:
      "Live at nebulaengage.com, connecting 30+ coaches from companies including Google, Meta, McKinsey and Goldman Sachs with 500+ users to date.",
    metrics: ["30+ coaches", "10+ companies", "500+ users"],
    arch: [
      "Marketplace catalogue architecture",
      "Program / collection management model",
      "Follow & discovery write path",
      "Coach-client relationships",
      "Session booking and scheduling",
    ],
    stack: ["Node.js", "PostgreSQL", "Redis", "Cloud Infrastructure"],
    status: "live",
    liveUrl: "https://nebulaengage.com",
    links: [{ label: "Visit NebulaEngage", href: "https://nebulaengage.com" }],
    shot: { src: "/images/projects/nebulaengage-home.jpg", alt: "NebulaEngage homepage" },
  },
  {
    num: "04",
    name: "User Management System",
    descriptor: "Microservice-based user management infrastructure",
    problem:
      "Several products needed the same identity primitives without sharing one another's schemas or release cycles.",
    solution:
      "Independent services with isolated databases, token-based authentication at the edge, and a documented API contract between service boundaries.",
    arch: [
      "Explicit service boundaries",
      "Authentication and token issuance",
      "Per-service database isolation",
      "Contract-first API design",
      "Distributed deployment topology",
    ],
    stack: ["NestJS", "PostgreSQL", "Redis", "Docker", "RabbitMQ"],
    status: "in-development",
  },
];

export const services: Service[] = [
  {
    num: "01",
    title: "Backend Engineering",
    blurb: "Production services that hold up under real traffic and real data.",
    items: [
      "Production APIs",
      "Business logic",
      "Authentication",
      "Database architecture",
    ],
  },
  {
    num: "02",
    title: "Distributed Systems",
    blurb: "Decoupling work across services without losing correctness.",
    items: ["Event-driven systems", "Messaging", "Queues", "Service architecture"],
  },
  {
    num: "03",
    title: "Cloud & DevOps",
    blurb: "Repeatable delivery and the visibility to operate what ships.",
    items: ["CI/CD", "Containers", "Cloud infrastructure", "Observability"],
  },
  {
    num: "04",
    title: "AI Systems",
    blurb: "Model-backed features built as ordinary, testable backend surface.",
    items: ["LLM integrations", "RAG", "AI agents", "AI-enabled backend systems"],
  },
];

export const engineering = [
  "Backend Systems",
  "Distributed Systems",
  "Infrastructure",
  "Cloud Computing",
  "Developer Infrastructure",
  "AI Systems",
];

export const technology: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["TypeScript", "JavaScript", "Go"] },
  { group: "Backend", items: ["Node.js", "NestJS", "Express"] },
  { group: "Data", items: ["PostgreSQL", "Redis", "MongoDB"] },
  { group: "Infrastructure", items: ["Docker", "Kubernetes", "AWS", "CI/CD"] },
  { group: "Messaging", items: ["RabbitMQ", "Event-driven systems"] },
];

export const currentFocus = {
  statement:
    "Distributed systems, cloud infrastructure and backend architecture.",
  tags: ["Systems engineering", "AI infrastructure", "Observability"],
};
