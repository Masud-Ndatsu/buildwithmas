import { profile } from "@/lib/content";

const channels = [
  { label: "Email", text: profile.email, href: `mailto:${profile.email}` },
  { label: "GitHub", text: profile.github.label, href: profile.github.href },
  ...(profile.linkedin
    ? [
        {
          label: "LinkedIn",
          text: profile.linkedin.label,
          href: profile.linkedin.href,
        },
      ]
    : []),
];

export function ContactPanels() {
  return (
    <>
      <article
        data-panel
        className="panel w-[min(52vw,660px)] min-w-[280px] justify-center"
      >
        <h3 className="text-[clamp(34px,5.4vw,92px)] leading-[0.95] font-light tracking-[-0.035em]">
          Let&apos;s build
          <br />
          something
          <br />
          useful.
        </h3>
        <a
          href={`mailto:${profile.email}`}
          className="mt-[clamp(26px,4vh,52px)] self-start border border-border-dark px-5 py-3.5 font-mono text-[11px] tracking-[0.16em] uppercase transition-colors duration-[180ms] hover:border-bg-accent"
        >
          Start a conversation →
        </a>
      </article>

      <article
        data-panel
        className="panel w-[min(30vw,400px)] min-w-[250px] justify-center gap-[clamp(22px,3vh,38px)]"
      >
        {channels.map((channel) => (
          <div key={channel.label}>
            <p className="eyebrow mb-3 text-text-tertiary">{channel.label}</p>
            <a
              href={channel.href}
              target={channel.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={channel.href.startsWith("mailto:") ? undefined : "noreferrer"}
              className="inline-block border-b border-border-dark pb-1.5 text-[clamp(15px,1.4vw,20px)] font-light transition-colors duration-[180ms] hover:border-bg-accent"
            >
              {channel.text}
            </a>
          </div>
        ))}
      </article>

      <article
        data-panel
        className="panel w-[min(26vw,340px)] min-w-[230px] justify-end"
      >
        <p className="font-mono text-[11px] leading-[2.2] tracking-[0.14em] text-text-tertiary uppercase">
          Abuja, Nigeria
          <br />
          UTC+1
          <br />
          Open to backend &amp; infrastructure work
        </p>
      </article>
    </>
  );
}
