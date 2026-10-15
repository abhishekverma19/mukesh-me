import { Link } from "@tanstack/react-router";
import { Lock, Mail, MapPin, Phone } from "lucide-react";

import { FALLBACK_SERVICES } from "@/data/content";
import { SITE, mailHref, telHref } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-ink text-white/70">
      <div className="container-x grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <img
            src="/m-logo.png"
            alt={`${SITE.name} logo`}
            width={480}
            height={160}
            loading="lazy"
            className="h-11 w-auto"
          />
          <p className="mt-5 text-sm leading-relaxed">
            Dependable construction and earthmoving machinery services for projects in {SITE.city},{" "}
            {SITE.state}. Machinery, operators and support — arranged the way your site needs it.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm tracking-[0.18em] text-white">Navigation</h3>
          <ul className="space-y-2.5 text-sm">
            {[
              { to: "/", label: "Home" },
              { to: "/about", label: "About Us" },
              { to: "/machinery", label: "Machinery" },
              { to: "/services", label: "Services" },
              { to: "/contact", label: "Contact" },
              { to: "/quote", label: "Request a Quote" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="transition-colors hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm tracking-[0.18em] text-white">Services</h3>
          <ul className="space-y-2.5 text-sm">
            {FALLBACK_SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to="/services" className="transition-colors hover:text-primary">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm tracking-[0.18em] text-white">Contact</h3>
          <ul className="space-y-3.5 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <span>{SITE.addressFull}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <a href={telHref} className="hover:text-primary">
                {SITE.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              <a href={mailHref} className="break-all hover:text-primary">
                {SITE.email}
              </a>
            </li>
          </ul>
          <p className="mt-4 text-sm">
            Owner: <span className="text-white">{SITE.owner}</span>
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-5 text-xs md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <p>
              Bobcat and other machine names are used only to describe equipment operated by us. We
              are not an authorised dealer or distributor of any manufacturer.
            </p>
            <Link
              to="/admin/login"
              className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/20 transition-all hover:border-primary/40 hover:text-primary"
              title="Admin Login"
              aria-label="Admin Login"
            >
              <Lock className="size-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
