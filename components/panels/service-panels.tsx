import { services } from "@/lib/content";
import { serviceGlyphs } from "../service-glyphs";

export function ServicePanels() {
  return (
    <>
      {services.map((service) => (
        <article
          key={service.num}
          data-panel
          className="panel panel-service self-start gap-[clamp(14px,2vh,22px)]"
        >
          {/* Same bordered-frame treatment as the project card's screenshot face. */}
          <div className="flex aspect-[16/10] flex-none items-center justify-center border border-border-dark">
            {serviceGlyphs[service.num]}
          </div>

          <div className="flex items-start gap-3">
            <span className="eyebrow-lg pt-[0.35em] text-text-accent">
              {service.num}
            </span>
            <div>
              <h3 className="text-[clamp(20px,2vw,28px)] leading-[1.05] font-light tracking-[-0.02em]">
                {service.title}
              </h3>
              <p className="mt-2 max-w-[32ch] text-[13px] leading-[1.55] text-text-muted text-pretty">
                {service.blurb}
              </p>
            </div>
          </div>

          <ul className="flex flex-col border-t border-border-darker">
            {service.items.map((item) => (
              <li
                key={item}
                className="border-b border-border-darker py-[13px] font-mono text-[11px] tracking-[0.12em] text-text-sand uppercase"
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
