import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, CheckCircle2, Phone } from "lucide-react";
import { BtnAnchor, BtnLink } from "@/components/Btn";
import { CTABand } from "@/components/CTABand";
import { useMachines } from "@/hooks/useContent";
import { resolveImage } from "@/lib/images";
import { SITE, telHref } from "@/lib/site";

export const Route = createFileRoute("/machinery/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${titleFromSlug(params.slug)} | ${SITE.name}` },
      {
        name: "description",
        content: `Details of the ${titleFromSlug(params.slug)} operated by ${SITE.name} for construction and earthmoving work in Keonjhar, Odisha.`,
      },
      { property: "og:title", content: `${titleFromSlug(params.slug)} | ${SITE.name}` },
      {
        property: "og:description",
        content: `Machine details and applications from ${SITE.name}.`,
      },
    ],
  }),
  component: MachineDetail,
});

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

function MachineDetail() {
  const { slug } = Route.useParams();
  const { data: machines } = useMachines();
  const machine = machines.find((m) => m.slug === slug);

  if (!machine) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="text-3xl">Machine not found</h1>
        <p className="mt-3 text-muted-foreground">
          This machine is no longer listed. Browse the full catalogue instead.
        </p>
        <BtnLink to="/machinery" className="mt-7">
          Back to machinery
        </BtnLink>
      </div>
    );
  }

  const specs = Object.entries(machine.specifications ?? {});

  return (
    <>
      <section className="border-b border-border py-10 md:py-16">
        <div className="container-x">
          <Link
            to="/machinery"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="size-4" aria-hidden="true" /> All machinery
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-2">
            <div className="overflow-hidden border border-border bg-surface">
              <img
                src={resolveImage(machine.image_url, machine.image_key)}
                alt={machine.name}
                width={1024}
                height={768}
                className={machine.image_url ? "w-full h-auto" : "aspect-4/3 size-full object-cover"}
              />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                {machine.category}
              </p>
              <h1 className="mt-3 text-3xl leading-tight md:text-4xl">{machine.name}</h1>
              <span className="mt-5 block h-[3px] w-12 bg-primary" />
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {machine.description}
              </p>

              <h2 className="mt-9 text-base">Main Applications</h2>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {machine.applications.map((a) => (
                  <li key={a} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="size-4 shrink-0 text-primary" aria-hidden="true" />
                    {a}
                  </li>
                ))}
              </ul>

              <h2 className="mt-9 text-base">Specifications</h2>
              {specs.length > 0 ? (
                <dl className="mt-4 divide-y divide-border border border-border">
                  {specs.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 px-4 py-3 text-sm">
                      <dt className="text-muted-foreground">{k}</dt>
                      <dd className="font-medium">{String(v)}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-4 border border-dashed border-border p-4 text-sm text-muted-foreground">
                  Technical specifications for this machine will be published once confirmed. Call
                  us for exact capability details for your site.
                </p>
              )}

              <p className="mt-7 text-sm">
                <span className="text-muted-foreground">Availability: </span>
                <span className="font-semibold">{machine.availability}</span>
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <BtnLink to={`/quote?machine=${encodeURIComponent(machine.name)}` as string} size="lg">
                  Request Service
                </BtnLink>
                <BtnAnchor href={telHref} size="lg" variant="outline">
                  <Phone className="size-4" aria-hidden="true" /> {SITE.phoneDisplay}
                </BtnAnchor>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
