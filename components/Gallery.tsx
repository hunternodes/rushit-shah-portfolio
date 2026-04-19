'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, type MotionValue } from 'framer-motion';

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

// Accent cycle — each card gets its own accent from the palette
const accentCycle = ['amber', 'ice', 'coral', 'plum', 'lime'] as const;
const accentCss: Record<(typeof accentCycle)[number], string> = {
  amber: 'var(--amber)',
  ice: 'var(--ice)',
  coral: 'var(--coral)',
  plum: 'var(--plum)',
  lime: 'var(--lime)',
};

/**
 * Gallery — pin-and-scrub horizontal scroll.
 *
 * The section is tall (N × 100vh). Its inner sticky wrapper pins to the viewport
 * while the user scrolls, and the horizontal track translates left, dragging
 * the paintings across the screen like film reel.
 *
 * Each card has: mouse-tilt + lift on hover, subtle base rotation for a
 * "pinned to the wall at slightly wrong angles" feel, and individual
 * scroll-linked fade/scale as it enters/leaves the visible band.
 */
export default function Gallery({ paintings }: { paintings: GalleryPainting[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Smooth the scroll progress so the track glides instead of snapping
  const smooth = useSpring(scrollYProgress, { damping: 30, stiffness: 80, mass: 0.6 });

  // Horizontal slide — move from 5vw start to -((n-1) * 72 + small buffer)vw end
  // 72vw per card works out to a healthy size with breathing room
  const totalTravel = paintings.length > 1 ? (paintings.length - 1) * 72 : 0;
  const x = useTransform(smooth, [0.05, 0.95], ['5vw', `-${totalTravel - 5}vw`]);

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        background: 'var(--shadow)',
        height: `${Math.max(paintings.length, 2) * 100}vh`,
      }}
    >
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
        {/* Fixed header that sits above the horizontal track */}
        <div className="px-5 sm:px-8 lg:px-12 pt-24 pb-6 md:pt-28 md:pb-8">
          <div className="grid grid-cols-12 gap-8 items-end">
            <h2
              className="col-span-12 md:col-span-7 display-lg"
              style={{ color: 'var(--bone)', fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
            >
              {paintings.length === 5 ? 'Five pieces' : `${paintings.length} pieces`} from{' '}
              <span className="in-serif" style={{ color: 'var(--lime)' }}>
                the Fragment
              </span>{' '}
              series.
            </h2>
            <p
              className="font-marker col-span-12 md:col-span-4 md:col-start-9 md:self-end text-base md:text-lg"
              style={{ color: 'var(--dim)' }}
            >
              Scroll — the wall slides across. Each piece sits alone. Pricing on request.
            </p>
          </div>

          {/* Progress rail */}
          <div className="mt-8 relative h-[2px] w-full md:w-1/2" style={{ background: 'var(--rule)' }}>
            <motion.div
              className="absolute left-0 top-0 h-full"
              style={{ background: 'var(--lime)', scaleX: smooth, transformOrigin: 'left' }}
            />
          </div>
        </div>

        {/* Horizontal track — translates left as vertical scroll advances */}
        {paintings.length === 0 ? (
          <p className="px-8 text-lg" style={{ color: 'var(--dim)' }}>
            No featured paintings yet.
          </p>
        ) : (
          <motion.div
            style={{ x }}
            className="flex items-center gap-8 md:gap-14 pb-12 md:pb-16 flex-1"
          >
            {paintings.map((art, i) => (
              <Card key={art.id} art={art} index={i} progress={smooth} total={paintings.length} />
            ))}
            {/* Trailing spacer so the last card can breathe */}
            <div className="shrink-0 w-[20vw]" aria-hidden />
          </motion.div>
        )}
      </div>
    </section>
  );
}

function Card({
  art,
  index,
  progress,
  total,
}: {
  art: GalleryPainting;
  index: number;
  progress: MotionValue<number>;
  total: number;
}) {
  const inProgress = art.status === 'in-progress';
  const accent = accentCss[accentCycle[index % accentCycle.length]];
  // Subtle base rotation — "pinned to the wall at slightly wrong angles"
  const baseRotation = index % 2 === 0 ? -1.4 : 1.2;

  // Each card gets a scroll-progress band: it pops when the track centers it
  const band = 1 / Math.max(total, 1);
  const center = (index + 0.5) * band;
  const near = (d: number) => (p: number) => 1 - Math.min(1, Math.abs(p - center) / d);

  const scale = useTransform(progress, (p) => 0.94 + 0.06 * Math.max(0, near(band * 1.2)(p)));
  const cardOpacity = useTransform(progress, (p) => 0.55 + 0.45 * Math.max(0, near(band * 1.4)(p)));

  // Mouse-tilt on hover
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 180, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 180, damping: 18 });

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
    <motion.article
      className="shrink-0 w-[78vw] md:w-[64vw] lg:w-[56vw] xl:w-[48vw] relative"
      style={{ scale, opacity: cardOpacity, rotate: baseRotation }}
      whileHover={{ rotate: 0, y: -8 }}
      transition={{ type: 'spring', stiffness: 220, damping: 20 }}
    >
      <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
        {/* Painting */}
        <motion.div
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          className="col-span-12 md:col-span-8 relative"
          style={{
            rotateX: rx,
            rotateY: ry,
            transformStyle: 'preserve-3d',
            transformPerspective: 1200,
          }}
        >
          <div
            className="art-frame lit aspect-[4/5] relative"
            style={{ opacity: inProgress ? 0.6 : 1 }}
          >
            <img src={art.imageUrl} alt={art.imageAlt} />
          </div>
          {/* Giant watermark number bleeding off the top */}
          <div
            className="absolute -top-8 md:-top-12 -right-3 pointer-events-none select-none"
            style={{
              fontFamily: '"Space Grotesk", system-ui, sans-serif',
              fontSize: 'clamp(6rem, 12vw, 11rem)',
              lineHeight: 0.8,
              color: accent,
              opacity: 0.12,
              fontWeight: 700,
              letterSpacing: '-0.04em',
            }}
          >
            {(index + 1).toString().padStart(2, '0')}
          </div>
        </motion.div>

        {/* Plaque */}
        <motion.div
          className="col-span-12 md:col-span-4 md:pt-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <div className="meta-sm mb-3" style={{ color: accent }}>
            ROOM {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </div>
          <h3 className="display-md" style={{ color: 'var(--bone)', fontSize: 'clamp(1.5rem, 2.6vw, 2.25rem)' }}>
            {art.title}
          </h3>
          <p
            className="font-marker mt-4 text-lg leading-snug"
            style={{ color: 'var(--bone)', opacity: 0.85 }}
          >
            {art.shortDescription}
          </p>
          <dl className="mt-6 grid grid-cols-[6rem_1fr] gap-y-2 text-sm">
            <dt className="meta-sm" style={{ color: 'var(--dim)' }}>
              YEAR
            </dt>
            <dd style={{ color: 'var(--bone)' }}>{art.year}</dd>
            <dt className="meta-sm" style={{ color: 'var(--dim)' }}>
              MEDIUM
            </dt>
            <dd style={{ color: 'var(--bone)' }}>{art.medium}</dd>
            <dt className="meta-sm" style={{ color: 'var(--dim)' }}>
              SIZE
            </dt>
            <dd style={{ color: 'var(--bone)' }}>{art.dimensions || '—'}</dd>
            <dt className="meta-sm" style={{ color: 'var(--dim)' }}>
              STATUS
            </dt>
            <dd
              className="meta-sm"
              style={{
                color: inProgress ? 'var(--lime)' : 'var(--bone)',
                letterSpacing: '0.18em',
              }}
            >
              {statusLabel(art.status)}
            </dd>
          </dl>
          <a href="/contact" className="btn-ghost mt-6">
            {inProgress ? 'notify on completion' : 'enquire'}
            <span aria-hidden>→</span>
          </a>
        </motion.div>
      </div>
    </motion.article>
  );
}

function statusLabel(status: string) {
  switch (status) {
    case 'available': return 'AVAILABLE';
    case 'sold': return 'SOLD';
    case 'in-progress': return 'IN PROGRESS';
    case 'reserved': return 'RESERVED';
    case 'not-for-sale': return 'NOT FOR SALE';
    default: return status.toUpperCase();
  }
}
