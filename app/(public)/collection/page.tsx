'use client';

import { motion } from 'framer-motion';
import ArtworkArchiveEmbed from '@/components/ArtworkArchiveEmbed';
import Footer from '@/components/Footer';
import AmbientBackdrop from '@/components/AmbientBackdrop';

const collectionFooterTheme = {
  '--night': '#FFFFFF',
  '--shadow': '#F4F1E8',
  '--bone': '#0B0B10',
  '--dim': '#6F6F7A',
  '--rule': '#D5D2C5',
  // Override the lime accent on this white footer — acid lime is unreadable on white;
  // neon red reads bold and keeps the same "accent link" role.
  '--lime': '#E60026',
} as React.CSSProperties;

export default function CollectionPage() {
  return (
    <>
      {/* White hero — matched to the homepage hero's vertical rhythm
          (pt-28 md:pt-40 pb-16) and 1400px max-width so /collection opens
          with the same silhouette as /. The embed section below stays at
          the wider 1600px container to give thumbnails more room. */}
      <section className="section-light relative min-h-[100svh] flex flex-col justify-center pt-28 md:pt-40 pb-16 overflow-hidden">
        {/* Crackle video — same hero-bg.mp4 the homepage uses, dialled down
            and multiply-blended so it tints the white as a warm marble
            instead of darkening the page. */}
        <video
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            objectFit: 'cover',
            opacity: 0.55,
            mixBlendMode: 'multiply',
          }}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Warm ambient blobs over the video so it doesn't read as a flat
            texture — bumped to a higher intensity than before so it actually
            registers, with a richer terracotta + cream palette. */}
        <AmbientBackdrop
          accent="#E8B894"
          accentAlt="#C76A4A"
          blend="multiply"
          intensity={0.55}
          grain
        />
        <div className="max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-12 relative">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="display-xl"
            style={{
              color: '#0B0B10',
              fontFamily: '"Aburo", "Space Grotesk", system-ui, sans-serif',
              fontWeight: 700,
            }}
          >
            The{' '}
            <span
              style={{
                color: '#B23A1E',
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
              full folio.
            </span>
          </motion.h1>
        </div>
      </section>

      <section className="section-light pb-20">
        {/* Full-bleed embed — edge to edge */}
        <div className="w-full">
          <ArtworkArchiveEmbed />
        </div>
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12">
          <p
            className="text-center meta-sm mt-8"
            style={{ color: '#6F6F7A' }}
          >
            Collection syncs automatically · Updated in real time
          </p>
        </div>
      </section>

      <div style={collectionFooterTheme}>
        <Footer />
      </div>
    </>
  );
}
