/**
 * usePersistWindows
 *
 * The actual persistence logic now lives entirely inside windowStore.js —
 * every mutating action calls saveWindows() synchronously, and the initial
 * state is loaded synchronously on module import (no flash on reload).
 *
 * This hook is kept as a thin no-op shim so App.jsx doesn't need changes.
 * It can be extended in the future (e.g., cross-tab sync via storage events).
 */
import { useEffect } from 'react';
import { useWindowStore } from '../store/windowStore';

export function usePersistWindows() {
  const windows = useWindowStore(s => s.windows);

  // Cross-tab sync: when another tab writes to localStorage, reload state
  useEffect(() => {
    const handler = (e) => {
      if (e.key !== 'winxp-windows') return;
      try {
        const updated = JSON.parse(e.newValue);
        if (Array.isArray(updated)) {
          useWindowStore.getState().hydrateWindows(updated);
        }
      } catch { /* ignore bad data */ }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);
}
