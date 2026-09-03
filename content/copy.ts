/**
 * Site copy, lifted from Avalanche's own properties:
 *   avalanche-capital.com  — hero, thesis pillars, investor verticals, track record
 *   fundraisr.ai           — customers page, stats band
 *   fundraisr.co           — implementation programme figures
 *
 * Blocks marked `DRAFT` were written here, not lifted. The source panels sit
 * inside a Framer carousel on avalanche-capital.com whose body text is not in
 * the page at all — verified by reading the raw HTML, not just by clicking. So
 * they were extrapolated from Avalanche's own published writing (the
 * /blog posts) and from the panels that DO exist. Every one is listed in
 * docs/COPY-REVIEW.md for sign-off. They make no claim the site does not
 * already make elsewhere.
 */

export const site = {
  name: "Avalanche Capital",
  tagline: "Private capital advisory with an edge",
  description:
    "Private capital advisory for funds, founders, and operating companies. Exposure to the right capital sources, the right mandates, and the right counterparties.",
  // NOTE: both Calendly links on avalanche-capital.com and fundraisr.co are
  // dead ("This Calendly URL is not valid"). This is the only live event on the
  // avalancheintrocall account — "Capital Raise | Strategy Call".
  // TODO(miguel): the slug reads like a duplicate; confirm it is the one to use.
  calendly:
    "https://calendly.com/avalancheintrocall/capital-raise-demo-call-ac-clone",
  /**
   * PLACEHOLDER — where the "Book a meeting" button sends people.
   *
   * Points at the Fundraisr booking page, which is live and yours, so the
   * button works today. It runs on LeadConnector (GoHighLevel), not Calendly.
   * Swap this one string when the real calendar link arrives; nothing else
   * needs to change. If the new one is embeddable, see the note at the top of
   * components/sections/booking.tsx.
   */
  booking: "https://www.fundraisr.ai/book-demo",
  entity: "Avalanche Capital LDA (PT 517584271)",
  /** The header's ghost button. Short by necessity — it sits in a 47.2px
   *  glass rectangle beside the nav pills. */
  navCta: "Book a call",
} as const;

/**
 * The fixed announcement bar above the nav.
 *
 * `text` is set in italic and sentence case, and is followed by a gold
 * underlined link. It is deliberately a claim about availability rather than
 * about results — nothing here is a figure, so nothing here needs sourcing.
 */
export const announce = {
  text: "Advising funds, founders, and operating companies · Intro call available",
  linkLabel: "Book a call",
} as const;

/**
 * The header links. Flat — no dropdowns. /solutions carries Secondaries and
 * Fundraising as its own two blocks, so a menu duplicating them would be a
 * second copy of the same two names to keep in step.
 */
export const nav = [
  { href: "/solutions", label: "Solutions" },
  { href: "/customers", label: "Customers" },
  { href: "/team", label: "Team" },
] as const;

export const hero = {
  eyebrow: "Private capital advisory",
  /** Kept for metadata and for anything that needs the headline as one
   *  string. What the hero RENDERS is `titleLines` below. */
  title: "Private capital advisory with an edge",
  /**
   * The headline breaks on AUTHORED lines, not on wrapping, and the first
   * word of each line is set in italic. Both are editorial decisions, so the
   * break lives here rather than as a <br> buried in the component.
   *
   * `lead` is the italic word; `rest` completes the line. Re-balancing the
   * lines means editing these two entries — do not add a third without
   * checking the 80px size still holds two lines' worth of measure.
   */
  titleLines: [
    { lead: "Private", rest: " capital" },
    { lead: "advisory", rest: " with an edge" },
  ],
  // the word rendered in the gold accent
  accent: "edge",
  lede: "Our unique edge is exposure — to the right capital sources, the right mandates, and the right counterparties.",
  cta: "Get started",
  /**
   * NOT RENDERED IN THE HERO. The reference pairs this line with its
   * mid-page CTA blocks, not with the hero button, so the hero CTA now
   * stands alone. `trackRecord.ctaNote` carries the same line where it is
   * still shown; this is kept because the two could diverge.
   */
  ctaNote: "Intro call · ~30 min · No commitment required",
  /**
   * Opens the hero's logo band, in a fixed 231px column.
   *
   * DELIBERATELY NOT the reference's "Representative investors & strategic
   * partners". That strip carries CLIENT marks — `customers.logoNote` states
   * they are past engagements — and calling past clients investors or
   * partners would be a claim the site cannot support. Same shape, accurate
   * words. See docs/COPY-REVIEW.md.
   */
  stripLabel: "Representative clients & engagements",
  // Sits at the right of the hero's content row, bottom-aligned with the CTA.
  stat: { value: "$2B+", label: "in active mandates partners brought in for our clients" },
} as const;

