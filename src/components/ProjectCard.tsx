import { MapPin } from "lucide-react";
import type { Project } from "@/data/content";
import { resolveImage } from "@/lib/images";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group overflow-hidden border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-4/3 overflow-hidden bg-surface">
        <img
          src={resolveImage(project.image_url, project.image_key)}
          alt={project.name}
          loading="lazy"
          width={1024}
          height={768}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-0 top-4 bg-primary px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground">
          {project.service_type}
        </span>
        {project.is_sample ? (
          <span className="absolute right-3 top-4 bg-ink/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white">
            Sample entry
          </span>
        ) : null}
      </div>
      <div className="p-6">
        <h3 className="text-lg leading-tight">{project.name}</h3>
        <p className="mt-2 flex items-center gap-1.5 text-xs uppercase tracking-wide text-muted-foreground">
          <MapPin className="size-3.5 text-primary" aria-hidden="true" /> {project.location}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
      </div>
    </article>
  );
}
