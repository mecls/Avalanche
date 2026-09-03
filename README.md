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

4 pages. There is no "get in touch" page — booking is the Calendly band (`components/site/cta-band.tsx`) at the foot of every page, and `#get-in-touch` is the anchor every CTA points to. The buttons are labelled **Book a call**.

```
/            Hero (video, full-screen, client strip) · Track record · Who we serve ·
             What we raise · Neurable case study + testimonial · Verticals · FAQ · Calendar
/process     Three-phase process · Offerings
/customers   Filterable grid of all 13 case studies
/team        Five partners · Press
```

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

The marquee is in the hero on `/`, and as the "Trusted by" band on `/customers` — never both on the same page. `LogoBand` (the section) and `LogoMarquee` (the strip) are separate for exactly this reason: the hero needs the strip without the section's padding, heading and note.

The `logoNote` disclaimer only renders inside `LogoBand`, so it is not on the homepage. That is fine — the footer's legal text carries a stronger equivalent on every page. Worth knowing before you move things around.

### The bracketed grid

Three sections share one frame — Track record, What we raise, Verticals — so it lives in `components/ui/bracket-grid.tsx` rather than in three copies. `BracketGrid` draws the border and corner brackets; `BracketCell` handles the hairlines, padding and index number. Cell content stays in each section.

`trailingSpans(total, cols)` widens a ragged final row so it fills the track — ten cells over four columns becomes 4+4+2-widened. The raise-types grid opts out and hardcodes 3+3 / 2+2+2, because an even split can't produce that shape. If you change a cell count, check the rows still sum to the full width.

Icons are inline SVG in `components/ui/icons.tsx` — fourteen 24px glyphs, not worth a dependency, and `currentColor` makes them follow the light/dark band flip automatically.

### The nav

Laid out like fundraisr.ai's: wordmark left, links **centred on the viewport**, CTA and Login right. The links are absolutely positioned rather than flexed into the middle, so they don't drift when the wordmark or buttons change width.

**The `Login` button does nothing on purpose.** There is no client area on this site yet. It is a `<button>` rather than a link — there is no destination, and pointing at `#` or a dead route would be a worse lie — and it carries `aria-disabled` so assistive tech reports it as unavailable while it keeps the muted look of a nav link. Replace `LoginPlaceholder` in `components/site/nav.tsx` with a `<Link>` when there's somewhere to send people.

## Design system

`app/globals.css` is the whole thing — there is no `tailwind.config`. Tokens are named by **role**, not by hue:

| Token | Dark (default) | Light band |
|---|---|---|
| `ground` / `ground-deep` / `ground-alt` | `#080808` / `#050508` / `#0f0e0d` | `#fafaf9` / `#f2f2f0` / `#f2f2f0` |
| `card` | `#0e0e13` | `#ffffff` |
| `fg` / `fg-muted` / `fg-faint` | `#ffffff` / `#a3a3ae` / `#8b8b96` | `#252525` / `#5b5b63` / `#686870` |
| `line` / `line-soft` | white 13% / 9% | black 12% / 7% |

**Light sections**: put `data-band="light"` on a `<section>`. That's the whole API. The rule re-points every token for the subtree, so shared components (buttons, headings, cards) invert without knowing anything about it — `bg-fg text-ground` is a white button on dark and a black button on light, from the same markup. `data-band="dark"` goes back the other way for a nested dark island.

Contrast is documented in `globals.css` with real ratios. Every text/background pair on all four routes passes WCAG AA — verified, not assumed. A previous palette shipped its faint token at 2.9:1 while it carried every eyebrow and all the footer legal text, so this gets measured.

Type is **Satoshi** (fundraisr's face), self-hosted from `app/fonts/` — 42KB, roman only. It isn't on Google Fonts. The italic face was dropped because nothing on the site is set in italic.

## The hero video

Full-bleed background behind the headline. `components/sections/hero.tsx` is a **server component with no JS**: the poster sits on the wrapper as a background image and the video paints over it, so `prefers-reduced-motion` just hides the video (`globals.css`) and the still is already in place.

`scripts/optimize-hero-video.mjs` rebuilds the assets from the master:

```bash
node scripts/optimize-hero-video.mjs [path/to/source.mp4]
```

It trims, strips audio and the stray timecode stream, and emits `hero.mp4` (720p h264), `hero.webm` (VP9) and `hero-poster.webp` — about 1.5MB for the set, down from a 17.8MB master.

**The trim is not arbitrary.** The master runs 15.4s but hard-cuts at 9.59s into a bright, blown-out window shot — measured with `signalstats`, mean luma jumps 60 → 152 and stays there. On a black page that reads as a strobe every time the loop wraps. The encode stops at 9.3s. If you swap the source video, re-check its luma profile before assuming the same cut point.

## Logos

`public/logos/` holds 70 client and case-study marks. They arrived as flattened rasters with **inconsistent** baked-in backgrounds — some white, some black, none with alpha.

`scripts/logos-to-alpha.mjs` normalises them: it reads the median border luminance to decide whether the background is light or dark, flips the image if needed so the mark is always the light part, then uses luminance *as* the alpha channel over solid white. The result is a white silhouette on transparency that sits correctly on any ground. A black-point floor kills the faint rectangular halos that near-black (rather than pure-black) backgrounds would otherwise leave.

It's idempotent — anything that already has an alpha channel is skipped. Re-run it after adding logos:

```bash
node scripts/logos-to-alpha.mjs
```

`scripts/optimize-logos.mjs` is the earlier one-off that extracted these from SVG-wrapped base64 (9.5MB → 404KB). It has nothing left to do unless you add new `.svg` wrappers.

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
