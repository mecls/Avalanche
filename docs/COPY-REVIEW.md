# Copy review — everything I wrote, and what it was built from

**Date:** 1 September 2026
**Purpose:** one pass to approve or replace. Nothing here was lifted from an Avalanche property; everything else on the site was.

Each block is marked `// DRAFT` at its source location. Search the repo for `DRAFT` to find them all.

---

## Why these had to be drafted

The previous session reported that three offering panels "could not be captured" from `avalanche-capital.com`. I re-tested that from scratch rather than take it on trust, and it is not an automation failure that more effort would fix:

- Clicking the `02 LP Capital` tab with real pointer events does not change the rendered panel.
- Fetching the page's raw HTML and searching it directly shows the `framer-*-container` elements for **LP Capital**, **Growth Capital** and **Secondary Liquidity** contain nothing but their own tab labels. The body text is not in the document.
- `/thesis`, `/case-studies` and `/get-started` are older 2024 landing pages and don't carry it either.

The copy exists only in your Framer editor or the original deck. If you have it, replacing these is a paste job.

**What I did use for voice:** your three blog posts, which I found in the sitemap and which the previous session didn't know about — `solving-for-investor-message-fit`, `how-to-run-cold-email`, `positioning-hierarchical-dynamics-and-investor-relations`. The vocabulary below (mandate-specific investor lists, the segment → message → channel → presentation → diligence sequence, "term sheets not meetings") is lifted from your own writing, not invented.

---

## 1. Offerings — `content/copy.ts`

| Panel | Built from |
|---|---|
| **LP Capital** | The LP screening variables listed in your *Investor-Message Fit* post — strategy, track record, team, fund size, focus, fee structure, minimum commitment. Reframed as what we position against. |
| **Growth Capital** | The existing Deal Readiness panel + the process steps, restated for primary rounds. |
| **Secondary Liquidity** | The thesis line already on the site: "capital, deal flow, or **secondary liquidity**". Expanded, no new claim. |

## 2. Investor verticals — `content/copy.ts`

Both follow the pattern of the **Institutional Investors** entry that *is* on your site: they describe the investor category, they don't promise anything about outcomes.

| Vertical | Note |
|---|---|
| **Accredited Retail** | Deliberately jurisdiction-neutral — "meet the accreditation thresholds of their jurisdiction" rather than naming a rule. Check this against how you're permitted to describe them in your markets. |
| **HNWI / Angels** | Descriptive only. |

## 3. Process step 03 — `content/copy.ts`

**Solving For Conversion.** Steps 01 and 02 were recoverable; 03 was not. Built directly on your own framing: *"the true north isn't marked by mere appointments or meetings, but rather by the tangible milestones of term sheets and signed sub-agreements"*, and the five variables you name — segment, message, channel, presentation, diligence.

## 4. FAQ — `content/faqs.ts`

**Rewritten 1 Sep 2026 against fundraisr.ai's real copy.** There is no published FAQ on any of your properties to lift from — I checked fundraisr's `/faq`, `/platform`, `/solutions`, `/customers` and `/pricing`. So the answers are still written here, but they are now grounded in things your sites actually say: the platform positioning, the 1.2M+ investor figure, the three product pillars, the client types, and "under ten days to a first investor meeting".

That last one is worth a look — **"clients on our platform average under ten days to a first investor meeting"** restates fundraisr's `<10 days` stat as a claim about Avalanche's clients. It follows from the stat, but confirm you're comfortable with the phrasing.

Seven of eight answers are drafted. **Three need your attention:**

| Question | Why it needs you |
|---|---|
| **"How many new clients do you take on?"** | This is a real operating fact, not a positioning choice. I wrote "a limited number at any one time" because it follows from the *Precision & Execution* pillar — but I don't know your actual policy. **Confirm or replace.** |
| **"What is the cost to work with Avalanche Capital?"** | I found no fee information on any Avalanche property, so the answer routes to the intro call. Inventing a number here would be a liability, not a placeholder. Fill in if you want it public. |
| **"Do you guarantee clients raise?"** | Answered **no**, in the language of your own footer disclaimer. Any softer answer would contradict the legal notice further down the same site. I'd leave this one as it is. |

## 5. Team bios — `content/team.ts`

**These describe the role, not the person — on purpose.**

