import React, { useState, useEffect } from 'react';

export default function SystemTray() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    };
    update();
    const timer = setInterval(update, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'linear-gradient(180deg, #1245AB 0%, #1A58CE 100%)',
        border: '1px solid #0A246A',
        borderRadius: 3,
        padding: '0 8px',
        height: 30,
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 14 }} title="Network">🌐</span>
      <span style={{ fontSize: 14 }} title="Volume">🔊</span>
      <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.2)' }} />
      <span
        style={{
          color: '#fff',
          fontSize: 11,
          fontFamily: 'Tahoma, sans-serif',
          whiteSpace: 'nowrap',
        }}
      >
        {time}
      </span>
    </div>
  );
}
