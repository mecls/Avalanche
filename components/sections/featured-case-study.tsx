import Image from "next/image";
import { ArrowGlyph, CtaButton, ctaClass } from "@/components/ui/button";
import { SlideLink } from "@/components/ui/slide-link";
import { featuredCaseStudies, type CaseStudy } from "@/content/case-studies";
import { caseTestimonials, caseStudySection } from "@/content/copy";

type Testimonial = {
  title: string;
  subject: string;
  quote: readonly string[];
  name?: string;
  role?: string;
  company: string;
  /** The slide's picture — the whole left column. Required. */
  photo: string;
  /** The picture is the client's MARK, not a portrait. See the frame. */
  logo?: boolean;
};

const slideId = (slug: string) => `case-${slug}`;

/**
 * One end of the carousel. It renders in BOTH directions and at BOTH ends, so
 * the disabled state is real markup rather than a hidden element.
 *
 * **THE UNAVAILABLE DIRECTION IS RENDERED, NOT DROPPED.** It used to be
 * omitted, which moved the surviving button across the row as the reader
 * advanced and left slide 01 with a single control that could only mean one
 * thing. `aria-disabled` rather than `disabled` follows the nav's "Log in"
 * precedent: the control stays in the tab order, so a keyboard reader learns
 * it exists and that it is spent, instead of it silently not being there.
 *
 * The visible word is short — "Previous" / "Next" — and the `sr-only` run
 * completes the accessible name to "Previous case study" / "Next case study".
 * Two full labels side by side wrap onto their own row on a phone.
 */
function Step({ target, dir }: { target?: string; dir: "prev" | "next" }) {
  const body = (
    <>
      {/* The glyph is a right arrow with a `group-hover` nudge along +x.
          Rotating the wrapper turns both the mark and the nudge, so the hover
          moves it left — which is the direction this control means. */}
      {dir === "prev" && (
        <span className="rotate-180">
          <ArrowGlyph />
        </span>
      )}
      {dir === "prev" ? "Previous" : "Next"}
      <span className="sr-only"> case study</span>
      {dir === "next" && <ArrowGlyph />}
    </>
  );

  if (!target) {
    return (
      <button
        type="button"
        aria-disabled="true"
        // `pointer-events-none` kills the ghost button's hover states — a
        // spent control that still lights up on hover is worse than one that
        // is merely faint. It does NOT take the button out of the tab order,
        // which is the half that has to survive.
        className={ctaClass("sm", "ghost", "pointer-events-none opacity-40")}
      >
        {body}
      </button>
    );
  }

  return <SlideLink targetId={target}>{body}</SlideLink>;
}

/**
 * The control cluster: position, dots, and the two arrows.
 *
 * **IT LIVES INSIDE THE SLIDE, AND IT IS PERMANENT BECAUSE THE SLIDE FITS THE
 * VIEWPORT.** Only one slide is on screen, so a control that belongs to a
 * slide is always the correct one and nothing has to track an active index —
 * that is what keeps everything but the click handler server-rendered. The
 * cluster does not need `position: sticky` and could not have it anyway:
 * `overflow-x: auto` on the track computes `overflow-y` to `auto` as well, so
 * the track is its own scrollport, and with its height set by its tallest
 * slide there is no vertical overflow for a sticky element to move against.
 *
 * The dots are the affordance that the pager alone was not: "01 / 02" states a
 * count, two dots SHOW one. They are real links, so they are also direct
 * access once a third study lands. A peeking sliver of the next slide was
 * tried instead and does not work here — a slide is full-bleed text inside the
 * shell rather than a card with an edge, so the 20px on show is the left half
 * of a letterform, which reads as a rendering fault.
 */
