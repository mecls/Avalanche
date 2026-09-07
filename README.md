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

6 routes. **`/get-in-touch` is now a real page** and every CTA on the site points at it. It used to be an anchor: `#get-in-touch` was the id on the closing band (`components/site/cta-band.tsx`), CTAs scrolled to it, and the band's button went to an external scheduler. The band still sits at the foot of **every** page — it is the ending, not the mechanism — and keeps its id so an old `/#get-in-touch` link still lands somewhere. It shipped off `/get-in-touch`, on the reasoning that its button would point at the page you are already on; that was overruled on 6 Sep 2026, because the ending is furniture and the site should not have one page that stops differently. The band takes a `ctaHref` prop now, defaulting to `/get-in-touch`, and that page passes `#questionnaire` so the button scrolls back up to the form instead of reloading the route.

```
/                        Hero (video, full-screen, client strip) · Track record ·
                         Who we serve · What we raise · Neurable case study +
                         testimonial · Verticals · FAQ · Calendar
/solutions/fundraising   Page heading · five numbered blocks on a rail
/solutions/secondaries   Same layout, Secondaries content (COPY PENDING)
/customers               Filterable grid of all 13 case studies
/about                   Why Avalanche · the divergence · five beliefs ·
                         the three access layers · five partners · press
/get-in-touch            Nine-step qualification form · FAQ · CTA band
```

### /solutions is two views

It was one page carrying a Secondaries block and a Fundraising block. Since 4 September 2026 it is **two routes**, each an independent copy of the same layout.

**The nav dropdown is the only switcher.** A segmented toggle sat at the head of the page for part of the same day and was removed as redundant — the two-entry dropdown under "Solutions" already lists both, from every page rather than only from these two. `git show 58684ea` has the toggle if it is ever wanted back.

**Routes, not a client-side tab.** `/solutions` is the one page on the site with no client components — its rail and text reveal are CSS `view-timeline` — and a stateful tab would have made the whole page a client component and restarted those animations on every switch. Routes also keep both views deep-linkable, which the dropdown depends on.

**Content lives in `content/solutions.ts`**, one object per view, and `SolutionsSteps` takes the view as a prop. Adding a third view is a content object plus a five-line route.

**Two separate gaps, tracked in two places, and they do not mean the same thing:**

- A block's `pending` flag means its **copy** is placeholder. It renders a visible "awaiting approved copy" note on the page so it cannot ship unnoticed. All five Secondaries blocks carry it; no Fundraising block does.
- Whether a block gets a **diagram** is decided only by the `MEDIA` map in `components/sections/solutions-steps.tsx`, keyed on block `id`. Anything without an entry renders `PendingPlate`.

**Fundraising has now closed both gaps** — five blocks, five diagrams, all real copy. Four more schematics were drawn on 4 September to finish it: a pre-marketing convergence, an outreach sequence that branches on an engagement signal, a four-stage pipeline funnel, and a meeting brief. Secondaries still has four blocks awaiting each.

That map is keyed on id rather than position on purpose. It was a positional array when there was one view with two blocks; with two views of five, position means nothing — block 02 is investor sourcing on one and pricing on the other. Each diagram makes a **specific** claim (which route matched, which segment was selected, which branch was taken), so none is reused to fill a card it does not describe. An honest blank beats a plausible-looking wrong picture.

**The ghost value measures 2.8:1 against the plate, under the 3:1 floor for a meaningful graphic, and it stays.** `fg-muted` at 50% is 2.82:1 on `#151515` and 2.75:1 on the `#202020` card centre, against 7.7:1 for the accent. Raising it collapses the other end: at 70% the ghost is 3.9:1 against the ground but only 1.8:1 against the accent, which is precisely the equal-luminance-separated-only-by-hue failure the accent section is written about. The frame is `aria-hidden` and the copy beside every diagram states its claim in words, so the pictures are formally decorative. **If this ever changes it changes for all eight diagrams at once, not for one.** The divergence diagram's falling line, which carries more weight than a ghost dot does, buys back the margin with a dash pattern and an opposite direction — two channels that survive a luminance failure.

**Every count in a diagram pill is derived from the array drawn beside it**, in the same render — "8 matched", "2 committed", "3 of 4 aligned". None is typed twice, so a caption cannot drift from its own picture. Keep that property when editing; it is the only thing stopping a diagram from lying.

**The diagram scaffolding is shared.** `components/ui/diagram.tsx` holds `Frame`, `Caption` and `Plate`. They were private to `solutions-media.tsx` and `solutions-steps.tsx` until the manifesto drew two of its own; each carries an invariant that only works if it is literally shared rather than copied — `Frame` fixes the viewBox and the 560px cap, `Caption` fixes the corner run at one rung, and `Plate` carries the `data-band="dark"` that makes art written against `fg` come out light-on-dark inside a white section. The authoring rules stay in `solutions-media.tsx`'s header.

**Diagram type is sized in rungs, and that is not decoration.** A `<text>` inside a viewBox is scaled by (rendered width / 620), so one source size renders at a different physical size on every viewport. Before this was fixed, a 12-unit run shipped anywhere between **5.8px and 12.6px** depending on width — overshooting on tablet and collapsing to texture on a phone. The fix has two halves and needs both:

1. `Frame` is one rule, `w-[94%] max-w-[560px]`, replacing three per-breakpoint percentages that were derived from card widths no longer true. The cap is what stops the scale *rising*: a full-width tablet card is 960px, and the old 68% of that rendered the diagram larger than its design size. From 600px to 1600px the scale now sits between 0.795 and 0.903.
2. Below 600px the card is physically smaller than the cap, so no width rule helps. The `dgm-xs` … `dgm-xl` rungs in `globals.css` raise the user-unit sizes at 599px and again at 479px, in two steps because a single 1.6× bump over-corrected the middle band.

Result: every run except one now lands between **9.2px and 17.2px** at every width from 360 to 1600. Eight ad-hoc sizes were collapsed into five rungs on the way through — take a rung rather than adding a `text-[Npx]` literal, or this drifts straight back.

**There is no capped rung, and there should never be one.** There was briefly a sixth, `dgm-axis`, holding the stage × sector grid's labels at 16 units so its six bottom labels would not collide on an 80-unit pitch — it rendered ~8.5px on a phone against ~10px everywhere else. The grid was **transposed** instead: sectors moved to the vertical axis, where word length costs nothing because labels only have to clear each other by line height, and the shorter stage names took the horizontal axis on a 110-unit pitch. Every run on every diagram now takes a full rung. If a dense axis ever fights the type again, re-pitch the axis; do not reintroduce a capped rung.

Growing the type also broke three layouts that had been tuned around the old sizes, all now fixed: the legend's second entry ran under the first in **all six** diagrams (both columns are now fixed at x=5 and x=320), the pipeline pill overflowed the frame, and the meeting card's label/value rows collided.

