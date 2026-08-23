import { profile } from "@/lib/content";
import { HeroMotif } from "./hero-motif";

export function Hero() {
  return (
    <div className="absolute inset-0 grid grid-rows-[auto_1fr_auto] px-[var(--gutter-x)] py-[var(--gutter-y)]">
      <HeroMotif />

      <header className="flex items-start justify-between gap-8">
        <div>
          <h1 className="text-[clamp(15px,1.15vw,19px)] font-medium tracking-[0.14em] uppercase">
            {profile.name}
          </h1>
          <p className="mt-2.5 max-w-[22ch] font-mono text-[11px] leading-[1.9] tracking-[0.16em] text-text-secondary uppercase">
            Backend &amp; Distributed
            <br />
            Systems Engineer
          </p>
        </div>
      </header>

      <div className="flex flex-col justify-center pr-[22vw]">
        <h2 className="text-[clamp(38px,7.2vw,124px)] leading-[0.94] font-light tracking-[-0.035em] text-balance">
          I build systems that
          <br />
          are designed to scale.
        </h2>
        <p className="mt-[clamp(24px,3.4vh,44px)] max-w-[46ch] text-[clamp(14px,1.15vw,17px)] leading-[1.65] text-text-muted text-pretty">
          {profile.summary}
        </p>
      </div>

      <footer className="flex flex-wrap items-end justify-between gap-8">
        <ul className="flex flex-wrap gap-x-[clamp(16px,2.4vw,40px)] gap-y-0 font-mono text-[10px] tracking-[0.18em] text-text-tertiary uppercase">
          {profile.disciplines.map((discipline) => (
            <li key={discipline}>{discipline}</li>
          ))}
        </ul>
        <p className="font-mono text-[10px] tracking-[0.18em] text-text-dark uppercase">
          {profile.location}
        </p>
      </footer>
    </div>
  );
}
