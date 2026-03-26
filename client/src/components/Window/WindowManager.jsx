import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useWindowStore } from '../../store/windowStore';
import Window from './Window';

export default function WindowManager() {
  const windows = useWindowStore((s) => s.windows);
  const focusedId = windows.reduce(
    (max, w) => (!max || w.zIndex > windows.find((x) => x.id === max)?.zIndex) ? w.id : max,
    null
  );

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    >
      <AnimatePresence>
        {windows
          .filter((w) => !w.isMinimized)
          .sort((a, b) => a.zIndex - b.zIndex)
          .map((win) => (
            <Window
              key={win.id}
              win={win}
              isActive={win.id === focusedId}
            />
          ))}
      </AnimatePresence>
    </div>
  );
}
