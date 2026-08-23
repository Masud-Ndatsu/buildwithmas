"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { sectionLayout, type Project, type SectionKey } from "@/lib/content";
import { Hero } from "./hero";
import { ProjectDetail } from "./project-detail";
import { ProjectVisuals } from "./project-visuals";
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
  type Modal = { project: Project; view: "details" | "visuals" };
  const [modal, setModal] = useState<Modal | null>(null);
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
      setModal(null);
      window.history.replaceState(null, "", `?section=${section}`);
    },
    [active, closing],
  );

  const close = useCallback(() => {
    setModal(null);
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
      if (event.key === "Escape") {
        // The dialog closes first, then the section.
        if (modal) setModal(null);
        else if (active) close();
        return;
      }
      // Panel stepping would move the canvas under an open dialog, and means
      // nothing in a document section — leave the keys to scroll there.
      if (!active || modal) return;
      if (sectionLayout[active] !== "canvas") return;
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
  }, [active, modal, close, step]);

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
          onOpenModal={(project, view) => setModal({ project, view })}
        />
      ) : null}

      {modal?.view === "details" ? (
        <ProjectDetail project={modal.project} onClose={() => setModal(null)} />
      ) : null}

      {modal?.view === "visuals" ? (
        <ProjectVisuals project={modal.project} onClose={() => setModal(null)} />
      ) : null}

      {/* Keeps the rule marker and Esc affordance visible through the fade-out. */}
      <SiteNav active={active} onOpen={open} onClose={close} />

      {/* Texture over everything; never intercepts the canvas drag. */}
      <div aria-hidden className="grain" />
    </main>
  );
}