/** NOT CURRENTLY RENDERED — the "Why Avalanche" section was removed from the
 *  homepage on 1 Sep 2026. Kept because this is genuine copy from
 *  avalanche-capital.com. See components/sections/thesis.tsx. */
export const thesis = {
  eyebrow: "Thesis",
  title: "Why Avalanche",
  accent: "Avalanche",
  lede: "Across venture and private equity, we connect clients to what they're looking for: whether that's capital, deal flow, or secondary liquidity. Precisely, discreetly, and at pace.",
  pillars: [
    {
      title: "Global Network",
      body: "Direct relationships with LPs, family offices, and institutional investors across the US, Europe, and the Middle East — and the reach to go beyond them when the mandate demands it.",
    },
    {
      title: "Both Sides of The Table",
      body: "Our team has operated as investors and as operators — which means we understand what capital allocators need to see, and how to position an opportunity that gets funded.",
    },
    {
      title: "Precision & Execution",
      body: "We don't approach the market broadly. Every mandate is matched against a curated set of investors whose criteria, geography, and appetite align — minimising meaningless conversations.",
    },
  ],
} as const;

export const whoWeServe = {
  eyebrow: "Who we serve",
  title: "Investor Verticals We Work With",
  accent: "Work With",
  lede: "We are used by placement agents, boutique investment banks, emerging fund managers, and founding teams raising from HNWIs, family offices, and institutional investors.",
  verticals: [
    {
      title: "Institutional Investors",
      body: "These are sophisticated entities such as banks, insurance firms, and pension funds, characterized by their substantial capital base and rigorous investment protocols. Institutional investors prioritize stable, long-term returns and typically engage in diversified investment portfolios.",
    },
    {
      // DRAFT
      title: "Accredited Retail",
      body: "Individual investors who meet the accreditation thresholds of their jurisdiction and invest their own capital. They commit smaller cheques than institutions and decide considerably faster, which makes them useful for building early momentum in a raise — but they expect the same standard of materials and the same clarity on terms.",
    },
    {
      // DRAFT
      title: "High Net Worth Individuals (HNWI) / Angels",
      body: "Principals, founders, and operators deploying personal capital, often into sectors they have worked in themselves. Decisions are relationship-led and conviction-led rather than committee-led, and they frequently bring operating insight and onward introductions alongside the cheque.",
    },
  ],
} as const;

export const trackRecord = {
  eyebrow: "Track record",
  title: "Proven Track Record",
  accent: "Track Record",
  lede: "Quantitative metrics showing consistent success and impact across venture, private credit, real estate, and private equity.",
  /**
   * Figures taken from the stats band on fundraisr.ai.
   *
   * `to` drives the count-up and `prefix`/`suffix` frame it, so the displayed
   * string is `prefix + to + suffix`. Values under 10 skip the count entirely
   * (a 0 → 2 tick reads as broken, not impressive), and `decimals` controls the
   * rendering for figures like 1.2M+.
   */
  stats: [
    { prefix: "", to: 30, suffix: "+", decimals: 0, label: "Active mandates worldwide" },
    { prefix: "$", to: 2, suffix: "B+", decimals: 0, label: "Capital raising powered by Fundraisr" },
    { prefix: "", to: 600, suffix: "+", decimals: 0, label: "End-to-end qualified investor introductions facilitated" },
    { prefix: "", to: 1.2, suffix: "M+", decimals: 1, label: "Active investor profiles on the platform" },
    { prefix: "<", to: 10, suffix: " days", decimals: 0, label: "Average time to first investor meeting" },
  ],
  cta: "Get started",
  ctaNote: "Intro call · ~30 min · No commitment required",
} as const;

