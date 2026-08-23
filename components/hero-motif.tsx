/**
 * Ambient constellation for the hero's negative space — tiers of nodes with
 * traffic flowing between them, drawn in the same hairline vocabulary as the
 * project diagrams. Purely decorative.
 */
const tiers = [
  [
    { x: 118, y: 92 },
    { x: 302, y: 92 },
  ],
  [
    { x: 62, y: 252 },
    { x: 210, y: 252, accent: true },
    { x: 358, y: 252 },
  ],
  [
    { x: 132, y: 412 },
    { x: 288, y: 412 },
  ],
  [{ x: 210, y: 548, accent: true }],
];

const edges: { from: [number, number]; to: [number, number]; accent?: boolean }[] =
  [
    { from: [118, 92], to: [62, 252] },
    { from: [118, 92], to: [210, 252], accent: true },
    { from: [302, 92], to: [210, 252], accent: true },
    { from: [302, 92], to: [358, 252] },
    { from: [62, 252], to: [132, 412] },
    { from: [210, 252], to: [132, 412] },
    { from: [210, 252], to: [288, 412], accent: true },
    { from: [358, 252], to: [288, 412] },
    { from: [132, 412], to: [210, 548] },
    { from: [288, 412], to: [210, 548], accent: true },
  ];

const R = 6;

export function HeroMotif() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 right-[var(--gutter-x)] hidden w-[26vw] max-w-[400px] items-center justify-center md:flex"
    >
      <svg
        className="hero-motif"
        viewBox="0 0 420 640"
        preserveAspectRatio="xMidYMid meet"
        focusable="false"
      >
        <circle cx="210" cy="320" r="238" className="m-ring" />

        {edges.map(({ from, to, accent }, i) => (
          <g key={`${from.join()}-${to.join()}`}>
            <line
              x1={from[0]}
              y1={from[1]}
              x2={to[0]}
              y2={to[1]}
              className={`m-edge${accent ? " is-accent" : ""}`}
            />
            {accent ? (
              <path
                d={`M${from[0]} ${from[1]} L${to[0]} ${to[1]}`}
                pathLength={100}
                className="m-flow"
                style={{ animationDelay: `${i * 0.55}s` }}
              />
            ) : null}
          </g>
        ))}

        {tiers.flat().map((node) => (
          <rect
            key={`${node.x}-${node.y}`}
            x={node.x - R}
            y={node.y - R}
            width={R * 2}
            height={R * 2}
            className={`m-node${node.accent ? " is-accent m-pulse" : ""}`}
          />
        ))}
      </svg>
    </div>
  );
}
