import type { Metadata } from 'next';
import '../globals.css';
import Nav from '@/components/Nav';
import CursorTrail from '@/components/CursorTrail';

export const metadata: Metadata = {
  title: 'Rushit Shah — Abstract Painter · Vadodara',
  description:
    'Abstract paintings by Rushit Shah — crackle networks, gradient-splatter inversions, and the Fragment series. A studio practice between India, Singapore, and Germany.',
  keywords: [
    'abstract art',
    'abstract painter',
    'Rushit Shah',
    'Indian contemporary art',
    'Vadodara artist',
    'Gujarat artist',
    'crackle network painting',
    'gradient splatter',
    'Fragment series',
    'art collector India',
  ],
  authors: [{ name: 'Rushit Shah' }],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://www.rushitshah.com',
    siteName: 'Rushit Shah',
    title: 'Rushit Shah — Abstract Painter · Vadodara',
    description:
      'Crackle networks. Gradient-splatter inversions. The Fragment series — a studio practice in Vadodara.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rushit Shah — Abstract Painter · Vadodara',
    description: 'Crackle networks, gradient-splatter inversions, the Fragment series.',
  },
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <CursorTrail />
        <Nav />
        <main>{children}</main>
      </body>
    </html>
  );
}
