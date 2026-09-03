# Avalanche Capital site — build notes & handover

> ## ⚠️ Superseded in part — re-skinned 1 September 2026
>
> This document describes the **first** build, whose visual design came from
> `farahcap.com` — cream ground, Cormorant Infant serif, gold italic accents.
> **That design is gone.** The brief changed: the UI, palette and fonts now come
> from **`fundraisr.ai`** — near-black ground, Satoshi throughout, flat white
> type, no serif and no accent colour. A full-bleed background video was added
> to the hero.
>
> Sections **1–2** (what was asked for / what was built) and **4** (design
> decisions) are historical — read them for context, not as current fact.
> Sections **3** (content provenance), **5** (bugs found), **6** (problems on
> the live sites) and **7** (what's needed from you) still hold, except where
> noted below.
>
> **Current state lives in `README.md` and `docs/COPY-REVIEW.md`.**
>
> ### What changed on 1 September 2026 — complete list
>
> **Design system** — `app/globals.css` rewritten.
> - Colour tokens renamed from hue to **role**: `cream`→`ground`,
>   `cream-deep`→`ground-alt`, `ink`→`fg`, `ink-muted`→`fg-muted`,
>   `ink-faint`→`fg-faint`. Added `ground-deep` and `card`. `gold`, `gold-deep`
>   and `gold-soft` are **retired** (`gold-soft` was never used).
> - All values repointed dark, measured off fundraisr.ai.
> - New `[data-band="light"]` block re-points every token for a subtree, plus a
>   `[data-band="dark"]` counterpart so a dark island can nest inside a light
>   band. Applied to Who-we-serve (`/`), Offerings (`/process`) and In-the-press
>   (`/team`).
> - New `--header-h` custom property: `main` reserves it, the hero cancels it.
> - New `.hero-video` rule — `saturate(.5)` grade, and `display:none` under
>   `prefers-reduced-motion`.
> - `.display` dropped the serif; `.shell` and `.section-y` retuned.
>
> **Type** — Cormorant Infant + Inter (next/font/google) → **Satoshi**, self-hosted
> from `app/fonts/` via `next/font/local`. 42KB, roman only: the italic face was
> downloaded, then dropped once a grep confirmed nothing on the site is italic.
>
> **Hero video** — `Fundraisr.mp4` as a full-bleed background behind the headline.
> Still a **server component with no JS**: the poster is the wrapper's background
> image, so reduced motion just hides the video. `<source media>` gates the fetch
> so the file is never downloaded in that state.
> - New `scripts/optimize-hero-video.mjs`. 17.8MB master → 791KB mp4 + 565KB
>   webm + 20KB poster.
> - **Trimmed to 9.3s.** The master hard-cuts at 9.59s into a bright blown-out
>   window shot — `signalstats` shows mean luma jumping 60 → 152 and staying
>   there. On a black page that strobes on every loop.
> - Audio and a stray `tmcd` timecode stream stripped (`-an -dn -sn` plus
>   `-write_tmcd 0`, which was needed because ffmpeg re-adds it).
>
> **Buttons** — `components/ui/arrow-cta.tsx` → `components/ui/button.tsx`,
> `ArrowCta` → `CtaButton`. 6px rectangle, not a pill; the trailing `→` glyph is
> gone. `bg-fg text-ground` means it inverts inside a light band for free.
>
> **Headings** — `section-heading.tsx` no longer renders the gold italic accent.
> The `accent` key survives in `content/copy.ts` (ten objects) but is accepted
> and ignored; the prop is documented as such.
>
> **Client logos — fixed at the asset layer.** New `scripts/logos-to-alpha.mjs`.
> The 70 marks were flattened rasters with *inconsistent* baked backgrounds (some
> white, some black, none with alpha), so no single CSS blend mode could work.
> The script reads median border luminance to decide polarity, flips if needed,
> then uses luminance *as* the alpha channel over white — a white silhouette on
> transparency that sits on any ground. A black-point floor removes the faint
> rectangular halos that near-black backgrounds left behind. Idempotent.
> **This resolves item 8 in §7.**
>
> **Nav** — rebuilt to fundraisr.ai's layout.
> - Fixed overlay: transparent over the hero video at scroll-top,
>   `bg-ground/85 backdrop-blur-md` on scroll. Announcement bar kept, restyled.
> - **Links centred on the viewport** (absolutely positioned at `left-1/2` with a
>   `-translate-x-1/2`), not centred in the leftover space between the wordmark
>   and the buttons — so they hold position as either side changes width.
>   Measured: off-centre by 0px at 1440.
> - CTA relabelled **"Get in touch" → "Book a call"**, in the nav and the mobile
>   sheet. The `#get-in-touch` anchor id is unchanged.
> - New **`LoginPlaceholder`** to the right of the CTA, mirroring fundraisr.ai.
>   There is no client area on this site, so it is deliberately inert: a
>   `<button>` rather than a link (no destination to point at), marked
>   `aria-disabled` so assistive tech and tooling treat it as unavailable while
>   it keeps the muted look. Verified: a forced click causes no navigation and
>   no error. Swap it for a `<Link>` when there is somewhere to go.
>
> **Hero stat** — `$2B+ in active mandates` moved. It was a full-width block
> sitting under a hairline rule at the foot of the hero; it now sits at the
> **right end of the CTA row, centred against the button**, matching the
> reference layout. The CTA row was lifted out of the headline's `max-w-3xl`
> measure so the stat can reach the shell's right edge. Below `sm` the two stack
> and the stat left-aligns.
>
> **Track record rebuilt and moved.** It now sits **directly after the hero**
> (was after Who-we-serve) and is laid out as the reference grid: centred
> heading, a bordered **2-over-3 cell grid** with an index number in each cell's
> top-right corner and decorative corner brackets, then a centred CTA with a
> live dot.
> - **The figures were replaced** with the five from fundraisr.ai's stats band:
>   `30+` active mandates worldwide, `$2B+` capital raising, `600+` investor
>   introductions, `1.2M+` investor profiles, `<10 days` to first meeting. The
>   previous four (`$2B+`, `$300M+`, `200`, `$600M+`) are gone.
> - `useCountUp` now carries a `decimals` field so `1.2M+` renders correctly,
>   and interpolates in floating point rather than rounding each frame.
> - A 6-column track divides cleanly into 3+3 and 2+2+2. At the 2-column
>   breakpoint the fifth cell spans both columns — five cells in two columns
>   otherwise left a ragged half-row with the corner bracket floating in space.
> - **The IntersectionObserver threshold was a latent trap.** It was
>   `threshold: 0.25`, and a fraction is a proportion of the *section*. This
>   section is now ~1666px on a phone; had it grown past 4x the viewport the
>   threshold could never be met and every figure would have sat at zero
>   permanently — worse than the partial-count bug the original code guarded
>   against. Verified reachable at 375/390/768, then changed anyway to
>   `threshold: 0` with a `-15%` bottom inset, which is height-independent and
>   fires as the reader arrives rather than deep into the section.
> - New `--color-live` token (`#4ade80`) for the dot beside the CTA note — the
>   only chromatic note in the palette, and purely decorative.
>
> **Client testimonial added** to the featured case-study section — Dr. Ramses
> Alcaide, Neurable. Portrait left, quote right, stacking on mobile; the photo
> is `object-cover` into a 5/4 frame from an 800x800 source. Source JPEG
> (186KB) re-encoded to WebP (129KB) at `public/testimonials/`. Copy lives in
> `testimonial` in `content/copy.ts`. Rendered in the site's dark palette rather
> than the light card of the reference, so it sits inside the surrounding dark
> band — flip the section to `data-band="light"` if the light treatment is
> wanted.
>
> **"Why Avalanche" (Thesis) removed from the homepage.** The section is no
> longer mounted in `app/page.tsx`. `components/sections/thesis.tsx` and the
> `thesis` object in `content/copy.ts` were **kept and marked as unmounted**,
> not deleted: the text is genuine copy from avalanche-capital.com and nothing
> in this repo is committed, so a delete would be unrecoverable. Delete both if
> it is not coming back.
>
> Homepage order is now: Hero → Track record → Who we serve (light) → Selected
> case study → Active clients → Get in touch.
>
> **Two new homepage sections**, both built to the reference's bracketed-grid
> layout — icon top-left, index number top-right, label at the bottom, corner
> brackets around the frame.
> - **"Built for Funds and Operators Raising Growth Capital"** (`raise-types.tsx`),
>   above the featured case study. Five cells over a 6-column track: 3+3 then
>   2+2+2. Dark band.
> - **"Industries We Serve"** (`industries.tsx`), below it. Ten cells over four
>   columns, 4+4+2 with the last row widened to fill. Set as a
>   **`data-band="light"`** section — it matches the reference and breaks up
>   what would otherwise be five consecutive dark bands.
>
> **The bracketed grid was extracted**, not copied a third time.
> `components/ui/bracket-grid.tsx` now owns the frame, the hairlines, the index
> numbers and the corner brackets; `track-record.tsx` was refactored onto it.
> Cell *content* still lives in each section. `trailingSpans()` there computes
> the widening for a ragged final row — used by the verticals grid; the raise
> types grid keeps a bespoke 3+3 / 2+2+2 because an even split does not produce
> that shape. Both were measured: every row now sums to exactly the full track
> width (1200/1200px at 1440).
>
> **`components/ui/icons.tsx`** — fourteen inline 24px line icons. Inline SVG
> rather than an icon package: not worth a dependency at this size, and
> `currentColor` means they follow the `[data-band]` token flip for free.
>
> **Copy for both sections is PLACEHOLDER.** Neither avalanche-capital.com nor
> fundraisr.ai publishes an industry or raise-type list — checked both, plus
> fundraisr's /solutions and /customers. The stage and structure names are
> standard capital-market categories; the descriptions were written here. See
> `docs/COPY-REVIEW.md`.
>
> **Hero is now full-screen and carries the client strip.**
> - Height went from `min-h-[min(46rem,92svh)]` to **`min-h-svh`**, so it fills
>   the viewport exactly (measured: 900/900, 1200/1200, and taller than the
>   viewport on mobile). `svh` rather than `vh` on purpose — a collapsing mobile
>   URL bar changes `vh` mid-scroll and the hero would visibly resize.
> - The **Active-clients marquee now also runs along the foot of the hero**,
>   with no background of its own so the video shows through. `LogoMarquee` was
>   extracted to `components/ui/logo-marquee.tsx` and is shared with the
>   standalone band.
> - **The scrim had to change for this.** It previously ended at full opacity,
>   which would have put the strip on solid black. It is now a four-stop
>   gradient — 0.80 / 0.74 / 0.78 / 0.86 — staying dark through the headline and
>   CTA, then easing at the foot so the footage still reads behind the logos. It
>   never reaches 1; at 0.86 over footage this dark the seam with the next
>   section is imperceptible.
>
> **Hero contrast was re-measured properly for that change**, and this is worth
> recording because the first attempt was wrong. Sampling the "background"
> inside each text box counts the glyphs' own anti-aliased pixels and inflates
> it — that method reported three failures (lede 3.0:1, CTA note 1.6:1, stat
> label 2.3:1) that do not exist. Re-run with the foreground hidden so the boxes
> contain **pure background**, across ten frames spanning the whole 9.3s loop:
>
> | Element | Worst bg L | Ratio | Need | |
> |---|---|---|---|---|
> | Eyebrow | 0.016 | 4.72:1 | 4.5 | PASS |
> | H1 | 0.020 | 14.94:1 | 3 | PASS |
> | Lede | 0.021 | 5.91:1 | 4.5 | PASS |
> | CTA note | 0.018 | **4.56:1** | 4.5 | PASS — tightest on the page |
> | Stat value | 0.030 | 13.09:1 | 3 | PASS |
> | Stat label | 0.029 | 5.33:1 | 4.5 | PASS |
> | Strip label | 0.013 | 4.95:1 | 4.5 | PASS |
>
> The CTA note at 4.56:1 has almost no margin. If the scrim is ever lightened
> further, or the source video is replaced with brighter footage, that line is
> the first thing that breaks — re-run the measurement rather than assuming.
>
> **The standalone Active-clients section was removed from the homepage** once
> the strip moved into the hero — the marquee was appearing twice on one page.
> `LogoBand` itself stays: `/customers` still uses it as "Trusted by".
>
> The `logoNote` disclaimer went with it, but the claim is not left unqualified —
> the footer's `legal` text carries a stronger equivalent on every page
> ("Client logos and case studies represent past engagements of Avalanche
> Capital LDA (PT 517584271)"). Checked rather than assumed.
>
> **FAQ rebuilt as two columns and added to the homepage**, under Verticals.
> Heading block left (sticky on tall viewports), accordion right, stacking
> below `lg`. Items are now bordered cards with a gap rather than a divided
> list, and the first is `open` so the section does not read as a wall of
> closed bars. Still a native `<details>` accordion — keyboard-accessible,
> findable by in-page search, correct before hydration, zero JS.
>
> **The FAQ lives on the homepage only.** It was briefly on both `/` and
> `/process`; removed from `/process`. Nothing linked to the `#faq` anchor, so
> no link broke — checked before removing. `/process` is now Process →
> Offerings → Get in touch, which is a thin page; worth a look at whether it
> still earns its place in the nav.
>
> **The answers were rewritten against fundraisr.ai's real copy.** There is no
> published FAQ anywhere to lift from — checked fundraisr's `/faq`, `/platform`,
> `/solutions`, `/customers` and `/pricing`; none exist or none carry questions,
> and the site is client-rendered so this needed a real browser, not curl. What
> the answers now draw on:
> - the platform positioning ("identify, engage, and convert the right
>   investors — at scale, without compromise")
> - "Fundraising still runs on who you know. It shouldn't."
> - Investor Intelligence: **1.2M+ profiles** across venture, private credit,
>   real estate and private equity, filterable by thesis, stage, geography,
>   cheque size, recent activity
> - the client types: startups raising capital, placement agencies, boutique
>   IBs, emerging fund managers
> - "**<10 days** average time to first investor meeting"
>
> Four answers are materially better for it — what we do, what makes us
> different, how long it takes, and which stages. The two conservative ones are
> unchanged: **"do you guarantee clients raise"** stays a flat no (the footer
> disclaimer already says exactly that), and **"what is the cost"** still
> carries no number, because none exists on any property and inventing a fee on
> a capital-advisory site is a liability, not a placeholder.
>
> **Calendly embed replaced with a booking placeholder.**
> `components/sections/booking.tsx` renders a designed panel — calendar glyph,
> heading, the intro-call note, and a **"Book a meeting"** button — in the slot
> the embed used to occupy, on every page.
> - The button points at `site.booking` in `content/copy.ts`, currently
>   `https://www.fundraisr.ai/book-demo` (live, 200, and yours) so it works
>   today. **Swap that one string when the real calendar link arrives** —
>   nothing else needs to change.
> - Opens in a new tab with `rel="noopener noreferrer"`.
> - `components/sections/calendly.tsx` is **no longer mounted**, kept and marked
>   rather than deleted.
>
> Two things worth recording about this:
> - **The Calendly event is not dead.** The blank box was a render problem, not
>   a broken link — `capital-raise-demo-call-ac-clone` still returns 200 and
>   resolves to "Capital Raise | Strategy Call". Item 6 in §7 still stands.
> - **Fundraisr's booking page runs on LeadConnector (GoHighLevel)**, not
>   Calendly — its network calls go to `api.leadconnectorhq.com` and
>   `link.msgsndr.com`. So if that becomes the scheduler, the old Calendly
>   component is the wrong shape for it and the embed will need rebuilding
>   rather than re-pointing.
>
> Previously the Calendly widget theme params had been changed from
> `background_color=ffffff&text_color=14110d&primary_color=a98b62` to
> `background_color=0e0e13&text_color=ffffff&primary_color=ffffff`.
>
> **Copy** — the panels §7 called unreachable were re-tested from scratch and
> confirmed **absent from the page source entirely**, not merely click-resistant.
> They have been *drafted* and every block marked `// DRAFT`.
> **Resolves item 4; partly resolves items 1 and 5.** Full rationale and a
> sign-off list in `docs/COPY-REVIEW.md`. Team bios deliberately describe the
> **role, not the person** — see that document for why.
>
> **React hooks** — two pre-existing `react-hooks/set-state-in-effect` lint
> errors fixed rather than suppressed:
> - `track-record.tsx` and `nav.tsx` now read reduced-motion and scroll offset
>   with `useSyncExternalStore` (both are external state; the server snapshot is
>   `false`, matching pre-hydration markup).
> - `nav.tsx` closes the mobile sheet on route change by adjusting state during
>   render rather than in an effect.
> `npm run lint` is now clean.
>
> **Dev port pinned to 3200** (`package.json`). Port 3000 was held by an
> unrelated project on this machine, which is the entire reason the site appeared
> not to start — Next moved to a free port silently, so `localhost:3000` served
> someone else's app.
>
> ### Verified after the re-skin
>
> - `npm run build` and `npm run lint` clean.
> - **Contrast: zero failures** across all four routes — every text/background
>   pair, computed from real rendered colours against WCAG AA.
> - No horizontal overflow at 320 / 375 / 414 / 768 / 1024 / 1440.
> - Video autoplays (muted + playsInline), correct source selected, hidden under
>   reduced motion.
> - Count-up settles on the true figures; snaps straight to them under reduced
>   motion.
> - Mobile menu opens and closes on navigation; Calendly mounts with the dark
>   theme; no console errors or failed requests on any route.

**Date:** 1 September 2026
**Status:** Complete and running locally. Not deployed. Blocked on content, not code.

---

## 1. What was asked for

Build a site for **Avalanche Capital** that takes:

- the **visual design** of [farahcap.com](https://www.farahcap.com/)
- the **copy** from [avalanche-capital.com](https://avalanche-capital.com/)
- a **restructured page set** you specified, with two changes to Farah's homepage:
  - the FAQ block replaced by a **booking calendar**
  - the three-card case-study section reduced to **one (Neurable) plus a click-through**

---

## 2. What was built

Four pages. **"Get in touch" is not a page** — it's the Calendly band at the foot of every page, and the anchor every CTA points to.

| Route | Sections |
|---|---|
| `/` | Hero · Thesis · Who we serve · Track record · Neurable case study · Active clients · **Calendar** |
| `/process` | Three-phase process · Offerings · **FAQ** |
| `/customers` | Filterable grid of all 13 case studies |
| `/team` | Five partners · Press mentions |

The FAQ moved off the homepage to `/process` — the homepage got the calendar in its place, per your annotation.

### Stack

Next.js 16.3.4 (App Router) · React 19 · TypeScript · Tailwind v4 · statically generated · ready for Vercel.

No CMS and no database. All copy lives in typed files under `content/` so it can be edited without touching components.

### Results — first build (superseded)

| | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| Desktop | **100** | **100** | **100** | **100** |
| Mobile | 97 | **100** | — | — |

LCP 0.5–0.6s, CLS 0. No horizontal overflow at 320 / 375 / 414 / 768 / 1024 / 1440px on any page.

> **These Lighthouse scores have NOT been re-run since the re-skin.** Treat the
> table above as history, not as a current claim — the hero now carries a video.
>
> What *was* measured after the re-skin, on a production build served locally
> (no network throttling, so these are not Lighthouse-equivalent):
>
> | Route | TTFB | FCP | LCP | CLS | Transfer |
> |---|---|---|---|---|---|
> | `/` | 39ms | 176ms | **176ms** | **0** | 628KB |
> | `/process` | 6ms | 32ms | 32ms | **0** | 42KB |
> | `/customers` | 4ms | 36ms | 36ms | **0** | 67KB |
> | `/team` | 3ms | 64ms | 64ms | **0** | 42KB |
>
> The LCP element on `/` is the hero wrapper painting the **20KB poster**, not
> the video — which is why adding a background video did not move LCP. Of the
> homepage's 628KB, 565KB is the video streaming in behind it, 42KB the font.
> Overflow was re-tested at all six widths: clean.
>
> Run Lighthouse before launch to confirm the composite scores still hold.

---

## 3. Where every piece of content came from

I did not lift any text from Farah Capital. Design only. All copy traces back to a property you own.

| Section | Source |
|---|---|
| Hero, thesis pillars, investor verticals, process steps 01–02, team, press quotes | `avalanche-capital.com` |
| All 13 case studies, ~55 client logos, Customers page structure | `fundraisr.ai/customers` |
| `$600M+ raised` figure | `fundraisr.co` |
| Track record `$2B+`, `$300M+`, `200` | `avalanche-capital.com` |

### The Neurable case study — found, not needed from you

You offered to send it. It turned out to be on `fundraisr.ai` (the `.ai` domain), so it's already in:

> **Neurable** — 18 investor meetings in 3 months. Campaign culminated in a closed $35M Series A, exceeding the original raise target.

The same page carried 12 more, all of which are now on `/customers`: Rimla Capital, Catalyst Capital, Foggprevail Capital, DRX, PureWager, Vensa, Toothsure, Ravok Studios, Woof Play Eat, Legitify, Stormbreaker Ventures, Nobody Studios.

**Note on categories:** the Funds / Startups / Placement-agency classification on each case study is *mine*, not from source. Worth a review — it drives the filter.

---

## 4. Design decisions

Farah's system, decoded and rebuilt:

- **Display type** — Cormorant Infant (they used it alongside GFS Didot). High-contrast Didone, set large, with the closing phrase in italic gold.
- **Body type** — Inter.
- **Ground** — warm cream `#faf7f2`, with `#f3efe7` for alternating bands; cards are white with hairline borders.
- **Eyebrows** — 11px, letterspaced, uppercase.
- **CTAs** — solid black pills with a trailing arrow and a muted qualifier line beneath.
- **Motion** — count-up stats on scroll, staggered hero reveal, a continuous logo marquee. All respect `prefers-reduced-motion`.

### Palette contrast

Documented in `app/globals.css`. Worst case is on `cream-deep`:

| Token | Ratio | Verdict |
|---|---|---|
| `ink` | 16.4:1 | AA |
| `ink-muted` | 5.2:1 | AA |
| `ink-faint` | 4.6:1 | AA |
| `gold` | 3.0:1 | **Display text only (≥24px)** |
| `gold-deep` | 4.6:1 | AA — use for gold at label sizes |

---

## 5. Bugs found and fixed

Four worth recording, because three of them ship silently.

1. **Stats counter could display a wrong financial figure.** `requestAnimationFrame` is throttled in background tabs and can be torn down mid-flight — I caught the band showing `$276M+` where the truth is `$300M+`. The animation now snaps to the true value on cleanup, and values under 10 skip the count entirely (a 0→2 tick reads as broken rather than impressive).
2. **`/customers` overflowed 12px horizontally on phones.** The metric pill's `whitespace-nowrap` set a min-content floor that the grid item wouldn't shrink below. Fixed with `min-w-0` and a wrapping pill.
3. **`ink-faint` failed WCAG AA at 2.9:1.** It carried every eyebrow label, the footer legal text, and the CTA qualifiers — all small text. Retuned the whole palette; everything passes AA now.
4. **Team grid showed an empty grey cell.** Five members in a three-column `gap-px` sheet left a ragged cell showing the sheet's own background, which read as a broken card. Switched to individually bordered cards — robust at any count or breakpoint.

### Asset optimisation

The 70 logos pulled from `fundraisr.ai` were SVG wrappers around base64 rasters — two of them ~2MB each, **9.5MB total**. `scripts/optimize-logos.mjs` extracts the payload and re-encodes to sized WebP: **404KB**, a 96% reduction. Re-run it if you add more.

---

## 6. Two things I found broken on your live sites

Unrelated to this build, but you'll want to know.

### Both Calendly links are dead

`avalanche-capital.com` and `fundraisr.co` both point at slugs that return **"This Calendly URL is not valid."**

| Link | Where it appears | Status |
|---|---|---|
| `/avalancheintrocall/avalanche-capital` | avalanche-capital.com | **Dead** |
| `/avalancheintrocall/avalanche-s-onboarding-call` | fundraisr.co onboarding | **Dead** |
| `/avalancheintrocall/capital-raise-demo-call-ac-clone` | — | **Live** ("Capital Raise \| Strategy Call", 30 min) |

**Your "Get Started" CTA currently goes nowhere.** I wired the site to the live event and verified it loads and is interactive. But that slug reads like a duplicate — see item 6 below.

### `fundraisr.ai` has no certificate on the apex domain

`https://fundraisr.ai` fails to connect entirely. Only `https://www.fundraisr.ai` resolves. Anyone typing the bare domain gets a connection error.

---

## 7. What I need from you

> **Status after the re-skin (1 Sep 2026):** items **4** and **8** are resolved.
> Items **1** and **5** are *partly* resolved — the copy has been drafted and
> flagged for your sign-off rather than left blank. Items **2**, **3**, **6** and
> **7** still stand exactly as written. The current, authoritative list is
> `docs/COPY-REVIEW.md`; markers in the source are now `// DRAFT`, not
> `NEEDS-COPY`.

Everything here was marked `NEEDS-COPY` or `TODO(miguel)` in the source. Ordered by how much it blocks launch.

### Blocking

1. **FAQ answers** — `content/faqs.ts` — *partly resolved: drafted, needs sign-off.*
   Seven of eight questions are unanswered. I wrote the questions and answered the first one from your existing positioning, but did not invent the rest. On a capital-advisory site, fabricated answers about guarantees, cost, and qualification criteria are a liability, not a placeholder.

2. **Verify the track-record figures** — `content/copy.ts`
   `$2B+` active mandates · `$300M+` capital advised · `200` introductions · `$600M+` raised.
   All four come from pages dated **2024**. These are the most load-bearing claims on the site and the first thing an investor will test. Confirm or replace before launch.

3. **Footer legal / disclaimer text** — `content/copy.ts`
   Currently adapted from the short notice on `fundraisr.ai` referencing *Avalanche Capital LDA (PT 517584271)*. Farah's equivalent runs four paragraphs and is specific to their entity and their broker-dealer position. Yours should come from counsel.

### Content gaps

4. **Four copy panels** — `content/copy.ts` — *resolved: drafted, needs sign-off.*
   - Offerings: **LP Capital**, **Growth Capital**, **Secondary Liquidity**
   - Investor verticals: **Accredited Retail**, **HNWI / Angels**
   - Process: **step 03**

   These sit behind a tabbed carousel on `avalanche-capital.com` that renders only its first panel server-side and does not respond to clicks under automation — synthetic events, real pointer events, and the next/prev arrows all failed. I stopped after several attempts rather than keep hammering it. Easiest fix: open the page, click through the tabs, and paste me the text. Or send the original copy deck.

   **Update:** re-tested from scratch and the diagnosis was incomplete — this is not a stubborn carousel, the body text is **not in the document at all**. Fetching the raw HTML and searching it shows the `framer-*-container` elements for LP Capital, Growth Capital and Secondary Liquidity contain nothing but their own tab labels. No amount of clicking would have worked. The panels have been drafted instead; see `docs/COPY-REVIEW.md`.

5. **Team bios and headshots** — `content/team.ts` — *partly resolved; read the caveat.*
   Bios sit behind "Read Bio" modals (same carousel problem). Monogram avatars stand in for photos. The existing Framer headshots are low-resolution — originals would be better.

### Decisions

6. **Confirm the Calendly event.** `capital-raise-demo-call-ac-clone` is the only live event on the account, but the slug suggests it's a duplicate of something. Is it the one prospects should book? If you create a clean one, it's a one-line change.

7. **Review the case-study categories.** I classified all 13 into Funds / Startups / Placement agencies myself. The filter depends on it.

8. **Logo quality.** ~~Several client logos have dark backgrounds baked into the raster and render as black tiles on the white cards — Neurable, Catalyst, FoggPrevail, DRX among them.~~

   **Resolved.** `scripts/logos-to-alpha.mjs` now normalises all 70 marks to white-on-transparent, so the baked backgrounds are gone entirely. Transparent originals would still be marginally sharper, but this is no longer a defect.

---

## 8. Running it

```bash
npm install
npm run dev      # http://localhost:3200  (pinned — see below)
npm run build    # typecheck + static generation
npm run lint

node scripts/logos-to-alpha.mjs           # re-normalise logos after adding any
node scripts/optimize-hero-video.mjs [src] # rebuild the hero video assets
```

The dev port is **pinned to 3200** deliberately. Port 3000 collides with other
Next projects on this machine and the failure mode is confusing: Next moves to a
free port silently, so `localhost:3000` serves a *different* project and this one
looks broken.

Deploy: `vercel` — no environment variables, no external services beyond the Calendly embed.

---

## 9. File map

```
app/
  layout.tsx              Satoshi via next/font/local, nav, footer, metadata
  globals.css             THE design system — tokens, bands, utilities
  page.tsx                Home
  process/page.tsx  customers/page.tsx  team/page.tsx
  fonts/                  Satoshi-Variable.woff2 (42KB, roman only)

components/
  site/     nav · footer · cta-band (the calendar)
  sections/ hero · thesis · who-we-serve · track-record ·
            featured-case-study · logo-band · case-study-grid ·
            faqs · calendly
  ui/       button · section-heading · case-study-card

content/                  ← everything editable lives here
  copy.ts                 hero, thesis, verticals, track record, CTA, legal
  case-studies.ts         13 records
  team.ts                 5 records
  faqs.ts                 8 questions
  client-logos.ts         generated — do not hand-edit

public/
  video/                  hero.mp4 · hero.webm · hero-poster.webp
  logos/clients/          55 client logos (WebP, white-on-transparent)
  logos/cases/            15 case-study logos (WebP, white-on-transparent)

scripts/
  optimize-hero-video.mjs trim + encode the hero from the master
  logos-to-alpha.mjs      normalise logos to white-on-transparent (idempotent)
  optimize-logos.mjs      the original one-off SVG/base64 extractor
```

Touch carefully:
- **`app/globals.css`** — 12 tokens and 5 utilities are the entire visual identity.
- **`components/ui/button.tsx`** — every CTA on the site routes through it.
- **`track-record.tsx`** — the count-up displays financial figures; it must never be left mid-count.
- **`case-study-card.tsx`** — reused on Home and Customers; its `min-w-0` is load-bearing.
- **`logo-band.tsx`** — assumes the assets are already white-on-transparent.

---

## 10. Out of scope

Blog, legal sub-pages, the application form, and CMS wiring were not built. The nav is structured so `/blog` can be added later without restructuring.
