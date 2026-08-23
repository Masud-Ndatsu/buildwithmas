"use client";

import { useEffect, useRef } from "react";
import type { Project } from "@/lib/content";

type ProjectDetailProps = {
  project: Project;
  onClose: () => void;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Full context for one project.
 *
 * Rendered at the top level rather than inside the panel: the canvas is an
 * `overflow-x: auto` scroller, so a dialog nested in a panel would be clipped
 * and would scroll away with it. Escape is handled by the portfolio's key
 * handler so it can close this before closing the section.
 */
export function ProjectDetail({ project, onClose }: ProjectDetailProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = `project-${project.num}-title`;

  // Move focus in on open and hand it back to the trigger on close.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => previous?.focus?.();
  }, []);

  // Keep Tab inside the dialog while it is open.
  useEffect(() => {
    const node = dialogRef.current;
    if (!node) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        last.focus();
        event.preventDefault();
      } else if (!event.shiftKey && document.activeElement === last) {
        first.focus();
        event.preventDefault();
      }
    };
    node.addEventListener("keydown", onKeyDown);
    return () => node.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center px-[var(--gutter-x)] py-[var(--gutter-y)]">
      <div
        aria-hidden
        onClick={onClose}
        className="animate-layer-in absolute inset-0 bg-bg-overlay"
      />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="page-ground animate-rise-in relative flex max-h-full w-full max-w-[860px] flex-col border border-border-dark"
      >
        <div className="flex flex-none items-start justify-between gap-6 border-b border-border-dark p-[clamp(20px,3vw,40px)]">
          <div className="flex items-start gap-[clamp(14px,1.6vw,26px)]">
            <span className="eyebrow-lg pt-[0.6em] text-text-accent">
              {project.num}
            </span>
            <div>
              <h3
                id={titleId}
                className="text-[clamp(24px,3vw,44px)] leading-none font-light tracking-[-0.03em]"
              >
                {project.name}
              </h3>
              <p className="mt-3 text-[clamp(13px,1.05vw,16px)] text-text-muted">
                {project.descriptor}
              </p>
            </div>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex flex-none items-center gap-2.5 font-mono text-[11px] tracking-[0.18em] text-text-tertiary uppercase transition-colors duration-[180ms] hover:text-text-cream"
          >
            Esc <span className="text-[14px]">×</span>
          </button>
        </div>

        <div className="no-scrollbar flex min-h-0 flex-1 flex-wrap gap-[clamp(20px,3vw,48px)] overflow-y-auto p-[clamp(20px,3vw,40px)]">
          <div className="flex-[1_1_280px] min-w-[220px]">
            <p className="eyebrow mb-3.5 text-text-tertiary">Overview</p>
            <p className="mb-3 text-[14px] leading-[1.7] text-text-sand text-pretty">
              {project.problem}
            </p>
            <p className="text-[14px] leading-[1.7] text-text-muted text-pretty">
              {project.solution}
            </p>
          </div>

          <div className="flex-[1_1_220px] min-w-[200px]">
            <p className="eyebrow mb-3.5 text-text-tertiary">Architecture</p>
            <ul className="flex flex-col gap-2.5">
              {project.arch.map((item) => (
                <li
                  key={item}
                  className="border-t border-border-darker pt-2.5 text-[13px] leading-[1.5] text-text-sand"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {project.links?.length ? (
          <div className="flex flex-none flex-wrap gap-[clamp(14px,1.6vw,26px)] border-t border-border-dark p-[clamp(20px,3vw,40px)] font-mono text-[10px] tracking-[0.16em] uppercase">
            {project.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {link.label} →
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
