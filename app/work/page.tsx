import type { Metadata } from "next";
import Link from "next/link";
import { Cta } from "@/components/cta";
import { ProjectImage } from "@/components/project-image";
import { pageMetadata } from "@/lib/seo";
import { projects } from "@/lib/content";

export const metadata: Metadata = pageMetadata({
  title: "Work",
  description:
    "Case studies of the products and backend systems Mas'ud Ndatsu has helped build, from AI platforms to payments infrastructure.",
  path: "/work",
});

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line pt-5">
      <h4 className="label">{title}</h4>
      <div className="mt-3 max-w-[60ch] text-lg leading-relaxed">{children}</div>
    </div>
  );
}

export default function WorkPage() {
  return (
    <>
      <section className="wrap pt-16 pb-8 sm:pt-24">
        <h1 className="display text-[clamp(52px,9vw,120px)]">Work</h1>
        <p className="mt-6 max-w-[32ch] text-xl text-muted">
          A selection of products and systems I&apos;ve helped build.
        </p>
      </section>

      <div className="wrap">
        {projects.map((p, i) => (
          <article
            key={p.slug}
            id={p.slug}
            className="scroll-mt-20 border-t border-line py-16 first:mt-8 sm:py-24"
          >
            <p className="label">
              {String(i + 1).padStart(2, "0")} · {p.category}
            </p>
            <h2 className="display mt-4 text-[clamp(40px,6vw,80px)]">
              <Link href={`/work/${p.slug}`} className="hover:text-accent">
                {p.name}
              </Link>
            </h2>
            <p className="mt-5 max-w-[40ch] text-xl text-muted">{p.tagline}</p>

            <div className="mt-10">
              <ProjectImage project={p} />
            </div>

            <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-x-16">
              <Block title="The challenge">{p.challenge}</Block>
              <Block title="What I did">
                <p>{p.did}</p>
                <p className="mt-3 text-base text-muted">My role: {p.role}</p>
              </Block>
              <Block title="The result">
                <p>{p.result}</p>
                {p.metrics ? (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {p.metrics.map((m) => (
                      <li
                        key={m}
                        className="rounded-full border border-line px-3 py-1 text-sm"
                      >
                        {m}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Block>
              <Block title="Technology">
                <p className="font-mono text-sm leading-loose text-muted">
                  {p.technology.join(" · ")}
                </p>
              </Block>
            </div>

            <Link href={`/work/${p.slug}`} className="btn btn-solid mt-10">
              Read case study →
            </Link>
            {p.liveUrl ? (
              <a
                href={p.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-ghost mt-10 ml-3"
              >
                Visit live project ↗
              </a>
            ) : null}
          </article>
        ))}
      </div>

      <Cta />
    </>
  );
}
