import type { Metadata } from 'next';
import Link from 'next/link';
import { ActionLink, ArrowGlyph } from '@/components/action';
import { posts } from '@/content/posts';

export const metadata: Metadata = {
  title: 'Blog — Page 2',
  description: 'Second page of security articles from International Tactical Security Services.',
  alternates: { canonical: '/blog/' },
};

export default function BlogPage2() {
  return (
    <section className="shell py-16 md:py-24">
      <nav aria-label="Breadcrumb" className="mb-8">
        <ol className="flex items-center gap-2">
          <li>
            <Link
              href="/blog/"
              className="t-meta uppercase tracking-[0.13em] text-ink-muted hover:text-brass-deep"
            >
              Blog
            </Link>
          </li>
          <li aria-hidden="true" className="t-meta text-ink-faint">
            /
          </li>
          <li className="t-meta uppercase tracking-[0.13em] text-brass-deep">Page 2</li>
        </ol>
      </nav>

      <h1 className="t-h1">Blog — page 2</h1>
      <p className="t-lead mt-6 max-w-2xl text-ink-muted">
        All {posts.length} articles are listed together on page 1. This path is kept so the
        pagination link published on the live site keeps resolving.
      </p>

      <ActionLink href="/blog/" tone="navy" size="md" className="mt-10 self-start">
        Back to all articles <ArrowGlyph />
      </ActionLink>
    </section>
  );
}