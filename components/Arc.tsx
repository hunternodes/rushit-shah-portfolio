'use client';

import { motion } from 'framer-motion';

/**
 * Horizontal-spine timeline. Dots along a lime line; year labels above,
 * descriptions below. Scroll-triggered reveal.
 */
const moments = [
  {
    year: 'early',
    label: 'Vadodara',
    body: 'A self-taught beginning in Gujarat — watching, drawing, waiting. The practice starts as attention, not ambition.',
  },
  {
    year: '2020s',
    label: 'Eighty countries',
    body: 'Extended looking, not tourism. Deserts, coastlines, markets, ruins. The accumulation becomes the grammar.',
  },
  {
    year: '2024',
    label: 'The crackle',
    body: 'Cobalt skin, gold craze, red where the surface splits. The first signature technique finds its shape.',
  },
  {
    year: '2025',
    label: 'Inversion',
    body: 'Gold-to-silver gradients with inverted black-and-white splatter. A grammar that belongs to no one else.',
  },
  {
    year: '2026',
    label: 'Systems · Maio Studio',
    body: 'A cohesive body of work begins — eight to ten paintings toward a debut exhibition. Currently represented through Maio Studio, Singapore.',
  },
  {
    year: '+',
    label: 'Longer view',
    body: 'Museum walls, international fairs, collectors who see the long arc of a practice. Present tense.',
  },
];

export default function Arc() {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: 'var(--night)' }}
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-12 gap-8 mb-20">
          <h2
            className="col-span-12 md:col-span-8 display-lg"
            style={{ color: 'var(--bone)' }}
          >
            A practice{' '}
            <span className="in-serif" style={{ color: 'var(--coral)' }}>
              still arriving
            </span>{' '}
            / six markers.
          </h2>
        </div>

        {/* Spine */}
        <div className="relative">
          <div
            className="absolute left-0 right-0 top-14 h-[1px]"
            style={{ background: 'var(--rule)' }}
          />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-14 h-[1px] origin-left"
            style={{ background: 'var(--lime)', width: '100%' }}
          />

          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 md:gap-6 relative">
            {moments.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="relative pt-20"
              >
                <div
                  className="meta-sm absolute top-0"
                  style={{ color: 'var(--lime)' }}
                >
                  {m.year}
                </div>
                <span
                  className="absolute top-[52px] left-0 w-3 h-3 rotate-45"
                  style={{ background: 'var(--lime)' }}
                />
                <div className="display-md" style={{ fontSize: '1.4rem', color: 'var(--bone)' }}>
                  {m.label}
                </div>
                <p
                  className="font-marker mt-3 text-base leading-relaxed"
                  style={{ color: 'var(--dim)' }}
                >
                  {m.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
