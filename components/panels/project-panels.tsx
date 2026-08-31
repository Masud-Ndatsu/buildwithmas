import { projects, type Project } from "@/lib/content";
import { MediaFrame } from "../media-frame";
import { ProjectStatus } from "../project-status";

type ProjectPanelsProps = {
  onOpen: (project: Project, view: "details" | "visuals") => void;
};

export function ProjectPanels({ onOpen }: ProjectPanelsProps) {
  return (
    <>
      {projects.map((project) => (
        <article
          key={project.num}
          data-panel
          className="panel panel-project self-start gap-[clamp(14px,2vh,22px)]"
        >
          {/*
            The card face: a real capture of the live homepage once a project
            has one. Still-building projects get a labelled placeholder frame
            rather than a shrunk, unreadable copy of the system diagram — the
            full diagram lives one tap away behind "Diagram →".
          */}
          <MediaFrame
            src={project.shot?.src}
            alt={project.shot?.alt ?? `${project.name} homepage`}
            placeholder={
              project.status === "live" ? "Screenshot" : "In development"
            }
            sizes="(max-width: 640px) 82vw, 400px"
            ratio="16 / 10"
            className="flex-none"
          />

          <div className="flex flex-none items-start justify-between gap-x-4 gap-y-2">
            <div className="flex items-start gap-3">
              <span className="eyebrow-lg pt-[0.35em] text-text-accent">
                {project.num}
              </span>
              <div>
                <h3 className="text-[clamp(19px,1.8vw,24px)] leading-none font-light tracking-[-0.02em]">
                  {project.name}
                </h3>
                <p className="mt-2 text-[12px] leading-[1.4] text-text-muted">
                  {project.descriptor}
                </p>
              </div>
            </div>

            <ProjectStatus project={project} className="pt-[0.3em]" />
          </div>

          {project.constraint ? (
            <p className="flex-none text-[13px] leading-[1.55] text-text-sand text-pretty">
              {project.constraint}
            </p>
          ) : null}

          {project.metrics?.length ? (
            <p className="flex-none font-mono text-[10px] tracking-[0.12em] text-text-accent uppercase">
              {project.metrics.join("  ·  ")}
            </p>
          ) : null}

          <div className="flex flex-none flex-col gap-4 border-t border-border-dark pt-[clamp(12px,1.8vh,18px)]">
            <ul className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 4).map((tech) => (
                <li
                  key={tech}
                  className="border border-border-dark px-2 py-[5px] font-mono text-[10px] tracking-[0.1em] text-text-muted uppercase"
                >
                  {tech}
                </li>
              ))}
              {project.stack.length > 4 ? (
                <li className="border border-border-dark px-2 py-[5px] font-mono text-[10px] tracking-[0.1em] text-text-tertiary uppercase">
                  +{project.stack.length - 4}
                </li>
              ) : null}
            </ul>

            <div className="flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => onOpen(project, "visuals")}
                className="flex-1 border border-border-dark px-3 py-2.5 font-mono text-[10px] tracking-[0.14em] text-text-sand uppercase transition-colors duration-[180ms] hover:border-bg-accent hover:text-text-accent"
              >
                Diagram →
              </button>
              <button
                type="button"
                onClick={() => onOpen(project, "details")}
                className="flex-1 border border-border-dark px-3 py-2.5 font-mono text-[10px] tracking-[0.14em] text-text-sand uppercase transition-colors duration-[180ms] hover:border-bg-accent hover:text-text-accent"
              >
                Details →
              </button>
            </div>
          </div>
        </article>
      ))}
    </>
  );
}
