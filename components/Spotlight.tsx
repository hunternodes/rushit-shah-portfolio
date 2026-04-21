'use client';

import Link from 'next/link';
import VideoBackdrop from '@/components/VideoBackdrop';
import PageHero from '@/components/PageHero';

/**
 * Home hero.
 *
 * Locked against the unified hero spec (see PageHero). The H1 is plain text
 * so `document.querySelector('h1').textContent` comes out clean
 * ("Paintings that hold their breath.") — the previous ChaoticHeadline
 * decomposed each glyph into RGB-split ghost <span>s and blew up the
 * accessible text. If we want shimmer back later, we do it with
 * ::before/::after pseudo-elements so it stays invisible to the DOM.
 *
 * The video + ambient washes + static-noise stay, but they ride in on the
 * <PageHero> `backdrop` slot so they're absolute-positioned behind the text
 * and don't inflate the hero's height.
 */
export default function Spotlight() {
  return (
    <PageHero
      title={
        <>
          Paintings that{' '}
          <span className="in-serif" style={{ color: 'var(--lime)' }}>
            hold their
          </span>{' '}
          breath.
        </>
      }
      ariaTitle="Paintings that hold their breath."
      subtext={
        <>
          A colourblind painter working between India, Singapore, and Germany.
          Crackle networks and gradient-splatter inversions — a practice built
          on the tension between chaos and control.
        </>
      }
      cta={
        <>
          <Link
            href="/collection"
            className="btn-lime justify-center sm:justify-start whitespace-nowrap"
          >
            Enter the Collection
            <span aria-hidden="true">→</span>
          </Link>
          <Link
            href="/contact"
            className="btn-ghost justify-center sm:justify-start whitespace-nowrap"
          >
            Collector Enquiries
            <span aria-hidden="true">→</span>
          </Link>
        </>
      }
      backdrop={
        <>
          <VideoBackdrop />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(80% 60% at 55% 30%, rgba(199,255,58,0.06) 0%, rgba(11,11,16,0) 60%), radial-gradient(50% 40% at 70% 80%, rgba(255,78,56,0.05) 0%, rgba(11,11,16,0) 70%)',
            }}
          />
          <div className="static-noise" />
        </>
      }
    />
  );
}
