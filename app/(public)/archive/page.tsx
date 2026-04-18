'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { artworks, accentColor } from '@/lib/artworks';
import Footer from '@/components/Footer';

const filters = ['ALL', 'AVAILABLE', 'SOLD', '2026', '2025'];

export default function ArchivePage() {
  return (
    <>
      <section
        className="relative pt-32 md:pt-40 pb-12 overflow-hidden"
        style={{ background: 'var(--night)' }}
      >
        <div className="static-noise" />
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12 relative">
          <div className="grid grid-cols-12 gap-8 items-end">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="col-span-12 md:col-span-8 display-xl"
              style={{ color: 'var(--bone)' }}
            >
              The work,{' '}
              <span className="in-serif" style={{ color: 'var(--lime)' }}>
                in order.
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="col-span-12 md:col-span-4 text-lg"
              style={{ color: 'var(--dim)' }}
            >
              All completed works. Pricing on request. Collector enquiries
              welcome for any piece.
            </motion.p>
          </div>

          {/* Filter tabs — static, visual only for now */}
          <div
            className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 pt-4"
            style={{ borderTop: '1px solid var(--rule)' }}
          >
            {filters.map((f, i) => (
              <span
                key={f}
                className="meta-sm"
                style={{
                  color: i === 0 ? 'var(--lime)' : 'var(--dim)',
                  letterSpacing: '0.2em',
                }}
              >
                {f}
                {i < filters.length - 1 && (
                  <span className="ml-6" style={{ color: 'var(--rule)' }}>
                    ·
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="pb-24" style={{ background: 'var(--night)' }}>
        <div className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-14">
            {artworks.map((art, i) => {
              const accent = accentColor[art.accent];
              return (
                <motion.article
                  key={art.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10%' }}
                  transition={{ duration: 0.7, delay: (i % 3) * 0.08 }}
                  className="flex flex-col"
                >
                  <div className="art-frame lit aspect-[4/5]">
                    <img
                      src={art.src}
                      alt={`${art.title}, ${art.year}`}
                      onError={(e) =>
                        ((e.currentTarget as HTMLImageElement).src = art.placeholder)
                      }
                    />
                    <div
                      className="absolute bottom-3 left-3 px-2 py-1"
                      style={{ background: 'var(--night)', color: accent }}
                    >
                      <div className="meta-sm">No. {art.no}</div>
                    </div>
                  </div>

                  <div className="mt-5">
                    <h2
                      className="display-md"
                      style={{ color: 'var(--bone)', fontSize: 'clamp(1.25rem, 2vw, 1.75rem)' }}
                    >
                      {art.title}
                    </h2>
                    <p className="meta-sm mt-2" style={{ color: 'var(--dim)' }}>
                      {art.year} · {art.medium}
                    </p>
                    {art.dimensions && (
                      <p className="meta-sm mt-1" style={{ color: 'var(--dim)' }}>
                        {art.dimensions}
                      </p>
                    )}
                    <div
                      className="mt-4 pt-3 flex items-center justify-between"
                      style={{ borderTop: '1px solid var(--rule)' }}
                    >
                      <span className="meta-sm" style={{ color: 'var(--lime)' }}>
                        STATUS: AVAILABLE
                      </span>
                      <Link
                        href="/contact"
                        className="meta-sm link-mono"
                        style={{ color: 'var(--bone)' }}
                      >
                        enquire →
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          <p
            className="mt-16 text-center meta-sm"
            style={{ color: 'var(--dim)' }}
          >
            New work added as it leaves the studio. Follow @rushitshah08 for studio updates.
          </p>

          <div
            className="mt-12 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
            style={{ borderTop: '1px solid var(--rule)' }}
          >
            <div>
              <div className="meta-sm" style={{ color: 'var(--lime)' }}>
                LIVE CATALOGUE
              </div>
              <p className="mt-2 text-lg" style={{ color: 'var(--bone)' }}>
                See the{' '}
                <span className="in-serif" style={{ color: 'var(--lime)' }}>
                  complete collection
                </span>{' '}
                on the full folio page — syncs live with ArtworkArchive.
              </p>
            </div>
            <Link href="/collection" className="btn-ghost">
              view the full folio
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20" style={{ background: 'var(--shadow)' }}>
        <div className="max-w-[1200px] mx-auto px-5 sm:px-8 lg:px-12 text-center">
          <h2 className="display-lg" style={{ color: 'var(--bone)' }}>
            Something{' '}
            <span className="in-serif" style={{ color: 'var(--lime)' }}>
              caught
            </span>{' '}
            your eye?
          </h2>
          <p className="mt-6 text-lg max-w-lg mx-auto" style={{ color: 'var(--dim)' }}>
            Reach out for pricing, shipping, and availability.
          </p>
          <Link href="/contact" className="btn-lime mt-8">
            enquire about a piece →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
