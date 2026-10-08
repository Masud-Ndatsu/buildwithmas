import Image from "next/image";
import type { Project } from "@/lib/content";

/** Real screenshot when there is one, otherwise a quiet typographic tile. */
export function ProjectImage({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <div className="shot relative aspect-[16/10] overflow-hidden rounded-xl border border-line bg-surface">
      {project.image ? (
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 1100px"
          className="object-cover object-top"
        />
      ) : (
        <div className="flex h-full items-end p-6 sm:p-8">
          <span className="display text-4xl text-foreground/80 sm:text-5xl">
            {project.name}
          </span>
        </div>
      )}
    </div>
  );
}
