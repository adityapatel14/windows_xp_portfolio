import React, { useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { usePopupStore } from '../../store/popupStore';
import XPPopup from './XPPopup';

// Random interval between 20s and 45s
const MIN_INTERVAL = 20_000;
const MAX_INTERVAL = 45_000;

function randomDelay() {
  return MIN_INTERVAL + Math.random() * (MAX_INTERVAL - MIN_INTERVAL);
}

export default function PopupManager() {
  const { popups, triggerRandom } = usePopupStore();
  const timerRef = useRef(null);

  useEffect(() => {
    function scheduleNext() {
      timerRef.current = setTimeout(() => {
        triggerRandom();
        scheduleNext();
      }, randomDelay());
    }

    // Fire first popup after a short warm-up (8–15s) so the user has time to
    // reach the desktop before anything appears.
    timerRef.current = setTimeout(() => {
      triggerRandom();
      scheduleNext();
    }, 8000 + Math.random() * 7000);

    return () => clearTimeout(timerRef.current);
  }, [triggerRandom]);

  return (
    <AnimatePresence>
      {popups.map((popup) => (
        <XPPopup key={popup.id} popup={popup} />
      ))}
    </AnimatePresence>
  );
}
