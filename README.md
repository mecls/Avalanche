# Avalanche Capital

Marketing site for Avalanche Capital. Next.js 16 (App Router) + Tailwind v4, statically generated, deployed on Vercel.

```bash
npm run dev     # http://localhost:3200
npm run build
```

> The dev port is pinned to **3200** on purpose. Port 3000 collides with other
> Next projects on this machine, and the failure mode is confusing: Next moves
> to a free port silently, so `localhost:3000` shows a *different* project.

## Where things come from

| Source | What it supplied |
|---|---|
| `fundraisr.ai` | The **entire visual design** — palette, Satoshi type, layout rhythm, button and card treatment. Both sites are ours. |
| `avalanche-capital.com` | Copy: hero, thesis pillars, investor verticals, process steps, track record, team, press |
| `fundraisr.ai/customers` | All 13 case studies, the ~55 client logos, customers-page structure |
| `fundraisr.co` | The `$600M+ raised` figure |

Everything editable lives in `content/` — `copy.ts`, `case-studies.ts`, `team.ts`, `faqs.ts`, `client-logos.ts`. No CMS; edit the files.

## Structure

4 pages. There is no "get in touch" page — booking is the closing band (`components/site/cta-band.tsx`) at the foot of every page, and `#get-in-touch` is the anchor every CTA points to.

```
/            Hero (video, full-screen, client strip) · Track record · Who we serve ·
             What we raise · Neurable case study + testimonial · Verticals · FAQ · Calendar
/solutions   Page heading · two numbered blocks — Secondaries, Fundraising — on a
             vertical progress rail
/customers   Filterable grid of all 13 case studies
/team        Five partners · Press
```

**`/process` no longer exists.** The step timeline it carried is now `/solutions`,
cut back from three steps to two blocks. `next.config.ts` redirects the old
route, deliberately with a **307 and not a 308**: this route has moved twice,
an earlier 308 to `/solutions#fundraising` is still cached in any browser that
followed it, and a 308 cannot be withdrawn — no response header un-caches one
already issued. A 307 keeps this move revisable. Purge the CDN on the next
deploy either way.

The `#secondaries` and `#fundraising` anchors were kept on the two blocks, so
the old deep links still land in the right place.

### The hero

`min-h-svh`, so it fills the viewport exactly — `svh` rather than `vh` because a collapsing mobile URL bar changes `vh` mid-scroll and the hero would visibly resize. The eyebrow, headline and lede are held to a `max-w-3xl` measure, but the **CTA row spans the full shell** so the `$2B+` stat can sit against the right edge, centred against the button. They stack below `sm`. The client marquee runs along the foot with no background of its own, so the video shows through.

**The scrim is load-bearing and tuned, not decorative.** Four stops — 0.80 / 0.74 / 0.78 / 0.86 — dark through the headline and CTA, easing at the foot so the footage reads behind the logos, and never reaching full opacity (which would put the strip on solid black).

Contrast over video cannot be checked by reading CSS — you have to measure composited pixels, **with the foreground hidden**. Sampling inside a text box counts the glyphs' own antialiasing as background and reports failures that aren't real. Measured correctly across ten frames of the loop, everything passes; the CTA note is tightest at **4.56:1** against a 4.5 floor. Lighten the scrim or swap in brighter footage and that line breaks first — re-measure, don't assume.

### Track record

Sits directly after the hero. A 6-column grid that divides into 3+3 and 2+2+2, with an index number per cell and decorative corner brackets. The fifth cell spans both columns at the 2-column breakpoint — otherwise five cells leave a ragged half-row.

The figures count up on scroll. Two things there are deliberate and worth not undoing:

- **The observer uses `threshold: 0` with a `-15%` bottom inset, not a fractional threshold.** A fraction is a proportion of the *section*, so a section taller than 4× the viewport can never satisfy it and every figure would sit at zero forever.
- **The count never leaves a partial figure standing.** It snaps to the true value on cleanup (rAF is throttled in background tabs and can be torn down mid-flight), and values under 10 skip the count entirely. These are financial claims.

### Unmounted, not deleted

`components/sections/thesis.tsx` ("Why Avalanche") and the `thesis` object in `content/copy.ts` are **not rendered anywhere**. The section was taken off the homepage; both were kept because the text is genuine copy from avalanche-capital.com and nothing in this repo is committed yet, so deleting would be unrecoverable. Delete both if it isn't coming back.

### Booking is a placeholder

