import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/jsonld';

/**
 * Next.js generates /sitemap.xml from this file.
 *
 * Keep `lastModified` as a fresh Date on each build so search engines see
 * the site as actively maintained. When we add CMS-driven pages (e.g.
 * /paintings/[slug]) this is where we'd `await payload.find(...)` and spread
 * dynamic URLs into the list.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/artist`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/collection`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/exhibitions`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.7,
    },
  ];
}
