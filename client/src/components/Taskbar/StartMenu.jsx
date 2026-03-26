import React from 'react';
import { motion } from 'framer-motion';
import { useWindowStore } from '../../store/windowStore';
import { useSystemStore } from '../../store/systemStore';
import { playShutdown } from '../../hooks/soundEngine';

const MENU_APPS = [
  { id: 'mycomputer', label: 'My Computer',       emoji: '🖥️' },
  { id: 'explorer',   label: 'My Projects',        emoji: '📁' },
  { id: 'about',      label: 'About Me',           emoji: '👤' },
  { id: 'notepad',    label: 'Notepad',            emoji: '📝' },
  { id: 'terminal',   label: 'Command Prompt',     emoji: '💻' },
  { id: 'browser',    label: 'Internet Explorer',  emoji: '🌐' },
];

export default function StartMenu({ onClose }) {
  const { openWindow } = useWindowStore();
  const { setPhase } = useSystemStore();

  const launch = (appId) => {
    openWindow(appId);
    onClose();
  };

  const handleLogOff = () => {
    onClose();
    setPhase('login');
  };

  const handleTurnOff = () => {
    onClose();
    playShutdown();
    // Short delay so the sound starts before the screen transition
    setTimeout(() => setPhase('shutdown'), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.97 }}
      transition={{ duration: 0.15 }}
      style={{
        width: 360,
        background: '#ECE9D8',
        border: '2px solid #0A246A',
        borderRadius: '8px 8px 0 0',
        boxShadow: '3px -3px 12px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: 'Tahoma, sans-serif',
      }}
    >
      {/* Header */}
      <div style={{
        background: 'linear-gradient(90deg, #245EDB 0%, #1A45B5 100%)',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <div style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          background: 'linear-gradient(135deg, #FFA500, #FF6600)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 26,
          border: '2px solid rgba(255,255,255,0.4)',
        }}>
          👤
        </div>
        <div>
          <div style={{ color: '#fff', fontWeight: 'bold', fontSize: 14 }}>Portfolio User</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>Windows XP Portfolio</div>
        </div>
      </div>

      {/* Content area */}
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Left — pinned apps */}
        <div style={{ flex: 1, borderRight: '1px solid #ACA899', padding: '8px 0' }}>
          <div style={{ padding: '0 8px 6px', fontSize: 10, color: '#666', borderBottom: '1px solid #DDD' }}>
            PINNED PROGRAMS
          </div>
          {MENU_APPS.map((app) => (
            <button
              key={app.id}
              onClick={() => launch(app.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: '6px 12px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                fontFamily: 'Tahoma, sans-serif',
                fontSize: 12,
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#316AC5'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
            >
              <span style={{ fontSize: 22 }}>{app.emoji}</span>
              <div>
                <div style={{ fontWeight: 'bold', color: '#000' }}>{app.label}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Right — places */}
        <div style={{ width: 140, padding: '8px 0' }}>
          <div style={{ padding: '0 8px 6px', fontSize: 10, color: '#666', borderBottom: '1px solid #DDD' }}>
            PLACES
          </div>
          {[
            { label: 'My Documents',  emoji: '📁' },
            { label: 'My Pictures',   emoji: '🖼️' },
            { label: 'My Music',      emoji: '🎵' },
            { label: 'Control Panel', emoji: '⚙️' },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '5px 10px',
                fontSize: 11,
                cursor: 'pointer',
                color: '#000',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#316AC5'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
            >
              <span>{item.emoji}</span> {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: 'linear-gradient(90deg, #245EDB 0%, #1A45B5 100%)',
        borderTop: '1px solid #0A246A',
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '4px 8px',
        gap: 8,
      }}>
        <button
          onClick={handleLogOff}
          style={{
            background: 'linear-gradient(180deg, #5080D0 0%, #2855B0 100%)',
            border: '1px solid #0A246A',
            borderRadius: 4,
            color: '#fff',
            fontFamily: 'Tahoma, sans-serif',
            fontSize: 11,
            padding: '3px 12px',
            cursor: 'pointer',
          }}
        >
          🔴 Log Off
        </button>
        <button
          onClick={handleTurnOff}
          style={{
            background: 'linear-gradient(180deg, #5080D0 0%, #2855B0 100%)',
            border: '1px solid #0A246A',
            borderRadius: 4,
            color: '#fff',
            fontFamily: 'Tahoma, sans-serif',
            fontSize: 11,
            padding: '3px 12px',
            cursor: 'pointer',
          }}
        >
          ⏻ Turn Off
        </button>
      </div>
    </motion.div>
  );
}
