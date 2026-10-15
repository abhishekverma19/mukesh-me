import { ArrowRight, Phone } from "lucide-react";
import { BtnAnchor, BtnLink } from "@/components/Btn";
import { SITE, telHref } from "@/lib/site";

export function CTABand() {
  return (
    <section className="bg-primary py-12 md:py-16">
      <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl leading-tight text-primary-foreground md:text-3xl">
            Need machinery for your site?
          </h2>
          <p className="mt-2 max-w-xl text-sm text-primary-foreground/85 md:text-base">
            Tell us what the job needs and we will get back to you with a clear quote.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <BtnLink to="/quote" size="lg" variant="dark">
            Request a Quote <ArrowRight className="size-4" aria-hidden="true" />
          </BtnLink>
          <BtnAnchor
            href={telHref}
            size="lg"
            variant="outline"
            className="border-ink/30 text-ink hover:border-ink hover:text-ink"
          >
            <Phone className="size-4" aria-hidden="true" /> {SITE.phoneDisplay}
          </BtnAnchor>
        </div>
      </div>
    </section>
  );
}
