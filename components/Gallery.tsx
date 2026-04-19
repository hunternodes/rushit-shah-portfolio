'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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
 * Bento-grid gallery. All five paintings visible at once in a tight,
 * asymmetric grid — one large "featured" piece on the left, four supporting
 * pieces tiled on the right. Hover any piece to see its caption slide in
 * and the image scale up for detail view.
 *
 *   ┌──────────────┬──────┬──────┐
 *   │              │  02  │  03  │
 *   │     01       ├──────┴──────┤
 *   │   (featured) │  04  │  05  │
 *   └──────────────┴──────┴──────┘
 */
export default function Gallery({ paintings }: { paintings: GalleryPainting[] }) {
  return (
    <section
      className="relative py-16 md:py-20"
      style={{ background: 'var(--shadow)' }}
    >
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
            <span className="in-serif" style={{ color: 'var(--lime)' }}>
              the Fragment
            </span>{' '}
            series.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="font-marker col-span-12 md:col-span-4 text-base md:text-lg md:self-end"
            style={{ color: 'var(--dim)' }}
          >
            Hover any piece — the caption slides in and the image enlarges.
          </motion.p>
        </div>

        {paintings.length === 0 ? (
          <p className="text-lg" style={{ color: 'var(--dim)' }}>
            No featured paintings yet.
          </p>
        ) : (
          <BentoGrid paintings={paintings} />
        )}

        {/* Bottom link to full archive */}
        <div className="mt-12 flex justify-end">
          <Link href="/archive" className="btn-ghost">
            see every piece
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function BentoGrid({ paintings }: { paintings: GalleryPainting[] }) {
  // Layout presets — each entry: [colStart, colSpan, rowStart, rowSpan] on a 6-col × 4-row grid.
  // Index 0 gets the big featured position; the rest tile.
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
  style,
}: {
  art: GalleryPainting;
  index: number;
  accent: string;
  style: React.CSSProperties;
}) {
  const inProgress = art.status === 'in-progress';

  // Mouse tilt (3D) on the tile
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
    <motion.div
      className="group relative overflow-hidden"
      style={{
        ...style,
        rotateX: rx,
        rotateY: ry,
        transformStyle: 'preserve-3d',
        transformPerspective: 1200,
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Image fills the tile — scales + brightens on parent hover via CSS */}
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

      {/* Hover overlay — darkens slightly + brings out colour */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%)',
        }}
      />

      {/* Accent corner mark — always visible, small indicator of room # */}
      <div
        className="absolute top-3 left-3 px-2 py-0.5 meta-sm z-10"
        style={{ background: 'var(--night)', color: accent, letterSpacing: '0.18em' }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* In-progress tag (top-right) */}
      {inProgress && (
        <div
          className="absolute top-3 right-3 px-2 py-0.5 meta-sm z-10"
          style={{ background: accent, color: 'var(--night)', letterSpacing: '0.18em' }}
        >
          IN PROGRESS
        </div>
      )}

      {/* Caption — slides up into view on hover */}
      <div
        className="absolute inset-x-0 bottom-0 p-4 md:p-6 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
        style={{ color: 'var(--bone)' }}
      >
        <div
          className="in-serif"
          style={{ fontSize: 'clamp(1.1rem, 1.8vw, 1.6rem)', lineHeight: 1.05 }}
        >
          {art.title}
        </div>
        <div
          className="meta-sm mt-1.5"
          style={{ color: 'var(--bone)', opacity: 0.75, letterSpacing: '0.14em' }}
        >
          {art.year} · {art.medium}
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 mt-3 meta-sm"
          style={{ color: accent, letterSpacing: '0.18em' }}
        >
          {inProgress ? 'NOTIFY →' : 'ENQUIRE →'}
        </Link>
      </div>

    </motion.div>
  );
}
