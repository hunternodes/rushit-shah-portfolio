'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const nav = [
  { label: 'Home', href: '/' },
  { label: 'Artist', href: '/artist' },
  { label: 'Exhibitions', href: '/exhibitions' },
  { label: 'Collection', href: '/collection' },
  { label: 'Contact', href: '/contact' },
];

const socials = [
  { label: 'Instagram', href: 'https://instagram.com/rushitshah08', handle: '@rushitshah08' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/rushitshah', handle: 'in/rushitshah' },
  { label: 'Artwork Archive', href: 'https://www.artworkarchive.com/profile/rushitshah', handle: 'profile/rushitshah' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href);

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
                fontFamily: '"Burnts Marker", "NewYark", "Grift", "Space Grotesk", system-ui, sans-serif',
                fontWeight: 400,
                fontSize: 'clamp(4.5rem, 9vw, 8rem)',
                lineHeight: 1,
                letterSpacing: '0.005em',
              }}
            >
              Rushit Shah
            </p>
          </div>

          <div className="col-span-6 md:col-span-3 md:col-start-7">
            <div className="meta-sm mb-4" style={{ color: 'var(--dim)' }}>
              [02] INDEX
            </div>
            <ul className="space-y-2">
              {nav.map((l, i) => {
                const active = isActive(l.href);
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      aria-current={active ? 'page' : undefined}
                      className="flex items-baseline gap-3 link-mono"
                      style={{ opacity: active ? 1 : 0.72 }}
                    >
                      <span className="meta-sm" style={{ color: 'var(--lime)' }}>
                        {`0${i + 1}`.slice(-2)}
                      </span>
                      <span
                        style={{
                          fontFamily: '"Aburo", "Space Grotesk", system-ui, sans-serif',
                          fontWeight: active ? 600 : 400,
                        }}
                      >
                        {l.label}
                      </span>
                      {active && (
                        <span
                          aria-hidden="true"
                          className="meta-sm"
                          style={{ color: 'var(--lime)', letterSpacing: '0.22em' }}
                        >
                          · HERE
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
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
                    <span
                      style={{
                        fontFamily: '"Aburo", "Space Grotesk", system-ui, sans-serif',
                      }}
                    >
                      {s.label}
                    </span>
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
