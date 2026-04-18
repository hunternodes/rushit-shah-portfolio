'use client';

import { useEffect, useRef } from 'react';

/**
 * A painterly canvas backdrop — soft color-blobs drifting under the hero,
 * with occasional splatter bursts. Renders behind content at mix-blend screen
 * so it only lights the dark areas.
 *
 * If Rushit later supplies an MP4, swap this component for a <video> tag
 * pointing at /public/hero-bg.mp4 (same positioning). Until then, this is
 * zero-asset + zero-license and entirely on-brand.
 */

type Blob = {
  x: number; y: number; vx: number; vy: number;
  r: number; baseR: number; color: string;
  pulsePhase: number;
};

type Splat = {
  x: number; y: number; r: number; color: string;
  life: number; maxLife: number;
};

const PALETTE = [
  'rgba(199, 255, 58, 0.55)',  // lime
  'rgba(255, 78, 56, 0.45)',   // coral
  'rgba(122, 224, 255, 0.40)', // ice
  'rgba(255, 181, 71, 0.45)',  // amber
  'rgba(184, 95, 160, 0.40)',  // plum
];

export default function HeroBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Respect reduced motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Six drifting blobs — wrap around screen edges, big & blurry
    const blobs: Blob[] = Array.from({ length: 6 }, (_, i) => {
      const baseR = 260 + Math.random() * 180;
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.35,
        r: baseR,
        baseR,
        color: PALETTE[i % PALETTE.length],
        pulsePhase: Math.random() * Math.PI * 2,
      };
    });

    // Splatter specks — spawn at random intervals, fade out
    const splats: Splat[] = [];
    let lastSplatAt = 0;

    const spawnSplat = (now: number) => {
      const count = 3 + Math.floor(Math.random() * 6);
      const cx = Math.random() * w;
      const cy = Math.random() * h;
      const color = PALETTE[Math.floor(Math.random() * PALETTE.length)].replace(
        /[\d.]+\)$/,
        '0.85)',
      );
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 70;
        splats.push({
          x: cx + Math.cos(angle) * dist,
          y: cy + Math.sin(angle) * dist,
          r: 2 + Math.random() * 6,
          color,
          life: 0,
          maxLife: 1500 + Math.random() * 1200,
        });
      }
      lastSplatAt = now;
    };

    let raf = 0;
    let last = performance.now();

    const render = (now: number) => {
      const dt = Math.min(now - last, 60);
      last = now;

      ctx.clearRect(0, 0, w, h);

      // Blobs — additive blending so overlaps get richer
      ctx.globalCompositeOperation = 'lighter';
      for (const b of blobs) {
        b.x += b.vx * dt * 0.6;
        b.y += b.vy * dt * 0.6;
        // Soft wrap
        if (b.x < -b.r) b.x = w + b.r;
        if (b.x > w + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = h + b.r;
        if (b.y > h + b.r) b.y = -b.r;

        b.pulsePhase += 0.0006 * dt;
        b.r = b.baseR + Math.sin(b.pulsePhase) * 60;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r);
        grad.addColorStop(0, b.color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Splatter specks — over the top, normal blend
      ctx.globalCompositeOperation = 'source-over';
      if (!prefersReduced && now - lastSplatAt > 2200 + Math.random() * 1500) {
        spawnSplat(now);
      }
      for (let i = splats.length - 1; i >= 0; i--) {
        const s = splats[i];
        s.life += dt;
        const alpha = 1 - s.life / s.maxLife;
        if (alpha <= 0) {
          splats.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!prefersReduced) {
        raf = requestAnimationFrame(render);
      }
    };

    if (prefersReduced) {
      render(performance.now()); // one static frame
    } else {
      raf = requestAnimationFrame(render);
    }

    const onResize = () => resize();
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{
        width: '100%',
        height: '100%',
        filter: 'blur(40px)',
        mixBlendMode: 'screen',
        opacity: 0.65,
      }}
    />
  );
}