The scheduler at the foot of every page is **not a real embed yet**. `components/sections/booking.tsx` renders a panel with a "Book a meeting" button pointing at `site.booking` in `content/copy.ts` — currently the Fundraisr booking page, which is live and ours, so it works today.

**Swap that one string when the real calendar link arrives.** If the new scheduler is embeddable, replace the panel body and keep the plain link as a fallback.

Note that Fundraisr's booking page runs on **LeadConnector (GoHighLevel)**, not Calendly. `components/sections/calendly.tsx` is kept but no longer mounted, and it is the wrong shape for a LeadConnector embed — expect to rebuild rather than re-point. The Calendly event itself is still live (verified 200, "Capital Raise | Strategy Call"); the blank box that prompted this was a render problem, not a dead link.

### The FAQ

Homepage only, under Verticals. It is a native `<details>` accordion on purpose: keyboard-accessible, findable by the browser's in-page search, and correct before hydration, with no JS. The first item is `open` so it doesn't read as a wall of closed bars. Don't replace it with a state-driven accordion without a reason.

### Client logos appear once per page

There are **two different logo sets**, and mixing them up makes a false claim.

- `content/client-logos.ts` — Avalanche's own client roster. White-on-transparent (`scripts/logos-to-alpha.mjs`), so every one carries `logo-mark` and `globals.css` inverts them on a light band. Shown as the scrolling `LogoMarquee` in the hero on `/`, and as the static ruled `LogoGrid` under "Trusted by" on `/customers`. The grid runs brighter than the strip because a roster has to be readable standing still.
- `content/ecosystem-logos.ts` — venture firms active in the market, mirroring the strip fundraisr.ai runs at the foot of its customers hero. Full colour, so they pass `alphaMarks={false}` and must **never** get `logo-mark`; inverting them would blow them out to white. Fetched by `scripts/fetch-ecosystem-logos.mjs`.

**These firms are not clients.** Both strips run unlabelled by request, so nothing on the page says so in words — the footer's legal text is what carries it. `customers.ecosystemNote` is the caption the venture strip used to have and is kept unrendered for whenever it goes back. The client disclaimer (`customers.logoNote`) is still printed, under the client grid, and belongs only there.

`LogoBand`, the marquee wrapped in its own section, was deleted once `/customers` moved to the grid. Nothing rendered it any more.

Neither disclaimer appears on the homepage. That is fine — the footer's legal text carries a stronger equivalent on every page. Worth knowing before you move things around.

### The bracketed grid

Three sections share one frame — Track record, What we raise, Verticals — so it lives in `components/ui/bracket-grid.tsx` rather than in three copies. `BracketGrid` draws the border and corner brackets; `BracketCell` handles the hairlines, padding and index number. Cell content stays in each section.

`trailingSpans(total, cols)` widens a ragged final row so it fills the track — ten cells over four columns becomes 4+4+2-widened. The raise-types grid opts out and hardcodes 3+3 / 2+2+2, because an even split can't produce that shape. If you change a cell count, check the rows still sum to the full width.

Icons are inline SVG in `components/ui/icons.tsx` — fourteen 24px glyphs, not worth a dependency, and `currentColor` makes them follow the light/dark band flip automatically.

### The nav

Laid out like fundraisr.ai's: wordmark left, links **centred on the viewport**, CTA and Login right. The links are absolutely positioned rather than flexed into the middle, so they don't drift when the wordmark or buttons change width.

**The `Login` button does nothing on purpose.** There is no client area on this site yet. It is a `<button>` rather than a link — there is no destination, and pointing at `#` or a dead route would be a worse lie — and it carries `aria-disabled` so assistive tech reports it as unavailable while it keeps the muted look of a nav link. Replace `LoginPlaceholder` in `components/site/nav.tsx` with a `<Link>` when there's somewhere to send people.

## Design system

The site is a **layout clone of farahcap.com**. It was previously matched to fundraisr.ai — Satoshi, flat white type, no accent colour — and that system is gone. Comments or docs still claiming "no serif, no accent" predate the rebuild.

`app/globals.css` is the whole design system. There is no `tailwind.config`; Tailwind v4 is used CSS-first.

**Three faces, each with one job.** Cormorant Garamond on every heading, Cormorant *Infant* on figures only (a separate face, not a weight — its numerals are the ones the reference sets stats in), Inter on every UI run. All three via `next/font/google`. Garamond loads its italic because the H1 sets the first word of each line in italic, and a synthesised slant on the largest type on the site is very visible.