Names and titles are the only facts any Avalanche property makes public; the real bios sit behind "Read Bio" modals that render nothing to the page source. Writing plausible career histories for five named individuals is a different thing from drafting marketing copy: invented prior firms or credentials are exactly the kind of detail a reviewer skims past, and they'd be false statements about real people.

So each line says what the seat does at Avalanche and stops. They read as intentional rather than as gaps, but **they are not bios and shouldn't ship as if they were.** Ask the five of them for two sentences each.

---

## 6. Two homepage sections that are entirely placeholder

You asked for these layouts and said copy would follow. Neither
`avalanche-capital.com` nor `fundraisr.ai` publishes a list for either one — I
checked both, plus fundraisr's `/solutions` and `/customers` — so **all of the
copy below is standing in.**

### "Built for Funds and Operators Raising Growth Capital" — `raiseTypes` in `content/copy.ts`

The five stage/structure names are standard capital-market categories and line
up with fundraisr's own Solutions set, so they are a reasonable starting point.
**The descriptions were written here** and should be treated as drafts:

| Row | Confidence |
|---|---|
| Funds | Name is safe; description is drafted. |
| Pre-Seed / Seed | Name is safe; description is drafted. |
| Series A–C+ | Name is safe; description is drafted. |
| Project-Level Real Estate | **Confirm you actually do this.** It is in the reference layout, not sourced from you. |
| Private Credit / Debt Facilities | **Confirm you actually do this.** Same reason. |

The last two are the ones to check — they claim service lines, and I have no
evidence either way.

### "Industries We Serve" — `industries` in `content/copy.ts`

Ten verticals, **all placeholder.** They are a generic capital-advisory set, not
your list. The lede — *"Industry-agnostic. Multi-stage. From pre-seed to growth
capital, we advise across sectors without limitation."* — is also drafted, and
note it makes a fairly broad claim; confirm it is one you want to make.

Replacing these is just editing the arrays. Each row needs a `name` and an
`icon` key; the available icons are in `components/ui/icons.tsx`, and a new
vertical needs a matching glyph added there.

---

## The /solutions page — two views, and only one of them has copy

**Restructured 4 Sep 2026.** It was one page with a Secondaries block and a
Fundraising block. It is now two routes behind a toggle, five blocks each, and
the copy situation is very different on either side. All of it is in
`content/solutions.ts`.

### /solutions/fundraising — lifted, and this needs a decision

Structure and copy are **fundraisr.ai/solutions**, captured 4 Sep 2026: the
same five steps, in the same order, with their own headings and bodies. It is
published copy from a property you own, so it is not invented and not DRAFT.

**One change was made throughout, and it is the thing to sign off.** The source
names the product in almost every paragraph — "Fundraisr's pre-marketing
agent", "Fundraisr generates personalised messaging", "Fundraisr doesn't just
give you data". Those read as "our" and "we" here. No claim was altered; only
the brand attached to it.

That was the cautious choice, but it is still a choice, and it cuts both ways:

- As written now, the Avalanche site describes these capabilities as
  Avalanche's own. **Confirm Avalanche actually delivers them** — the copy
  describes software (agents, campaign sequencing, a 1.2M-profile database).
  If the answer is "Fundraisr delivers it and Avalanche resells it", the
  wording should say so.
- If you would rather name Fundraisr explicitly, that is a one-pass edit — but
  it is the same positioning decision already flagged under the track-record
  figures below, and the two should be answered together.

The headline figure **"1.2 million investors"** is fundraisr's own stat and now
appears on this page as well as in the track record. Same sourcing question.

### /solutions/secondaries — PLACEHOLDER, awaiting your copy

Only the heading and lede are real: `secondaries.title` and `secondaries.lede`,
both already DRAFT at source. **All five blocks are placeholder** and say so on
the page, in a visible note under each body, so this cannot ship unnoticed.

Nothing here was invented, deliberately. Avalanche publishes no secondaries
process copy anywhere I could find, and writing five plausible steps for a live
financial service would be fabricating a capability — the same reason the team
bios describe roles rather than careers. The five stage names (Position review,
Pricing, Counterparties, Process, Close) describe the general shape of a
secondaries mandate, not yours, and the first block says exactly that.

**Send the copy and this is a paste job** — five titles and five bodies, then
delete the `pending: true` flags.

### The artwork — six schematics, and four cards still blank

