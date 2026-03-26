import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BASE_URL = 'http://localhost:3001/api';

/* ─── Cartoon Clippy SVG Avatar ─────────────────────────────────────── */
function AdityaAvatar({ blinking, talking }) {
  return (
    <svg
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: 64, height: 64, display: 'block' }}
    >
      {/* Body / torso */}
      <ellipse cx="40" cy="58" rx="20" ry="14" fill="#1565C0" />
      {/* Collar / shirt */}
      <ellipse cx="40" cy="52" rx="12" ry="7" fill="#1E88E5" />
      {/* Tie */}
      <polygon points="40,50 37,60 40,58 43,60" fill="#E53935" />

      {/* Head */}
      <circle cx="40" cy="34" r="19" fill="#FFCC80" />
      {/* Hair */}
      <ellipse cx="40" cy="17" rx="17" ry="8" fill="#4E342E" />
      <rect x="23" y="15" width="34" height="10" rx="3" fill="#4E342E" />

      {/* Eyes */}
      {blinking ? (
        <>
          <rect x="27" y="31" width="8" height="2" rx="1" fill="#333" />
          <rect x="45" y="31" width="8" height="2" rx="1" fill="#333" />
        </>
      ) : (
        <>
          <ellipse cx="31" cy="33" rx="4" ry="4.5" fill="white" />
          <ellipse cx="49" cy="33" rx="4" ry="4.5" fill="white" />
          <circle cx="32" cy="34" r="2.5" fill="#1A237E" />
          <circle cx="50" cy="34" r="2.5" fill="#1A237E" />
          <circle cx="33" cy="33" r="1" fill="white" />
          <circle cx="51" cy="33" r="1" fill="white" />
        </>
      )}

      {/* Eyebrows */}
      <path d="M27 27 Q31 24 35 27" stroke="#4E342E" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M45 27 Q49 24 53 27" stroke="#4E342E" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Nose */}
      <ellipse cx="40" cy="37" rx="2" ry="1.5" fill="#FFAB40" />

      {/* Mouth */}
      {talking ? (
        <ellipse cx="40" cy="43" rx="6" ry="4" fill="#D32F2F" />
      ) : (
        <path d="M34 42 Q40 47 46 42" stroke="#BF360C" strokeWidth="2" fill="none" strokeLinecap="round" />
      )}

      {/* Ears */}
      <ellipse cx="21" cy="34" rx="3" ry="4" fill="#FFCC80" />
      <ellipse cx="59" cy="34" rx="3" ry="4" fill="#FFCC80" />

      {/* Glasses */}
      <rect x="26" y="28" width="10" height="8" rx="2" fill="none" stroke="#333" strokeWidth="1.5" />
      <rect x="44" y="28" width="10" height="8" rx="2" fill="none" stroke="#333" strokeWidth="1.5" />
      <line x1="36" y1="32" x2="44" y2="32" stroke="#333" strokeWidth="1.5" />
    </svg>
  );
}

/* ─── Speech Bubble Tail SVG ─────────────────────────────────────────── */
function SpeechBubbleTail() {
  return (
    <svg
      viewBox="0 0 30 20"
      style={{ position: 'absolute', bottom: -18, right: 18, width: 30, height: 20 }}
    >
      <polygon points="0,0 30,0 25,20" fill="#FFFDE7" stroke="#333" strokeWidth="1.5" />
      <line x1="0" y1="0" x2="25" y2="20" stroke="#FFFDE7" strokeWidth="2" />
    </svg>
  );
}

