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
          className="display-lg max-w-5xl"
          style={{
            color: 'var(--bone)',
            fontFamily: '"Aburo", "Space Grotesk", system-ui, sans-serif',
            fontWeight: 700,
          }}
        >
          Mostly finished work,
          <br />
          <span
            style={{
              color: 'var(--lime)',
              fontFamily: '"Guthen Jaqueline", "Fraunces", serif',
              fontStyle: 'normal',
              fontWeight: 400,
              letterSpacing: '0.02em',
              fontSize: '1.7em',
              lineHeight: 0.9,
              display: 'inline-block',
              verticalAlign: 'baseline',
              marginRight: '0.25em',
              whiteSpace: 'nowrap',
            }}
          >
            sometimes the mess in between.
          </span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          whileHover={{ y: -4 }}
          className="relative mt-12 p-10 md:p-14"
          style={{
            background: 'var(--shadow)',
            border: '1px solid var(--rule)',
            transition: 'border 0.4s, box-shadow 0.4s',
          }}
        >
          <span
            aria-hidden="true"
            className="absolute -top-3 left-6 px-2 py-0.5 meta-sm"
            style={{ background: 'var(--night)', color: 'var(--lime)' }}
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
                style={{
                  color: 'var(--bone)',
                  fontFamily: '"Aburo", "Grift", "Space Grotesk", system-ui, sans-serif',
                  fontWeight: 100,
                  letterSpacing: '0.01em',
                }}
              >
                Travels, paintings, and the stories that connect them.
              </p>
            </div>
            <div className="col-span-12 md:col-span-4 flex md:justify-end items-center">
              <a
                href="https://instagram.com/rushitshah08"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow @rushitshah08 on Instagram (opens in new tab)"
                className="group inline-flex items-center gap-3 link-mono"
                style={{ color: 'var(--lime)' }}
              >
                <span className="meta">Follow on Instagram</span>
                <span
                  className="text-2xl transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  ↗
                </span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
