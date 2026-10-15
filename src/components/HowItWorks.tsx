import { CalendarClock, CheckCircle2, MessageSquare, Truck, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const STEPS: { no: string; title: string; text: string; icon: LucideIcon }[] = [
  {
    no: "01",
    title: "Tell Us Your Requirement",
    text: "Share the work, site location and timeline by call, WhatsApp or the quote form.",
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

export function HowItWorks() {
  return (
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
  );
}
