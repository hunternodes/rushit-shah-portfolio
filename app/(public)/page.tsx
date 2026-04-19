import Spotlight from '@/components/Spotlight';
import Gallery, { type GalleryPainting } from '@/components/Gallery';
import Signals from '@/components/Signals';
import Frequencies from '@/components/Frequencies';
import Hail from '@/components/Hail';
import Footer from '@/components/Footer';
import { getPayloadClient } from '@/lib/payload';

// Opt out of caching so CMS edits show on every page load in dev.
// Prod will use on-demand revalidation later.
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
      alt: 'alt' in media && media.alt ? String(media.alt) : title,
    };
  }
  const seed = painting.slug || title.toLowerCase().replace(/\s+/g, '-');
  return {
    url: `https://picsum.photos/seed/shah-${seed}/1400/1750`,
    alt: title,
  };
}

function toGalleryPainting(p: {
  id: number | string;
  systemNumber?: string | null;
  title?: string | null;
  shortDescription?: string | null;
  year?: number | string | null;
  medium?: string | null;
  dimensions?: { displayString?: string | null } | null;
  status?: string | null;
  slug?: string | null;
  mainImage?: unknown;
}): GalleryPainting {
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
}

export default async function Home() {
  const payload = await getPayloadClient();

  // Fragment series — the original 5 pieces
  const fragmentRes = await payload.find({
    collection: 'paintings',
    where: {
      and: [
        { featured: { equals: true } },
        { series: { equals: 'fragment' } },
      ],
    },
    sort: 'featuredOrder',
    limit: 5,
    depth: 1,
    draft: true,
  });

  // Vyākulatā series — the new body of work
  const vyakulataRes = await payload.find({
    collection: 'paintings',
    where: {
      and: [
        { featured: { equals: true } },
        { series: { equals: 'vyakulata' } },
      ],
    },
    sort: 'featuredOrder',
    limit: 5,
    depth: 1,
    draft: true,
  });

  const fragmentPaintings = fragmentRes.docs.map(toGalleryPainting);
  const vyakulataPaintings = vyakulataRes.docs.map(toGalleryPainting);

  return (
    <>
      <Spotlight />

      <Gallery
        paintings={fragmentPaintings}
        seriesAccent="var(--lime)"
        italicPhrase="the Fragment"
        italicBeforeSeries=" series."
      />

      {vyakulataPaintings.length > 0 && (
        <Gallery
          paintings={vyakulataPaintings}
          seriesAccent="var(--coral)"
          italicPhrase="the Vyākulatā"
          italicBeforeSeries=" series."
        />
      )}

      <Signals />
      <Frequencies />
      <Hail />
      <Footer />
    </>
  );
}
