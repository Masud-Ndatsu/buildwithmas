import { Diagram, DiagramDefs, Edge, Lane, Node } from "./primitives";

const uid = "ums";

/** Service names are deliberately generic — the point is the topology. */
const services = [
  { label: "SERVICE 01", y: 36 },
  { label: "SERVICE 02", y: 92 },
  { label: "SERVICE 03", y: 148 },
];

export function UserManagementDiagram() {
  return (
    <Diagram
      height={206}
      title="User Management System architecture"
      desc="Clients authenticate at the edge, which issues tokens. Behind a contract boundary each service is deployed independently with its own isolated database."
    >
      <DiagramDefs uid={uid} />

      <Node x={0} y={87} w={104} h={44} label="CLIENTS" />
      <Node
        x={140}
        y={87}
        w={124}
        h={44}
        label={"AUTH EDGE\nTOKEN ISSUE"}
        accent
      />

      <Lane x={304} y={24} w={326} h={170} label="CONTRACT BOUNDARY" />

      {services.map((service, i) => (
        <g key={service.label}>
          <Node x={316} y={service.y} w={150} h={34} label={service.label} />
          <Node x={506} y={service.y} w={112} h={34} label="ISOLATED DB" />
          <Edge uid={uid} d={`M466 ${service.y + 17} H506`} />
          <Edge
            uid={uid}
            accent
            flow
            delay={0.5 + i * 0.35}
            d={`M264 109 H290 V${service.y + 17} H316`}
          />
        </g>
      ))}

      <Edge uid={uid} accent flow d="M104 109 H140" />
    </Diagram>
  );
}
