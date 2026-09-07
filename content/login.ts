/**
 * /login — the client portal sign-in page.
 *
 * EVERY STRING HERE IS DRAFT and the page behind them is a SHELL. There is no
 * authentication anywhere in this repo: no provider, no session, no route
 * handler, no user store. The route exists because the nav needed somewhere
 * real to point, and the layout exists so the thing can be approved before an
 * auth provider is chosen — the same way the questionnaire on /get-in-touch
 * was built and reviewed before it had a destination.
 *
 * **`notice` IS NOT DECORATION AND MUST NOT BE REMOVED WHILE THE FORM IS
 * INERT.** The fields are `disabled`, which stops anyone typing a real
 * password into something that goes nowhere, and this line is what says so in
 * words. Delete it only in the same change that wires up real auth; a
 * working-looking login form with nothing behind it is the one state this page
 * must never be in.
 */

export const login = {
  // DRAFT
  label: "Client portal",
  // DRAFT
  title: "Log in",
  // DRAFT
  lede: "Access live mandate documents, investor pipeline and meeting notes.",
  /** See the header. Ships until auth does. */
  // DRAFT
  notice:
    "The portal is not open yet. This page is the sign-in screen in preview — the fields are disabled and nothing is submitted or stored.",

  email: {
    label: "Email",
    placeholder: "you@company.com",
  },
  password: {
    label: "Password",
    placeholder: "••••••••",
  },

  // DRAFT
  submit: "Log in",
  // DRAFT
  forgot: "Forgot your password?",
  // DRAFT
  noAccount: "Don't have access yet?",
  // DRAFT
  noAccountCta: "Get in touch",
} as const;
