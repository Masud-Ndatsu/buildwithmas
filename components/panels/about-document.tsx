import {
  currentFocus,
  engineering,
  profile,
  projects,
  technology,
} from "@/lib/content";
import { MediaFrame } from "../media-frame";
import type { ReactNode } from "react";

/**
 * A rule-separated row: mono label on the left, content on the right.
 * Stacks on narrow screens, which is the site's eyebrow-plus-content
 * vocabulary turned vertical.
 */
function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="grid gap-x-[clamp(24px,4vw,64px)] gap-y-4 border-t border-border-dark py-[clamp(28px,5vh,56px)] md:grid-cols-[minmax(140px,1fr)_3fr]">
      <h3 className="eyebrow text-text-tertiary">{label}</h3>
      <div>{children}</div>
    </section>
  );
}

export function AboutDocument() {
  const shipped = projects.filter(
    (project) => project.status === "live" && project.metrics?.length,
  );

  return (
    <div className="max-w-[900px] pb-[clamp(32px,6vh,72px)]">
      {/* Intro — portrait beside the statement, stacked on a phone. */}
      <div className="flex flex-col gap-[clamp(24px,4vw,56px)] pb-[clamp(28px,5vh,56px)] sm:flex-row sm:items-start">
        <MediaFrame
          src="/images/passport.png"
          alt={profile.name}
          placeholder="Portrait · 3:4"
          sizes="(max-width: 640px) 60vw, 260px"
          ratio="3 / 4"
          caption={`${profile.name} · Abuja, NG`}
          className="w-[60vw] max-w-[240px] flex-none"
        />

        <div>
          {/* Display type balances its lines; body copy only needs orphan control. */}
          <p className="text-[clamp(20px,2.1vw,32px)] leading-[1.35] font-light tracking-[-0.02em] text-balance">
            {profile.bio.statement}
          </p>
          <p className="mt-7 max-w-[52ch] text-[14px] leading-[1.7] text-text-muted text-pretty">
            {profile.bio.detail}
          </p>
        </div>
      </div>

      {shipped.length ? (
        <Row label="Shipped">
          <ul className="flex flex-col">
            {shipped.map((project, i) => (
              <li
                key={project.num}
                className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 ${
                  i === 0 ? "pb-4" : "border-t border-border-darker py-4"
                }`}
              >
                <span className="text-[clamp(16px,1.6vw,24px)] font-light tracking-[-0.015em]">
                  {project.name}
                </span>
                <span className="font-mono text-[10px] tracking-[0.12em] text-text-accent uppercase">
                  {project.metrics!.join("  ·  ")}
                </span>
              </li>
            ))}
          </ul>
        </Row>
      ) : null}

      <Row label="Engineering">
        <ul className="flex flex-col">
          {engineering.map((item, i) => (
            <li
              key={item}
              className={`flex items-baseline gap-4 text-[clamp(15px,1.5vw,22px)] font-light tracking-[-0.01em] ${
                i === 0 ? "pb-3" : "border-t border-border-darker py-3"
              }`}
            >
              <span className="eyebrow-lg text-text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              {item}
            </li>
          ))}
        </ul>
      </Row>

      <Row label="Technology">
        <dl className="flex flex-col">
          {technology.map(({ group, items }, i) => (
            <div
              key={group}
              className={`flex flex-col gap-1 sm:flex-row sm:gap-6 ${
                i === 0 ? "pb-3" : "border-t border-border-darker py-3"
              }`}
            >
              <dt className="eyebrow w-[9rem] flex-none pt-1 text-text-tertiary">
                {group}
              </dt>
              <dd className="text-[14px] leading-[1.7] text-text-sand">
                {items.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </Row>

      <Row label="Current focus">
        <p className="max-w-[34ch] text-[clamp(18px,1.9vw,28px)] leading-[1.35] font-light tracking-[-0.02em]">
          {currentFocus.statement}
        </p>
        <ul className="mt-[clamp(20px,3vh,32px)] flex flex-wrap gap-1.5 font-mono text-[10px] tracking-[0.12em] text-text-muted uppercase">
          {currentFocus.tags.map((tag) => (
            <li key={tag} className="border border-border-dark px-[9px] py-1.5">
              {tag}
            </li>
          ))}
        </ul>
      </Row>
    </div>
  );
}
