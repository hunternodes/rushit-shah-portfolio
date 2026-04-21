'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

/**
 * /exhibitions — deep forest-green gallery-wall palette with a warm coral
 * accent. Replaces the previous ochre/brown bg; different in mood from every
 * other page (home black, artist aubergine, contact navy, collection white).
 * `background` set on the wrapper too so any gap between sections doesn't bleed
 * through to the global body colour (which is still the default near-black).
 */
const exhibitionsTheme = {
  '--night': '#14261C',    // deep forest green
  '--shadow': '#0C1A14',   // darker green panel
  // --lime not overridden → site default acid lime #C7FF3A pops on the forest green
  background: '#14261C',
} as React.CSSProperties;

/**
 * Every exhibition Rushit has shown work in. Most recent first.
 * Add new shows by prepending to this list.
 */
type Show = {
  date: string;       // e.g. '13 Apr 2026'
  year: string;       // used to group rows
  title: string;
  venue: string;
  city: string;
  country: string;
  type: 'Solo' | 'Group';
};

const shows: Show[] = [
  {
    date: '13 Apr 2026',
    year: '2026',
    title: 'A Measure of Many',
    venue: 'CKP',
    city: 'Bengaluru',
    country: 'India',
    type: 'Group',
  },
  {
    date: '27 Mar 2026',
    year: '2026',
    title: 'A Measure of Many',
    venue: 'IIWC',
    city: 'Bengaluru',
    country: 'India',
    type: 'Group',
  },
  {
    date: '10 Nov 2025',
    year: '2025',
    title: 'KOSEI Art Exhibition',
    venue: 'Shades Gallery',
    city: 'Bengaluru',
    country: 'India',
    type: 'Group',
  },
  {
    date: '7 May 2025',
    year: '2025',
    title: 'Fragments of Passage',
    venue: 'Düsseldorf',
    city: 'Düsseldorf',
    country: 'Germany',
    type: 'Solo',
  },
];

// Group by year, preserving insertion order
const byYear = shows.reduce<Record<string, Show[]>>((acc, s) => {
  (acc[s.year] ||= []).push(s);
  return acc;
}, {});

export default function ExhibitionsPage() {
  const years = Object.keys(byYear); // already most-recent-first given input order

  return (
    <div style={exhibitionsTheme}>
      {/* Hero */}
      <section
        className="relative pt-32 md:pt-40 pb-12 overflow-hidden"
        style={{ background: 'var(--night)' }}
      >
        <div className="static-noise" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(60% 45% at 25% 30%, rgba(255,78,56,0.10) 0%, transparent 65%), radial-gradient(50% 40% at 78% 75%, rgba(255,181,71,0.08) 0%, transparent 65%)',
          }}
        />
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12 relative">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="display-xl"
            style={{
              color: 'var(--bone)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
            }}
          >
            Rooms the work
            <br />
            <span className="in-serif" style={{ color: 'var(--lime)' }}>
              has lived in.
            </span>
          </motion.h1>
        </div>
      </section>

      {/* Shows list — grouped by year, most recent first */}
      <section className="pb-24" style={{ background: 'var(--night)' }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          {years.map((year) => (
            <motion.div
              key={year}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.8 }}
              className="mt-14 md:mt-20 first:mt-4"
            >
              {/* Year header */}
              <div className="flex items-baseline gap-6 mb-6 md:mb-8">
                <span
                  className="in-serif"
                  style={{
                    color: 'var(--lime)',
                    fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {year}
                </span>
                <span
                  className="flex-1 h-px"
                  style={{ background: 'var(--rule)' }}
                />
                <span
                  className="meta-sm"
                  style={{ color: 'var(--dim)', letterSpacing: '0.22em' }}
                >
                  {byYear[year].length}{' '}
                  {byYear[year].length === 1 ? 'EXHIBITION' : 'EXHIBITIONS'}
                </span>
              </div>

              {/* Show rows */}
              <div>
                {byYear[year].map((s, i) => (
                  <ShowRow key={`${year}-${i}`} show={s} index={i} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA — press / gallery enquiries */}
      <section className="py-20" style={{ background: 'var(--shadow)' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <h2 className="display-lg" style={{ color: 'var(--bone)' }}>
            Want to{' '}
            <span className="in-serif" style={{ color: 'var(--lime)' }}>
              show this work?
            </span>
          </h2>
          <p
            className="font-marker mt-6 text-lg max-w-xl mx-auto"
            style={{ color: 'var(--dim)' }}
          >
            Curators, galleries, and fair organisers — reach out for press
            material, availability, and shipping.
          </p>
          <Link href="/contact" className="btn-lime mt-8">
            get in touch →
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ShowRow({ show, index }: { show: Show; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group grid grid-cols-12 gap-4 md:gap-6 items-baseline py-5 md:py-7"
      style={{ borderBottom: '1px solid var(--rule)' }}
    >
      {/* Date */}
      <div
        className="col-span-12 md:col-span-2 meta-sm"
        style={{ color: 'var(--lime)', letterSpacing: '0.22em' }}
      >
        {show.date}
      </div>

      {/* Title */}
      <div className="col-span-12 md:col-span-5">
        <h3
          className="in-serif"
          style={{
            color: 'var(--bone)',
            fontSize: 'clamp(1.5rem, 2.6vw, 2.2rem)',
            lineHeight: 1.05,
          }}
        >
          {show.title}
        </h3>
      </div>

      {/* Venue / city */}
      <div
        className="col-span-8 md:col-span-3 font-marker text-base md:text-lg"
        style={{ color: 'var(--bone)', opacity: 0.9 }}
      >
        {show.venue}
        <span style={{ color: 'var(--dim)' }}>
          {' · '}
          {show.city}, {show.country}
        </span>
      </div>

      {/* Type */}
      <div
        className="col-span-4 md:col-span-2 text-right meta-sm"
        style={{
          color: show.type === 'Solo' ? 'var(--lime)' : 'var(--dim)',
          letterSpacing: '0.22em',
        }}
      >
        {show.type.toUpperCase()}
      </div>
    </motion.div>
  );
}
