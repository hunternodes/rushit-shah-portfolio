'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Final CTA — broadcast lime block. Compact: H2 + subtext (left) and a single
 * primary action (right). Email link + studio meta retired here — both live
 * in the main Footer below; duplicating them just inflates negative space.
 */
export default function Hail() {
  return (
    <section
      className="relative py-12 md:py-16 overflow-hidden"
      style={{ background: 'var(--lime)', color: 'var(--night)' }}
    >
      <div className="static-noise" style={{ mixBlendMode: 'multiply', opacity: 0.15 }} />

      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 relative">
        <div className="grid grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Left: H2 + subtext */}
          <div className="col-span-12 md:col-span-7">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="display-xl"
              style={{
                color: 'var(--night)',
                fontFamily: '"Aburo", "Space Grotesk", system-ui, sans-serif',
                fontWeight: 700,
                lineHeight: 1,
              }}
              aria-label="Let's put colour on your wall."
            >
              <span aria-hidden="true">
                Let's{' '}
                <span
                  style={{
                    fontFamily: '"Guthen Jaqueline", "Fraunces", serif',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    letterSpacing: '0.02em',
                    fontSize: '1.5em',
                    lineHeight: 0.9,
                    display: 'inline-block',
                    verticalAlign: 'baseline',
                    marginInline: '0.18em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  put colour
                </span>
                <br />
                on your wall.
              </span>
            </motion.h2>

            <p
              className="mt-5 max-w-xl text-lg md:text-xl"
              style={{
                color: 'var(--night)',
                fontFamily: '"Aburo", "Grift", "Space Grotesk", system-ui, sans-serif',
                fontWeight: 100,
                lineHeight: 1.4,
                letterSpacing: '0.01em',
              }}
            >
              Collector enquiries, gallery submissions, studio visits — I reply
              to everything within 48 hours.
            </p>
          </div>

          {/* Right: single primary CTA */}
          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-between gap-4 px-6 py-5 w-full group"
              style={{ background: 'var(--night)', color: 'var(--lime)' }}
            >
              <span
                style={{
                  fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                  fontFamily: '"Aburo", "Space Grotesk", system-ui, sans-serif',
                  fontWeight: 700,
                  lineHeight: 1,
                }}
              >
                Start a Conversation
              </span>
              <span
                aria-hidden="true"
                className="text-4xl transition-transform group-hover:translate-x-2 ml-3"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
