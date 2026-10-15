import { createFileRoute } from "@tanstack/react-router";
import { ContactSection } from "@/components/ContactSection";
import { CTABand } from "@/components/CTABand";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import {
  Clock,
  Headphones,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { SITE, telHref, whatsappHref } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact Us | ${SITE.name}` },
      {
        name: "description",
        content: `Get in touch with ${SITE.name} for machinery services in ${SITE.city}, ${SITE.state}. Call ${SITE.owner} at ${SITE.phoneDisplay} or visit us at ${SITE.addressLine}.`,
      },
      { property: "og:title", content: `Contact Us | ${SITE.name}` },
      {
        property: "og:description",
        content: `Reach out to ${SITE.name} for construction and earthmoving machinery services.`,
      },
    ],
  }),
  component: ContactPage,
});

const REASONS: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Headphones,
    title: "Quick Response",
    text: "Call or WhatsApp us and get a response within hours, not days.",
  },
  {
    icon: Clock,
    title: "Flexible Timing",
    text: "We work around your project schedule — early starts, extended hours, whatever it takes.",
  },
  {
    icon: ShieldCheck,
    title: "No-Obligation Quote",
    text: "Tell us the work and site details. We'll give you an honest quote with no pressure.",
  },
];

function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in Touch"
        description={`Have a project that needs machinery? Reach out to ${SITE.owner} directly — by phone, WhatsApp or the contact details below.`}
      />

      {/* Quick Contact Badges */}
      <section className="bg-surface py-8 md:py-10">
        <div className="container-x">
          <div className="grid gap-4 sm:grid-cols-3">
            <Reveal>
              <a
                href={telHref}
                className="group flex items-center gap-4 border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lift"
              >
                <div className="flex size-12 shrink-0 items-center justify-center bg-primary/10">
                  <Phone className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Call Now
                  </p>
                  <p className="mt-0.5 text-base font-semibold text-foreground group-hover:text-primary">
                    {SITE.phoneDisplay}
                  </p>
                </div>
              </a>
            </Reveal>

            <Reveal delay={80}>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lift"
              >
                <div className="flex size-12 shrink-0 items-center justify-center bg-primary/10">
                  <MessageCircle className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    WhatsApp
                  </p>
                  <p className="mt-0.5 text-base font-semibold text-foreground group-hover:text-primary">
                    Message Us
                  </p>
                </div>
              </a>
            </Reveal>

            <Reveal delay={160}>
              <div className="group flex items-center gap-4 border border-border bg-card p-5">
                <div className="flex size-12 shrink-0 items-center justify-center bg-primary/10">
                  <MapPin className="size-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Location
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground">
                    {SITE.addressLine}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <ContactSection />
        </div>
      </section>

      {/* About the Owner in Contact Context */}
      <section className="bg-ink py-16 md:py-24">
        <div className="container-x">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
                  Who You're Reaching
                </p>
                <h2 className="text-3xl leading-tight text-white md:text-4xl">
                  Talk Directly to the Owner
                </h2>
                <span className="mt-4 block h-[3px] w-12 bg-primary" />
                <p className="mt-6 text-base leading-relaxed text-white/70">
                  When you call {SITE.name}, you speak directly with{" "}
                  <strong className="text-white">{SITE.owner}</strong> — the founder and owner. There
                  are no call centres, no middlemen. {SITE.owner} personally understands your
                  requirement, suggests the right machinery and ensures the work is done to your
                  satisfaction.
                </p>
                <p className="mt-4 text-base leading-relaxed text-white/70">
                  Based in {SITE.city}, {SITE.state}, with over a decade of experience in
                  construction and earthmoving machinery, he brings practical knowledge and a
                  commitment to getting the job done right — every time.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={telHref}
                    className="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-all hover:-translate-y-0.5 hover:brightness-110"
                  >
                    <Phone className="size-4" /> Call {SITE.owner.split(" ")[0]}
                  </a>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-white/20 bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-all hover:border-primary hover:text-primary"
                  >
                    <MessageCircle className="size-4" /> WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="flex items-center justify-center">
                <div className="w-full max-w-sm border border-white/10 bg-white/5 p-8">
                  <img
                    src="/m-logo.png"
                    alt={`${SITE.name} logo`}
                    width={480}
                    height={160}
                    className="mb-6 h-16 w-auto"
                  />
                  <div className="space-y-4">
                    <div className="border-b border-white/10 pb-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                        Business
                      </p>
                      <p className="mt-1 text-white">{SITE.name}</p>
                    </div>
                    <div className="border-b border-white/10 pb-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                        Owner
                      </p>
                      <p className="mt-1 text-white">{SITE.owner}</p>
                    </div>
                    <div className="border-b border-white/10 pb-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                        Phone
                      </p>
                      <a href={telHref} className="mt-1 block text-white hover:text-primary">
                        {SITE.phoneDisplay}
                      </a>
                    </div>
                    <div className="border-b border-white/10 pb-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                        Email
                      </p>
                      <p className="mt-1 break-all text-white">{SITE.email}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-primary">
                        Address
                      </p>
                      <p className="mt-1 text-sm text-white/80">{SITE.addressFull}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Why Reach Out */}
      <section className="py-16 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why Reach Out"
            title="Making it easy to get started"
            description="We keep the process simple so you can focus on your project."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {REASONS.map((r, i) => (
              <Reveal key={r.title} delay={i * 80}>
                <article className="group h-full border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lift">
                  <r.icon className="size-7 text-primary" aria-hidden="true" />
                  <h3 className="mt-5 text-lg leading-tight">{r.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
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
