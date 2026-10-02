import Link from 'next/link';
import { Logo } from '@/components/logo';
import { ActionLink, ArrowGlyph } from '@/components/action';
import { site, primaryCta } from '@/content/site';
import { services, serviceHref } from '@/content/services';
import { primaryPhone, tollFreePhone, mailtoHref } from '@/lib/contact';

const year = new Date().getFullYear();

export function SiteFooter() {
  return (
    <footer className="on-navy bg-navy text-ivory/70">
      {/* Closing call to action */}
      <div className="border-b border-navy-line">
        <div className="mx-auto flex max-w-[82.5rem] flex-col gap-8 px-gutter py-16 md:flex-row md:items-end md:justify-between md:gap-16 md:py-20">
          <div className="max-w-xl">
            <p className="t-eyebrow flex items-center gap-3 text-brass">
              <span aria-hidden="true" className="h-px w-7 bg-brass" />
              Let’s connect
            </p>
            <h2 className="t-h2 mt-6 text-ivory">
              Tell us what you need protected.
            </h2>
            <p className="t-lead mt-5 text-ivory/65">
              No matter the security services needed, we have your back. Call the office, send
              an email, or send a note through the contact form — whichever is quickest for you.
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <ActionLink href={primaryCta.href} tone="brass" size="md">
              Request Security Services <ArrowGlyph />
            </ActionLink>
            <ActionLink href={primaryPhone.href} tone="outline-light" size="md">
              {primaryPhone.label}
            </ActionLink>
          </div>
        </div>
      </div>

      {/* Directory */}
      <div className="mx-auto max-w-[82.5rem] px-gutter py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4">
            <Link href="/" className="inline-block">
              <Logo tone="dark" size="footer" />
            </Link>
            <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed">
              Family-owned and operated private security for commercial businesses, retail
              establishments, banks, events and private individuals across the Portland and
              Vancouver area.
            </p>
            <p className="t-meta mt-6 uppercase tracking-[0.14em] text-brass">
              Your security is our business
            </p>
          </div>

          <nav aria-label="Footer services" className="md:col-span-3">
            <h3 className="t-eyebrow text-ivory/40">Services</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={serviceHref(s.slug)}
                    className="text-[0.9375rem] transition-colors hover:text-brass"
                  >
                    {s.navLabel}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer explore" className="md:col-span-2">
            <h3 className="t-eyebrow text-ivory/40">Explore</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'All services', href: '/services/' },
                { label: 'About us', href: '/about-us/' },
                { label: 'FAQ', href: '/faq/' },
                { label: 'Blog', href: '/blog/' },
                { label: 'Security jobs', href: '/security-jobs-oregon-washington/' },
                { label: 'Contact', href: '/contact/' },
                { label: 'Sitemap', href: '/sitemap/' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-[0.9375rem] transition-colors hover:text-brass"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h3 className="t-eyebrow text-ivory/40">Contact</h3>
            <ul className="mt-5 flex flex-col gap-5">
              <li>
                <a
                  href={primaryPhone.href}
                  className="t-meta block uppercase tracking-[0.12em] text-ivory/45"
                >
                  Direct
                </a>
                <a
                  href={primaryPhone.href}
                  className="mt-1 block text-[1.0625rem] text-ivory transition-colors hover:text-brass"
                >
                  {primaryPhone.label}
                </a>
              </li>
              <li>
                <a
                  href={tollFreePhone.href}
                  className="t-meta block uppercase tracking-[0.12em] text-ivory/45"
                >
                  Toll free
                </a>
                <a
                  href={tollFreePhone.href}
                  className="mt-1 block text-[1.0625rem] text-ivory transition-colors hover:text-brass"
                >
                  {tollFreePhone.label}
                </a>
              </li>
              <li>
                <span className="t-meta block uppercase tracking-[0.12em] text-ivory/45">
                  Email
                </span>
                <a
                  href={mailtoHref}
                  className="mt-1 block break-words text-[0.9375rem] text-ivory transition-colors hover:text-brass"
                >
                  {site.email}
                </a>
              </li>
            </ul>

            <h3 className="t-eyebrow mt-9 text-ivory/40">Locations</h3>
            <ul className="mt-5 flex flex-col gap-4">
              {site.locations.map((loc) => (
                <li key={loc.region}>
                  <a
                    href={loc.mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block text-[0.9375rem] leading-relaxed transition-colors hover:text-brass"
                  >
                    {loc.street}
                    <br />
                    <span className="text-ivory/55">
                      {loc.city}, {loc.state} {loc.postal}
                    </span>
                    <span className="t-meta mt-1 block uppercase tracking-[0.12em] text-brass/70 opacity-0 transition-opacity group-hover:opacity-100">
                      View map
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-navy-line">
        <div className="mx-auto flex max-w-[82.5rem] flex-col gap-3 px-gutter py-7 text-[0.8125rem] sm:flex-row sm:items-center sm:justify-between">
          <p>
            Copyright {year} {site.name}
          </p>
          <p className="text-ivory/45">
            Licensed in Oregon and Washington. Serving {site.serviceArea}.
          </p>
        </div>
      </div>
    </footer>
  );
}