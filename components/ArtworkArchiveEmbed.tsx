'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function ArtworkArchiveEmbed() {
  const ref = useRef<HTMLDivElement>(null);
  const loaded = useRef(false);

  useEffect(() => {
    const container = ref.current;
    if (!container || loaded.current) return;
    loaded.current = true;

    // The embed script injects DOM into the container. Make sure it's empty
    // so a re-mount can't produce a second copy.
    container.innerHTML = '';

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = 'https://www.artworkarchive.com/profile/rushitshah/embed_js.js';
    container.appendChild(script);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <div
        id="aa_embed"
        ref={ref}
        style={{ clear: 'both', minHeight: '500px' }}
      />
      <noscript>
        <p className="text-center py-10" style={{ color: 'var(--ink)', opacity: 0.6 }}>
          Please enable JavaScript to view the artwork gallery.
        </p>
      </noscript>
    </motion.div>
  );
}
