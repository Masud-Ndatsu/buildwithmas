import type { ReactNode } from "react";

/**
 * Shared drawing vocabulary for the architecture diagrams.
 *
 * Every diagram is authored against the same fixed viewBox width and is
 * rendered with `preserveAspectRatio`, so it scales down to a 390px panel
 * instead of overflowing. Styling lives in the `.diagram` rules in
 * `app/globals.css` so the diagrams stay in the same visual language as the
 * rest of the page.
 */
export const VIEW_W = 660;

/** Evenly divide the canvas width into `n` columns. */
export function columns(n: number, gap = 16, width = VIEW_W) {
  const w = (width - gap * (n - 1)) / n;
  return Array.from({ length: n }, (_, i) => ({ x: i * (w + gap), w }));
}

/**
 * Arrow markers. Marker ids must be unique per diagram because all four
 * project panels are mounted in the canvas at once.
 */
export function DiagramDefs({ uid }: { uid: string }) {
  return (
    <defs>
      {[
        { id: `${uid}-arrow`, className: "" },
        { id: `${uid}-arrow-accent`, className: " is-accent" },
      ].map(({ id, className }) => (
        <marker
          key={id}
          id={id}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 1 L7 4 L0 7" className={`edge${className}`} />
        </marker>
      ))}
    </defs>
  );
}

type NodeProps = {
  x: number;
  y: number;
  w: number;
  h?: number;
  /** Use "\n" to break the label onto multiple lines. */
  label: string;
  accent?: boolean;
};

export function Node({ x, y, w, h = 46, label, accent }: NodeProps) {
  const lines = label.split("\n");
  const cx = x + w / 2;
  const start = y + h / 2 - ((lines.length - 1) * 11) / 2 + 3;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        className={`node${accent ? " is-accent" : ""}`}
      />
      <text
        y={start}
        textAnchor="middle"
        className={accent ? "is-accent" : "is-strong"}
      >
        {lines.map((line, i) => (
          <tspan key={line} x={cx} dy={i === 0 ? 0 : 11}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

type EdgeProps = {
  uid: string;
  d: string;
  accent?: boolean;
  dashed?: boolean;
  arrow?: boolean;
  /** Send a travelling packet along this edge. */
  flow?: boolean;
  /** Seconds of delay, used to stagger packets down a pipeline. */
  delay?: number;
};

export function Edge({
  uid,
  d,
  accent,
  dashed,
  arrow = true,
  flow,
  delay = 0,
}: EdgeProps) {
  return (
    <>
      <path
        d={d}
        className={`edge${accent ? " is-accent" : ""}${dashed ? " is-dashed" : ""}`}
        markerEnd={
          arrow ? `url(#${uid}-arrow${accent ? "-accent" : ""})` : undefined
        }
      />
      {flow ? (
        <path
          d={d}
          pathLength={100}
          className="edge-flow"
          style={{ animationDelay: `${delay}s` }}
        />
      ) : null}
    </>
  );
}

/** Dashed grouping box with a caption above it. */
export function Lane({
  x,
  y,
  w,
  h,
  label,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} className="lane" />
      <text x={x} y={y - 6}>
        {label}
      </text>
    </g>
  );
}

export function DiagramLabel({
  x,
  y,
  accent,
  anchor = "start",
  children,
}: {
  x: number;
  y: number;
  accent?: boolean;
  anchor?: "start" | "middle" | "end";
  children: ReactNode;
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} className={accent ? "is-accent" : ""}>
      {children}
    </text>
  );
}

/** Wrapper that carries the accessible name and the shared class. */
export function Diagram({
  title,
  desc,
  height,
  children,
}: {
  title: string;
  desc: string;
  height: number;
  children: ReactNode;
}) {
  return (
    <svg
      className="diagram"
      viewBox={`0 0 ${VIEW_W} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      role="img"
    >
      <title>{title}</title>
      <desc>{desc}</desc>
      {children}
    </svg>
  );
}
