'use client';

import { motion } from 'framer-motion';

/**
 * One clean card pointing at the live Instagram feed. No fake thumbnails.
 */
export default function Frequencies() {
  return (
    <section
      className="relative py-20 md:py-28"
      style={{ background: 'var(--night)' }}
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="display-lg max-w-3xl"
          style={{ color: 'var(--bone)' }}
        >
          Process from{' '}
          <span className="in-serif" style={{ color: 'var(--ice)' }}>
            the studio
          </span>{' '}
          — crackle tests, splatter reels, work in progress.
        </motion.h2>

        <motion.a
          href="https://instagram.com/rushitshah08"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          whileHover={{ y: -4 }}
          className="group relative block mt-12 p-10 md:p-14"
          style={{
            background: 'var(--shadow)',
            border: '1px solid var(--rule)',
            transition: 'border 0.4s, box-shadow 0.4s',
          }}
        >
          <span
            className="absolute -top-3 left-6 px-2 py-0.5 meta-sm"
            style={{ background: 'var(--night)', color: 'var(--ice)' }}
          >
            INSTAGRAM
          </span>

          <div className="grid grid-cols-12 gap-6 items-center">
            <div className="col-span-12 md:col-span-8">
              <div
                className="display-lg in-serif"
                style={{ color: 'var(--bone)', fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
              >
                @rushitshah08
              </div>
              <p
                className="mt-4 text-lg md:text-xl max-w-xl"
                style={{ color: 'var(--dim)' }}
              >
                Studio process, work in progress, splatter reels — the live
                record of the practice between paintings.
              </p>
            </div>
            <div
              className="col-span-12 md:col-span-4 flex md:justify-end items-center gap-3"
              style={{ color: 'var(--lime)' }}
            >
              <span className="meta">Follow on Instagram</span>
              <span
                className="text-2xl transition-transform group-hover:translate-x-1"
                aria-hidden
              >
                ↗
              </span>
            </div>
          </div>
        </motion.a>
      </div>
    </section>
  );
}
