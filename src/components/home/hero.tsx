'use client';

import Image from 'next/image';
import { Section } from '@/components/layout';
import { Reveal } from '@/components/reveal';
import { ActionLink, ArrowGlyph } from '@/components/action';
import { site, primaryCta } from '@/content/site';
import { primaryPhone } from '@/lib/contact';

/**
 * Hero — a two-part composition. Text on a deep navy structural panel, a large
 * photograph cropped to the right edge of the viewport. No text sits on the
 * photograph, so contrast is controlled by the panel rather than by an overlay.
 */
export function Hero() {
  return (
    <Section tone="navy-deep" pad="none" className="relative overflow-hidden">
      <div className="grid lg:grid-cols-12">
        {/* Text panel — 8 of 12 columns at lg, 7 at xl. The extra width gives the
            display line a proper editorial measure without shrinking the type,
            and keeps the photograph's column narrow enough to cover at native
            detail. */}
        <div className="order-2 flex flex-col justify-center px-gutter pb-10 pt-9 md:pb-12 md:pt-12 lg:order-1 lg:col-span-8 lg:py-12 xl:col-span-7 xl:py-16">
          <div className="mx-auto w-full max-w-[82.5rem] lg:mx-0 lg:max-w-none">
            <div className="lg:max-w-[46rem]">
              <Reveal>
                <p className="t-eyebrow flex items-center gap-3 text-brass">
                  <span aria-hidden="true" className="h-px w-8 bg-brass" />
                  Private Security Services
                </p>
              </Reveal>

              <Reveal delay={1}>
                <h1 className="t-display mt-5 max-w-[38rem] text-ivory md:mt-6 lg:max-w-none">
                  Professional security for the places you operate.
                </h1>
              </Reveal>

              <Reveal delay={2}>
                <p className="t-quote mt-5 text-[1.375rem] leading-[1.35] text-brass md:mt-6 md:text-[1.5rem]">
                  Your security is our business.
                </p>
              </Reveal>

              <Reveal delay={3}>
                <p className="t-lead mt-4 max-w-[34rem] text-ivory/70 md:mt-5">
                  A family-owned private security company serving commercial businesses,
                  retail, banks and events across {site.serviceArea}. Former law enforcement,
                  military and SWAT backgrounds. Licensed in Oregon and Washington.
                </p>
              </Reveal>

              <Reveal delay={4}>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-8">
                  <ActionLink href={primaryCta.href} tone="brass" size="lg">
                    {primaryCta.label} <ArrowGlyph />
                  </ActionLink>
                  <ActionLink href="/services/" tone="outline-light" size="lg">
                    View services
                  </ActionLink>
                </div>
              </Reveal>

              <Reveal delay={5}>
                <div className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-navy-line pt-5">
                  <a
                    href={primaryPhone.href}
                    className="t-meta flex items-center gap-2.5 text-ivory transition-colors hover:text-brass"
                  >
                    <span aria-hidden="true" className="h-px w-5 bg-brass" />
                    {primaryPhone.label}
                  </a>
                  <p className="t-meta uppercase tracking-[0.14em] text-ivory/45">
                    Portland, Oregon&nbsp;&nbsp;·&nbsp;&nbsp;Vancouver, Washington
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Photograph */}
        <div className="order-1 relative lg:order-2 lg:col-span-4 xl:col-span-5">
          {/* 16:10 sits close to the 3:2 source, so the stacked layouts crop
              very little. On desktop the box follows the text column's height;
              min-h is only a floor, never a driver. */}
          <div className="relative aspect-[16/10] w-full lg:aspect-auto lg:h-full lg:min-h-[30rem] xl:min-h-[34rem]">
            <Image
              src="/media/hero/armed-security-guard.jpg"
              alt="Armed private security officer standing guard at a commercial property"
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 1024px) 125vh, 100vw"
              className="object-cover object-[58%_35%]"
            />
            {/* Subtle inner edge so the photograph meets the panel deliberately */}
            <div
              aria-hidden="true"
              className="absolute inset-y-0 left-0 hidden w-px bg-brass/50 lg:block"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}