**Two small-uppercase runs, and they do different jobs.** `eyebrow` (14/600, `fg-muted`) labels a section *inside* a page and renders a dozen times on the homepage. `page-label` (14/500, inheriting `fg`, so full-strength ink) labels the *page itself*, above the 80px H1, and renders once per route — a heavier grey run under the largest heading on a route reads as a caption rather than as the page's name. `page-label` also carries the `/solutions` block labels and rail numbers. Neither folds into the other.

**`/solutions` and `/customers` share one page-header construction:** the same label run, the same `display display-80 text-[80px]` stepping down to 44px at 809px, the same 16/24 lede, the same 720px/680px measures, and the same `items-end` row that sets the CTA's bottom edge on the lede's last baseline with a trailing arrow. They were built separately and had drifted to a different value in *every* row — 64px vs 80px H1, a 600-weight grey label against a 500-weight ink one, a 15px lede against 16px, a 576px column against 720px — which is what made `/customers` read as a different site. Verified identical at 1440 / 900 / 800 / 390px. Change one, change the other.

Colour tokens are named by **role**, never by hue. A light section is `data-band="light"` on the `<section>` and that one attribute re-points every token for the subtree, which is why shared components take no `tone` prop — `bg-fg text-ground` is a white button on dark and a black button on light from the same markup.

The three dark grounds are deliberately the same `#151515`; the reference runs one dark value rather than a ramp.

Contrast is documented in `globals.css` with real ratios, and every text/background pair is verified rather than assumed.

**The accent is the brand blue, `#3056EE`.** It replaced the reference's gold on 4 Sep 2026 (via a brief obsidian palette). The token was renamed off the hue when the gold went — there is no `--color-gold` and no `text-gold`; `git log -S "--color-gold"` has the older values. That rename is why a third colour has since dropped in without a single component changing.

**The dark-band value is not `#3056EE`, and that is deliberate.** At full strength the brand blue measures 3.2:1 on `#151515` — under the 4.5:1 floor the `/solutions` diagram pills need — and 1.14:1 against the 50%-opacity `fg-muted` ghost dots those diagrams draw matched routes against. Two things at equal luminance separated only by hue is precisely what vanishes for a colour-blind reader, and that describes most of the media cards.

So a dark band gets a true *lightening* of the same colour — hue held at 227°, saturation at 100%, lightness 56% → 77%, giving `#8aa4ff`: 7.7:1 on `#151515`, a 2.4:1 step down from `fg` so it reads as its own colour rather than as white, and a 2.7:1 step up from a ghost dot. A light band swaps the specified value straight back in at 5.7:1 on white. **Darkening the dark-band value toward `#3056EE` is the tempting mistake** — it looks more on-brand in isolation and quietly breaks the diagrams.

### Where the accent appears — three places, and that is the whole list

The site is monochrome except for these:

| Where | Renders | Why it earns the colour |
|---|---|---|
| `/solutions` rail + both diagrams | once, on one page | **Functional.** The accent is the diagram's only means of saying which route matched. Remove it and the picture stops working. |
| Case-study metric pill | once per page | The single number on a card, and the thing a reader should land on. The `/customers` grid uses the tile treatment and carries no pill. |
| CTA band chip | once per page | The conversion point of every page. Decorative — the label beside it is white and carries the meaning. |

**This list was longer for one commit and was cut back deliberately.** On 4 Sep 2026 the accent went into every block: the `eyebrow` utility (which alone is twelve marks on the homepage — section eyebrows, who-we-serve ordinals, case-study categories, footer column heads), the `BracketGrid` corner brackets, the raise-types and verticals icons, the FAQ `+`, the `/customers` search and filter glyphs, the team monograms and the `/solutions` `LABEL` run. All of it came back off the same day. The rule that survives is **an accent marks the one thing worth acting on in a block, not every label in it** — and anything rendering five, eight or twelve times in a column is by definition not that.

Two layout changes made purely to host the colour were unwound with it: the eyebrow added to `TrackRecord`'s `rows` variant, and `customers.gridEyebrow`, a string that existed only because that band had no eyebrow to colour. A layout change made to host a colour has no reason to outlive the colour.

**The hero is exempt and stays monochrome** whatever happens above. It uses `eyebrow-pill` and `strip-label`, separate utilities precisely so an `eyebrow` rule cannot reach it: their contrast is measured against moving footage rather than a flat band. Don't fold them together.

Headings stay monochrome too. The `accent` prop on `SectionHeading` — a trailing substring of each title — is still accepted and ignored, and every heading on the site is flat.

