import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CTABand } from "@/components/CTABand";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { MachineCard } from "@/components/MachineCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { useMachines, useServices } from "@/hooks/useContent";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} | Construction & Earthmoving Machinery Services` },
      {
        name: "description",
        content:
          "Reliable machinery and professional service for earthmoving, excavation, site preparation and material handling in Keonjhar, Odisha.",
      },
      {
        property: "og:title",
        content: `${SITE.name} | Construction & Earthmoving Machinery Services`,
      },
      {
        property: "og:description",
        content:
          "Powerful construction and earthmoving machinery for projects that demand reliability, efficiency and professional service.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { data: machines } = useMachines();
  const { data: services } = useServices();

  return (
    <>
      <Hero />
      <WhyChooseUs />

      <section className="py-16 md:py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Machinery"
              title="Equipment we operate"
              description="Machines used and provided by Mukesh Machinery & Equipment for construction and earthmoving work."
            />
            <Link
              to="/machinery"
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide hover:text-primary"
            >
              View all machinery <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {machines.slice(0, 3).map((m, i) => (
              <Reveal key={m.slug} delay={i * 80}>
                <MachineCard machine={m} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Services"
            title="What we take on"
            description="From breaking ground to clearing a finished site, we provide the machinery and the operators."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.slice(0, 8).map((s, i) => (
              <Reveal key={s.slug} delay={(i % 4) * 60}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks />
      <CTABand />
    </>
  );
}
