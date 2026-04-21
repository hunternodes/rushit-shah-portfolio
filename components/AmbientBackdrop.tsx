'use client';

import { motion, useReducedMotion } from 'framer-motion';

type BlendMode =
  | 'screen'
  | 'multiply'
  | 'soft-light'
  | 'overlay'
  | 'lighten'
  | 'darken';

type AmbientBackdropProps = {
  /** Primary glow colour. Should sit inside the surrounding palette's family. */
  accent?: string;
  /** Second glow colour. Keep it close to `accent` to avoid a "loud" hero. */
  accentAlt?: string;
  /**
   * Blend mode between the blobs and the page background.
   *   • 'screen'     brightens the base — use on dark heroes.
   *   • 'multiply'   darkens the base   — use on white / light heroes.
   *   • 'soft-light' near-neutral       — safe default if unsure.
   */
  blend?: BlendMode;
  /**
   * Max opacity of each glow blob (0-1). Readable-but-ambient values:
   *   dark hero + screen blend  → 0.28–0.38
   *   light hero + multiply     → 0.28–0.45
   * A third blob is rendered at half this to keep overlap lively.
   */
  intensity?: number;
  /**
   * If true, layer on a subtle film-grain noise over the blobs.
   */
  grain?: boolean;
};

/**
 * AmbientBackdrop — full-bleed atmospheric layer for any hero section.
 *
 *   <section className="relative overflow-hidden ...">
 *     <AmbientBackdrop accent="#EFBE5D" blend="screen" />
 *     <div className="relative z-10">...hero content...</div>
 *   </section>
 *
 * Motion design:
 *   • Three radial blobs — one anchored top-left, one bottom-right, one
 *     drifting across centre. Three periods (22s, 34s, 28s) so overlap
 *     and highlight wander unpredictably inside a ~minute loop.
 *   • Each blob also breathes in opacity (~70–100% of `intensity`) so
 *     the glow pulses gently even if the user is watching still.
 *   • blur(~85px) keeps the blobs volumetric without hiding them.
 *   • `pointer-events: none` + `aria-hidden` — invisible to AT + clicks.
 *   • `useReducedMotion()` honours `prefers-reduced-motion: reduce` —
 *     blobs render in fixed positions with no opacity pulse.
 *   • mix-blend-mode so the base palette stays identifiable — blobs add
 *     or remove light from the existing colour rather than repainting it.
 */
export default function AmbientBackdrop({
  accent = '#F0D8A8',
  accentAlt = '#E8A78D',
  blend = 'screen',
  intensity = 0.32,
  grain = false,
}: AmbientBackdropProps) {
  const reduce = useReducedMotion();

  // Blob A — top-left anchor. Large amplitude sweep so it's clearly moving.
  const blobA = reduce
    ? { opacity: intensity }
    : {
        x: ['0%', '14%', '-8%', '6%', '0%'],
        y: ['0%', '-10%', '8%', '-4%', '0%'],
        scale: [1, 1.1, 0.95, 1.05, 1],
        opacity: [
          intensity * 0.75,
          intensity,
          intensity * 0.8,
          intensity * 0.95,
          intensity * 0.75,
        ],
      };

  // Blob B — bottom-right anchor. Counter-direction to Blob A.
  const blobB = reduce
    ? { opacity: intensity * 0.9 }
    : {
        x: ['0%', '-12%', '7%', '-5%', '0%'],
        y: ['0%', '9%', '-11%', '5%', '0%'],
        scale: [1, 0.93, 1.08, 0.97, 1],
        opacity: [
          intensity * 0.7,
          intensity * 0.95,
          intensity * 0.75,
          intensity * 0.9,
          intensity * 0.7,
        ],
      };

  // Blob C — centre drift. Third body of motion so the hero never looks
  // like "two blobs in opposite corners".
  const blobC = reduce
    ? { opacity: intensity * 0.55 }
    : {
        x: ['0%', '10%', '-8%', '4%', '0%'],
        y: ['0%', '-6%', '10%', '-3%', '0%'],
        scale: [1, 1.08, 0.96, 1.03, 1],
        opacity: [
          intensity * 0.4,
          intensity * 0.7,
          intensity * 0.45,
          intensity * 0.6,
          intensity * 0.4,
        ],
      };

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      {/* Blob A — top-left */}
      <motion.div
        initial={false}
        animate={blobA}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '-18%',
          left: '-12%',
          width: '70vw',
          height: '70vw',
          maxWidth: '950px',
          maxHeight: '950px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accent} 0%, transparent 62%)`,
          filter: 'blur(85px)',
          mixBlendMode: blend,
          willChange: reduce ? undefined : 'transform, opacity',
        }}
      />

      {/* Blob B — bottom-right */}
      <motion.div
        initial={false}
        animate={blobB}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          bottom: '-22%',
          right: '-14%',
          width: '80vw',
          height: '80vw',
          maxWidth: '1150px',
          maxHeight: '1150px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accentAlt} 0%, transparent 65%)`,
          filter: 'blur(95px)',
          mixBlendMode: blend,
          willChange: reduce ? undefined : 'transform, opacity',
        }}
      />

      {/* Blob C — centre drift */}
      <motion.div
        initial={false}
        animate={blobC}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          position: 'absolute',
          top: '30%',
          left: '35%',
          width: '55vw',
          height: '55vw',
          maxWidth: '800px',
          maxHeight: '800px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accent} 0%, transparent 70%)`,
          filter: 'blur(100px)',
          mixBlendMode: blend,
          willChange: reduce ? undefined : 'transform, opacity',
        }}
      />

      {grain && <div className="static-noise" />}
    </div>
  );
}
