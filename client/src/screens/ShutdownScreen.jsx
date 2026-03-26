import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * ShutdownScreen
 *
 * Phases:
 *  1. 'saving'   (0–1.2s) — "Saving your settings..." (XP style)
 *  2. 'black'    (1.2s+)  — Full black with the iconic message
 *  3. 'message'  (2.0s+)  — "It is now safe to hire Aditya." fades in
 */
export default function ShutdownScreen() {
  const [stage, setStage] = useState('saving'); // 'saving' | 'black' | 'message'

  useEffect(() => {
    const t1 = setTimeout(() => setStage('black'),   1200);
    const t2 = setTimeout(() => setStage('message'), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <motion.div
      key="shutdown"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
        fontFamily: "Tahoma, 'MS Sans Serif', Arial, sans-serif",
        userSelect: 'none',
      }}
    >
      {/* Stage 1 — Saving settings overlay (fades out going to stage 2) */}
      <AnimatePresence>
        {stage === 'saving' && (
          <motion.div
            key="saving"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 24,
            }}
          >
            {/* XP logo strip */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 28, fontWeight: '300', color: '#fff', letterSpacing: -1 }}>
                Windows
              </span>
              <span style={{
                fontSize: 28,
                fontWeight: 'bold',
                background: 'linear-gradient(90deg, #FF5C00, #FFAB00)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
                XP
              </span>
            </div>

            <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>
              Saving your settings...
            </div>

            {/* Animated progress dots */}
            <div style={{ display: 'flex', gap: 10 }}>
              {[0, 1, 2].map(i => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ repeat: Infinity, duration: 0.9, delay: i * 0.25 }}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    background: '#245EDB',
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage 3 — The iconic message */}
      <AnimatePresence>
        {stage === 'message' && (
          <motion.div
            key="message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeIn' }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 28,
              padding: 40,
              maxWidth: 520,
              textAlign: 'center',
            }}
          >
            {/* Monitor icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', bounce: 0.4 }}
              style={{ fontSize: 56 }}
            >
              🖥️
            </motion.div>

            {/* Primary message */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: 'bold',
                marginBottom: 10,
                letterSpacing: 0.3,
              }}>
                It is now safe to hire Aditya.
              </div>
              <div style={{
                color: 'rgba(255,255,255,0.45)',
                fontSize: 12,
                fontStyle: 'italic',
                lineHeight: 1.6,
              }}>
                Windows XP Portfolio Edition has shut down.<br />
                All memory leaks have been fixed.<br />
                No recruiters were harmed in this process.
              </div>
            </motion.div>

            {/* Separator */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              style={{
                width: 260,
                height: 1,
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              }}
            />

            {/* Restart hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              style={{
                color: 'rgba(255,255,255,0.3)',
                fontSize: 11,
              }}
            >
              Press F5 or refresh the page to restart.
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
