import Spotlight from '@/components/Spotlight';
import Gallery, { type GalleryPainting } from '@/components/Gallery';
import Frequencies from '@/components/Frequencies';
import Hail from '@/components/Hail';
import Footer from '@/components/Footer';
import { getPayloadClient } from '@/lib/payload';

// Opt out of caching so CMS edits show on every page load in dev.
// Prod will use on-demand revalidation later.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * Image URL from the mainImage upload relation, or null if the painting has
 * no attached media.
 *
 * Previously this fell back to picsum.photos seeded by slug — that worked as
 * scaffolding while there were no real photos, but it makes the live site
 * read as "stock-photo placeholder" instead of "painting not yet
 * photographed". Returning null lets <Gallery> render a deliberate empty
 * state (system-number + title on a dark card) instead of a misleading
 * stock image.
 */
function imageFor(painting: {
  title?: string | null;
  mainImage?: unknown;
}): { url: string | null; alt: string } {
  const title = painting.title ?? 'Untitled';
  const media = painting.mainImage;
  if (media && typeof media === 'object' && 'url' in media && media.url) {
    return {
      url: String(media.url),
      alt: 'alt' in media && media.alt ? String(media.alt) : title,
    };
  }
  return { url: null, alt: title };
}

function toGalleryPainting(p: {
  id: number | string;
  systemNumber?: string | null;
  title?: string | null;
  shortDescription?: string | null;
  year?: number | string | null;
  medium?: string | null;
  dimensions?: { displayString?: string | null } | null;
  availability?: string | null;
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
    status: p.availability ?? 'available',
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
    // Newest first on featuredOrder ties — when a real painting and a
    // seeded placeholder both claim slot 2, the recently-edited real one
    // wins. Lets users overwrite seed slots without deleting them first.
    //
    // Array form (NOT comma-separated string): Payload's local-api parses
    // 'featuredOrder,-updatedAt' as a single bogus field name and silently
    // falls back to default order (newest first by id) — which renders the
    // gallery in REVERSE featured order. The REST handler parses comma
    // strings correctly, but local-api needs the array.
    sort: ['featuredOrder', '-updatedAt'],
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
    // Newest first on featuredOrder ties — when a real painting and a
    // seeded placeholder both claim slot 2, the recently-edited real one
    // wins. Lets users overwrite seed slots without deleting them first.
    //
    // Array form (NOT comma-separated string): Payload's local-api parses
    // 'featuredOrder,-updatedAt' as a single bogus field name and silently
    // falls back to default order (newest first by id) — which renders the
    // gallery in REVERSE featured order. The REST handler parses comma
    // strings correctly, but local-api needs the array.
    sort: ['featuredOrder', '-updatedAt'],
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

      <Frequencies />
      <Hail />
      <Footer />
    </>
  );
}
