import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

// ─────────────────────────────────────────────────────────────
// about_me.txt content
// ─────────────────────────────────────────────────────────────
const ABOUT_ME = `================================================================================
   about_me.txt
   Last modified: March 2026
================================================================================

╔══════════════════════════════════════════════════════════════════════════════╗
║                         HELLO, WORLD.  ( ͡° ͜ʖ ͡°)                          ║
╚══════════════════════════════════════════════════════════════════════════════╝

  My name is Portfolio Dev — a full-stack developer with a passion for
  crafting experiences that live at the intersection of technical depth
  and pixel-perfect design. If you're reading this inside a Windows XP
  Notepad running in a React app... you already know I'm a little extra.

  Currently based on the internet. Possibly on your screen right now.


────────────────────────────────────────────────────────────────────────────────
  SECTION 1 — INTRODUCTION
────────────────────────────────────────────────────────────────────────────────

  I started coding at age 14 with a pirated copy of Macromedia Flash and
  a burning desire to make things move on screen. Since then I've shipped
  production apps used by thousands, built 3D portfolio experiences using
  Three.js, and somehow ended up recreating Windows XP in a browser.

  I believe great software is:
    • Fast       — users shouldn't wait for you
    • Accessible — works for everyone, everywhere
    • Delightful — the little details that make people smile

  When I'm not writing code I'm reading about distributed systems,
  experimenting with generative art, or over-engineering my home lab.


────────────────────────────────────────────────────────────────────────────────
  SECTION 2 — SKILLS & TECHNOLOGIES
────────────────────────────────────────────────────────────────────────────────

  Frontend
  ○ React 18+, Next.js 14+, TypeScript
  ○ Three.js / React Three Fiber / WebGL
  ○ Framer Motion, GSAP, CSS animations
  ○ Tailwind CSS, styled-components, vanilla CSS

  Backend
  ○ Node.js, Express, Fastify
  ○ Python, FastAPI, Django
  ○ REST APIs, GraphQL, WebSockets

  Data & ML
  ○ PostgreSQL, MongoDB, Redis
  ○ Apache Spark, Airflow ETL pipelines
  ○ PyTorch, HuggingFace Transformers
  ○ Pandas, NumPy, Scikit-learn

  DevOps & Cloud
  ○ Docker, Kubernetes
  ○ GitHub Actions CI/CD
  ○ AWS (EC2, S3, Lambda), Vercel, Fly.io
  ○ Linux server administration

  Skill level key:  ████████░░ Comfortable   ██████████ Expert


────────────────────────────────────────────────────────────────────────────────
  SECTION 3 — CAREER GOALS
────────────────────────────────────────────────────────────────────────────────

  Short-term (1–2 years):
  ▶ Join a product team where I can own a significant feature end-to-end
  ▶ Deepen expertise in real-time collaborative systems (CRDTs, WebRTC)
  ▶ Ship an open-source project with 1 000+ GitHub stars

  Long-term (3–5 years):
  ▶ Lead an engineering team focused on developer tooling or creative tech
  ▶ Build a profitable SaaS product (idea: AI-assisted design system gen)
  ▶ Contribute meaningfully to web performance & accessibility standards

  Dream project:
    A browser-native 3D collaborative IDE that makes pair programming feel
    like you're in the same physical space. (Yes, I know how ambitious that
    sounds. That's the point.)


────────────────────────────────────────────────────────────────────────────────
  SECTION 4 — FUN FACTS
────────────────────────────────────────────────────────────────────────────────

  • First computer: a Pentium III running Windows 98
  • This portfolio is intentionally over-engineered (it's a feature)
  • I type at ~110 WPM yet still misspell "definitely" constantly
  • Favourite debugging technique: explaining the problem to a rubber duck
  • Currently listening to: lo-fi hip hop & synthwave playlists on loop


────────────────────────────────────────────────────────────────────────────────
  CONTACT
────────────────────────────────────────────────────────────────────────────────

  Email    →  hello@portfolio.dev
  GitHub   →  github.com/portfolio-dev
  LinkedIn →  linkedin.com/in/portfolio-dev
  Twitter  →  @portfoliodev


================================================================================
  EOF — about_me.txt
================================================================================
`;

// ─────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────
const NOTE_ID   = 'about-me-note';
const TYPE_SPEED = 14; // ms per character (adjust for taste)

