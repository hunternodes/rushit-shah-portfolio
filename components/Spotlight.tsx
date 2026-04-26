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
        <span
          style={{
            fontFamily: '"Aburo", "Space Grotesk", system-ui, sans-serif',
            fontWeight: 700,
          }}
        >
          Paintings that{' '}
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
            hold their
          </span>{' '}
          breath.
        </span>
      }
      ariaTitle="Paintings that hold their breath."
      subtext={
        <span
          style={{
            fontFamily: '"Aburo", "Grift", "Space Grotesk", system-ui, sans-serif',
            fontWeight: 600,
            letterSpacing: '0.01em',
          }}
        >
          Everyone's got a map to who I am, drawn by people who've never been
          there. So I paint my own. Every stroke is a stranger's voice I stop
          listening to. Every canvas, a little more of me showing up.
          {' '}
          <span
            style={{
              color: 'var(--lime)',
              fontFamily: '"Burnts Marker", "Fraunces", serif',
              fontStyle: 'normal',
              fontWeight: 400,
              letterSpacing: '0.02em',
              fontSize: '1.8em',
              lineHeight: 0.9,
              display: 'inline-block',
              verticalAlign: 'baseline',
              marginInline: '0.25em',
            }}
          >
            -Rushit
          </span>
        </span>
      }
      cta={
        <Link
          href="/collection"
          className="btn-lime justify-center sm:justify-start whitespace-nowrap"
        >
          Enter the Collection
          <span aria-hidden="true">→</span>
        </Link>
      }
      backdrop={
        <>
          <VideoBackdrop />
          <div className="static-noise" />
        </>
      }
    />
  );
}
