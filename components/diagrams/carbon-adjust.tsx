import { Diagram, DiagramDefs, Edge, Node } from "./primitives";

const uid = "carbon";

export function CarbonAdjustDiagram() {
  return (
    <Diagram
      height={166}
      title="Carbon Adjust architecture"
      desc="Energy ingestion and Stripe payment flows enter through a versioned API, settle through an idempotent ledger, and drive wallet state transitions and carbon reporting."
    >
      <DiagramDefs uid={uid} />

      <Node x={0} y={22} w={132} h={44} label={"ENERGY\nINGESTION"} />
      <Node x={0} y={100} w={132} h={44} label={"STRIPE\nPAYMENTS"} />

      <Node x={184} y={61} w={116} h={44} label={"VERSIONED\nAPI"} />
      <Node
        x={348}
        y={61}
        w={132}
        h={44}
        label={"IDEMPOTENT\nLEDGER"}
        accent
      />

      <Node x={528} y={22} w={132} h={44} label={"WALLET STATE\nTRANSITIONS"} />
      <Node x={528} y={100} w={132} h={44} label={"CARBON\nREPORTING"} />

      {/* Both write paths converge on the versioned API. */}
      <Edge uid={uid} flow d="M132 44 H158 V83 H184" />
      <Edge uid={uid} flow delay={0.5} d="M132 122 H158 V83 H184" />

      <Edge uid={uid} accent flow delay={0.9} d="M300 83 H348" />

      {/* Settlement fans out to wallet state and reporting. */}
      <Edge uid={uid} accent flow delay={1.3} d="M480 83 H504 V44 H528" />
      <Edge uid={uid} d="M480 83 H504 V122 H528" />
    </Diagram>
  );
}