`MEDIA` in `solutions-steps.tsx` is keyed on block id, so a diagram only
appears on a block it genuinely describes. **Fundraising is now drawn in
full**; Secondaries has one of five.

| Block | Graphic | Note |
|---|---|---|
| Fundraising 01, Pre-marketing | Three raise inputs converging into one outlined package | The convergence *is* the claim — separate inputs resolving into positioned materials. |
| Fundraising 02, Investor sourcing | Sector × stage grid with a selection | "8 matched" is **computed from the rectangle**, so the caption cannot disagree with the dots. Sectors run down the left, stages along the bottom. Both lists are standard market categories. |
| Fundraising 03, Engagement | A three-touch sequence branching on a signal | Two outcomes from one sequence, because the copy says follow-ups are sequenced *by* signal. Channels are Email / LinkedIn, as the copy says. |
| Fundraising 04, Pipeline | Four top-aligned stage columns | The columns are the funnel. Counts (7/5/3/2) are schematic, and "2 committed" is read from the last column's own card count. |
| Fundraising 05, Meeting intelligence | One anonymous counterparty against four mandate parameters | "3 of 4 aligned" is **counted** from the parameter list. "Investor 07 / Growth fund" is deliberately anonymous. |
| Secondaries 03, Counterparties | Two columns of anonymous entries, one accent route | "Position 01–04" / "Buyer 01–04" are schematic so nothing reads as a real deal. |
| Secondaries 01, 02, 04, 05 | `PendingPlate` | A dashed frame reading "Artwork pending". |

**Nothing in these is a figure or a claim.** The counts, the stage names and
the counterparties are all illustrative. Every number that appears in a pill is
derived from the shape drawn beside it in the same render, never typed twice,
so a diagram cannot contradict its own caption.

Diagrams are **not** reused to fill a card they do not describe. Each makes a
specific claim, so showing the counterparty-routing picture beside a pricing
block would illustrate the wrong thing. An obvious blank beats a
plausible-looking wrong picture.

**If you have real screenshots**, they would beat either diagram, and swapping
one in is a per-card change with no layout consequence.

**Blocks are labelled by name, not "Step 1" and "Step 2".** The rail numbers
them, but on Secondaries especially these are stages rather than a promise of
sequence.

### The diagrams — illustrative, not data

`components/ui/solutions-media.tsx`. Both are schematics: anonymous positions,
generic sector names, no real counterparties, no figures. Which block each one
sits on, and why the other eight cards are blank, is in the section above.

Both were drawn in gold, and have since followed the palette through obsidian
to the brand blue `#3056EE` without a single value in `solutions-media.tsx`
changing — they are written against the `accent` role, not a colour.

These replaced `public/solutions/{secondaries,fundraising}.webp`, which carried
a hardcoded blue belonging to no token and rendered soft at display size. The
accent is itself blue now, which does not make that art right: the objection
was the one-off literal, not the hue.
Both files have been **deleted** — they are recoverable from `d797028^` if the
old artwork is ever wanted back.

---

## /manifesto — a whole page, and all of it drafted

**Added 5 September 2026.** Every string on this route is in
`content/manifesto.ts` and every block in it is marked `// DRAFT`. None of it
came from an Avalanche property. It was condensed from a thesis document you
supplied on the day.

### What was cut, and why that matters more than what was kept

The source ran to seven sections: five tenets, four data charts with a stat
grid, a competitor 2x2, an eight-row requirement matrix comparing us to
advisors and platforms, and a protocol architecture with three phases. Four
sections shipped. The rest was dropped, deliberately:

| Cut | Why |
|---|---|
| The four data charts and the stat grid | See below — roughly twenty unverifiable figures. |
| The competitor 2x2 and the requirement matrix | Adversarial toward named categories, and it is sales rather than belief. It also makes claims about how *other* firms are paid. |
| The protocol architecture and its three phases | That is `/solutions`, which already has five blocks and six diagrams. |
| The named allocator chips (ADQ, Mubadala, PIF, Rothschild, 8VC, …) | Naming institutions that have "reviewed our dealbook" is a checkable claim about third parties. If you want it, it needs to be true and probably needs their agreement. |
| The name **"the Capital Formation Protocol"** | It appears nowhere else on the site or in `content/`. Using it would be inventing a proprietary brand asset, not describing one. The page links to Solutions without naming a method. **Tell me if this is real and I will thread it through.** |