One contrast note for anyone re-expanding this: `eyebrow` would be the only place the accent carries *small* type (14px/600), so it needs the full 4.5:1 rather than the 3:1 large-text floor. Both current band values clear it, but a future accent has to hold 4.5:1 on **both** grounds before that rule goes back on.

`--color-accent-light` / `--color-accent-deep` are the rail gradient's two stops, held constant across bands because a decorative graphic carries no text and shouldn't follow a text-contrast flip. Both are calibrated for the light `#eeeeee` track they live on and would be invisible on a dark ground. `--color-accent-deep` is the brand value exactly, so the rail terminates in it; it happens to coincide with the light-band `--color-accent` right now, which is a property of this palette and not a rule.

`.shell` is 1440px with a **fixed** 20px gutter and `.section-y` is a fixed 120px. Both used to be clamped, and both resolved much smaller, which is what made the page feel pinched on a large screen.

## The chrome

One element: an **absolute** 79.2px nav at `top:0` that scrolls away with the page — fully transparent, image-free wordmark, pill links, and a glass ghost button.

It was two. A **fixed** 37px announcement bar (opaque `#151515`, green live dot, italic text, underlined accent link) sat above the nav until 4 Sep 2026, and `--header-h` published the 116.2px sum. The bar is gone; `--header-bar-h` and `--header-nav-h` went with it, since one number with one consumer doesn't need three names, and **nothing on the site is `fixed` any more.** The copy is kept but unrendered as `announce` in `content/copy.ts`.

`--header-h` is still the contract: `main` reserves it and the hero cancels it with a negative margin, so the hero still starts at y:0 and still measures exactly `100dvh`. The spec called for dropping the reservation too; that is right for a one-page reference and wrong here, because on the three routes without a hero an absolute nav with no reserved space lands on top of the first heading.

Absolute rather than fixed is why `nav.tsx` has so little machinery. A *fixed* nav passes over every band on the page, so it had to measure the one beneath it on every scroll and resize and re-point its own tokens. An absolute nav only ever sits over the first section, and that never changes after first paint — so the whole thing collapses to one `:has()` rule in `globals.css`. No scroll listener, no tone state, no hydration gap.

## The hero

`components/sections/hero.tsx` is a **server component with no JS**: the poster sits on the wrapper as a background image and the video paints over it, so `prefers-reduced-motion` just hides the video and the still is already in place.

Height is an exact `h-dvh`, not a `min-h`. The composition depends on it — the content container is `calc(100% - 100px)`, reserving the logo band, and a min-height would let a long line push the band off the fold.

**`items-end` on the content row is the composition.** It puts the bottom edge of the CTA button and the bottom edge of the stat label on one baseline (measured: both at y=842 on a 1440x986 window). Change it to `center` or `start` and the hero stops matching the reference.

The headline breaks on **authored** lines with the first word of each in italic. That is content, not layout, so it lives in `hero.titleLines` rather than as a `<br>` in the component.

### Background stack

Three absolute layers: video, scrim, grain.

The scrim is **two stops, 0.44 → 0.60, in `#151515`** — not black. It replaced a five-stop per-clip gradient that opened at 0.93, derived from measured band luma, which crushed the footage and took the sky with it. What makes two stops safe is that every text run in the hero is pure white and the type is large; the muted tokens are calibrated for flat grounds, and on a photograph contrast has to be measured against the brightest column each run crosses.

**`public/grain.png` is load-bearing.** The scrim is one long gradient across the full viewport height, which is the textbook case for 8-bit banding; the grain dithers it, and is the reason the scrim can be this light without the footage looking digital. Regenerate with `scripts/make-grain.mjs`.

It is a 256px tile, not the reference's 720px. Grain must render at 1:1 — scaling it blurs it into mush — so tile size only affects the file, and per-pixel random alpha is close to incompressible: 720px lands at 387KB, 256px at 30KB, and on structureless noise the shorter repeat is invisible. Keep `backgroundSize` in `hero.tsx` in step with `SIZE` in the script.

### The video pipeline

```bash
node scripts/optimize-hero-video.mjs [path/to/source.mp4]
```

The current source is a 2560x1440 / 13.8Mbps master — a wide, backlit view of the full span of the Ponte 25 de Abril. It is clean, so the script only downscales to 1600, debands, and encodes. Two things it does *not* do were both needed by earlier sources and would be wrong here:

