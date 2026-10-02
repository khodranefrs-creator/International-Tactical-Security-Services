import { Section } from '@/components/layout';
import { Reveal } from '@/components/reveal';
import { ContactForm } from '@/components/contact-form';
import { primaryPhone, tollFreePhone, mailtoHref } from '@/lib/contact';
import { site } from '@/content/site';

/**
 * Closing conversion section.
 *
 * The form sits on the homepage so a visitor can enquire without navigating
 * anywhere else. Direct phone, toll-free and email options sit beside it, and
 * both published addresses are repeated here so nothing needs to be hunted for.
 */
export function ContactConversion() {
  return (
    <Section tone="navy-deep" labelledBy="contact-heading">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Editorial + direct contact routes */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="t-eyebrow flex items-center gap-3 text-brass">
                <span aria-hidden="true" className="h-px w-7 bg-brass" />
                Get in touch
              </p>
              <h2 id="contact-heading" className="t-h2 mt-7 text-ivory">
                Let’s discuss your security requirements.
              </h2>
              <p className="t-lead mt-6 text-ivory/70">
                Tell us about the site, the hours you need covered, and what you are
                concerned about. We’ll come back with a plan and a price.
              </p>
            </Reveal>

            <Reveal delay={1}>
              <dl className="mt-12 border-t border-navy-line">
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-navy-line py-5">
                  <dt className="t-meta uppercase tracking-[0.13em] text-ivory/45">Direct</dt>
                  <dd>
                    <a
                      href={primaryPhone.href}
                      className="text-[1.25rem] text-ivory transition-colors hover:text-brass"
                    >
                      {primaryPhone.label}
                    </a>
                  </dd>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-navy-line py-5">
                  <dt className="t-meta uppercase tracking-[0.13em] text-ivory/45">Toll free</dt>
                  <dd>
                    <a
                      href={tollFreePhone.href}
                      className="text-[1.25rem] text-ivory transition-colors hover:text-brass"
                    >
                      {tollFreePhone.label}
                    </a>
                  </dd>
                </div>
                <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-navy-line py-5">
                  <dt className="t-meta uppercase tracking-[0.13em] text-ivory/45">Email</dt>
                  <dd className="max-w-full break-all text-right text-[0.9375rem]">
                    <a
                      href={mailtoHref}
                      className="text-ivory transition-colors hover:text-brass"
                    >
                      {site.email}
                    </a>
                  </dd>
                </div>
                {site.locations.map((loc) => (
                  <div
                    key={loc.region}
                    className="flex flex-wrap items-baseline justify-between gap-3 border-b border-navy-line py-5"
                  >
                    <dt className="t-meta uppercase tracking-[0.13em] text-ivory/45">
                      {loc.city}
                    </dt>
                    <dd>
                      <a
                        href={loc.mapHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[0.9375rem] text-ivory transition-colors hover:text-brass"
                      >
                        {loc.street}, {loc.city}, {loc.state} {loc.postal}
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* The form */}
          <Reveal delay={2} className="lg:col-span-7">
            <div className="bg-ivory p-6 sm:p-9 lg:p-11">
              <p className="t-eyebrow text-navy/45">Send an enquiry</p>
              <h3 className="t-h3 mt-4 text-navy">Request security services</h3>
              <div className="mt-8">
                <ContactForm source="homepage" tone="light" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}