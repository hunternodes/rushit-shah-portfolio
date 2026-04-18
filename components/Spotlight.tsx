'use client';

import { useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import Link from 'next/link';
import VideoBackdrop from '@/components/VideoBackdrop';

export type SpotlightHero = {
  title: string;
  systemNumber: string;
  year: number | string;
  medium: string;
  imageUrl: string;
  imageAlt: string;
};

/**
 * Night-studio hero. Mouse-tilt on the hero painting, plus a gentle
 * scroll-linked drift + rotate as the page moves past.
 *
 * Receives the hero painting from the server component (pulled from Payload).
 */
export default function Spotlight({ hero }: { hero: SpotlightHero }) {
  const ref = useRef<HTMLElement>(null);

  // Scroll parallax on the hero painting
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const artY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const artRotate = useTransform(scrollYProgress, [0, 1], [0, -1.5]);
  const artOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.7]);

  // Tilt on mouse
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 120, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pt-16 md:pt-20 pb-16"
      style={{ background: 'var(--night)' }}
    >
      {/* Video backdrop — falls back to the canvas paint-cloud animation if the browser can't decode it */}
      <VideoBackdrop />

      {/* Existing ambient radial wash, layered on top of the backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(80% 60% at 55% 30%, rgba(199,255,58,0.06) 0%, rgba(11,11,16,0) 60%), radial-gradient(50% 40% at 70% 80%, rgba(255,78,56,0.05) 0%, rgba(11,11,16,0) 70%)',
        }}
      />
      <div className="static-noise" />

      <div className="relative max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 pt-0 pb-12">
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-end">
          {/* Title block */}
          <motion.div
            className="col-span-12 md:col-span-7 relative z-10"
          >
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
              }}
              className="display-xl overflow-hidden"
            >
              <motion.span
                className="block"
                variants={{
                  hidden: { opacity: 0, x: -120, skewX: -8 },
                  visible: { opacity: 1, x: 0, skewX: 0 },
                }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                Paintings that
              </motion.span>
              <motion.span
                className="block"
                variants={{
                  hidden: { opacity: 0, x: 120, skewX: 8 },
                  visible: { opacity: 1, x: 0, skewX: 0 },
                }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="in-serif" style={{ color: 'var(--lime)' }}>
                  hold their
                </span>
              </motion.span>
              <motion.span
                className="block"
                variants={{
                  hidden: { opacity: 0, y: 80 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                breath.
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.6 }}
              className="mt-8 text-lg md:text-xl max-w-md"
              style={{ color: 'var(--dim)' }}
            >
              A colourblind painter working between India, Singapore, and
              Germany. Crackle networks and gradient-splatter inversions — a
              practice built on the tension between chaos and control.
              Represented through Maio Studio, Singapore.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.8 }}
              className="flex flex-wrap items-center gap-4 mt-10"
            >
              <Link href="/archive" className="btn-lime">
                Enter the archive
                <span aria-hidden>→</span>
              </Link>
              <Link href="/contact" className="btn-ghost">
                Collector enquiries
                <span aria-hidden>→</span>
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero artwork with mouse-tilt + scroll parallax */}
          <motion.div
            style={{ y: artY, rotate: artRotate, opacity: artOpacity }}
            className="col-span-12 md:col-span-5 relative"
            onMouseMove={onMove}
            onMouseLeave={onLeave}
          >
            <motion.div
              style={{
                rotateX: rx,
                rotateY: ry,
                transformStyle: 'preserve-3d',
                transformPerspective: 1200,
              }}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="art-frame lit aspect-[4/5] max-w-[520px] md:ml-auto"
              >
                <img
                  src={hero.imageUrl}
                  alt={hero.imageAlt}
                />
                {/* Wall label */}
                <div
                  className="absolute -bottom-3 -left-3 px-3 py-2"
                  style={{
                    background: 'var(--lime)',
                    color: 'var(--night)',
                    transform: 'translateZ(20px)',
                  }}
                >
                  <div className="meta-sm">{hero.systemNumber}</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Caption */}
            <div className="flex justify-between items-baseline mt-6 max-w-[520px] md:ml-auto">
              <div>
                <div className="display-md" style={{ color: 'var(--bone)' }}>
                  {hero.title}
                </div>
                <div className="meta-sm mt-1" style={{ color: 'var(--dim)' }}>
                  {hero.year} · {hero.medium}
                </div>
              </div>
              <div className="meta-sm" style={{ color: 'var(--lime)' }}>
                MAIO STUDIO · SG
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
