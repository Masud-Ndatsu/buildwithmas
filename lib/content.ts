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
  problem: string;
  solution: string;
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
    name: "Opportunity Platform",
    descriptor: "AI-powered opportunity discovery platform",
    problem:
      "Scholarships, fellowships, internships and grants are scattered across hundreds of inconsistent sources, and listings go stale faster than any team can curate them by hand.",
    solution:
      "A sourcing pipeline crawls and queues candidate listings, an LLM extraction step normalises them into structured records, and a review workflow lets moderators approve or reject before anything reaches search.",
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
    status: "in-development",
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
    name: "Collectiv",
    descriptor: "Social commerce around published product collections",
    problem:
      "Sellers wanted to publish curated collections and have customers discover, follow and share them, which sits between a marketplace and a social graph.",
    solution:
      "A marketplace catalogue with collection entities on top, social interactions modelled as their own write path, and read models shaped for discovery feeds.",
    arch: [
      "Marketplace catalogue architecture",
      "Collection management model",
      "Social interaction write path",
      "Business and customer relationships",
      "Product discovery feeds",
    ],
    stack: ["Node.js", "PostgreSQL", "Redis", "Cloud Infrastructure"],
    status: "in-development",
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
