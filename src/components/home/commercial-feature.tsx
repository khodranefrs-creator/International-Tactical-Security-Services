import Image from 'next/image';
import { Section, SectionHead } from '@/components/layout';
import { Reveal } from '@/components/reveal';
import { ActionLink, ArrowGlyph } from '@/components/action';
import { aboutBlock, overview, valuePoints } from '@/content/copy';
import { site } from '@/content/site';

/**
 * Commercial / business feature.
 *
 * Organises only what the current site actually states about commercial work:
 * premises protection, retail coverage, mobile patrol, fire watch and alarm
 * response, working alongside in-house security and management, and helping
 * build an emergency response plan. No response times, incident statistics,
 * contract terms or outcome claims have been added.
 */
const commercialThemes = [
  {
    heading: 'Protecting the premises',
    text: 'Coverage for commercial businesses and property, day and night, armed or unarmed.',
  },
  {
    heading: 'Mobile patrol as a deterrent',
    text: 'Mobile patrols act as a deterrent to crime, and are highly trained and qualified in all aspects of law enforcement.',
  },
  {
    heading: 'Fire watch and alarm response',
    text: 'Fire watch and alarm response for your business, around the clock, at a competitive price.',
  },
  {
    heading: 'Planning alongside your team',
    text: 'We assist your in-house security or management team in creating an effective emergency response plan and evaluating your business for potential security vulnerabilities.',
  },
];

export function CommercialFeature() {
  return (
    <Section tone="ivory" labelledBy="commercial-heading">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Text column */}
          <div className="lg:col-span-5">
            <SectionHead
              eyebrow="For businesses"
              title={
                <span id="commercial-heading">
                  Security that understands how your business actually operates
                </span>
              }
            />

            <div className="mt-8 space-y-5 text-[0.975rem] leading-[1.75] text-ink">
              <p>{aboutBlock.paragraphs[0]}</p>
              <p>{aboutBlock.paragraphs[1]}</p>
            </div>

            <dl className="mt-10 border-t border-rule">
              {commercialThemes.map((t) => (
                <div key={t.heading} className="border-b border-rule py-5">
                  <dt className="t-meta uppercase tracking-[0.13em] text-navy/55">
                    {t.heading}
                  </dt>
                  <dd className="mt-2 text-[0.9375rem] leading-relaxed text-ink-muted">
                    {t.text}
                  </dd>
                </div>
              ))}
            </dl>

            <ActionLink href="/contact/" tone="navy" size="lg" className="mt-10">
              Talk to us about your site <ArrowGlyph />
            </ActionLink>
          </div>

          {/* Image column — stacked, offset, different aspect from the hero */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[3/4] lg:aspect-[4/5]">
                <Image
                  src="/media/hero/officer-coffee.jpg"
                  alt="Uniformed security officer on site during a shift"
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </Reveal>

            <Reveal delay={2} className="mt-8">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="/media/hero/security-officer-radio.jpg"
                  alt="Security officer using a two-way radio while on patrol"
                  fill
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </Reveal>

            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-rule pt-8 sm:grid-cols-3">
              {valuePoints.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[0.875rem] text-ink">
                  <span aria-hidden="true" className="mt-2 h-px w-3.5 shrink-0 bg-brass" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Overview — the site's own long-form positioning statement */}
        <Reveal className="mt-20 border-t border-rule pt-14 md:mt-28 md:pt-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="t-eyebrow flex items-center gap-3 text-navy/50">
                <span aria-hidden="true" className="h-px w-7 bg-brass" />
                Who we are
              </p>
              <h3 className="t-h3 mt-6">{overview.heading}</h3>
              <p className="t-meta mt-6 uppercase tracking-[0.12em] text-ink-muted">
                Serving {site.serviceArea}
              </p>
            </div>
            <div className="space-y-5 text-[0.975rem] leading-[1.75] text-ink lg:col-span-8">
              {overview.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}