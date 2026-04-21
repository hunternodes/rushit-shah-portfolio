'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Route cross-fade. Wraps `{children}` in <main>; AnimatePresence keyed on
 * pathname fades the outgoing page out and the incoming page in with a
 * ~320 ms ease. Keeps the site feeling like one continuous document rather
 * than discrete HTML hops.
 *
 * Why `mode="wait"`? We want the outgoing view to fully fade before the new
 * one enters — prevents a flash of two heroes stacked. The trade is ~160 ms
 * of perceived latency per nav; at this duration that reads as intentional
 * pacing, not lag.
 *
 * Layout-wise: we render the motion container *inside* what would otherwise
 * be the `<main>` so the fade applies only to page content, not the nav,
 * scroll progress bar, or cursor trail.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={{
          duration: 0.32,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
