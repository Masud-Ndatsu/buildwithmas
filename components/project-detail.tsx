"use client";

import type { Project } from "@/lib/content";
import { Modal } from "./modal";
import { ProjectStatus } from "./project-status";

export function ProjectDetail({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const titleId = `project-${project.num}-detail`;

  return (
    <Modal
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
              className="text-[clamp(24px,3vw,44px)] leading-none font-light tracking-[-0.03em]"
            >
              {project.name}
            </h3>
            <p className="mt-3 text-[clamp(13px,1.05vw,16px)] text-text-muted">
              {project.descriptor}
            </p>
            <ProjectStatus project={project} className="mt-3.5" />
          </div>
        </div>
      }
      footer={
        project.links?.length ? (
          <div className="flex flex-wrap gap-[clamp(14px,1.6vw,26px)] font-mono text-[10px] tracking-[0.16em] uppercase">
            {project.links.map((link) => (
              <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
                {link.label} →
              </a>
            ))}
          </div>
        ) : undefined
      }
    >
      <div className="flex flex-wrap gap-[clamp(20px,3vw,48px)]">
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
    </Modal>
  );
}