export const offerings = {
  eyebrow: "Offerings",
  title: "Dive Deeper Into Our Offerings",
  accent: "Offerings",
  items: [
    {
      n: "01",
      title: "Deal Readiness",
      body: "Before a conversation starts, your materials need to meet the market where it is. We benchmark your dataroom, pitch decks, and supporting documentation against comparable raises we've conducted — ensuring every opportunity we take to market is structured for the highest likelihood of success.",
    },
    {
      n: "02",
      // DRAFT
      title: "LP Capital",
      body: "For managers raising a fund, the work is matching strategy, track record, and terms to the LPs whose mandate actually fits. We position the fund against the variables allocators screen on — strategy, team, size, focus, fee structure, minimum commitment — and take it to institutions, family offices, and private allocators already active in that shape of deal.",
    },
    {
      n: "03",
      // DRAFT
      title: "Growth Capital",
      body: "Primary capital for operating companies and funds with a raise in front of them. We work the round end to end: positioning the opportunity, building the mandate-specific investor list, running the outreach, and holding the process together through diligence to a signed term sheet.",
    },
  ],
} as const;

/**
 * The Secondaries solution page. Deliberately thin — "Secondary Liquidity"
 * below is the only copy Avalanche has ever published specifically about
 * secondaries (it used to be offering 04, folded into the Process page). It
 * is reused verbatim here rather than padded out with invented material. See
 * docs/COPY-REVIEW.md.
 */
export const secondaries = {
  eyebrow: "Secondaries",
  title: "Secondary Liquidity",
  // DRAFT
  lede: "Not every position should be held to the end of the fund's life. We work with GPs, LPs, and shareholders seeking liquidity ahead of a full exit — sourcing counterparties, framing the position for them, and running the process discreetly.",
} as const;

/**
 * NOT CURRENTLY RENDERED. The three-step fundraising process — Deal Readiness,
 * Investor Segment, Conversion — had its own page until /solutions was cut back
 * to the two blocks below on 4 Sep 2026.
 *
 * Kept because `steps[0]` and `steps[1]` are genuine copy from
 * avalanche-capital.com and the voice in all three is grounded in the blog
 * posts (see docs/COPY-REVIEW.md). The graphics that went with them are
 * recoverable from commit ac09735.
 */
export const fundraising = {
  eyebrow: "Fundraising",
  title: "Dive Deeper Into Our Fundraising Process",
  accent: "Fundraising Process",
  lede: "A structured framework designed to deliver precision, momentum, and investor confidence.",
  /** Shown twice on /process: beside the page heading, and again under the
   *  last step. Both point at the closing band on the same page. */
  cta: "Get started",
  steps: [
    {
      n: "01",
      title: "Solving For Deal Readiness",
      body: "Before a conversation starts, your materials need to meet the market where it is. We benchmark your dataroom, pitch decks, and supporting documentation against comparable raises we've conducted — ensuring every opportunity we take to market is structured for the highest likelihood of success.",
    },
    {
      n: "02",
      title: "Solving For Investor Segment",
      body: "Identify and segment investor types based on key variables like stage, valuation, and industry, compiling a curated list of mandate-specific investors using proprietary technology and personal networks. Further, granular firm and individual identification ensures precision targeting for effective outreach efforts and investor commitments.",
    },
    {
      n: "03",
      // DRAFT
      title: "Solving For Conversion",
      body: "Meetings are not the milestone — term sheets and signed agreements are. This phase aligns the remaining variables: the message that earns the meeting, the channel it goes out on, the presentation itself, and a data room that carries the same story straight through diligence. Each is refined against what investors actually respond to, so interest converts rather than stalling.",
    },
  ],
} as const;