const MENUS = {
  File:   ['New', 'Open...', 'Save\tCtrl+S', 'Save As...', '---', 'Page Setup...', 'Print...\tCtrl+P', '---', 'Exit'],
  Edit:   ['Undo\tCtrl+Z', '---', 'Cut\tCtrl+X', 'Copy\tCtrl+C', 'Paste\tCtrl+V', 'Delete\tDel', '---', 'Find...\tCtrl+F', 'Find Next\tF3', 'Replace...\tCtrl+H', 'Go To...\tCtrl+G', '---', 'Select All\tCtrl+A', 'Time/Date\tF5'],
  Format: ['Word Wrap', '---', 'Font...'],
  View:   ['Status Bar'],
  Help:   ['Help Topics', '---', 'About Notepad'],
};

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────
export default function Notepad() {
  const [displayed, setDisplayed]     = useState('');      // visible text
  const [userContent, setUserContent] = useState(null);    // null = still animating
  const [typing, setTyping]           = useState(true);
  const [saved, setSaved]             = useState(true);
  const [wordWrap, setWordWrap]       = useState(true);
  const [openMenu, setOpenMenu]       = useState(null);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [statusLine, setStatusLine]   = useState({ ln: 1, col: 1 });

  const textareaRef = useRef(null);
  const typeIdxRef  = useRef(0);
  const timerRef    = useRef(null);
  const saveTimer   = useRef(null);

  // ── Blinking cursor while typing ─────────────────────────
  useEffect(() => {
    const id = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // ── Load saved content OR start typewriter ───────────────
  useEffect(() => {
    axios.get(`/api/notepad/${NOTE_ID}`)
      .then((r) => {
        if (r.data.content && r.data.content.length > 20) {
          // Resume from saved content — skip animation
          setDisplayed(r.data.content);
          setUserContent(r.data.content);
          setTyping(false);
        } else {
          startTypewriter();
        }
      })
      .catch(() => startTypewriter());
  }, []); // eslint-disable-line

  function startTypewriter() {
    typeIdxRef.current = 0;
    setDisplayed('');
    setTyping(true);

    const tick = () => {
      const i = typeIdxRef.current;
      if (i >= ABOUT_ME.length) {
        // Finished — switch to editable mode
        setDisplayed(ABOUT_ME);
        setUserContent(ABOUT_ME);
        setTyping(false);
        return;
      }
      setDisplayed(ABOUT_ME.slice(0, i + 1));
      typeIdxRef.current = i + 1;
      timerRef.current = setTimeout(tick, TYPE_SPEED);
    };
    timerRef.current = setTimeout(tick, TYPE_SPEED);
  }

  // Skip animation on any keydown
  const skipAnimation = useCallback(() => {
    if (!typing) return;
    clearTimeout(timerRef.current);
    setDisplayed(ABOUT_ME);
    setUserContent(ABOUT_ME);
    setTyping(false);
  }, [typing]);

  useEffect(() => {
    return () => { clearTimeout(timerRef.current); clearTimeout(saveTimer.current); };
  }, []);

  // ── Auto-save (debounced) ─────────────────────────────────
  const handleChange = (e) => {
    const val = e.target.value;
    setUserContent(val);
    setSaved(false);
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      axios.put(`/api/notepad/${NOTE_ID}`, { content: val })
        .then(() => setSaved(true))
        .catch(() => {});
    }, 1400);
  };

  // ── Cursor position ───────────────────────────────────────
  const updateCursorPos = (e) => {
    const ta = e.target;
    const text = ta.value.slice(0, ta.selectionStart);
    const lines = text.split('\n');
    setStatusLine({ ln: lines.length, col: lines[lines.length - 1].length + 1 });
  };

  // ── Menu handling ─────────────────────────────────────────
  const handleMenuAction = (menu, item) => {
    setOpenMenu(null);
    const base = item.split('\t')[0];
    if (base === 'Word Wrap') setWordWrap((v) => !v);
    if (base === 'Time/Date') {
      const now = new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });
      if (!typing) setUserContent((c) => (c || '') + now);
    }
    if (base === 'Select All') textareaRef.current?.select();
    if (base === 'New') { setUserContent(''); setSaved(false); }
  };

  // ── Scroll to bottom during typewriter ───────────────────
  useEffect(() => {
    const ta = textareaRef.current;
    if (ta && typing) ta.scrollTop = ta.scrollHeight;
  }, [displayed, typing]);

  // ── Close menu on outside click ──────────────────────
  useEffect(() => {
    if (!openMenu) return;
    const handler = (e) => setOpenMenu(null);
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [openMenu]);

  // ─────────────────────────────────────────────────────────
  const fontStyle = {
    fontFamily: '"Courier New", Courier, monospace',
    fontSize: 13,
    lineHeight: 1.55,
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#fff' }}
      onKeyDown={typing ? skipAnimation : undefined}
      tabIndex={-1}
    >
      {/* ── Menu bar ────────────────────────────────────── */}
      <div
        style={{
          background: '#ECE9D8',
          borderBottom: '1px solid #ACA899',
          display: 'flex',
          alignItems: 'stretch',
          position: 'relative',
          zIndex: 200,
          flexShrink: 0,
          userSelect: 'none',
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {Object.keys(MENUS).map((menu) => (
          <div
            key={menu}
            style={{ position: 'relative' }}
            onMouseEnter={() => openMenu && setOpenMenu(menu)}
          >
            <div
              onMouseDown={(e) => {
                e.stopPropagation();
                setOpenMenu(openMenu === menu ? null : menu);
              }}
              style={{
                padding: '2px 8px',
                fontSize: 11,
                fontFamily: 'Tahoma, sans-serif',
                cursor: 'default',
                background: openMenu === menu ? '#316AC5' : 'transparent',
                color: openMenu === menu ? '#fff' : '#000',
              }}
            >
              {menu}
            </div>

            {/* Dropdown */}
            {openMenu === menu && (
              <div
                style={{
                  position: 'fixed',
                  background: '#ECE9D8',
                  border: '1px solid #808080',
                  boxShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  minWidth: 190,
                  zIndex: 9999,
                }}
                onMouseDown={(e) => e.stopPropagation()}
              >
                {MENUS[menu].map((item, i) =>
                  item === '---' ? (
                    <div key={i} style={{ height: 1, background: '#ACA899', margin: '2px 4px' }} />
                  ) : (
                    <div
                      key={i}
                      onMouseDown={(e) => { e.stopPropagation(); handleMenuAction(menu, item); }}
                      style={{
                        padding: '3px 20px 3px 24px',
                        fontSize: 11,
                        fontFamily: 'Tahoma, sans-serif',
                        cursor: 'default',
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 24,
                        whiteSpace: 'nowrap',
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = '#316AC5'; e.currentTarget.style.color = '#fff'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = '#000'; }}
                    >
                      <span>{item.split('\t')[0]}</span>
                      {item.includes('\t') && (
                        <span style={{ color: 'inherit', opacity: 0.7 }}>{item.split('\t')[1]}</span>
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        ))}

        {/* Save indicator */}
        <div style={{ flex: 1 }} />
        {!typing && (
          <div style={{
            padding: '2px 8px',
            fontSize: 10,
            fontFamily: 'Tahoma, sans-serif',
            color: saved ? '#2a7a2a' : '#aa4400',
            display: 'flex',
            alignItems: 'center',
          }}>
            {saved ? '✓ Saved' : '● Unsaved'}
          </div>
        )}
      </div>

      {/* ── Document area ──────────────────────────────── */}
      <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {typing ? (
          /* ── Typewriter read-only view ── */
          <div
            style={{
              ...fontStyle,
              height: '100%',
              overflowY: 'auto',
              overflowX: wordWrap ? 'hidden' : 'auto',
              padding: '4px 6px',
              whiteSpace: wordWrap ? 'pre-wrap' : 'pre',
              color: '#000',
              cursor: 'text',
              background: '#fff',
            }}
            onClick={skipAnimation}
            title="Click or press any key to skip animation"
          >
            {displayed}
            {/* blinking block cursor */}
            <span style={{
              display: 'inline-block',
              width: 8,
              height: '1em',
              background: cursorVisible ? '#000' : 'transparent',
              verticalAlign: 'text-bottom',
              marginLeft: 1,
            }} />
            <div style={{
              position: 'absolute',
              bottom: 40,
              right: 8,
              background: 'rgba(0,0,0,0.55)',
              color: '#fff',
              fontSize: 10,
              fontFamily: 'Tahoma, sans-serif',
              padding: '2px 8px',
              borderRadius: 2,
              pointerEvents: 'none',
            }}>
              Click or press any key to skip
            </div>
          </div>
        ) : (
          /* ── Editable textarea ── */
          <textarea
            ref={textareaRef}
            value={userContent ?? ''}
            onChange={handleChange}
            onKeyUp={updateCursorPos}
            onClick={updateCursorPos}
            spellCheck={false}
            style={{
              ...fontStyle,
              width: '100%',
              height: '100%',
              resize: 'none',
              border: 'none',
              outline: 'none',
              padding: '4px 6px',
              background: '#fff',
              color: '#000',
              whiteSpace: wordWrap ? 'pre-wrap' : 'pre',
              overflowWrap: wordWrap ? 'break-word' : 'normal',
              overflowX: wordWrap ? 'hidden' : 'auto',
              overflowY: 'auto',
              boxSizing: 'border-box',
            }}
          />
        )}
      </div>

      {/* ── Status bar ─────────────────────────────────── */}
      <div style={{
        background: '#ECE9D8',
        borderTop: '1px solid #ACA899',
        padding: '1px 0',
        fontSize: 11,
        fontFamily: 'Tahoma, sans-serif',
        display: 'flex',
        flexShrink: 0,
      }}>
        <div style={{
          flex: 1,
          padding: '0 8px',
          borderRight: '1px inset #ACA899',
          color: '#444',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        }}>
          {typing
            ? `Typing... ${Math.floor((typeIdxRef.current / ABOUT_ME.length) * 100)}%  (click to skip)`
            : `about_me.txt`}
        </div>
        <div style={{ padding: '0 8px', color: '#444', whiteSpace: 'nowrap' }}>
          Ln {statusLine.ln}, Col {statusLine.col}
        </div>
        <div style={{
          padding: '0 8px',
          borderLeft: '1px inset #ACA899',
          color: '#666',
          whiteSpace: 'nowrap',
        }}>
          {wordWrap ? 'Wrap' : 'No Wrap'}
        </div>
      </div>
    </div>
  );
}
