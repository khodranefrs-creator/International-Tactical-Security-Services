import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero, ClosingCta } from '@/components/page-hero';
import { Section } from '@/components/layout';
import { Reveal } from '@/components/reveal';
import { ActionLink, ArrowGlyph } from '@/components/action';
import { careers, founder, valuePoints } from '@/content/copy';

export const metadata: Metadata = {
  title: 'Security Jobs in Oregon & Washington — No Experience Needed',
  description:
    'Now hiring security guards in Oregon and Washington. No previous experience necessary — we will train you. Competitive pay and room to grow.',
  alternates: { canonical: '/security-jobs-oregon-washington/' },
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Now hiring security guards."
        standfirst="No previous experience necessary. We will train you."
        image="/media/services/event-security.jpg"
        imageAlt="Security staff working an event venue in Portland"
      />

      <Section tone="white">
        <div className="shell">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7">
                <p className="t-lead text-ink">{careers.intro}</p>
              </div>
              <div className="lg:col-span-5">
                <ul className="flex flex-col gap-3">
                  {careers.emphasis.map((e) => (
                    <li
                      key={e}
                      className="flex items-center gap-3.5 bg-navy px-5 py-4 text-[0.9375rem] font-medium uppercase tracking-[0.06em] text-ivory"
                    >
                      <span aria-hidden="true" className="h-px w-4 shrink-0 bg-brass" />
                      {e}
                    </li>
                  ))}
                </ul>
                <p className="t-meta mt-5 uppercase tracking-[0.12em] text-ink-faint">
                  {careers.location}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Responsibilities and qualifications side by side, numbered ledger
              style rather than two identical cards. */}
          <div className="mt-20 grid gap-x-16 gap-y-14 lg:grid-cols-2">
            <Reveal>
              <h2 className="t-h3 border-b border-navy pb-4">{careers.responsibilitiesHeading}</h2>
              <ol className="mt-2 flex flex-col">
                {careers.responsibilities.map((r, i) => (
                  <li
                    key={r}
                    className="grid grid-cols-12 gap-4 border-b border-rule py-5 text-[0.9375rem] leading-relaxed text-ink"
                  >
                    <span className="t-meta col-span-1 pt-1 text-brass-deep">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="col-span-11">{r}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal delay={1}>
              <h2 className="t-h3 border-b border-navy pb-4">{careers.qualificationsHeading}</h2>
              <ul className="mt-2 flex flex-col">
                {careers.qualifications.map((q) => (
                  <li
                    key={q}
                    className="flex items-start gap-4 border-b border-rule py-5 text-[0.9375rem] leading-relaxed text-ink"
                  >
                    <span aria-hidden="true" className="mt-3 h-px w-4 shrink-0 bg-brass" />
                    {q}
                  </li>
                ))}
              </ul>

              <div className="mt-10 border-l-2 border-brass bg-ivory px-6 py-5">
                <p className="text-[0.9375rem] leading-relaxed text-ink">{careers.closing}</p>
                <ActionLink href="/contact/" tone="navy" size="sm" className="mt-6">
                  Apply now <ArrowGlyph />
                </ActionLink>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* What you can expect from us, stated with the same claims as the site */}
      <Section tone="navy">
        <div className="shell">
          <Reveal>
            <p className="t-eyebrow text-brass">What you can expect</p>
            <h2 className="t-h1 mt-6 max-w-3xl text-ivory">
              Training, not just a clipboard.
            </h2>
          </Reveal>

          <Reveal delay={1}>
            <ul className="mt-14 grid gap-px bg-navy-line sm:grid-cols-2 lg:grid-cols-3">
              {valuePoints.map((v) => (
                <li key={v} className="bg-navy px-7 py-9">
                  <span aria-hidden="true" className="block h-px w-8 bg-brass" />
                  <span className="mt-5 block font-display text-[1.125rem] leading-snug text-ivory">
                    {v}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={2}>
            <div className="mt-16 grid items-center gap-10 border-t border-navy-line pt-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src="/media/team/mark-richards-headshot.webp"
                    alt={`${founder.name}, ${founder.role}`}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
              </div>
              <div className="lg:col-span-7">
                <p className="t-eyebrow text-brass">Who you would report to</p>
                <h3 className="t-h2 mt-6 text-ivory">{founder.name}</h3>
                <p className="t-lead mt-3 text-ivory/55">{founder.role}</p>
                <p className="mt-7 text-[1rem] leading-[1.75] text-ivory/70">
                  {careers.closing}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <ClosingCta
        heading="Interested?"
        body="Send a resume and cover letter through the contact form, or call and ask to speak to someone about a guard position."
      />
    </>
  );
}