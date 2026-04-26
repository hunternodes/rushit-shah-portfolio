'use client';

import { useEffect, useRef, useState } from 'react';
import HeroBackdrop from './HeroBackdrop';

/**
 * Plays a user-supplied video behind the hero. Falls back to the canvas
 * paint-cloud animation if the browser can't decode it (typically HEVC .mov
 * on Firefox / Chrome-on-Linux).
 *
 * Drop an MP4 at /public/hero-bg.mp4 for maximum compatibility — the browser
 * will prefer it over the .mov automatically.
 */
export default function VideoBackdrop() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    // Some browsers won't autoplay until we explicitly try
    const tryPlay = () => {
      v.play().catch(() => {
        // Autoplay refused (rare when muted+playsinline, but possible).
        // Not treated as a hard failure — fallback only kicks in on decode error.
      });
    };
    tryPlay();

    const onError = () => setFailed(true);
    const onCanPlay = () => setFailed(false);

    v.addEventListener('error', onError);
    v.addEventListener('canplay', onCanPlay);
    return () => {
      v.removeEventListener('error', onError);
      v.removeEventListener('canplay', onCanPlay);
    };
  }, []);

  if (failed) return <HeroBackdrop />;

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
        preload="auto"
        aria-hidden
      >
        {/* Browser picks the first source it can decode */}
        <source src="/hero-bg.mp4" type="video/mp4" />
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
