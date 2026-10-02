import Image from 'next/image';
import { Section, SectionHead } from '@/components/layout';
import { Reveal } from '@/components/reveal';
import { ActionLink, ArrowGlyph } from '@/components/action';
import { founderQuote, founderQuoteSecondary } from '@/content/testimonials';
import { services, serviceHref } from '@/content/services';
import { site } from '@/content/site';

const eventService = services.find((s) => s.slug === 'portland-oregon-event-security-service')!;

/**
 * Event security feature — its own section with the opposite composition to the
 * commercial feature so the page keeps changing rhythm: photograph first,
 * editorial block overlapping it on wide screens.
 */
export function EventFeature() {
  return (
    <Section tone="navy" labelledBy="event-heading">
      <div className="shell">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Photograph leads on wide screens */}
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-[16/11] w-full overflow-hidden">
              <Image
                src="/media/services/event-security.jpg"
                alt="Event security officers on site at an organised public gathering"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover object-center"
              />
            </div>
          </Reveal>

          <div className="lg:col-span-5">
            <SectionHead
              tone="ivory"
              eyebrow="For event organisers"
              title={<span id="event-heading">Event security, planned before doors open</span>}
            />

            <p className="t-lead mt-7 text-ivory/70">{eventService.intro}</p>

            <ul className="mt-9 flex flex-col border-t border-navy-line">
              {eventService.highlights.map((h) => (
                <li
                  key={h}
                  className="flex items-center gap-3.5 border-b border-navy-line py-3.5 text-[0.9375rem] text-ivory/80"
                >
                  <span aria-hidden="true" className="h-px w-4 shrink-0 bg-brass" />
                  {h}
                </li>
              ))}
            </ul>

            <blockquote className="mt-9 border-l-2 border-brass pl-6">
              <p className="t-quote text-[1.1875rem] leading-[1.45] text-ivory">
                {founderQuote.quote}
              </p>
              <footer className="t-meta mt-5 uppercase tracking-[0.13em] text-ivory/50">
                {founderQuote.attribution} — {founderQuote.role}
              </footer>
            </blockquote>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ActionLink href={serviceHref(eventService.slug)} tone="brass" size="md">
                Event security <ArrowGlyph />
              </ActionLink>
              <ActionLink href="/contact/" tone="outline-light" size="md">
                Get a quote
              </ActionLink>
            </div>
          </div>
        </div>

        {/* Second founder quote, held in its own source context */}
        <Reveal className="mt-20 border-t border-navy-line pt-14 md:mt-28 md:pt-20">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-3">
              <p className="t-eyebrow flex items-center gap-3 text-brass">
                <span aria-hidden="true" className="h-px w-7 bg-brass" />
                Our standard
              </p>
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-ivory/55">
                We only hire the best in the industry — officers with military,
                law-enforcement and former SWAT backgrounds.
              </p>
            </div>
            <blockquote className="lg:col-span-9">
              <p className="t-quote text-[1.375rem] leading-[1.4] text-ivory md:text-[1.625rem]">
                {founderQuoteSecondary.quote}
              </p>
              <footer className="t-meta mt-7 uppercase tracking-[0.13em] text-ivory/50">
                {founderQuoteSecondary.attribution} — {founderQuoteSecondary.role},{' '}
                {site.shortName}
              </footer>
            </blockquote>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}