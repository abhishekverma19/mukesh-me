export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="border-b border-white/10 bg-ink py-14 md:py-20">
      <div className="container-x">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
          {eyebrow}
        </p>
        <h1 className="max-w-3xl text-4xl leading-[1.05] text-white md:text-5xl">{title}</h1>
        <span className="mt-5 block h-[3px] w-14 bg-primary" />
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/70">{description}</p>
      </div>
    </section>
  );
}
