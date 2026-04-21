'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

/**
 * Cursor trail — a soft lime dot that lags behind the cursor with a spring.
 *
 * Interactive-element detection: when the cursor is over an `<a>`, `<button>`,
 * or any `[role="button"]`, the dot grows ~4× and switches to an outlined
 * ring. Reads as a gentle magnetic acknowledgement without ever being loud.
 *
 * Hidden on touch / coarse-pointer devices — a magnetic cursor doesn't make
 * sense there and we don't want to pay the JS cost.
 *
 * `mixBlendMode: difference` keeps the dot visible across every bg — pure
 * black pages, pure white pages, painted heroes — with zero per-page tuning.
 */
export default function CursorTrail() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 220, damping: 24, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 24, mass: 0.4 });

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!canHover) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    // Event delegation on the body so dynamically-rendered interactive
    // elements (gallery tiles, lightbox buttons, CMS-loaded links) get
    // picked up without us having to wire per-element listeners.
    const isInteractive = (el: EventTarget | null): boolean => {
      if (!(el instanceof Element)) return false;
      return !!el.closest('a, button, [role="button"], input, textarea, select, label');
    };
    const onOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) setHovering(true);
    };
    const onOut = (e: MouseEvent) => {
      if (isInteractive(e.target) && !isInteractive(e.relatedTarget)) {
        setHovering(false);
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      animate={{
        width: hovering ? 36 : 10,
        height: hovering ? 36 : 10,
        marginLeft: hovering ? -18 : -5,
        marginTop: hovering ? -18 : -5,
        backgroundColor: hovering ? 'rgba(199, 255, 58, 0)' : 'var(--lime)',
        borderColor: hovering ? 'var(--lime)' : 'rgba(199, 255, 58, 0)',
        borderWidth: hovering ? 1.5 : 0,
      }}
      transition={{ type: 'spring', stiffness: 280, damping: 26, mass: 0.35 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        borderRadius: '50%',
        borderStyle: 'solid',
        mixBlendMode: 'difference',
        pointerEvents: 'none',
        zIndex: 9999,
        x: springX,
        y: springY,
      }}
    />
  );
}
