import { createFileRoute } from "@tanstack/react-router";
import { CTABand } from "@/components/CTABand";
import { MachineCard } from "@/components/MachineCard";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { useMachines } from "@/hooks/useContent";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/machinery/")({
  head: () => ({
    meta: [
      { title: `Machinery Catalogue | ${SITE.name}` },
      {
        name: "description",
        content:
          "Skid-steer loaders, compact excavators and loaders operated by Mukesh Machinery & Equipment for earthmoving, excavation and material handling in Keonjhar, Odisha.",
      },
      { property: "og:title", content: `Machinery Catalogue | ${SITE.name}` },
      {
        property: "og:description",
        content: "Machines available for construction, excavation and earthmoving work.",
      },
    ],
  }),
  component: MachineryPage,
});

function MachineryPage() {
  const { data: machines } = useMachines();

  return (
    <>
      <PageHeader
        eyebrow="Machinery"
        title="Machinery Catalogue"
        description="Machines used and provided by Mukesh Machinery & Equipment. Detailed technical specifications will be published as they are confirmed."
      />

      <section className="py-16 md:py-20">
        <div className="container-x grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {machines.map((m, i) => (
            <Reveal key={m.slug} delay={(i % 3) * 80}>
              <MachineCard machine={m} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand />
    </>
  );
}
