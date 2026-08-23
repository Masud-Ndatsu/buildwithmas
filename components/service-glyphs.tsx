import type { ReactNode } from "react";

/**
 * Line-art marks for the service panels, drawn in the same geometric
 * vocabulary as the nav icons in `section-icons.tsx` — hairline strokes, no
 * fills, one accented element each.
 */
const wrap = (children: ReactNode) => (
  <svg className="glyph" viewBox="0 0 48 48" aria-hidden focusable="false">
    {children}
  </svg>
);

export const serviceGlyphs: Record<string, ReactNode> = {
  // Backend engineering — stacked service layers over a persistent store.
  "01": wrap(
    <>
      <rect data-stroke x="8" y="8" width="32" height="9" />
      <rect data-stroke x="8" y="21" width="32" height="9" />
      <rect data-accent x="8" y="34" width="32" height="9" />
    </>,
  ),

  // Distributed systems — independent nodes with messaging between them.
  "02": wrap(
    <>
      <rect data-stroke x="6" y="6" width="12" height="12" />
      <rect data-stroke x="30" y="6" width="12" height="12" />
      <rect data-stroke x="6" y="30" width="12" height="12" />
      <rect data-accent x="30" y="30" width="12" height="12" />
      <path data-stroke d="M18 12h12M12 18v12M18 36h12M36 18v12" />
    </>,
  ),

  // Cloud and DevOps — the delivery cycle.
  "03": wrap(
    <>
      <path data-stroke d="M24 8a16 16 0 1 1-11.3 4.7" />
      <path data-accent d="M8 6v8h8" />
      <rect data-stroke x="19" y="19" width="10" height="10" />
    </>,
  ),

  // AI systems — a model surface with one active cell.
  "04": wrap(
    <>
      <rect data-stroke x="7" y="7" width="34" height="34" />
      <path data-stroke d="M18.3 7v34M29.6 7v34M7 18.3h34M7 29.6h34" />
      <rect data-accent x="18.3" y="18.3" width="11.3" height="11.3" />
    </>,
  ),
};
