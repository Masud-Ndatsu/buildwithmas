import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Cta } from "@/components/cta";
import { ProjectImage } from "@/components/project-image";
import { profile, projects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { siteName, siteUrl } from "@/lib/site";

const find = (slug: string) => projects.find((p) => p.slug === slug);

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const p = find((await params).slug);
  if (!p) return {};
  return pageMetadata({
    title: `${p.name} case study`,
    description: `${p.tagline} ${p.result}`,
    path: `/work/${p.slug}`,
  });
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-line pt-6">
      <h2 className="label">{title}</h2>
      <div className="mt-4 max-w-[60ch] text-lg leading-relaxed">{children}</div>
    </section>
  );
}

export default async function CaseStudy({ params }: PageProps<"/work/[slug]">) {
  const p = find((await params).slug);
  if (!p) notFound();

  const url = `${siteUrl}/work/${p.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${p.name} case study`,
    mainEntityOfPage: url,
    inLanguage: "en",
    description: p.result,
    url,
    ...(p.image ? { image: `${siteUrl}${p.image.src}` } : {}),
    keywords: p.technology.join(", "),
    author: { "@type": "Person", name: siteName, url: siteUrl },
    publisher: { "@type": "Person", name: siteName, url: siteUrl },
    ...(p.liveUrl ? { sameAs: [p.liveUrl] } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <article className="wrap pt-12 pb-20 sm:pt-20">
        <Link href="/work" className="link-line text-sm">
          ← All work
        </Link>
        <p className="label mt-10">{p.category}</p>
        <h1 className="display mt-4 text-[clamp(44px,8vw,104px)]">{p.name}</h1>
        <p className="mt-6 max-w-[40ch] text-xl text-muted">{p.tagline}</p>

        <div className="mt-10">
          <ProjectImage project={p} priority />
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-x-16">
          <Section title="The challenge">{p.challenge}</Section>
          <Section title="What I did">
            <p>{p.did}</p>
            <p className="mt-3 text-base text-muted">My role: {p.role}</p>
          </Section>
          <Section title="The result">
            <p>{p.result}</p>
            {p.metrics ? (
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.metrics.map((m) => (
                  <li key={m} className="rounded-full border border-line px-3 py-1 text-sm">
                    {m}
                  </li>
                ))}
              </ul>
            ) : null}
          </Section>
          <Section title="Stack">
            <p className="font-mono text-sm leading-loose text-muted">
              {p.technology.join(" · ")}
            </p>
          </Section>
        </div>

        {p.diagram ? (
          <figure className="mt-16">
            <Image
              src={p.diagram.src}
              alt={p.diagram.alt}
              width={1600}
              height={900}
              sizes="(max-width: 768px) 100vw, 1100px"
              className="h-auto w-full rounded-xl border border-line"
            />
            <figcaption className="mt-3 text-sm text-muted">Architecture</figcaption>
          </figure>
        ) : null}

        {p.details ? (
          <div className="mt-16 flex flex-col gap-12">
            <Section title="Overview">
              <p>{p.details.overview}</p>
            </Section>
            <Section title="What I built">
              <dl className="flex flex-col gap-8">
                {p.details.built.map((b) => (
                  <div key={b.title}>
                    <dt className="display text-2xl">{b.title}</dt>
                    <dd className="mt-2 text-muted">{b.body}</dd>
                  </div>
                ))}
              </dl>
            </Section>
            <Section title="What it taught me">
              <p>{p.details.learned}</p>
            </Section>
          </div>
        ) : null}

        <div className="mt-10 flex flex-wrap gap-3">
          {p.liveUrl ? (
            <a href={p.liveUrl} target="_blank" rel="noreferrer" className="btn btn-solid">
              Visit live project ↗
            </a>
          ) : null}
          <a href={`mailto:${profile.email}`} className="btn btn-ghost">
            Discuss a similar project
          </a>
        </div>
      </article>
      <Cta />
    </>
  );
}
