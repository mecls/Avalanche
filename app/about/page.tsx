import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/site/cta-band";
import { PageHeader } from "@/components/site/page-header";
import { Thesis } from "@/components/sections/thesis";
import { TrackRecord } from "@/components/sections/track-record";
import { CtaButton } from "@/components/ui/button";
import { Figure, Plate } from "@/components/ui/diagram";
import {
  AccessLayersDiagram,
  DivergenceDiagram,
} from "@/components/ui/manifesto-media";
import {
  BothSidesDiagram,
  ThresholdDiagram,
} from "@/components/ui/market-media";
import { mandate, bothSides as bothSidesCopy } from "@/content/market-data";
import { SectionHeading } from "@/components/ui/section-heading";
import { about } from "@/content/about";
import { manifesto } from "@/content/manifesto";
import { teamBlur } from "@/content/team-blur";
import { team } from "@/content/team";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Capital is not scarce. Access is. What Avalanche Capital does, what it believes about private markets, and the team behind the mandates.",
};

/**
 * /about — About Us: what the firm is, what it believes, and who runs it.
 *
 * IT IS TWO ROUTES MERGED, by request on 7 Sep 2026. `/team` carried the
 * portraits and the press quotes; `/manifesto` carried the divergence, the
 * five beliefs and the three access layers. Both paths now 307 here (see
 * `next.config.ts`), the nav entry that said "Team" says "About Us", and the
 * footer's Overview column lost its separate Manifesto link because there is
 * no separate page left to link to.
 *
 * THE ORDER IS THE ARGUMENT. What the firm does (the thesis) -> what it has
 * done (the metrics) -> the market that makes it necessary (the divergence) -> what follows from that (five
 * beliefs) -> where the gap actually sits (three layers) -> who does the work
 * (team). The manifesto sits in the MIDDLE deliberately: a reader who came
 * for the team scrolls through the argument to reach them.
 *
 * **"In the press" was removed on 7 Sep 2026.** Three cards of drafted quotes
 * on a white band, separated only by a hairline, with the outlet set as an
 * eyebrow rather than its mark, no link to any article and no hover state —
 * the weakest block on the page and unfixable in place, because there are no
 * outlet marks in `public/logos/` for those three and no article URLs
 * anywhere in the repo. `media` is kept but unrendered in content/copy.ts,
 * like the other unmounted copy here.
 *
 * BAND SEQUENCE: light header, light thesis (separated by a rule, the way
 * `RaiseTypes` separates itself on the homepage), dark metrics, light
 * divergence, dark beliefs, light layers, dark team, then the photo-backed
 * closing band. The header and the thesis are the only adjacent pair sharing
 * a band, which is why `Thesis` carries the page's one `border-t`.
 *
 * That opening pair is deliberate. The page ran light header straight into a
 * dark thesis until 7 Sep 2026, and the cut read as abrupt because nothing
 * visual sat in the header to prepare it — 420px of white with a lone button
 * in the right half. The header carries a dark inset now and the dark band is
 * one section further down.
 *
 * The team grid is `data-band="dark"`, which paints the same `#151515` the
 * section used to inherit from `<body>` back when this was /team and the page
 * opened dark.
 *
 * **The header section MUST stay `data-band="light"` and the FIRST child of
 * `main`.** Two rules in globals.css key off
 * `main > :first-child[data-band="light"]`: one flips the nav's type to ink,
 * the other paints `main` with `--color-paper`. They break together, and the
 * failure mode is the whole nav rendering white on white. Note which way this
 * merge moved — /team opened DARK and needed neither rule, so this is new
 * exposure on a page that never had it.
 *
 * **A section that does not paint ITSELF is the other half of that trap.** It
 * sits on the white `main` while still inheriting the root's dark text
 * tokens — white type on a white ground. Every dark section on this page says
 * `data-band="dark"` for that reason, not for the colour alone.
 *
 * The media rows are the /solutions row with the rail taken out: the `Plate`
 * is `flex:1 0 0` on a fixed aspect ratio, so it sizes the row and
 * `items-center` centres the text against it. Copy length cannot move the
 * layout. Text comes FIRST in the document in every one of them, so a phone
 * always reads the claim before the picture; the layer panels set
 * `flex-row-reverse` to put their plate on the left on a wide screen, which
 * `flex-col` overrides below 1200px.
 *
 * The layer sequence turns that same row into three of them, one per screen —
 * see the comment on the section itself.
 */
