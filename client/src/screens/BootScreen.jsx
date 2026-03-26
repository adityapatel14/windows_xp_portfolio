import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSystemStore } from '../store/systemStore';

export default function BootScreen() {
  const { setPhase } = useSystemStore();

  useEffect(() => {
    const t = setTimeout(() => setPhase('login'), 3500);
    return () => clearTimeout(t);
  }, [setPhase]);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      fontFamily: 'Tahoma, sans-serif',
    }}>
      {/* XP Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{ textAlign: 'center', marginBottom: 40 }}
      >
        <div style={{ fontSize: 64, marginBottom: 8 }}>🪟</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
          <span style={{
            fontSize: 42,
            fontWeight: '200',
            color: '#fff',
            letterSpacing: -2,
          }}>
            Windows
          </span>
          <span style={{
            fontSize: 42,
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #FF5C00, #FFAB00, #FF5C00)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginLeft: 10,
          }}>
            XP
          </span>
        </div>
        <div style={{
          fontSize: 12,
          color: 'rgba(255,255,255,0.6)',
          marginTop: 4,
          fontStyle: 'italic',
        }}>
          Portfolio Edition
        </div>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          width: 300,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div style={{
          width: '100%',
          height: 14,
          background: '#111',
          border: '1px solid #333',
          borderRadius: 7,
          overflow: 'hidden',
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3, ease: 'linear' }}
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #245EDB, #5A90FF)',
              borderRadius: 7,
            }}
          />
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>
          Loading your experience...
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        style={{
          position: 'absolute',
          bottom: 24,
          fontSize: 10,
          color: 'rgba(255,255,255,0.3)',
        }}
      >
        Copyright © 2026 Portfolio Edition. Inspired by Microsoft Windows XP.
      </motion.div>
    </div>
  );
}