- **No restoration.** An earlier clip existed only as a 608x320 preview and needed `hqdn3d` → `lanczos` → `unsharp` → `gradfun` to clean, enlarge and re-crisp it before `object-cover` magnified the artifacts. Denoising a 13.8Mbps master destroys real detail to fix artifacts that aren't there.
- **No debar.** Another master shipped letterboxed — a 2020-tall picture inside a 2160-tall container. Run `cropdetect` on any new source rather than assuming.

Both are in the git history if a future source needs them.

`gradfun` is not optional: most of the frame is one enormous smooth sky gradient running out of a blown highlight.

**The rates look high (crf 31 / VP9 46) and are deliberate.** The sun's specular path on the water is fine glitter that changes completely every frame, and it alone drives the bitrate — at crf 27 this clip is 4.16MB. VP9 does especially badly here: crf 40 is 3.54MB against the mp4's 2.18MB, and 46 is where it finally wins. Since VP9 is offered *first* in the markup it has to actually be the smaller file, so **compare the two printed sizes after any change** — there is no portable crf, and across this hero's sources it has ranged from 32 to 46.

The whole 15s ships: mean luma is flat at 118.0–118.6 end to end with no cut, so the loop wraps invisibly. An earlier source had to be trimmed at 9.3s because it hard-cut into a blown plate and strobed on every wrap — measure a new source with `signalstats` rather than assuming.

## The closing band

`components/site/cta-band.tsx` — "Start with a consultation", directly above the footer and the anchor target for every CTA on the site.

Full-bleed and image-backed. The background is the **hero poster, not a second video**: this block sits at the bottom of a long page, so an autoplaying video there would decode continuously for something most readers never reach, and the still already exists and is already cached from the hero's own poster.

It carries the same three-layer stack as the hero — image, scrim, grain — for the same reason: one long gradient over a wide box bands without grain to dither it. The scrim is **left-weighted** rather than vertical, because unlike the hero the type sits in a single left column and the right half of the frame can stay open. Verified by compositing the real poster against the real gradient: white clears AA on the worst column at 10.9:1 or better.

`components/sections/booking.tsx` is no longer mounted — the reference's layout is single-column with one button, so the band's button goes straight to `site.booking`.

## Logos

`public/logos/` holds 70 client and case-study marks. They arrived as flattened rasters with **inconsistent** baked-in backgrounds — some white, some black, none with alpha.

`scripts/logos-to-alpha.mjs` normalises them: it reads the median border luminance to decide whether the background is light or dark, flips the image if needed so the mark is always the light part, then uses luminance *as* the alpha channel over solid white. The result is a white silhouette on transparency that sits correctly on any ground. A black-point floor kills the faint rectangular halos that near-black (rather than pure-black) backgrounds would otherwise leave.

It's idempotent — anything that already has an alpha channel is skipped. Re-run it after adding logos:

```bash
node scripts/logos-to-alpha.mjs
```

`scripts/optimize-logos.mjs` is the earlier one-off that extracted these from SVG-wrapped base64 (9.5MB → 404KB). It has nothing left to do unless you add new `.svg` wrappers.

## The solutions timeline

`/solutions` is a measured clone of farahcap.com's /process. Everything below was checked
against the rendered DOM at 1440×894 and matches to the second decimal.

| | Spec | Built |
|---|---|---|
| Header wrapper | 1440 × 404.81 | 1440 × 404.80 |
| Blocks container, 3 rows¹ | 1440 × 1998.25 | 1440 × 1998.25 |
| Row pitch | 632.75 | 632.75 |
| Row / media / rail / track | 612.75 / 644×612.75 / 40 / 3×552.75 | identical |
| Text column | 644 × 218.81 | 644 × 218.80 |
| Text top offset in row | 196.97 | 196.97 |

¹ Measured while the page still had three rows, which is what the spec
specifies. It now ships **two** blocks, so the container is 1365.50
(20 + 612.75 + 20 + 612.75 + 100). Every per-row figure above is unchanged —
that is the point of the card sizing the row.

**The card sizes the row, and that is the whole layout.** The media card is
`flex:1 0 0` with `aspect-ratio: 1.05098/1`, so it resolves to 644 × 612.75 and
the row inherits its height; `align-items: center` then centres the text against
it. Copy length therefore cannot move anything — block 02 runs a line longer
than block 01 and the rhythm is unchanged.

**The rail's progress fill must be absolutely positioned.** In flow it is 580px
of content inside a `flex: 1 1 0%` track, and a flex-grow item still contributes
its content height to the column's intrinsic size — so the rail measured
40 + 20 + 580 = 640px, became the tallest item in the row, and drove the row
height instead of the card, putting the whole page 27px per row out. `min-height: 0`
does **not** fix this; only taking the fill out of flow does. The fill is
deliberately taller than the track that clips it, so a full sweep is one
`translateY(-100%)` and nothing animates height.