/**
 * WHICH PICTURE EACH LAYER PANEL GETS, BY LAYER ORDINAL rather than by
 * position — the same reason /solutions keys its `MEDIA` on a block id. A
 * lookup by index says nothing about what the picture is of, and these three
 * are not interchangeable.
 *
 * The three panels used to share ONE picture, the access rings drawn three
 * times with a different ring emphasised. It read as a repeat rather than as
 * a sequence, and the two firm diagrams were sitting in a grid at the bottom
 * of the section doing nothing — so they moved up here.
 *
 * **THE FIRST TWO ARE NOT PICTURES OF THEIR LAYER, AND THEY SAY SO.** The
 * threshold is about which issuers sit inside the segment; both sides is
 * about the same counterparties coming back. Each therefore keeps its own
 * claim line under it, which is what stops the pairing from reading as a
 * caption for the copy beside it. The rings ARE layer three — its accent band
 * is that layer and the exposure-gap callout is that layer's claim — so it
 * carries no caption: the copy beside it already is one.
 *
 * That asymmetry is the honest state of this section, not an oversight. If a
 * picture is ever drawn FOR layer one or layer two, it takes the caption off
 * with it. Until then, do not retitle these two to fit the layer they sit
 * beside — that would make a picture claim something it does not show.
 */
const LAYER_MEDIA: Record<
  string,
  { Diagram: () => React.ReactElement; claim?: string; source?: string }
> = {
  "01": {
    Diagram: ThresholdDiagram,
    claim: mandate.note,
    source: `${mandate.inside} — ${mandate.threshold}`,
  },
  "02": {
    Diagram: BothSidesDiagram,
    claim: bothSidesCopy.note,
    source: bothSidesCopy.buy.detail,
  },
  "03": { Diagram: AccessLayersDiagram },
};

/**
 * EVERY BLOCK ON THIS PAGE FILLS THE SCREEN EXCEPT THE PAGE HEADER, by
 * request on 7 Sep 2026 — the thesis, the track record, the team, the
 * divergence, the beliefs, the layer heading, each of the three layer panels
 * and the closing band. The page is read a screen at a time from there down.
 *
 * The exemption list took three passes to settle and the header is the whole
 * of it. It went in as "everything after the first two", which left the
 * thesis band ending mid-screen with white above and below — exactly what a
 * band that does not fill looks like when its neighbours do. Everything got
 * the floor; the header alone came back off it. It is a label, a two-line
 * H1, a lede and a button, and a screen of white around them reads as an
 * empty page rather than as a composition.
 *
 * It is a FLOOR, not a height. The team grid, the beliefs list and the layer
 * sequence are all taller than a viewport on their own and this changes
 * nothing about them; what it fixes is the short blocks between them, which
 * used to leave a band of the next section showing under a section that had
 * only half a screen of content in it.
 *
 * `svh` rather than `dvh` or `vh`: `dvh` remeasures as a phone's URL bar
 * hides and relayouts the block mid-scroll, and `vh` on iOS is the LARGE
 * viewport, so a "full screen" block starts life with its last line under the
 * browser chrome. `svh` is the one of the three that is both stable and
 * wholly visible.
 *
 * `justify-center` is what makes the extra height read as composition rather
 * than as padding — the section's own `section-y` still sets the minimum
 * breathing room, and the leftover space is split above and below.
 */
const FULL_SCREEN = "flex min-h-svh flex-col justify-center";

/*
 * IF THE HEADER EVER TAKES THE FLOOR AGAIN, IT NEEDS ITS OWN VALUE:
 * `min-h-[calc(100svh-var(--header-h))]`, not `min-h-svh`. `main` reserves
 * `--header-h` of padding for the absolute nav, so a plain `svh` on the
 * section under it makes the opening screen 100svh + 79.2px — the one block
 * every reader sees would be the one block that does not fit. Every later
 * section starts below the reservation and takes the full `svh`.
 */

