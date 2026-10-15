import { Link } from "@tanstack/react-router";
import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

import { BtnAnchor, BtnLink } from "@/components/Btn";
import { SITE, telHref } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/machinery", label: "Machinery" },
  { to: "/services", label: "Services" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-white/10 bg-ink/95 backdrop-blur transition-shadow",
        scrolled && "shadow-lift",
      )}
    >
      <div className="container-x flex h-18 items-center justify-between gap-4 py-3">
        <Link to="/" className="flex shrink-0 items-center" aria-label={`${SITE.name} home`}>
          <img
            src="/m-logo.png"
            alt={`${SITE.name} logo`}
            width={480}
            height={160}
            className="h-10 w-auto md:h-12"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-primary" }}
              className="text-sm font-semibold uppercase tracking-wide text-white/80 transition-colors hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <BtnAnchor href={telHref} variant="outline" className="border-white/25 text-white">
            <Phone className="size-4" aria-hidden="true" /> Call Now
          </BtnAnchor>
          <BtnLink to="/quote">Request a Quote</BtnLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex size-11 items-center justify-center rounded-sm border border-white/20 text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-ink lg:hidden">
          <nav className="container-x flex flex-col py-4" aria-label="Mobile navigation">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "text-primary" }}
                className="border-b border-white/10 py-3.5 text-sm font-semibold uppercase tracking-wide text-white/85"
              >
                {item.label}
              </Link>
            ))}
            <BtnLink to="/quote" size="lg" className="mt-5" onClick={() => setOpen(false)}>
              Request a Quote
            </BtnLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
