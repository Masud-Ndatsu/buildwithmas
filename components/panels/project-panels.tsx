import { projects } from "@/lib/content";

export function ProjectPanels() {
  return (
    <>
      {projects.map((project) => (
        <article
          key={project.num}
          data-panel
          className="panel panel-project gap-[clamp(16px,2.4vh,30px)]"
        >
          <div className="flex items-start gap-[clamp(14px,1.6vw,26px)]">
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

          <div className="h-px bg-border-dark" />

          <div className="no-scrollbar flex min-h-0 flex-1 flex-wrap gap-[clamp(18px,2.4vw,44px)] overflow-y-auto pb-1">
            <div className="flex-[1_1_250px] min-w-[210px]">
              <p className="eyebrow mb-3.5 text-text-tertiary">Overview</p>
              <p className="mb-3 text-[14px] leading-[1.7] text-text-sand text-pretty">
                {project.problem}
              </p>
              <p className="text-[14px] leading-[1.7] text-text-muted text-pretty">
                {project.solution}
              </p>
            </div>

            <div className="flex-[1_1_210px] min-w-[190px]">
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

            {project.links?.length ? (
              <div className="flex gap-[clamp(14px,1.6vw,26px)] font-mono text-[10px] tracking-[0.16em] uppercase">
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label} →
                  </a>
                ))}
              </div>
            ) : null}
          </div>
        </article>
      ))}
    </>
  );
}
