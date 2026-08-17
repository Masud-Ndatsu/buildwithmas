"use client";

import { sectionOrder, sections, type SectionKey } from "@/lib/content";
import { sectionIcons } from "./section-icons";

type SiteNavProps = {
  active: SectionKey | null;
  onOpen: (section: SectionKey) => void;
  onClose: () => void;
};

export function SiteNav({ active, onOpen, onClose }: SiteNavProps) {
  return (
    <nav
      aria-label="Primary"
      className="absolute top-[var(--gutter-y)] right-[var(--gutter-x)] z-5 flex flex-col items-end gap-[clamp(8px,1.1vh,14px)]"
    >
      {sectionOrder.map((key) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            type="button"
            aria-label={sections[key].title}
            aria-current={isActive ? "true" : undefined}
            onClick={() => onOpen(key)}
            className="flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-text-muted uppercase transition-colors duration-[180ms] hover:text-text-cream"
          >
            {isActive ? (
              <span aria-hidden className="h-px w-[22px] bg-bg-accent" />
            ) : null}
            <span className="hidden sm:inline">{sections[key].title}</span>
            <span aria-hidden className="sm:hidden">
              {sectionIcons[key]}
            </span>
          </button>
        );
      })}

      {active ? (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close section"
          className="mt-[clamp(16px,2.4vh,28px)] flex items-center gap-2.5 font-mono text-[11px] tracking-[0.18em] text-text-tertiary uppercase transition-colors duration-[180ms] hover:text-text-cream"
        >
          Esc <span className="text-[14px]">×</span>
        </button>
      ) : null}
    </nav>
  );
}
