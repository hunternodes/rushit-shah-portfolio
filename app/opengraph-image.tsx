import { ImageResponse } from 'next/og';

/**
 * Default OG card shown when the site is shared on Twitter / WhatsApp /
 * Slack / LinkedIn / iMessage etc. Typography-led, painted background,
 * consistent with the site's near-black + acid-lime palette.
 *
 * Generated at request-time by Next.js (Edge) — no binary ships in the
 * repo. Per-page OG can be added later via `opengraph-image.tsx` nested
 * under each route segment.
 */

export const runtime = 'edge';
export const alt = 'Rushit Shah — Abstract Artist from Vadodara, India';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '80px 80px',
          background: '#0C0B0A',
          color: '#F5F1E8',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Ambient wash */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(60% 55% at 30% 35%, rgba(199,255,58,0.12) 0%, rgba(11,11,16,0) 65%), radial-gradient(50% 50% at 78% 80%, rgba(255,78,56,0.08) 0%, rgba(11,11,16,0) 70%)',
          }}
        />

        {/* Top row — label + lime dot */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            fontSize: 22,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#8A8578',
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              background: '#C7FF3A',
            }}
          />
          Rushit Shah · Studio · Vadodara
        </div>

        {/* Headline */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            fontSize: 112,
            fontWeight: 500,
          }}
        >
          <div>Abstract artist.</div>
          <div>
            <span style={{ fontStyle: 'italic', color: '#C7FF3A' }}>
              India · Singapore · Germany.
            </span>
          </div>
        </div>

        {/* Bottom row — url + tagline */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            fontSize: 24,
            color: '#B8B4A7',
          }}
        >
          <div style={{ maxWidth: 640, lineHeight: 1.3 }}>
            Crackle networks · gradient-splatter inversions · original paintings,
            shipping worldwide.
          </div>
          <div
            style={{
              color: '#C7FF3A',
              fontSize: 28,
              letterSpacing: '0.05em',
            }}
          >
            rushitshah.com
          </div>
        </div>
      </div>
    ),
    size,
  );
}
