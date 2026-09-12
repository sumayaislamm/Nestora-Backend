import "dotenv/config";
import * as fs from "node:fs";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

import { PrismaPg } from "@prisma/adapter-pg";
import {
  PrismaClient,
  Availability,
} from "../src/generated/prisma/client.js";

/**
 * ============================================================================
 * NESTORA — APPEND-ONLY SEED SCRIPT
 * ============================================================================
 *
 * Purpose:
 *   - Upserts 12 new Categories
 *   - Inserts exactly 400 NEW Property records
 *   - Uses ONLY the 7 approved landlord IDs
 *
 * Existing data is never deleted or modified.
 *
 * IMPORTANT:
 * Property inserts are NOT database-level idempotent.
 * A local marker file prevents accidental re-running on this checkout.
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// Prisma 7 setup
// ----------------------------------------------------------------------------

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in environment variables.");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

// ----------------------------------------------------------------------------
// Marker file
// ----------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MARKER_FILE = path.join(
  __dirname,
  ".nestora-seed-400-properties.done"
);

// ----------------------------------------------------------------------------
// Category distribution
// ----------------------------------------------------------------------------

const CATEGORY_DISTRIBUTION: Record<string, number> = {
  "Modern Apartment": 150,
  "Family House": 70,
  "Luxury Villa": 28,
  Studio: 28,
  Duplex: 25,
  Penthouse: 10,
  Townhouse: 15,
  Condo: 25,
  Office: 18,
  Shop: 12,
  Warehouse: 9,
  Land: 10,
};

const NEW_CATEGORY_NAMES = Object.keys(CATEGORY_DISTRIBUTION);
const TOTAL_EXPECTED = 400;

// ----------------------------------------------------------------------------
// Category nouns
// ----------------------------------------------------------------------------

const CATEGORY_NOUN: Record<string, string> = {
  "Modern Apartment": "Apartment",
  "Family House": "House",
  "Luxury Villa": "Villa",
  Studio: "Studio Apartment",
  Duplex: "Duplex Home",
  Penthouse: "Penthouse",
  Townhouse: "Townhouse",
  Condo: "Condo",
  Office: "Office Space",
  Shop: "Retail Shop",
  Warehouse: "Warehouse",
  Land: "Residential Land",
};

const COMMERCIAL_CATEGORIES = new Set([
  "Office",
  "Shop",
  "Warehouse",
]);

const LAND_CATEGORY = "Land";

// ----------------------------------------------------------------------------
// Approved landlords
// ----------------------------------------------------------------------------

const LANDLORD_IDS: string[] = [
  "112e01db-9c2d-4703-bf54-1c2533397b8a",
  "19cc681c-1e5a-4f4b-a7eb-6968fcda6d9e",
  "332ea102-b1b3-415f-97dc-2482f194bfa7",
  "51ca2616-e129-45de-9d90-d7d2433ff64f",
  "5eb6d01b-80ad-428a-9cba-39232e4070ee",
  "5f7bbf50-8a04-482b-8f39-5342fdbafdce",
  "8f10af17-35c3-41a3-8689-b816dc28ae4d",
];

// ----------------------------------------------------------------------------
// Locations
// ----------------------------------------------------------------------------

interface LocationInfo {
  area: string;
  city: string;
  tier: number;
  commercial?: boolean;
}

const LOCATIONS: LocationInfo[] = [
  // Dhaka
  { area: "Gulshan", city: "Dhaka", tier: 1.6, commercial: true },
  { area: "Banani", city: "Dhaka", tier: 1.55, commercial: true },
  { area: "Baridhara", city: "Dhaka", tier: 1.5 },
  { area: "Bashundhara R/A", city: "Dhaka", tier: 1.35 },
  { area: "Dhanmondi", city: "Dhaka", tier: 1.3 },

  { area: "Uttara", city: "Dhaka", tier: 1.05 },
  { area: "Mohammadpur", city: "Dhaka", tier: 0.95 },
  { area: "Khilgaon", city: "Dhaka", tier: 0.9 },
  { area: "Rampura", city: "Dhaka", tier: 0.9 },
  { area: "Badda", city: "Dhaka", tier: 0.9 },
  { area: "Kallyanpur", city: "Dhaka", tier: 0.85 },

  { area: "Motijheel", city: "Dhaka", tier: 1.1, commercial: true },
  { area: "Tejgaon", city: "Dhaka", tier: 1.0, commercial: true },
  { area: "Karwan Bazar", city: "Dhaka", tier: 1.05, commercial: true },

  { area: "Mirpur", city: "Dhaka", tier: 0.72 },

  // Chattogram
  { area: "Khulshi", city: "Chattogram", tier: 0.95 },
  { area: "Panchlaish", city: "Chattogram", tier: 0.85 },
  {
    area: "Agrabad",
    city: "Chattogram",
    tier: 0.9,
    commercial: true,
  },
  { area: "Nasirabad", city: "Chattogram", tier: 0.8 },
  { area: "Halishahar", city: "Chattogram", tier: 0.75 },

  // Sylhet
  {
    area: "Zindabazar",
    city: "Sylhet",
    tier: 0.7,
    commercial: true,
  },
  { area: "Amberkhana", city: "Sylhet", tier: 0.65 },
  { area: "Shibganj", city: "Sylhet", tier: 0.6 },
  { area: "Tilagor", city: "Sylhet", tier: 0.62 },
  {
    area: "Modina Market",
    city: "Sylhet",
    tier: 0.6,
    commercial: true,
  },

  // Other cities
  {
    area: "Rajshahi",
    city: "Rajshahi",
    tier: 0.55,
  },
  {
    area: "Khulna",
    city: "Khulna",
    tier: 0.58,
  },
  {
    area: "Narayanganj",
    city: "Narayanganj",
    tier: 0.68,
    commercial: true,
  },
  {
    area: "Gazipur",
    city: "Gazipur",
    tier: 0.6,
    commercial: true,
  },
  {
    area: "Cumilla",
    city: "Cumilla",
    tier: 0.52,
  },
  {
    area: "Mymensingh",
    city: "Mymensingh",
    tier: 0.5,
  },
  {
    area: "Rangpur",
    city: "Rangpur",
    tier: 0.48,
  },
  {
    area: "Barishal",
    city: "Barishal",
    tier: 0.5,
  },
  {
    area: "Cox's Bazar",
    city: "Cox's Bazar",
    tier: 0.75,
  },
];

const COMMERCIAL_LOCATIONS = LOCATIONS.filter(
  (location) => location.commercial
);

const RESIDENTIAL_LOCATIONS = LOCATIONS;

// ----------------------------------------------------------------------------
// Images
// ----------------------------------------------------------------------------

const IMAGES = {
  residential: [
    "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    "https://images.unsplash.com/photo-1613977257363-707ba9348227",
    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
  ],

  bedroomLiving: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace",
    "https://images.unsplash.com/photo-1505873242700-f289a29e1e0f",
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a",
  ],

  villa: [
    "https://images.unsplash.com/photo-1484154218962-a197022b5858",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",
  ],

  office: [
    "https://images.unsplash.com/photo-1497366216548-37526070297c",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
  ],

  shop: [
    "https://images.unsplash.com/photo-1441716844725-09cedc13a4e7",
    "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
  ],

  warehouse: [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d",
    "https://images.unsplash.com/photo-1553413077-190083ec01ce",
    "https://images.unsplash.com/photo-1553413077-fbb0a75986a2",
  ],

  land: [
    "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    "https://images.unsplash.com/photo-1449844908441-8829872d2607",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
  ],
};

function imagePoolFor(category: string): string[] {
  if (category === "Office") {
    return [
      ...IMAGES.office,
      ...IMAGES.residential.slice(0, 2),
    ];
  }

  if (category === "Shop") {
    return [...IMAGES.shop];
  }

  if (category === "Warehouse") {
    return [...IMAGES.warehouse];
  }

  if (category === LAND_CATEGORY) {
    return [...IMAGES.land];
  }

  if (
    category === "Luxury Villa" ||
    category === "Penthouse"
  ) {
    return [
      ...IMAGES.villa,
      ...IMAGES.residential.slice(0, 3),
      ...IMAGES.bedroomLiving.slice(0, 2),
    ];
  }

  return [
    ...IMAGES.residential,
    ...IMAGES.bedroomLiving,
  ];
}

// ----------------------------------------------------------------------------
// Amenities
// ----------------------------------------------------------------------------

const AMENITIES_RESIDENTIAL = [
  "Lift",
  "Generator Backup",
  "Security",
  "CCTV",
  "Parking",
  "Balcony",
  "Rooftop Access",
  "WiFi",
  "Air Conditioning",
  "Furnished",
  "Gas Connection",
  "Water Supply",
  "24/7 Security",
  "Intercom",
];

const AMENITIES_COMMERCIAL = [
  "CCTV",
  "Security",
  "Parking",
  "Generator Backup",
  "Air Conditioning",
  "Lift",
  "Internet",
  "Loading Access",
  "Road Frontage",
  "Power Backup",
  "Water Supply",
];

const AMENITIES_LAND = [
  "Road Frontage",
  "Boundary Wall",
  "Water Supply",
  "Gated Access",
  "Flat Terrain",
];

// ----------------------------------------------------------------------------
// Random helpers
// ----------------------------------------------------------------------------

function randInt(min: number, max: number): number {
  return Math.floor(
    Math.random() * (max - min + 1)
  ) + min;
}

function randFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function pick<T>(arr: T[]): T {
  if (arr.length === 0) {
    throw new Error("Cannot pick from an empty array.");
  }

  return arr[randInt(0, arr.length - 1)];
}

function pickMany<T>(
  arr: T[],
  count: number
): T[] {
  const shuffled = [...arr].sort(
    () => Math.random() - 0.5
  );

  return shuffled.slice(
    0,
    Math.min(count, arr.length)
  );
}

function roundTo2(n: number): number {
  return Math.round(n * 100) / 100;
}

function pastDate(
  minDaysAgo: number,
  maxDaysAgo: number
): Date {
  const now = new Date();

  const days = randInt(
    minDaysAgo,
    maxDaysAgo
  );

  const date = new Date(now);

  date.setDate(
    date.getDate() - days
  );

  date.setHours(
    randInt(0, 23),
    randInt(0, 59),
    randInt(0, 59),
    0
  );

  return date > now ? now : date;
}

// ----------------------------------------------------------------------------
// Location selection
// ----------------------------------------------------------------------------

function pickLocation(
  category: string
): LocationInfo {
  if (COMMERCIAL_CATEGORIES.has(category)) {
    if (Math.random() < 0.8) {
      return pick(COMMERCIAL_LOCATIONS);
    }

    return pick(RESIDENTIAL_LOCATIONS);
  }

  if (category === LAND_CATEGORY) {
    const suburban = LOCATIONS.filter(
      (location) =>
        [
          "Gazipur",
          "Narayanganj",
          "Cumilla",
          "Rangpur",
          "Mymensingh",
          "Barishal",
          "Cox's Bazar",
          "Rajshahi",
          "Khulna",
        ].includes(location.city)
    );

    if (Math.random() < 0.7) {
      return pick(suburban);
    }

    return pick(RESIDENTIAL_LOCATIONS);
  }

  const roll = Math.random();

  if (roll < 0.5) {
    return pick(
      LOCATIONS.filter(
        (location) => location.city === "Dhaka"
      )
    );
  }

  if (roll < 0.68) {
    return pick(
      LOCATIONS.filter(
        (location) =>
          location.city === "Chattogram"
      )
    );
  }

  if (roll < 0.83) {
    return pick(
      LOCATIONS.filter(
        (location) =>
          location.city === "Sylhet"
      )
    );
  }

  return pick(
    LOCATIONS.filter(
      (location) =>
        ![
          "Dhaka",
          "Chattogram",
          "Sylhet",
        ].includes(location.city)
    )
  );
}

// ----------------------------------------------------------------------------
// Bedrooms / bathrooms
// ----------------------------------------------------------------------------

function getBedsBaths(
  category: string
): {
  bedrooms: number;
  bathrooms: number;
} {
  switch (category) {
    case "Modern Apartment":
      return {
        bedrooms: randInt(2, 4),
        bathrooms: randInt(1, 4),
      };

    case "Family House":
      return {
        bedrooms: randInt(2, 5),
        bathrooms: randInt(2, 5),
      };

    case "Luxury Villa":
      return {
        bedrooms: randInt(3, 6),
        bathrooms: randInt(3, 6),
      };

    case "Studio":
      return {
        bedrooms: 1,
        bathrooms: 1,
      };

    case "Duplex":
      return {
        bedrooms: randInt(3, 5),
        bathrooms: randInt(2, 4),
      };

    case "Penthouse":
      return {
        bedrooms: randInt(3, 5),
        bathrooms: randInt(3, 5),
      };

    case "Townhouse":
      return {
        bedrooms: randInt(3, 4),
        bathrooms: randInt(2, 4),
      };

    case "Condo":
      return {
        bedrooms: randInt(2, 4),
        bathrooms: randInt(2, 3),
      };

    case "Office":
      return {
        bedrooms: randInt(0, 2),
        bathrooms: randInt(1, 3),
      };

    case "Shop":
      return {
        bedrooms: randInt(0, 1),
        bathrooms: 1,
      };

    case "Warehouse":
      return {
        bedrooms: randInt(0, 1),
        bathrooms: randInt(1, 2),
      };

    case LAND_CATEGORY:
      return {
        bedrooms: 0,
        bathrooms: 0,
      };

    default:
      return {
        bedrooms: 2,
        bathrooms: 2,
      };
  }
}

// ----------------------------------------------------------------------------
// Property size
// ----------------------------------------------------------------------------

function getSize(category: string): number {
  switch (category) {
    case "Modern Apartment":
      return randInt(650, 1800);

    case "Family House":
      return randInt(1200, 3500);

    case "Luxury Villa":
      return randInt(2500, 8000);

    case "Studio":
      return randInt(350, 650);

    case "Duplex":
      return randInt(1500, 3200);

    case "Penthouse":
      return randInt(2000, 6000);

    case "Townhouse":
      return randInt(1500, 3000);

    case "Condo":
      return randInt(900, 2200);

    case "Office":
      return randInt(800, 5000);

    case "Shop":
      return randInt(300, 2500);

    case "Warehouse":
      return randInt(2000, 15000);

    case LAND_CATEGORY:
      return randInt(1800, 12000);

    default:
      return randInt(800, 2000);
  }
}

// ----------------------------------------------------------------------------
// Rent
// ----------------------------------------------------------------------------

const RESIDENTIAL_BASE_RANGE: Record<
  string,
  [number, number]
> = {
  "Modern Apartment": [18000, 45000],
  "Family House": [25000, 70000],
  "Luxury Villa": [80000, 220000],
  Studio: [10000, 22000],
  Duplex: [30000, 60000],
  Penthouse: [90000, 250000],
  Townhouse: [35000, 75000],
  Condo: [30000, 65000],
};

function getRent(
  category: string,
  tier: number,
  size: number
): number {
  let rent: number;

  if (category === "Office") {
    const perSqft =
      randFloat(35, 95) * tier;

    rent = size * perSqft;

    rent = Math.min(
      Math.max(rent, 20000),
      380000
    );
  } else if (category === "Shop") {
    const perSqft =
      randFloat(55, 140) * tier;

    rent = size * perSqft;

    rent = Math.min(
      Math.max(rent, 12000),
      300000
    );
  } else if (category === "Warehouse") {
    const perSqft =
      randFloat(7, 18) * tier;

    rent = size * perSqft;

    rent = Math.min(
      Math.max(rent, 25000),
      380000
    );
  } else if (category === LAND_CATEGORY) {
    const perSqft =
      randFloat(3, 9) * tier;

    rent = size * perSqft;

    rent = Math.min(
      Math.max(rent, 10000),
      150000
    );
  } else {
    const [
      min,
      max,
    ] =
      RESIDENTIAL_BASE_RANGE[
        category
      ] ?? [15000, 50000];

    const base =
      randFloat(min, max) * tier;

    rent = Math.min(
      Math.max(base, 12000),
      250000
    );
  }

  rent = Math.min(
    rent,
    99999999.99
  );

  return roundTo2(rent);
}

// ----------------------------------------------------------------------------
// Availability / amenities / images
// ----------------------------------------------------------------------------

function getAvailability(): Availability {
  return Math.random() < 0.85
    ? Availability.AVAILABLE
    : Availability.RENTED;
}

function getAmenities(
  category: string
): string[] {
  if (category === LAND_CATEGORY) {
    return pickMany(
      AMENITIES_LAND,
      randInt(2, 4)
    );
  }

  if (
    COMMERCIAL_CATEGORIES.has(category)
  ) {
    return pickMany(
      AMENITIES_COMMERCIAL,
      randInt(3, 6)
    );
  }

  return pickMany(
    AMENITIES_RESIDENTIAL,
    randInt(4, 7)
  );
}

function getImages(
  category: string
): string[] {
  const pool =
    imagePoolFor(category);

  return pickMany(
    pool,
    randInt(
      2,
      Math.min(4, pool.length)
    )
  );
}

// ----------------------------------------------------------------------------
// Title generation
// ----------------------------------------------------------------------------

const ADJECTIVES = [
  "Modern",
  "Elegant",
  "Spacious",
  "Cozy",
  "Luxurious",
  "Premium",
  "Charming",
  "Sunlit",
  "Stylish",
  "Contemporary",
  "Serene",
  "Prime",
  "Exclusive",
  "Well-Maintained",
  "Newly Built",
  "Executive",
  "Classic",
  "Family-Friendly",
  "Peaceful",
  "Upscale",
  "Bright",
  "Secure",
];

const usedTitles = new Set<string>();

function buildTitleCandidate(
  category: string,
  location: LocationInfo,
  bedrooms: number
): string {
  const noun =
    CATEGORY_NOUN[category] ??
    category;

  const adj = pick(ADJECTIVES);

  const hasBedroomCount =
    bedrooms > 0 &&
    !COMMERCIAL_CATEGORIES.has(
      category
    ) &&
    category !== LAND_CATEGORY;

  const templates: string[] =
    hasBedroomCount
      ? [
          `${adj} ${bedrooms}-Bedroom ${noun} in ${location.area}`,
          `${bedrooms}-Bedroom ${noun} Available in ${location.area}`,
          `${adj} ${noun} Near ${location.area}`,
          `${noun} for Rent in ${location.area} — ${adj}`,
          `Bright ${bedrooms}-Bedroom ${noun} in ${location.area}, ${location.city}`,
          `${adj} ${noun} with Great Access in ${location.area}`,
          `${noun} in the Heart of ${location.area}`,
        ]
      : category === LAND_CATEGORY
      ? [
          `${adj} Residential Land in ${location.area}`,
          `Prime Land for Lease in ${location.area}`,
          `${adj} Plot Available Near ${location.area}`,
          `Investment-Ready Land in ${location.area}, ${location.city}`,
          `Open Land Near ${location.area} Main Road`,
        ]
      : [
          `${adj} ${noun} in ${location.area}`,
          `Ready-to-Use ${noun} in ${location.area}`,
          `${noun} for Rent in ${location.area}`,
          `${adj} ${noun} Near ${location.area} Business Area`,
          `Roadside ${noun} in ${location.area}, ${location.city}`,
          `${noun} Facing Main Road, ${location.area}`,
        ];

  return pick(templates);
}

function generateUniqueTitle(
  category: string,
  location: LocationInfo,
  bedrooms: number
): string {
  for (let attempt = 0; attempt < 6; attempt++) {
    const candidate =
      buildTitleCandidate(
        category,
        location,
        bedrooms
      );

    if (!usedTitles.has(candidate)) {
      usedTitles.add(candidate);
      return candidate;
    }
  }

  let fallback = "";
  let n = 1;

  do {
    fallback = `${buildTitleCandidate(
      category,
      location,
      bedrooms
    )} (Sector ${n})`;

    n++;
  } while (usedTitles.has(fallback));

  usedTitles.add(fallback);

  return fallback;
}

// ----------------------------------------------------------------------------
// Description
// ----------------------------------------------------------------------------

const FEATURES_RESIDENTIAL = [
  "close to reputed schools and colleges",
  "just minutes from a major hospital",
  "within walking distance of a busy local market",
  "well connected by public transport and rickshaw access",
  "situated on a quiet, family-friendly street",
  "near main road access for an easy commute",
  "in a secure neighborhood with active community watch",
  "with plenty of natural light throughout the day",
  "ideal for families with children",
  "with dedicated car parking space",
  "fully furnished and ready to move in",
  "unfurnished, ready for personalization",
  "a strong option for long-term investment",
  "close to the local business district",
  "near a mosque and community center",
  "with a peaceful, green surrounding area",
];

const FEATURES_COMMERCIAL = [
  "in a prime commercial corridor with heavy foot traffic",
  "close to major banks and business offices",
  "with excellent road frontage for visibility",
  "near public transport hubs for easy client access",
  "with dedicated loading and unloading access",
  "suitable for retail, wholesale, or office use",
  "in a well-established business district",
  "with reliable power backup for uninterrupted operations",
  "close to the central business area",
  "a strong option for growing businesses",
];

const FEATURES_LAND = [
  "with clear boundary and road frontage",
  "suitable for residential construction or long-term investment",
  "in a rapidly developing area",
  "close to essential utilities including water and electricity lines",
  "with easy access from the main road",
  "in a peaceful, low-density surrounding",
];

function generateDescription(
  category: string,
  location: LocationInfo,
  bedrooms: number
): string {
  const noun = (
    CATEGORY_NOUN[category] ??
    category
  ).toLowerCase();

  const featurePool =
    category === LAND_CATEGORY
      ? FEATURES_LAND
      : COMMERCIAL_CATEGORIES.has(category)
      ? FEATURES_COMMERCIAL
      : FEATURES_RESIDENTIAL;

  const features =
    pickMany(featurePool, 2);

  const intro =
    bedrooms > 0 &&
    !COMMERCIAL_CATEGORIES.has(
      category
    ) &&
    category !== LAND_CATEGORY
      ? `This ${bedrooms}-bedroom ${noun} is located in ${location.area}, ${location.city}, ${features[0]}.`
      : `This ${noun} is located in ${location.area}, ${location.city}, ${features[0]}.`;

  const outro =
    `It is also ${features[1]}.`;

  return `${intro} ${outro}`;
}

// ----------------------------------------------------------------------------
// Address
// ----------------------------------------------------------------------------

function generateAddress(
  location: LocationInfo
): string {
  const houseNo = randInt(1, 120);
  const roadNo = randInt(1, 27);

  const blockOptions = [
    "A",
    "B",
    "C",
    "D",
    "E",
  ];

  if (Math.random() < 0.5) {
    return `House ${houseNo}, Block ${pick(
      blockOptions
    )}, Road ${roadNo}, ${location.area}, ${location.city}`;
  }

  return `House ${houseNo}, Road ${roadNo}, ${location.area}, ${location.city}`;
}

// ----------------------------------------------------------------------------
// Category upsert
// ----------------------------------------------------------------------------

async function upsertNewCategories(): Promise<
  Record<string, string>
> {
  const nameToId: Record<
    string,
    string
  > = {};

  for (
    const name of NEW_CATEGORY_NAMES
  ) {
    const category =
      await prisma.category.upsert({
        where: {
          name,
        },
        update: {},
        create: {
          name,
        },
      });

    nameToId[name] =
      category.id;

    console.log(
      `  ✓ Category ready: "${name}" -> ${category.id}`
    );
  }

  return nameToId;
}

// ----------------------------------------------------------------------------
// Build property records
// ----------------------------------------------------------------------------

function buildPropertyRecords(
  categoryIds: Record<string, string>
) {
  const records: Array<{
    title: string;
    description: string;
    location: string;
    address: string;
    rent: number;
    bedrooms: number;
    bathrooms: number;
    size: number;
    availability: Availability;
    amenities: string[];
    images: string[];
    landlordId: string;
    categoryId: string;
    createdAt: Date;
    updatedAt: Date;
  }> = [];

  for (
    const [
      categoryName,
      count,
    ] of Object.entries(
      CATEGORY_DISTRIBUTION
    )
  ) {
    const categoryId =
      categoryIds[categoryName];

    if (!categoryId) {
      throw new Error(
        `Missing category id for "${categoryName}".`
      );
    }

    for (
      let i = 0;
      i < count;
      i++
    ) {
      const location =
        pickLocation(
          categoryName
        );

      const {
        bedrooms,
        bathrooms,
      } = getBedsBaths(
        categoryName
      );

      const size =
        getSize(categoryName);

      const rent =
        getRent(
          categoryName,
          location.tier,
          size
        );

      const createdAt =
        pastDate(1, 540);

      const ageInDays = Math.max(
        1,
        Math.floor(
          (Date.now() -
            createdAt.getTime()) /
            86_400_000
        )
      );

      const updatedAt =
        pastDate(
          0,
          ageInDays
        );

      records.push({
        title:
          generateUniqueTitle(
            categoryName,
            location,
            bedrooms
          ),

        description:
          generateDescription(
            categoryName,
            location,
            bedrooms
          ),

        location: `${location.area}, ${location.city}`,

        address:
          generateAddress(
            location
          ),

        rent,
        bedrooms,
        bathrooms,
        size,

        availability:
          getAvailability(),

        amenities:
          getAmenities(
            categoryName
          ),

        images:
          getImages(
            categoryName
          ),

        landlordId:
          pick(LANDLORD_IDS),

        categoryId,

        createdAt,

        updatedAt:
          updatedAt < createdAt
            ? createdAt
            : updatedAt,
      });
    }
  }

  return records;
}

// ----------------------------------------------------------------------------
// Preflight checks
// ----------------------------------------------------------------------------

function preflightChecks(
  records: ReturnType<
    typeof buildPropertyRecords
  >
) {
  const distributionSum =
    Object.values(
      CATEGORY_DISTRIBUTION
    ).reduce(
      (sum, count) =>
        sum + count,
      0
    );

  if (
    distributionSum !==
    TOTAL_EXPECTED
  ) {
    throw new Error(
      `Category distribution sums to ${distributionSum}, expected ${TOTAL_EXPECTED}.`
    );
  }

  if (
    records.length !==
    TOTAL_EXPECTED
  ) {
    throw new Error(
      `Built ${records.length} properties, expected ${TOTAL_EXPECTED}.`
    );
  }

  if (
    NEW_CATEGORY_NAMES.length !==
    12
  ) {
    throw new Error(
      `Expected 12 new categories, found ${NEW_CATEGORY_NAMES.length}.`
    );
  }

  const invalidLandlord =
    records.find(
      (record) =>
        !LANDLORD_IDS.includes(
          record.landlordId
        )
    );

  if (invalidLandlord) {
    throw new Error(
      "Found property with non-approved landlord ID."
    );
  }

  const now = new Date();

  const futureDated =
    records.find(
      (record) =>
        record.createdAt >
          now ||
        record.updatedAt >
          now
    );

  if (futureDated) {
    throw new Error(
      "Found property with future date."
    );
  }

  console.log(
    "  ✓ Pre-flight checks passed: 12 categories, 400 properties, valid landlords, no future dates."
  );
}

// ----------------------------------------------------------------------------
// Main
// ----------------------------------------------------------------------------

async function main() {
  if (
    fs.existsSync(
      MARKER_FILE
    )
  ) {
    console.error(
      "\n✗ Marker file found:\n" +
        `  ${MARKER_FILE}\n\n` +
        "The 400-property seed has already run on this checkout.\n" +
        "Delete the marker ONLY if you intentionally want another 400 properties.\n"
    );

    process.exitCode = 1;
    return;
  }

  console.log(
    "Step 1/3: Upserting 12 new categories..."
  );

  const categoryIds =
    await upsertNewCategories();

  console.log(
    "\nStep 2/3: Generating 400 property records..."
  );

  const records =
    buildPropertyRecords(
      categoryIds
    );

  preflightChecks(
    records
  );

  console.log(
    "\nStep 3/3: Inserting 400 new properties..."
  );

  const result =
    await prisma.property.createMany({
      data: records,
    });

  console.log(
    `  ✓ Inserted ${result.count} new properties.`
  );

  fs.writeFileSync(
    MARKER_FILE,
    [
      `Seed completed at ${new Date().toISOString()}`,
      `Inserted: ${result.count} properties`,
    ].join("\n")
  );

  console.log(
    "\n✅ Done."
  );

  console.log(
    "Existing categories, properties, users, reviews, rental requests, and payments were not modified."
  );
}

// ----------------------------------------------------------------------------
// Run
// ----------------------------------------------------------------------------

main()
  .catch((error) => {
    console.error(
      "\n✗ Seed failed:",
      error
    );

    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });