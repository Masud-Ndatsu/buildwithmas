"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ModalProps = {
  labelledBy: string;
  header: ReactNode;
  footer?: ReactNode;
  children: ReactNode;
  onClose: () => void;
  /** Widen for content that needs room, e.g. a full-width diagram. */
  wide?: boolean;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Shared dialog shell.
 *
 * Rendered at the top level rather than inside a panel: the canvas is an
 * `overflow-x: auto` scroller, so a dialog nested in a panel would be clipped
 * and would scroll away with it. Escape is handled by the portfolio's key
 * handler so it can close this before closing the section.
 */
export function Modal({
  labelledBy,
  header,
  footer,
  children,
  onClose,
  wide,
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

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
        aria-labelledby={labelledBy}
        className={`page-ground animate-rise-in relative flex max-h-full w-full flex-col border border-border-dark ${
          wide ? "max-w-[1040px]" : "max-w-[860px]"
        }`}
      >
        <div className="flex flex-none items-start justify-between gap-6 border-b border-border-dark p-[clamp(20px,3vw,40px)]">
          {header}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex flex-none items-center gap-2.5 font-mono text-[11px] tracking-[0.18em] text-text-tertiary uppercase transition-colors duration-[180ms] hover:text-text-cream"
          >
            Esc <span className="text-[14px]">×</span>
          </button>
        </div>

        <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto p-[clamp(20px,3vw,40px)]">
          {children}
        </div>

        {footer ? (
          <div className="flex-none border-t border-border-dark p-[clamp(20px,3vw,40px)]">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
