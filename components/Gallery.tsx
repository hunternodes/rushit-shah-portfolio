'use client';

import { motion } from 'framer-motion';
import { artworks, accentColor } from '@/lib/artworks';

/**
 * The works as gallery rooms: each painting gets its own wall, with a big
 * serial number and the wall plaque. Alternating alignment. Asymmetric col spans.
 */
export default function Gallery() {
  return (
    <section
      className="relative py-20 md:py-24"
      style={{ background: 'var(--shadow)' }}
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="rule-label mb-16">
          <span className="meta" style={{ color: 'var(--dim)' }}>
            [ 04 ]  §  FIVE ROOMS
          </span>
        </div>

        <div className="grid grid-cols-12 gap-8 mb-16 md:mb-24">
          <h2
            className="col-span-12 md:col-span-7 display-lg"
            style={{ color: 'var(--bone)' }}
          >
            Five pieces from{' '}
            <span className="in-serif" style={{ color: 'var(--lime)' }}>
              the Systems
            </span>{' '}
            series.
          </h2>
          <p
            className="col-span-12 md:col-span-4 md:col-start-9 md:self-end text-lg"
            style={{ color: 'var(--dim)' }}
          >
            Each piece sits alone on a wall. Pricing on request — enquire for
            availability, shipping, and collector details. Represented through
            Maio Studio, Singapore.
          </p>
        </div>

        <div className="space-y-20 md:space-y-28">
          {artworks.map((art, i) => (
            <Room key={art.id} art={art} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Room({
  art,
  index,
}: {
  art: (typeof artworks)[number];
  index: number;
}) {
  const left = index % 2 === 0;
  const accent = accentColor[art.accent];
  const inProgress = art.status === 'in-progress';

  return (
    <div className="grid grid-cols-12 gap-6 md:gap-10 items-center relative">
      {/* Serial number — huge */}
      <div
        className={`absolute top-0 ${left ? 'right-0' : 'left-0'} -z-10 pointer-events-none`}
      >
        <span
          className="display-xl opacity-[0.05]"
          style={{ color: 'var(--bone)', fontWeight: 700 }}
        >
          {art.no.split(' / ')[0]}
        </span>
      </div>

      {/* Artwork */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8 }}
        className={`col-span-12 md:col-span-7 ${left ? '' : 'md:col-start-6'}`}
      >
        <div
          className={`art-frame lit aspect-[4/5] relative`}
          style={{ opacity: inProgress ? 0.6 : 1 }}
        >
          <img
            src={art.src}
            alt={art.title}
            onError={(e) => ((e.currentTarget as HTMLImageElement).src = art.placeholder)}
          />
          {/* Curtain wipe overlay */}
          <motion.div
            initial={{ scaleX: 1 }}
            whileInView={{ scaleX: 0 }}
            viewport={{ once: true, margin: '-15%' }}
            transition={{ duration: 1.1, ease: [0.85, 0, 0.15, 1], delay: 0.15 }}
            className="absolute inset-0 pointer-events-none z-[2]"
            style={{
              background: accent,
              transformOrigin: left ? 'right center' : 'left center',
            }}
          />
          <div
            className="absolute bottom-4 left-4 px-3 py-1.5 z-[3]"
            style={{ background: 'var(--night)', color: accent }}
          >
            <div className="meta-sm">No. {art.no}</div>
          </div>
        </div>
      </motion.div>

      {/* Plaque */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10%' }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`col-span-12 md:col-span-4 ${left ? 'md:col-start-9' : 'md:col-start-1 md:row-start-1'}`}
      >
        <div className="meta-sm mb-3" style={{ color: accent }}>
          ROOM {index + 1} / 5
        </div>
        <h3 className="display-md" style={{ color: 'var(--bone)' }}>
          {art.title}
        </h3>
        <p
          className="mt-4 text-lg leading-snug"
          style={{ color: 'var(--bone)', opacity: 0.85 }}
        >
          {art.caption}
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
          <dd style={{ color: 'var(--bone)' }}>{art.dimensions ?? '—'}</dd>
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
            {inProgress ? 'IN PROGRESS' : 'AVAILABLE'}
          </dd>
        </dl>
        <a href="/contact" className="btn-ghost mt-6">
          {inProgress ? 'notify on completion' : 'enquire'}
          <span aria-hidden>→</span>
        </a>
      </motion.div>
    </div>
  );
}
