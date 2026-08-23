import { currentFocus, engineering, profile, technology } from "@/lib/content";
import { MediaFrame } from "../media-frame";

export function AboutPanels() {
  return (
    <>
      <article
        data-panel
        className="panel w-[min(30vw,340px)] min-w-[220px]"
      >
        <span className="eyebrow-lg text-text-accent">00 / Portrait</span>
        <MediaFrame
          src="/images/passport.png"
          alt={profile.name}
          placeholder="Portrait · 3:4"
          sizes="(max-width: 640px) 70vw, 340px"
          caption={`${profile.name} · Abuja, NG`}
          className="mt-[clamp(20px,4vh,48px)] flex-1"
        />
      </article>

      <article data-panel className="panel w-[min(46vw,600px)] min-w-[280px]">
        <span className="eyebrow-lg text-text-accent">01 / Profile</span>
        <p className="mt-[clamp(20px,4vh,48px)] text-[clamp(20px,2.1vw,34px)] leading-[1.35] font-light tracking-[-0.02em] text-pretty">
          I&apos;m Mas&apos;ud, a backend-focused software engineer interested in
          the infrastructure behind modern software systems.
        </p>
        <p className="mt-6 max-w-[44ch] text-[14px] leading-[1.7] text-text-muted text-pretty">
          I work on the parts of a product that have to keep working: services,
          data models, queues, deployments, and the operational surface around
          them.
        </p>
      </article>

      <article data-panel className="panel w-[min(34vw,440px)] min-w-[260px]">
        <span className="eyebrow-lg text-text-accent">02 / Engineering</span>
        <ul className="mt-[clamp(20px,4vh,48px)] flex flex-col">
          {engineering.map((item) => (
            <li
              key={item}
              className="border-t border-border-darker py-4 text-[clamp(15px,1.5vw,22px)] font-light tracking-[-0.01em]"
            >
              {item}
            </li>
          ))}
        </ul>
      </article>

      <article data-panel className="panel w-[min(52vw,680px)] min-w-[280px]">
        <span className="eyebrow-lg text-text-accent">03 / Technology</span>
        <div className="no-scrollbar mt-[clamp(20px,4vh,48px)] grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-[clamp(20px,2.4vw,40px)] overflow-y-auto">
          {technology.map(({ group, items }) => (
            <div key={group}>
              <p className="eyebrow mb-3 text-text-tertiary">{group}</p>
              <p className="text-[14px] leading-[2] text-text-sand">
                {items.map((item) => (
                  <span key={item} className="block">
                    {item}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </article>

      <article data-panel className="panel w-[min(38vw,500px)] min-w-[260px]">
        <span className="eyebrow-lg text-text-accent">04 / Current focus</span>
        <p className="mt-[clamp(20px,4vh,48px)] max-w-[22ch] text-[clamp(19px,1.9vw,30px)] leading-[1.35] font-light tracking-[-0.02em]">
          {currentFocus.statement}
        </p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-[clamp(24px,4vh,48px)] font-mono text-[10px] tracking-[0.12em] text-text-muted uppercase">
          {currentFocus.tags.map((tag) => (
            <li key={tag} className="border border-border-dark px-[9px] py-1.5">
              {tag}
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
