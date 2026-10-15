/**
 * Local fallback content. The site reads live data from the database and uses
 * this data whenever the database is unreachable or still empty.
 */

export type Machine = {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  applications: string[];
  specifications: Record<string, string>;
  image_url: string | null;
  image_key: string | null;
  availability: string;
  featured: boolean;
  sort_order: number;
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  icon: string;
  description: string;
  sort_order: number;
};

export type Project = {
  id: string;
  name: string;
  slug: string;
  location: string;
  service_type: string;
  description: string;
  image_url: string | null;
  image_key: string | null;
  is_sample: boolean;
  sort_order: number;
};

export type Inquiry = {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  company: string | null;
  project_location: string;
  service_required: string;
  machine_required: string | null;
  preferred_date: string | null;
  expected_duration: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

export const FALLBACK_MACHINES: Machine[] = [
  {
    id: "fallback-1",
    name: "Bobcat S650 Skid-Steer Loader",
    slug: "bobcat-s650-skid-steer-loader",
    category: "Skid-Steer Loader",
    description:
      "A powerful and compact Bobcat S650 skid-steer loader used for earthmoving, loading, grading and material handling on tight and open sites alike.",
    applications: [
      "Earthmoving",
      "Excavation",
      "Material Handling",
      "Site Preparation",
      "Construction Support",
    ],
    specifications: { "Model": "S650", "Brand": "Bobcat" },
    image_url: "/bobcat-s650.jpg",
    image_key: "skidsteer",
    availability: "Available",
    featured: true,
    sort_order: 1,
  },
  {
    id: "fallback-2",
    name: "Compact Excavator",
    slug: "compact-excavator",
    category: "Excavator",
    description:
      "A compact tracked excavator suited to trenching, foundation digging and controlled excavation work in confined areas.",
    applications: ["Excavation", "Trenching", "Foundation Work", "Debris Handling"],
    specifications: {},
    image_url: null,
    image_key: "excavator",
    availability: "Available",
    featured: true,
    sort_order: 2,
  },
  {
    id: "fallback-3",
    name: "Backhoe Loader",
    slug: "backhoe-loader",
    category: "Loader",
    description:
      "A versatile loader and digger combination for general construction support, loading and site clearing tasks.",
    applications: ["Earthmoving", "Land Leveling", "Material Handling", "Construction Support"],
    specifications: {},
    image_url: null,
    image_key: "backhoe",
    availability: "On Request",
    featured: false,
    sort_order: 3,
  },
  {
    id: "fallback-4",
    name: "Tandem Roller",
    slug: "tandem-roller",
    category: "Roller / Compactor",
    description:
      "A heavy-duty tandem vibratory roller designed for compacting asphalt, gravel and soil on road construction, site preparation and civil engineering projects. Delivers uniform compaction with excellent surface finish.",
    applications: [
      "Road Construction",
      "Asphalt Compaction",
      "Soil Compaction",
      "Site Preparation",
      "Land Leveling",
      "Civil Engineering",
    ],
    specifications: {
      "Type": "Tandem Vibratory Roller",
      "Application": "Asphalt & Soil Compaction",
      "Drum": "Double Drum",
      "Operation Mode": "Static & Vibratory",
    },
    image_url: null,
    image_key: "tandemroller",
    availability: "Available",
    featured: true,
    sort_order: 4,
  },
  {
    id: "fallback-5",
    name: "Bobcat Grader",
    slug: "bobcat-grader",
    category: "Grader",
    description:
      "A Bobcat S650 skid-steer loader fitted with a precision grader attachment for fine grading, leveling and surface finishing. Ideal for preparing building plots, driveways, sports fields and landscaping projects where a smooth, even surface is required.",
    applications: [
      "Land Leveling",
      "Site Preparation",
      "Grading & Finishing",
      "Driveway Preparation",
      "Landscaping",
      "Sports Field Leveling",
    ],
    specifications: {
      "Base Machine": "Bobcat S650",
      "Attachment": "Precision Grader",
      "Application": "Fine Grading & Leveling",
      "Operation": "Skid-Steer Mounted",
    },
    image_url: null,
    image_key: "grader",
    availability: "Available",
    featured: true,
    sort_order: 5,
  },
];

export const FALLBACK_SERVICES: Service[] = [
  {
    id: "s1",
    title: "Earthmoving",
    slug: "earthmoving",
    icon: "Mountain",
    description: "Moving, cutting and filling soil to shape your site to the required profile.",
    sort_order: 1,
  },
  {
    id: "s2",
    title: "Excavation",
    slug: "excavation",
    icon: "Shovel",
    description:
      "Digging for foundations, trenches, pits and utility lines with controlled precision.",
    sort_order: 2,
  },
  {
    id: "s3",
    title: "Site Preparation",
    slug: "site-preparation",
    icon: "LayoutGrid",
    description: "Clearing, grading and preparing ground so construction can start without delay.",
    sort_order: 3,
  },
  {
    id: "s4",
    title: "Material Handling",
    slug: "material-handling",
    icon: "PackageOpen",
    description: "Loading, shifting and stacking sand, gravel, soil and construction material.",
    sort_order: 4,
  },
  {
    id: "s5",
    title: "Land Leveling",
    slug: "land-leveling",
    icon: "Ruler",
    description: "Levelling uneven ground for building plots, yards, roads and open areas.",
    sort_order: 5,
  },
  {
    id: "s6",
    title: "Construction Support",
    slug: "construction-support",
    icon: "HardHat",
    description: "On-site machinery support for ongoing construction and civil works.",
    sort_order: 6,
  },
  {
    id: "s7",
    title: "Debris Handling",
    slug: "debris-handling",
    icon: "Trash2",
    description: "Clearing rubble, demolition waste and site debris quickly and safely.",
    sort_order: 7,
  },
  {
    id: "s8",
    title: "Machinery-on-Service",
    slug: "machinery-on-service",
    icon: "Truck",
    description: "Machinery with operator provided on an hourly, daily or project basis.",
    sort_order: 8,
  },
];

export const FALLBACK_PROJECTS: Project[] = [
  {
    id: "p1",
    name: "Site Grading Works",
    slug: "sample-site-grading",
    location: "Keonjhar, Odisha",
    service_type: "Earthmoving",
    description: "Sample entry. Levelling and grading of an open plot ahead of construction.",
    image_url: null,
    image_key: "earthmoving",
    is_sample: true,
    sort_order: 1,
  },
  {
    id: "p2",
    name: "Foundation Excavation",
    slug: "sample-foundation-excavation",
    location: "Keonjhar, Odisha",
    service_type: "Excavation",
    description: "Sample entry. Excavation of foundation trenches for a residential structure.",
    image_url: null,
    image_key: "excavation",
    is_sample: true,
    sort_order: 2,
  },
  {
    id: "p3",
    name: "Construction Support",
    slug: "sample-construction-support",
    location: "Keonjhar, Odisha",
    service_type: "Construction",
    description: "Sample entry. Machinery support during an ongoing civil construction project.",
    image_url: null,
    image_key: "construction",
    is_sample: true,
    sort_order: 3,
  },
  {
    id: "p4",
    name: "Material Shifting",
    slug: "sample-material-shifting",
    location: "Keonjhar, Odisha",
    service_type: "Material Handling",
    description:
      "Sample entry. Loading and shifting of aggregate and construction material at a yard.",
    image_url: null,
    image_key: "material",
    is_sample: true,
    sort_order: 4,
  },
];