/* ─── Main Component ─────────────────────────────────────────────────── */
export default function ClippyAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi, I'm Aditya. Need help? 👋" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [blinking, setBlinking] = useState(false);
  const [talking, setTalking] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const messagesEndRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Blink every 3-5 seconds
  useEffect(() => {
    const scheduleBlink = () => {
      const delay = 3000 + Math.random() * 2000;
      return setTimeout(() => {
        setBlinking(true);
        setTimeout(() => setBlinking(false), 150);
        scheduleBlink();
      }, delay);
    };
    const timer = scheduleBlink();
    return () => clearTimeout(timer);
  }, []);

  // Hide open bubble after 4s on load
  useEffect(() => {
    const t = setTimeout(() => setShowBubble(false), 4000);
    return () => clearTimeout(t);
  }, []);

  // Talking animation while typing
  useEffect(() => {
    if (!isTyping) { setTalking(false); return; }
    const interval = setInterval(() => setTalking(t => !t), 250);
    return () => clearInterval(interval);
  }, [isTyping]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMsg = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const res = await fetch(`${BASE_URL}/assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      if (!res.ok) throw new Error('API Error');
      const reply = await res.json();
      if (reply.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ ${reply.error}` }]);
      } else {
        setMessages(prev => [...prev, reply]);
      }
    } catch {
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Yikes! My server connection failed. Did someone trip over the ethernet cable? 🤔" }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickReplies = ['Tell me about projects', 'What are your skills?', 'Your experience?'];

  return (
    <motion.div
      drag
      dragMomentum={false}
      initial={{ opacity: 0, y: 60, scale: 0.7 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', bounce: 0.55, duration: 0.9, delay: 1.2 }}
      style={{
        position: 'fixed',
        bottom: 90,
        right: 44,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 8,
        userSelect: 'none',
      }}
    >
      {/* ── Chat Panel ────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.85, y: 20, originX: 1, originY: 1 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', bounce: 0.35, duration: 0.4 }}
            onPointerDown={e => e.stopPropagation()}
            style={{
              width: 300,
              background: 'linear-gradient(160deg, #ECF4FF 0%, #FFFFFF 100%)',
              border: '2px solid #1565C0',
              borderRadius: 12,
              borderBottomRightRadius: 4,
              boxShadow: '0 8px 30px rgba(21,101,192,0.25), 0 2px 0 #0D47A1',
              overflow: 'hidden',
              fontFamily: "Tahoma, 'MS Sans Serif', Arial, sans-serif",
              fontSize: 11,
            }}
          >
            {/* Title Bar */}
            <div style={{
              background: 'linear-gradient(90deg, #1565C0 0%, #1E88E5 50%, #1565C0 100%)',
              padding: '5px 10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 14 }}>🤖</span>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: 12, letterSpacing: 0.5 }}>
                  Aditya AI — Portfolio Assistant
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'linear-gradient(180deg,#E57373,#C62828)',
                  border: '1px solid #7B1FA2',
                  borderRadius: 3,
                  color: 'white',
                  cursor: 'pointer',
                  width: 16,
                  height: 14,
                  fontSize: 9,
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1,
                  padding: 0,
                }}
              >✕</button>
            </div>

            {/* Messages */}
            <div style={{
              height: 210,
              overflowY: 'auto',
              padding: '10px 10px 4px',
              display: 'flex',
              flexDirection: 'column',
              gap: 8,
              scrollbarWidth: 'thin',
              scrollbarColor: '#90CAF9 transparent',
            }}>
              {messages.map((m, i) => (
                <div
                  key={i}
                  style={{
                    alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start',
                    maxWidth: '82%',
                  }}
                >
                  {m.role === 'assistant' && (
                    <div style={{ fontSize: 9, color: '#1565C0', fontWeight: 'bold', marginBottom: 2, marginLeft: 3 }}>
                      Aditya
                    </div>
                  )}
                  <div style={{
                    padding: '6px 10px',
                    borderRadius: m.role === 'user' ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
                    background: m.role === 'user'
                      ? 'linear-gradient(135deg, #1E88E5, #1565C0)'
                      : 'white',
                    color: m.role === 'user' ? 'white' : '#1A1A2E',
                    border: m.role === 'user' ? 'none' : '1px solid #BBDEFB',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
                    lineHeight: 1.5,
                    wordBreak: 'break-word',
                  }}>
                    {m.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ alignSelf: 'flex-start', display: 'flex', gap: 4, padding: '6px 10px', background: 'white', border: '1px solid #BBDEFB', borderRadius: '12px 12px 12px 2px' }}>
                  {[0, 1, 2].map(i => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.7, delay: i * 0.15 }}
                      style={{ width: 6, height: 6, borderRadius: '50%', background: '#1565C0' }}
                    />
                  ))}
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            {messages.length <= 1 && (
              <div style={{ padding: '0 10px 6px', display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {quickReplies.map(q => (
                  <button
                    key={q}
                    onClick={async () => {
                      if (isTyping) return;
                      const userMsg = { role: 'user', content: q };
                      const newMsgs = [...messages, userMsg];
                      setMessages(newMsgs);
                      setIsTyping(true);
                      try {
                        const res = await fetch(`${BASE_URL}/assistant/chat`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ messages: newMsgs }),
                        });
                        const reply = await res.json();
                        setMessages(prev => [...prev, reply.error ? { role: 'assistant', content: `⚠️ ${reply.error}` } : reply]);
                      } catch {
                        setMessages(prev => [...prev, { role: 'assistant', content: "Oops, that didn't work! 🤷" }]);
                      } finally {
                        setIsTyping(false);
                      }
                    }}
                    style={{
                      background: '#E3F2FD',
                      border: '1px solid #90CAF9',
                      borderRadius: 10,
                      padding: '3px 8px',
                      fontSize: 10,
                      color: '#1565C0',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                    }}
                  >{q}</button>
                ))}
              </div>
            )}

            {/* Input */}
            <form
              onSubmit={handleSend}
              style={{
                display: 'flex',
                gap: 6,
                padding: '6px 8px 8px',
                borderTop: '1px solid #BBDEFB',
                background: '#F5F9FF',
              }}
            >
              <input
                id="clippy-input"
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask me anything…"
                style={{
                  flex: 1,
                  padding: '5px 9px',
                  border: '1.5px solid #90CAF9',
                  borderRadius: 8,
                  fontSize: 11,
                  fontFamily: 'inherit',
                  outline: 'none',
                  background: 'white',
                  color: '#1A1A2E',
                }}
              />
              <button
                type="submit"
                disabled={isTyping || !input.trim()}
                style={{
                  background: isTyping || !input.trim()
                    ? '#B0BEC5'
                    : 'linear-gradient(180deg,#42A5F5,#1565C0)',
                  border: '1px solid #0D47A1',
                  borderRadius: 6,
                  color: 'white',
                  cursor: isTyping || !input.trim() ? 'default' : 'pointer',
                  padding: '4px 10px',
                  fontFamily: 'inherit',
                  fontSize: 11,
                  fontWeight: 'bold',
                  transition: 'background 0.2s',
                }}
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Idle Speech Bubble ─────────────────────────────────────── */}
      <AnimatePresence>
        {!isOpen && showBubble && (
          <motion.div
            key="idle-bubble"
            initial={{ opacity: 0, scale: 0.7, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 10 }}
            transition={{ type: 'spring', bounce: 0.5 }}
            style={{
              position: 'relative',
              background: '#FFFDE7',
              border: '2px solid #333',
              borderRadius: 14,
              borderBottomRightRadius: 4,
              padding: '8px 14px',
              fontSize: 12,
              fontFamily: "Tahoma, 'MS Sans Serif', Arial",
              color: '#1A1A2E',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              boxShadow: '2px 3px 0 rgba(0,0,0,0.15)',
              cursor: 'pointer',
              marginBottom: 4,
            }}
            onClick={() => { setIsOpen(true); setShowBubble(false); }}
          >
            Hi, I'm Aditya. Need help? 👋
            <SpeechBubbleTail />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Avatar Button ──────────────────────────────────────────── */}
      <motion.div
        whileHover={{ scale: 1.08, rotate: [-2, 2, -2, 0], transition: { rotate: { duration: 0.4 } } }}
        whileTap={{ scale: 0.92 }}
        animate={!isOpen ? {
          y: [0, -6, 0],
          transition: { repeat: Infinity, duration: 2.5, ease: 'easeInOut' }
        } : {}}
        onClick={() => { setIsOpen(o => !o); setShowBubble(false); }}
        style={{
          width: 68,
          height: 68,
          background: 'radial-gradient(circle at 35% 35%, #FFF3E0, #FFB300)',
          border: '3px solid #333',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(0,0,0,0.35), inset 0 -2px 6px rgba(0,0,0,0.2)',
          position: 'relative',
        }}
      >
        <AdityaAvatar blinking={blinking} talking={talking} />

        {/* Notification dot */}
        {!isOpen && (
          <motion.div
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            style={{
              position: 'absolute',
              top: -3,
              right: -3,
              width: 14,
              height: 14,
              background: '#F44336',
              borderRadius: '50%',
              border: '2px solid white',
              boxShadow: '0 0 6px rgba(244,67,54,0.7)',
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
