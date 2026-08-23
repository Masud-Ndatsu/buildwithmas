import { columns, Diagram, DiagramDefs, Edge, Lane, Node } from "./primitives";

const uid = "opp";
const col = columns(6);
const Y = 52;
const H = 46;
const MID = Y + H / 2;

const stages = [
  { label: "SOURCES" },
  { label: "SOURCING\nWORKERS" },
  { label: "LLM\nEXTRACTION", accent: true },
  { label: "FINGERPRINT\nDEDUPE" },
  { label: "MODERATION" },
  { label: "SEARCH\nINDEX" },
];

export function OpportunityDiagram() {
  const last = col[5];

  return (
    <Diagram
      height={166}
      title="Opportunity Platform architecture"
      desc="Listings are crawled by sourcing workers, normalised by an LLM extraction step, de-duplicated by fingerprint, approved in a moderation workflow, then published to the search index, which drives notifications."
    >
      <DiagramDefs uid={uid} />

      <Lane
        x={col[1].x - 8}
        y={Y - 14}
        w={col[2].x + col[2].w - col[1].x + 16}
        h={H + 28}
        label="ASYNC WORKERS"
      />

      {stages.map((stage, i) => (
        <Node
          key={stage.label}
          x={col[i].x}
          y={Y}
          w={col[i].w}
          h={H}
          label={stage.label}
          accent={stage.accent}
        />
      ))}

      {stages.slice(0, -1).map((stage, i) => (
        <Edge
          key={stage.label}
          uid={uid}
          accent
          flow
          delay={i * 0.42}
          d={`M${col[i].x + col[i].w} ${MID} H${col[i + 1].x}`}
        />
      ))}

      <Node
        x={last.x}
        y={126}
        w={last.w}
        h={32}
        label="NOTIFICATIONS"
      />
      <Edge
        uid={uid}
        dashed
        d={`M${last.x + last.w / 2} ${Y + H} V126`}
      />
    </Diagram>
  );
}
