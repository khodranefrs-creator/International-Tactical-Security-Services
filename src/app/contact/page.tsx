import type { Metadata } from 'next';
import { PageHero, ClosingCta } from '@/components/page-hero';
import { Section } from '@/components/layout';
import { Reveal } from '@/components/reveal';
import { ContactForm } from '@/components/contact-form';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact Us | Portland OR & Vancouver WA Security Company',
  description:
    'Contact International Tactical Security Services. Offices in Vancouver WA and Portland OR. Call 503-753-8599 or send an enquiry — we respond fast.',
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what needs protecting."
        standfirst="Two offices, one team, and a phone that a person picks up. Send the details below or call — whichever is easier."
      />

      <Section tone="white">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Details first in the DOM so they are reachable before the form,
                and visible on mobile where scrolling past a long form is a tax. */}
            <div className="lg:col-span-5">
              <Reveal>
                <h2 className="t-h3">Reach us directly</h2>
                <p className="mt-5 text-[1rem] leading-[1.75] text-ink-muted">
                  We cover {site.serviceArea}. If your site is outside that area, call first and we
                  will tell you honestly whether we can help.
                </p>
              </Reveal>

              <Reveal delay={1}>
                <div className="mt-10 border-t border-rule">
                  {site.phones.map((p) => (
                    <div key={p.href} className="border-b border-rule py-6">
                      <a
                        href={p.href}
                        className="font-display text-[1.5rem] font-medium leading-none text-navy transition-colors hover:text-brass-deep"
                      >
                        {p.label}
                      </a>
                      <p className="t-meta mt-2.5 uppercase tracking-[0.12em] text-ink-faint">
                        {p.role}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={2}>
                <div className="border-b border-rule py-6">
                  <a
                    href={`mailto:${site.email}`}
                    className="break-words font-display text-[1.125rem] font-medium leading-snug text-navy transition-colors hover:text-brass-deep"
                  >
                    {site.email}
                  </a>
                  <p className="t-meta mt-2.5 uppercase tracking-[0.12em] text-ink-faint">Email</p>
                </div>
              </Reveal>

              <Reveal delay={3}>
                <dl className="mt-10 flex flex-col gap-8">
                  {site.locations.map((l) => (
                    <div key={l.city}>
                      <dt className="t-eyebrow text-brass-deep">{l.region}</dt>
                      <dd className="mt-3 text-[0.9375rem] leading-relaxed text-ink">
                        {l.street}
                        <br />
                        {l.city}, {l.state} {l.postal}
                        <a
                          href={l.mapHref}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="t-meta ml-4 inline-flex items-center gap-2 uppercase tracking-[0.12em] text-navy hover:text-brass-deep"
                        >
                          Map
                          <span aria-hidden="true">↗</span>
                        </a>
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={4}>
                <p className="mt-10 border-l-2 border-brass pl-5 text-[0.875rem] leading-relaxed text-ink-faint">
                  Need help right now? Call {site.phones[0].label}. For emergencies involving an
                  immediate threat, contact law enforcement first and then tell us what happened.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <div className="border border-rule bg-ivory p-7 lg:p-11">
                <ContactForm source="contact-page" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      <ClosingCta
        heading="Not sure which service you need?"
        body="Start with a description of the site and the problem. We will tell you which service fits, and what it would take."
      />
    </>
  );
}