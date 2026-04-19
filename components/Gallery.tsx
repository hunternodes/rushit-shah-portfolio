'use client';

import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import Link from 'next/link';

export type GalleryPainting = {
  id: string | number;
  systemNumber: string;
  title: string;
  shortDescription: string;
  year: number | string;
  medium: string;
  dimensions: string;
  status: string;
  imageUrl: string;
  imageAlt: string;
};

const accentCycle = ['amber', 'ice', 'coral', 'plum', 'lime'] as const;
const accentCss: Record<(typeof accentCycle)[number], string> = {
  amber: 'var(--amber)',
  ice: 'var(--ice)',
  coral: 'var(--coral)',
  plum: 'var(--plum)',
  lime: 'var(--lime)',
};
const accentRgb: Record<(typeof accentCycle)[number], string> = {
  amber: '255, 181, 71',
  ice: '122, 224, 255',
  coral: '255, 78, 56',
  plum: '184, 95, 160',
  lime: '199, 255, 58',
};

/**
 * Gallery — exhibition-wall style.
 * Each painting gets its own full-viewport section. Image dominates.
 * Scroll triggers parallax + fade; hover enlarges the painting for closer study.
 * Caption sits minimally beneath each piece.
 */
export default function Gallery({ paintings }: { paintings: GalleryPainting[] }) {
  return (
    <section className="relative" style={{ background: 'var(--shadow)' }}>
      {/* Opening header */}
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 pt-24 md:pt-32 pb-8">
        <div className="grid grid-cols-12 gap-8 items-end">
          <h2
            className="col-span-12 md:col-span-8 display-lg"
            style={{ color: 'var(--bone)', fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
          >
            {paintings.length === 5 ? 'Five pieces' : `${paintings.length} pieces`} from{' '}
            <span className="in-serif" style={{ color: 'var(--lime)' }}>
              the Fragment
            </span>{' '}
            series.
          </h2>
          <p
            className="font-marker col-span-12 md:col-span-4 md:self-end text-base md:text-lg"
            style={{ color: 'var(--dim)' }}
          >
            Scroll through — hover any painting to see it up close.
          </p>
        </div>
      </div>

      {paintings.length === 0 ? (
        <p className="px-8 py-20 text-lg" style={{ color: 'var(--dim)' }}>
          No featured paintings yet.
        </p>
      ) : (
        paintings.map((art, i) => (
          <Room key={art.id} art={art} index={i} total={paintings.length} />
        ))
      )}
    </section>
  );
}

function Room({
  art,
  index,
  total,
}: {
  art: GalleryPainting;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const accentKey = accentCycle[index % accentCycle.length];
  const accent = accentCss[accentKey];
  const accentRgbVal = accentRgb[accentKey];
  const inProgress = art.status === 'in-progress';

  // Scroll progress relative to this room's entry/exit
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Parallax: image drifts slower than the page
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  // Fade-in as it enters, fade-out as it leaves
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0, 1, 1, 0]);
  // Subtle scale arc — biggest when centered
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.94]);
  // Watermark number drifts opposite direction
  const numberY = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <div
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-20 md:py-28 overflow-hidden"
    >
      {/* Accent wash — coloured radial glow behind the piece */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(55% 60% at 50% 50%, rgba(${accentRgbVal}, 0.08) 0%, rgba(${accentRgbVal}, 0) 70%)`,
        }}
      />

      {/* Giant watermark number behind the piece, drifting counter-parallax */}
      <motion.div
        aria-hidden
        style={{
          y: numberY,
          fontFamily: '"Space Grotesk", system-ui, sans-serif',
          fontSize: 'clamp(14rem, 35vw, 42rem)',
          lineHeight: 0.8,
          color: accent,
          opacity: 0.06,
          fontWeight: 700,
          letterSpacing: '-0.06em',
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
      >
        {(index + 1).toString().padStart(2, '0')}
      </motion.div>

      {/* The painting — centered, dominant */}
      <motion.figure
        style={{ y, opacity, scale, opacity: inProgress ? 0.7 : opacity }}
        className="relative z-10 w-full max-w-[min(92vw,1100px)] mx-auto px-5"
      >
        <motion.div
          className="relative group cursor-zoom-in"
          whileHover={{ scale: 1.04 }}
          transition={{ type: 'spring', stiffness: 160, damping: 22 }}
        >
          <img
            src={art.imageUrl}
            alt={art.imageAlt}
            className="block w-auto mx-auto"
            style={{
              maxHeight: '78vh',
              maxWidth: '100%',
              objectFit: 'contain',
              boxShadow: `0 30px 100px -20px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(${accentRgbVal}, 0.12)`,
              filter: 'brightness(0.92)',
              transition: 'filter 500ms ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.filter = 'brightness(1.0)')}
            onMouseLeave={(e) => (e.currentTarget.style.filter = 'brightness(0.92)')}
          />

          {/* In-progress overlay label */}
          {inProgress && (
            <div
              className="absolute top-4 right-4 px-3 py-1.5 meta-sm"
              style={{
                background: 'var(--night)',
                color: 'var(--lime)',
                letterSpacing: '0.18em',
              }}
            >
              IN PROGRESS
            </div>
          )}
        </motion.div>

        {/* Minimal caption — title + year/medium + description */}
        <figcaption className="mt-8 md:mt-10 flex flex-wrap items-end justify-between gap-4 md:gap-8 max-w-[min(92vw,900px)] mx-auto">
          <div className="flex-1 min-w-[220px]">
            <div className="meta-sm mb-2" style={{ color: accent }}>
              ROOM {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </div>
            <h3
              className="in-serif"
              style={{
                color: 'var(--bone)',
                fontSize: 'clamp(1.5rem, 3vw, 2.4rem)',
                lineHeight: 1.05,
              }}
            >
              {art.title}
            </h3>
            <p
              className="font-marker mt-3 text-base md:text-lg leading-snug max-w-prose"
              style={{ color: 'var(--dim)' }}
            >
              {art.shortDescription}
            </p>
          </div>
          <div className="text-right min-w-[180px] pt-2">
            <div className="meta-sm" style={{ color: 'var(--bone)' }}>{art.year}</div>
            <div
              className="meta-sm mt-1"
              style={{ color: 'var(--dim)', letterSpacing: '0.14em' }}
            >
              {art.medium}
            </div>
            {art.dimensions && art.dimensions !== '—' && (
              <div className="meta-sm mt-1" style={{ color: 'var(--dim)' }}>
                {art.dimensions}
              </div>
            )}
            <Link
              href="/contact"
              className="btn-ghost mt-4 inline-flex"
              style={{ fontSize: '0.7rem' }}
            >
              {inProgress ? 'notify' : 'enquire'}
              <span aria-hidden>→</span>
            </Link>
          </div>
        </figcaption>
      </motion.figure>
    </div>
  );
}
