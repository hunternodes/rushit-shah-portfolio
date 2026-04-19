'use client';

import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';

type Stat = { label: string; value: number; suffix?: string; accent: string };

const stats: Stat[] = [
  { label: 'works · Fragment series in progress', value: 3, accent: 'var(--lime)' },
  { label: 'signature techniques', value: 2, accent: 'var(--coral)' },
  { label: 'paintings · archive', value: 5, accent: 'var(--ice)' },
  { label: 'countries · IN / SG / DE', value: 3, accent: 'var(--amber)' },
];

export default function Signals() {
  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'var(--shadow)' }}
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {stats.map((s, i) => (
            <StatBlock key={i} stat={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatBlock({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10%' });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v).toString());

  useEffect(() => {
    if (inView) {
      animate(count, stat.value, {
        duration: 1.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      });
    }
  }, [inView, stat.value, index, count]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="relative pt-6"
      style={{ borderTop: '1px solid var(--rule)' }}
    >
      <span
        className="meta-sm absolute -top-[6px] left-0 px-2 py-0.5"
        style={{ background: 'var(--shadow)', color: stat.accent }}
      >
        0{index + 1}
      </span>

      <div className="flex items-baseline gap-1 leading-none">
        <motion.span
          className="display-lg"
          style={{ color: stat.accent, fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
        >
          {rounded}
        </motion.span>
        {stat.suffix && (
          <span
            className="display-md"
            style={{ color: stat.accent, fontSize: 'clamp(1.75rem, 3vw, 2.5rem)' }}
          >
            {stat.suffix}
          </span>
        )}
      </div>
      <p
        className="font-marker mt-4 text-sm max-w-[220px]"
        style={{ color: 'var(--dim)' }}
      >
        {stat.label}
      </p>
    </motion.div>
  );
}
