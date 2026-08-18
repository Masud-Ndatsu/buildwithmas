import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * One document. The `?section=` variants are the same page and canonicalise
 * back to `/`, so they are deliberately not listed.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
