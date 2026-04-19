import type { Metadata } from 'next';

/**
 * Root layout = pure pass-through.
 * The `<html>` / `<body>` document structure is owned by each route group:
 *   - `app/(public)/layout.tsx`  — site chrome, Google Fonts, etc.
 *   - `app/(payload)/layout.tsx` — Payload's RootLayout (admin shell)
 *
 * This avoids double-<html> hydration errors when Payload mounts its own shell.
 */

export const metadata: Metadata = {
  title: 'Rushit Shah — Abstract Painter · Vadodara',
  description:
    'Abstract paintings by Rushit Shah — crackle networks, gradient-splatter inversions, and the Fragment series. A studio practice between India, Singapore, and Germany.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children as React.ReactElement;
}
