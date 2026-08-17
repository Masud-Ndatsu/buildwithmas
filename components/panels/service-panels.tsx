import { services } from "@/lib/content";

export function ServicePanels() {
  return (
    <>
      {services.map((service) => (
        <article
          key={service.num}
          data-panel
          className="panel w-[min(40vw,520px)] min-w-[270px] px-[clamp(20px,2.6vw,44px)]"
        >
          <span className="eyebrow-lg text-text-accent">{service.num}</span>

          <h3 className="mt-[clamp(18px,3vh,40px)] max-w-[14ch] text-[clamp(24px,2.6vw,44px)] leading-[1.02] font-light tracking-[-0.025em]">
            {service.title}
          </h3>

          <p className="mt-[18px] max-w-[34ch] text-[14px] leading-[1.65] text-text-muted text-pretty">
            {service.blurb}
          </p>

          <ul className="mt-auto flex flex-col pt-[clamp(24px,4vh,48px)]">
            {service.items.map((item) => (
              <li
                key={item}
                className="border-t border-border-darker py-[13px] font-mono text-[11px] tracking-[0.12em] text-text-sand uppercase"
              >
                {item}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </>
  );
}
