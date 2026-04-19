'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { artworks } from '@/lib/artworks';
import Arc from '@/components/Arc';
import Footer from '@/components/Footer';

const techniques = [
  {
    no: '01',
    title: 'Crackle Network',
    body:
      'Cobalt is laid as ground — dense, flat, unbroken. Over it, a crackle medium is worked until the surface fails on its own terms: fissures open like capillaries, fault lines, the aftermath of a system under pressure. Gold is pulled through the craze; red arrives only at the points of maximum stress, only where the surface could not hold. The network that results is not designed. It is allowed.',
    accent: 'var(--lime)',
  },
  {
    no: '02',
    title: 'Gradient-Splatter Inversion',
    body:
      "A ground moves from warm gold to cool silver — a gradient laid as smooth as the hand allows. Then: splatter, inverted. Black lands in the warm zone; white in the cool. The logic reverses what the eye expects. The result is a surface in argument with itself — order and disruption occupying the same gesture, neither winning, both present. This is the technique most fully Shah's own.",
    accent: 'var(--coral)',
  },
];

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
                A painter{' '}
                <span className="in-serif" style={{ color: 'var(--lime)' }}>
                  between chaos
                </span>
                <br />
                and control.
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
                    Abstract painter · Colourblind
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

      {/* Biography — long-form (comes first now, on --shadow for alternation after the hero) */}
      <section className="py-24 md:py-32" style={{ background: 'var(--shadow)' }}>
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="art-frame lit aspect-[4/5] mb-6"
              >
                <motion.img
                  src="/images/rushit-portrait.png"
                  alt="Rushit Shah — portrait, Paris"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="display-md in-serif"
                style={{ color: 'var(--bone)' }}
              >
                b. 1986 · Vadodara
              </motion.div>
            </div>
            <div className="col-span-12 md:col-span-8">
              <div
                className="space-y-7 text-lg md:text-xl leading-snug"
                style={{ color: 'var(--bone)' }}
              >
                <Reveal>
                  <p>
                    Rushit Shah was born in Vadodara, Gujarat, on 8 September
                    1986. He lives and works between India, Singapore, and
                    Germany.
                  </p>
                </Reveal>

                {/* Dramatic callout — "He is colourblind." */}
                <motion.p
                  initial={{ opacity: 0, y: 30, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="in-serif relative"
                  style={{
                    color: 'var(--lime)',
                    fontSize: 'clamp(2rem, 4vw, 3.4rem)',
                    lineHeight: 1.02,
                    padding: '0.6rem 0',
                  }}
                >
                  He is colourblind.
                  <motion.span
                    aria-hidden
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: '-10%' }}
                    transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute left-0 -bottom-1 h-[2px] origin-left"
                    style={{ background: 'var(--lime)', width: '7.5em' }}
                  />
                </motion.p>

                <Reveal delay={0.05}>
                  <p style={{ color: 'var(--dim)' }}>
                    This is not a footnote. It is the foundation of everything he
                    makes. Where other painters see colour as fact, Shah
                    experiences it as force — approximate, atmospheric, felt
                    before it is named. Unable to rely on the eye's easy
                    certainties, he has built a practice around what colour does
                    rather than what it is: its weight, its temperature, the
                    pressure it exerts against an adjacent tone. The result is an
                    instinctive colour intelligence that trained painters spend
                    decades trying to acquire. Shah arrived at it by necessity,
                    and it shows.
                  </p>
                </Reveal>

                <Reveal>
                  <p style={{ color: 'var(--dim)' }}>
                    His path to painting was not direct. He has travelled to more
                    than eighty countries — not as tourism, but as a kind of
                    extended looking. Deserts, coastlines, markets, ruins, other
                    people's ordinary days. The accumulation of those images, and
                    the losses that came alongside them — including the death of
                    his father — pushed him toward abstraction as the only form
                    capacious enough to hold what he was carrying.
                  </p>
                </Reveal>

                <Reveal>
                  <p style={{ color: 'var(--dim)' }}>
                    He found his way into the work through Carl Jung's ideas on
                    the unconscious — the notion that what we cannot say
                    directly, we express in symbol and image — and through J.
                    Krishnamurti's understanding of perception: that how we see
                    is inseparable from who we are, and that truly clear looking
                    requires the dismantling of what we already believe we know.
                    Both thinkers remain active in his practice. Every layer laid
                    down, every craze pulled through, every splatter inverted is
                    a form of not-knowing-in-advance — an argument with his own
                    certainty.
                  </p>
                </Reveal>

                <Reveal>
                  <p style={{ color: 'var(--dim)' }}>
                    His early work absorbed the energy of action painting —
                    Pollock's physicality, Klee's structural wit, Kandinsky's
                    belief that form carries emotional necessity, Van Gogh's
                    refusal to let surface lie flat. These were formative
                    encounters. He has moved through them and arrived somewhere
                    that belongs to no one else.
                  </p>
                </Reveal>

                <Reveal>
                  <p style={{ color: 'var(--dim)' }}>
                    The current work is built on two signature techniques. The
                    first: a cobalt ground broken by gold craze — crackle
                    networks that behave like capillaries, like fault lines, like
                    the maps of systems under stress. Red arrives only where the
                    surface cannot hold. The second: a gold-to-silver gradient
                    interrupted by inverted black-and-white splatter — black
                    claiming the warm zone, white claiming the cool. The
                    counterintuition is the point. Both techniques ask the same
                    question: what does order look like at the moment it begins
                    to fail?
                  </p>
                </Reveal>

                <Reveal>
                  <p style={{ color: 'var(--dim)' }}>
                    Shah calls the current body of work{' '}
                    <span className="in-serif" style={{ color: 'var(--bone)' }}>
                      Fragment
                    </span>{' '}
                    — a series of eight to ten paintings building toward a debut
                    exhibition. The reference is biological and cosmic
                    simultaneously: neural networks, constellations, decay
                    patterns, the moment before a structure collapses into
                    something new. An Eastern ornamental sensibility filtered
                    through an international abstract grammar. The friction
                    between those two things is, as he puts it, so far, the thing
                    I have most to say.
                  </p>
                </Reveal>

                <Reveal>
                  <p
                    className="meta pt-4"
                    style={{
                      color: 'var(--bone)',
                      borderTop: '1px solid var(--rule)',
                      fontSize: '0.82rem',
                      letterSpacing: '0.18em',
                      lineHeight: 1.6,
                    }}
                  >
                    Currently represented through Maio Studio, Singapore.
                    <br />
                    Collector enquiries and gallery submissions welcome directly.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statement — three notes (now sits BELOW the biography) */}
      <section className="py-24 md:py-32" style={{ background: 'var(--night)' }}>
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-4">
              <div className="meta-sm" style={{ color: 'var(--lime)' }}>
                IN THE ARTIST'S WORDS
              </div>
              <div
                className="display-md mt-3 in-serif"
                style={{ color: 'var(--bone)' }}
              >
                three notes
              </div>
            </div>
            <div className="col-span-12 md:col-span-8">
              <div
                className="space-y-8 text-xl md:text-2xl leading-snug"
                style={{ color: 'var(--bone)' }}
              >
                <Reveal>
                  <p>
                    I am interested in the places where organic systems fail
                    gracefully — neural maps, cracked skin, constellations, decay.
                    My paintings are attempts to hold that failure still long
                    enough to look at it. I am colourblind. I have spent my whole
                    life feeling colour rather than naming it. I think that is why
                    I trust it.
                  </p>
                </Reveal>
                <Reveal>
                  <p style={{ color: 'var(--dim)' }}>
                    The work is made in layers. Cobalt laid flat. Gold pulled
                    through craze. Splatter inverted against gradient. Each
                    technique is a way of arguing with my own hand — laying
                    something down and then asking whether it was true. I
                    travelled to eighty countries before I understood that I had
                    been looking for a way to stay still. The paintings are where
                    I stay still.
                  </p>
                </Reveal>
                <Reveal>
                  <p style={{ color: 'var(--dim)' }}>
                    Jung taught me that what we cannot say directly, we say in
                    image. Krishnamurti taught me that clear seeing requires the
                    destruction of what I already think I know. I grew up looking
                    at Eastern miniatures and ornament. I paint in an
                    international abstract grammar. The friction between those
                    two things is, so far, the thing I have most to say.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Arc />

      {/* Techniques */}
      <section className="py-24 md:py-32" style={{ background: 'var(--night)' }}>
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {techniques.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="relative p-8"
                style={{
                  background: 'var(--shadow)',
                  borderLeft: `3px solid ${t.accent}`,
                }}
              >
                <span
                  className="meta-sm absolute -top-3 left-6 px-2 py-0.5"
                  style={{ background: 'var(--night)', color: t.accent }}
                >
                  {t.no}
                </span>
                <h3
                  className="display-md in-serif"
                  style={{ color: 'var(--bone)', fontSize: 'clamp(1.5rem, 2.6vw, 2.4rem)' }}
                >
                  {t.title}
                </h3>
                <p
                  className="text-lg md:text-xl leading-snug mt-5"
                  style={{ color: 'var(--bone)', opacity: 0.85 }}
                >
                  {t.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured piece + representation block */}
      <section className="pb-24" style={{ background: 'var(--night)' }}>
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="art-frame lit aspect-[21/9]">
            <img
              src={artworks[0].src}
              alt={artworks[0].title}
              onError={(e) =>
                ((e.currentTarget as HTMLImageElement).src = artworks[0].placeholder)
              }
            />
          </div>
          <div className="flex flex-wrap items-baseline justify-between gap-4 mt-6">
            <div>
              <p className="display-md" style={{ color: 'var(--bone)' }}>
                {artworks[0].title}
              </p>
              <p className="meta-sm mt-1" style={{ color: 'var(--dim)' }}>
                {artworks[0].year} · {artworks[0].medium}
              </p>
            </div>
            <Link href="/collection" className="btn-ghost">
              see the full collection
              <span aria-hidden>→</span>
            </Link>
          </div>

          {/* Representation block */}
          <div
            className="mt-12 pt-6 max-w-xl"
            style={{ borderTop: '1px solid var(--rule)' }}
          >
            <div className="meta-sm flex items-center gap-2" style={{ color: 'var(--lime)' }}>
              <span
                className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: 'var(--lime)' }}
              />
              REPRESENTATION
            </div>
            <p
              className="meta mt-3"
              style={{ color: 'var(--bone)', fontSize: '0.82rem', lineHeight: 1.7 }}
            >
              Maio Studio · Singapore
              <br />
              Collector enquiries and gallery submissions welcome.
              <br />
              <a
                href="mailto:rs@rushitshah.com"
                className="link-mono"
                style={{ color: 'var(--lime)' }}
              >
                rs@rushitshah.com →
              </a>
            </p>
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
