import { Mail, MapPin, MessageCircle, Navigation, Phone, User } from "lucide-react";
import { BtnAnchor } from "@/components/Btn";
import { SITE, directionsHref, mailHref, telHref, whatsappHref } from "@/lib/site";

export function ContactSection() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="border border-border bg-card p-7 md:p-9">
        <h2 className="text-2xl">Contact Details</h2>
        <span className="mt-4 block h-[3px] w-12 bg-primary" />
        <ul className="mt-7 space-y-6 text-sm">
          <li className="flex gap-4">
            <User className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Owner
              </p>
              <p className="mt-1 text-base text-foreground">{SITE.owner}</p>
            </div>
          </li>
          <li className="flex gap-4">
            <Phone className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Phone
              </p>
              <a href={telHref} className="mt-1 block text-base hover:text-primary">
                {SITE.phoneDisplay}
              </a>
            </div>
          </li>
          <li className="flex gap-4">
            <Mail className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Email
              </p>
              <a href={mailHref} className="mt-1 block break-all text-base hover:text-primary">
                {SITE.email}
              </a>
            </div>
          </li>
          <li className="flex gap-4">
            <MapPin className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Location
              </p>
              <p className="mt-1 text-base">{SITE.addressFull}</p>
            </div>
          </li>
        </ul>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <BtnAnchor href={telHref}>
            <Phone className="size-4" aria-hidden="true" /> Call Now
          </BtnAnchor>
          <BtnAnchor
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="dark"
          >
            <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
          </BtnAnchor>
          <BtnAnchor href={mailHref} variant="outline">
            <Mail className="size-4" aria-hidden="true" /> Email
          </BtnAnchor>
          <BtnAnchor
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
          >
            <Navigation className="size-4" aria-hidden="true" /> Get Directions
          </BtnAnchor>
        </div>
      </div>

      <div className="min-h-80 overflow-hidden border border-border bg-surface">
        <iframe
          title={`Map showing ${SITE.addressFull}`}
          src={`https://www.google.com/maps?q=${encodeURIComponent(SITE.mapsQuery)}&output=embed`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="size-full min-h-80 border-0"
        />
      </div>
    </div>
  );
}
