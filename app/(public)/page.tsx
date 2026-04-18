import Spotlight from '@/components/Spotlight';
import Voice from '@/components/Voice';
import Gallery, { type GalleryPainting } from '@/components/Gallery';
import Signals from '@/components/Signals';
import Frequencies from '@/components/Frequencies';
import Hail from '@/components/Hail';
import Footer from '@/components/Footer';
import { getPayloadClient } from '@/lib/payload';

// Opt out of caching so CMS edits show on every page load in dev.
// Prod will use on-demand revalidation (Step 10).
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/** Best-effort image URL from a mainImage upload relation; fallback to picsum. */
function imageFor(painting: {
  slug?: string | null;
  title?: string | null;
  mainImage?: unknown;
}): { url: string; alt: string } {
  const title = painting.title ?? 'Untitled';
  const media = painting.mainImage;
  if (media && typeof media === 'object' && 'url' in media && media.url) {
    return {
      url: String(media.url),
      alt: ('alt' in media && media.alt ? String(media.alt) : title),
    };
  }
  const seed = painting.slug || title.toLowerCase().replace(/\s+/g, '-');
  return {
    url: `https://picsum.photos/seed/shah-${seed}/1400/1750`,
    alt: title,
  };
}

export default async function Home() {
  const payload = await getPayloadClient();

  // Five Rooms = all featured paintings, sorted by featuredOrder.
  // (We show drafts too so in-progress works appear dimmed alongside published ones.)
  const { docs: featured } = await payload.find({
    collection: 'paintings',
    where: { featured: { equals: true } },
    sort: 'featuredOrder',
    limit: 5,
    depth: 1, // populate the mainImage relation
    draft: true, // include unpublished drafts (Featured in-progress pieces)
  });

  const paintings: GalleryPainting[] = featured.map((p) => {
    const img = imageFor(p);
    return {
      id: p.id,
      systemNumber: p.systemNumber ?? '',
      title: p.title ?? 'Untitled',
      shortDescription: p.shortDescription ?? '',
      year: p.year ?? '',
      medium: p.medium ?? '',
      dimensions: p.dimensions?.displayString ?? '—',
      status: p.status ?? 'available',
      imageUrl: img.url,
      imageAlt: img.alt,
    };
  });

  return (
    <>
      <Spotlight />
      <Voice />
      <Gallery paintings={paintings} />
      <Signals />
      <Frequencies />
      <Hail />
      <Footer />
    </>
  );
}
