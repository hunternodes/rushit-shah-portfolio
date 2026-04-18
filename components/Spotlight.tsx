'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import VideoBackdrop from '@/components/VideoBackdrop';
import ChaoticHeadline from '@/components/ChaoticHeadline';

/**
 * Hero — full-width video backdrop with a typographic statement centred on top.
 * The framed hero painting has been retired; the video carries the visual weight.
 */
export default function Spotlight() {
  const ref = useRef<HTMLElement>(null);

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
        <motion.div className="col-span-12 md:col-span-9 lg:col-span-8 relative z-10">
          <ChaoticHeadline
            lines={[
              { text: 'Paintings that' },
              { text: 'hold their', italic: true, accent: 'var(--lime)' },
              { text: 'breath.' },
            ]}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6 }}
            className="font-marker mt-8 text-lg md:text-xl max-w-xl"
            style={{ color: 'var(--bone)' }}
          >
            A colourblind painter working between India, Singapore, and
            Germany. Crackle networks and gradient-splatter inversions — a
            practice built on the tension between chaos and control.
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
      </div>
    </section>
  );
}
