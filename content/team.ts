/** Team from avalanche-capital.com.
 *
 *  A deliberate limit on the DRAFT bios below: they describe the ROLE, not the
 *  person. Names and titles are the only facts any Avalanche property makes
 *  public — the real bios sit behind "Read Bio" modals that render nothing to
 *  the page source. Inventing career history, prior firms, or credentials for
 *  five named individuals is not a placeholder a reviewer can safely skim past,
 *  so none of that is here. Each line says what the seat does at Avalanche and
 *  stops.
 *
 *  Replace with the real bios before publishing. See docs/COPY-REVIEW.md. */

export type Member = {
  name: string;
  role: string;
  bio: string | null;
  photo: string | null;
};

export const team: Member[] = [
  {
    name: "Bernardo Almeida",
    role: "Managing Partner",
    // DRAFT — role description, not biography.
    bio: "Leads the firm and its mandates, setting how each raise is positioned and which investors it goes to.",
    photo: null,
  },
  {
    name: "Lev Valestkiy",
    role: "Partner & General Counsel",
    // DRAFT — role description, not biography.
    bio: "Runs the legal function: engagement structuring, regulatory positioning, and the documentation behind every mandate.",
    photo: null,
  },
  {
    name: "Bruno Erckmam",
    role: "Partner",
    // DRAFT — role description, not biography.
    bio: "Works mandates end to end, from deal readiness through investor targeting to close.",
    photo: null,
  },
  {
    name: "Tatjana Sotirovik",
    role: "Investor Relations Manager",
    // DRAFT — role description, not biography.
    bio: "Owns the investor relationships — outreach, follow-through, and keeping allocators informed across live processes.",
    photo: null,
  },
  {
    name: "Lucas Barrozo",
    role: "AI Implementation Engineer",
    // DRAFT — role description, not biography.
    bio: "Builds the tooling behind investor identification and segmentation that makes targeting at this precision possible.",
    photo: null,
  },
];
