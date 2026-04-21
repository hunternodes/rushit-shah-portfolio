import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exhibitions — Rushit Shah',
  description:
    'Rooms the work has lived in — Rushit Shah exhibition history. Solo and group shows across India and Germany.',
};

export default function ExhibitionsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
