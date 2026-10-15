import { ArrowRight, Phone } from "lucide-react";
import heroImage from "@/assets/hero-machinery.jpg";
import { BtnAnchor, BtnLink } from "@/components/Btn";
import { SITE, telHref } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <img
        src={heroImage}
        alt="Compact loader moving earth on a construction site at sunset"
        width={1920}
        height={1088}
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover opacity-55"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/25"
        aria-hidden="true"
      />

      <div className="container-x relative py-20 md:py-32 lg:py-40">
        <div className="max-w-2xl">
          <p className="mb-5 inline-flex items-center gap-2 border border-white/20 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/85">
            <span className="size-1.5 bg-primary" aria-hidden="true" />
            {SITE.city}, {SITE.state}
          </p>
          <h1 className="text-4xl leading-[1.02] text-white sm:text-5xl lg:text-6xl">
            Reliable Machinery.
            <span className="block text-primary">Professional Service.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            Powerful construction and earthmoving machinery for projects that demand reliability,
            efficiency and professional service.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <BtnLink to="/quote" size="lg">
              Request a Quote <ArrowRight className="size-4" aria-hidden="true" />
            </BtnLink>
            <BtnLink to="/machinery" size="lg" variant="outline" className="border-white/30 text-white">
              View Machinery
            </BtnLink>
            <BtnAnchor href={telHref} size="lg" variant="ghost" className="text-white">
              <Phone className="size-4 text-primary" aria-hidden="true" /> Call Now
            </BtnAnchor>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-ink/80">
        <div className="container-x grid grid-cols-2 divide-x divide-white/10 md:grid-cols-4">
          {[
            "Earthmoving & Excavation",
            "Site Preparation",
            "Material Handling",
            "Machinery-on-Service",
          ].map((item) => (
            <p
              key={item}
              className="px-3 py-4 text-center text-[11px] font-semibold uppercase tracking-wider text-white/70 md:text-xs"
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
