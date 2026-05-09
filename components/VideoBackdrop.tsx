'use client';

import { useEffect, useRef, useState } from 'react';
import HeroBackdrop from './HeroBackdrop';
import { useShowMotion } from '@/lib/useShowMotion';

/**
 * Plays a user-supplied video behind the hero. Falls back to the canvas
 * paint-cloud animation if (a) the browser can't decode the file, or
 * (b) the visitor is on a slow / Save-Data connection.
 *
 * Drop an MP4 at /public/hero-bg.mp4 for maximum compatibility — the browser
 * will prefer it over the .mov automatically.
 *
 * preload="none" + an explicit play() call: the browser doesn't fetch the
 * 21MB hero video bytes until React mounts the element AND we ask it to
 * start. This shaves seconds off the initial page paint on cold visits.
 */
export default function VideoBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const showMotion = useShowMotion();

  useEffect(() => {
    if (!showMotion) return; // Slow connection — never attempt to play.
    const v = videoRef.current;
    if (!v) return;

    // preload="none" means the bytes aren't fetched yet — calling play() is
    // what kicks off the network request. Wrapped in catch because some
    // browsers reject autoplay even with muted+playsinline (rare, but real).
    v.play().catch(() => {});

    const onError = () => setFailed(true);
    const onCanPlay = () => setFailed(false);
    v.addEventListener('error', onError);
    v.addEventListener('canplay', onCanPlay);
    return () => {
      v.removeEventListener('error', onError);
      v.removeEventListener('canplay', onCanPlay);
    };
  }, [showMotion]);

  // Slow connection or decode error → fall back to the lightweight canvas
  // animation. No 21MB download for users who can't afford it.
  if (!showMotion || failed) return <HeroBackdrop />;

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          objectFit: 'cover',
          opacity: 0.95,
        }}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        aria-hidden
      >
        {/* Browser picks the first source it can decode. The file is an
            H.264 .m4v converted from the studio's original HEVC capture —
            keeps universal codec support across Safari, Chrome, Firefox. */}
        <source src="/hero-bg.m4v" type="video/mp4" />
        {/* Optional WebM — drop /public/hero-bg.webm here later for even lighter delivery */}
      </video>
      {/* Soft vignette — only enough to keep H1 readable.
          Was radial 35→70% (too heavy, hiding video); now 10→35%. */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(80% 70% at 50% 45%, rgba(12,11,10,0.10) 0%, rgba(12,11,10,0.35) 100%)',
        }}
      />
    </>
  );
}
