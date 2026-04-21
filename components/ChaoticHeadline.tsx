'use client';

import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, useRef } from 'react';

type Line = {
  text: string;
  italic?: boolean;
  accent?: string; // CSS color for italic accent words
};

/**
 * The hero headline as an interactive field of characters.
 * Each letter:
 *  - enters with a stagger on mount (slide + skew swoop)
 *  - repels from the cursor within a radius (magnetic push)
 *  - flickers to accent color when the cursor is near
 *  - adds a subtle RGB-split (chromatic aberration) on proximity
 *  - jitters slightly when the cursor is over the whole headline
 */
export default function ChaoticHeadline({ lines }: { lines: Line[] }) {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const mx = useMotionValue(-9999);
  const my = useMotionValue(-9999);
  const hovered = useMotionValue(0); // 0 when pointer outside, 1 when inside

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      mx.set(e.clientX - rect.left);
      my.set(e.clientY - rect.top);
      hovered.set(1);
    };
    const onLeave = () => {
      mx.set(-9999);
      my.set(-9999);
      hovered.set(0);
    };
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
    };
  }, [mx, my, hovered]);

  // Plain readable label for screen readers & SEO — joins the lines with spaces
  const accessibleLabel = lines.map((l) => l.text).join(' ');

  return (
    <motion.h1
      ref={containerRef}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.02, delayChildren: 0.1 } },
      }}
      className="display-xl overflow-visible"
      aria-label={accessibleLabel}
    >
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block" aria-hidden="true">
          {line.italic ? (
            <span className="in-serif" style={{ color: line.accent ?? 'inherit' }}>
              {line.text.split('').map((ch, i) => (
                <Letter
                  key={`${lineIdx}-${i}`}
                  ch={ch}
                  mx={mx}
                  my={my}
                  hovered={hovered}
                  accent={line.accent ?? 'var(--lime)'}
                />
              ))}
            </span>
          ) : (
            line.text.split('').map((ch, i) => (
              <Letter
                key={`${lineIdx}-${i}`}
                ch={ch}
                mx={mx}
                my={my}
                hovered={hovered}
                accent="var(--lime)"
              />
            ))
          )}
        </span>
      ))}
    </motion.h1>
  );
}

// ──────────────────────────────────────────────────────────────

const REPEL_RADIUS = 140;
const REPEL_FORCE = 30;
const ACCENT_RADIUS = 90;

function Letter({
  ch,
  mx,
  my,
  hovered,
  accent,
}: {
  ch: string;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  hovered: MotionValue<number>;
  accent: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Store letter's center (relative to the headline) once measured
  const centerX = useRef(0);
  const centerY = useRef(0);

  // Re-measure on mount + resize
  useEffect(() => {
    const measure = () => {
      const el = ref.current;
      if (!el) return;
      const container = el.closest('h1');
      if (!container) return;
      const cRect = container.getBoundingClientRect();
      const eRect = el.getBoundingClientRect();
      centerX.current = eRect.left - cRect.left + eRect.width / 2;
      centerY.current = eRect.top - cRect.top + eRect.height / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    const container = ref.current?.closest('h1');
    if (container) ro.observe(container);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Raw motion values derived from mouse proximity
  const offsetX = useTransform<number, number>([mx, my], ([x, y]) => {
    const dx = (x as number) - centerX.current;
    const dy = (y as number) - centerY.current;
    const dist = Math.hypot(dx, dy);
    if (dist > REPEL_RADIUS) return 0;
    const force = (1 - dist / REPEL_RADIUS) * REPEL_FORCE;
    const angle = Math.atan2(dy, dx);
    return -Math.cos(angle) * force; // negative = push away
  });

  const offsetY = useTransform<number, number>([mx, my], ([x, y]) => {
    const dx = (x as number) - centerX.current;
    const dy = (y as number) - centerY.current;
    const dist = Math.hypot(dx, dy);
    if (dist > REPEL_RADIUS) return 0;
    const force = (1 - dist / REPEL_RADIUS) * REPEL_FORCE;
    const angle = Math.atan2(dy, dx);
    return -Math.sin(angle) * force;
  });

  // Tiny rotation wobble based on horizontal offset
  const rotate = useTransform(offsetX, (v) => v * 0.3);

  // Proximity 0–1 used for color + RGB split
  const proximity = useTransform<number, number>([mx, my], ([x, y]) => {
    const dx = (x as number) - centerX.current;
    const dy = (y as number) - centerY.current;
    const dist = Math.hypot(dx, dy);
    if (dist > ACCENT_RADIUS) return 0;
    return 1 - dist / ACCENT_RADIUS;
  });

  // RGB-split (chromatic aberration) — red offset left, cyan right
  const splitOpacity = useTransform(proximity, (p) => p * 0.7);
  const redX = useTransform(proximity, (p) => -p * 6);
  const cyanX = useTransform(proximity, (p) => p * 6);

  // Color interpolation toward accent
  const color = useTransform(proximity, (p) =>
    p > 0.2 ? accent : 'currentColor',
  );

  // Spring-smooth all the motion for a liquid feel
  const sx = useSpring(offsetX, { stiffness: 300, damping: 20, mass: 0.4 });
  const sy = useSpring(offsetY, { stiffness: 300, damping: 20, mass: 0.4 });
  const sr = useSpring(rotate, { stiffness: 300, damping: 20, mass: 0.4 });

  // Tiny idle jitter only when the field is hovered (adds chaos even on still letters)
  const jitter = useTransform(hovered, (h) => (h ? (Math.random() - 0.5) * 0.6 : 0));

  if (ch === ' ') return <span style={{ whiteSpace: 'pre' }}>{' '}</span>;

  return (
    <motion.span
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 40, skewY: 8 },
        visible: {
          opacity: 1,
          y: 0,
          skewY: 0,
          transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      style={{
        display: 'inline-block',
        x: sx,
        y: sy,
        rotate: sr,
        color,
        position: 'relative',
        willChange: 'transform',
      }}
    >
      {/* RGB split ghosts — positioned absolute, duplicates of the glyph */}
      <motion.span
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          x: redX,
          y: jitter,
          color: '#ff4e38',
          opacity: splitOpacity,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
      >
        {ch}
      </motion.span>
      <motion.span
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          x: cyanX,
          y: jitter,
          color: '#7ae0ff',
          opacity: splitOpacity,
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
      >
        {ch}
      </motion.span>
      {ch}
    </motion.span>
  );
}
