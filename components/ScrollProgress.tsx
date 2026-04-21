'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin acid-lime progress bar pinned to the top of the viewport. Tracks
 * `scrollYProgress` (0 → 1) and passes it through a soft spring so the
 * motion has weight — a bare raw value reads as technical; a sprung one
 * reads as premium.
 *
 * Sits above every other layer except the lightbox (z-index handled by the
 * component order in the layout — Nav is z-50, this is z-[51]).
 *
 * Uses `transformOrigin: left` + `scaleX` so the paint is a single
 * transform the GPU loves — no layout, no repaint on scroll.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: 'var(--lime)',
        transformOrigin: '0% 50%',
        scaleX,
        zIndex: 51,
        // Faint lime halo so the bar reads on both dark and white pages
        // without needing per-page overrides.
        boxShadow: '0 0 12px rgba(199, 255, 58, 0.55)',
        pointerEvents: 'none',
      }}
    />
  );
}
