'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import ArtworkArchiveEmbed from '@/components/ArtworkArchiveEmbed';
import Footer from '@/components/Footer';

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
      {/* White hero — continuous with the embed below */}
      <section className="section-light relative pt-32 md:pt-40 pb-10">
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-12 gap-8 items-end">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="col-span-12 md:col-span-8 display-xl"
              style={{ color: '#0B0B10' }}
            >
              The{' '}
              <span className="in-serif" style={{ color: '#B23A1E' }}>
                full folio.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="font-marker col-span-12 md:col-span-4 text-lg"
              style={{ color: '#6F6F7A' }}
            >
              Every available work, pulled live from ArtworkArchive. Click any
              piece for full details, dimensions, and enquiries.
            </motion.p>
          </div>
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

      {/* Dark CTA — collector enquiries */}
      <section className="py-20" style={{ background: 'var(--night)' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <h2 className="display-lg" style={{ color: 'var(--bone)' }}>
            Something{' '}
            <span className="in-serif" style={{ color: 'var(--lime)' }}>
              caught
            </span>{' '}
            your eye?
          </h2>
          <p
            className="mt-6 text-lg max-w-lg mx-auto"
            style={{ color: 'var(--dim)' }}
          >
            Reach out for pricing, shipping, and availability on any piece.
          </p>
          <Link href="/contact" className="btn-lime mt-8">
            enquire about a piece →
          </Link>
        </div>
      </section>

      <div style={collectionFooterTheme}>
        <Footer />
      </div>
    </>
  );
}
