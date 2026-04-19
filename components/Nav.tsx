'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const items = [
  { label: 'Home', href: '/' },
  { label: 'Artist', href: '/artist' },
  { label: 'Shows', href: '/exhibitions' },
  { label: 'Collection', href: '/collection' },
  { label: 'Contact', href: '/contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isLight = pathname?.startsWith('/collection') ?? false;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const bg = isLight
    ? scrolled
      ? 'rgba(255,255,255,0.92)'
      : 'transparent'
    : scrolled
      ? 'rgba(11,11,16,0.82)'
      : 'transparent';
  const fg = isLight ? '#0B0B10' : 'var(--bone)';
  const border = isLight
    ? scrolled ? '1px solid rgba(0,0,0,0.08)' : 'none'
    : scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none';

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: bg,
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: border,
          color: fg,
          transition: 'background 0.5s, border 0.5s, color 0.3s',
        }}
      >
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/" className="group flex items-center gap-3">
              <BlinkBox />
              <AnimatedWordmark color={fg} />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {items.map((item) => {
                const active =
                  item.href === '/' ? pathname === '/' : pathname?.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative"
                    style={{
                      color: fg,
                      opacity: active ? 1 : 0.65,
                      fontFamily: '"NewYark", "Grift", "Space Grotesk", system-ui, sans-serif',
                      fontWeight: 400,
                      fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
                      letterSpacing: '0.005em',
                    }}
                  >
                    {item.label}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute -bottom-2 left-0 right-0 h-[2px]"
                        style={{ background: 'var(--lime)' }}
                        transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <span
                className="meta-sm"
                style={{ color: isLight ? '#6F6F7A' : 'var(--dim)' }}
              >
                {currentTimeIST()}
              </span>
              <Link href="/contact" className="btn-lime !py-2 !px-4 text-[0.7rem]">
                Enquire
              </Link>
            </div>

            <button
              onClick={() => setOpen(!open)}
              className="md:hidden w-10 h-10 flex items-center justify-center"
              style={{ border: `1px solid ${isLight ? 'rgba(0,0,0,0.15)' : 'var(--rule)'}` }}
              aria-label="Menu"
            >
              <div className="flex flex-col gap-1">
                <motion.span
                  animate={{ rotate: open ? 45 : 0, y: open ? 4 : 0 }}
                  className="block w-4 h-[1.5px]"
                  style={{ background: fg }}
                />
                <motion.span
                  animate={{ opacity: open ? 0 : 1 }}
                  className="block w-4 h-[1.5px]"
                  style={{ background: fg }}
                />
                <motion.span
                  animate={{ rotate: open ? -45 : 0, y: open ? -4 : 0 }}
                  className="block w-4 h-[1.5px]"
                  style={{ background: fg }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: 'var(--night)' }}
          >
            <div className="flex flex-col h-full pt-20 px-6 pb-10">
              <div className="meta mb-10" style={{ color: 'var(--dim)' }}>
                INDEX / 05 ITEMS
              </div>
              <div className="flex-1 flex flex-col gap-1">
                {items.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.06 * i }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-baseline justify-between py-5"
                      style={{ borderBottom: '1px solid var(--rule)' }}
                    >
                      <span
                        style={{
                          fontFamily:
                            '"NewYark", "Grift", "Space Grotesk", system-ui, sans-serif',
                          fontSize: 'clamp(1.75rem, 6vw, 2.5rem)',
                          fontWeight: 400,
                          lineHeight: 1,
                        }}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
              <Link href="/contact" className="btn-lime w-full justify-center mt-6">
                Enquire →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function AnimatedWordmark({ color }: { color: string }) {
  const letters = 'Rushit Shah'.split('');
  return (
    <motion.span
      initial="hidden"
      animate="visible"
      whileHover="hover"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.04 } },
        hover: { transition: { staggerChildren: 0.025 } },
      }}
      className="inline-flex leading-none"
      style={{
        color,
        fontFamily: '"NewYark", "Grift", "Space Grotesk", system-ui, sans-serif',
        fontSize: 'clamp(1.4rem, 2vw, 1.9rem)',
        fontWeight: 400,
        letterSpacing: '0.005em',
      }}
    >
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 10, rotate: -6 },
            visible: {
              opacity: 1,
              y: 0,
              rotate: 0,
              transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
            },
            hover: { y: -4, color: 'var(--lime)', rotate: 3 },
          }}
          animate={{
            y: [0, -1.5, 0, 1.5, 0],
            transition: {
              duration: 4 + (i % 3) * 0.6,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.15,
            },
          }}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

function BlinkBox() {
  return (
    <motion.span
      aria-hidden
      className="inline-block"
      style={{
        width: 12,
        height: 12,
        background: '#FFE812',
      }}
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{
        duration: 1.1,
        times: [0, 0.65, 0.68, 1],
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

function currentTimeIST() {
  try {
    const now = new Date();
    const ist = new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata',
    }).format(now);
    return `${ist} IST`;
  } catch {
    return '— IST';
  }
}
