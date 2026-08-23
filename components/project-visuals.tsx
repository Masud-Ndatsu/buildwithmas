"use client";

import { projectDiagrams } from "@/components/diagrams";
import type { Project } from "@/lib/content";
import { MediaFrame } from "./media-frame";
import { Modal } from "./modal";

/**
 * The system drawing at full size, plus any capture for the project.
 *
 * The diagram is rendered at its natural width inside a horizontal scroller,
 * so on a narrow screen it stays legible and is panned rather than shrunk to
 * unreadable — which is why the panel omits it on phones.
 */
export function ProjectVisuals({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const titleId = `project-${project.num}-visuals`;
  const SystemDiagram = projectDiagrams[project.num];

  return (
    <Modal
      wide
      labelledBy={titleId}
      onClose={onClose}
      header={
        <div className="flex items-start gap-[clamp(14px,1.6vw,26px)]">
          <span className="eyebrow-lg pt-[0.6em] text-text-accent">
            {project.num}
          </span>
          <div>
            <h3
              id={titleId}
              className="text-[clamp(20px,2.4vw,34px)] leading-none font-light tracking-[-0.03em]"
            >
              {project.name}
            </h3>
            <p className="eyebrow mt-3 text-text-tertiary">
              System architecture
            </p>
          </div>
        </div>
      }
    >
      {SystemDiagram ? (
        <div className="diagram-scroll -mx-1 overflow-x-auto px-1">
          <div className="min-w-[660px]">
            <SystemDiagram />
          </div>
        </div>
      ) : null}

      <p className="eyebrow mt-6 text-text-dark sm:hidden">
        Drag the diagram sideways
      </p>

      {project.shot ? (
        <MediaFrame
          src={project.shot.src}
          alt={project.shot.alt}
          placeholder="Screenshot"
          sizes="(max-width: 768px) 90vw, 640px"
          ratio="16 / 10"
          caption={project.shot.alt}
          className="mt-[clamp(24px,3vw,40px)]"
        />
      ) : null}
    </Modal>
  );
}
