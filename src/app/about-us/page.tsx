import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero, ClosingCta } from '@/components/page-hero';
import { Section } from '@/components/layout';
import { Reveal } from '@/components/reveal';
import { ActionLink, ArrowGlyph } from '@/components/action';
import { aboutBlock, founder, pillars, valuePoints } from '@/content/copy';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'About Us | Family-Owned Security in Oregon & Washington',
  description:
    'International Tactical Security Services is a family-owned and operated private security company serving Portland, Oregon and Vancouver, Washington since 2005.',
  alternates: { canonical: '/about-us/' },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Family owned, and run by people who have done the job."
        standfirst="We are a family-owned and operated private security service in the Portland and Vancouver area. Every guard we place is trained, checked and accountable to us."
        image="/media/hero/about-safety.jpg"
        imageAlt="A security officer standing watch"
      />

      {/* Who we are */}
      <Section tone="white">
        <div className="shell">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-5">
                <p className="t-eyebrow text-brass-deep">{aboutBlock.heading}</p>
              </div>
              <div className="lg:col-span-7">
                {aboutBlock.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="mb-6 text-[1.0625rem] leading-[1.75] text-ink last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Founder — image pulled to the left, breaks the rhythm */}
      <Section tone="ivory">
        <div className="shell">
          <Reveal>
            <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-6">
                <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[4/5]">
                  <Image
                    src="/media/team/mark-richards-headshot.webp"
                    alt="Mark Richards, CEO and Co-Founder of International Tactical Security Services"
                    fill
                    sizes="(min-width: 1024px) 48vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>

              <div className="lg:col-span-6">
                <p className="t-eyebrow text-brass-deep">Founder</p>
                <h2 className="t-h1 mt-6">{founder.name}</h2>
                <p className="t-lead mt-3 text-ink-muted">{founder.role}</p>

                <p className="mt-9 inline-flex items-baseline gap-4 border-y border-rule py-5">
                  <span className="font-display text-[2.5rem] font-medium leading-none text-navy">
                    {founder.heading.replace('32 Years of ', '')}
                  </span>
                  <span className="t-meta uppercase tracking-[0.13em] text-brass-deep">
                    {founder.heading}
                  </span>
                </p>

                {founder.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="mt-6 text-[1rem] leading-[1.75] text-ink">
                    {p}
                  </p>
                ))}

                <ul className="mt-10 grid gap-px border border-rule bg-rule sm:grid-cols-2">
                  {founder.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-center gap-3 bg-ivory px-5 py-4 text-[0.9375rem] text-ink"
                    >
                      <span aria-hidden="true" className="h-px w-4 shrink-0 bg-brass" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Pillars — six items on a ledger grid, not six cards */}
      <Section tone="white">
        <div className="shell">
          <Reveal>
            <p className="t-eyebrow text-brass-deep">How we work</p>
            <h2 className="t-h1 mt-6 max-w-3xl">A security team you can depend on</h2>
          </Reveal>

          <ol className="mt-16 grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal
                as="li"
                key={p.title}
                delay={(i % 3) as 0 | 1 | 2}
                className="border-t border-rule py-8"
              >
                <span className="t-meta block text-brass-deep">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-3 font-display text-[1.25rem] font-medium leading-snug text-navy">
                  {p.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-muted">{p.text}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal>
            <ul className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-3 border-t border-rule pt-8">
              {valuePoints.map((v) => (
                <li
                  key={v}
                  className="t-meta uppercase tracking-[0.12em] text-navy/70 before:mr-3 before:inline-block before:h-1 before:w-1 before:rounded-full before:bg-brass"
                >
                  {v}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Family fact strip */}
      <Section tone="navy">
        <div className="shell">
          <Reveal>
            <dl className="grid gap-px bg-navy-line sm:grid-cols-3">
              {[
                { dt: 'Family owned', dd: 'And operated, since 2005' },
                { dt: site.serviceArea, dd: 'Primary operating area' },
                { dt: 'Licensed', dd: 'Oregon and Washington' },
              ].map((x) => (
                <div key={x.dt} className="bg-navy px-7 py-9">
                  <dt className="font-display text-[1.125rem] leading-snug text-ivory">{x.dt}</dt>
                  <dd className="mt-2 text-[0.875rem] text-ivory/55">{x.dd}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal>
            <div className="mt-14 flex flex-wrap items-center justify-between gap-6">
              <h2 className="t-h3 max-w-lg text-ivory">
                Looking for armed or unarmed officers for a site?
              </h2>
              <ActionLink href="/services/" tone="brass" size="md">
                Browse services <ArrowGlyph />
              </ActionLink>
            </div>
          </Reveal>
        </div>
      </Section>

      <ClosingCta
        heading="Come and meet us."
        body="Two offices, one phone line that a person answers. If you would rather talk it through than fill in a form, call us."
      />
    </>
  );
}
