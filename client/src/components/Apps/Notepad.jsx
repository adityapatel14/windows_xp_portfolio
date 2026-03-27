import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

// ─────────────────────────────────────────────────────────────
// about_me.txt content
// ─────────────────────────────────────────────────────────────
const ABOUT_ME = `Welcome to my portfolio OS.

This system is designed to simulate a real Windows XP environment where you can explore my projects, datasets, and analysis.

Key Highlights:
* Internship Dashboard (Power BI)
* Supermart SQL Analysis
* Fandango Rating Bias Study

Use File Explorer to navigate through folders and open files.

Tip: Try opening Internet Explorer 😉`;

// ─────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────
const NOTE_ID   = 'notes-txt';
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
            : `notes.txt`}
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
