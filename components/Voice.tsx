'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/**
 * Artist statement. Three tight lines, led by the colourblind declaration.
 * Lines stagger in on scroll.
 */
export default function Voice() {
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: 'var(--night)' }}
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-15%' }}
          transition={{ staggerChildren: 0.18 }}
          className="max-w-[1400px] space-y-10 md:space-y-14"
        >
          <Typewriter text="I am colourblind." />



          <motion.p
            variants={{
              hidden: { opacity: 0, y: 22 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="display-md"
            style={{ color: 'var(--bone)', fontWeight: 400, lineHeight: 1.15 }}
          >
            My paintings are systems looking for order — cobalt, craze,
            gradient, splatter, held at the moment they begin to fail.
          </motion.p>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 22 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="display-md"
            style={{ color: 'var(--dim)', fontWeight: 400, lineHeight: 1.15 }}
          >
            An Eastern sensibility in an international grammar.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16"
        >
          <div className="meta-sm mb-2" style={{ color: 'var(--dim)' }}>
            SIGNED
          </div>
          <div className="text-lg" style={{ color: 'var(--bone)' }}>
            Rushit Shah ·{' '}
            <span className="in-serif" style={{ color: 'var(--lime)' }}>
              Vadodara / Singapore / Düsseldorf
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Typewriter({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const total = text.length;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(i);
      if (i >= total) window.clearInterval(id);
    }, 55);
    return () => window.clearInterval(id);
  }, [inView, text]);

  return (
    <div
      ref={ref}
      className="in-serif display-lg"
      style={{ color: 'var(--lime)' }}
    >
      {text.slice(0, shown)}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
        style={{ display: 'inline-block', marginLeft: '0.15em' }}
      >
        |
      </motion.span>
    </div>
  );
}
