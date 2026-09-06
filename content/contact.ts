/**
 * /get-in-touch — the qualification questionnaire behind every CTA on the site.
 *
 * EVERY STRING HERE IS DRAFT except the nine questions and their options,
 * which were supplied on 5 September 2026. The order is exactly as given. Three
 * things were changed to it and nothing else — all three are listed in
 * docs/COPY-REVIEW.md and all three are one edit to undo:
 *
 *   1. A typo: "Three to six måonths" -> "Three to six months".
 *   2. Option labels set in sentence case ("Investment Fund" -> "Investment
 *      fund"), matching the rest of the site.
 *   3. Ranges set with an en dash rather than a hyphen ("$1m - $5m" ->
 *      "$1m – $5m"), matching the typography everywhere else.
 *
 * The labels themselves were asked as full questions ("Name:" -> "What is your
 * name?") because one field per screen under a bare label reads as a fragment
 * of a form. The OPTIONS are untouched beyond the three points above.
 *
 * THE FORM DOES NOT SUBMIT ANYWHERE YET. `components/sections/contact-form.tsx`
 * validates, collects and shows the success state, and that is all — there is
 * no route handler, no email service and no third-party endpoint. Wiring a
 * destination is a deliberate separate job; the TODO is at the submit handler.
 */

export type Question =
  /** A single free-text answer. `kind` drives the input type and validation. */
  | { id: string; kind: "text" | "email"; label: string; placeholder: string }
  /** One of a fixed list. Choosing advances to the next question. */
  | { id: string; kind: "choice"; label: string; options: readonly string[] };

/**
 * Nine, in this order, one per step. The count in the card's "Question n of N"
 * label is read from this array's length rather than typed, so the two cannot
 * disagree — the same rule the diagrams follow.
 */
export const questions: readonly Question[] = [
  { id: "name", kind: "text", label: "What is your name?", placeholder: "Full name" },
  { id: "email", kind: "email", label: "What is your email?", placeholder: "you@company.com" },
  { id: "company", kind: "text", label: "What company are you with?", placeholder: "Company name" },
  {
    id: "raise",
    kind: "choice",
    label: "What is your target raise amount?",
    options: [
      "Under $1m",
      "$1m – $5m",
      "$5m – $15m",
      "$15m – $50m",
      "Over $50m",
    ],
  },
  {
    id: "type",
    kind: "choice",
    label: "What type of investment are you raising for?",
    options: [
      "Investment fund",
      "Startup / operating company (Seed to Series D)",
    ],
  },
  {
    id: "open",
    kind: "choice",
    label: "Is the offering currently open to investors?",
    options: [
      "Yes, and accepting commitments",
      "Within one month",
      "One to three months",
      "Later this year",
      "Not defined",
    ],
  },
  {
    id: "timeline",
    kind: "choice",
    label: "What is your timeline?",
    options: ["Urgent", "Three to six months", "One to two years", "Exploring"],
  },
  {
    id: "role",
    kind: "choice",
    label: "What is your role within the organization?",
    options: [
      "Founder / owner / general partner",
      "Partner / principal",
      "Head of investor relations",
      "Capital markets or fundraising lead",
      "Consultant or advisor to the sponsor",
      "Other",
    ],
  },
  {
    id: "budget",
    kind: "choice",
    label: "What is your monthly investor acquisition budget?",
    options: [
      "I'm looking for free services",
      "$1,000 – $5,000 per month",
      "$5,000 – $15,000 per month",
      "$15,000 – $50,000 per month",
      "$50,000+ per month",
    ],
  },
];

export const contact = {
  // DRAFT
  eyebrow: "Contact",
  // DRAFT
  title: "Get in touch",
  // DRAFT
  lede: "Every successful raise begins with a conversation. Share your project details and we'll explore if there's a fit.",
  /** Shown once under the question count, not repeated per step. */
  // DRAFT
  hint: "Pick the closest. Selecting an answer moves you to the next question.",
  // DRAFT
  submit: "Send",
  // DRAFT
  done: {
    title: "Thank you — we have your details.",
    body: "We read every submission ourselves. If there is a fit you will hear from one of us within two business days.",
    /** The direct route for anyone who would rather not wait. */
    // DRAFT
    bookLabel: "Book an intro call now",
  },
  /**
   * TODO(miguel): no email address or phone number exists anywhere in this
   * repo, so the left column offers LinkedIn and nothing else. Send them and
   * they go in `site` alongside the booking link — this becomes a one-line
   * change and the reference's mail/phone rows can go back in.
   */
  // DRAFT
  asideLabel: "Prefer to reach us directly?",
} as const;
