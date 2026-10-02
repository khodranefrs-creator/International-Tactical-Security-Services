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
        {/* Text panel */}
        <div className="order-2 flex flex-col justify-center px-gutter pb-16 pt-14 md:pb-20 md:pt-20 lg:order-1 lg:col-span-6 lg:py-28 xl:col-span-6">
          <div className="mx-auto w-full max-w-[82.5rem] lg:mx-0 lg:max-w-none">
            <div className="lg:max-w-[36rem] lg:pr-6">
              <Reveal>
                <p className="t-eyebrow flex items-center gap-3 text-brass">
                  <span aria-hidden="true" className="h-px w-8 bg-brass" />
                  Private Security Services
                </p>
              </Reveal>

              <Reveal delay={1}>
                <h1 className="t-display mt-8 text-ivory">
                  Professional security for the places you operate.
                </h1>
              </Reveal>

              <Reveal delay={2}>
                <p className="t-quote mt-8 text-[1.375rem] leading-[1.35] text-brass md:text-[1.5rem]">
                  Your security is our business.
                </p>
              </Reveal>

              <Reveal delay={3}>
                <p className="t-lead mt-7 max-w-lg text-ivory/70">
                  A family-owned private security company serving commercial businesses,
                  retail, banks and events across {site.serviceArea}. Former law enforcement,
                  military and SWAT backgrounds. Licensed in Oregon and Washington.
                </p>
              </Reveal>

              <Reveal delay={4}>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <ActionLink href={primaryCta.href} tone="brass" size="lg">
                    {primaryCta.label} <ArrowGlyph />
                  </ActionLink>
                  <ActionLink href="/services/" tone="outline-light" size="lg">
                    View services
                  </ActionLink>
                </div>
              </Reveal>

              <Reveal delay={5}>
                <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-navy-line pt-7">
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
        <div className="order-1 relative lg:order-2 lg:col-span-6">
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[34rem] xl:min-h-[38rem]">
            <Image
              src="/media/hero/armed-security-guard.jpg"
              alt="Armed private security officer standing guard at a commercial property"
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 1024px) 50vw, 100vw"
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