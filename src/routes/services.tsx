import { createFileRoute } from "@tanstack/react-router";
import { CTABand } from "@/components/CTABand";
import { HowItWorks } from "@/components/HowItWorks";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { useServices } from "@/hooks/useContent";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: `Machinery Services | ${SITE.name}` },
      {
        name: "description",
        content:
          "Earthmoving, excavation, site preparation, material handling, land levelling, debris handling and construction support in Keonjhar, Odisha.",
      },
      { property: "og:title", content: `Machinery Services | ${SITE.name}` },
      {
        property: "og:description",
        content: "Machinery services for construction and earthmoving requirements.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { data: services } = useServices();

  return (
    <>
      <PageHeader
        eyebrow="Services"
        title="Machinery Services"
        description="Machinery and operators for the groundwork behind every construction project — arranged hourly, daily or for the full project."
      />

      <section className="py-16 md:py-20">
        <div className="container-x grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 4) * 60}>
              <ServiceCard service={s} />
            </Reveal>
          ))}
        </div>
      </section>

      <HowItWorks />
      <CTABand />
    </>
  );
}
