import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rushit Shah — Abstract Painter · Vadodara',
  description:
    'Abstract paintings by Rushit Shah — crackle networks, gradient-splatter inversions, and the Systems series. A studio practice between India, Singapore, and Germany.',
  keywords: [
    'abstract art',
    'abstract painter',
    'Rushit Shah',
    'Indian contemporary art',
    'Vadodara artist',
    'Gujarat artist',
    'crackle network painting',
    'gradient splatter',
    'Systems series',
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
      'Crackle networks. Gradient-splatter inversions. The Systems series — a studio practice in Vadodara.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rushit Shah — Abstract Painter · Vadodara',
    description: 'Crackle networks, gradient-splatter inversions, the Systems series.',
  },
};

export default function RootLayout({
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
      <body>{children}</body>
    </html>
  );
}
