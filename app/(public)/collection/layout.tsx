import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import { breadcrumbJsonLd, collectionPageJsonLd } from '@/lib/jsonld';

/**
 * /collection — the commercial-intent page. Needs to rank for "buy abstract
 * art", "buy abstract paintings", "original abstract art for sale",
 * "buy Indian abstract art". Description hits every one of those phrases
 * naturally; structured data (CollectionPage + AggregateOffer via
 * collectionPageJsonLd) tells Google this is a sales page.
 */
export const metadata: Metadata = {
  title: 'Buy Original Abstract Art — The Full Folio',
  description:
    'Browse and buy original abstract paintings by Indian artist Rushit Shah — every available work, live-synced from ArtworkArchive. Crackle networks, gradient-splatter inversions, Fragment and Vyākulatā series. Shipping worldwide from Vadodara, India. Pricing and enquiries on request.',
  alternates: { canonical: '/collection' },
  keywords: [
    'buy abstract art',
    'buy abstract paintings',
    'abstract art for sale',
    'original abstract paintings',
    'buy Indian abstract art',
    'contemporary abstract art',
    'Rushit Shah collection',
    'Rushit Shah buy art',
    'abstract art online',
    'abstract paintings India',
  ],
  openGraph: {
    url: 'https://www.rushitshah.com/collection',
    title: 'Buy Original Abstract Art — Rushit Shah Collection',
    description:
      'Every available original abstract painting — live from the studio. Pricing and enquiries on request, shipping worldwide.',
  },
  twitter: {
    title: 'Buy Original Abstract Art — Rushit Shah Collection',
    description:
      'Every available original abstract painting — live from the studio. Shipping worldwide.',
  },
};

export default function CollectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={collectionPageJsonLd()} id="ld-collection-page" />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', url: '/' },
          { name: 'Collection', url: '/collection' },
        ])}
        id="ld-collection-breadcrumb"
      />
      {children}
    </>
  );
}
