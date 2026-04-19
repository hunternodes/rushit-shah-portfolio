'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
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

/**
 * Gallery — bento grid + lightbox.
 * Click any tile to open the painting at full aspect ratio in a fullscreen
 * modal. ← → arrow keys navigate between pieces; Esc or backdrop click closes.
 *
 * Reused for every series (Fragment, Vyākulatā, …). The heading + italic
 * accent are parameterised.
 */
export default function Gallery({
  paintings,
  seriesAccent = 'var(--lime)',
  italicPhrase = 'the Fragment',
  italicBeforeSeries = ' series.',
}: {
  paintings: GalleryPainting[];
  seriesAccent?: string;
  /** The italic coloured word(s) in the heading — e.g. 'the Vyākulatā' */
  italicPhrase?: string;
  /** The plain text immediately after the italic phrase — e.g. ' series.' */
  italicBeforeSeries?: string;
}) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  // Keyboard nav when lightbox is open
  useEffect(() => {
    if (openIdx === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIdx(null);
      else if (e.key === 'ArrowRight') setOpenIdx((i) => (i === null ? null : (i + 1) % paintings.length));
      else if (e.key === 'ArrowLeft')
        setOpenIdx((i) => (i === null ? null : (i - 1 + paintings.length) % paintings.length));
    };
    window.addEventListener('keydown', onKey);
    // Lock page scroll while lightbox is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [openIdx, paintings.length]);

  return (
    <section className="relative py-16 md:py-20" style={{ background: 'var(--shadow)' }}>
      <div className="max-w-[1700px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="grid grid-cols-12 gap-8 items-end mb-10 md:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="col-span-12 md:col-span-8 display-lg"
            style={{ color: 'var(--bone)', fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
          >
            {paintings.length === 5 ? 'Five pieces' : `${paintings.length} pieces`} from{' '}
            <span className="in-serif" style={{ color: seriesAccent }}>
              {italicPhrase}
            </span>
            {italicBeforeSeries}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-marker col-span-12 md:col-span-4 text-base md:text-lg md:self-end"
            style={{ color: 'var(--dim)' }}
          >
            Click any piece to view the whole painting full-size.
          </motion.p>
        </div>

        {paintings.length === 0 ? (
          <p className="text-lg" style={{ color: 'var(--dim)' }}>
            No featured paintings yet.
          </p>
        ) : (
          <BentoGrid paintings={paintings} onOpen={(i) => setOpenIdx(i)} />
        )}

        <div className="mt-12 flex justify-end">
          <Link href="/collection" className="btn-ghost">
            see every piece
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      {/* Lightbox overlay */}
      <AnimatePresence>
        {openIdx !== null && (
          <Lightbox
            paintings={paintings}
            index={openIdx}
            onClose={() => setOpenIdx(null)}
            onPrev={() =>
              setOpenIdx((i) => (i === null ? null : (i - 1 + paintings.length) % paintings.length))
            }
            onNext={() =>
              setOpenIdx((i) => (i === null ? null : (i + 1) % paintings.length))
            }
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function BentoGrid({
  paintings,
  onOpen,
}: {
  paintings: GalleryPainting[];
  onOpen: (i: number) => void;
}) {
  const layouts: Array<[number, number, number, number]> = [
    [1, 3, 1, 4], // 01 — big featured (left, full height)
    [4, 2, 1, 2], // 02 — top-mid-right
    [6, 1, 1, 2], // 03 — top-far-right, narrow
    [4, 1, 3, 2], // 04 — bottom-mid-right, narrow
    [5, 2, 3, 2], // 05 — bottom-far-right
  ];

  return (
    <div
      className="grid gap-3 md:gap-4"
      style={{
        gridTemplateColumns: 'repeat(6, 1fr)',
        gridTemplateRows: 'repeat(4, clamp(140px, 18vh, 220px))',
      }}
    >
      {paintings.map((art, i) => {
        const [cs, cSpan, rs, rSpan] = layouts[i] ?? [1, 2, 1, 1];
        const accent = accentCss[accentCycle[i % accentCycle.length]];
        return (
          <Tile
            key={art.id}
            art={art}
            index={i}
            accent={accent}
            onOpen={() => onOpen(i)}
            style={{
              gridColumn: `${cs} / span ${cSpan}`,
              gridRow: `${rs} / span ${rSpan}`,
            }}
          />
        );
      })}
    </div>
  );
}

function Tile({
  art,
  index,
  accent,
  onOpen,
  style,
}: {
  art: GalleryPainting;
  index: number;
  accent: string;
  onOpen: () => void;
  style: React.CSSProperties;
}) {
  const inProgress = art.status === 'in-progress';

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 200, damping: 22 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 22 });

  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative overflow-hidden cursor-zoom-in text-left"
      style={{
        ...style,
        rotateX: rx,
        rotateY: ry,
        transformStyle: 'preserve-3d',
        transformPerspective: 1200,
      }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      aria-label={`Open ${art.title} full size`}
    >
      <img
        src={art.imageUrl}
        alt={art.imageAlt}
        className="block w-full h-full transition-all duration-700 ease-out group-hover:scale-[1.06] group-hover:brightness-110 group-hover:saturate-110"
        style={{
          objectFit: 'cover',
          opacity: inProgress ? 0.55 : 1,
          filter: 'brightness(0.9) saturate(0.95)',
        }}
      />

      {/* Hover overlay — gradient + "expand" hint */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      {/* Room number badge */}
      <div
        className="absolute top-3 left-3 px-2 py-0.5 meta-sm z-10"
        style={{ background: 'var(--night)', color: accent, letterSpacing: '0.18em' }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* In-progress tag */}
      {inProgress && (
        <div
          className="absolute top-3 right-3 px-2 py-0.5 meta-sm z-10"
          style={{ background: accent, color: 'var(--night)', letterSpacing: '0.18em' }}
        >
          IN PROGRESS
        </div>
      )}

      {/* Hover-only: zoom icon on top-right */}
      <div
        className="absolute bottom-3 right-3 w-9 h-9 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
        style={{ background: accent, color: 'var(--night)' }}
        aria-hidden
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 1H1v5M10 1h5v5M10 15h5v-5M6 15H1v-5" />
        </svg>
      </div>

      {/* Caption — slides up on hover */}
      <div
        className="absolute inset-x-0 bottom-0 p-4 md:p-6 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
        style={{ color: 'var(--bone)' }}
      >
        <div className="in-serif" style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.6rem)', lineHeight: 1.05 }}>
          {art.title}
        </div>
        <div
          className="meta-sm mt-1.5"
          style={{ color: 'var(--bone)', opacity: 0.75, letterSpacing: '0.14em' }}
        >
          {art.year} · {art.medium}
        </div>
      </div>
    </motion.button>
  );
}

function Lightbox({
  paintings,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  paintings: GalleryPainting[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const art = paintings[index];
  const total = paintings.length;
  const accent = accentCss[accentCycle[index % accentCycle.length]];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(8, 7, 5, 0.96)' }}
      onClick={onClose}
    >
      {/* Prev / Next hit zones */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous painting"
        className="absolute left-0 top-0 bottom-0 w-[20vw] z-10 group cursor-w-resize"
      >
        <span
          className="absolute left-6 top-1/2 -translate-y-1/2 opacity-40 group-hover:opacity-100 transition-opacity"
          style={{ color: 'var(--bone)', fontSize: '2rem', lineHeight: 1 }}
        >
          ←
        </span>
      </button>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next painting"
        className="absolute right-0 top-0 bottom-0 w-[20vw] z-10 group cursor-e-resize"
      >
        <span
          className="absolute right-6 top-1/2 -translate-y-1/2 opacity-40 group-hover:opacity-100 transition-opacity"
          style={{ color: 'var(--bone)', fontSize: '2rem', lineHeight: 1 }}
        >
          →
        </span>
      </button>

      {/* Close button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
        className="absolute top-5 right-5 md:top-8 md:right-8 z-20 w-10 h-10 flex items-center justify-center"
        style={{
          background: 'transparent',
          border: '1px solid rgba(236,232,219,0.3)',
          color: 'var(--bone)',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M1 1L13 13M13 1L1 13" />
        </svg>
      </button>

      {/* Image + caption, stops propagation so clicking the painting doesn't close */}
      <motion.div
        key={art.id}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-[15] max-w-[92vw] max-h-[88vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={art.imageUrl}
          alt={art.imageAlt}
          style={{
            display: 'block',
            maxWidth: '92vw',
            maxHeight: '75vh',
            objectFit: 'contain',
            boxShadow: '0 40px 120px -20px rgba(0,0,0,0.9)',
          }}
        />
        <div
          className="mt-4 md:mt-6 flex flex-wrap items-baseline justify-between gap-4 w-full max-w-[92vw]"
          style={{ color: 'var(--bone)' }}
        >
          <div>
            <div className="meta-sm" style={{ color: accent, letterSpacing: '0.18em' }}>
              ROOM {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </div>
            <h3
              className="in-serif mt-1"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', lineHeight: 1.05 }}
            >
              {art.title}
            </h3>
          </div>
          <div className="text-right">
            <div className="meta-sm" style={{ letterSpacing: '0.14em' }}>{art.year}</div>
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
          </div>
        </div>
      </motion.div>

      {/* Bottom nav hint */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 meta-sm opacity-50"
        style={{ color: 'var(--bone)', letterSpacing: '0.22em' }}
      >
        ← → navigate · ESC close
      </div>
    </motion.div>
  );
}
