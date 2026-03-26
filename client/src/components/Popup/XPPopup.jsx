import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePopupStore } from '../../store/popupStore';

// ─── System Icons (SVG, pixel-perfect XP style) ──────────────────────────────
function ErrorIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="15" fill="#CC0000" stroke="#8B0000" strokeWidth="1.5"/>
      <circle cx="16" cy="16" r="13" fill="url(#errGrad)"/>
      <defs>
        <radialGradient id="errGrad" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#FF4444"/>
          <stop offset="100%" stopColor="#AA0000"/>
        </radialGradient>
      </defs>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Arial">✕</text>
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <polygon points="16,2 30,28 2,28" fill="url(#warnGrad)" stroke="#B8860B" strokeWidth="1.5" strokeLinejoin="round"/>
      <defs>
        <linearGradient id="warnGrad" x1="16" y1="2" x2="16" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE44D"/>
          <stop offset="100%" stopColor="#E8A000"/>
        </linearGradient>
      </defs>
      <text x="16" y="25" textAnchor="middle" fill="#5c3300" fontSize="16" fontWeight="bold" fontFamily="Arial">!</text>
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="15" fill="url(#infoGrad)" stroke="#0045A0" strokeWidth="1.5"/>
      <defs>
        <radialGradient id="infoGrad" cx="35%" cy="30%">
          <stop offset="0%" stopColor="#4499EE"/>
          <stop offset="100%" stopColor="#0055CC"/>
        </radialGradient>
      </defs>
      <text x="16" y="13" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">i</text>
      <rect x="14" y="15" width="4" height="10" rx="1" fill="white"/>
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <path d="M16 2 L28 7 L28 18 C28 24 22 29 16 31 C10 29 4 24 4 18 L4 7 Z"
            fill="url(#shieldGrad)" stroke="#005500" strokeWidth="1.5"/>
      <defs>
        <linearGradient id="shieldGrad" x1="16" y1="2" x2="16" y2="31" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#44CC44"/>
          <stop offset="100%" stopColor="#008800"/>
        </linearGradient>
      </defs>
      <text x="16" y="22" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="Arial">!</text>
    </svg>
  );
}

const ICONS = {
  error:   <ErrorIcon />,
  warning: <WarningIcon />,
  info:    <InfoIcon />,
  shield:  <ShieldIcon />,
};

const TITLE_BG = {
  error:   'linear-gradient(180deg, #CE0000 0%, #990000 100%)',
  warning: 'linear-gradient(180deg, #1660C8 0%, #2071E3 50%, #245EDB 100%)',
  info:    'linear-gradient(180deg, #1660C8 0%, #2071E3 50%, #245EDB 100%)',
  shield:  'linear-gradient(180deg, #1660C8 0%, #2071E3 50%, #245EDB 100%)',
};

// ─── Spring animation ─────────────────────────────────────────────────────────
const popupVariants = {
  hidden: {
    opacity: 0,
    scale: 0.75,
    y: -20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 420,
      damping: 22,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.88,
    y: 10,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
};

// ─── Single Popup ─────────────────────────────────────────────────────────────
export default function XPPopup({ popup }) {
  const { dismissPopup } = usePopupStore();
  const [isDragging, setIsDragging] = useState(false);

  const titleBg = TITLE_BG[popup.type] || TITLE_BG.info;
  const icon = ICONS[popup.icon] || ICONS.info;

  return (
    <motion.div
      key={popup.id}
      variants={popupVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      drag
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      style={{
        position: 'fixed',
        left: popup.x,
        top: popup.y,
        zIndex: 99000 + popup.id,
        width: 420,
        cursor: isDragging ? 'grabbing' : 'default',
        userSelect: 'none',
        borderRadius: '8px 8px 4px 4px',
        boxShadow: '4px 4px 16px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(255,255,255,0.15)',
        border: '2px solid #0A246A',
        fontFamily: "Tahoma, 'MS Sans Serif', Arial, sans-serif",
        fontSize: 11,
        overflow: 'hidden',
      }}
    >
      {/* ── Title bar ── */}
      <div
        style={{
          background: titleBg,
          padding: '4px 6px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          cursor: isDragging ? 'grabbing' : 'grab',
          borderBottom: '1px solid rgba(0,0,0,0.4)',
        }}
      >
        {/* Title icon */}
        <span style={{ fontSize: 14, lineHeight: 1 }}>
          {popup.type === 'error' ? '🚫' : popup.type === 'warning' ? '⚠️' : 'ℹ️'}
        </span>
        <span style={{
          color: '#fff',
          fontWeight: 'bold',
          fontSize: 12,
          flex: 1,
          textShadow: '1px 1px 1px rgba(0,0,0,0.6)',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}>
          {popup.title}
        </span>
        {/* Close button */}
        <button
          onClick={() => dismissPopup(popup.id)}
          onPointerDown={(e) => e.stopPropagation()}
          style={{
            width: 21,
            height: 20,
            background: 'linear-gradient(180deg, #E86060 0%, #C03030 100%)',
            border: '1px solid rgba(255,255,255,0.35)',
            borderRadius: 3,
            color: '#fff',
            fontSize: 11,
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          ✕
        </button>
      </div>

      {/* ── Body ── */}
      <div style={{
        background: '#ECE9D8',
        padding: '16px 20px 12px',
        display: 'flex',
        gap: 16,
        alignItems: 'flex-start',
        borderBottom: '1px solid #AEB1BC',
      }}>
        {/* System icon */}
        <div style={{ flexShrink: 0, marginTop: 2 }}>
          {icon}
        </div>
        {/* Message */}
        <p style={{
          color: '#000',
          fontSize: 11,
          lineHeight: 1.55,
          whiteSpace: 'pre-line',
          margin: 0,
          flex: 1,
        }}>
          {popup.message}
        </p>
      </div>

      {/* ── Footer ── */}
      <div style={{
        background: '#ECE9D8',
        padding: '8px 16px 10px',
        display: 'flex',
        justifyContent: 'center',
        gap: 8,
      }}>
        <button
          onClick={() => dismissPopup(popup.id)}
          onPointerDown={(e) => e.stopPropagation()}
          className="xp-popup-btn"
        >
          OK
        </button>
      </div>
    </motion.div>
  );
}
