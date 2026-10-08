/**
 * Canonical origin for metadata, sitemap and OG image URLs.
 *
 * Override per-environment with NEXT_PUBLIC_SITE_URL (e.g. a preview
 * deployment) — it must be an absolute origin with no trailing slash.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://masudndatsu.com"
).replace(/\/+$/, "");

export const siteName = "Mas'ud Ndatsu";

export const jobTitle = "Software Engineer";

export const siteTitle = `${siteName} — ${jobTitle}`;

export const siteDescription =
  "Mas'ud Ndatsu is a software engineer building digital products, backend systems and AI-powered solutions for startups and businesses.";

export const siteKeywords = [
  "software engineer",
  "backend engineer",
  "AI solutions",
  "digital products",
  "Mas'ud Ndatsu",
];
