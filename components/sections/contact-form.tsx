"use client";

import { useEffect, useRef, useState } from "react";
import { CtaButton, CtaSubmit } from "@/components/ui/button";
import { contact, questions } from "@/content/contact";
import { site } from "@/content/copy";

/**
 * The nine-step qualification questionnaire on /get-in-touch.
 *
 * THE FOURTH CLIENT COMPONENT, and the first one whose state is its own. The
 * other three read EXTERNAL state — scroll offset, reduced-motion, a route
 * change — which is why the repo's rule is `useSyncExternalStore` rather than
 * `useState` + `useEffect`. Nothing here is external: the step and the answers
 * exist only inside this form, so plain `useState` is correct and the
 * `react-hooks/set-state-in-effect` rule this repo enforces is not in play.
 * The one effect below moves FOCUS and sets no state.
 *
 * IT DOES NOT SUBMIT ANYWHERE. `send()` validates, logs and shows the success
 * panel. There is no route handler, no email service, no third-party endpoint
 * — that was a deliberate decision so the flow could be seen and approved
 * before a destination is chosen. The TODO is on `send()`.
 *
 * One question per step, because nine fields on one screen is a wall and the
 * last four are the qualifying ones we actually need answered. Choosing an
 * option advances — EXCEPT on the last question, where it only selects. Ending
 * a form by submitting the instant someone touches the ninth option gives them
 * no moment to change their mind, so the final step keeps a deliberate button.
 */

