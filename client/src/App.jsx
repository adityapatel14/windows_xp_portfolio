import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSystemStore } from './store/systemStore';
import { usePersistWindows } from './hooks/usePersistWindows';
import { unlockAudio, playClick } from './hooks/soundEngine';
import BootScreen from './screens/BootScreen';
import LoginScreen from './screens/LoginScreen';
import Desktop from './components/Desktop/Desktop';
import Taskbar from './components/Taskbar/Taskbar';
import WindowManager from './components/Window/WindowManager';
import PopupManager from './components/Popup/PopupManager';
import ClippyAssistant from './components/Assistant/ClippyAssistant';
import ShutdownScreen from './screens/ShutdownScreen';

function DesktopEnvironment() {
  usePersistWindows();

  // Global click sound
  useEffect(() => {
    let lastPlayed = 0;
    const handler = (e) => {
      const target = e.target.closest('button, [role="button"], .xp-btn, .xp-icon');
      if (!target) return;

      const now = Date.now();
      if (now - lastPlayed < 80) return;

      lastPlayed = now;
      unlockAudio();
      playClick();
    };

    document.addEventListener('click', handler, true);
    return () => document.removeEventListener('click', handler, true);
  }, []);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        backgroundImage: "url('/assets/xp-bg.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        fontFamily: 'Tahoma, sans-serif',
      }}
    >
      <Desktop />
      <WindowManager />
      <Taskbar />
      <PopupManager />
      <ClippyAssistant />
    </div>
  );
}

export default function App() {
  const { phase } = useSystemStore();

  return (
    <AnimatePresence mode="wait">
      {phase === 'boot' && (
        <motion.div
          key="boot"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ position: 'fixed', inset: 0, zIndex: 99999 }}
        >
          <BootScreen />
        </motion.div>
      )}

      {phase === 'login' && (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ position: 'fixed', inset: 0, zIndex: 99998 }}
        >
          <LoginScreen />
        </motion.div>
      )}

      {phase === 'desktop' && (
        <motion.div
          key="desktop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'fixed', inset: 0 }}
        >
          <DesktopEnvironment />
        </motion.div>
      )}

      {phase === 'shutdown' && (
        <motion.div
          key="shutdown"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ position: 'fixed', inset: 0, zIndex: 999999 }}
        >
          <ShutdownScreen />
        </motion.div>
      )}
    </AnimatePresence>
  );
}