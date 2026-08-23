import { statusLabels, type Project } from "@/lib/content";

/**
 * Deployment state. A live project gets the accent dot and links out when a
 * URL is set; anything else stays muted so it cannot read as a promise.
 */
export function ProjectStatus({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) {
  const isLive = project.status === "live";
  const label = statusLabels[project.status];

  const body = (
    <>
      <span
        aria-hidden
        className={`status-dot${isLive ? " is-live" : ""}`}
      />
      {label}
    </>
  );

  const shared = `inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase ${
    isLive ? "text-text-accent" : "text-text-tertiary"
  } ${className}`;

  if (isLive && project.liveUrl) {
    return (
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noreferrer"
        className={`${shared} border-b border-transparent hover:border-bg-accent`}
      >
        {body}
      </a>
    );
  }

  return <span className={shared}>{body}</span>;
}