**`/solutions` and `/process` both redirect to `/solutions/fundraising`**, with a **307 and not a 308**. `/process` has now moved three times; an earlier 308 to `/solutions#fundraising` is still cached in any browser that followed it, and a 308 cannot be withdrawn — no response header un-caches one already issued. 307 keeps every one of these moves revisable. Both go straight to the destination rather than chaining through `/solutions`. Purge the CDN on the next deploy either way.

The old `#secondaries` and `#fundraising` fragments survive as block ids, so a deep link still lands on a real block — on whichever of the two views now owns it.

### /about is two pages merged

`/team` and `/manifesto` became one route on **7 September 2026**, by request:
"not only the team page, but also include the manifesto in between." Both old
paths 307 to it — `/team` to the top, `/manifesto` to `#manifesto`, the id on
the divergence section, so an existing link still lands on the content it asked
for rather than at the top of a page twice as long.

**The order is the argument.** What the firm does (the thesis) → the market
that makes it necessary (the divergence) → what follows from that (five
beliefs) → where the gap actually sits (three layers) → who does the work
(team) → who has said so (press). The manifesto is in the *middle* on purpose:
a reader who came for the team scrolls through the argument to reach them.

**Bands alternate every section, all the way down** — light header, dark
thesis, light divergence, dark beliefs, light layers, dark team, light press,
photo-backed close. Two things follow. No section carries a `border-t`:
`/manifesto` needed one because two of its light sections were adjacent, and
with the thesis between them they no longer are. And the team grid looks
exactly as it did on `/team` — `data-band="dark"` paints the same `#151515`
that section used to inherit from `<body>` by not being in a band at all.

**The page now opens light, and `/team` did not.** The header section has to
stay `data-band="light"` *and* the first child of `main`, because two rules in
`globals.css` key off `main > :first-child[data-band="light"]`: one flips the
nav's type to ink, the other paints `main` with `--color-paper`. They break
together and the failure mode is the whole nav rendering white on white. This
is new exposure on a page that never had it.

**"Why Avalanche" is mounted again after a week off**, and it took the team
section's heading with it. While the thesis was unmounted, `/team` borrowed its
"Both Sides of The Table" pillar — title *and* body — as its own heading and
lede. Mounting the pillar put both on one page, so the borrowed version came
off and the team section took a heading of its own (`about.team`). It has no
lede: any sentence there would be one this repo invented about five named
people, and the same restraint applies as to the bios. If the thesis is ever
unmounted again, that is the block to check.

**The Manifesto footer link is gone, and so is the mechanism behind it.** The
route was `footerOnly` — real and indexed but not one of the header's primary
slots, listed in the footer's Overview column and nowhere else — and
`nav.tsx` derived a filtered `headerNav` from the one `nav` array to do it.
Folding the route into `/about` took the flag's only user with it, so the flag
and the filter went too rather than sitting there as a mechanism with nothing
behind it. It was six lines; `git show` this commit if a footer-only route is
ever wanted again.

**"About Us" is the widest header label the nav has carried** and it holds.
Measured at 360/390/430/600/767/768/809/810/900/1024/1200/1440: no horizontal
overflow at any of them, and the `md` breakpoint did not need to move. The nav
has since taken a `Log in` link and a smaller logo, so the current clearances
are in "The nav" rather than here.

### The manifesto itself

Added 5 September 2026 as its own route. Condensed from a much longer thesis
document — five tenets, four data charts, a competitor 2x2, an eight-row
requirement matrix and a protocol architecture. Four sections survived: the
claim, the picture that shows it, the five positions that follow, and where the
gap actually sits. Three of them are what now sits in the middle of `/about`;
the fourth is the page header it kept.

Most of what was cut was cut for a reason worth knowing. The competitor matrix
and the protocol architecture are `/solutions` material, and `/solutions`
already has five blocks and six diagrams. The name "the Capital Formation
Protocol" was dropped because it appears nowhere else on the site or in
`content/`, so shipping it would have been inventing a proprietary brand asset
rather than describing one.

**There are no figures anywhere in it, and that is the design.** The source
carried roughly twenty cited statistics — listed-company counts, family
offices, median age at IPO, mega-fund share of committed capital. Not one could
be verified, and the track-record figures are already the most load-bearing
claims on the site; adding twenty more unverified ones to state a set of
*opinions* would be spending credibility to say something that does not need a
number to be true. Every directional claim is stated without a figure attached
and both diagrams are shape-only. The full reasoning is in the header of
`content/manifesto.ts`.

The five beliefs reuse `WhoWeServe`'s ruled `<dl>` verbatim — accent ordinal and
statement left, argument right. The two media rows are the `/solutions` row with
the rail taken out. Nothing here needed new CSS.

**The beliefs section is `data-band="dark"` and that is load-bearing.** A
section that does not paint *itself* sits on the white `main` while still
inheriting the root's dark text tokens, i.e. white type on a white ground. This
was the first thing that broke when the page was built. `/customers` hits the
same trap and answers it with `bg-ground-deep`; every dark section on `/about`
says `data-band="dark"` because it means the band, not just the colour.

**The H1 breaks on authored lines**, like the hero's. It is now
`about.titleLines` and still holds `["Capital is not scarce.", "Access is."]` —
kept as the About page's opening rather than swapped for an introduction,
because the safe version ("We are a private capital advisory") says nothing.
The break has to be authored: the full line wraps either way inside the
header's 720px measure, and left to itself it breaks as "…scarce. Access /
is.", which strands the second sentence's verb.

### /get-in-touch

Added 5 September 2026. Left column is the heading and lede; right column is a
nine-step qualification form; the homepage FAQ and then the closing band end
the page, the same two blocks in the same order as everywhere else. **The nine
questions and their options were supplied**, and the order is exactly as given.
Three things were changed: a typo, sentence case on the option labels, and en
dashes in the ranges — all three listed in `docs/COPY-REVIEW.md`. The count in
"Question n of 9" is read from the array rather than typed, so the label cannot
drift from the number of steps.

**IT DOES NOT SUBMIT ANYWHERE YET.** `send()` in
`components/sections/contact-form.tsx` validates, logs and shows the success
panel, and that is the whole of it — no route handler, no email service, no
third-party endpoint. That was a deliberate decision: the flow can be seen and
approved before a destination is chosen. Whatever is wired in must **not** put
the answers in a URL; they include a name and an email address.

**The fourth client component, and the first whose state is its own.** The
other three read EXTERNAL state — scroll offset, reduced motion, a route change
— which is why the rule for them is `useSyncExternalStore` rather than
`useState` + `useEffect`. Nothing in the form is external, so plain `useState`
is correct and `react-hooks/set-state-in-effect` is not in play. Its single
effect moves focus and sets no state.

One question per screen. Choosing an option advances — **except on the ninth**,
where it only selects, because submitting the instant someone touches the last
option gives them no moment to change their mind. Focus moves with the step:
into the input on a text step, onto the `aria-live` count on a choice step, so
a keyboard user is never dropped at the top of the document when the button
they just pressed unmounts. `autoFocus` cannot do that job here — it is applied
during commit and the focus effect would immediately override it.

