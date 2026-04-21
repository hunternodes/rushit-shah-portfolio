import type { Metadata, Viewport } from 'next';
import '../globals.css';
import Nav from '@/components/Nav';
import CursorTrail from '@/components/CursorTrail';
import ScrollProgress from '@/components/ScrollProgress';
import PageTransition from '@/components/PageTransition';
import JsonLd from '@/components/JsonLd';
import { personJsonLd, websiteJsonLd, organizationJsonLd } from '@/lib/jsonld';

/**
 * Site-wide metadata — everything per-page layouts inherit from.
 *
 * What's happening here:
 *   • `metadataBase` resolves all relative OG/Twitter image URLs.
 *   • `title.template` lets per-page layouts set just a sub-title; the "·
 *     Rushit Shah — Abstract Artist" suffix is appended automatically.
 *   • The `description` is keyword-dense on purpose (abstract artist, Indian
 *     abstract painter, artist from Vadodara, buy abstract art) so search
 *     engines and LLM crawlers have unambiguous signals to attach to the
 *     brand.
 *   • `alternates.canonical: '/'` on the root makes sure Google treats this as
 *     the canonical version of the home page (not the various param-suffixed
 *     ones that accidentally get indexed).
 *   • `robots.index: true` is explicit so no preview / staging config
 *     accidentally blocks production.
 *   • `verification` slots are present so Rushit can paste his Google Search
 *     Console / Bing Webmaster Tools tokens without touching anything else.
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://www.rushitshah.com'),
  title: {
    default: 'Rushit Shah — Abstract Artist from Vadodara, India',
    template: '%s · Rushit Shah — Abstract Artist',
  },
  description:
    'Rushit Shah is an Indian abstract artist based in Vadodara, Gujarat, working between India, Singapore, and Germany. Buy original abstract paintings — crackle networks, gradient-splatter inversions, and the Fragment + Vyākulatā series. Collector enquiries answered within 48 hours.',
  applicationName: 'Rushit Shah',
  authors: [{ name: 'Rushit Shah', url: 'https://www.rushitshah.com' }],
  creator: 'Rushit Shah',
  publisher: 'Rushit Shah',
  generator: 'Next.js',
  keywords: [
    // Primary identity
    'Rushit Shah',
    'Rushit Shah artist',
    'Rushit Shah painter',
    'Rushit Shah abstract',
    // Category + geography
    'abstract artist',
    'abstract painter',
    'Indian abstract artist',
    'Indian contemporary artist',
    'abstract artist India',
    'abstract artist from India',
    'artist from Vadodara',
    'Vadodara artist',
    'Gujarat artist',
    'contemporary Indian painter',
    'Indian abstract painting',
    // Commercial intent
    'buy abstract art',
    'buy abstract paintings',
    'abstract art for sale',
    'original abstract paintings',
    'art collector India',
    'abstract art commission',
    'buy Indian abstract art',
    // Practice-specific
    'crackle network painting',
    'gradient splatter',
    'colourblind artist',
    'Fragment series',
    'Vyākulatā series',
    'Maio Studio',
  ],
  category: 'art',
  classification: 'Visual Art / Painting / Contemporary Abstract',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    alternateLocale: ['en_US', 'en_GB', 'en_SG', 'en_DE'],
    url: 'https://www.rushitshah.com',
    siteName: 'Rushit Shah — Abstract Artist',
    title: 'Rushit Shah — Abstract Artist from Vadodara, India',
    description:
      'Indian abstract artist Rushit Shah — original paintings, crackle networks, gradient-splatter inversions. Studio in Vadodara; shipping worldwide.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Rushit Shah — Abstract Artist',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rushit Shah — Abstract Artist from Vadodara, India',
    description:
      'Indian abstract artist — crackle networks, gradient-splatter inversions, original paintings shipped worldwide.',
    images: ['/opengraph-image'],
  },
  icons: {
    icon: [{ url: '/favicon.ico' }],
  },
  verification: {
    // Paste Search Console / Bing tokens here when Rushit has them.
    google: undefined,
    yandex: undefined,
    other: {
      // e.g. 'ahrefs-site-verification': '…', 'facebook-domain-verification': '…'
    },
  },
  other: {
    // Hints for LLM/AI crawlers that aren't covered by the standard robots
    // directives. Most respect these loosely; the real signal is robots.txt.
    'ai-content-declaration':
      'human-authored artist portfolio, published by Rushit Shah',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0C0B0A' },
    { media: '(prefers-color-scheme: dark)', color: '#0C0B0A' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Rushit Shah — updates"
          href="/feed.xml"
        />
        {/* Site-wide structured data. Person + WebSite + Organization
            let Google build a Knowledge Panel and let LLMs extract facts
            (name, location, practice, sameAs links) without hallucinating. */}
        <JsonLd data={personJsonLd} id="ld-person" />
        <JsonLd data={websiteJsonLd} id="ld-website" />
        <JsonLd data={organizationJsonLd} id="ld-organization" />
      </head>
      <body>
        <ScrollProgress />
        <CursorTrail />
        <Nav />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
