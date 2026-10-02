import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/reveal';
import { ActionLink, ArrowGlyph } from '@/components/action';
import { primaryPhone } from '@/lib/contact';
import { cn } from '@/lib/contact';

/**
 * Interior page opener. A compact navy band rather than a full-height hero —
 * internal pages should not compete with the homepage for attention, and a tall
 * hero above a short page wastes the first viewport.
 */
export function PageHero({
  eyebrow,
  title,
  standfirst,
  image,
  imageAlt,
  meta,
}: {
  eyebrow: string;
  title: string;
  standfirst?: string;
  image?: string;
  imageAlt?: string;
  meta?: { label: string; value: string }[];
}) {
  return (
    <section className="on-navy bg-navy text-ivory">
      <div className="mx-auto max-w-[82.5rem] px-gutter">
        <div className="grid gap-10 py-16 md:py-20 lg:grid-cols-12 lg:gap-14">
          <div className={cn('lg:col-span-7', !image && 'lg:col-span-9')}>
            <Reveal>
              <nav aria-label="Breadcrumb" className="mb-7">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link
                      href="/"
                      className="t-meta uppercase tracking-[0.13em] text-ivory/50 transition-colors hover:text-brass"
                    >
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true" className="t-meta text-ivory/25">
                    /
                  </li>
                  <li>
                    <span className="t-meta uppercase tracking-[0.13em] text-brass">
                      {eyebrow}
                    </span>
                  </li>
                </ol>
              </nav>
            </Reveal>

            <Reveal delay={1}>
              <h1 className="t-h1 text-ivory">{title}</h1>
            </Reveal>

            {standfirst ? (
              <Reveal delay={2}>
                <p className="t-lead mt-7 max-w-2xl text-ivory/70">{standfirst}</p>
              </Reveal>
            ) : null}

            {meta?.length ? (
              <Reveal delay={3}>
                <dl className="mt-9 flex flex-wrap gap-x-10 gap-y-5 border-t border-navy-line pt-7">
                  {meta.map((m) => (
                    <div key={m.label}>
                      <dt className="t-meta uppercase tracking-[0.13em] text-ivory/40">
                        {m.label}
                      </dt>
                      <dd className="mt-2 text-[0.9375rem] text-ivory/85">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ) : null}

            <Reveal delay={4}>
              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3">
                <ActionLink href="/contact/" tone="brass" size="md">
                  Request a quote <ArrowGlyph />
                </ActionLink>
                <a
                  href={primaryPhone.href}
                  className="t-meta inline-flex items-center gap-2.5 text-ivory/70 transition-colors hover:text-brass"
                >
                  <span aria-hidden="true" className="h-px w-5 bg-brass" />
                  {primaryPhone.label}
                </a>
              </div>
            </Reveal>
          </div>

          {image ? (
            <Reveal delay={2} className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-[5/4]">
                <Image
                  src={image}
                  alt={imageAlt ?? ''}
                  fill
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-center"
                />
              </div>
            </Reveal>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** Standing contact prompt repeated at the foot of every content page. */
export function ClosingCta({
  heading = 'Ready to talk it through?',
  body = 'Tell us what you need protected and we’ll come back with a plan and a price.',
}: {
  heading?: string;
  body?: string;
}) {
  return (
    <section className="on-navy bg-navy-deep text-ivory">
      <div className="mx-auto flex max-w-[82.5rem] flex-col gap-8 px-gutter py-16 md:flex-row md:items-center md:justify-between md:gap-14 md:py-20">
        <div className="max-w-xl">
          <p className="t-eyebrow flex items-center gap-3 text-brass">
            <span aria-hidden="true" className="h-px w-7 bg-brass" />
            Next step
          </p>
          <h2 className="t-h3 mt-5 text-ivory">{heading}</h2>
          <p className="mt-4 text-[0.975rem] leading-relaxed text-ivory/65">{body}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-3">
          <ActionLink href="/contact/" tone="brass" size="md">
            Contact us <ArrowGlyph />
          </ActionLink>
          <ActionLink href="/services/" tone="outline-light" size="md">
            All services
          </ActionLink>
        </div>
      </div>
    </section>
  );
}