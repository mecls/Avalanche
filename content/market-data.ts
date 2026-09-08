/**
 * The two segment definitions the /about firm diagrams draw.
 *
 * **NOT MARKET STATISTICS.** This file briefly held four sourced datasets -
 * listed vs private-backed company counts, median age at IPO, family-office
 * growth - for three charts that shipped and were removed the same day. With
 * those gone, nothing on this site carries a figure again, and the reasoning
 * at the top of content/manifesto.ts stands without an exception.
 *
 * What is left is Avalanche's own definition of who it works with. That needs
 * sign-off of a different kind from a sourced number: it is a commercial claim
 * about scope rather than something a reviewer can check against a source.
 * `git show` this file's history has the figures and their citations if they
 * are ever wanted back - they came with sources attached, which was the whole
 * basis for shipping them.
 */

/**
 * The mandate segment. NOT a market statistic - this is Avalanche's own
 * definition of who it works with, so it needs sign-off of a different kind:
 * it is a commercial claim about scope rather than a sourced number.
 *
 * The two rows are the same threshold seen from either side. Everything left
 * of it is where distribution is the binding constraint; right of it capital
 * finds the issuer without help, which is why the mandate stops there.
 */
export const mandate = {
  // DRAFT
  inside: "Our mandate",
  // DRAFT
  outside: "Where capital finds the issuer",
  // DRAFT
  threshold: "The institutional threshold",
  rows: [
    {
      label: "Funds",
      stages: ["Fund I", "Fund II", "Fund III", "Fund IV"],
      beyond: "Fund V and beyond",
    },
    {
      label: "Companies",
      stages: ["Seed", "Series A", "Series B/C", "Series D"],
      beyond: "Series E and beyond",
    },
  ],
  // DRAFT
  note: "One segment, two sides of the same access problem. The threshold is where distribution stops being the binding constraint.",
} as const;

/**
 * Both sides of the table, as a flow. The claim is that the same relationships
 * serve twice - a GP raised today is an allocator later, a founder funded
 * today is dealflow later - which is the argument for operating both sides.
 */
export const bothSides = {
  sell: [
    // DRAFT
    {
      title: "Emerging GPs",
      detail: "Fund I to Fund IV",
      becomes: "Become allocators",
    },
    // DRAFT
    {
      title: "Founders",
      detail: "Seed to Series D",
      becomes: "Become dealflow",
    },
  ],
  buy: {
    // DRAFT
    title: "The Avalanche network",
    detail: "Family offices, asset managers, sovereigns, FoFs, VCs",
  },
  // DRAFT
  note: "Operating both sides is why the same allocators and issuers return.",
} as const;