**The card centres its content rather than pinning the button to the foot.** A
`mt-auto` against the min-height holds the button at a constant height, which
sounds better and looks worse: a one-field step then leaves it marooned under a
third of a card of nothing. Centring spends the same slack as symmetric
padding.

**The section tint is on an inner wrapper, not on the `<section>`.**
`[data-band="light"]` sets `background-color` as a plain unlayered rule in
globals.css, so it outranks a `bg-*` utility on the same element — a
`data-band="light"` section classed `bg-ground-deep` stays white. The wrapper
is not the band, so the utility applies there. The card is `bg-card` on
`ground-deep`, which is the `/customers` tile idiom inverted for a light band:
#ffffff on #f3f3f3, so the card reads as raised.

**It is image-backed, so the section is DARK and carries no `data-band`.** It
opened `data-band="light"` on a flat tint until 6 Sep 2026, which made the nav
flip to ink and painted `main` white; both are driven by the same `:has()`
rule, so removing the attribute is the whole fix. `-mt-[var(--header-h)]` pulls
the section under the transparent nav for a full-bleed frame, exactly as the
hero does, and the header height is added back to the content's top padding.
The stack is the hero's minus the `<video>`: image (0), scrim (1), grain (2),
content (10).

It carried a real background video for part of that day. It is a still now, by
request — `scripts/optimize-bg-video.mjs` keeps the measurements that video
needed, because the source cannot loop on a straight cut.

**`min-h-dvh`, not the hero's exact `h-dvh`, and the difference is the point.**
The hero's composition depends on an exact height: its content box is
`calc(100% - 100px)` reserving the logo band, so a min-height would push that
band off the fold. This section reserves nothing and its card *grows* — the
six-option question is taller than the one-field one, and on a short laptop
that can exceed the viewport, where an exact height would clip it.
`justify-center` then centres the content, and the padding is asymmetric
(header height plus 100 above, 100 below) so it reads centred **below** the
chrome rather than behind it.

**The form card is a `data-band="light"` island**, the same nesting the
/solutions media plates use in reverse. Verified white on all nine questions
and on the success panel — `rgb(255,255,255)` with ink type, driven entirely by
that one attribute.

**The page label is white, not `text-accent`**, unlike the other three page
headers. That follows the hero's rule rather than breaking the page-label one:
contrast over a photographic ground has to be measured against the brightest
column each run crosses, and the accent is the one place the palette puts small
type in colour. The other three sit on flat bands and keep it.

**TWO SCRIMS, SWITCHED AT THE SAME BREAKPOINT AS THE LAYOUT.** From `lg` up the
type is in the left column and the right half carries an opaque card, so the
gradient is left-weighted and lets the image come up on the right. Below `lg`
the layout stacks and the type spans the full width, so its right end lands in
the light end of that same gradient — measured at **4.23:1 on a 390px phone and
2.93:1 on a 768px tablet** against a 4.5 floor. The stacked layout therefore
gets a vertical scrim (0.82 → 0.70) instead.

The horizontal stops hold the dark to 72% rather than 66%, and that is about
the still rather than the video: the last frame puts open sky exactly where the
text sits. **The tightest case is a 1024px laptop** — the two-column grid is
live but each column is only 460px, so the run reaches 47% of the width, right
where the old gradient was already lightening. It measured 4.84:1 there:
passing, but too thin to leave.

Contrast was measured the way the hero's was — compositing the real image
against the real gradient with the foreground hidden, taking the **brightest 2%
of pixels each run crosses**. Worst run at each width, against a 4.5 floor:

| 390 | 768 | 1024 | 1180 | 1440 | 1700 | 2328 |
|---|---|---|---|---|---|---|
| 5.47 | 5.55 | 5.64 | 5.67 | 6.20 | 7.65 | 7.42 |

Re-measure if the image, either gradient, or the breakpoint changes.

`CtaSubmit` was added to `components/ui/button.tsx` for the Next/Send button.
It shares `ctaClass()` with `CtaButton` so the two cannot drift. A `Link` with
`href="#"` and a click handler would have been the lazy option and breaks
middle-click, breaks Enter-to-submit, and puts a bogus destination in the DOM.


### There is no /login route, and there was one for a commit

Worth recording because the reasoning is easy to re-derive badly.

The nav's `Log in` was added on 7 Sep 2026 with a real destination: a `/login`
page shell — client-portal heading, email and password fields, a submit button,
all of it `disabled`, with a visible notice saying the portal was not open. The
point was to get the layout approved before an auth provider was chosen, the
same order the `/get-in-touch` questionnaire was built in.

**It was removed the same day, by request** — there is no portal and no link to
one yet, so the control should not go anywhere at all. That leaves the route
orphaned: nothing linked to it, and its own stated reason for existing was that
the nav needed somewhere to point. A `noindex` URL with a fake login form on it,
reachable only by accident, is worse than no URL.

`git show f5117a6` has the page, `content/login.ts`, and the security notes that
came with it — chiefly that the form deliberately had no `action` and no
`method`, because that combination submits as a **GET** and would put a typed
password in the address bar. **If a portal ever arrives, read those before
rebuilding it**, and point the nav at the real destination rather than at a
local stand-in.

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

`components/sections/thesis.tsx` ("Why Avalanche") **came back on 7 Sep 2026** and now opens the body of `/about`. It had been unmounted since the homepage dropped it on 1 Sep, kept rather than deleted because the copy is genuine — one of the few blocks here lifted from avalanche-capital.com rather than drafted. Six days of being wrong about that is the argument for the rule: the unmounted blocks are `booking.tsx`, `calendly.tsx` and the `announce` object, and they are all still one merge away from being wanted.

### Booking is a placeholder

`site.booking` in `content/copy.ts` points at the Fundraisr booking page — live and ours, so it works today. Since `/get-in-touch` exists it is reached from **one place only**: the success panel at the end of the questionnaire, offered to anyone who has just filled the form and would rather book than wait. Nothing else on the site links to a scheduler.

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

Logo left, links **centred on the viewport**, `Log in` and the ghost CTA right. The centring is done with `flex-1` on both outer cells rather than absolute positioning, so the middle group stays put as the logo and the buttons change width.

**`Log in` is a nav pill, not a second button.** Added 7 Sep 2026. The header already has one button, and two equal-weight buttons leave neither reading as the primary action — so it takes the centre links' geometry and sits in the right cell. It hides below `md` and appears in the mobile sheet with the links, not beside the CTA.

**IT GOES NOWHERE, AND THAT IS THE POINT.** There is no client portal and no URL for one, so it is an `aria-disabled` `<button>` rather than an `<a>`. A link to `#`, or to a route built only to receive it, puts a destination in the DOM and in the status bar that does not exist — a worse lie than a control honestly marked unavailable. `aria-disabled` rather than `disabled` keeps it in the tab order; `text-fg-muted` and the absence of a hover state are the visible half of the same message, because an inert control must not look like a working one. **Swap it for a `<Link>` when there is somewhere to send people**, and take `cursor-default`, `aria-disabled` and the `title` with it; the geometry already matches the pills so the row will not move that day.

