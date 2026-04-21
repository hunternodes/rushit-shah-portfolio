/**
 * Root layout = pure pass-through.
 *
 * The actual <html> / <body> document (and therefore all metadata,
 * structured data, fonts, viewport) is owned by the route groups:
 *   - app/(public)/layout.tsx  — site chrome + per-page metadata template
 *   - app/(payload)/layout.tsx — Payload admin shell
 *
 * We intentionally don't export `metadata` here because Next.js merges
 * parent metadata, and any values we set would compete with the richer
 * site-wide block in `(public)/layout.tsx`. Let the public layout own it.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children as React.ReactElement;
}
