import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts, loadPost } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";
import { siteName, siteUrl } from "@/lib/site";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/writing/[slug]">): Promise<Metadata> {
  const post = await loadPost((await params).slug);
  if (!post) return {};
  const { meta } = post;
  const base = pageMetadata({
    title: meta.title,
    description: meta.description,
    path: `/writing/${meta.slug}`,
  });
  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: meta.date,
      authors: [siteName],
      tags: meta.tags,
    },
  };
}

export default async function PostPage({ params }: PageProps<"/writing/[slug]">) {
  const post = await loadPost((await params).slug);
  if (!post) notFound();
  const { Content, meta } = post;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: meta.title,
    description: meta.description,
    datePublished: meta.date,
    keywords: meta.tags.join(", "),
    mainEntityOfPage: `${siteUrl}/writing/${meta.slug}`,
    author: { "@type": "Person", name: siteName, url: siteUrl },
  };

  return (
    <article className="wrap max-w-[760px] pt-12 pb-24 sm:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
      />
      <Link href="/writing" className="link-line text-sm">← All writing</Link>
      <p className="mt-10 font-mono text-sm text-muted">{meta.date}</p>
      <h1 className="display mt-3 text-[clamp(36px,6vw,64px)]">{meta.title}</h1>
      <Content />
    </article>
  );
}
