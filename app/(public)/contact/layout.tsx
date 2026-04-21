import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact — Rushit Shah',
  description:
    'Collector enquiries, gallery submissions, studio visits — every message answered personally within 48 hours.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
