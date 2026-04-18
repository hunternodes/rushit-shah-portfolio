'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

const exhibitionsTheme = {
  '--night': '#4A2B04',
  '--shadow': '#351D02',
} as React.CSSProperties;

export default function ExhibitionsPage() {
  return (
    <div style={exhibitionsTheme}>
      <section
        className="relative pt-32 md:pt-40 pb-16 overflow-hidden"
        style={{ background: 'var(--night)' }}
      >
        <div className="static-noise" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(50% 40% at 70% 40%, rgba(255,78,56,0.06) 0%, transparent 70%)',
          }}
        />
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 relative">
          <div
            className="meta-sm flex items-center gap-2 mb-8"
            style={{ color: 'var(--dim)' }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: 'var(--lime)' }}
            />
            · INDEX · 03 — SHOWS & EXHIBITIONS
          </div>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="display-xl"
            style={{ color: 'var(--bone)' }}
          >
            No shows{' '}
            <span className="in-serif" style={{ color: 'var(--coral)' }}>
              yet.
            </span>
            <br />
            Working on it.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-10 text-lg md:text-xl max-w-2xl"
            style={{ color: 'var(--dim)' }}
          >
            The first exhibition is in preparation — a cohesive body of work
            from the Systems series. Target: 2026, Vadodara and beyond.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
            className="mt-5 text-lg md:text-xl max-w-2xl"
            style={{ color: 'var(--dim)' }}
          >
            If you represent a gallery or curate shows and want to talk early,
            I would like to hear from you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="mt-10"
          >
            <Link href="/contact" className="btn-lime">
              Get in touch
              <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Upcoming block */}
      <section className="pb-24" style={{ background: 'var(--night)' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-8 md:p-10"
            style={{
              background: 'var(--shadow)',
              borderTop: '1px solid var(--rule)',
              borderBottom: '1px solid var(--rule)',
            }}
          >
            <span
              className="absolute -top-3 left-6 px-2 py-0.5 meta-sm"
              style={{ background: 'var(--lime)', color: 'var(--night)' }}
            >
              UPCOMING · 2026
            </span>

            <h2
              className="display-md mt-3"
              style={{ color: 'var(--bone)' }}
            >
              SYSTEMS —{' '}
              <span className="in-serif" style={{ color: 'var(--lime)' }}>
                A Debut Exhibition
              </span>
            </h2>

            <dl className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <dt className="meta-sm mb-2" style={{ color: 'var(--dim)' }}>
                  BODY OF WORK
                </dt>
                <dd style={{ color: 'var(--bone)' }}>
                  Work in progress · 8–10 paintings
                </dd>
              </div>
              <div>
                <dt className="meta-sm mb-2" style={{ color: 'var(--dim)' }}>
                  VENUE
                </dt>
                <dd style={{ color: 'var(--bone)' }}>
                  TBC · Vadodara / Mumbai
                </dd>
              </div>
              <div>
                <dt className="meta-sm mb-2" style={{ color: 'var(--dim)' }}>
                  STATUS
                </dt>
                <dd style={{ color: 'var(--lime)' }}>
                  Seeking gallery representation
                </dd>
              </div>
            </dl>

            <div className="mt-10 pt-6" style={{ borderTop: '1px solid var(--rule)' }}>
              <Link href="/contact" className="btn-ghost">
                Enquire about this show
                <span aria-hidden>→</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
