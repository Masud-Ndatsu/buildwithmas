import type { MetadataRoute } from "next";
import { projects } from "@/lib/content";
import { getPosts } from "@/lib/posts";
import { siteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  return [
    { path: "", priority: 1 },
    { path: "/work", priority: 0.8 },
    { path: "/about", priority: 0.8 },
    { path: "/contact", priority: 0.6 },
    { path: "/writing", priority: 0.6 },
    ...posts.filter((p) => !p.draft).map((p) => ({ path: `/writing/${p.slug}`, priority: 0.6 })),
    ...projects.map((p) => ({ path: `/work/${p.slug}`, priority: 0.7 })),
  ].map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  }));
}
