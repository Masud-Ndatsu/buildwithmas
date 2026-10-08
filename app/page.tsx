import Image from "next/image";
import Link from "next/link";
import { Cta } from "@/components/cta";
import { ProjectImage } from "@/components/project-image";
import { featuredProjects, profile, whatIDo } from "@/lib/content";

export default function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-line">
        <Image
          src="/images/hero-network.svg"
          alt=""
          unoptimized
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover object-[70%_50%]"
        />
        {/* Scrim keeps the headline legible: top-down on phones, left-to-right on desktop. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--background)_0%,rgb(250_248_244/0.94)_45%,rgb(250_248_244/0.2)_100%)] lg:bg-[linear-gradient(90deg,var(--background)_0%,rgb(250_248_244/0.95)_42%,rgb(250_248_244/0.1)_80%)]"
        />
        <div className="rise wrap py-20 pb-72 sm:py-32 sm:pb-80 lg:py-28 lg:pb-28">
          <p className="label">Software engineer</p>
          <h1 className="display mt-6 max-w-[14ch] text-[clamp(48px,8vw,112px)]">
            {profile.headline}
          </h1>
          <p className="mt-8 max-w-[34ch] text-xl leading-relaxed text-foreground/70">
            {profile.intro}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/work" className="btn btn-solid">
              View my work
            </Link>
            <Link href="/about#contact" className="btn btn-ghost">
              Let&apos;s talk
            </Link>
          </div>
        </div>

      </section>

      <section className="border-t border-line">
        <div className="wrap py-20 sm:py-28">
          <h2 className="label">What I do</h2>
          <dl className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {whatIDo.map((item) => (
              <div key={item.title} className="border-t border-line pt-6">
                <dt className="display text-3xl">{item.title}</dt>
                <dd className="mt-3 max-w-[36ch] text-lg text-muted">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="wrap py-20 sm:py-28">
          <div className="flex items-end justify-between gap-6">
            <h2 className="display text-[clamp(32px,4.5vw,56px)]">
              Selected work
            </h2>
            <Link href="/work" className="link-line shrink-0 text-sm">
              All work →
            </Link>
          </div>

          <ul className="mt-14 flex flex-col gap-20">
            {featuredProjects.map((p) => (
              <li key={p.slug}>
                <Link href={`/work#${p.slug}`} className="group block">
                  <ProjectImage project={p} />
                  <div className="mt-6 grid gap-x-12 gap-y-3 md:grid-cols-[1fr_1.2fr]">
                    <div>
                      <p className="label">{p.category}</p>
                      <h3 className="display mt-3 text-4xl transition-colors group-hover:text-accent">
                        {p.name}
                      </h3>
                    </div>
                    <div>
                      <p className="text-lg text-muted">{p.tagline}</p>
                      <p className="mt-3 text-sm">
                        <span className="text-muted">My role · </span>
                        {p.role}
                      </p>
                      <p className="mt-4 text-sm font-medium">
                        View case study →
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-line">
        <div className="wrap py-20 sm:py-28">
          <p className="display max-w-[24ch] text-[clamp(26px,3.4vw,44px)]">
            {profile.short}
          </p>
          <Link href="/about" className="link-line mt-8 inline-block">
            More about me →
          </Link>
        </div>
      </section>

      <Cta />
    </>
  );
}