This nav has now reached that answer twice. The first Login was a `LoginPlaceholder` `<button>` with exactly the same reasoning, dropped in the farahcap rebuild (`47c4caf`) — and this section went on describing it for four days after it stopped existing. The second version briefly did have a destination: a `/login` page shell, disabled fields and all, built so the control had somewhere real to point. That lasted one commit. **Do not re-add a route to give this an href**; `git show f5117a6` has the page if a portal ever arrives.

**It fits, and the smaller logo is most of why.** Measured at 360 → 1440 with both changes in: no horizontal overflow at any width. At 768, the tightest width that still shows the desktop nav, there is 53px between the logo and the link group and 21px between the group and `Log in`, with the ghost CTA landing exactly on the 20px gutter. Dropping the logo from `h-8` to `h-7` bought back 23px of that — the link group had only 30px of clearance before either change. **A second right-cell item will not fit**; that is when the nav's breakpoint moves from `md:` to `lg:`.

`Log in` and `/get-in-touch` both sit **outside the `nav` array** in `content/copy.ts`. That array feeds the centre pills and the footer's Overview column, and neither of these belongs in either: they are chrome, not content routes. Their labels live in `site.navLogin` and `site.navCta` — and there is deliberately no `loginHref` beside the label, because an empty or placeholder href is exactly the thing that gets shipped by accident.

## Design system

The **layout** is a clone of farahcap.com. The **type** is fundraisr.ai's. The site has been through both systems and back: fundraisr's first (Satoshi, flat type, no accent), then the farahcap serif rebuild, and since 4 September 2026 farahcap's layout carrying fundraisr's face plus the brand accent. A comment or doc claiming "no serif, no accent" is half right by accident — the serif is gone again, the accent is real.

`app/globals.css` is the whole design system. There is no `tailwind.config`; Tailwind v4 is used CSS-first.

**One face, self-hosted.** Satoshi on every heading, figure, body run, button and nav item — no secondary display face, no serif anywhere. It is a Fontshare release and is not on Google Fonts, so it loads through `next/font/local` from `app/fonts/Satoshi-Variable.woff2`: one 42KB variable file, no third-party connection, nothing render-blocking. `weight: "300 900"` declares the file's real `wght` axis so 400/500/600 interpolate from it.

**Nothing is set in italic, and nothing may be.** This build carries no `ital` or `slnt` axis and reports `italicAngle: 0`, so any `italic` class is a browser-synthesised slant. The hero H1's lead words and the closing note both dropped theirs when the face landed. An italic means shipping `Satoshi-VariableItalic.woff2` (~43KB) alongside the roman.

**The display sizes came down with the face.** Satoshi's x-height is 0.500em against Cormorant's 0.386em (+30%) and its cap height 0.740 against 0.625 (+18%), so the same number renders a visibly bigger heading; 80→72 and 58→52 hold the optical size the pages had. The `display` utility moved with them — weight 400→500, tracking -0.04em→-0.025em, leading solid→1.05 — because a grotesque at Regular reads as body copy set large and -0.04em is a serif-display tracking that closes a grotesque's letterfit up.

**Two small-uppercase runs, and they do different jobs.** `eyebrow` (14/600, **accent**) labels a section *inside* a page and renders a dozen times on the homepage. `page-label` (14/500, no colour of its own) labels the *page itself*, above the 72px H1 — a heavier run under the largest heading on a route reads as a caption rather than as the page's name. The page-name use takes `text-accent` at the call site so it matches the eyebrows; the `/solutions` block labels and rail numbers share the utility and deliberately stay ink, because they sit against the accent rail and both diagrams. Neither utility folds into the other, and the colour stays out of `page-label` itself.

**`/solutions`, `/customers` and `/about` share one page header, and it is now a component.** `components/site/page-header.tsx`: the same label run, the same `display display-72 text-[72px]` stepping down to 40px at 809px, the same 16/24 lede, the same 720px/680px measures, and the same `items-end` row that sets the CTA's bottom edge on the lede's last baseline with a trailing arrow.

It was duplicated JSX in two places. They had been built separately and had drifted to a different value in *every* row — 64px vs 80px H1, a 600-weight grey label against a 500-weight ink one, a 15px lede against 16px, a 576px column against 720px — which is what made `/customers` read as a different site. They were hand-aligned on 4 Sep 2026 and both carried a "keep them in step" comment. The manifesto page would have made a third copy, so the copies were collapsed instead. **Verified byte-identical**: the rendered `<main>` of all three pages was diffed before and after the extraction and did not change by a character.

It renders only the inner `shell` div — the `<section>` stays with the caller, because `/customers` adds `flex flex-col overflow-hidden` for the logo strip it hangs below the header and `/solutions` does not. `title` is a `ReactNode` so `/about` can pass its own authored line breaks.

Colour tokens are named by **role**, never by hue. A light section is `data-band="light"` on the `<section>` and that one attribute re-points every token for the subtree, which is why shared components take no `tone` prop — `bg-fg text-ground` is a white button on dark and a black button on light from the same markup.

The three dark grounds are deliberately the same `#151515`; the reference runs one dark value rather than a ramp.

Contrast is documented in `globals.css` with real ratios, and every text/background pair is verified rather than assumed.

**The accent is the brand blue, `#3056EE`.** It replaced the reference's gold on 4 Sep 2026 (via a brief obsidian palette). The token was renamed off the hue when the gold went — there is no `--color-gold` and no `text-gold`; `git log -S "--color-gold"` has the older values. That rename is why a third colour has since dropped in without a single component changing.

**The dark-band value is not `#3056EE`, and that is deliberate.** At full strength the brand blue measures 3.2:1 on `#151515` — under the 4.5:1 floor the `/solutions` diagram pills need — and 1.14:1 against the 50%-opacity `fg-muted` ghost dots those diagrams draw matched routes against. Two things at equal luminance separated only by hue is precisely what vanishes for a colour-blind reader, and that describes most of the media cards.

So a dark band gets a true *lightening* of the same colour — hue held at 227°, saturation at 100%, lightness 56% → 77%, giving `#8aa4ff`: 7.7:1 on `#151515`, a 2.4:1 step down from `fg` so it reads as its own colour rather than as white, and a 2.7:1 step up from a ghost dot. A light band swaps the specified value straight back in at 5.7:1 on white. **Darkening the dark-band value toward `#3056EE` is the tempting mistake** — it looks more on-brand in isolation and quietly breaks the diagrams.

### Where the accent appears — four places, and that is the whole list

The site is monochrome except for these:

