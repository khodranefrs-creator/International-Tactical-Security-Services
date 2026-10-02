import Image from 'next/image';
import { Section, SectionHead } from '@/components/layout';
import { Reveal } from '@/components/reveal';
import { testimonials, founderQuote } from '@/content/testimonials';

/**
 * Testimonials — static editorial quotations, not a carousel.
 *
 * Wording and attribution are verbatim from the live homepage. Layout is a
 * deliberate asymmetric two-column flow so the very short entries
 * ("Nice to work with and responsive…") sit comfortably alongside the long ones
 * rather than all being forced into equal-height cards.
 */
export function TestimonialsSection() {
  return (
    <Section tone="white" labelledBy="testimonials-heading">
      <div className="shell">
        <SectionHead
          eyebrow="Client feedback"
          title={<span id="testimonials-heading">What our clients say</span>}
          standfirst="Unedited testimonials published on our site."
        />

        {/* Founder quote with headshot and signature — the site's own signature asset */}
        <Reveal className="mt-16 border-y border-rule py-12 md:mt-20">
          <figure className="grid gap-10 md:grid-cols-12 md:gap-14">
            <div className="md:col-span-3">
              <div className="relative aspect-[108/100] w-full max-w-[13rem] overflow-hidden bg-ivory">
                <Image
                  src="/media/team/mark-richards-headshot.webp"
                  alt="Mark Richards, CEO and Co-Founder of International Tactical Security Services"
                  fill
                  sizes="(min-width: 768px) 20vw, 45vw"
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="md:col-span-9">
              <span aria-hidden="true" className="block font-display text-[3rem] leading-[0.5] text-brass">
                &ldquo;
              </span>
              <blockquote className="t-quote mt-6 text-[1.375rem] leading-[1.4] text-navy md:text-[1.75rem]">
                {founderQuote.quote}
              </blockquote>
              <figcaption className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                <span className="relative inline-block h-[1.375rem] w-[4.9rem]">
                  <Image
                    src="/media/team/mark-richards-signature.webp"
                    alt=""
                    fill
                    sizes="80px"
                    className="object-contain object-left invert"
                  />
                </span>
                <span className="t-meta uppercase tracking-[0.13em] text-ink-muted">
                  {founderQuote.attribution} — {founderQuote.role}
                </span>
              </figcaption>
            </div>
          </figure>
        </Reveal>

        {/* Client quotations — masonry-style columns, hairline separated */}
        <div className="mt-16 columns-1 gap-x-12 md:mt-20 md:columns-2 [&>*]:mb-10 [&>*]:break-inside-avoid">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) as 0 | 1 | 2}>
              <figure className="border-t border-rule pt-6">
                <blockquote className="text-[1rem] leading-[1.7] text-ink">
                  <span aria-hidden="true" className="font-display text-brass">
                    &ldquo;
                  </span>
                  {t.quote}
                  <span aria-hidden="true" className="font-display text-brass">
                    &rdquo;
                  </span>
                </blockquote>
                <figcaption className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="font-display text-[1.0625rem] font-medium text-navy">
                    {t.name}
                  </span>
                  {t.role ? (
                    <span className="t-meta uppercase tracking-[0.13em] text-brass-deep">
                      {t.role}
                    </span>
                  ) : null}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}