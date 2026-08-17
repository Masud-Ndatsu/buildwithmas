import type { SectionKey } from "@/lib/content";
import type { ReactNode } from "react";

/**
 * Compact glyphs shown in place of the nav labels on narrow viewports.
 * Drawn with borders so they inherit the button's current colour.
 */
export const sectionIcons: Record<SectionKey, ReactNode> = {
  projects: (
    <span className="grid h-[22px] w-[22px] grid-cols-2 gap-[3px] p-[3px]">
      <span className="border border-current" />
      <span className="border border-current" />
      <span className="border border-current" />
      <span className="border border-current" />
    </span>
  ),
  services: (
    <span className="flex h-[22px] w-[22px] flex-col justify-between py-1">
      <span className="h-px bg-current" />
      <span className="h-px bg-current" />
      <span className="h-px bg-current" />
    </span>
  ),
  about: (
    <span className="flex h-[22px] w-[22px] items-center justify-center">
      <span className="h-[15px] w-[15px] rounded-full border border-current" />
    </span>
  ),
  contact: (
    <span className="flex h-[22px] w-[22px] items-center justify-center">
      <span className="flex h-[13px] w-[18px] items-start justify-center overflow-hidden border border-current">
        <span className="h-[6px] w-[13px] border-r border-b border-l border-current" />
      </span>
    </span>
  ),
};
