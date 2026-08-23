"use client";

import {
  sectionLayout,
  sections,
  type Project,
  type SectionKey,
} from "@/lib/content";
import { AboutDocument } from "./panels/about-document";
import { ContactPanels } from "./panels/contact-panels";
import { ProjectPanels } from "./panels/project-panels";
import { ServicePanels } from "./panels/service-panels";

type SectionCanvasProps = {
  active: SectionKey;
  closing: boolean;
  canvasRef: (node: HTMLDivElement | null) => void;
  index: number;
  count: number;
  onStep: (direction: number) => void;
  onOpenModal: (project: Project, view: "details" | "visuals") => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

export function SectionCanvas({
  active,
  closing,
  canvasRef,
  index,
  count,
  onStep,
  onOpenModal,
}: SectionCanvasProps) {
  const { title, meta } = sections[active];
  const isDocument = sectionLayout[active] === "document";

  return (
    <section
      aria-label={title}
      className={`page-ground absolute inset-0 grid grid-rows-[auto_1fr_auto] pt-[var(--gutter-y)] pb-[clamp(18px,3vh,34px)] ${
        closing ? "animate-layer-out" : "animate-layer-in"
      }`}
    >
      <div className="animate-rise-in flex items-baseline gap-[18px] px-[var(--gutter-x)]">
        <h2 className="text-[clamp(15px,1.15vw,19px)] font-medium tracking-[0.14em] uppercase">
          {title}
        </h2>
        <span className="eyebrow text-text-accent">{meta}</span>
      </div>

      {isDocument ? (
        /*
         * Deliberately does NOT take `canvasRef`: that hook turns vertical
         * wheel into horizontal travel, which would make this unscrollable.
         */
        <div
          tabIndex={0}
          role="region"
          aria-label={`${title} content`}
          className="no-scrollbar animate-rise-in mt-[clamp(24px,4vh,52px)] mr-[calc(var(--gutter-x)+var(--nav-reserve))] overflow-y-auto px-[var(--gutter-x)]"
        >
          <AboutDocument />
        </div>
      ) : (
        <div
          ref={canvasRef}
          tabIndex={0}
          role="region"
          aria-label="Horizontal content canvas"
          className="no-scrollbar animate-canvas-in mt-[clamp(24px,4vh,52px)] mr-[calc(var(--gutter-x)+var(--nav-reserve))] cursor-grab overflow-x-auto overflow-y-hidden"
        >
          <div className="flex h-full w-max items-stretch px-[var(--gutter-x)]">
            {active === "projects" ? (
              <ProjectPanels onOpen={onOpenModal} />
            ) : null}
            {active === "services" ? <ServicePanels /> : null}
            {active === "contact" ? <ContactPanels /> : null}
          </div>
        </div>
      )}

      <div className="mt-[clamp(14px,2.4vh,26px)] flex items-center justify-between gap-6 border-t border-border-darker px-[var(--gutter-x)] pt-[clamp(14px,2.4vh,26px)]">
        {isDocument ? (
          <span />
        ) : (
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              aria-label="Previous panel"
              onClick={() => onStep(-1)}
              className="font-mono text-[11px] tracking-[0.16em] text-text-tertiary transition-colors duration-[180ms] hover:text-text-cream"
            >
              ←
            </button>
            <span className="eyebrow text-text-dark tabular-nums">
              {count ? `${pad(index + 1)} / ${pad(count)}` : ""}
            </span>
            <button
              type="button"
              aria-label="Next panel"
              onClick={() => onStep(1)}
              className="font-mono text-[11px] tracking-[0.16em] text-text-tertiary transition-colors duration-[180ms] hover:text-text-cream"
            >
              →
            </button>
          </div>
        )}
        <span className="eyebrow text-text-dark">
          {isDocument ? "Scroll ↓" : "Drag → · scroll · ←/→"}
        </span>
      </div>
    </section>
  );
}
