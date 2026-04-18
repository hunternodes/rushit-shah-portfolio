'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Final CTA — a confident, broadcast-style hail. Lime block, ink type.
 * Broken layout: "let's" on one axis, "paint" on another, micro-meta floating.
 */
export default function Hail() {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: 'var(--lime)', color: 'var(--night)' }}
    >
      <div className="static-noise" style={{ mixBlendMode: 'multiply', opacity: 0.15 }} />

      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 relative pt-16">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="display-xl"
          style={{ color: 'var(--night)' }}
        >
          Let's{' '}
          <span className="in-serif">put colour</span>
          <br />
          on your wall.
        </motion.h2>

        <div className="grid grid-cols-12 gap-10 mt-16 items-end">
          <p
            className="font-marker col-span-12 md:col-span-6 max-w-xl text-xl md:text-2xl"
            style={{ color: 'var(--night)', fontWeight: 400, lineHeight: 1.4 }}
          >
            Collector enquiries, gallery submissions, studio visits — every
            message answered personally within 48 hours.
          </p>

          <div className="col-span-12 md:col-span-5 md:col-start-8 flex flex-col gap-5">
            <Link
              href="/contact"
              className="inline-flex items-center justify-between gap-4 px-6 py-5 w-full group"
              style={{ background: 'var(--night)', color: 'var(--lime)' }}
            >
              <span className="display-md" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)' }}>
                Start a conversation
              </span>
              <span className="text-4xl transition-transform group-hover:translate-x-2 ml-3">→</span>
            </Link>

            <a
              href="mailto:rs@rushitshah.com"
              className="inline-flex items-center justify-between gap-4 px-6 py-4 w-full link-mono"
              style={{
                color: 'var(--night)',
                border: '1px solid var(--night)',
              }}
            >
              <span className="meta-sm">rs@rushitshah.com</span>
              <span className="ml-3">↗</span>
            </a>
          </div>
        </div>

        <div
          className="mt-20 pt-6 flex flex-wrap items-baseline justify-between gap-4"
          style={{ borderTop: '1px solid var(--night)' }}
        >
          <div className="meta-sm">Studio · Vadodara / Singapore / Berlin · 2026</div>
          <div className="meta-sm">Space Grotesk · Fraunces · JetBrains Mono</div>
          <div className="meta-sm">© Rushit Shah — all marks his own</div>
        </div>
      </div>
    </section>
  );
}
