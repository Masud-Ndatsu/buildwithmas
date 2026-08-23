import { Diagram, DiagramDefs, Edge, Lane, Node } from "./primitives";

const uid = "coll";

const sources = [
  { label: "CATALOGUE", y: 14 },
  { label: "COLLECTIONS", y: 74 },
  { label: "SOCIAL GRAPH", y: 134 },
];

export function CollectivDiagram() {
  return (
    <Diagram
      height={196}
      title="Collectiv architecture"
      desc="Catalogue, collection and social-graph writes share one write path; read models derived from it are shaped for the discovery feed."
    >
      <DiagramDefs uid={uid} />

      {sources.map((source) => (
        <Node
          key={source.label}
          x={0}
          y={source.y}
          w={140}
          h={44}
          label={source.label}
        />
      ))}

      <Node x={198} y={74} w={130} h={44} label={"WRITE\nPATH"} accent />
      <Node x={382} y={74} w={130} h={44} label={"READ\nMODELS"} />
      <Node x={556} y={74} w={104} h={44} label={"DISCOVERY\nFEED"} />

      <Lane x={374} y={58} w={286} h={76} label="READ SIDE" />

      {sources.map((source, i) => (
        <Edge
          key={source.label}
          uid={uid}
          accent={source.y === 74}
          flow
          delay={i * 0.36}
          d={`M140 ${source.y + 22} H170 V96 H198`}
        />
      ))}

      <Edge uid={uid} accent flow delay={1.1} d="M328 96 H382" />
      <Edge uid={uid} flow delay={1.5} d="M512 96 H556" />
    </Diagram>
  );
}
