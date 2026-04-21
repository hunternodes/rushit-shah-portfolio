import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Collection — Rushit Shah',
  description:
    'The full folio — every available painting by Rushit Shah, synced live from ArtworkArchive. Pricing and enquiries on request.',
};

export default function CollectionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
