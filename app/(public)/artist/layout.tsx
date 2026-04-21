import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artist — Rushit Shah',
  description:
    'Rushit Shah — colourblind abstract painter working between India, Singapore, and Germany. Three notes + biography.',
};

export default function ArtistLayout({ children }: { children: React.ReactNode }) {
  return children;
}