function Controls({
  index,
  slides,
}: {
  index: number;
  slides: readonly CaseStudy[];
}) {
  const prev = index > 0 ? slides[index - 1] : undefined;
  const next = index < slides.length - 1 ? slides[index + 1] : undefined;
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-5">
      <div className="flex items-center gap-5">
        {/* Position, spelled out as well as dotted: with the other slides
            scrolled out of frame there is nothing else on screen saying how
            many there are. `page-label` carries no colour of its own — the
            accent is not spent on a pager. */}
        <p className="page-label text-fg-muted">
          {pad(index + 1)} / {pad(slides.length)}
        </p>

        <ol className="flex items-center gap-2">
          {slides.map((s, i) => (
            <li key={s.slug} className="flex">
              {i === index ? (
                <span className="flex h-6 items-center px-1">
                  <span className="h-1.5 w-7 rounded-full bg-fg" />
                  <span className="sr-only">
                    Case study {i + 1} of {slides.length}: {s.name}, showing
                  </span>
                </span>
              ) : (
                <SlideLink
                  targetId={slideId(s.slug)}
                  label={`Go to case study ${i + 1} of ${slides.length}: ${s.name}`}
                  className="group flex h-6 items-center px-1"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-fg-muted transition-colors duration-200 group-hover:bg-fg" />
                </SlideLink>
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="flex items-center gap-3">
        <Step target={prev && slideId(prev.slug)} dir="prev" />
        <Step target={next && slideId(next.slug)} dir="next" />
      </div>
    </div>
  );
}

/**
 * One slide: the controls across the top, then the picture on the left and
 * everything said about it on the right.
 *
 * **THE TWO COLUMNS ARE WHAT MAKE IT FIT.** Stacked — headline, client line,
 * metric card, then a separate testimonial figure — the slide was 932px tall
 * in an 806px viewport, so the controls were off screen by the time the reader
 * reached the quote and nothing on screen said a second study existed. The row
 * is `items-center`: the two columns are never the same height and hanging the
 * shorter one from the top leaves it floating against a much taller neighbour.
 *
 * **THE PICTURE LEADS AND IT IS FULL-COLUMN** (9 Sep 2026, by request). It was
 * a 56px avatar tucked beside the attribution, under a card that opened with
 * the client's logo, a metric pill and our own result sentence. All three of
 * those came off in the same change: the headline already says what closed and
 * how fast, so the pill repeated it in miniature and the sentence repeated it
 * in prose. What is left is one claim per voice — ours in the headline,
 * theirs in the quote — with the face or the mark carrying the slide.
 *
 * **THE METRIC PILL WAS ONE OF THE ACCENT'S FOUR HOMES and this removed the
 * last one that rendered.** The others are the eyebrows and page labels, the
 * /solutions rail and diagrams, and the CTA band's chip; /customers draws its
 * grid with `CaseStudyTile`, which never carried a pill. So the accent is now
 * eyebrows and the CTA chip on this page. That is a real change to the list in
 * AGENTS.md, not an oversight — do not reintroduce a pill here to "restore"
 * it.
 *
 * `SectionHeading` is deliberately not used: it pairs a title with a lede and
 * has no slot for a subtitle, and adding one would be dead weight in the six
 * other blocks that share it. The heading is spelled out with the same
 * `display` rung it renders — as an `h3`, because the section's own name is
 * the `h2` above the track now.
 */
function Study({
  study,
  voice,
  index,
  slides,
}: {
  study: CaseStudy;
  voice: Testimonial;
  index: number;
  slides: readonly CaseStudy[];
}) {
  return (
    <article
      id={slideId(study.slug)}
      className="case-slide"
      // `role="group"` + `aria-roledescription` is the ARIA pattern for a
      // slide, and it is the only part of the carousel pattern this section
      // can hold: marking the off-screen slide `inert` needs an active index,
      // which needs state, which would take the whole block client-side. The
      // labelled boundary is what a screen reader gets instead.
      role="group"
      aria-roledescription="slide"
      aria-label={`Case study ${index + 1} of ${slides.length}: ${study.name}`}
    >
      <Controls index={index} slides={slides} />

      <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center lg:gap-16">
        {/* A PORTRAIT AND A MARK CANNOT SHARE A TREATMENT, and at this size
            the difference is not subtle. A photograph fills the frame
            (`cover`, no inset, cropped to the rounded ground) — Ramses'
            portrait is a square 800px source, so the square frame crops
            nothing. A mark is white-on-transparent artwork with its own
            margins baked in, so it has to be `contain`, sit ON a plate rather
            than be cropped to it, and carry `logo-mark` in case this section
            ever becomes a light band. `p-20` keeps the drawn mark inside its
            320px source width rather than upscaling it. */}
        <div
          className={`relative aspect-square overflow-hidden rounded-lg ${
            voice.logo ? "border border-line bg-card" : ""
          }`}
        >
          <Image
            src={voice.photo}
            alt={voice.name ? `${voice.name}, ${voice.company}` : voice.company}
            fill
            sizes="(max-width: 1023px) 100vw, 42vw"
            className={
              voice.logo ? "logo-mark object-contain p-20" : "object-cover"
            }
          />
        </div>

        <div>
          <h3 className="display text-[clamp(2rem,3.4vw,3rem)] text-balance">
            {voice.title}
          </h3>

          {/* The client line, directly under the headline it belongs to: the
              headline says what closed and how fast, this says who for. */}
          <p className="mt-5 max-w-lg text-[0.9375rem] leading-relaxed text-fg-muted">
            {voice.subject}
          </p>

          {/* THE CATEGORY IS A TAG, NOT AN EYEBROW. It wore `eyebrow` inside
              the card until 9 Sep 2026, which set it in the accent — small
              uppercase accent type reads as a link, and this one goes
              nowhere. Outlined and muted, it reads as what it is: a
              classification. It is also the only field left that this slide
              still takes from the case-study record rather than from the
              testimonial, which is what keeps the two pages agreeing on how a
              client is filed. */}
          <p className="mt-7 inline-block rounded-full border border-line px-3 py-1 text-[0.6875rem] font-medium tracking-[0.08em] text-fg-muted uppercase">
            {study.category}
          </p>

          {/* The rule is what says "same claim, different voice": above it our
              headline, below it the client's own words. */}
          <figure className="mt-8 border-t border-line pt-8">
            {/* No `text-balance` here, unlike the headings: the quotes run
                four and five lines, and balancing pulls every one of them
                ~100px short of the measure to even out the last. That is
                right for a two-line display line and wrong for a paragraph. */}
            <blockquote className="text-[clamp(1rem,1.35vw,1.1875rem)] leading-relaxed">
              {voice.quote.map((para, i) => (
                // A multi-paragraph quotation OPENS on every paragraph and
                // CLOSES only on the last — the open mark is what tells a
                // reader the new paragraph is still the client talking. It
                // opened once and closed once until 9 Sep 2026, which read as
                // a quote that had been left hanging.
                <p key={para} className={i === 0 ? "" : "mt-4"}>
                  &ldquo;{para}
                  {i === voice.quote.length - 1 && <>&rdquo;</>}
                </p>
              ))}
            </blockquote>

            {/* NAME AND ROLE ARE OPTIONAL and the caption falls back to the
                company alone. Nobody Studios' words are the firm's own
                positioning rather than a person's, so that slide has no
                speaker and its picture is the mark. Do not invent one to even
                the two out. There is no avatar here any more — the picture
                filling the left column is the same image it used to hold. */}
            <figcaption className="mt-6">
              {/* `not-italic` is not cosmetic — `cite` defaults to italic and
                  this build of Satoshi has no italic axis, so the browser
                  would synthesise a fake slant. See AGENTS.md. */}
              <cite className="font-medium not-italic">
                {voice.name ?? voice.company}
              </cite>
              {voice.role && (
                <p className="mt-0.5 text-sm text-fg-muted">{voice.role}</p>
              )}
            </figcaption>
          </figure>
        </div>
      </div>
    </article>
  );
}

/**
 * Homepage: the selected case studies, one at a time, then a click through to
 * the rest.
 *
 * It showed one study until 8 Sep 2026 and then two stacked; they are a
 * CAROUSEL now, so only Neurable is on screen and Nobody Studios is a swipe,
 * an arrow key, a dot or a button away. `featuredCaseStudies` in
 * content/case-studies.ts decides how many and in what order — the first entry
 * is the one that shows — and `caseTestimonials` has to gain a matching slug
 * for each.
 *
 * The container is a `region` with an explicit `tabIndex`: browsers make a
 * scrollable box keyboard-reachable on their own, but only an announced,
 * labelled one tells a screen-reader user what they have arrived in. The
 * A focused scroll container is also supposed to take Left/Right arrow keys
 * natively, which the mandatory snap would turn into a slide change — but that
 * could not be confirmed under browser automation, so do not describe it as a
 * feature. A real key handler would have to sit on the track, which wraps
 * every slide, and would take the whole section client-side.
 *
 * The section's own name is the `h2`; the two study headlines are `h3`s under
 * it. It was the other way round — an unheaded `eyebrow` div over two `h2`s —
 * which left the studies hanging off nothing in the document outline.
 */
export function FeaturedCaseStudy() {
  return (
    <section className="section-y border-t border-line-soft">
      <div className="shell">
        <h2 className="eyebrow mb-5">{caseStudySection.eyebrow}</h2>
        <p className="max-w-2xl text-[18px] leading-[27px] text-fg-muted">
          {caseStudySection.lede}
        </p>

        <div
          className="case-carousel mt-12"
          role="region"
          aria-roledescription="carousel"
          aria-label={caseStudySection.carouselLabel}
          tabIndex={0}
        >
          {featuredCaseStudies.map((study, i) => (
            <Study
              key={study.slug}
              study={study}
              voice={
                caseTestimonials[study.slug as keyof typeof caseTestimonials]
              }
              index={i}
              slides={featuredCaseStudies}
            />
          ))}
        </div>

        <div className="mt-10">
          <CtaButton href="/customers" variant="ghost">
            {caseStudySection.cta}
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
