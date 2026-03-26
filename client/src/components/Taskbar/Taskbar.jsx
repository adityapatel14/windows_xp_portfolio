import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '../../store/windowStore';
import StartMenu from './StartMenu';
import TaskbarItem from './TaskbarItem';
import SystemTray from './SystemTray';

export default function Taskbar() {
  const [startOpen, setStartOpen] = useState(false);
  const windows = useWindowStore((s) => s.windows);
  const menuRef = useRef(null);

  // Close start menu on outside click
  useEffect(() => {
    const handle = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setStartOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  return (
    <>
      {/* Start Menu */}
      <AnimatePresence>
        {startOpen && (
          <div
            ref={menuRef}
            style={{
              position: 'fixed',
              bottom: 40,
              left: 0,
              zIndex: 9999,
            }}
          >
            <StartMenu onClose={() => setStartOpen(false)} />
          </div>
        )}
      </AnimatePresence>

      {/* Taskbar */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 40,
          background:
            'linear-gradient(180deg, #245EDB 0%, #1941A5 50%, #0C2C84 100%)',
          borderTop: '2px solid #3A6EE8',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: '0 6px',
          zIndex: 9998,
          boxShadow: '0 -2px 6px rgba(0,0,0,0.5)',
        }}
      >
        {/* START BUTTON (XP STYLE) */}
        <button
          onClick={() => setStartOpen((v) => !v)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 12px',
            height: 30,
            borderRadius: '6px',
            border: '1px solid #0B5E00',
            background:
              'linear-gradient(180deg, #3CE23C 0%, #2FBF2F 40%, #1E8E1E 100%)',
            color: 'white',
            fontWeight: 'bold',
            fontSize: 14,
            cursor: 'pointer',
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4)',
          }}
        >
          <img
            src="/assets/xp-logo.png"
            alt="xp"
            style={{ width: 18, height: 18 }}
          />
          Start
        </button>

        {/* Divider */}
        <div
          style={{
            width: 2,
            height: 28,
            background: 'rgba(255,255,255,0.2)',
            margin: '0 4px',
          }}
        />

        {/* Open windows */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            flex: 1,
            overflow: 'hidden',
            flexWrap: 'nowrap',
          }}
        >
          {windows.map((w) => (
            <TaskbarItem key={w.id} win={w} />
          ))}
        </div>

        {/* System tray */}
        <SystemTray />
      </div>
    </>
  );
}