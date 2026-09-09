/** Team from avalanche-capital.com.
 *
 *  **THE BIOS ARE NOT RENDERED (9 Sep 2026, by request).** The team card is a
 *  portrait, a name and a job title now. They are kept rather than deleted
 *  because this has happened before and reversed: they were unrendered on
 *  7 Sep 2026 and put back the same day. app/about/page.tsx has the line to
 *  restore at the bio's old site.
 *
 *  The deliberate limit on them still applies if they ever come back: they
 *  describe the ROLE, not the person. Names and titles are the only facts any
 *  Avalanche property makes public - the real bios sit behind "Read Bio"
 *  modals that render nothing to the page source. Inventing career history,
 *  prior firms, or credentials for named individuals is not a placeholder a
 *  reviewer can safely skim past, so none of that is here. Each line says what
 *  the seat does at Avalanche and stops.
 *
 *  Replace with the real bios before publishing. See docs/COPY-REVIEW.md.
 *
 *  The PHOTOS are real and are not a placeholder. The first five were supplied
 *  on 7 Sep 2026 as Framer CDN exports with hash filenames carrying no names;
 *  the mapping was read out of avalanche-capital.com's own page payload
 *  rather than matched by eye, and `scripts/optimize-team-photos.mjs` holds
 *  both that note and the face-measured crop for each one.
 *
 *  THE LAST THREE CAME FROM A DIFFERENT PLACE. Arsenio Renato (9 Sep 2026) and
 *  the two ACCOUNT EXECUTIVES below him (same day) were supplied directly as
 *  1254x1254 generative frames - no CMS record, so no mapping to derive or to
 *  check against.
 *
 *  **THE TWO ACCOUNT EXECUTIVES ARE MAPPED TO THEIR PHOTOGRAPHS BY ORDER, and
 *  nothing else.** Both arrived on 9 Sep 2026 as pictures plus one job title
 *  and no names; they shipped for a few hours as `account-executive-01` and
 *  `-02` rather than as a guess, and the names came separately as a pair. Sara
 *  Ribeiro takes the first photograph and Erik Gallegos the second because
 *  that is the order both were sent in. That is an assumption, it is the same
 *  kind the first five carry, and docs/COPY-REVIEW.md asks for it to be
 *  confirmed - swapping them is two `photo` values here plus a rename in
 *  docs/assets/team/ and in `PEOPLE` in scripts/optimize-team-photos.mjs. */

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
  {
    name: "Sara Ribeiro",
    role: "Account Executive",
    // DRAFT - role description, not biography. Unrendered, like all of them,
    // and identical to Erik's below because they hold the same seat: two
    // different sentences would be inventing a difference nobody supplied.
    bio: "Carries mandates day to day, from first investor conversation through to the meetings that move a process forward.",
    photo: "/team/sara-ribeiro.webp",
  },
  {
    name: "Erik Gallegos",
    role: "Account Executive",
    // DRAFT - see the note on Sara's above.
    bio: "Carries mandates day to day, from first investor conversation through to the meetings that move a process forward.",
    photo: "/team/erik-gallegos.webp",
  },
];
