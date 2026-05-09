import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import {
  breadcrumbJsonLd,
  exhibitionEventsJsonLd,
  type ExhibitionSeed,
} from '@/lib/jsonld';
import { getPayloadClient } from '@/lib/payload';

/**
 * /exhibitions — the page search engines crawl to answer "where has Rushit
 * Shah shown", and where LLM summarisers pull venue + year citations from.
 *
 * Pulls the show list from the same Payload `exhibitions` collection the
 * page itself reads from, so JSON-LD stays in sync with whatever's in the
 * admin. (Used to be a hardcoded mirror — moved into the CMS so adding a
 * show in /admin updates both the visible list and the structured data.)
 */
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Exhibitions — Rushit Shah Solo & Group Shows',
  description:
    'Exhibition archive of Indian abstract artist Rushit Shah — solo and group shows across India (Bengaluru, Vadodara) and Germany (Düsseldorf). Fragments of Passage, KOSEI, A Measure of Many, and more.',
  alternates: { canonical: '/exhibitions' },
  openGraph: {
    url: 'https://www.rushitshah.com/exhibitions',
    title: 'Exhibitions — Rushit Shah Solo & Group Shows',
    description:
      'Rooms the work has lived in — Rushit Shah exhibition history across India and Germany.',
  },
  twitter: {
    title: 'Exhibitions — Rushit Shah Solo & Group Shows',
    description:
      'Rooms the work has lived in — Rushit Shah exhibition history across India and Germany.',
  },
};

/** ISO-2 country code from a free-text country name. JSON-LD's
 *  Place.address.addressCountry is happiest with ISO codes. */
function countryToISO2(name: string): string {
  const map: Record<string, string> = {
    india: 'IN',
    germany: 'DE',
    singapore: 'SG',
    'united states': 'US',
    usa: 'US',
    'united kingdom': 'GB',
    uk: 'GB',
  };
  return map[name.trim().toLowerCase()] ?? name;
}

export default async function ExhibitionsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const payload = await getPayloadClient();
  const res = await payload.find({
    collection: 'exhibitions',
    where: { published: { equals: true } },
    sort: '-date',
    limit: 200,
    depth: 0,
  });

  const shows: ExhibitionSeed[] = res.docs
    .map((doc) => {
      const d = doc as {
        title?: string | null;
        date?: string | null;
        venue?: string | null;
        city?: string | null;
        country?: string | null;
        type?: 'solo' | 'group' | string | null;
      };
      if (!d.date || !d.title) return null;
      return {
        title: d.title,
        startDate: d.date.slice(0, 10), // YYYY-MM-DD for schema.org Event.startDate
        venue: d.venue ?? '',
        city: d.city ?? '',
        country: countryToISO2(d.country ?? ''),
        type: d.type === 'solo' ? ('Solo' as const) : ('Group' as const),
      };
    })
    .filter((x): x is ExhibitionSeed => x !== null);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Exhibitions', url: '/exhibitions' },
        ])}
        id="ld-exhibitions-breadcrumb"
      />
      {exhibitionEventsJsonLd(shows).map((event, i) => (
        <JsonLd key={i} data={event} id={`ld-exhibition-${i}`} />
      ))}
      {children}
    </>
  );
}