| Where | Renders | Why it earns the colour |
|---|---|---|
| Section eyebrows + page labels | ~12 per page | A block's own name — "Verticals", "What we raise", "Who we serve". The colour is what makes a section announce itself before the heading does. The two page-name `page-label` runs take `text-accent` at the call site to match. |
| `/solutions` rail + all eight diagrams | six on `/solutions`, two on `/about` | **Functional.** The accent is the diagram's only means of saying which route matched, which region is the subject. Remove it and the pictures stop working. In the two manifesto diagrams it marks what is *not* being reached — the gap, and the outer layer — which is an inversion of the /solutions six and is called out in the file. |
| Case-study metric pill | once per page | The single number on a card, and the thing a reader should land on. The `/customers` grid uses the tile treatment and carries no pill. |
| CTA band chip | once per page | The conversion point of every page. Decorative — the label beside it is white and carries the meaning. |

**The eyebrow rule moved twice in one day, so read the history before moving it a third time.** On 4 Sep 2026 the accent first went into every block at once: `eyebrow`, the `BracketGrid` corner brackets, the raise-types and verticals icons, the FAQ `+`, the `/customers` search and filter glyphs, the team monograms and the `/solutions` block labels. That was judged too much and all of it came off. It was then asked for again, specifically for the eyebrows — and only the eyebrows went back. Everything else in that list is still monochrome and each site carries a comment saying why.

The distinction that survived: an accent marks **what a reader should act on or navigate by**, not every mark on a page. An eyebrow passes because it names the block. A corner bracket, an icon in a twelve-row grid and a placeholder monogram do not. **If the accent has to be pulled back again, pull those first and the eyebrow last.**

One layout change made purely to host the colour was unwound and has stayed unwound even though the colour returned: the eyebrow added to `TrackRecord`'s `rows` variant, and `customers.gridEyebrow`, a string that existed only because that band had no eyebrow to colour.

**The hero is exempt and stays monochrome** whatever happens above. It uses `eyebrow-pill` and `strip-label`, separate utilities precisely so an `eyebrow` rule cannot reach it: their contrast is measured against moving footage rather than a flat band. Don't fold them together.

Headings stay monochrome too. The `accent` prop on `SectionHeading` — a trailing substring of each title — is still accepted and ignored, and every heading on the site is flat.

**`eyebrow` is the only place the accent carries small type** (14px/600), so it needs the full 4.5:1 rather than the 3:1 large-text floor — and it lands on five different grounds. Measured: `#3056EE` is 5.69:1 on `#ffffff`, 5.45:1 on `#fafafa`, 5.13:1 on `#f3f3f3`; `#8aa4ff` is 7.68:1 on `#151515` and 6.85:1 on the `#202020` card. A future accent has to clear 4.5:1 on **all five** before it can go here — a much harder test than the diagram pills alone imposed.

`--color-accent-light` / `--color-accent-deep` are the rail gradient's two stops, held constant across bands because a decorative graphic carries no text and shouldn't follow a text-contrast flip. Both are calibrated for the light `#eeeeee` track they live on and would be invisible on a dark ground. `--color-accent-deep` is the brand value exactly, so the rail terminates in it; it happens to coincide with the light-band `--color-accent` right now, which is a property of this palette and not a rule.

`.shell` is 1440px with a **fixed** 20px gutter and `.section-y` is a fixed 120px. Both used to be clamped, and both resolved much smaller, which is what made the page feel pinched on a large screen.

## The chrome

One element: an **absolute** 79.2px nav at `top:0` that scrolls away with the page — fully transparent, image-free wordmark, pill links, and a glass ghost button.

**The ghost button now carries a BORDER, and the reference's does not.** It is glass — a 1% white fill over a 6px backdrop blur — which separates beautifully against the hero footage and against nothing at all on a flat band. On every page but the homepage the site's most-repeated CTA was reading as bare text. The border is `border-fg/70`, so it inverts with the band exactly as `solid`'s fill does: white at 70% over the hero video and over any dark first section, ink over a light one, **from the same markup and with no `tone` prop**. `box-border` is Tailwind's default, so it costs nothing against the fixed 47.2px height. Verified on both consumers — the nav button and `FeaturedCaseStudy`'s "See more customer stories" — on a dark first band (`/`, `/get-in-touch`) and a light one (`/customers`, `/solutions/*`).

**The ghost button says "Get in touch", and it has said that before.** It was "Get in touch", was relabelled "Book a call", and went back on 5 Sep 2026 — `docs/BUILD-NOTES.md` records the middle step. The difference this time is the destination: it was an anchor to the closing band, and it is now `/get-in-touch`, a page. The label lives in `site.navCta`, and `customers.cta` and `about.cta` carry the same string for their page headers. `/customers` had it hardcoded in the page file until this rename, which is exactly how a label drifts.

It was two. A **fixed** 37px announcement bar (opaque `#151515`, green live dot, italic text, underlined accent link) sat above the nav until 4 Sep 2026, and `--header-h` published the 116.2px sum. The bar is gone; `--header-bar-h` and `--header-nav-h` went with it, since one number with one consumer doesn't need three names, and **nothing on the site is `fixed` any more.** The copy is kept but unrendered as `announce` in `content/copy.ts`.

`--header-h` is still the contract: `main` reserves it and the hero cancels it with a negative margin, so the hero still starts at y:0 and still measures exactly `100dvh`. The spec called for dropping the reservation too; that is right for a one-page reference and wrong here, because on the three routes without a hero an absolute nav with no reserved space lands on top of the first heading.

Absolute rather than fixed is why `nav.tsx` has so little machinery. A *fixed* nav passes over every band on the page, so it had to measure the one beneath it on every scroll and resize and re-point its own tokens. An absolute nav only ever sits over the first section, and that never changes after first paint — so the whole thing collapses to one `:has()` rule in `globals.css`. No scroll listener, no tone state, no hydration gap.

## The hero

`components/sections/hero.tsx` is a **server component with no JS**: the poster sits on the wrapper as a background image and the video paints over it, so `prefers-reduced-motion` just hides the video and the still is already in place.

Height is an exact `h-dvh`, not a `min-h`. The composition depends on it — the content container is `calc(100% - 100px)`, reserving the logo band, and a min-height would let a long line push the band off the fold.

**`items-end` on the content row is the composition.** It puts the bottom edge of the CTA button and the bottom edge of the stat label on one baseline (measured: both at y=842 on a 1440x986 window). Change it to `center` or `start` and the hero stops matching the reference.

The headline breaks on **authored** lines. That is content, not layout, so it lives in `hero.titleLines` rather than as a `<br>` in the component. The first word of each line used to be italic and is not any more — Satoshi ships no italic here.

**The H1 is sized in `cqw`, off its own column, and that is the only thing holding the break.** It reads `clamp(1.75rem,10.4cqw,64px)` against an `@container` on the text column. The ratio is a measurement: `"advisory with an edge"` is 9.36x the font size wide, so it fits while size is at most colW/9.36 = 10.68cqw, and 10.4 is that with margin. A fixed size cannot work — the column is `flex-1` of a two-column row from 768px up, so it is 342px wide at 768 and 598px at 1280, and a flat 64px (a 599px line) wraps to three lines everywhere below ~1282px. Satoshi is ~12% wider than Cormorant at the same nominal size, which is why this line needed 64px when the rest of the scale went to 72px. Verified at 2 lines from 360px to 1920px; the old 809px step-down was removed and must not come back.

