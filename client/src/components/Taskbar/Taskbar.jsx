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
      {/* Start Menu (above taskbar) */}
      <AnimatePresence>
        {startOpen && (
          <div ref={menuRef} style={{ position: 'fixed', bottom: 40, left: 0, zIndex: 9999 }}>
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
          background: 'linear-gradient(180deg, #1A58CE 0%, #245EDB 40%, #1245AB 100%)',
          borderTop: '2px solid #1A58CE',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          padding: '0 4px',
          zIndex: 9998,
          boxShadow: '0 -1px 3px rgba(0,0,0,0.4)',
        }}
      >
        {/* Start button */}
        <button
          className="start-btn"
          onClick={() => setStartOpen((v) => !v)}
        >
          <span style={{ fontSize: 20 }}>🪟</span>
          start
        </button>

        {/* Divider */}
        <div style={{ width: 2, height: 28, background: 'rgba(255,255,255,0.15)', margin: '0 2px' }} />

        {/* Open windows */}
        <div style={{ display: 'flex', gap: 3, flex: 1, overflow: 'hidden', flexWrap: 'nowrap' }}>
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
