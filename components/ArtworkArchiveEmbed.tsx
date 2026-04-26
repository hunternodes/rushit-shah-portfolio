'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * ArtworkArchive embed, restyled.
 * The base visual re-skin lives in globals.css under `#aa_embed { … }` —
 * fonts, image shadows, link colours, grid spacing, etc. This component
 * loads the AA script and then watches for the injected DOM so we can:
 *   - hide any "powered by artworkarchive" branding
 *   - wrap each image in a consistent aspect-ratio cell so the grid
 *     doesn't jump around as images load
 *   - add a staggered reveal as tiles come in
 */
export default function ArtworkArchiveEmbed() {
  const ref = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    const container = ref.current;
    if (!container || loaded.current) return;
    loaded.current = true;
    container.innerHTML = '';

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src =
      'https://www.artworkarchive.com/profile/rushitshah/embed_js.js';
    container.appendChild(script);

    // Watch for the injected markup and apply last-mile tweaks that CSS can't reach.
    const observer = new MutationObserver(() => {
      // 1. Hide any "powered by artworkarchive" text/link nodes we find.
      const nodes = container.querySelectorAll('*');
      nodes.forEach((el) => {
        const txt = (el.textContent || '').toLowerCase();
        if (
          txt.includes('powered by artworkarchive') &&
          el.children.length === 0
        ) {
          (el as HTMLElement).style.display = 'none';
        }
      });

      // 2. Progressive reveal on images — fade each in as it finishes loading.
      const imgs = container.querySelectorAll('img:not([data-aa-seen])');
      imgs.forEach((img, i) => {
        const el = img as HTMLImageElement;
        el.setAttribute('data-aa-seen', '1');
        el.style.opacity = '0';
        el.style.transition =
          'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1), filter 700ms ease, box-shadow 700ms ease';
        el.style.transform = 'translateY(12px)';
        const reveal = () => {
          setTimeout(
            () => {
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            },
            60 * (i % 8),
          );
        };
        if (el.complete) reveal();
        else el.addEventListener('load', reveal, { once: true });
      });
    });
    observer.observe(container, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full"
    >
      <div
        id="aa_embed"
        ref={ref}
        style={{ clear: 'both', minHeight: '500px' }}
      />
      {/* Real noscript — only shown to non-JS clients; not picked up by SR otherwise.
          Children must be JSX (not a template-string of HTML), otherwise the
          server escapes the angle brackets and the client doesn't, causing
          a hydration mismatch. */}
      <noscript>
        <p style={{ textAlign: 'center', padding: '2.5rem 0', color: '#6F6F7A' }}>
          Please enable JavaScript to view the artwork gallery.
        </p>
      </noscript>
    </motion.div>
  );
}
