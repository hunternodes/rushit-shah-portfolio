'use client';

import Link from 'next/link';

const nav = [
  { label: 'Home', href: '/' },
  { label: 'Artist', href: '/artist' },
  { label: 'Shows', href: '/exhibitions' },
  { label: 'Collection', href: '/collection' },
  { label: 'Contact', href: '/contact' },
];

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/rushitshah08', handle: '@rushitshah08' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rushitshah', handle: 'in/rushitshah' },
  { label: 'ArtworkArchive', href: 'https://www.artworkarchive.com/profile/rushitshah', handle: 'profile/rushitshah' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: 'var(--night)', color: 'var(--bone)', borderTop: '1px solid var(--rule)' }}
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 pt-14 pb-10">
        <div
          className="grid grid-cols-12 gap-8 pt-10"
          style={{ borderTop: '1px solid var(--rule)' }}
        >
          <div className="col-span-12 md:col-span-5">
            <div className="meta-sm mb-4" style={{ color: 'var(--dim)' }}>
              [01] STUDIO
            </div>
            <p
              style={{
                color: 'var(--bone)',
                fontFamily: '"NewYark", "Grift", "Space Grotesk", system-ui, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
                lineHeight: 1,
                letterSpacing: '0.005em',
              }}
            >
              Rushit Shah
            </p>
            <p className="font-marker mt-2 text-lg" style={{ color: 'var(--dim)' }}>
              Abstract paintings — crackle networks, gradient inversions,
              studio work.
              <br />
              Based in Vadodara, Gujarat. Shipping worldwide.
            </p>
            <a
              href="mailto:rs@rushitshah.com"
              className="mt-5 inline-flex link-mono"
              style={{ color: 'var(--lime)' }}
            >
              rs@rushitshah.com ↗
            </a>
          </div>

          <div className="col-span-6 md:col-span-3 md:col-start-7">
            <div className="meta-sm mb-4" style={{ color: 'var(--dim)' }}>
              [02] INDEX
            </div>
            <ul className="space-y-2">
              {nav.map((l, i) => (
                <li key={l.href}>
                  <Link href={l.href} className="flex items-baseline gap-3 link-mono">
                    <span className="meta-sm" style={{ color: 'var(--lime)' }}>
                      {`0${i + 1}`.slice(-2)}
                    </span>
                    <span>{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <div className="meta-sm mb-4" style={{ color: 'var(--dim)' }}>
              [03] ELSEWHERE
            </div>
            <ul className="space-y-2">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-baseline justify-between gap-3 link-mono"
                  >
                    <span>{s.label}</span>
                    <span className="meta-sm" style={{ color: 'var(--dim)' }}>
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="flex flex-wrap items-center justify-between gap-4 mt-12 pt-6"
          style={{ borderTop: '1px solid var(--rule)' }}
        >
          <p className="meta-sm" style={{ color: 'var(--dim)' }}>
            © Rushit Shah — all marks his own · {year}
          </p>
        </div>
      </div>
    </footer>
  );
}
