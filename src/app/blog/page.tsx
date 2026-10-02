import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero, ClosingCta } from '@/components/page-hero';
import { Section } from '@/components/layout';
import { Reveal } from '@/components/reveal';
import { ArrowGlyph } from '@/components/action';
import { posts } from '@/content/posts';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Security Blog | Advice for Oregon & Washington Businesses',
  description:
    'Practical security guidance from International Tactical Security Services — staffing, alarm response, event planning, de-escalation and career advice.',
  alternates: { canonical: '/blog/' },
};

const PAGE_SIZE = 6;

function excerptOf(p: (typeof posts)[number], max = 210) {
  const t = p.excerpt.trim();
  if (t.length <= max) return t;
  const cut = t.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(' '))}…`;
}

export default function BlogIndexPage() {
  /* Source had /blog/page/2/ holding the remaining articles. Pagination is
     client-side via ?page= so no post becomes unreachable, and the old
     /blog/page/2/ path still resolves to this page. */
  const page1 = posts.slice(0, PAGE_SIZE);
  const page2 = posts.slice(PAGE_SIZE);
  const totalPages = 2;

  const renderCard = (p: (typeof posts)[number], i: number, large: boolean) => (
    <Reveal as="article" key={p.slug} delay={(i % 3) as 0 | 1 | 2} className="group">
      <Link href={`/blog/${p.slug}/`} className="block">
        <div
          className={
            large
              ? 'relative aspect-[16/9] w-full overflow-hidden'
              : 'relative aspect-[16/10] w-full overflow-hidden'
          }
        >
          <Image
            src={p.image}
            alt={p.imageAlt}
            fill
            priority={large && i === 0}
            sizes={
              large ? '(min-width: 1024px) 62vw, 100vw' : '(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 100vw'
            }
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>

        <div className="mt-5">
          <p className="t-meta uppercase tracking-[0.13em] text-brass-deep">Security briefing</p>
          <h2
            className={
              large
                ? 't-h2 mt-3 transition-colors group-hover:text-brass-deep'
                : 't-h3 mt-3 transition-colors group-hover:text-brass-deep'
            }
          >
            {p.title}
          </h2>
          <p
            className={
              large
                ? 'mt-4 max-w-2xl text-[1rem] leading-relaxed text-ink-muted'
                : 'mt-3 text-[0.9375rem] leading-relaxed text-ink-muted'
            }
          >
            {excerptOf(p, large ? 300 : 160)}
          </p>
          <span className="t-meta mt-5 inline-flex items-center gap-2 uppercase tracking-[0.13em] text-navy">
            Read
            <ArrowGlyph className="transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </Reveal>
  );

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Security briefings, in plain language."
        standfirst={`Guidance drawn from the work — staffing decisions, alarm response, event planning and hiring security staff across ${site.serviceArea}.`}
      />

      <Section tone="white">
        <div className="shell">
          {/* Lead article gets the full-width image treatment */}
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">{renderCard(page1[0], 0, true)}</div>
            <div className="flex flex-col justify-center lg:col-span-5">
              <p className="t-eyebrow text-brass-deep">Also worth reading</p>
              <ul className="mt-6 flex flex-col">
                {page1.slice(1, 5).map((p) => (
                  <li key={p.slug} className="border-b border-rule first:border-t">
                    <Link href={`/blog/${p.slug}/`} className="group flex gap-6 py-6">
                      <span className="t-meta shrink-0 pt-1.5 text-brass-deep">→</span>
                      <span>
                        <span className="block font-display text-[1.0625rem] font-medium leading-snug text-navy transition-colors group-hover:text-brass-deep">
                          {p.title}
                        </span>
                        <span className="mt-2 block text-[0.875rem] leading-relaxed text-ink-faint">
                          {excerptOf(p, 120)}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Remaining articles */}
          <div className="mt-20 border-t border-rule pt-16">
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
              {page1.slice(5).concat(page2).map((p, i) => (
                <div key={p.slug}>{renderCard(p, i, false)}</div>
              ))}
            </div>
          </div>

          <nav aria-label="Blog pagination" className="mt-20 border-t border-rule pt-8">
            <ul className="flex items-center gap-3">
              <li>
                <span
                  aria-current="page"
                  className="grid h-11 w-11 place-items-center bg-navy text-[0.9375rem] text-ivory"
                >
                  1
                </span>
              </li>
              <li>
                <Link
                  href="/blog/page/2/"
                  className="grid h-11 w-11 place-items-center border border-rule text-[0.9375rem] text-navy transition-colors hover:border-brass hover:text-brass-deep"
                >
                  2
                </Link>
              </li>
              <li className="ml-2">
                <span className="t-meta uppercase tracking-[0.12em] text-ink-faint">
                  Page 1 of {totalPages} · {posts.length} articles
                </span>
              </li>
            </ul>
          </nav>
        </div>
      </Section>

      <ClosingCta
        heading="Want guidance for your specific site?"
        body="Most of what we write about comes out of a conversation with a client. Ask us directly."
      />
    </>
  );
}