import { Link } from "@tanstack/react-router";
import { FileText, MessageCircle, Phone } from "lucide-react";
import { telHref, whatsappHref } from "@/lib/site";

export function MobileCTABar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-white/10 bg-ink text-white lg:hidden">
      <a
        href={telHref}
        className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold uppercase tracking-wide"
      >
        <Phone className="size-4 text-primary" aria-hidden="true" /> Call
      </a>
      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center gap-1 border-x border-white/10 py-2.5 text-[11px] font-semibold uppercase tracking-wide"
      >
        <MessageCircle className="size-4 text-primary" aria-hidden="true" /> WhatsApp
      </a>
      <Link
        to="/quote"
        className="flex flex-col items-center gap-1 bg-primary py-2.5 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground"
      >
        <FileText className="size-4" aria-hidden="true" /> Quote
      </Link>
    </div>
  );
}
