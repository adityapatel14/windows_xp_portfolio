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
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Tahoma, sans-serif',
        color: '#fff',
        position: 'relative',
      }}
    >
      {/* LOGO */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <img
          src="/assets/xpbootimage.webp"
          alt="Windows XP"
          style={{ width: 320 }}
        />
        <div
          style={{
            fontSize: 20,
            color: '#dcdcdc',
            marginTop: 6,
            letterSpacing: 0.6,
            fontWeight: 400,
          }}
        >
          Professional
        </div>
      </div>

      {/* LOADING SECTION */}
      <div style={{ marginTop: 10 }}>
        
        {/* OPTION 1 — REALISTIC ANIMATION (RECOMMENDED) */}
        <div
          style={{
            width: 200,
            height: 16,
            background: '#111',
            border: '1px solid #444',
            overflow: 'hidden',
            position: 'relative',
            margin: '0 auto',
          }}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              repeat: Infinity,
              duration: 1.1,
              ease: 'linear',
            }}
            style={{
              display: 'flex',
              gap: 3,
              height: '100%',
              alignItems: 'center',
              paddingLeft: 4,
            }}
          >
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: 16,
                  height: 10,
                  background: '#3A8DFF',
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* OPTION 2 — GIF (UNCOMMENT TO USE) */}
        {/*
        <img
          src="/assets/xp-loading.gif"
          alt="loading"
          style={{ width: 200, display: 'block', margin: '0 auto' }}
        />
        */}

        {/* TEXT */}
        <div
          style={{
            marginTop: 10,
            fontSize: 11,
            color: 'rgba(255,255,255,0.5)',
            textAlign: 'center',
          }}
        >
          Starting Windows...
        </div>
      </div>

      {/* FOOTER */}
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          fontSize: 10,
          color: 'rgba(255,255,255,0.3)',
        }}
      >
        © Microsoft Corporation
      </div>
    </div>
  );
}