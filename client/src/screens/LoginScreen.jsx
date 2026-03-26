import React from 'react';
import { motion } from 'framer-motion';
import { useSystemStore } from '../store/systemStore';
import { unlockAudio, playStartup } from '../hooks/soundEngine';

export default function LoginScreen() {
  const { setPhase } = useSystemStore();

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(180deg, #1B49C8 0%, #0A246A 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Tahoma, sans-serif',
      userSelect: 'none',
    }}>
      {/* Header bar */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0,
        background: 'linear-gradient(90deg, #245EDB 0%, #1A45B5 100%)',
        height: 56,
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        gap: 8,
        borderBottom: '3px solid #0A246A',
      }}>
        <span style={{ fontSize: 28 }}>🪟</span>
        <span style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>Windows</span>
        <span style={{ color: '#FF8C00', fontSize: 14, fontWeight: 'bold', fontStyle: 'italic' }}>XP</span>
        <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginLeft: 4 }}>Portfolio Edition</span>
      </div>

      {/* User tile */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        style={{ textAlign: 'center' }}
      >
        <div style={{ color: '#fff', fontSize: 14, marginBottom: 24 }}>
          To begin, click your user name
        </div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => { unlockAudio(); playStartup(); setPhase('desktop'); }}
          style={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            background: 'rgba(255,255,255,0.12)',
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: 8,
            padding: '20px 32px',
            cursor: 'pointer',
            backdropFilter: 'blur(8px)',
          }}
        >
          <div style={{
            width: 72,
            height: 72,
            borderRadius: 36,
            background: 'linear-gradient(135deg, #FFA500, #FF6600)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 40,
            border: '3px solid rgba(255,255,255,0.5)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          }}>
            👤
          </div>
          <div style={{ color: '#fff', fontSize: 14, fontWeight: 'bold' }}>Portfolio User</div>
          <div style={{
            fontSize: 11,
            color: 'rgba(255,255,255,0.7)',
            background: 'linear-gradient(90deg, #245EDB, #5A90FF)',
            padding: '3px 16px',
            borderRadius: 12,
          }}>
            Click to log in
          </div>
        </motion.div>
      </motion.div>

      {/* Footer bar */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        background: 'linear-gradient(90deg, #245EDB 0%, #1A45B5 100%)',
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 24px',
        gap: 12,
        borderTop: '3px solid #0A246A',
      }}>
        {['Turn Off Computer', 'Options'].map((label) => (
          <button
            key={label}
            style={{
              background: 'linear-gradient(180deg, #5080D0 0%, #2855B0 100%)',
              border: '1px solid #0A246A',
              borderRadius: 4,
              color: '#fff',
              fontFamily: 'Tahoma, sans-serif',
              fontSize: 11,
              padding: '4px 16px',
              cursor: 'pointer',
            }}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
