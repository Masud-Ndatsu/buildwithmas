import { getPosts } from "@/lib/posts";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

export async function GET() {
  const posts = (await getPosts()).filter((p) => !p.draft);
  const items = posts
    .map((p) => {
      const url = `${siteUrl}/writing/${p.slug}`;
      return `<item><title>${esc(p.title)}</title><link>${url}</link><guid>${url}</guid><pubDate>${new Date(p.date).toUTCString()}</pubDate><description>${esc(p.description)}</description></item>`;
    })
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${esc(siteName)} — Writing</title><link>${siteUrl}/writing</link><description>${esc(siteDescription)}</description><atom:link href="${siteUrl}/writing/feed.xml" rel="self" type="application/rss+xml"/>${items}</channel></rss>`;
  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
