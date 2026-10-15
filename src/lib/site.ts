/**
 * Central business configuration.
 * Update these values (or the matching rows in the site_settings table) to
 * change contact details everywhere on the site.
 */
export const SITE = {
  name: "Mukesh Machinery & Equipment",
  shortName: "MUKESH",
  tagline: "Built for a Better Tomorrow",
  owner: "Mukesh Kumar Verma",
  phone: "9661483538",
  phoneDisplay: "+91 96614 83538",
  whatsapp: "919661483538",
  email: "mukeshbobcat@gmail.com",
  addressLine: "Gandhi Chowk, Keonjhar",
  addressFull: "Gandhi Chowk, Keonjhar, Odisha – 758001, India",
  city: "Keonjhar",
  state: "Odisha",
  postcode: "758001",
  mapsQuery: "Gandhi Chowk, Keonjhar, Odisha 758001, India",
} as const;

export const telHref = `tel:+91${SITE.phone}`;
export const mailHref = `mailto:${SITE.email}`;
export const whatsappHref = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(
  "Hello, I would like to enquire about machinery services.",
)}`;
export const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  SITE.mapsQuery,
)}`;

export const SERVICE_OPTIONS = [
  "Earthmoving",
  "Excavation",
  "Site Preparation",
  "Material Handling",
  "Land Leveling",
  "Construction Support",
  "Debris Handling",
  "Machinery-on-Service",
  "Other",
];
