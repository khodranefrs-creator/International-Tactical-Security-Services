import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero, ClosingCta } from '@/components/page-hero';
import { Section } from '@/components/layout';
import { Reveal } from '@/components/reveal';
import { ActionLink, ArrowGlyph } from '@/components/action';
import { services, type Service } from '@/content/services';
import { site } from '@/content/site';

/**
 * Renders one service page from the verified content for that service.
 *
 * Each service page is laid out differently by index (mod 3) so the set reads
 * as seven distinct pages rather than one template with the heading swapped:
 * the lead block alternates image-left / image-right, and the body section
 * alternates between a numbered editorial list and a two-column rhythm.
 */
function alternateClasses(index: number) {
  return index % 3 === 0
    ? { leadImageFirst: true, bodyLayout: 'stacked' as const }
    : index % 3 === 1
      ? { leadImageFirst: false, bodyLayout: 'offset' as const }
      : { leadImageFirst: true, bodyLayout: 'offset' as const };
}

function ServicePage({ service, index }: { service: Service; index: number }) {
  const { leadImageFirst, bodyLayout } = alternateClasses(index);
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  const leadBlock = (
    <>
      <div className="relative aspect-[16/10] w-full overflow-hidden lg:aspect-[5/4]">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          priority
          sizes="(min-width: 1024px) 48vw, 100vw"
          className="object-cover object-center"
        />
      </div>
      <ul className="mt-8 flex flex-col border-t border-rule">
        {service.highlights.map((h) => (
          <li
            key={h}
            className="flex items-center gap-3.5 border-b border-rule py-3.5 text-[0.9375rem] text-ink"
          >
            <span aria-hidden="true" className="h-px w-4 shrink-0 bg-brass" />
            {h}
          </li>
        ))}
      </ul>
    </>
  );

  const leadText = (
    <div>
      <p className="t-eyebrow text-brass-deep">{service.kicker}</p>
      <p className="t-lead mt-5 text-ink">{service.lede}</p>
      <p className="mt-7 text-[0.975rem] leading-[1.75] text-ink">{service.intro}</p>
      <ActionLink href="/contact/" tone="navy" size="lg" className="mt-9 self-start">
        Request this service <ArrowGlyph />
      </ActionLink>
    </div>
  );

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={service.name}
        standfirst={service.summary}
        image={service.image}
        imageAlt={service.imageAlt}
        meta={[
          { label: 'Typical for', value: service.audience },
          { label: 'Shift pattern', value: 'Day, night and 24/7' },
          { label: 'Armament', value: 'Armed or unarmed' },
        ]}
      />

      {/* Lead block — alternates side by index */}
      <Section tone="white">
        <div className="shell">
          <Reveal>
            <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
              {leadImageFirst ? (
                <>
                  <div className="lg:col-span-6">{leadBlock}</div>
                  <div className="lg:col-span-6 lg:pt-4">{leadText}</div>
                </>
              ) : (
                <>
                  <div className="lg:col-span-6 lg:row-span-1 lg:pt-4">{leadText}</div>
                  <div className="lg:col-span-6">{leadBlock}</div>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Body — the service's own on-page sections, in original order */}
      <Section tone={bodyLayout === 'stacked' ? 'ivory' : 'ivory-deep'}>
        <div className="shell">
          <Reveal>
            <div className="flex items-baseline justify-between gap-6 border-b border-navy/15 pb-5">
              <h2 className="t-eyebrow text-navy/45">In detail</h2>
              <span aria-hidden="true" className="tick" />
            </div>
          </Reveal>

          <div
            className={
              bodyLayout === 'offset'
                ? 'mt-4 grid gap-x-12 lg:grid-cols-2'
                : 'mt-4 flex max-w-4xl flex-col'
            }
          >
            {service.body.map((b, i) => (
              <Reveal key={b.heading} delay={(i % 2) as 0 | 1}>
                <section
                  className={
                    bodyLayout === 'offset'
                      ? 'grid gap-3 border-b border-rule py-8 lg:grid-cols-12 lg:gap-8'
                      : 'grid gap-3 border-b border-rule py-8 lg:grid-cols-12 lg:gap-8'
                  }
                >
                  <h3 className="t-h3 lg:col-span-5">{b.heading}</h3>
                  <div className="lg:col-span-7">
                    <p className="text-[0.975rem] leading-[1.75] text-ink">{b.text}</p>
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      {/* Related services */}
      <Section tone="white" labelledBy="related-heading">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="related-heading" className="t-h2">
              Other services
            </h2>
            <ActionLink href="/services/" tone="outline" size="sm">
              All seven <ArrowGlyph />
            </ActionLink>
          </div>

          <ul className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug} className="bg-white">
                <Link href={`/${o.slug}/`} className="group block p-7 lg:p-8">
                  <p className="t-meta uppercase tracking-[0.13em] text-brass-deep">
                    {o.kicker}
                  </p>
                  <h3 className="t-h3 mt-3 transition-colors group-hover:text-brass-deep">
                    {o.name}
                  </h3>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-ink-muted">
                    {o.summary}
                  </p>
                  <span className="t-meta mt-6 inline-flex items-center gap-2 uppercase tracking-[0.13em] text-navy">
                    View
                    <ArrowGlyph className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <ClosingCta
        heading={`Ask about ${service.navLabel.toLowerCase()}.`}
        body={`We cover ${site.serviceArea}. Tell us the location, the hours and what has been happening, and we will follow up.`}
      />
    </>
  );
}

/** Helper used by each route module to generate metadata + component. */
export function makeServicePage(slug: string) {
  const index = services.findIndex((s) => s.slug === slug);
  const service = services[index];
  if (!service) throw new Error(`Unknown service slug: ${slug}`);

  function generateMetadata(): Metadata {
    return {
      title: service.metaTitle,
      description: service.metaDescription,
      alternates: { canonical: `/${service.slug}/` },
      openGraph: {
        title: `${service.name} | ${site.name}`,
        description: service.metaDescription,
        url: `${site.url}/${service.slug}/`,
        images: [{ url: service.image, alt: service.imageAlt }],
      },
    };
  }

  function Page() {
    return <ServicePage service={service} index={index} />;
  }

  return { generateMetadata, Page, service, notFound };
}