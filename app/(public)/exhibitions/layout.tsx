import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import {
  breadcrumbJsonLd,
  exhibitionEventsJsonLd,
  type ExhibitionSeed,
} from '@/lib/jsonld';

/**
 * /exhibitions — the page search engines crawl to answer "where has Rushit
 * Shah shown", and where LLM summarisers pull venue + year citations from.
 *
 * NOTE: keep this show list in sync with app/(public)/exhibitions/page.tsx.
 * If we grow past ~10 shows it's worth moving to Payload CMS and fetching
 * once at build time for both the page and this layout — for now, mirror.
 */
const shows: ExhibitionSeed[] = [
  {
    title: 'A Measure of Many',
    startDate: '2026-04-13',
    venue: 'CKP',
    city: 'Bengaluru',
    country: 'IN',
    type: 'Group',
  },
  {
    title: 'A Measure of Many',
    startDate: '2026-03-27',
    venue: 'IIWC',
    city: 'Bengaluru',
    country: 'IN',
    type: 'Group',
  },
  {
    title: 'KOSEI Art Exhibition',
    startDate: '2025-11-10',
    venue: 'Shades Gallery',
    city: 'Bengaluru',
    country: 'IN',
    type: 'Group',
  },
  {
    title: 'Fragments of Passage',
    startDate: '2025-05-07',
    venue: 'Düsseldorf',
    city: 'Düsseldorf',
    country: 'DE',
    type: 'Solo',
  },
];

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

export default function ExhibitionsLayout({ children }: { children: React.ReactNode }) {
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