### Background stack

Three absolute layers: video, scrim, grain.

The scrim is **two stops, 0.44 → 0.60, in `#151515`** — not black. It replaced a five-stop per-clip gradient that opened at 0.93, derived from measured band luma, which crushed the footage and took the sky with it. What makes two stops safe is that every text run in the hero is pure white and the type is large; the muted tokens are calibrated for flat grounds, and on a photograph contrast has to be measured against the brightest column each run crosses.

**`public/grain.png` is load-bearing.** The scrim is one long gradient across the full viewport height, which is the textbook case for 8-bit banding; the grain dithers it, and is the reason the scrim can be this light without the footage looking digital. Regenerate with `scripts/make-grain.mjs`.

It is a 256px tile, not the reference's 720px. Grain must render at 1:1 — scaling it blurs it into mush — so tile size only affects the file, and per-pixel random alpha is close to incompressible: 720px lands at 387KB, 256px at 30KB, and on structureless noise the shorter repeat is invisible. Keep `backgroundSize` in `hero.tsx` in step with `SIZE` in the script.

### Background media — one video, one still, one script

`scripts/optimize-bg-video.mjs` (was `optimize-hero-video.mjs`). Per-clip
decisions live in `PRESETS`; the shared machinery is the lanczos downscale,
`gradfun` and the webp encode. **Almost nothing about an encode is portable
between sources, crf least of all** — read the preset you are touching rather
than copying the other one.

`node scripts/optimize-bg-video.mjs hero` builds the homepage's mp4 + webm +
poster. `node scripts/optimize-bg-video.mjs contact` builds a single webp.

**`/get-in-touch` is a STILL, and the video it briefly replaced is documented
in the preset on purpose.** It shipped as a background video on 6 Sep 2026 and
became a still the same day, by request. The measurements are kept because the
next person to reach for a video there will need them:

> The source camera travels continuously and never returns. Boundary-frame
> SSIM for every candidate window from 10s to 18s, started every 4s across the
> clip, lands between **0.16 and 0.26** — no cut point in this source loops, so
> a straight `loop` visibly jumps every wrap. Concatenating the clip with its
> own reverse, minus the duplicated join frame, took that seam to **0.983**.

The still is **the last frame of the source**, taken with an end-relative seek
so it cannot drift if the source is ever re-cut. By then the camera has pulled
fully back onto the lift's viewing platform against the Carmo ruins, and the
blown sun flare that dominates the first half of the clip has gone — which is
what makes white type over the left of it work.

2000px rather than the video's 1600: a single still has none of a video's
per-frame budget, and at 1600 it upscales visibly on a wide monitor. 213KB at
q80, against the 3.6MB of mp4 + webm it replaced.

### The hero video pipeline

```bash
node scripts/optimize-bg-video.mjs <hero|contact> [path/to/source.mp4]
```

The current source is a 2560x1440 / 13.8Mbps master — a wide, backlit view of the full span of the Ponte 25 de Abril. It is clean, so the script only downscales to 1600, debands, and encodes. Two things it does *not* do were both needed by earlier sources and would be wrong here:

- **No restoration.** An earlier clip existed only as a 608x320 preview and needed `hqdn3d` → `lanczos` → `unsharp` → `gradfun` to clean, enlarge and re-crisp it before `object-cover` magnified the artifacts. Denoising a 13.8Mbps master destroys real detail to fix artifacts that aren't there.
- **No debar.** Another master shipped letterboxed — a 2020-tall picture inside a 2160-tall container. Run `cropdetect` on any new source rather than assuming.

Both are in the git history if a future source needs them.

`gradfun` is not optional: most of the frame is one enormous smooth sky gradient running out of a blown highlight.

**The rates look high (crf 31 / VP9 46) and are deliberate.** The sun's specular path on the water is fine glitter that changes completely every frame, and it alone drives the bitrate — at crf 27 this clip is 4.16MB. VP9 does especially badly here: crf 40 is 3.54MB against the mp4's 2.18MB, and 46 is where it finally wins. Since VP9 is offered *first* in the markup it has to actually be the smaller file, so **compare the two printed sizes after any change** — there is no portable crf, and across this hero's sources it has ranged from 32 to 46.

The whole 15s ships: mean luma is flat at 118.0–118.6 end to end with no cut, so the loop wraps invisibly. An earlier source had to be trimmed at 9.3s because it hard-cut into a blown plate and strobed on every wrap — measure a new source with `signalstats` rather than assuming.

## The closing band

`components/site/cta-band.tsx` — "Start with a consultation", directly above the footer on **all seven routes**.

It used to be the anchor target for every CTA on the site. Since `/get-in-touch` is a page the CTAs go there instead, and so does this button — via a `ctaHref` prop that defaults to `/get-in-touch`. The one override is on `/get-in-touch` itself, which passes `#questionnaire`: same block, same "Book a meeting" label, but the button scrolls up to the form rather than reloading the route. **Do not special-case the copy** — "Book a meeting" reads correctly in both places, which is the reason the destination is the only thing that varies.

Full-bleed and image-backed. The background is the **hero poster, not a second video**: this block sits at the bottom of a long page, so an autoplaying video there would decode continuously for something most readers never reach, and the still already exists and is already cached from the hero's own poster.

It carries the same three-layer stack as the hero — image, scrim, grain — for the same reason: one long gradient over a wide box bands without grain to dither it. The scrim is **left-weighted** rather than vertical, because unlike the hero the type sits in a single left column and the right half of the frame can stay open. Verified by compositing the real poster against the real gradient: white clears AA on the worst column at 10.9:1 or better.

`components/sections/booking.tsx` is no longer mounted — the reference's layout is single-column with one button, so the band's button goes straight to `site.booking`.

## The logo

`components/ui/logo.tsx` — the three-slash mark plus the "Avalanche" wordmark, as one lockup. Supplied as an SVG on 7 September 2026 and kept verbatim at `docs/assets/avalanche-logo.svg`, because the derivation below is by hand and not scripted; it replaced the 26px Satoshi wordmark in the nav and the 30px one in the footer.

**It is inline SVG, not an `<img>`, because it has to invert.** The nav is transparent over whatever band opens the page, and on `/customers`, `/about` and `/solutions/*` that band is white — the file arrived with `fill="#fff"`, which is invisible there. Taking the colour from `currentColor` means the same markup renders white over the hero and ink on a light band, off the `[data-band]` tokens that already re-point `text-fg`. **Do not reach for `logo-mark`**: that class inverts an element inside a light band, which is how the pre-flattened client marks survive one. This lockup already inverts, correctly — inverting it a second time would make it wrong on both bands rather than right on either.

