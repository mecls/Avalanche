/** FAQ — homepage only. (It was also on /process, which no longer exists.)
 *
 *  Answers were written here, not lifted from a published FAQ: neither
 *  avalanche-capital.com nor fundraisr.ai has one (checked fundraisr's /faq,
 *  /platform, /solutions, /customers and /pricing — none exist or none carry
 *  questions). They are grounded in what those sites DO say:
 *
 *    fundraisr.ai  — the platform positioning, the three product pillars, the
 *                    1.2M+ investor figure, the client types, "3x faster",
 *                    "<10 days to first investor meeting"
 *    avalanche-capital.com — the thesis pillars and the offerings
 *    the Avalanche blog — the segment → message → channel → presentation →
 *                    diligence sequence, and "term sheets, not meetings"
 *
 *  Everything marked DRAFT is awaiting sign-off — see docs/COPY-REVIEW.md.
 *
 *  Two are deliberately conservative. "Do you guarantee clients raise" is
 *  answered in the negative because the footer disclaimer already says exactly
 *  that, and any softer answer would contradict it. "What is the cost" is not
 *  answered with a number because nobody has told me one, and inventing a fee
 *  on a capital-advisory site is not a placeholder — it is a liability. */

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "What exactly does Avalanche Capital do?",
    a: "Avalanche Capital is a private capital advisory. We work with funds, founders, and operating companies on positioning, materials, investor targeting, and end-to-end execution of a raise — connecting clients to capital, deal flow, or secondary liquidity across venture and private equity. The work is backed by Fundraisr, our own platform, which gives investor relations teams, placement firms, and fund managers the tools to identify, engage, and convert the right investors at scale.",
  },
  {
    // DRAFT
    q: "What makes your approach different?",
    a: "Fundraising still runs on who you know, and it shouldn't. We pair a direct network of LPs, family offices, and institutional investors with infrastructure most advisories don't have: 1.2M+ investor profiles across venture, private credit, real estate, and private equity, filterable by thesis, stage, geography, cheque size, and recent activity. That means every mandate goes to a curated set of investors whose criteria already align — not a broadcast. Our team has also sat on both sides of the table, as investors and as operators, so we know what an allocator needs to see.",
  },
  {
    // DRAFT
    q: "How long does the process take?",
    a: "It depends on the mandate, the market, and how ready your materials are when we start. What we can say is where the time goes: benchmarking and positioning first, then building the mandate-specific investor list, then outreach and diligence. Clients on our platform average under ten days to a first investor meeting, and the research phase is usually the longest part of everything that follows. Starting with a weak data room lengthens all of it. We'll give you a realistic timeline on the intro call rather than a number on a web page.",
  },
  {
    // DRAFT — a real operating fact; confirm the actual policy before publishing.
    q: "How many new clients do you take on?",
    a: "A limited number at any one time. Running a raise properly means working a curated investor list personally rather than broadcasting a deck, and that does not scale past a certain point without the quality dropping. If we don't think we can move the needle on a mandate, we'll say so on the first call.",
  },
  {
    q: "Do you guarantee clients raise?",
    a: "No. Avalanche Capital does not guarantee any specific fundraising outcome, investor interest, capital commitment, or financial result. What we commit to is the process: positioning, targeting, outreach, and execution run to a standard. Results shown on this website represent individual client experiences and are not indicative of typical outcomes.",
  },
  {
    // DRAFT
    q: "How do I know if I qualify to work with you?",
    a: "Our clients are startups raising capital, placement agencies, boutique investment banks, and emerging fund managers — raising from HNWIs, family offices, and institutional investors across venture, private credit, real estate, and private equity. If that describes you, the intro call is the fastest way to find out. It's a qualification conversation in both directions.",
  },
  {
    // DRAFT
    q: "What stages of capital do you advise on?",
    a: "Pre-seed and seed through Series C and beyond, plus fund vehicles themselves. In practice that means LP capital for managers raising a fund, growth capital for operating companies with a round in front of them, project-level real estate, private credit and debt facilities, and secondary liquidity for holders looking to exit a position ahead of a full realisation. Deal readiness work sits in front of all of it.",
  },
  {
    // DRAFT — no fee information was available from any Avalanche or Fundraisr property.
    q: "What is the cost to work with Avalanche Capital?",
    a: "Engagements are scoped to the mandate, so there is no single number. We'll walk you through structure and cost on the intro call, once we understand what you're raising and what shape the materials are in.",
  },
];
