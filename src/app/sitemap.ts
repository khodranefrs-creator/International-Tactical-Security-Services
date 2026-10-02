import type { MetadataRoute } from 'next';
import { mainNav, site } from '@/content/site';
import { services } from '@/content/services';
import { posts } from '@/content/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number }[] = [
    { path: '/', priority: 1 },
    { path: '/services/', priority: 0.9 },
    { path: '/about-us/', priority: 0.7 },
    { path: '/contact/', priority: 0.8 },
    { path: '/faq/', priority: 0.6 },
    { path: '/blog/', priority: 0.7 },
    { path: '/security-jobs-oregon-washington/', priority: 0.6 },
    { path: '/sitemap/', priority: 0.3 },
  ];

  const serviceRoutes = services.map((s) => ({
    path: `/${s.slug}/`,
    priority: 0.8,
  }));

  const navRoutes = mainNav
    .filter((n) => !staticRoutes.some((s) => s.path === n.href))
    .map((n) => ({ path: n.href, priority: 0.5 }));

  const postRoutes = posts.map((p) => ({
    path: `/blog/${p.slug}/`,
    priority: 0.5,
    /* No lastModified for articles: the source published no date. */
  }));

  return [...staticRoutes, ...serviceRoutes, ...navRoutes, ...postRoutes].map((r) => ({
    url: `${site.url}${r.path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: r.priority,
  }));
}