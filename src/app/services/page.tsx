import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero, ClosingCta } from '@/components/page-hero';
import { Section, SectionHead } from '@/components/layout';
import { Reveal } from '@/components/reveal';
import { ActionLink, ArrowGlyph } from '@/components/action';
import { services, serviceGroups, serviceHref } from '@/content/services';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Private Security Services Portland OR & Vancouver WA',
  description:
    'Retail security, bank security, event security, mobile patrol, fire watch, alarm response and executive protection in Portland, Oregon and Vancouver, Washington. Armed and unarmed officers.',
  alternates: { canonical: '/services/' },
};

export default function ServicesIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Private security services, delivered clearly."
        standfirst="Seven services, all available armed or unarmed and staffed around your site. Below is everything the company currently offers — grouped by the kind of operation they suit."
      />

      {/* Featured service, large image, deliberately not a six-card grid */}
      <Section tone="white">
        <div className="shell">
          <Reveal>
            <article className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
              <div className="lg:col-span-7">
                <Link href={serviceHref(services[0].slug)} className="group block">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={services[0].image}
                      alt={services[0].imageAlt}
                      fill
                      priority
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                </Link>
              </div>
              <div className="lg:col-span-5">
                <p className="t-eyebrow text-brass-deep">{services[0].kicker}</p>
                <h2 className="t-h2 mt-5">{services[0].name}</h2>
                <p className="t-lead mt-6 text-ink">{services[0].intro}</p>
                <ActionLink
                  href={serviceHref(services[0].slug)}
                  tone="navy"
                  size="md"
                  className="mt-9 self-start"
                >
                  {services[0].navLabel} <ArrowGlyph />
                </ActionLink>
              </div>
            </article>
          </Reveal>
        </div>
      </Section>

      {/* Complete index — alternating editorial rows */}
      <Section tone="ivory">
        <div className="shell">
          <SectionHead
            eyebrow="Complete index"
            title="Every service we offer"
            standfirst="Descriptions below are taken from each service’s own page on this site."
          />

          <ul className="mt-16 border-t border-rule">
            {services.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={(i % 3) as 0 | 1 | 2} className="border-b border-rule">
                <Link href={serviceHref(s.slug)} className="group grid items-center gap-5 py-7 sm:grid-cols-12 sm:gap-8 md:py-9">
                  <div className="relative aspect-[16/10] w-full overflow-hidden sm:col-span-4 lg:col-span-4">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 32vw, (min-width: 640px) 30vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="sm:col-span-8 lg:col-span-6">
                    <p className="t-meta uppercase tracking-[0.13em] text-brass-deep">
                      {s.kicker} · {s.audience}
                    </p>
                    <h3 className="t-h3 mt-2.5 transition-colors group-hover:text-brass-deep">
                      {s.name}
                    </h3>
                    <p className="mt-3 max-w-xl text-[0.9375rem] leading-relaxed text-ink-muted">
                      {s.summary}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                      {s.highlights.slice(0, 3).map((h) => (
                        <li
                          key={h}
                          className="flex items-center gap-2 text-[0.8125rem] text-ink-soft"
                        >
                          <span aria-hidden="true" className="h-px w-3 bg-brass" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="sm:col-span-12 lg:col-span-2 lg:justify-self-end">
                    <span className="t-meta inline-flex items-center gap-2 uppercase tracking-[0.13em] text-navy">
                      View
                      <ArrowGlyph className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* Grouped view — a second, navigational cut of the same seven services */}
      <Section tone="navy" labelledBy="groups-heading">
        <div className="shell">
          <SectionHead
            tone="ivory"
            eyebrow="By situation"
            title={<span id="groups-heading">Which service fits your situation</span>}
            standfirst="The same seven services, arranged by the kind of operation you are running."
          />

          <div className="mt-16 grid gap-px border border-navy-line bg-navy-line sm:grid-cols-2 lg:grid-cols-3">
            {serviceGroups.map((g, gi) => (
              <Reveal
                key={g.title}
                delay={(gi % 3) as 0 | 1 | 2}
                className="bg-navy p-7 lg:p-8"
              >
                <h3 className="font-display text-[1.1875rem] font-medium leading-snug text-ivory">
                  {g.title}
                </h3>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-ivory/55">{g.note}</p>
                <ul className="mt-6 flex flex-col gap-2.5 border-t border-navy-line pt-5">
                  {g.slugs.map((slug) => {
                    const s = services.find((x) => x.slug === slug)!;
                    return (
                      <li key={slug}>
                        <Link
                          href={serviceHref(s.slug)}
                          className="t-meta inline-flex items-center gap-2.5 uppercase tracking-[0.1em] text-ivory/75 transition-colors hover:text-brass"
                        >
                          <span aria-hidden="true" className="h-px w-3 bg-brass" />
                          {s.navLabel}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            ))}

            <Reveal delay={1} className="flex flex-col justify-between bg-navy-deep p-7 lg:p-8">
              <div>
                <h3 className="font-display text-[1.1875rem] font-medium leading-snug text-ivory">
                  Not sure which you need?
                </h3>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-ivory/55">
                  Most engagements combine more than one. Describe the site and the hours, and we
                  will tell you what would actually help across {site.serviceArea}.
                </p>
              </div>
              <ActionLink href="/contact/" tone="brass" size="sm" className="mt-7 self-start">
                Ask us <ArrowGlyph />
              </ActionLink>
            </Reveal>
          </div>
        </div>
      </Section>

      <ClosingCta
        heading="Tell us about the site."
        body="Hours, access points, concerns, budget. We will come back with a plan and a price."
      />
    </>
  );
}