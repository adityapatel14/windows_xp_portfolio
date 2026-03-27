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
          whileHover={{ 
            scale: 1.02, 
            backgroundColor: 'rgba(255,255,255,0.1)', 
            boxShadow: '0 0 10px rgba(255,255,255,0.3)' 
          }}
          whileTap={{ scale: 0.98 }}
          onClick={() => { unlockAudio(); playStartup(); setPhase('desktop'); }}
          style={{
            display: 'inline-flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
            padding: '12px 24px',
            cursor: 'pointer',
            borderRadius: 4,
            border: '1px solid transparent',
            transition: 'all 0.2s',
          }}
        >
          <div style={{
            width: 72,
            height: 72,
            borderRadius: 8,
            border: '2px solid rgba(255,255,255,0.8)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.5)',
            overflow: 'hidden',
            flexShrink: 0,
            background: '#fff',
          }}>
            <img 
              src="/assets/adi.jpg" 
              alt="Aditya Patel" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { e.target.onerror = null; e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>' }}
            />
          </div>
          <div style={{ color: '#fff', fontSize: 20, fontWeight: 'bold', textShadow: '1px 1px 2px rgba(0,0,0,0.8)' }}>
            Aditya Patel
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
        justifyContent: 'space-between',
        padding: '0 24px',
        gap: 12,
        borderTop: '3px solid #0A246A',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
          <div style={{ background: '#CC0000', borderRadius: 4, padding: '2px 4px', border: '1px solid #fff' }}>
            <span style={{ color: '#fff', fontSize: 14 }}>⏻</span>
          </div>
          <span style={{ color: '#fff', fontSize: 11, fontFamily: 'Tahoma, sans-serif' }}>Turn off computer</span>
        </div>
        
        <div>
          <button
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
            Options
          </button>
        </div>
      </div>
    </div>
  );
}
