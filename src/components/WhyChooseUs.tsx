import {
  BadgeCheck,
  Gauge,
  Handshake,
  MapPin,
  Settings2,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";

const FEATURES: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: ShieldCheck,
    title: "Reliable Machinery",
    text: "Machines kept in working condition so your site keeps moving to schedule.",
  },
  {
    icon: BadgeCheck,
    title: "Professional Service",
    text: "Clear communication, punctual arrival and disciplined work on every job.",
  },
  {
    icon: Gauge,
    title: "Powerful Equipment",
    text: "Equipment matched to the load, ground and access conditions of your site.",
  },
  {
    icon: Settings2,
    title: "Flexible Solutions",
    text: "Hourly, daily or project-based arrangements shaped around your requirement.",
  },
  {
    icon: MapPin,
    title: "Local Support",
    text: "Based in Keonjhar, Odisha — quick to reach sites in and around the district.",
  },
  {
    icon: Handshake,
    title: "Customer Focused",
    text: "Straightforward quotes, honest advice and follow-through until work is done.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="container-x">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Machinery you can depend on"
          description="Every project is different. What stays the same is dependable equipment, professional handling and a straightforward way of working."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <article className="group h-full border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-lift">
                <f.icon className="size-7 text-primary" aria-hidden="true" />
                <h3 className="mt-5 text-lg leading-tight">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
