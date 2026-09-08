/**
 * Case studies, captured from fundraisr.ai/customers.
 * Results are verbatim. `category` is our own classification, used by the
 * Customers page filter — review before publishing.
 *
 * TEN, DOWN FROM THIRTEEN. Rimla Capital, Catalyst Capital and Foggprevail
 * Capital were removed on 9 Sep 2026 by request. Their marks are still in
 * `public/logos/cases/` and are now unreferenced — kept rather than deleted,
 * because they are already processed to white-on-transparent by
 * scripts/logos-to-alpha.mjs and re-adding a study should not mean
 * re-processing an asset. `git log -S "rimla-capital"` has the three entries.
 */

/**
 * The `/customers` filter's options, and the union `category` is typed against.
 *
 * **"Placement agencies / Investment banks" WAS REMOVED ON 9 Sep 2026 BECAUSE
 * IT EMPTIED.** Catalyst Capital and Foggprevail Capital were its only two
 * members and both came off the page that day with Rimla Capital. A filter
 * option that can only ever return nothing is worse than one that is missing:
 * it reads as a segment we serve and then shows a blank grid to anyone who
 * picks it. Put it back WITH a study, not before — and note that removing it
 * narrows the `Category` type, so a study cannot silently be filed under it
 * either.
 *
 * The case-study-grid note about long option labels is now out of date in the
 * detail if not in the reasoning: the longest surviving label is "Funds".
 */
export const CATEGORIES = ["All categories", "Startups", "Funds"] as const;

export type Category = (typeof CATEGORIES)[number];

export type CaseStudy = {
  slug: string;
  name: string;
  logo: string;
  category: Exclude<Category, "All categories">;
  result: string;
  /**
   * Pulled out of `result`, and it used to be the accent METRIC PILL on the
   * homepage's case-study card. **Nothing displays it since 9 Sep 2026** —
   * the card's top half came off when the slide was rebuilt around a
   * full-column picture, and it was the site's last pill. It is not dead
   * data: `/customers` searches it (`case-study-grid.tsx`), so "$35M" and
   * "term sheet" still find their studies. Keep it accurate; it is just no
   * longer read off the page.
   */
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
      "8 investor meetings across 7 months - process produced a term sheet from a London-based international family office.",
  },
  {
    slug: "nobody-studios",
    name: "Nobody Studios",
    logo: "/logos/cases/nobody-studios.webp",
    // "Funds", not "Startups". Nobody Studios is a venture studio and what
    // closed is a FUND I, so it belongs with Stormbreaker in the /customers
    // filter. It was filed under Startups while the entry still described a
    // Series A first close. (Rimla Capital was the third entry in that
    // category until 9 Sep 2026.)
    category: "Funds",
    metric: "$20M Fund I",
    // SUPPLIED 8 Sep 2026, and it replaces a weaker, vaguer claim: the entry
    // used to read "Campaign produced a term sheet, providing an early
    // capital commitment toward the Series A first close." Both the amount
    // and the outcome are firmer now, so this is a correction rather than a
    // rewrite. It renders in the /customers grid as well as on the homepage.
    result:
      "32 investor meetings in 4 months. Our protocol resulted in a closed $20M Fund I, in record time.",
  },
];

/**
 * THE TWO SURFACED ON THE HOMEPAGE, in order. It was one until 8 Sep 2026.
 *
 * They are looked up by slug rather than listed inline so the homepage and
 * the /customers grid can never disagree about a client — there is one record
 * per client and both pages read it. Adding a third here is enough to render
 * it; the section maps this array.
 *
 * WHAT THE HOMEPAGE STILL TAKES FROM THE RECORD IS `name` AND `category`,
 * nothing more, since the result sentence and the metric pill came off the
 * slide on 9 Sep 2026. The rule still earns its keep — a client cannot be
 * filed as Startups here and Funds there — but `result` and `metric` are read
 * by /customers alone now, so editing either is no longer a two-page change.
 */
export const featuredCaseStudies = ["neurable", "nobody-studios"].map(
  (slug) => caseStudies.find((c) => c.slug === slug)!,
);
