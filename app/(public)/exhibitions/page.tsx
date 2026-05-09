import ExhibitionsClient, {
  type ShowDisplay,
  type ShowsByYear,
} from '@/components/ExhibitionsClient';
import { getPayloadClient } from '@/lib/payload';

// Opt out of caching so CMS edits show on every page load. Will switch to
// on-demand revalidation when we add it.
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/** Format an ISO date as "13 Apr 2026" — matches the design that the
 *  hardcoded array used. Runs server-side so SSR + hydration agree. */
function formatShowDate(iso: string): string {
  const d = new Date(iso);
  const day = d.getUTCDate();
  const month = d.toLocaleString('en-GB', { month: 'short', timeZone: 'UTC' });
  const year = d.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

/**
 * /exhibitions — server component. Fetches the published exhibitions from
 * Payload, formats dates, groups by year, then hands off to the client
 * component for the framer-motion reveals.
 *
 * Used to be a client-only page with a hardcoded `shows` array. Pulling
 * the data into Payload lets Rushit add/edit shows from the admin without
 * a code deploy.
 */
export default async function ExhibitionsPage() {
  const payload = await getPayloadClient();

  const res = await payload.find({
    collection: 'exhibitions',
    where: { published: { equals: true } },
    // Newest first by date. Featured shows still respect date order — if
    // we ever want sticky-pinned shows, we can sort by `-featured,-date`.
    sort: '-date',
    limit: 200,
    depth: 0,
  });

  const shows: ShowDisplay[] = res.docs
    .map((doc) => {
      const d = doc as {
        id: number | string;
        title?: string | null;
        date?: string | null;
        venue?: string | null;
        city?: string | null;
        country?: string | null;
        type?: 'solo' | 'group' | string | null;
      };
      if (!d.date) return null;
      return {
        id: d.id,
        date: formatShowDate(d.date),
        title: d.title ?? '',
        venue: d.venue ?? '',
        city: d.city ?? '',
        country: d.country ?? '',
        type: d.type === 'solo' ? ('Solo' as const) : ('Group' as const),
      };
    })
    .filter((x): x is ShowDisplay => x !== null);

  // Group by year, preserving the descending-date order of `shows`.
  const byYear: Record<string, ShowDisplay[]> = {};
  for (const s of shows) {
    // `s.date` is "13 Apr 2026" — last token is the year.
    const yr = s.date.split(' ').pop() ?? '';
    (byYear[yr] ||= []).push(s);
  }
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a));

  const props: ShowsByYear = { years, byYear };
  return <ExhibitionsClient {...props} />;
}
