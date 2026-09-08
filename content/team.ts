/** Team from avalanche-capital.com.
 *
 *  A deliberate limit on the DRAFT bios below: they describe the ROLE, not the
 *  person. Names and titles are the only facts any Avalanche property makes
 *  public - the real bios sit behind "Read Bio" modals that render nothing to
 *  the page source. Inventing career history, prior firms, or credentials for
 *  six named individuals is not a placeholder a reviewer can safely skim past,
 *  so none of that is here. Each line says what the seat does at Avalanche and
 *  stops.
 *
 *  Replace with the real bios before publishing. See docs/COPY-REVIEW.md.
 *
 *  The PHOTOS are real and are not a placeholder. The first five were supplied
 *  on 7 Sep 2026 as Framer CDN exports with hash filenames carrying no names;
 *  the mapping was read out of avalanche-capital.com's own page payload
 *  rather than matched by eye, and `scripts/optimize-team-photos.mjs` holds
 *  both that note and the face-measured crop for each one.
 *
 *  ARSENIO RENATO WAS ADDED ON 9 Sep 2026 and came from a different place -
 *  supplied directly as a 1254x1254 generative frame, no CMS record and so no
 *  mapping to derive or check. Name and role are the two facts given; the bio
 *  is a role description on the same terms as the other five. */

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
    // DRAFT - role description, not biography.
    bio: "Leads the firm and its mandates, setting how each raise is positioned and which investors it goes to.",
    photo: "/team/bernardo-almeida.webp",
  },
  {
    name: "Lev Valestkiy",
    role: "Partner & General Counsel",
    // DRAFT - role description, not biography.
    bio: "Runs the legal function: engagement structuring, regulatory positioning, and the documentation behind every mandate.",
    photo: "/team/lev-valestkiy.webp",
  },
  {
    name: "Bruno Erckmam",
    role: "Partner",
    // DRAFT - role description, not biography.
    bio: "Works mandates end to end, from deal readiness through investor targeting to close.",
    photo: "/team/bruno-erckmam.webp",
  },
  {
    name: "Tatjana Sotirovik",
    role: "Investor Relations Manager",
    // DRAFT - role description, not biography.
    bio: "Owns the investor relationships - outreach, follow-through, and keeping allocators informed across live processes.",
    photo: "/team/tatjana-sotirovik.webp",
  },
  {
    name: "Lucas Barrozo",
    role: "AI Implementation Engineer",
    // DRAFT - role description, not biography.
    bio: "Builds the tooling behind investor identification and segmentation that makes targeting at this precision possible.",
    photo: "/team/lucas-barrozo.webp",
  },
  {
    name: "Arsenio Renato",
    role: "Associate",
    // DRAFT - role description, not biography, and thinner than the other
    // five on purpose. Name and title are the only two facts supplied for
    // this seat; there is no CMS record behind it to check anything else
    // against, so this says what an associate does on a mandate and stops.
    bio: "Works live mandates day to day - investor research, materials, and the follow-through that keeps a process moving.",
    photo: "/team/arsenio-renato.webp",
  },
];
