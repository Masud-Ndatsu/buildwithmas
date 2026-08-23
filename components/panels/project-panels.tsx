import { projectDiagrams } from "@/components/diagrams";
import { projects, type Project } from "@/lib/content";
import { MediaFrame } from "../media-frame";

type ProjectPanelsProps = {
  onOpenDetail: (project: Project) => void;
};

export function ProjectPanels({ onOpenDetail }: ProjectPanelsProps) {
  return (
    <>
      {projects.map((project) => {
        const SystemDiagram = projectDiagrams[project.num];

        return (
          <article
            key={project.num}
            data-panel
            className="panel panel-project gap-[clamp(16px,2.4vh,30px)]"
          >
            <div className="flex flex-none items-start gap-[clamp(14px,1.6vw,26px)]">
              <span className="eyebrow-lg pt-[0.7em] text-text-accent">
                {project.num}
              </span>
              <div>
                <h3 className="text-[clamp(26px,3.6vw,60px)] leading-none font-light tracking-[-0.03em]">
                  {project.name}
                </h3>
                <p className="mt-3.5 text-[clamp(13px,1.05vw,16px)] text-text-muted">
                  {project.descriptor}
                </p>
              </div>
            </div>

            <div className="h-px flex-none bg-border-dark" />

            {/*
              The system drawing is the panel. Its full write-up lives in the
              details dialog so the visual is not competing with body copy.
            */}
            {SystemDiagram ? (
              <div className="hidden min-h-0 flex-1 md:block">
                <SystemDiagram />
              </div>
            ) : null}

            {/*
              A diagram scaled to a phone-width panel is unreadable, so small
              screens get the architecture list in its place.
            */}
            <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto md:hidden">
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

            {project.shot ? (
              <MediaFrame
                src={project.shot.src}
                alt={project.shot.alt}
                placeholder="Screenshot"
                sizes="(max-width: 768px) 80vw, 320px"
                ratio="16 / 10"
                className="hidden flex-none lg:block lg:w-[260px]"
              />
            ) : null}

            <div className="flex flex-none flex-wrap items-end justify-between gap-x-[clamp(20px,2.4vw,40px)] gap-y-4 border-t border-border-dark pt-[clamp(12px,1.8vh,20px)]">
              <div>
                <p className="eyebrow mb-2.5 text-text-tertiary">Stack</p>
                <ul className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="border border-border-dark px-2 py-[5px] font-mono text-[10px] tracking-[0.1em] text-text-muted uppercase"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => onOpenDetail(project)}
                className="border border-border-dark px-4 py-3 font-mono text-[10px] tracking-[0.16em] text-text-sand uppercase transition-colors duration-[180ms] hover:border-bg-accent hover:text-text-accent"
              >
                Details →
              </button>
            </div>
          </article>
        );
      })}
    </>
  );
}
