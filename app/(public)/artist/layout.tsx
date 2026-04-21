import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import {
  aboutPageJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from '@/lib/jsonld';

/**
 * /artist — the page that absolutely has to rank for "Rushit Shah artist",
 * "abstract artist from Vadodara", "Indian abstract painter biography".
 *
 * The title template from the public layout auto-appends " · Rushit Shah —
 * Abstract Artist" so the final SERP title reads:
 *   "About Rushit Shah — Indian Abstract Artist from Vadodara · Rushit Shah — Abstract Artist"
 */
export const metadata: Metadata = {
  title: 'About Rushit Shah — Indian Abstract Artist from Vadodara',
  description:
    'Rushit Shah is a colourblind abstract artist born 1986 in Vadodara, Gujarat. An Indian contemporary painter working between India, Singapore, and Germany — known for crackle networks, gradient-splatter inversions, and the Fragment + Vyākulatā series.',
  alternates: { canonical: '/artist' },
  openGraph: {
    url: 'https://www.rushitshah.com/artist',
    title: 'About Rushit Shah — Indian Abstract Artist from Vadodara',
    description:
      'Colourblind Indian abstract painter. Three notes on the practice, a biography, and the body of work.',
    type: 'profile',
  },
  twitter: {
    title: 'About Rushit Shah — Indian Abstract Artist from Vadodara',
    description:
      'Colourblind Indian abstract painter. Three notes on the practice, a biography, and the body of work.',
  },
};

export default function ArtistLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={aboutPageJsonLd()} id="ld-artist-about" />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Artist', url: '/artist' },
        ])}
        id="ld-artist-breadcrumb"
      />
      <JsonLd data={faqJsonLd()} id="ld-artist-faq" />
      {children}
    </>
  );
}
