import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero, ClosingCta } from '@/components/page-hero';
import { Section } from '@/components/layout';
import { Reveal } from '@/components/reveal';
import { services } from '@/content/services';
import { posts } from '@/content/posts';
import { mainNav, site } from '@/content/site';

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'Every page on the International Tactical Security Services website.',
  alternates: { canonical: '/sitemap/' },
};

const sections = [
  {
    title: 'Main pages',
    links: mainNav.filter((n) => n.href !== '/services/').map((n) => ({ label: n.label, href: n.href })),
  },
  {
    title: 'Services',
    links: [
      { label: 'All services', href: '/services/' },
      ...services.map((s) => ({ label: s.name, href: `/${s.slug}/` })),
    ],
  },
  {
    title: 'Blog',
    links: [
      { label: 'All articles', href: '/blog/' },
      ...posts.map((p) => ({ label: p.title, href: `/blog/${p.slug}/` })),
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <PageHero
        eyebrow="Sitemap"
        title="Every page, in one place."
        standfirst="A plain list of everything published on this site."
      />

      <Section tone="white">
        <div className="shell">
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-3">
            {sections.map((sec) => (
              <Reveal key={sec.title}>
                <h2 className="t-h3 border-b border-navy pb-4">{sec.title}</h2>
                <ul className="mt-2 flex flex-col">
                  {sec.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="group flex items-start gap-3 border-b border-rule py-3.5 text-[0.9375rem] leading-snug text-ink transition-colors hover:text-brass-deep"
                      >
                        <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-brass" />
                        <span>{l.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16 border-t border-rule pt-8">
              <p className="t-meta uppercase tracking-[0.12em] text-ink-faint">
                {site.name} · {site.serviceArea}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}