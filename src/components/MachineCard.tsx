import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Machine } from "@/data/content";
import { resolveImage } from "@/lib/images";

export function MachineCard({ machine }: { machine: Machine }) {
  const available = machine.availability.toLowerCase().includes("available");
  return (
    <article className="group flex h-full flex-col overflow-hidden border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className={`relative overflow-hidden bg-surface ${machine.image_url ? "" : "aspect-4/3"}`}>
        <img
          src={resolveImage(machine.image_url, machine.image_key)}
          alt={machine.name}
          loading="lazy"
          width={1024}
          height={768}
          className={`w-full transition-transform duration-500 group-hover:scale-105 ${machine.image_url ? "h-auto" : "size-full object-cover"}`}
        />
        <span className="absolute left-0 top-4 bg-ink px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
          {machine.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl leading-tight">{machine.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{machine.description}</p>

        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Applications
        </p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          {machine.applications.slice(0, 5).map((a) => (
            <li key={a} className="bg-surface px-2.5 py-1 text-xs text-foreground">
              {a}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center gap-2 text-sm">
          <span
            className={`size-2 rounded-full ${available ? "bg-primary" : "bg-steel"}`}
            aria-hidden="true"
          />
          <span className="text-muted-foreground">{machine.availability}</span>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-5">
          <Link
            to={`/quote?machine=${encodeURIComponent(machine.name)}` as string}
            className="inline-flex h-10 items-center gap-2 bg-primary px-4 text-xs font-semibold uppercase tracking-wide text-primary-foreground transition-all hover:brightness-110"
          >
            Request Service
          </Link>
          <Link
            to="/machinery/$slug"
            params={{ slug: machine.slug }}
            className="inline-flex h-10 items-center gap-1.5 px-1 text-xs font-semibold uppercase tracking-wide text-foreground transition-colors hover:text-primary"
          >
            Details <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}
