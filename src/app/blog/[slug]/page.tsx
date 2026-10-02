import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Section } from '@/components/layout';
import { ArticleBody } from '@/components/article-body';
import { ClosingCta } from '@/components/page-hero';
import { ActionLink, ArrowGlyph } from '@/components/action';
import { posts } from '@/content/posts';
import { site } from '@/content/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return { title: 'Article not found' };

  const description = post.excerpt.slice(0, 300).replace(/[\s"]+$/, '');
  return {
    title: `${post.title} | ${site.shortName}`,
    description,
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url: `${site.url}/blog/${post.slug}/`,
      images: [{ url: post.image, alt: post.imageAlt }],
      /* No publication date is published for any article: the live source
         exposed none, and inventing one would be a factual error. */
      ...(post.date ? { publishedTime: post.date } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const index = posts.findIndex((p) => p.slug === slug);
  const more = [posts[(index + 1) % posts.length], posts[(index + 2) % posts.length]];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt.slice(0, 300),
    image: `${site.url}${post.image}`,
    author: { '@type': 'Organization', name: site.name },
    publisher: { '@type': 'Organization', name: site.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article>
        {/* Article header */}
        <header className="on-navy bg-navy text-ivory">
          <div className="mx-auto max-w-[82.5rem] px-gutter">
            <div className="mx-auto max-w-3xl py-16 md:py-20">
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex flex-wrap items-center gap-2">
                  <li>
                    <Link
                      href="/"
                      className="t-meta uppercase tracking-[0.13em] text-ivory/50 hover:text-brass"
                    >
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true" className="t-meta text-ivory/25">
                    /
                  </li>
                  <li>
                    <Link
                      href="/blog/"
                      className="t-meta uppercase tracking-[0.13em] text-ivory/50 hover:text-brass"
                    >
                      Blog
                    </Link>
                  </li>
                </ol>
              </nav>

              <p className="t-eyebrow text-brass">Security briefing</p>
              <h1 className="t-h1 mt-6 text-ivory">{post.title}</h1>
              <p className="t-lead mt-7 text-ivory/65">{post.excerpt.slice(0, 220)}</p>
            </div>
          </div>
        </header>

        {/* Lead image — full bleed of the content measure, not the viewport */}
        <div className="mx-auto max-w-[82.5rem] px-gutter">
          <div className="relative aspect-[16/7] w-full overflow-hidden">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="(min-width: 1320px) 1200px, 100vw"
              className="object-cover object-center"
            />
          </div>
        </div>

        {/* Body */}
        <Section tone="white">
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <aside className="lg:col-span-3">
                <div className="lg:sticky lg:top-32">
                  <p className="t-eyebrow text-brass-deep">Filed under</p>
                  <p className="mt-4 text-[0.9375rem] text-ink-muted">
                    Security guidance
                    <br />
                    {site.serviceArea}
                  </p>
                  <Link
                    href="/blog/"
                    className="t-meta mt-6 inline-flex items-center gap-2 uppercase tracking-[0.12em] text-navy hover:text-brass-deep"
                  >
                    All articles <ArrowGlyph />
                  </Link>
                </div>
              </aside>

              <div className="lg:col-span-9 lg:max-w-3xl">
                {post.body ? (
                  <ArticleBody body={post.body} />
                ) : (
                  <p className="text-[1.0625rem] leading-[1.75] text-ink">
                    This article&rsquo;s full text is not yet available on our site. Please call us
                    if you would like the detail.
                  </p>
                )}

                <div className="mt-16 border-t border-rule pt-8">
                  <p className="text-[0.9375rem] leading-relaxed text-ink-muted">
                    Written by the team at {site.name}. If you would like advice specific to your
                    own site, we are happy to talk it through.
                  </p>
                  <ActionLink href="/contact/" tone="navy" size="md" className="mt-7">
                    Talk to us <ArrowGlyph />
                  </ActionLink>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Read next */}
        <Section tone="ivory">
          <div className="shell">
            <h2 className="t-h2">Read next</h2>
            <ul className="mt-12 grid gap-px border border-rule bg-rule sm:grid-cols-2">
              {more.map((m) => (
                <li key={m.slug} className="bg-ivory">
                  <Link href={`/blog/${m.slug}/`} className="group block p-7 lg:p-8">
                    <p className="t-meta uppercase tracking-[0.13em] text-brass-deep">Security briefing</p>
                    <h3 className="mt-3 font-display text-[1.25rem] font-medium leading-snug text-navy transition-colors group-hover:text-brass-deep">
                      {m.title}
                    </h3>
                    <span className="t-meta mt-5 inline-flex items-center gap-2 uppercase tracking-[0.13em] text-navy">
                      Read
                      <ArrowGlyph className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      </article>

      <ClosingCta />
    </>
  );
}
