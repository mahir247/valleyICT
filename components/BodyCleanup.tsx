'use client';

import { useEffect } from 'react';

export default function BodyCleanup() {
  useEffect(() => {
    const body = document.body;
    if (!body) return;

    // Remove known extension/processed attributes that may cause hydration mismatches
    const attrs = Array.from(body.attributes).map((a) => a.name);
    for (const name of attrs) {
      if (name.startsWith('bis_') || name.startsWith('__processed') || name === 'data-reactroot') {
        try {
          body.removeAttribute(name);
        } catch (e) {
          // ignore
        }
      }
    }
  }, []);

  return null;
}
