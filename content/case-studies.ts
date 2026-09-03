/**
 * Case studies, captured from fundraisr.ai/customers.
 * Results are verbatim. `category` is our own classification, used by the
 * Customers page filter — review before publishing.
 */

export const CATEGORIES = [
  "All categories",
  "Placement agencies / Investment banks",
  "Startups",
  "Funds",
] as const;

export type Category = (typeof CATEGORIES)[number];

export type CaseStudy = {
  slug: string;
  name: string;
  logo: string;
  category: Exclude<Category, "All categories">;
  result: string;
  /** Pulled out of `result` for the metric pill on the card. */
  metric: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "neurable",
    name: "Neurable",
    logo: "/logos/cases/neurable.webp",
    category: "Startups",
    metric: "$35M Series A",
    result:
      "18 investor meetings in 3 months. Campaign culminated in a closed $35M Series A, exceeding the original raise target.",
  },
  {
    slug: "rimla-capital",
    name: "Rimla Capital",
    logo: "/logos/cases/rimla-capital.webp",
    category: "Funds",
    metric: "8 meetings / 4 months",
    result:
      "8 investor meetings booked in 4 months — mandate-specific LPs across Europe and North America, well outside Rimla's existing network.",
  },
  {
    slug: "catalyst-capital",
    name: "Catalyst Capital",
    logo: "/logos/cases/catalyst-capital.webp",
    category: "Placement agencies / Investment banks",
    metric: "$5M hotel project",
    result:
      "6 investor meetings across 5 months, including support for the SBA 7(a) financing of a $5M hotel project for one of Catalyst's clients.",
  },
  {
    slug: "foggprevail-capital",
    name: "Foggprevail Capital",
    logo: "/logos/cases/foggprevail-capital.webp",
    category: "Placement agencies / Investment banks",
    metric: "21 positive conversations",
    result:
      "10+ investor meetings across 8 months, with 21 positive investor conversations generated through the platform.",
  },
  {
    slug: "drx",
    name: "DRX",
    logo: "/logos/cases/drx.webp",
    category: "Startups",
    metric: "$150M+ term sheet",
    result:
      "15+ investor meetings across 6 months. Process produced a term sheet exceeding the original $150M raise target.",
  },
  {
    slug: "purewager",
    name: "PureWager",
    logo: "/logos/cases/purewager.webp",
    category: "Startups",
    metric: "$30M term sheet",
    result:
      "18 investor meetings in 3 months. Campaign produced a $30M term sheet, validating the regulated wagering thesis.",
  },
  {
    slug: "vensa",
    name: "Vensa",
    logo: "/logos/cases/vensa.webp",
    category: "Startups",
    metric: "Sovereign wealth funds",
    result:
      "20+ investor meetings across 8 months with sovereign wealth funds, healthcare strategics, and large family offices. Process produced a term sheet.",
  },
  {
    slug: "toothsure",
    name: "Toothsure",
    logo: "/logos/cases/tooth-sure.webp",
    category: "Startups",
    metric: "Debt term sheet",
    result:
      "20+ investor meetings. Campaign produced a debt term sheet, securing the near-term runway needed to carry operations through the regulatory process.",
  },
  {
    slug: "ravok-studios",
    name: "Ravok Studios",
    logo: "/logos/cases/ravok-studios.webp",
    category: "Startups",
    metric: "Three continents",
    result:
      "20 investor meetings across a broad institutional base spanning strategic VCs, corporate venture arms, and family offices across three continents.",
  },
  {
    slug: "woof-play-eat",
    name: "Woof Play Eat",
    logo: "/logos/cases/woof-play-eat.webp",
    category: "Startups",
    metric: "Angel syndicate",
    result:
      "15+ investor meetings across 9 months. Raise entered closing stages with a US-based angel syndicate on founder-aligned terms.",
  },
  {
    slug: "legitify",
    name: "Legitify",
    logo: "/logos/cases/legitify.webp",
    category: "Startups",
    metric: "Active due diligence",
    result:
      "15+ investor meetings across 6 months. Raise progressed into active due diligence with European family offices and corporate venture arms.",
  },
  {
    slug: "stormbreaker-ventures",
    name: "Stormbreaker Ventures",
    logo: "/logos/cases/storm-breaker.webp",
    category: "Funds",
    metric: "London family office",
    result:
      "8 investor meetings across 7 months — process produced a term sheet from a London-based international family office.",
  },
  {
    slug: "nobody-studios",
    name: "Nobody Studios",
    logo: "/logos/cases/nobody-studios.webp",
    category: "Startups",
    metric: "Series A first close",
    result:
      "Campaign produced a term sheet, providing an early capital commitment toward the Series A first close.",
  },
];

/** The one surfaced on the homepage. */
export const featuredCaseStudy = caseStudies.find((c) => c.slug === "neurable")!;
