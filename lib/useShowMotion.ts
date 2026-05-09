'use client';

import { useEffect, useState } from 'react';

/**
 * Returns false on Save-Data, slow-2g, 2g, 3g connections so callers can skip
 * decorative motion (background videos, heavy WebGL, etc).
 *
 * The defaults err on the side of "show motion": we return true on the server
 * and on initial hydration, then flip to false in a useEffect once we can read
 * navigator.connection. This avoids SSR/hydration layout flash for the 95% of
 * users on a normal connection — only Save-Data / 2G / 3G visitors fall back to
 * the static treatment a frame after hydration.
 *
 * Use this for purely decorative motion. Anything functional (e.g. an explainer
 * video the user clicked play on) should ignore the connection hint.
 */
export function useShowMotion(): boolean {
  const [show, setShow] = useState(true);

  useEffect(() => {
    type Connection = {
      saveData?: boolean;
      effectiveType?: 'slow-2g' | '2g' | '3g' | '4g';
    };
    const conn = (navigator as Navigator & { connection?: Connection }).connection;
    if (!conn) return; // No NetworkInformation API — assume fast and continue showing motion.
    const slowTypes = new Set(['slow-2g', '2g', '3g']);
    if (conn.saveData || (conn.effectiveType && slowTypes.has(conn.effectiveType))) {
      setShow(false);
    }
  }, []);

  return show;
}