/**
 * /solutions — the page the step timeline carries.
 *
 * TWO blocks, not three, and they are the two things Avalanche actually does.
 *
 * The rail numbers them 01 and 02, but the LABEL beside each is the service
 * name rather than "Step n". That is deliberate: these are two parallel
 * offerings, not a sequence a client moves through. A shareholder selling a
 * position does not go on to run a primary raise, and labelling them as steps
 * would claim a progression the business does not run. The numbering is an
 * index, which is what the rail already reads as.
 *
 * `title`, `lede` and both bodies are existing copy — `offerings.title`,
 * `thesis.lede`, `secondaries.lede` and the Growth Capital offering
 * respectively. The one authored string is "Primary Capital", a standard
 * category name paired against "Secondary Liquidity". See docs/COPY-REVIEW.md.
 */
export const solutions = {
  eyebrow: "Solutions",
  title: offerings.title,
  lede: thesis.lede,
  cta: "Get started",
  blocks: [
    {
      n: "01",
      /** Anchor. /solutions#secondaries was a live link before this rebuild;
       *  keeping the ids means neither of the old deep links breaks. */
      id: "secondaries",
      label: secondaries.eyebrow,
      title: secondaries.title,
      body: secondaries.lede,
    },
    {
      n: "02",
      id: "fundraising",
      label: fundraising.eyebrow,
      // Authored — the category name opposite "Secondary Liquidity".
      title: "Primary Capital",
      // The Growth Capital offering, verbatim. DRAFT at its source.
      body: offerings.items[2].body,
    },
  ],
} as const;

/**
 * Raise types, above the featured case study.
 *
 * PLACEHOLDER BODIES — the stage and structure names are standard capital
 * market categories and line up with fundraisr.ai's own Solutions set, but the
 * descriptions were written here, not lifted from an Avalanche property. They
 * make no claim the site does not already make. See docs/COPY-REVIEW.md.
 */
export const raiseTypes = {
  eyebrow: "What we raise",
  title: "Built for Funds and Operators Raising Growth Capital",
  accent: "Growth Capital",
  lede: "From funds to pre-seed through Series C+ — we support structured raises across equity, debt, and hybrid structures.",
  items: [
    {
      name: "Funds",
      icon: "funds",
      body: "Capital formation for private funds across multiple industries.",
    },
    {
      name: "Pre-Seed / Seed",
      icon: "preseed",
      body: "Institutional setup: narrative, terms framing, and mandate-fit investor targeting to secure the first committed capital.",
    },
    {
      name: "Series A–C+",
      icon: "growth",
      body: "Growth rounds with sharper diligence and tighter mandate fit — pipeline management and conversion support through commitment.",
    },
    {
      name: "Project-Level Real Estate",
      icon: "realestate",
      body: "Single-asset equity and debt stacks with sponsor-level underwriting and structured capital formation.",
    },
    {
      name: "Private Credit / Debt Facilities",
      icon: "credit",
      body: "Debt raises, structured credit, and specialty finance capital with lender targeting and closing coordination.",
    },
  ],
} as const;

/**
 * Verticals grid on the homepage.
 *
 * PLACEHOLDER — neither avalanche-capital.com nor fundraisr.ai publishes an
 * industry list, so these ten are a standard capital-advisory vertical set
 * standing in until the real list arrives. `icon` keys map to the inline SVGs
 * in components/sections/industries.tsx; add a matching icon if you add a row.
 * See docs/COPY-REVIEW.md.
 */
export const industries = {
  eyebrow: "Verticals",
  title: "Industries We Serve",
  accent: "We Serve",
  lede: "Industry-agnostic. Multi-stage. From pre-seed to growth capital, we advise across sectors without limitation.",
  items: [
    { name: "Consumer & E-Commerce", icon: "consumer" },
    { name: "Construction & Infrastructure", icon: "construction" },
    { name: "Entertainment, Media, & Sports", icon: "media" },
    { name: "Environment & Sustainability", icon: "environment" },
    { name: "Financial Services", icon: "finance" },
    { name: "Healthcare & BioTech", icon: "health" },
    { name: "Mining & Natural Resources", icon: "mining" },
    { name: "Real Estate", icon: "realestate" },
    { name: "Technology & Software", icon: "technology" },
    { name: "Transportation & Aviation", icon: "transport" },
  ],
} as const;