### THERE ARE NO FIGURES ON THE PAGE. This was a decision, not an oversight.

The source carried roughly twenty cited statistics — US listed-company counts,
private-backed counts, median age at IPO, single-family-office growth to 2030,
alternatives AUM, mega-fund share of committed capital, first-time fund closes,
secondary volume. Every one had a source attached and **not one could be
verified from here.**

The track-record figures are already the most load-bearing claims on the site
and are still awaiting your confirmation. Adding twenty more unverified ones —
to state a set of *opinions* — would spend the site's credibility to say
something that does not need a number to be true.

So the page argues from position. Every directional claim ("the listed universe
has been shrinking for a generation", "concentration has risen for a decade") is
a widely-documented shape stated **without a figure attached**, and both
diagrams are shape-only: no axis values, no units, no counts. Nothing on the
page can be factually wrong.

**If you want the data version, that is a different page and it needs a sourcing
pass first.** Send the sources and it is a build, not a rewrite.

### What needs your eye

| Block | Note |
|---|---|
| **H1 — "Capital is not scarce. Access is."** | Straight from the source and the best line in it. It is a strong, opinionated claim to lead a page with; confirm you want to make it. |
| **Belief 05 — "Access is infrastructure, not a rolodex."** | The body ends "That distinction is the whole of how this firm is built" — a claim about how Avalanche actually operates, not a market observation. The source went further and described the fee model (one-time engagement fee plus success fee, no retainers); **that was cut** because it is a commercial fact I cannot confirm. Add it back if it is right. |
| **Belief 04 — "No allocator has ever wired money because of a scoring model."** | Rhetorical, and it cuts at the software category. Fine if you are comfortable being that pointed. |
| **The three layers** | The framing (your network → extended network → addressable universe) is the source's and it is good. Confirm it matches how you actually describe the problem on a call. |
| **"Reaching the third layer predictably is the whole discipline."** | The bridge into `/solutions`. It promises the method delivers layer three. |

### The two diagrams

`components/ui/manifesto-media.tsx`. Both are schematics with **no figures**,
drawn in the same system as the `/solutions` six.

| Diagram | What it claims |
|---|---|
| **The divergence** | Two lines starting together and separating, with the space between them shaded and labelled "Access gap". One array drives both lines *and* the wash, so the shaded region is by construction the area between them. The values are a direction, not a quantity. |
| **The three layers** | Three concentric rects, the outer band accented and labelled "Addressable". The accent is knocked out by the inner two, so what shows is exactly the layer that is not being reached. |

Note that on these two the accent marks what is **not** reached, which inverts
its meaning on the `/solutions` six (where it marks what matched). Both pills
say so in words. The file carries a comment so a future reader does not
"correct" it.

---

## /get-in-touch — the questionnaire

**Added 5 September 2026.** Everything is in `content/contact.ts`.

**The nine questions and every one of their options are YOURS** — they are the
only strings on the new page that are not drafted, and the order is exactly as
supplied. Three things were changed to them, and nothing else. Each is one edit
to undo:

| Change | Example | Why |
|---|---|---|
| A typo | `"Three to six måonths"` → `"Three to six months"` | Stray character in the supplied list. |
| Sentence case on option labels | `"Investment Fund"` → `"Investment fund"` | Matches every other list on the site. Say the word and they go back to title case. |
| En dash in ranges | `"$1m - $5m"` → `"$1m – $5m"` | Matches the typography everywhere else. |

The count in "Question n of 9" is read from the array rather than typed, so the
two cannot disagree.

### Drafted, and needing your eye

| Block | Note |
|---|---|
| **"Get in touch" / the lede** | Taken from the reference you sent, which is Farah Capital's page. The words are generic enough that this is not really lifting, but it is not yours either — replace it if you want your own. |
| **Question phrasings** | Your list gave short labels (`Name:`, `Company:`). They are asked as full questions here — "What is your name?" — because one field per screen with a bare label reads as a form fragment. The *options* are untouched. |
| **The success panel** | "We read every submission ourselves. If there is a fit you will hear from one of us within two business days." **That is a promise about your response time and I invented it.** Change or remove it. |
| **"Prefer to reach us directly?"** | Sits above the LinkedIn link, see below. |

### Two things you need to supply

1. **Where submissions go.** The form does not send anywhere. It validates,
   collects and shows the success panel; that is all. This was deliberate so
   you could see and approve the flow before a destination was picked. Whatever
   goes in must not put the answers in a URL — they include a name and an email
   address.
2. **An email address and a phone number.** The reference's left column has
   both. Neither exists anywhere in this repo, so nothing was invented: the
   column offers LinkedIn and the form. Send them and they go into `site`
   beside the booking link, and the mail/phone rows go back in.

### Four labels now point at one page, and two of them promise the wrong thing

Renaming the CTA to **"Get in touch"** (5 Sep 2026) covered the nav and the
`/customers` and `/manifesto` page headers. It did not cover the other two
labels that also lead to the questionnaire, and those two now say something the
page does not do:

| Label | Where | Goes to | Problem |
|---|---|---|---|
| **Get in touch** | Nav, /customers and /manifesto headers | the form | Correct. |
| **Get started** | Hero, /solutions headers, four homepage sections | the form | Fine — neutral enough. |
| **Book a meeting** | The closing band, every page | the form | **Promises a calendar and delivers a nine-question form.** |
| **Book an intro call** | Footer | the form | Same. |

The last two were accurate when they went straight to the scheduler. They no
longer do. My suggestion is "Get in touch" for the closing band and "Get in
touch" or "Start a conversation" for the footer, but this is a copy decision
and I have not made it for you — **say the word and it is two strings.**

### What changed elsewhere because of this page

Every CTA on the site now points at `/get-in-touch` instead of scrolling to the
closing band, and the band's own button goes there too rather than straight to
the scheduler. **`site.booking` is now reached from exactly one place** — the
success panel at the end of the form. That is the only remaining scheduler link
on the site, so the outstanding question about which calendar to use now
affects one button instead of nine.

---

## Supplied by you — not drafted, but worth one check

**The Neurable testimonial** (`testimonial` in `content/copy.ts`) — quote, name, role and photo all came from you, so none of it is drafted. One thing to confirm before launch: the portrait is paired with **Dr. Ramses Alcaide**'s name, and a photo attached to a named real person is a factual claim. If that image is a placeholder rather than them, swap it — it is the kind of mismatch that is very hard to spot later and awkward if a reader notices.

---

## Still needs you — not drafted, not draftable

1. **Footer legal text** (`content/copy.ts`) — currently adapted from the short notice on fundraisr.ai. Should come from counsel.
2. **The five track-record figures.** These were replaced on 1 Sep 2026 with the numbers from **fundraisr.ai's stats band**, at your direction:

   | Figure | Label |
   |---|---|
   | `30+` | Active mandates worldwide |
   | `$2B+` | Capital raising powered by Fundraisr |
   | `600+` | End-to-end qualified investor introductions facilitated |
   | `1.2M+` | Active investor profiles on the platform |
   | `<10 days` | Average time to first investor meeting |

   They replace the previous four (`$2B+`, `$300M+`, `200`, `$600M+`), which came from 2024 pages. **Two things to check before launch:**
   - These are still marketing figures lifted from another property rather than confirmed numbers. They are the most load-bearing claims on the site and the first thing an investor will test.
   - **"Capital raising powered by Fundraisr"** names Fundraisr on the Avalanche site. That is accurate — same owner — but it is a positioning decision, not a neutral one. Confirm you want the two brands linked this explicitly here.
3. **The booking link — currently a placeholder.** The scheduler at the foot of every page is a panel with a "Book a meeting" button, not a live embed. It points at `https://www.fundraisr.ai/book-demo` (live, and yours) via `site.booking` in `content/copy.ts`. **Send the real calendar link and it is a one-string change.**

   Two notes: that Fundraisr page runs on LeadConnector (GoHighLevel), not Calendly — so if it becomes the scheduler the embed has to be rebuilt, not re-pointed. And the old Calendly event is **not** dead as previously reported: `capital-raise-demo-call-ac-clone` still returns 200 and resolves to "Capital Raise | Strategy Call". If that is the one you want, say so and I will embed it properly. The slug still reads like a duplicate.
4. **Team headshots.** Monograms stand in. The Framer originals are low-resolution; send better ones if they exist.
5. **Case-study categories.** The Funds / Startups / Placement-agency classification on all 13 case studies was assigned by the previous session, not taken from source. It drives the `/customers` filter.