The spine breaks for 20px between rows because each rail is exactly as tall as
its own row and the container's gap sits between them. That is correct.

Below 1200px the rail is **deleted**, not stacked — the block order survives in
the document order.

### The reveal is CSS-only

No fourth client component. Each row publishes `view-timeline-name`, and the
rail fill and text column both read it, which is what keeps them in lockstep.

The whole block sits inside `@supports (animation-timeline: view())` **and** a
`prefers-reduced-motion: no-preference` query, and the un-animated base state is
the *finished* state — rail filled, text visible. Firefox, or anyone with reduced
motion on, gets a complete static section rather than an empty rail and invisible
copy. The reduced-motion guard has to set `animation: none` explicitly: for a
scroll-driven animation `animation-duration` is ignored, so the global 0.01ms
override never reaches it.

The two zero points are pinned to `entry 0%` and `exit 100%` — exactly the
instants the row is wholly off-screen. Fully transparent text is therefore never
text the reader could otherwise be reading. Pulling either inwards buys a
punchier fade at the cost of that guarantee, and dims row 1 at first paint: it is
already 75% on screen before a pixel is scrolled.

## Client-side code

There are only three client components — `nav`, `track-record`, `case-study-grid` — and one rule about them: **external state is read with `useSyncExternalStore`, not mirrored into an effect.** Scroll offset (`nav`) and `prefers-reduced-motion` (`track-record`) both work that way, with a `false` server snapshot that matches the pre-hydration markup. The nav closes its mobile sheet on route change by adjusting state during render, not in an effect.

That isn't stylistic — `npm run lint` enforces it via `react-hooks/set-state-in-effect`, and lint is clean. Keep it that way.

`track-record.tsx` shows financial figures counting up. It must never be left mid-count: the animation snaps to the true value on cleanup (rAF is throttled in background tabs and can be torn down mid-flight), and values under 10 skip the count entirely.

## Performance

Measured on a production build served locally — no network throttling, so these are **not** Lighthouse-equivalent:

| Route | TTFB | FCP | LCP | CLS | Transfer |
|---|---|---|---|---|---|
| `/` | 39ms | 176ms | **176ms** | **0** | 628KB |
| `/process` | 6ms | 32ms | 32ms | **0** | 42KB |
| `/customers` | 4ms | 36ms | 36ms | **0** | 67KB |
| `/team` | 3ms | 64ms | 64ms | **0** | 42KB |

The LCP element on `/` is the hero wrapper painting the **20KB poster**, not the video — which is why a background video didn't move LCP. Of the homepage's 628KB, 565KB is video streaming in behind the poster and 42KB is the font.

**Lighthouse has not been re-run since the re-skin.** The first build scored 100/100/100/100 desktop; do a fresh audit before launch rather than assuming that still holds.

## Open items before this goes live

Full detail and rationale in **`docs/COPY-REVIEW.md`**. Short version:

1. **Approve or replace the drafted copy.** Three offering panels, two investor verticals, process step 03, seven FAQ answers, five team bios. Every one is marked `// DRAFT` at its source. They were written here because the originals are genuinely unreachable — the Framer carousel on `avalanche-capital.com` renders no body text to the page at all (verified against raw HTML, not just by clicking).
2. **The team bios describe the role, not the person** — deliberately. Names and titles are the only public facts; inventing career histories for five named individuals isn't a placeholder a reviewer can safely skim. Get two sentences from each of them.
3. **Verify the track-record figures** — `$2B+`, `$300M+`, `200`, `$600M+`. All four come from pages dated 2024 and are the most load-bearing claims on the site.
4. **Footer legal text** — currently adapted from the short notice on fundraisr.ai. Should come from counsel.
5. **Confirm the Calendly event.** Both original links on the live sites are dead ("This Calendly URL is not valid"). The site points at `capital-raise-demo-call-ac-clone` — the only live event on the `avalancheintrocall` account, but the slug reads like a duplicate.
6. **Team headshots.** Monograms stand in.
7. **Case-study categories.** The Funds / Startups / Placement-agency split was assigned by us, not taken from source. It drives the `/customers` filter.

### Also found on the live sites

`https://fundraisr.ai` has no certificate on the apex domain — it fails to connect entirely. Only `https://www.fundraisr.ai` resolves.
# Avalanche
