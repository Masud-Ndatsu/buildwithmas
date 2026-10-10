import type { Metadata } from "next";
import Link from "next/link";
import { Cta } from "@/components/cta";
import { HashRedirect } from "@/components/hash-redirect";
import { ProjectImage } from "@/components/project-image";
import { projects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Case studies of the products and backend systems Mas'ud Ndatsu has helped build, from AI platforms to payments infrastructure.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <HashRedirect slugs={projects.map((p) => p.slug)} />
      <section className="wrap pt-16 pb-8 sm:pt-24">
        <h1 className="display text-[clamp(52px,9vw,120px)]">Work</h1>
        <p className="mt-6 max-w-[32ch] text-xl text-muted">
          A selection of products and systems I&apos;ve helped build.
        </p>
      </section>

      <ul className="wrap mt-8 grid gap-x-10 gap-y-16 border-t border-line pt-16 pb-24 md:grid-cols-2">
        {projects.map((p, i) => (
          <li key={p.slug}>
            <Link href={`/work/${p.slug}`} className="group block">
              <ProjectImage project={p} />
              <p className="label mt-6">
                {String(i + 1).padStart(2, "0")} · {p.category}
              </p>
              <h2 className="display mt-3 text-4xl transition-colors group-hover:text-accent">
                {p.name}
              </h2>
              <p className="mt-3 max-w-[44ch] text-lg text-muted">{p.tagline}</p>
              <p className="mt-4 text-sm font-medium">View case study →</p>
            </Link>
          </li>
        ))}
      </ul>

      <Cta />
    </>
  );
}