/** Deliberately loose. Real addresses fail strict patterns far more often than
 *  fake ones pass a loose one, and the only cost of a bad address here is a
 *  bounced reply. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LETTERS = "ABCDEFGH";

function isAnswered(value: string, kind: string) {
  const v = value.trim();
  if (!v) return false;
  return kind === "email" ? EMAIL.test(v) : true;
}

export function ContactForm() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const headingRef = useRef<HTMLParagraphElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);

  // Move focus when the step changes. Without this, focus sits on an option
  // button that has just unmounted, falls back to <body>, and drops a keyboard
  // user at the top of the document mid-form.
  //
  // ONE target per step, decided here rather than with `autoFocus`. An
  // `autoFocus` on the input would be applied during commit and then
  // immediately overridden by this effect, so the caret would land in the
  // field and be taken straight back out again. A text step focuses its input;
  // a choice step focuses the count line, which is `aria-live` and sits
  // directly above the question, so the next Tab reaches the first option.
  //
  // Sets no state, and skips the first render so loading the page does not
  // yank focus — and the scroll position with it — into the card.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    (inputRef.current ?? headingRef.current)?.focus();
  }, [step, sent]);

  const total = questions.length;
  const q = questions[step]!;
  const value = answers[q.id] ?? "";
  const last = step === total - 1;
  const answered = isAnswered(value, q.kind);

  function set(id: string, v: string) {
    setAnswers((a) => ({ ...a, [id]: v }));
    setError(null);
  }

  function send() {
    const missing = questions.find(
      (x) => !isAnswered(answers[x.id] ?? "", x.kind),
    );
    if (missing) {
      setStep(questions.indexOf(missing));
      setError("This one still needs an answer.");
      return;
    }
    // TODO(miguel): this is where the submission goes. Nothing is sent today —
    // see the header of content/contact.ts. Whatever lands here must NOT put
    // these answers in a URL; they include a name and an email address.
    console.info("[get-in-touch] submission (not sent anywhere yet)", answers);
    setSent(true);
  }

  function next() {
    if (!answered) {
      setError(
        q.kind === "email"
          ? "That does not look like an email address."
          : "This one still needs an answer.",
      );
      return;
    }
    if (last) send();
    else setStep((s) => s + 1);
  }

  if (sent) {
    return (
      <div
        data-band="light"
        className="flex min-h-[460px] flex-col justify-center border border-line bg-card p-8 sm:p-10"
      >
        <p
          ref={headingRef}
          tabIndex={-1}
          className="display text-[28px] leading-tight outline-none"
        >
          {contact.done.title}
        </p>
        <p className="mt-5 max-w-[46ch] text-[16px] leading-6 text-fg-muted">
          {contact.done.body}
        </p>
        <div className="mt-10">
          <CtaButton href={site.booking} target="_blank" rel="noreferrer">
            {contact.done.bookLabel}
          </CtaButton>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        next();
      }}
      data-band="light"
      className="flex min-h-[460px] flex-col justify-center border border-line bg-card p-8 sm:p-10"
    >
      {/* Count and progress. The total is read from the array rather than
          typed, so the label cannot drift from the number of steps. */}
      <p
        ref={headingRef}
        tabIndex={-1}
        aria-live="polite"
        className="page-label text-fg-faint outline-none"
      >
        Question {step + 1} of {total}
      </p>
      <div aria-hidden className="mt-4 h-px w-full bg-line">
        <div
          className="h-px bg-accent transition-[width] duration-300"
          style={{ width: `${((step + 1) / total) * 100}%` }}
        />
      </div>

      <h2 id={`q-${q.id}`} className="display mt-7 text-[28px] leading-tight">
        {q.label}
      </h2>
      {q.kind === "choice" && (
        <p className="mt-2.5 text-sm text-fg-muted">{contact.hint}</p>
      )}

      <div className="mt-7">
        {q.kind === "choice" ? (
          <div
            role="group"
            aria-labelledby={`q-${q.id}`}
            className="flex flex-col gap-2"
          >
            {q.options.map((opt, i) => {
              const on = value === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    set(q.id, opt);
                    // The last question only selects — see the note above.
                    if (!last) setStep((s) => s + 1);
                  }}
                  className={`flex items-center gap-3.5 border px-4 py-3.5 text-left text-[15px] leading-5 transition-colors duration-150 ${
                    on
                      ? "border-fg bg-fg text-ground"
                      : "border-line hover:border-fg/25 hover:bg-fg/[0.03]"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`flex h-6 w-6 shrink-0 items-center justify-center border text-[11px] font-medium ${
                      on
                        ? "border-ground/30 text-ground"
                        : "border-line text-fg-faint"
                    }`}
                  >
                    {LETTERS[i]}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
        ) : (
          <>
            <label htmlFor={q.id} className="sr-only">
              {q.label}
            </label>
            <input
              ref={inputRef}
              id={q.id}
              name={q.id}
              type={q.kind === "email" ? "email" : "text"}
              inputMode={q.kind === "email" ? "email" : undefined}
              autoComplete={
                q.id === "name"
                  ? "name"
                  : q.id === "email"
                    ? "email"
                    : "organization"
              }
              placeholder={q.placeholder}
              value={value}
              onChange={(e) => set(q.id, e.target.value)}
              className="w-full border border-line bg-ground px-4 py-3.5 text-[16px] leading-5 outline-none transition-colors placeholder:text-fg-faint focus:border-fg/40"
            />
          </>
        )}
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm text-fg-muted">
          {error}
        </p>
      )}

      {/* Sits directly under the question, and the whole stack is centred in
          the card (`justify-center` above) rather than pinned to its foot.
          A `mt-auto` here holds the button at a constant height, which sounds
          better and looks worse: a one-field step then leaves the button
          marooned under a third of a card of nothing. Centring spends the same
          slack as symmetric padding, so a short step reads as a short step. */}
      <div className="flex items-center gap-5 pt-9">
        <CtaSubmit type="submit">{last ? contact.submit : "Next"}</CtaSubmit>

        {step > 0 && (
          <button
            type="button"
            onClick={() => {
              setStep((s) => s - 1);
              setError(null);
            }}
            className="text-sm text-fg-muted underline-offset-4 transition-colors hover:text-fg hover:underline"
          >
            Back
          </button>
        )}
      </div>
    </form>
  );
}
