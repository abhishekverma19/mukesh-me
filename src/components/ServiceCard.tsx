import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  HardHat,
  LayoutGrid,
  Mountain,
  PackageOpen,
  Ruler,
  Shovel,
  Trash2,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/data/content";

const ICONS: Record<string, LucideIcon> = {
  Mountain,
  Shovel,
  LayoutGrid,
  PackageOpen,
  Ruler,
  HardHat,
  Trash2,
  Truck,
  Wrench,
};

export function ServiceCard({ service }: { service: Service }) {
  const Icon = ICONS[service.icon] ?? Wrench;
  return (
    <article className="group flex h-full flex-col border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lift">
      <span className="inline-flex size-12 items-center justify-center bg-ink text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-6" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-lg leading-tight">{service.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {service.description}
      </p>
      <Link
        to="/quote"
        search={{ service: service.title }}
        className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-foreground transition-colors hover:text-primary"
      >
        Request Service <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </article>
  );
}
