import type { Metadata } from "next";
import Image from "next/image";
import { ContactLinks } from "@/components/contact-links";
import { capabilities, experience, profile, projects } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Mas'ud Ndatsu is a software engineer working with startups and businesses.",
  alternates: { canonical: "/about" },
};

const shipped = projects.filter((p) => p.metrics?.length);

export default function AboutPage() {
  return (
    <>
      <section className="wrap grid gap-12 pt-16 pb-20 sm:pt-24 md:grid-cols-[1fr_260px] md:gap-20">
        <div>
          <h1 className="display text-[clamp(52px,9vw,120px)]">About</h1>
          <p className="display mt-8 max-w-[24ch] text-[clamp(24px,3.2vw,40px)]">
            I&apos;m {profile.name}, a software engineer working with startups and
            businesses.
          </p>
          <div className="mt-8 flex max-w-[56ch] flex-col gap-5 text-lg leading-relaxed text-muted">
            <p>
              I build useful products for startups and businesses. Most of my
              work sits behind the screen: the backend, the data and the systems
              that have to keep working once real people depend on them.
            </p>
            <p>
              Lately that includes AI: adding features that genuinely help, and
              automating the work that slows teams down, without turning a
              product into a science project.
            </p>
            <p>
              I like working closely with founders and small teams, explaining
              trade-offs in plain language, and shipping things that last.
            </p>
          </div>
        </div>
        <div className="relative aspect-[3/4] w-full max-w-[260px] self-start overflow-hidden rounded-xl bg-surface">
          <Image
            src="/images/passport.png"
            alt={`Portrait of ${profile.name}`}
            fill
            sizes="260px"
            className="object-cover"
          />
        </div>
      </section>

      {shipped.length ? (
        <section className="border-t border-line">
          <div className="wrap py-16">
            <h2 className="label">Shipped</h2>
            <ul className="mt-6">
              {shipped.map((p) => (
                <li
                  key={p.slug}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-line py-4 first:border-0"
                >
                  <span className="display text-2xl">{p.name}</span>
                  <span className="text-sm text-muted">
                    {p.metrics!.join(" · ")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="border-t border-line">
        <div className="wrap py-16">
          <h2 className="label">Experience</h2>
          <ul className="mt-6">
            {experience.map((e) => (
              <li
                key={e.period}
                className="grid gap-2 border-t border-line py-6 first:border-0 md:grid-cols-[200px_1fr]"
              >
                <p className="font-mono text-sm text-muted">{e.period}</p>
                <div>
                  <p className="display text-2xl">{e.role}</p>
                  <p className="text-muted">{e.org}</p>
                  <p className="mt-3">{e.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="wrap py-16">
          <h2 className="label">Capabilities</h2>
          <dl className="mt-6">
            {capabilities.map((c) => (
              <div
                key={c.title}
                className="grid gap-1 border-t border-line py-5 first:border-0 md:grid-cols-[200px_1fr]"
              >
                <dt className="font-mono text-sm tracking-[0.12em] uppercase">
                  {c.title}
                </dt>
                <dd className="text-lg text-muted">{c.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="contact" className="scroll-mt-20 border-t border-line">
        <div className="wrap py-24 sm:py-32">
          <h2 className="display text-[clamp(40px,7vw,88px)]">
            Let&apos;s work together
          </h2>
          <p className="mt-6 max-w-[34ch] text-xl text-muted">
            Have an idea, product or technical problem you want to discuss?
          </p>
          <a href={`mailto:${profile.email}`} className="btn btn-solid mt-10">
            Email me
          </a>
          <div className="mt-14">
            <ContactLinks />
          </div>
        </div>
      </section>
    </>
  );
}
