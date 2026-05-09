'use client';

import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import HeroBackdrop from '@/components/HeroBackdrop';
import { useShowMotion } from '@/lib/useShowMotion';

/**
 * Client half of /exhibitions. Receives the show list pre-formatted by
 * the server component (`app/(public)/exhibitions/page.tsx`) so we keep
 * SSR + clean SEO while still using framer-motion for reveals.
 *
 * Shape note: dates arrive pre-formatted (`'13 Apr 2026'`) and grouped
 * by year. The server does the date math so the client doesn't have to
 * worry about timezone shifts between SSR and hydration.
 */
const exhibitionsTheme = {
  '--night': '#14261C',    // deep forest green
  '--shadow': '#0C1A14',   // darker green panel
  // --lime not overridden → site default acid lime #C7FF3A pops on the forest green
  background: '#14261C',
} as React.CSSProperties;

export type ShowDisplay = {
  id: string | number;
  date: string;       // pre-formatted, e.g. '13 Apr 2026'
  title: string;
  venue: string;
  city: string;
  country: string;
  type: 'Solo' | 'Group';
};

export type ShowsByYear = {
  /** Years sorted descending (newest first). */
  years: string[];
  /** year → shows in that year, sorted newest first. */
  byYear: Record<string, ShowDisplay[]>;
};

export default function ExhibitionsClient({ years, byYear }: ShowsByYear) {
  // Skip the 18MB studio video on slow / Save-Data connections — the canvas
  // backdrop already runs underneath, so the page still has motion.
  const showMotion = useShowMotion();

  return (
    <div style={exhibitionsTheme} className="relative">
      {/* Painterly canvas animation fixed across the whole page so motion
          continues through hero + shows list. Sections below set transparent
          bg + z-10 so they layer above the canvas. */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <HeroBackdrop />
      </div>

      {/* Hero — studio video plays full-frame behind a full-bleed frosted-glass
          overlay. The headline floats on the glass; everything in the hero
          reads through a single backdrop-blur layer. */}
      <section
        className="relative z-10 min-h-[100svh] flex items-center overflow-hidden pt-32 md:pt-40 pb-12"
        style={{ background: 'transparent' }}
      >
        {showMotion && (
          <video
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              objectFit: 'cover',
              maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
            }}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            aria-hidden
          >
            <source src="/exhibitions-bg.m4v" type="video/mp4" />
          </video>
        )}
        {/* Full-bleed glass — single backdrop-blur across the whole hero,
            faded at the bottom so the section dissolves into the page below
            instead of meeting it at a hard edge. */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'rgba(20, 38, 28, 0.28)',
            backdropFilter: 'blur(18px) saturate(120%)',
            WebkitBackdropFilter: 'blur(18px) saturate(120%)',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          }}
        />
        <div className="max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 relative w-full -mt-20 md:-mt-28">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="display-xl"
            style={{
              color: 'var(--bone)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              fontFamily: '"Aburo", "Space Grotesk", system-ui, sans-serif',
              fontWeight: 700,
            }}
            aria-label="Rooms the work has lived in."
          >
            <span aria-hidden="true">
              Rooms the work{' '}
              <br />
              <span
                style={{
                  color: 'var(--lime)',
                  fontFamily: '"Burnts Marker", "Fraunces", serif',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  letterSpacing: '0.06em',
                  fontSize: '1.7em',
                  lineHeight: 0.85,
                  display: 'inline-block',
                  verticalAlign: 'baseline',
                  marginInline: '0.2em',
                }}
              >
                has lived in.
              </span>
            </span>
          </motion.h1>
        </div>
      </section>

      {/* Shows list — grouped by year, most recent first. Empty state for
          when the CMS collection has been emptied entirely. */}
      <section className="relative z-10 pb-24" style={{ background: 'transparent' }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-12">
          {years.length === 0 ? (
            <p
              className="meta-sm py-20 text-center"
              style={{ color: 'var(--dim)', letterSpacing: '0.22em' }}
            >
              UPCOMING EXHIBITIONS · ANNOUNCED SOON
            </p>
          ) : (
            years.map((year) => (
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
                    style={{
                      color: 'var(--lime)',
                      fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
                      lineHeight: 0.95,
                      letterSpacing: '-0.02em',
                      fontFamily: '"Aburo", "Space Grotesk", system-ui, sans-serif',
                      fontWeight: 700,
                    }}
                  >
                    {year}
                  </span>
                  <span
                    className="meta-sm"
                    style={{
                      color: 'var(--dim)',
                      letterSpacing: '0.22em',
                      fontFamily: '"Aburo", "Space Grotesk", system-ui, sans-serif',
                    }}
                  >
                    {byYear[year].length}{' '}
                    {byYear[year].length === 1 ? 'EXHIBITION' : 'EXHIBITIONS'}
                  </span>
                </div>

                {/* Show rows */}
                <div>
                  {byYear[year].map((s, i) => (
                    <ShowRow key={s.id} show={s} index={i} />
                  ))}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

function ShowRow({ show, index }: { show: ShowDisplay; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group grid grid-cols-12 gap-4 md:gap-6 items-baseline py-5 md:py-7"
    >
      {/* Date */}
      <div
        className="col-span-12 md:col-span-2 meta-sm"
        style={{
          color: 'var(--lime)',
          letterSpacing: '0.22em',
          fontFamily: '"Aburo", "Space Grotesk", system-ui, sans-serif',
        }}
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
        className="col-span-8 md:col-span-3 text-base md:text-lg"
        style={{
          color: 'var(--bone)',
          opacity: 0.9,
          fontFamily: '"Aburo", "Space Grotesk", system-ui, sans-serif',
        }}
      >
        {show.venue}
        <span style={{ color: 'var(--bone)' }}>
          {' · '}
          {show.city}, {show.country}
        </span>
      </div>

      {/* Type */}
      <div
        className="col-span-4 md:col-span-2 text-right meta-sm"
        style={{
          color: show.type === 'Solo' ? 'var(--lime)' : 'var(--bone)',
          letterSpacing: '0.22em',
          fontFamily: '"Aburo", "Space Grotesk", system-ui, sans-serif',
        }}
      >
        {show.type.toUpperCase()}
      </div>
    </motion.div>
  );
}
