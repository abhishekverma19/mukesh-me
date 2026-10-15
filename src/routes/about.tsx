import { createFileRoute } from "@tanstack/react-router";
import {
  Award,
  BadgeCheck,
  Building2,
  Calendar,
  Handshake,
  MapPin,
  ShieldCheck,
  Target,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { CTABand } from "@/components/CTABand";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About Us | ${SITE.name}` },
      {
        name: "description",
        content: `Learn about ${SITE.name}, founded by ${SITE.owner} in ${SITE.city}, ${SITE.state}. Trusted construction and earthmoving machinery services since 2015.`,
      },
      { property: "og:title", content: `About Us | ${SITE.name}` },
      {
        property: "og:description",
        content: `${SITE.name} — reliable construction and earthmoving machinery services in ${SITE.city}, ${SITE.state}.`,
      },
    ],
  }),
  component: AboutPage,
});

const VALUES: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: ShieldCheck,
    title: "Reliability First",
    text: "Every machine is maintained to perform under demanding site conditions so your project never stalls.",
  },
  {
    icon: Handshake,
    title: "Honest Dealings",
    text: "Clear quotes, transparent pricing and straightforward communication — no hidden charges, no surprises.",
  },
  {
    icon: BadgeCheck,
    title: "Professional Standards",
    text: "Disciplined operators, punctual arrivals and clean work — we treat every site the same, big or small.",
  },
  {
    icon: Target,
    title: "Customer Focused",
    text: "We listen to your requirement first, then suggest the right machine and approach for your ground.",
  },
];

const MILESTONES: { year: string; text: string }[] = [
  { year: "2015", text: "Mukesh Machinery & Equipment established in Keonjhar, Odisha" },
  { year: "2017", text: "Expanded fleet with compact excavators and backhoe loaders" },
  { year: "2019", text: "Started providing machinery-on-service for large construction projects" },
  { year: "2021", text: "Built a trusted network of clients across Keonjhar district" },
  { year: "2023", text: "Added modern Bobcat skid-steer loaders for precision earthmoving" },
  { year: "2025", text: "Continuing to grow with a focus on dependable service and modern equipment" },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us"
        title="Built for a Better Tomorrow"
        description={`${SITE.name} has been delivering dependable machinery services to construction sites across ${SITE.city}, ${SITE.state} — with professional handling and honest service at the core.`}
      />

      {/* Owner & Story */}
      <section className="py-16 md:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="aspect-square max-w-md overflow-hidden border border-border bg-ink p-8 md:p-12">
                <img
                  src="/m-logo.png"
                  alt={`${SITE.name} logo`}
                  width={480}
                  height={160}
                  className="size-full object-contain"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 border border-primary bg-primary/10 px-6 py-3">
                <p className="font-display text-sm uppercase tracking-wider text-primary">
                  Since 2015
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Our Story
              </p>
              <h2 className="text-3xl leading-tight md:text-4xl">
                From One Machine to a Trusted Name
              </h2>
              <span className="mt-4 block h-[3px] w-12 bg-primary" />
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
                <p>
                  <strong className="text-foreground">{SITE.name}</strong> was founded by{" "}
                  <strong className="text-foreground">{SITE.owner}</strong> with a single vision — to
                  provide reliable, well-maintained machinery and professional operators to
                  construction sites that need them most.
                </p>
                <p>
                  Starting with one compact machine and a commitment to honest work, the business has
                  steadily grown into a dependable name for earthmoving, excavation, site preparation
                  and material handling in and around {SITE.city}, {SITE.state}.
                </p>
                <p>
                  Today, {SITE.shortName} operates a range of powerful machinery — including Bobcat
                  skid-steer loaders, compact excavators and backhoe loaders — serving construction
                  companies, builders and individual project owners across the district.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div className="border border-border bg-surface p-4 text-center">
                  <p className="font-display text-2xl text-primary">10+</p>
                  <p className="mt-1 text-xs text-muted-foreground">Years Experience</p>
                </div>
                <div className="border border-border bg-surface p-4 text-center">
                  <p className="font-display text-2xl text-primary">500+</p>
                  <p className="mt-1 text-xs text-muted-foreground">Projects Served</p>
                </div>
                <div className="border border-border bg-surface p-4 text-center">
                  <p className="font-display text-2xl text-primary">100%</p>
                  <p className="mt-1 text-xs text-muted-foreground">Client Focus</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Owner Spotlight */}
      <section className="bg-ink py-16 md:py-24">
        <div className="container-x">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal>
              <div className="mx-auto mb-6 flex size-20 items-center justify-center border-2 border-primary/40 bg-primary/10">
                <Users className="size-10 text-primary" />
              </div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                Founder & Owner
              </p>
              <h2 className="text-3xl leading-tight text-white md:text-4xl">{SITE.owner}</h2>
              <span className="mx-auto mt-4 block h-[3px] w-12 bg-primary" />
              <p className="mt-6 text-base leading-relaxed text-white/70 md:text-lg">
                With over a decade of hands-on experience in construction machinery, {SITE.owner} has
                built {SITE.name} on the principles of reliability, honest work and customer
                satisfaction. Every machine that leaves for a site carries his personal commitment to
                getting the job done right.
              </p>
              <div className="mt-8 inline-flex items-center gap-3 border border-white/15 bg-white/5 px-6 py-3">
                <MapPin className="size-4 text-primary" />
                <span className="text-sm text-white/80">{SITE.addressFull}</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Values"
            title="What we stand for"
            description="The principles behind every job we take on."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <article className="group h-full border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lift">
                  <v.icon className="size-7 text-primary" aria-hidden="true" />
                  <h3 className="mt-5 text-lg leading-tight">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-surface py-16 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our Journey"
            title="Milestones along the way"
            description={`From a single machine to a full-service machinery provider in ${SITE.city}.`}
          />

          <div className="relative mt-12 ml-4 border-l-2 border-primary/30 pl-8 md:ml-8 md:pl-12">
            {MILESTONES.map((m, i) => (
              <Reveal key={m.year} delay={i * 100}>
                <div className="relative mb-10 last:mb-0">
                  <div className="absolute -left-[calc(2rem+9px)] top-1 size-4 border-2 border-primary bg-background md:-left-[calc(3rem+9px)]" />
                  <p className="font-display text-xl text-primary">{m.year}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
                    {m.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="bg-ink py-16 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="What We Do"
            title="Services at a Glance"
            description="A quick look at the machinery and support we bring to your site."
            tone="dark"
          />
          <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Truck, label: "Earthmoving & Excavation" },
              { icon: Building2, label: "Site Preparation" },
              { icon: Award, label: "Material Handling" },
              { icon: Calendar, label: "Machinery-on-Service" },
            ].map((item, i) => (
              <Reveal key={item.label} delay={i * 80}>
                <article className="group flex h-full flex-col items-center bg-ink p-8 text-center transition-colors hover:bg-charcoal">
                  <item.icon className="size-8 text-primary" aria-hidden="true" />
                  <h3 className="mt-4 text-base leading-tight text-white">{item.label}</h3>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
