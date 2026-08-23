"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { SectionKey } from "@/lib/content";
import { Hero } from "./hero";
import { SectionCanvas } from "./section-canvas";
import { SiteNav } from "./site-nav";
import { useHorizontalCanvas } from "./use-horizontal-canvas";

const CLOSE_MS = 240;

type PortfolioProps = {
  /** Resolved from `?section=` on the server so deep links open on first paint. */
  initialSection: SectionKey | null;
};

export function Portfolio({ initialSection }: PortfolioProps) {
  const [active, setActive] = useState<SectionKey | null>(initialSection);
  const [closing, setClosing] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { ref, index, count, step } = useHorizontalCanvas(active);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const open = useCallback(
    (section: SectionKey) => {
      if (active === section && !closing) return;
      if (closeTimer.current) clearTimeout(closeTimer.current);
      setActive(section);
      setClosing(false);
      window.history.replaceState(null, "", `?section=${section}`);
    },
    [active, closing],
  );

  const close = useCallback(() => {
    setClosing(true);
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setActive(null);
      setClosing(false);
    }, CLOSE_MS);
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && active) {
        close();
        return;
      }
      if (!active) return;
      if (event.key === "ArrowRight") {
        step(1);
        event.preventDefault();
      }
      if (event.key === "ArrowLeft") {
        step(-1);
        event.preventDefault();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, close, step]);

  return (
    <main className="page-ground fixed inset-0 overflow-hidden">
      <Hero />

      {active ? (
        <SectionCanvas
          key={active}
          active={active}
          closing={closing}
          canvasRef={ref}
          index={index}
          count={count}
          onStep={step}
        />
      ) : null}

      {/* Keeps the rule marker and Esc affordance visible through the fade-out. */}
      <SiteNav active={active} onOpen={open} onClose={close} />

      {/* Texture over everything; never intercepts the canvas drag. */}
      <div aria-hidden className="grain" />
    </main>
  );
}
