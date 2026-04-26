'use client';

import { motion } from 'framer-motion';

type PageHeroProps = {
  /**
   * The visual title. May include <span className="in-serif"> for italic
   * accents and <br /> for manual line breaks. Rendered under aria-hidden
   * so the accessible name comes from `ariaTitle` instead.
   */
  title: React.ReactNode;
  /**
   * Plain-text accessible name for the H1. If provided, the visual markup
   * inside `title` is wrapped aria-hidden so screen readers read a clean
   * sentence.
   */
  ariaTitle?: string;
  /** Optional body copy under the H1. */
  subtext?: React.ReactNode;
  /** Optional CTA row under the subtext (buttons, links). */
  cta?: React.ReactNode;
  /**
   * Optional absolute-positioned decorative layer (e.g. the Home video
   * backdrop, radial washes). Rendered with pointer-events: none.
   */
  backdrop?: React.ReactNode;
};

/**
 * PageHero — the one hero every page uses.
 *
 * Spec (locked so every hero lines up exactly):
 *   • Section has NO background of its own → inherits body near-black.
 *   • Container: max-w-[1400px] mx-auto w-full, px-5 sm:px-8 lg:px-12.
 *   • Vertical rhythm: pt-28 md:pt-40 pb-16.
 *   • H1: .display-hero → clamp(2.5rem, 8vw, 6rem) / -0.02em / 0.95.
 *   • Subtext: mt-8, max-w-[60ch], font-marker.
 *   • CTA row: mt-10, flex, wraps gracefully on small widths.
 *
 * Bounding-box parity across pages is the whole point — don't pass extra
 * padding / margin classes in, and don't wrap the <PageHero> in another
 * padded element. It is the top of the page.
 */
export default function PageHero({
  title,
  ariaTitle,
  subtext,
  cta,
  backdrop,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center pt-28 md:pt-40 pb-16 overflow-hidden">
      {backdrop && (
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            maskImage:
              'linear-gradient(to bottom, black 70%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to bottom, black 70%, transparent 100%)',
          }}
        >
          {backdrop}
        </div>
      )}

      <div className="relative max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-12">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="display-hero"
          style={{ color: 'var(--bone)' }}
          aria-label={ariaTitle}
        >
          {ariaTitle ? <span aria-hidden="true">{title}</span> : title}
        </motion.h1>

        {subtext && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25 }}
            className="font-marker mt-8 max-w-[60ch] text-lg md:text-xl"
            style={{ color: 'var(--bone)' }}
          >
            {subtext}
          </motion.p>
        )}

        {cta && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row flex-wrap gap-4"
          >
            {cta}
          </motion.div>
        )}
      </div>
    </section>
  );
}
