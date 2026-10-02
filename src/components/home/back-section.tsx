import { Section, SectionHead } from '@/components/layout';
import { Reveal } from '@/components/reveal';
import { ActionLink, ArrowGlyph } from '@/components/action';
import { reasons } from '@/content/copy';
import { site } from '@/content/site';

/**
 * "We HAVE your BACK" — this is where the homepage's "32+ Years of Combined
 * Security Experience" figure lives, in the same position and the same wording
 * as on the live site. It is not repeated elsewhere and is not combined with
 * the site's other experience statements, which remain in their own contexts
 * (the 27-year figure in the overview, "since 2005" in the closing pillars).
 */
const backServices = [
  'Executive Bodyguards',
  'Retail Business Security',
  'Event Security Guards',
  'Fire Watch Security',
  'Mobile Patrols',
  'Bank Security Services',
];

export function BackSection() {
  return (
    <Section tone="ivory-deep" labelledBy="back-heading">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* The experience figure, presented as a single sourced number */}
          <div className="lg:col-span-4">
            <Reveal>
              <div className="border-t-2 border-navy pt-8">
                <p className="t-display text-navy">
                  {site.combinedExperience}
                  <span className="text-brass">+</span>
                </p>
                <p className="t-meta mt-5 uppercase tracking-[0.14em] text-navy/60">
                  {site.combinedExperienceLabel}
                </p>
              </div>

              <p className="mt-10 text-[0.975rem] leading-[1.75] text-ink">
                No one can protect your business and property, like International Tactical
                Security Services! We’re a Portland based Oregon company with over 32 years of
                combined security experience. We standby ready to protect what’s important to
                you. Whether it’s you, your business or an event.
              </p>

              <ActionLink href="/about-us/" tone="outline" size="md" className="mt-8">
                About the company <ArrowGlyph />
              </ActionLink>
            </Reveal>
          </div>

          {/* Why choose us — numbered editorial sequence */}
          <div className="lg:col-span-8">
            <SectionHead
              eyebrow="Why choose us"
              title={<span id="back-heading">Four reasons clients stay with us</span>}
            />

            <ol className="mt-12 border-t border-navy/15">
              {reasons.map((r, i) => (
                <Reveal
                  as="li"
                  key={r.number}
                  delay={(i % 4) as 0 | 1 | 2 | 3}
                  className="border-b border-navy/15"
                >
                  <div className="grid gap-3 py-7 md:grid-cols-12 md:gap-8">
                    <div className="md:col-span-3">
                      <span className="t-meta block text-brass-deep tabular-nums">
                        {r.number}
                      </span>
                    </div>
                    <div className="md:col-span-9">
                      <h3 className="t-h3">{r.heading}</h3>
                      <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-ink-muted">
                        {r.text}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>

            {/* Service scope list, verbatim from the same source block */}
            <Reveal className="mt-12">
              <p className="t-eyebrow text-navy/45">Our Portland based services include</p>
              <ul className="mt-6 grid gap-x-10 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                {backServices.map((s) => (
                  <li key={s} className="flex items-center gap-3 text-[0.9375rem] text-ink">
                    <span aria-hidden="true" className="h-px w-4 shrink-0 bg-brass" />
                    {s}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
