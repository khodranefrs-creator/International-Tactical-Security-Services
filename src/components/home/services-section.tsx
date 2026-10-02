import Image from 'next/image';
import Link from 'next/link';
import { Section, SectionHead } from '@/components/layout';
import { Reveal } from '@/components/reveal';
import { ActionLink, ArrowGlyph } from '@/components/action';
import { services, serviceHref } from '@/content/services';

/**
 * Services on the homepage.
 *
 * Composition, not repetition: one large featured service with a full-height
 * photograph, then the remaining six as hairline-separated editorial rows with
 * small landscape thumbnails. No identical white cards, no icon circles, no
 * repeated shadows.
 */
export function ServicesSection() {
  const [featured, ...rest] = services;

  return (
    <Section tone="white" labelledBy="services-heading">
      <div className="shell">
        <SectionHead
          eyebrow="What we do"
          title={<span id="services-heading">Security services built around your site</span>}
          standfirst="Seven services documented on our site, available armed or unarmed, staffed and scheduled to suit your premises and your budget."
          action={
            <ActionLink href="/services/" tone="outline" size="md">
              All services <ArrowGlyph />
            </ActionLink>
          }
        />

        {/* Featured service — large image, generous editorial column */}
        <Reveal className="mt-16 border-t border-rule pt-12 md:mt-20">
          <article className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Link href={serviceHref(featured.slug)} className="group block">
                <div className="relative aspect-[16/11] w-full overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                </div>
              </Link>
            </div>

            <div className="flex flex-col justify-center lg:col-span-5">
              <p className="t-eyebrow text-brass-deep">{featured.kicker}</p>
              <h3 className="t-h2 mt-5">{featured.name}</h3>
              <p className="t-lead mt-6 text-ink">{featured.intro}</p>

              <ul className="mt-8 flex flex-col border-t border-rule">
                {featured.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-center gap-3.5 border-b border-rule py-3 text-[0.9375rem] text-ink"
                  >
                    <span aria-hidden="true" className="h-px w-4 shrink-0 bg-brass" />
                    {h}
                  </li>
                ))}
              </ul>

              <ActionLink
                href={serviceHref(featured.slug)}
                tone="navy"
                size="md"
                className="mt-9 self-start"
              >
                {featured.navLabel} <ArrowGlyph />
              </ActionLink>
            </div>
          </article>
        </Reveal>

        {/* Remaining services — editorial index rows */}
        <div className="mt-20 md:mt-24">
          <div className="flex items-baseline justify-between gap-6 border-b border-navy/15 pb-5">
            <h3 className="t-eyebrow text-navy/45">Also available</h3>
            <span aria-hidden="true" className="tick" />
          </div>

          <ul>
            {rest.map((s, i) => (
              <Reveal
                as="li"
                key={s.slug}
                delay={(i % 3) as 0 | 1 | 2}
                className="border-b border-rule"
              >
                <Link
                  href={serviceHref(s.slug)}
                  className="group grid items-center gap-5 py-6 transition-colors sm:grid-cols-12 sm:gap-8 md:py-7"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden sm:col-span-4 md:col-span-3">
                    <Image
                      src={s.image}
                      alt={s.imageAlt}
                      fill
                      sizes="(min-width: 640px) 25vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="sm:col-span-8 md:col-span-6">
                    <p className="t-meta uppercase tracking-[0.13em] text-brass-deep">
                      {s.kicker} · {s.audience}
                    </p>
                    <h4 className="t-h3 mt-2.5 transition-colors group-hover:text-brass-deep">
                      {s.name}
                    </h4>
                    <p className="mt-2 max-w-xl text-[0.9375rem] leading-relaxed text-ink-muted">
                      {s.summary}
                    </p>
                  </div>

                  <div className="sm:col-span-4 md:col-span-3 md:justify-self-end">
                    <span className="t-meta inline-flex items-center gap-2 uppercase tracking-[0.13em] text-navy">
                      Explore
                      <ArrowGlyph className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}