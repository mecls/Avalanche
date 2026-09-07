import type { Metadata } from "next";
import Link from "next/link";
import { CtaSubmit } from "@/components/ui/button";
import { login } from "@/content/login";

export const metadata: Metadata = {
  title: "Log in",
  description: "Client portal sign-in for Avalanche Capital.",
  /**
   * NOINDEX, and it should stay that way once the portal is real. There is
   * nothing here for a search engine either way — today because the form is
   * inert, later because a sign-in screen is not a landing page — and a
   * half-built portal door showing up in results is worse than not existing.
   */
  robots: { index: false, follow: true },
};

/**
 * /login — the client portal sign-in screen. **IT IS A SHELL.**
 *
 * There is no authentication anywhere in this repo: no provider, no session,
 * no route handler, no user store. The route exists because the nav's new
 * "Log in" needed somewhere real to point, and the screen exists so the
 * layout can be approved before an auth provider is chosen. That is the same
 * order the /get-in-touch questionnaire was built in.
 *
 * **THE FIELDS ARE `disabled` ON PURPOSE.** An enabled login form with nothing
 * behind it invites someone to type a real password into a page that cannot do
 * anything with it, and invites their password manager to save it against this
 * origin. Disabled costs nothing to undo and is the only honest state while
 * `<form>` has no action. `login.notice` says the same thing in words, right
 * above the fields — keep both, and remove them in the same change that adds
 * real auth, not before.
 *
 * **WHEN THIS IS WIRED UP:** the form must POST to a real auth endpoint.
 * Credentials must never travel in a URL — not as a query string, not as a
 * fragment, not via a GET form action, which is what a `<form>` with no
 * `method` silently does. Same rule the questionnaire's `send()` carries for
 * its name and email, and it matters more here. Server Action or route
 * handler, over HTTPS, and nothing about the submission in the address bar.
 *
 * It is NOT `components/site/page-header.tsx`. That component is one
 * composition — label, 72px H1, lede, and a CTA bottom-right on an `items-end`
 * row — and this page is a narrow centred column with no header CTA. The type
 * utilities are the same ones by hand, so the two still read as one system.
 *
 * **The full-height centre is justified here and was not on /customers.** That
 * page dropped its `min-h-[calc(100dvh-var(--header-h))]` because it left a
 * ~950px band with the entire right half empty, opposite a left-aligned
 * heading. Nothing is opposite anything here: the column is centred on both
 * axes, so the space around it is the composition rather than a gap in it.
 *
 * `data-band="light"` and the FIRST child of `main`, like every other
 * light-opening route — the two `:has()` rules in globals.css key off
 * `main > :first-child[data-band="light"]` to flip the nav to ink and paint
 * `main` white, and they break together.
 */
export default function LoginPage() {
  return (
    <section
      data-band="light"
      className="flex min-h-[calc(100dvh-var(--header-h))] items-center justify-center py-20"
    >
      <div className="shell">
        <div className="mx-auto w-full max-w-[400px]">
          <p className="page-label text-accent">{login.label}</p>

          <h1 className="display mt-4 text-[40px] leading-[1.05]">
            {login.title}
          </h1>

          <p className="mt-4 text-[16px] leading-6 text-fg-muted">
            {login.lede}
          </p>

          {/* The state of the page, in words, above the thing it describes.
              `bg-ground-alt` rather than the accent or a warning colour: this
              is a note about readiness, not an error, and the accent's four
              places do not include it. */}
          <p className="mt-8 border border-line bg-ground-alt p-4 text-sm leading-relaxed text-fg-muted">
            {login.notice}
          </p>

          {/* No `action` and no `method` yet — see the header before adding
              either. Every control is disabled, so nothing here can submit:
              a disabled field cannot take focus, which also rules out an
              Enter-key submission to the current URL. */}
          <form className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm leading-5 text-fg-muted"
              >
                {login.email.label}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={login.email.placeholder}
                disabled
                className="w-full border border-line bg-ground px-4 py-3.5 text-[16px] leading-5 outline-none transition-colors placeholder:text-fg-faint focus:border-fg/40 disabled:cursor-not-allowed disabled:opacity-55"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="password"
                className="text-sm leading-5 text-fg-muted"
              >
                {login.password.label}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder={login.password.placeholder}
                disabled
                className="w-full border border-line bg-ground px-4 py-3.5 text-[16px] leading-5 outline-none transition-colors placeholder:text-fg-faint focus:border-fg/40 disabled:cursor-not-allowed disabled:opacity-55"
              />
            </div>

            {/* `CtaSubmit`, not `CtaButton` — a real <button type="submit">.
                An anchor here would break Enter-to-submit and middle-click and
                would put a bogus destination in the DOM. It already carries
                `disabled:pointer-events-none disabled:opacity-40`. */}
            <CtaSubmit type="submit" disabled className="mt-2 w-full">
              {login.submit}
            </CtaSubmit>
          </form>

          {/* Not a link. There is no reset flow to link to, and an anchor to
              nowhere is worse than plain text — it promises a page. It becomes
              a <Link> in the same change that builds one. */}
          <p className="mt-6 text-sm leading-5 text-fg-faint">{login.forgot}</p>

          <p className="mt-8 border-t border-line pt-6 text-sm leading-5 text-fg-muted">
            {login.noAccount}{" "}
            <Link
              href="/get-in-touch"
              className="text-fg underline underline-offset-4 transition-colors hover:text-fg-muted"
            >
              {login.noAccountCta}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
