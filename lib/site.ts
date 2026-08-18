/**
 * Canonical origin for metadata, sitemap and OG image URLs.
 *
 * Override per-environment with NEXT_PUBLIC_SITE_URL (e.g. a preview
 * deployment) — it must be an absolute origin with no trailing slash.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://buildwithmas.com"
).replace(/\/+$/, "");

export const siteName = "Mas'ud Ndatsu";

export const jobTitle = "Backend & Distributed Systems Engineer";

export const siteTitle = `${siteName} — ${jobTitle}`;

export const siteDescription =
  "Mas'ud Ndatsu — Backend & Distributed Systems Engineer. Reliable backend systems, infrastructure and distributed applications.";

export const siteKeywords = [
  "backend engineer",
  "distributed systems",
  "cloud infrastructure",
  "DevOps",
  "AI systems",
  "Node.js",
  "NestJS",
  "PostgreSQL",
  "Kubernetes",
  "software engineer Abuja",
  "Mas'ud Ndatsu",
];
