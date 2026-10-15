import { createFileRoute, useSearch } from "@tanstack/react-router";
import { z } from "zod";
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  CheckCircle2,
  Clock,
  Headphones,
  MessageCircle,
  MessageSquare,
  Phone,
  ShieldCheck,
  Truck,
  type LucideIcon,
} from "lucide-react";

import { PageHeader } from "@/components/PageHeader";
import { QuoteForm } from "@/components/QuoteForm";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { BtnAnchor } from "@/components/Btn";
import { SITE, telHref, whatsappHref } from "@/lib/site";

const searchSchema = z.object({
  machine: z.string().optional().catch(undefined),
  service: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/quote")({
  validateSearch: searchSchema,
  head: ({ search }) => {
    const machine = search?.machine;
    const title = machine
      ? `Request Service for ${machine} | ${SITE.name}`
      : `Request a Quote | ${SITE.name}`;
    const description = machine
      ? `Request ${machine} service from ${SITE.name} in ${SITE.city}, ${SITE.state}. Fill out the form or call ${SITE.phoneDisplay}.`
      : `Get a free, no-obligation quote from ${SITE.name} for construction and earthmoving machinery services in ${SITE.city}, ${SITE.state}.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: QuotePage,
});

/* ── Trust badges ── */
const BADGES: { icon: LucideIcon; label: string }[] = [
  { icon: ShieldCheck, label: "No-Obligation Quote" },
  { icon: Clock, label: "Response Within Hours" },
  { icon: BadgeCheck, label: "Professional Service" },
  { icon: Headphones, label: "Talk to the Owner" },
];

/* ── How it works steps ── */
const STEPS: { no: string; title: string; text: string; icon: LucideIcon }[] = [
  {
    no: "01",
    title: "Tell Us Your Requirement",
    text: "Share the work, site location and timeline using the form below — or call us.",
    icon: MessageSquare,
  },
  {
    no: "02",
    title: "Choose the Right Machine",
    text: "We suggest the machine and approach best suited to your ground and access.",
    icon: Truck,
  },
  {
    no: "03",
    title: "Schedule the Service",
    text: "We confirm timing, duration and terms so everything is agreed in advance.",
    icon: CalendarClock,
  },
  {
    no: "04",
    title: "Get the Work Done",
    text: "The machine reaches your site and the work is completed as planned.",
    icon: CheckCircle2,
  },
];

/* ── Page ── */
function QuotePage() {
  const { machine, service } = useSearch({ from: "/quote" });

  const isServiceRequest = Boolean(machine);

  const headerTitle = isServiceRequest
    ? `Request Service — ${machine}`
    : "Request a Quote";

  const headerDescription = isServiceRequest
    ? `Fill in the details below and we'll arrange ${machine} service for your project. You can also call or WhatsApp us directly.`
    : `Tell us about your project and we'll get back to you with a clear, no-obligation quote. You can also call or WhatsApp us directly.`;

  return (
    <>
      {/* ── Hero Header ── */}
      <PageHeader
        eyebrow={isServiceRequest ? "Request Service" : "Get a Quote"}
        title={headerTitle}
        description={headerDescription}
      />

      {/* ── Trust Badges ── */}
      <section className="border-b border-border bg-surface py-5 md:py-6">
        <div className="container-x">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {BADGES.map((b, i) => (
              <Reveal key={b.label} delay={i * 60}>
                <div className="flex items-center gap-3 py-2">
                  <b.icon className="size-5 shrink-0 text-primary" aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-wide text-foreground md:text-sm">
                    {b.label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Form Section ── */}
      <section className="py-14 md:py-20">
        <div className="container-x">
          <div className="grid items-start gap-10 lg:grid-cols-5">
            {/* Form — takes wider column */}
            <div className="lg:col-span-3">
              <Reveal>
                <QuoteForm defaultMachine={machine} defaultService={service} />
              </Reveal>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-2">
              <Reveal delay={100}>
                <div className="border border-border bg-card p-7">
                  <h3 className="text-xl">Prefer to Talk?</h3>
                  <span className="mt-3 block h-[3px] w-10 bg-primary" />
                  <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                    Call or WhatsApp <strong className="text-foreground">{SITE.owner}</strong> directly.
                    No call centres, no waiting. You speak straight to the owner.
                  </p>
                  <div className="mt-6 grid gap-3">
                    <BtnAnchor href={telHref}>
                      <Phone className="size-4" aria-hidden="true" /> Call {SITE.phoneDisplay}
                    </BtnAnchor>
                    <BtnAnchor
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="dark"
                    >
                      <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp Us
                    </BtnAnchor>
                  </div>
                </div>
              </Reveal>

              {/* Quick Info */}
              <Reveal delay={180}>
                <div className="mt-5 border border-border bg-surface p-7">
                  <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">
                    What Happens Next?
                  </h4>
                  <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <ArrowRight className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      We review your requirement and call you back
                    </li>
                    <li className="flex gap-3">
                      <ArrowRight className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      We suggest the right machine for the job
                    </li>
                    <li className="flex gap-3">
                      <ArrowRight className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      Agree on timing, terms and pricing
                    </li>
                    <li className="flex gap-3">
                      <ArrowRight className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                      Machine reaches your site as scheduled
                    </li>
                  </ul>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      {/* ── How It Works Band ── */}
      <section className="bg-ink py-16 md:py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="How It Works"
            title="Four simple steps"
            description="From first call to finished work, the process stays clear and predictable."
            tone="dark"
          />
          <div className="mt-12 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <Reveal key={s.no} delay={i * 80}>
                <article className="group h-full bg-ink p-7 transition-colors hover:bg-charcoal">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl text-white/15 transition-colors group-hover:text-primary/60">
                      {s.no}
                    </span>
                    <s.icon className="size-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="mt-6 text-base leading-tight text-white">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/65">{s.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-primary py-12 md:py-16">
        <div className="container-x flex flex-col items-center gap-5 text-center">
          <h2 className="text-2xl leading-tight text-primary-foreground md:text-3xl">
            Still have questions?
          </h2>
          <p className="max-w-xl text-sm text-primary-foreground/85 md:text-base">
            Call {SITE.owner.split(" ")[0]} directly and discuss your project. No pressure, no obligation.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <BtnAnchor href={telHref} size="lg" variant="dark">
              <Phone className="size-4" aria-hidden="true" /> {SITE.phoneDisplay}
            </BtnAnchor>
            <BtnAnchor
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              variant="outline"
              className="border-ink/30 text-ink hover:border-ink hover:text-ink"
            >
              <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
            </BtnAnchor>
          </div>
        </div>
      </section>
    </>
  );
}
