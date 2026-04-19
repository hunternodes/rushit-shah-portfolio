'use client';

import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

/**
 * /artist runs in its own theme — deep aubergine with warm amber-gold
 * replacing the site's acid lime. Feels like a gallery salon / library.
 * All child sections that reference these vars pick it up automatically.
 */
const artistTheme = {
  '--night': '#1A0E20',   // deep aubergine base
  '--shadow': '#241528',  // slightly lifted aubergine panel
  '--bone': '#F4E8D4',    // warm parchment text
  '--dim': '#A08A9B',     // muted mauve-rose for secondary copy
  '--rule': '#3A2A3E',    // plum rule lines
  '--lime': '#D9A94B',    // amber-gold accent (replaces acid lime)
} as React.CSSProperties;

export default function ArtistPage() {
  return (
    <div style={artistTheme}>
      <section
        className="relative min-h-[88vh] flex items-center overflow-hidden pt-28 md:pt-32 pb-20"
        style={{ background: 'var(--night)' }}
      >
        <div className="static-noise" />
        {/* Two warm radial washes anchoring the composition */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(65% 55% at 22% 30%, rgba(217, 169, 75, 0.14) 0%, transparent 65%), radial-gradient(55% 50% at 82% 72%, rgba(184, 95, 160, 0.10) 0%, transparent 65%)',
          }}
        />
        {/* Drifting ambient glow */}
        <motion.div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: '42vw',
            height: '42vw',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(217,169,75,0.15) 0%, transparent 60%)',
            filter: 'blur(40px)',
            mixBlendMode: 'screen',
            top: '5%',
            right: '-8%',
          }}
          animate={{
            x: ['0%', '-6%', '4%', '0%'],
            y: ['0%', '8%', '-5%', '0%'],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 relative w-full">
          <div className="grid grid-cols-12 gap-10 md:gap-14 items-center">
            {/* Text column — centered vertically against the portrait */}
            <div className="col-span-12 md:col-span-7 lg:col-span-7 order-2 md:order-1">
              {/* Small editorial caption above the headline */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="meta-sm mb-6 flex items-center gap-3"
                style={{ color: 'var(--lime)', letterSpacing: '0.28em' }}
              >
                <span
                  className="inline-block w-6 h-px"
                  style={{ background: 'var(--lime)' }}
                />
                RUSHIT SHAH
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                className="display-xl"
                style={{
                  color: 'var(--bone)',
                  lineHeight: 0.95,
                  letterSpacing: '-0.02em',
                }}
              >
                I paint in layers,
                <br />
                then{' '}
                <span className="in-serif" style={{ color: 'var(--lime)' }}>
                  argue with them.
                </span>
              </motion.h1>

              {/* Meta row — balances the column against the portrait */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5 }}
                className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5"
              >
                <div>
                  <div
                    className="meta-sm"
                    style={{ color: 'var(--lime)', letterSpacing: '0.22em' }}
                  >
                    BORN
                  </div>
                  <div
                    className="mt-2"
                    style={{ color: 'var(--bone)', fontSize: '0.95rem' }}
                  >
                    1986 · Vadodara
                  </div>
                </div>
                <div
                  className="w-px h-10 hidden sm:block"
                  style={{ background: 'var(--rule)' }}
                />
                <div>
                  <div
                    className="meta-sm"
                    style={{ color: 'var(--lime)', letterSpacing: '0.22em' }}
                  >
                    STUDIO
                  </div>
                  <div
                    className="mt-2"
                    style={{ color: 'var(--bone)', fontSize: '0.95rem' }}
                  >
                    IN / SG / DE
                  </div>
                </div>
                <div
                  className="w-px h-10 hidden sm:block"
                  style={{ background: 'var(--rule)' }}
                />
                <div>
                  <div
                    className="meta-sm"
                    style={{ color: 'var(--lime)', letterSpacing: '0.22em' }}
                  >
                    PRACTICE
                  </div>
                  <div
                    className="mt-2"
                    style={{ color: 'var(--bone)', fontSize: '0.95rem' }}
                  >
                    Abstract painter
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Portrait column — simpler treatment, no heavy UI frame */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="col-span-12 md:col-span-5 lg:col-span-5 order-1 md:order-2 relative"
            >
              {/* Gold glow halo behind the image so it integrates with the bg */}
              <div
                aria-hidden
                className="absolute inset-0 -m-8 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(60% 60% at 50% 45%, rgba(217,169,75,0.25) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: '4 / 5',
                  boxShadow:
                    '0 40px 100px -20px rgba(0,0,0,0.65), 0 0 0 1px rgba(217,169,75,0.18) inset',
                }}
              >
                <motion.img
                  src="/images/rushit-hands.png"
                  alt="Rushit Shah — paint-covered hands in the studio, a yellow canvas behind"
                  className="block w-full h-full object-cover"
                  style={{ filter: 'saturate(0.9) contrast(1.04) brightness(0.95)' }}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
                />
                {/* Soft vignette that deepens toward the aubergine base */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(26,14,32,0.55) 100%)',
                  }}
                />
                <div
                  className="absolute bottom-4 left-4 px-2 py-1 meta-sm"
                  style={{
                    background: 'rgba(26,14,32,0.85)',
                    color: 'var(--lime)',
                    backdropFilter: 'blur(6px)',
                    letterSpacing: '0.18em',
                  }}
                >
                  PORTRAIT · STUDIO
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Merged voice + portrait — three notes (first person) and biographical facts
          (third person) woven around a sticky portrait. An amber halo bleeds from the
          image into the text column so they read as one composition. */}
      <section
        className="relative overflow-hidden py-24 md:py-32"
        style={{ background: 'var(--shadow)' }}
      >
        {/* Amber halo behind the portrait that blurs into the text column */}
        <div
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: '60vw',
            height: '60vw',
            left: '-10vw',
            top: '50%',
            transform: 'translateY(-50%)',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(217,169,75,0.14) 0%, transparent 65%)',
            filter: 'blur(60px)',
            mixBlendMode: 'screen',
          }}
        />

        <div className="max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 relative">
          <div className="grid grid-cols-12 gap-10 md:gap-16">
            {/* Portrait column — sticky so it stays in view while the visitor reads */}
            <div className="col-span-12 md:col-span-5">
              <div className="md:sticky md:top-28">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative"
                >
                  <div
                    className="relative overflow-hidden"
                    style={{
                      aspectRatio: '4 / 5',
                      boxShadow:
                        '0 40px 100px -20px rgba(0,0,0,0.65), 0 0 0 1px rgba(217,169,75,0.18) inset',
                    }}
                  >
                    <motion.img
                      src="/images/rushit-portrait.png"
                      alt="Rushit Shah — portrait, Paris"
                      className="block w-full h-full object-cover"
                      style={{ filter: 'saturate(0.9) contrast(1.04) brightness(0.95)' }}
                      animate={{ y: [0, -6, 0] }}
                      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    {/* soft vignette fading into aubergine base */}
                    <div
                      aria-hidden
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(36,21,40,0.55) 100%)',
                      }}
                    />
                  </div>
                </motion.div>

                {/* Meta stack directly under the portrait — ties the image to the text */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.25 }}
                  className="mt-6"
                >
                  <div
                    className="meta-sm"
                    style={{ color: 'var(--lime)', letterSpacing: '0.28em' }}
                  >
                    b. 1986
                  </div>
                  <div
                    className="in-serif mt-2"
                    style={{
                      color: 'var(--bone)',
                      fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
                      lineHeight: 1.05,
                    }}
                  >
                    Vadodara
                  </div>
                  <div
                    className="meta-sm mt-4"
                    style={{ color: 'var(--dim)', letterSpacing: '0.2em' }}
                  >
                    Studio · IN / SG / DE
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Text column — first-person voice on top, third-person facts below,
                separated by a small editorial divider */}
            <div className="col-span-12 md:col-span-7 space-y-14 md:space-y-16">
              {/* First-person voice */}
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="meta-sm mb-6 flex items-center gap-3"
                  style={{ color: 'var(--lime)', letterSpacing: '0.28em' }}
                >
                  <span
                    className="inline-block w-6 h-px"
                    style={{ background: 'var(--lime)' }}
                  />
                  IN THE ARTIST'S WORDS
                </motion.div>

                <div
                  className="space-y-7 text-xl md:text-2xl leading-snug"
                  style={{ color: 'var(--bone)' }}
                >
                  <Reveal>
                    <p>
                      I am interested in the places where organic systems fail
                      gracefully — neural maps, cracked skin, constellations,
                      decay. My paintings are attempts to hold that failure
                      still long enough to look at it. I am colourblind. I have
                      spent my whole life feeling colour rather than naming it.
                      I think that is why I trust it.
                    </p>
                  </Reveal>
                  <Reveal>
                    <p style={{ color: 'var(--dim)' }}>
                      The work is made in layers. Cobalt laid flat. Gold pulled
                      through craze. Splatter inverted against gradient. Each
                      technique is a way of arguing with my own hand — laying
                      something down and then asking whether it was true. I
                      travelled to eighty countries before I understood that I
                      had been looking for a way to stay still. The paintings
                      are where I stay still.
                    </p>
                  </Reveal>
                  <Reveal>
                    <p style={{ color: 'var(--dim)' }}>
                      Jung taught me that what we cannot say directly, we say
                      in image. Krishnamurti taught me that clear seeing
                      requires the destruction of what I already think I know.
                      I grew up looking at Eastern miniatures and ornament. I
                      paint in an international abstract grammar. The friction
                      between those two things is, so far, the thing I have
                      most to say.
                    </p>
                  </Reveal>
                </div>
              </div>

              {/* Editorial divider between voices */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex items-center gap-4"
                aria-hidden
              >
                <span
                  className="inline-block w-10 h-px"
                  style={{ background: 'var(--lime)' }}
                />
                <span
                  className="meta-sm"
                  style={{ color: 'var(--dim)', letterSpacing: '0.28em' }}
                >
                  THE FACTS
                </span>
                <span
                  className="flex-1 h-px"
                  style={{ background: 'var(--rule)' }}
                />
              </motion.div>

              {/* Third-person facts — quieter register, smaller type */}
              <div
                className="space-y-6 text-base md:text-lg leading-relaxed"
                style={{ color: 'var(--dim)' }}
              >
                <Reveal>
                  <p style={{ color: 'var(--bone)' }}>
                    Rushit Shah was born in Vadodara, Gujarat, on 8 September
                    1986. He lives and works between India, Singapore, and
                    Germany.
                  </p>
                </Reveal>

                <Reveal>
                  <p>
                    He is colourblind. The work started there — with what
                    colour does against its neighbour rather than what it is
                    called. Weight, temperature, the pressure of one tone
                    pressed next to another. He trusts those signals more than
                    the names.
                  </p>
                </Reveal>

                <Reveal>
                  <p>
                    His path to painting was not direct. He has travelled to
                    more than eighty countries — not as tourism, but as a kind
                    of extended looking. Deserts, coastlines, markets, ruins,
                    other people's ordinary days. The accumulation of those
                    images, and the losses that came alongside them —
                    including the death of his father — pushed him toward
                    abstraction as the only form capacious enough to hold what
                    he was carrying.
                  </p>
                </Reveal>

                <Reveal>
                  <p>
                    He found the work through Carl Jung — that what we cannot
                    say directly, we say in symbol and image — and through J.
                    Krishnamurti: that how we see is inseparable from who we
                    are, and that clear looking asks us to let go of what we
                    already think we know. Both thinkers are still active in
                    his practice.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>


      <Footer />
    </div>
  );
}

/**
 * Reveal — wraps its children in a motion.div that fades + slides up when it
 * enters the viewport. Used throughout the biography + three-notes sections so
 * each paragraph lands on its own beat, cascading as the visitor scrolls.
 */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
