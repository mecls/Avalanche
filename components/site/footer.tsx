import Link from "next/link";
import { legal, nav, site } from "@/content/copy";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ground-alt">
      <div className="shell py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="display text-3xl">
              {site.name}
              <span className="text-fg-faint">.</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-fg-muted">
              {site.tagline}. {site.description}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow mb-4">Overview</p>
            <ul className="space-y-2.5 text-sm text-fg-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-fg">
                  Home
                </Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-fg"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow mb-4">Get in touch</p>
            <ul className="space-y-2.5 text-sm text-fg-muted">
              <li>
                <Link
                  href="/get-in-touch"
                  className="transition-colors hover:text-fg"
                >
                  Book an intro call
                </Link>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-fg"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-8">
          {/* TODO(miguel): replace with disclaimer text from counsel. */}
          <div className="space-y-3 text-[0.6875rem] leading-relaxed text-fg-faint">
            {legal.split("\n\n").map((para) => (
              <p key={para.slice(0, 32)}>{para}</p>
            ))}
          </div>
          <p className="mt-8 text-[0.6875rem] text-fg-faint">
            © {new Date().getFullYear()} {site.entity}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
