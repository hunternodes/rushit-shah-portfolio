'use client';

import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import HeroBackdrop from '@/components/HeroBackdrop';

/**
 * /artist runs in its own theme — deep aubergine with warm amber-gold
 * replacing the site's acid lime. Feels like a gallery salon / library.
 * All child sections that reference these vars pick it up automatically.
 *
 * Body-copy tones (--bone, --dim) are lifted brighter than the site default
 * so prose on the aubergine background doesn't dim into the noise.
 */
const artistTheme = {
  '--night': '#1A0E20',   // deep aubergine base
  '--shadow': '#241528',  // slightly lifted aubergine panel
  '--bone': '#FBF4E4',    // warm parchment — readable at a glance, not pure white
  '--dim': '#E4D5DC',     // brighter mauve so body copy clears the muted-grey problem
  '--rule': '#4A374E',    // plum rule lines, slightly lifted
  '--lime': '#EFBE5D',    // amber-gold accent, brighter for legibility
  background: '#1A0E20',  // paint the wrapper too so no body near-black can bleed through
} as React.CSSProperties;

export default function ArtistPage() {
  return (
    <div style={artistTheme} className="relative">
      {/* Painterly canvas animation — runs across the whole page, fixed to
          the viewport so it's still visible as the visitor scrolls through
          biography + facts. Sits behind all content via DOM order. */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      >
        <HeroBackdrop />
      </div>

      {/* Hero — studio video plays full-frame behind a full-bleed frosted-glass
          overlay. Headline + bio meta float on the glass; mirrors the
          /exhibitions hero treatment. */}
      <section
        className="relative z-10 min-h-[100svh] flex items-center overflow-hidden pt-28 md:pt-32 pb-20"
        style={{ background: 'transparent' }}
      >
        <video
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            objectFit: 'cover',
            maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          }}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden
        >
          <source src="/artist-bg.m4v" type="video/mp4" />
        </video>
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'rgba(26, 14, 32, 0.32)',
            backdropFilter: 'blur(18px) saturate(120%)',
            WebkitBackdropFilter: 'blur(18px) saturate(120%)',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)',
            maskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 70%, transparent 100%)',
          }}
        />
        <div className="max-w-[1500px] mx-auto px-5 sm:px-8 lg:px-12 relative w-full -mt-20 md:-mt-28">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="display-xl"
            style={{
              color: 'var(--bone)',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              fontFamily: '"Aburo", "Space Grotesk", system-ui, sans-serif',
              fontWeight: 700,
            }}
            aria-label="I paint in layers, then argue."
          >
            <span aria-hidden="true">
              I paint in layers,{' '}
              <br />
              then{' '}
              <span
                style={{
                  color: 'var(--lime)',
                  fontFamily: '"Burnts Marker", "Fraunces", serif',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  letterSpacing: '0.06em',
                  fontSize: '1.7em',
                  lineHeight: 0.85,
                  display: 'inline-block',
                  verticalAlign: 'baseline',
                  marginInline: '0.2em',
                }}
              >
                argue.
              </span>
            </span>
          </motion.h1>

          {/* Bio meta row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5"
          >
            <div>
              <div
                className="meta-sm"
                style={{
                  color: 'var(--lime)',
                  letterSpacing: '0.22em',
                  fontFamily: '"Aburo", "Space Grotesk", system-ui, sans-serif',
                }}
              >
                BORN
              </div>
              <div
                className="mt-2"
                style={{
                  color: 'var(--bone)',
                  fontSize: '0.95rem',
                  fontFamily: '"Aburo", "Space Grotesk", system-ui, sans-serif',
                }}
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
                style={{
                  color: 'var(--lime)',
                  letterSpacing: '0.22em',
                  fontFamily: '"Aburo", "Space Grotesk", system-ui, sans-serif',
                }}
              >
                STUDIO
              </div>
              <div
                className="mt-2"
                style={{
                  color: 'var(--bone)',
                  fontSize: '0.95rem',
                  fontFamily: '"Aburo", "Space Grotesk", system-ui, sans-serif',
                }}
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
                style={{
                  color: 'var(--lime)',
                  letterSpacing: '0.22em',
                  fontFamily: '"Aburo", "Space Grotesk", system-ui, sans-serif',
                }}
              >
                PRACTICE
              </div>
              <div
                className="mt-2"
                style={{
                  color: 'var(--bone)',
                  fontSize: '0.95rem',
                  fontFamily: '"Aburo", "Space Grotesk", system-ui, sans-serif',
                }}
              >
                Abstract painter
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Merged voice + portrait — three notes (first person) and biographical facts
          (third person) woven around a sticky portrait. An amber halo bleeds from the
          image into the text column so they read as one composition. */}
      <section
        className="relative z-10 overflow-hidden py-24 md:py-32"
        style={{ background: 'transparent' }}
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

              </div>
            </div>

            {/* Text column — first-person voice on top, third-person facts below,
                separated by a small editorial divider. Rendered in Reynard for
                an editorial/literary feel distinct from the hero above. */}
            <div
              className="col-span-12 md:col-span-7 space-y-14 md:space-y-16"
              style={{
                fontFamily: "'Reynard', 'Fraunces', Georgia, serif",
              }}
            >
              {/* First-person voice — three notes with numeral markers */}
              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="meta-sm mb-3 flex items-center gap-3"
                  style={{ color: 'var(--lime)', letterSpacing: '0.28em' }}
                >
                  <span
                    className="inline-block w-6 h-px"
                    style={{ background: 'var(--lime)' }}
                  />
                  IN THE ARTIST'S WORDS
                </motion.div>

                <div
                  className="space-y-10 text-base md:text-lg leading-relaxed"
                  style={{
                    color: 'var(--bone)',
                    fontFamily: '"Aburo", "Space Grotesk", system-ui, sans-serif',
                  }}
                >
                  <Reveal>
                    <div className="relative pl-8 md:pl-12">
                      <span
                        className="absolute left-0 top-2 meta-sm"
                        style={{
                          color: 'var(--lime)',
                          letterSpacing: '0.2em',
                        }}
                      >
                        I.
                      </span>
                      <p>
                        I am interested in the places where organic systems
                        fail gracefully — neural maps, cracked skin,
                        constellations, decay. My paintings are attempts to
                        hold that failure still long enough to look at it. I
                        am colourblind. I have spent my whole life feeling
                        colour rather than naming it. I think that is why I
                        trust it.
                      </p>
                    </div>
                  </Reveal>
                  <Reveal>
                    <div className="relative pl-8 md:pl-12">
                      <span
                        className="absolute left-0 top-2 meta-sm"
                        style={{
                          color: 'var(--lime)',
                          letterSpacing: '0.2em',
                        }}
                      >
                        II.
                      </span>
                      <p style={{ color: 'var(--bone)' }}>
                        I spent years moving, believing that what I was
                        looking for existed somewhere else — in another
                        country, another landscape, another sky. The
                        paintings came out of that exhaustion. Not as
                        escape, but as arrival. For the first time, I was
                        somewhere.
                      </p>
                    </div>
                  </Reveal>
                  <Reveal>
                    <div className="relative pl-8 md:pl-12">
                      <span
                        className="absolute left-0 top-2 meta-sm"
                        style={{
                          color: 'var(--lime)',
                          letterSpacing: '0.2em',
                        }}
                      >
                        III.
                      </span>
                      <p style={{ color: 'var(--bone)' }}>
                        Jung taught me that what we cannot say directly, we
                        say in image. Krishnamurti taught me that clear
                        seeing requires the destruction of what I already
                        think I know. I grew up looking at Eastern miniatures
                        and ornament. I paint in an international abstract
                        grammar. The friction between those two things is,
                        so far, the thing I have most to say.
                      </p>
                    </div>
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
                  style={{
                    color: 'var(--dim)',
                    letterSpacing: '0.28em',
                    fontFamily: '"Aburo", "Space Grotesk", system-ui, sans-serif',
                  }}
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
                style={{
                  color: 'var(--dim)',
                  fontFamily: '"Aburo", "Space Grotesk", system-ui, sans-serif',
                }}
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
                    more than eighty countries — less as tourism than as
                    extended looking. Deserts, coastlines, markets, ruins,
                    other people's ordinary days. The accumulation of those
                    images, and the losses that came alongside them —
                    including the death of his father — pushed him toward
                    abstraction as the only form capacious enough to hold
                    what he was carrying.
                  </p>
                </Reveal>

                <Reveal>
                  <p>
                    His visual vocabulary sits between two traditions: the
                    ornamental density of Eastern miniature painting, which
                    he grew up inside, and the looser grammar of international
                    abstraction, which he came to later. Much of the tension
                    in the work comes from refusing to choose.
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
