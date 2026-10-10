import type { Metadata } from "next";
import Link from "next/link";
import { getPosts } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Writing",
    description:
      "Notes from Mas'ud Ndatsu on backend engineering, payments, distributed systems and AI, written from problems solved in production.",
    path: "/writing",
  }),
  alternates: { canonical: "/writing", types: { "application/rss+xml": "/writing/feed.xml" } },
};

export default async function WritingPage() {
  const posts = await getPosts();
  return (
    <section className="wrap pt-16 pb-24 sm:pt-24">
      <h1 className="display text-[clamp(52px,9vw,120px)]">Writing</h1>
      <p className="mt-6 max-w-[40ch] text-xl text-muted">
        Notes on backend engineering and AI, from problems I&apos;ve solved.
      </p>
      <ul className="mt-14 border-t border-line">
        {posts.length === 0 ? (
          <li className="py-8 text-muted">Posts are coming soon.</li>
        ) : null}
        {posts.map((p) => (
          <li key={p.slug} className="border-b border-line py-8">
            <Link href={`/writing/${p.slug}`} className="group block">
              <p className="font-mono text-sm text-muted">
                {p.date}{p.draft ? " · DRAFT" : ""}
              </p>
              <h2 className="display mt-2 text-3xl transition-colors group-hover:text-accent">
                {p.title}
              </h2>
              <p className="mt-2 max-w-[60ch] text-lg text-muted">{p.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