**The mark went flat on 7 Sep 2026 and no longer carries the blue.** Changed by request — "make this part of the logo be totally black or totally white, depending on the page" — and the measurement was already pointing the same way. Keeping the gradient was defensible as the brand asset rather than a fifth accent use (the four-places rule is about `--color-accent`, which a logo's own colour is not), but the gradient's light end sits at about **1.9:1 on white**: the one coloured thing in the lockup was also the least legible half of it. Flat ink or flat white clears every ground the nav lands on, and the whole lockup is now one `currentColor` with nothing to keep in sync.

Going flat deleted a `<pattern>`, a `<defs>`, 7KB of base64 inline on every page, and the `patternId` prop. **If the colour is ever wanted back**, the original artwork is still at `docs/assets/avalanche-logo.svg`, and `git log -S MARK_TEXTURE` has the downsampled texture along with the derivation notes below.

**The artwork says "Avalanche", not "Avalanche Capital".** `site.name` is still the full name and still appears in the page title, the nav link's `aria-label`, and an `sr-only` run in the footer — which was the only place a screen reader met it outside the nav.

**204KB → 7KB → 0.** History, kept because it is the map back if the gradient returns. The supplied file filled the mark with a `<pattern>` over an embedded 692×823 PNG — 198KB of base64 for a smooth blue gradient, inline on every page. The pattern stretches that image to the mark's 59.8×31.5 bounding box whatever its size, and a gradient survives the downsample: composited at 5× the rendered size, **48×24 is within 1/255 per channel at the median and 4 at the worst pixel**, no visible difference at 10×. A vector `<linearGradient>` was tried before that and rejected — the source is a mesh, not a ramp, and neither a 5-stop linear fit nor a full bilinear one gets below a median error of 9 per channel, plainly visible above nav size. The 48×24 texture then went the same way as the 692×823 one when the mark went monochrome.

A `viewBox` was also added; the supplied file has width/height and none, so setting a width on it moves the frame and leaves the artwork the same size.

**Sizing was measured, and the nav's is now a judgement on top of that measurement.** The lockup's wordmark is 19.35 of its 32 units tall; 26px Satoshi has a 19.24px cap height, so `h-8` put the new wordmark on the old one's optical size to within half a percent, and `h-9` does the same against the footer's 30px. **The nav is `h-7` since 7 Sep 2026, by request** — a 16.9px wordmark cap height, deliberately smaller than the run it replaced rather than matched to it. The footer is untouched at `h-9`. The derivation is kept because it is the way back if this ever needs re-matching rather than re-judging. A side effect worth knowing: the smaller mark bought back 23px in the nav's tightest layout, which is most of what the new `Log in` link spends.

### The `hidden` trap it exposed

Giving the ghost button a border made a long-standing bug visible: the nav CTA was rendering **on every phone**, beside the hamburger. `CtaButton` puts `inline-flex` in its base classes and the call site passed `hidden md:inline-flex`; Tailwind emits `.inline-flex` (line 677 of the built sheet) after `.hidden` (line 665) at equal specificity, so the base class won and the plain `hidden` never applied. It had been invisible glass until the border landed, which is why nobody caught it. The fix is `max-md:hidden` — a variant, emitted after both. **Check the generated CSS before pairing `hidden` with any component that sets its own `display`.**

## Logos

`public/logos/` holds 70 client and case-study marks. They arrived as flattened rasters with **inconsistent** baked-in backgrounds — some white, some black, none with alpha.

`scripts/logos-to-alpha.mjs` normalises them: it reads the median border luminance to decide whether the background is light or dark, flips the image if needed so the mark is always the light part, then uses luminance *as* the alpha channel over solid white. The result is a white silhouette on transparency that sits correctly on any ground. A black-point floor kills the faint rectangular halos that near-black (rather than pure-black) backgrounds would otherwise leave.

It's idempotent — anything that already has an alpha channel is skipped. Re-run it after adding logos:

```bash
node scripts/logos-to-alpha.mjs
```

`scripts/optimize-logos.mjs` is the earlier one-off that extracted these from SVG-wrapped base64 (9.5MB → 404KB). It has nothing left to do unless you add new `.svg` wrappers.

## Team photos

`public/team/` holds five 4:5 portraits, built by `scripts/optimize-team-photos.mjs` from masters committed at `docs/assets/team/`:

```bash
node scripts/optimize-team-photos.mjs
```

**FOUR OF THE FIVE ARE GENERATIVE RE-SHOOTS.** That is the first thing to know about this directory. The photographs supplied on 7 Sep 2026 were five different shoots — a beach, a sponsor wall, an office, a studio, a curtain, five outfits, one of them black-and-white — and no crop makes them a set. Four were regenerated outside this repo (ChatGPT, 7 Sep 2026, 1254²) from the originals, onto the plain light-grey studio backdrop the fifth already had. **`tatjana-sotirovik` is the untouched photograph**, and it is the reference the other four were matched to.

**Bernardo and Bruno were then regenerated a second time**, later the same day, and the reason generalises: the first pass matched the *backdrop* across the set but not the *dress*. Bernardo came back in a white shirt with a chain and sunglasses, Bruno in a dark open-collar shirt at a three-quarter turn — four studio portraits that still read as four different occasions. Both came back square-on in a dark jacket over a white shirt, which is what Lev and Lucas were already wearing.

**Bruno was replaced a third time as well**, and that one needed no re-tuning — square-on, dark jacket, white shirt, head centroid at 0.491, so `faceX: 0.5` carried straight over. Worth noting for sign-off that likeness is not stable across passes: he wore glasses in his second frame and does not in his third.

**Bernardo was also replaced a third time, and that is why `zoom` is no longer Tatjana's alone.** His third frame is a seated three-quarter shot — leaning on a table, hand to chin — where the other four are tight head-and-shoulders. At `zoom: 1` his head filled about a quarter of the card against their third, the table edge showed along the bottom, and he read as a different shoot again. `zoom: 0.88` with `faceX: 0.43` crops in to head-and-shoulders and puts him back on their scale, chosen against a contact sheet with Bruno beside him rather than by eye alone. It costs no resolution: 0.88 of 1254 still lands above the 640px output.

So the rule that has now held three times: **match the dress, the angle AND the crop distance.** The backdrop alone does not make a set, and neither does the wardrobe.

**The masters are committed, which is a break from the other asset scripts.** `optimize-bg-video.mjs` reads its sources out of `~/Downloads`, and that is fine for a 100MB video that can be downloaded again. A generative output is one-shot and non-deterministic: clean that folder and it is gone for good. So the five masters live in `docs/assets/team/`, named for the person rather than by whatever the tool that made them called the file — 520KB for all five, and the pipeline now runs for anyone who clones the repo.

The **name-to-file mapping for the originals was read, not guessed.** They arrived as Framer CDN exports with hash filenames and no captions, and four of the five subjects are men in business dress. `avalanche-capital.com` is a Framer site and ships its CMS records in the page payload, so the mapping came out of the live HTML where each record carries `{image, name, role, slug}` in order. It returned the same order as `content/team.ts`.

**Every output is greyscale**, set in the script rather than by a CSS filter on the page, so what ships is what renders and it keeps applying if a master is replaced.

**Only the horizontal is cropped, except for Tatjana.** The four re-shoots are square, so top and bottom stay whole and `faceX` decides which side loses more of the trim. Lev, Bruno and Lucas sit at `0.5`: the centroid of the dark pixels in each master's hair band (y 15–32%) measures 0.485 / 0.491 / 0.539, so a centred crop puts those three within a couple of percent of the middle. Bernardo is the exception and has now had three different sets of numbers — 0.51, then 0.5, then the zoomed crop above. **Re-measure when a master changes rather than carrying its old number over**; every value in that table has been wrong at least once because someone did. Hers is a wider shot: her head fills about 32% of the frame against the others' ~40%, so at the same crop she read as standing further back than everyone else, which was the last thing breaking the row. **`zoom` exists for her alone.** 0.8 pulls her in to match, and it costs resolution rather than inventing any — the crop lands at 512×640 and `withoutEnlargement` leaves it there, about 6% under the card's 2× DPR ideal. A re-shoot of hers would close that properly; upscaling would only fake it.

**If a replaced photo does not appear, the dev image cache is at `.next/dev/cache/images`.** Not `.next/cache/images` — Next 16 moved it, and the old path no longer exists, so deleting it silently does nothing. The optimizer keys on `(url, width, quality)` and the URL does not change when the file behind it does, so re-running this script leaves the dev server serving the previous crop indefinitely. **Restarting `next dev` does not clear it either** — the cache is on disk, not in memory. `rm -rf .next/dev/cache/images` does. The tell is the served image's dimensions: fetch `/_next/image?url=%2Fteam%2F<slug>.webp&w=640&q=75` and compare against the file, because a stale entry keeps the old source's aspect.

**`aspect-[4/5]` on the page is a contract with the script.** Change one and change the other, or `object-cover` starts throwing away a band of every photo.

**The monogram fallback stays.** `Member.photo` is nullable, a sixth member can arrive before their picture does, and an empty frame is worse than initials. Its `alt` is deliberately `""`: the name is the very next element and is a heading, so alt text here would make a screen reader read every name twice.

**The bios are no longer rendered.** They are still in `content/team.ts`, still marked DRAFT and still tracked in `docs/COPY-REVIEW.md`. The reference puts bios behind a "Read Bio" overlay rather than on the card, and five paragraphs under five portraits fought the pictures. Kept, not rendered, like the other unmounted copy here.

`scripts/ai-suit-headshots.mjs` was written here as a handoff for doing the re-shoots from this repo, and has been **deleted** now that they were done elsewhere: its prompts described the original photographs, which are no longer the masters, so keeping it would have been keeping instructions for the wrong inputs. `git log` has it.

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

There are four client components — `nav`, `track-record`, `case-study-grid`, `contact-form` — and one rule about the first three: **external state is read with `useSyncExternalStore`, not mirrored into an effect.** `contact-form` is exempt because none of its state is external; see the `/get-in-touch` section above. Scroll offset (`nav`) and `prefers-reduced-motion` (`track-record`) both work that way, with a `false` server snapshot that matches the pre-hydration markup. The nav closes its mobile sheet on route change by adjusting state during render, not in an effect.

That isn't stylistic — `npm run lint` enforces it via `react-hooks/set-state-in-effect`, and lint is clean. Keep it that way.

`track-record.tsx` shows financial figures counting up. It must never be left mid-count: the animation snaps to the true value on cleanup (rAF is throttled in background tabs and can be torn down mid-flight), and values under 10 skip the count entirely.

## Performance

Measured on a production build served locally — no network throttling, so these are **not** Lighthouse-equivalent:

| Route | TTFB | FCP | LCP | CLS | Transfer |
|---|---|---|---|---|---|
| `/` | 39ms | 176ms | **176ms** | **0** | 628KB |
| `/process` | 6ms | 32ms | 32ms | **0** | 42KB |
| `/customers` | 4ms | 36ms | 36ms | **0** | 67KB |
| `/team` † | 3ms | 64ms | 64ms | **0** | 42KB |

† `/team` and `/process` no longer exist. `/team` is the short pre-merge page — portraits and press only; `/about` is that plus the thesis and three manifesto sections, so it carries two more inline SVG diagrams and roughly twice the markup. **Re-measure it rather than reading this row as current.**

The LCP element on `/` is the hero wrapper painting the **20KB poster**, not the video — which is why a background video didn't move LCP. Of the homepage's 628KB, 565KB is video streaming in behind the poster and 42KB is the font.

**Lighthouse has not been re-run since the re-skin.** The first build scored 100/100/100/100 desktop; do a fresh audit before launch rather than assuming that still holds.

## Open items before this goes live

Full detail and rationale in **`docs/COPY-REVIEW.md`**. Short version:

1. **Approve or replace the drafted copy.** Three offering panels, two investor verticals, process step 03, seven FAQ answers, five team bios. Every one is marked `// DRAFT` at its source. They were written here because the originals are genuinely unreachable — the Framer carousel on `avalanche-capital.com` renders no body text to the page at all (verified against raw HTML, not just by clicking).
2. **The team bios describe the role, not the person** — deliberately. Names and titles are the only public facts; inventing career histories for five named individuals isn't a placeholder a reviewer can safely skim. Get two sentences from each of them. **They are not on the page any more** — the team grid matches the reference's photo-name-role card, which carries no bio — so this is now a question of whether the page should have them at all, not just of what they say. The section's *heading* is now drafted too: mounting the thesis on `/about` put "Both Sides of The Table" on the page in full, and the team block had been borrowing that pillar as its heading and lede.
3. **Verify the track-record figures** — `$2B+`, `$300M+`, `200`, `$600M+`. All four come from pages dated 2024 and are the most load-bearing claims on the site.
4. **Footer legal text** — currently adapted from the short notice on fundraisr.ai. Should come from counsel.
5. **Confirm the Calendly event.** Both original links on the live sites are dead ("This Calendly URL is not valid"). The site points at `capital-raise-demo-call-ac-clone` — the only live event on the `avalancheintrocall` account, but the slug reads like a duplicate.
6. **Four of the five team portraits are AI-generated.** Bernardo Almeida, Lev Valestkiy, Bruno Erckmam and Lucas Barrozo were regenerated from their original photographs on 7 Sep 2026; Tatjana Sotirovik's is untouched. The row reads as one set now, but these are altered likenesses of named people — each of them should see their own before launch, and it is worth deciding whether the site should say so. Full detail in `docs/COPY-REVIEW.md`.
7. **Case-study categories.** The Funds / Startups / Placement-agency split was assigned by us, not taken from source. It drives the `/customers` filter.

### Also found on the live sites

`https://fundraisr.ai` has no certificate on the apex domain — it fails to connect entirely. Only `https://www.fundraisr.ai` resolves.
# Avalanche