/** Client testimonial, shown alongside the featured Neurable case study. */
export const testimonial = {
  quote:
    "Our mission is to make understanding your brain as natural and intuitive as checking your steps. This funding allows us to scale Neurable AI into new devices and new industries, making cognitive health an accessible, daily utility for everyone.",
  name: "Dr. Ramses Alcaide",
  role: "CEO and Co-Founder of Neurable ($35 Million Series A)",
  company: "Neurable",
  photo: "/testimonials/ramses-alcaide.webp",
} as const;

export const customers = {
  eyebrow: "Customers",
  title: "Built for the firms and GPs moving private capital.",
  accent: "moving private capital.",
  lede: "Used by placement agents, boutique investment banks, emerging fund managers, and founding teams raising capital from HNWIs, family offices, and institutional investors. Our clients don't need another CRM — they need infrastructure that makes their fundraise executable.",
  gridTitle: "From first mandate to billion-dollar deal books.",
  gridLede:
    "We work across venture, private credit, real estate, and private equity — with clients from the US, Australia, and everywhere in between. Here's what that looks like in practice.",
  logoNote: "Client logos represent past engagements of Avalanche Capital.",
  /**
   * NOT CURRENTLY RENDERED — the strips were unlabelled by request on
   * 3 Sep 2026. Kept because if a caption ever goes back under the venture
   * strip at the foot of the /customers hero, it has to be this careful:
   * those marks are firms active in the market, NOT Avalanche clients or
   * partners. `logoNote` above is the client claim and belongs to the roster
   * grid. Do not merge the two or let this one drift toward implying a
   * relationship. DRAFT. See content/ecosystem-logos.ts.
   */
  ecosystemNote:
    "Logos represent venture capital firms and institutional investors active in the ecosystem.",
  trustedByEyebrow: "Trusted by",
  // DRAFT — the only line on this page not lifted from an Avalanche property.
  // It heads the client logo grid; the paragraph beside it is whoWeServe.lede,
  // which is sourced. See docs/COPY-REVIEW.md.
  trustedByTitle: "Trusted by top teams across private capital.",
} as const;

export const ctaBand = {
  eyebrow: "Get in touch",
  title: "Start with a consultation",
  accent: "consultation",
  body: "Every successful raise begins with a clear strategy. Our consultation uncovers your goals, challenges, and positioning, so we can design an approach that reaches the right investors.",
  /** The block's own button. It opens the scheduler in a new tab, which is
   *  the job `components/sections/booking.tsx` used to do here. */
  cta: "Book a meeting",
  note: "Intro call · No commitment required",
} as const;

export const media = [
  {
    quote:
      "Redefining Fundraising: Avalanche Capital's Methods Open New Doors for Fintech Startup",
    outlet: "CEO Weekly",
  },
  {
    quote:
      "The Future of Fundraising: Avalanche Capital's Fresh Solutions for Startups and Funds",
    outlet: "Forbes",
  },
  {
    quote: "Avalanche Capital: Modernizing the Outmoded World of Fundraising",
    outlet: "Global Banking & Finance Review",
  },
] as const;

export const legal = `Avalanche Capital provides strategic guidance, fundraising education, and advisory support to operating companies, real estate sponsors and developers, investment funds, and other businesses. Client logos and case studies represent past engagements of ${site.entity}. References are for illustrative purposes only and do not constitute endorsement.

Nothing on this website constitutes an offer to sell, a solicitation of an offer to buy, or a recommendation of any security or investment. Browsing this website does not create a client, advisory, or fiduciary relationship. No such relationship exists unless and until a written engagement agreement has been executed by both parties.

Avalanche Capital does not guarantee any specific fundraising outcome, investor interest, capital commitment, or financial result. Results featured on this website represent individual client experiences and are not indicative of typical outcomes.`;