export default function AboutPage() {
  const { divergence, beliefs, layers } = manifesto;

  return (
    <>
      <section data-band="light">
        <PageHeader
          eyebrow={about.eyebrow}
          title={about.titleLines.map((line) => (
            // Authored break — see content/about.ts. Block spans rather than
            // a <br> so each line stays its own run.
            <span key={line} className="block">
              {line}
            </span>
          ))}
          lede={about.lede}
          cta={about.cta}
          align="center"
        />
      </section>

      <Thesis className={FULL_SCREEN} />

      {/* THE PAGE'S ONLY PROOF SURFACE. /about argued entirely from position
          and carried no figures and no client marks anywhere, where the
          homepage opens on this bento plus a logo strip and /customers is
          wall-to-wall client marks. This is the homepage's own component and
          content, not a second copy of the numbers.

          `band="dark"` is REQUIRED here and the homepage passes nothing. Its
          `grid` variant renders an unbanded section, which is correct on a
          dark-first page because it inherits the <body> ground — but /about
          opens light, so `main` is painted with --color-paper and an unbanded
          section would put white figures on a white ground.

          It is also the page's first client component. /about had none until
          now; the count-up is the whole point of the block, so it comes with
          one. See "Client components" in AGENTS.md. */}
      <TrackRecord
        band="light"
        className={`border-t border-line-soft ${FULL_SCREEN}`}
      />

      <section data-band="dark" className={`section-y ${FULL_SCREEN}`}>
        <div className="shell">
          <SectionHeading
            eyebrow={about.team.eyebrow}
            title={about.team.title}
            lede={about.team.lede}
          />

          {/* FIVE ACROSS, ONE ROW. Five people in a four- or three-column
              grid always left a ragged second row, and the wider the columns
              got the worse it paid: three across gave the biggest portraits
              and the tallest block on the page by far (1977px, against 1612
              at four). Five columns fit the whole team on one row, which
              removes the orphan and the second row's height together.

              The type steps down with the column — 20px name, 13px bio —
              because a 24px display name wraps in a 254px column.

              THERE IS NO TWO-COLUMN STEP, AND THAT IS THE SAME DECISION AS
              THE FIVE-COLUMN ONE. It went 1 -> 2 -> 5 at first, which left
              640-1023px on two columns: a card reaches 472px there, the
              portrait under it 590px, and the block hit 2721px at 1023 — the
              exact bloat this layout was changed to remove, one breakpoint
              down. Three columns from `sm` holds the card between 184 and
              307px across that whole range and the block between 1.3k and
              1.6k. Five people on three columns still leave one orphan, which
              is what the card carrying no chrome is for.

              NO CARD. There is no border, no fill and no padding around the
              whole thing: the only frame is on the picture, and the type sits
              on the band. That mattered more when the last row was ragged; it
              is kept because the cards still have to sit on the band cleanly
              at the two-column breakpoint, where five people do leave one.

              THE BIOS ARE RENDERED AGAIN, under the role, by request on
              7 Sep 2026. They came off when the grid was rebuilt around the
              reference's photo-name-role card, which puts bios behind a
              "Read Bio" overlay instead. Two things follow from putting them
              back, and both are load-bearing:

              They are DRAFT copy about five NAMED, IDENTIFIABLE PEOPLE, and
              they are now public rather than sitting unrendered in
              content/team.ts. That is why each one describes the SEAT rather
              than the person — no career history, no prior firms, no
              credentials, because none of that was ever sourced. Do not
              "improve" them by inventing any. docs/COPY-REVIEW.md tracks
              them, and the entry there is now about copy that ships, not copy
              that is merely kept.

              The row still cannot break: the picture, name and role all sit
              at a fixed height, so the bio is the only thing that varies and
              it varies BELOW everything else. Cards in a row therefore stay
              aligned down to the role no matter how long a bio runs. */}
          <ul className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-5">
            {team.map((m) => (
              <li key={m.name} className="flex flex-col">
                {/* `aspect-[4/5]` is the contract with
                    scripts/optimize-team-photos.mjs, which crops every source
                    to exactly this. Change one and change the other, or the
                    `object-cover` starts throwing away a band of each photo.

                    The monogram FALLBACK stays: `photo` is nullable, a sixth
                    member can arrive before their picture does, and an empty
                    frame is worse than initials.

                    `placeholder="blur"` is not decoration. These five are the
                    only images on the page, they sit ~4000px down it, and
                    next/image lazy-loads by default — so scrolling here before
                    they decode showed five EMPTY BORDERED FRAMES on the dark
                    band. The frame's own `bg-ground-alt` is the same #151515
                    as the band behind it, so "not loaded yet" and "nothing
                    here" looked identical, and the section read as a blank
                    slab rather than as loading. The data URIs are generated
                    from the same crops by the pipeline (content/team-blur.ts,
                    generated) so they cannot drift from the photos. Guarded
                    rather than assumed: a portrait added without re-running
                    the script falls back to `empty` instead of throwing.

                    `alt=""` is deliberate. The name is the very next element
                    and is a heading, so alt text here would make a screen
                    reader read every name twice. */}
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg border border-line bg-ground-alt">
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt=""
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 20vw"
                      placeholder={teamBlur[m.photo] ? "blur" : "empty"}
                      blurDataURL={teamBlur[m.photo]}
                      className="object-cover"
                    />
                  ) : (
                    <span className="display absolute inset-0 flex items-center justify-center text-3xl text-fg-muted">
                      {m.name
                        .split(" ")
                        .map((w) => w[0])
                        .join("")}
                    </span>
                  )}
                </div>

                <h3 className="display mt-6 text-xl">{m.name}</h3>

                {/* `page-label` rather than `eyebrow`: this run has to stay
                    monochrome. `eyebrow` carries the accent and renders a
                    dozen times a page as a BLOCK's name — five job titles are
                    neither, and colouring them would put the loudest thing on
                    the page under every portrait. Same 14px uppercase spec,
                    no colour of its own, which is the whole reason that
                    utility does not own one. */}
                <p className="page-label mt-2 text-fg-muted">{m.role}</p>

                {/* Centred to match the name and role above it rather than
                    ranged left, which would leave the only left-aligned run
                    in the card sitting under two centred ones.
                    `text-balance` is what makes that read as deliberate: at
                    this measure every bio sets in two or three lines, and
                    without it the last line is regularly one orphaned word.

                    Guarded on `m.bio` for the same reason the photo is:
                    `bio` is nullable, and a sixth member can arrive before
                    their copy does. */}
                {m.bio && (
                  <p className="mt-3 text-[13px] leading-relaxed text-pretty text-fg-muted">
                    {m.bio}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* `id="manifesto"` is what the old route redirects to — /manifesto 307s
          to /about#manifesto, so a reader following an existing link lands on
          the manifesto rather than at the top of a page twice as long as the
          one they asked for. The anchor is on the divergence because that is
          where the manifesto starts; the thesis above it is the other half of
          the merge. `scroll-mt` is breathing room only — the nav is absolute
          and scrolls away, so nothing overlaps the target. */}
      <section
        id="manifesto"
        data-band="light"
        className={`section-y scroll-mt-24 ${FULL_SCREEN}`}
      >
        <div className="shell">
          <div className="flex w-full flex-row items-center justify-center gap-9 max-[1199px]:flex-col">
            <div className="flex flex-1 flex-col items-start gap-6 max-[1199px]:w-full max-[1199px]:flex-none">
              <SectionHeading
                eyebrow={divergence.eyebrow}
                title={divergence.title}
              />

              <div className="flex max-w-[680px] flex-col gap-5">
                {divergence.body.map((p) => (
                  <p key={p} className="text-[16px] leading-6 text-fg-muted">
                    {p}
                  </p>
                ))}
                <p className="text-[16px] leading-6 text-fg">
                  {divergence.note}
                </p>
              </div>
            </div>

            <Plate>
              <DivergenceDiagram />
            </Plate>
          </div>
        </div>
      </section>

      <section data-band="dark" className={`section-y ${FULL_SCREEN}`}>
        <div className="shell">
          <SectionHeading
            eyebrow={beliefs.eyebrow}
            title={beliefs.title}
            lede={beliefs.lede}
          />

          {/* The same ruled <dl> WhoWeServe uses on the homepage: ordinal and
              statement left, argument right, hairline between. A <dl> may only
              contain <dt>/<dd> (optionally wrapped in a <div>), so the index
              lives inside the <dt> rather than beside it. */}
          <dl className="mt-16 divide-y divide-line border-y border-line">
            {beliefs.items.map((b, i) => (
              <div
                key={b.title}
                className="grid gap-4 py-9 md:grid-cols-[1fr_1.4fr] md:items-baseline md:gap-10"
              >
                <dt className="flex items-baseline gap-5">
                  <span className="eyebrow shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display text-2xl md:text-[1.75rem]">
                    {b.title}
                  </span>
                </dt>
                <dd className="text-sm leading-relaxed text-fg-muted">
                  {b.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* THE THREE LAYERS ARE THREE FULL SCREENS, one read at a time, by
          request on 7 Sep 2026. They were a ruled <dl> of three rows beside a
          single plate — the whole argument in one row, with the picture doing
          nothing while the reader worked down the list.

          Each panel is `min-h-svh` with its content centred, so the panels
          TILE the viewport: scroll exactly one screen and the next layer's
          text lands where the last one's was, and so does its picture. That
          is the property the request turns on, and it is why the panels must
          stay the same height as each other — the plate's fixed aspect ratio
          is what guarantees it, since copy length cannot move a row it does
          not size. `svh` rather than `dvh`: a panel measured against the
          shrinking viewport would relayout under a phone's disappearing URL
          bar, mid-scroll, on every panel.

          The crossfade between them is `.layer-panel` / `.layer-panel-in` in
          globals.css — scroll-linked CSS, NO client component, the same rule
          /solutions lives under. The un-animated state is all three visible,
          so a browser without scroll-driven animations reads three ordinary
          full-height panels.

          Three DIFFERENT pictures, one per panel, keyed on the layer's own
          ordinal — see `LAYER_MEDIA` for which, and for why two of them keep
          their own caption and the third does not.

          Text FIRST in the document with `flex-row-reverse` putting it on the
          right: image left, text right on a wide screen, and a phone still
          reads the claim before the picture. */}
      <section data-band="light" className="section-y">
        <div className="shell">
          <SectionHeading
            eyebrow={layers.eyebrow}
            title={layers.title}
            lede={layers.lede}
          />

          {/* An <ol> because the layers are numbered and the order is the
              argument — the first two are exhausted before the third is
              reached. */}
          <ol className="mt-10 flex list-none flex-col">
            {layers.items.map((l, i) => {
              const last = i === layers.items.length - 1;
              const media = LAYER_MEDIA[l.n];

              // TOP-ALIGNED, NOT CENTRED, and that is what puts the first
              // picture directly under the section heading. A panel is a
              // full screen holding ~650px of content, so centring it parked
              // 170px of white above every panel — under the heading that
              // read as the heading having been abandoned, and it could not
              // be tuned away for the first panel alone without moving its
              // picture out of line with the other two. Top-aligning spends
              // the same white at the BOTTOM of each panel, where the next
              // one is already fading in, and every panel keeps the
              // identical top offset that makes the three pictures land in
              // the same place.
              //
              // A heading on its own screen was tried in between and was
              // worse: it moved the picture a whole screen away from the
              // words introducing it.
              return (
                <li
                  key={l.n}
                  className="layer-panel flex min-h-svh flex-col justify-start pb-16"
                >
                  <div className="layer-panel-in flex w-full flex-row-reverse items-center justify-center gap-9 max-[1199px]:flex-col">
                    {/* THE 300px FLOOR IS WHAT ALIGNS THE THREE TEXT BLOCKS,
                        and it is the second half of the caption trick above.
                        `items-center` centres each column against the plate,
                        so a column's own height decides where its first line
                        lands: measured 151 / 175 / 294 here, which put "01",
                        "02" and "03" at three different heights — 72px apart
                        between the first panel and the last. A floor above
                        the tallest makes all three columns the same box, so
                        every panel's ordinal, heading and body start on the
                        same line as the last one's. Raise it if the copy ever
                        grows past it; below that the panels drift apart
                        again. Off below 1199px, where the column sits above
                        the plate rather than beside it and the floor would
                        only add dead space. */}
                    <div className="flex min-h-[300px] flex-1 flex-col items-start gap-6 max-[1199px]:w-full max-[1199px]:min-h-0 max-[1199px]:flex-none">
                      <p className="page-label text-fg-faint">{l.n}</p>

                      <h3 className="display text-[28px] md:text-[36px]">
                        {l.title}
                      </h3>

                      <p className="max-w-[560px] text-[16px] leading-6 text-fg-muted">
                        {l.body}
                      </p>

                      {last && (
                        <>
                          <p className="max-w-[560px] text-[16px] leading-6 text-fg">
                            {layers.note}
                          </p>

                          {/* Solid rather than ghost: the ghost variant is a
                              1%-white fill with no border — legible over the
                              hero footage and over a dark band, all but
                              invisible on a white one. */}
                          <CtaButton href="/solutions/fundraising">
                            {layers.cta}
                          </CtaButton>
                        </>
                      )}
                    </div>

                    {/* Captioned or bare, decided by whether the picture is
                        of this layer — see `LAYER_MEDIA`. `Figure` and `Plate`
                        take the same share of the row, so the two forms sit
                        identically and the panels stay the same height. */}
                    {media &&
                      (media.claim && media.source ? (
                        <Figure claim={media.claim} source={media.source}>
                          <media.Diagram />
                        </Figure>
                      ) : (
                        <Plate>
                          <media.Diagram />
                        </Plate>
                      ))}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <CtaBand className={FULL_SCREEN} />
    </>
  );
}
