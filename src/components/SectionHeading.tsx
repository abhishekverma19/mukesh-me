import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-[0.22em]",
            tone === "dark" ? "text-primary" : "text-primary",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Tag
        className={cn(
          "text-3xl leading-tight md:text-4xl",
          tone === "dark" ? "text-ink-foreground" : "text-foreground",
        )}
      >
        {title}
      </Tag>
      <span
        className={cn(
          "mt-4 block h-[3px] w-12 bg-primary",
          align === "center" && "mx-auto",
        )}
      />
      {description ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed",
            tone === "dark" ? "text-white/70" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
