import React, { useState, useEffect, useRef, useCallback } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────────────────────────────────────
const BOOT_MSG = [
  { text: 'Microsoft Windows XP [Version 5.1.2600]', color: '#ccc' },
  { text: '(C) Copyright 1985-2001 Microsoft Corp.', color: '#ccc' },
  { text: '', color: '#ccc' },
  { text: 'Type "help" to see all available commands.', color: '#33FF00' },
  { text: '', color: '#ccc' },
];

const COMMANDS = {
  help: {
    desc: 'List available commands',
    run: () => [
      { text: '┌──────────────────────────────────────────────────────┐', color: '#33FF00' },
      { text: '│            PORTFOLIO TERMINAL  v1.0.0                │', color: '#FFD700' },
      { text: '└──────────────────────────────────────────────────────┘', color: '#33FF00' },
      { text: '', color: '' },
      { text: '  COMMAND           DESCRIPTION', color: '#888' },
      { text: '  ─────────────────────────────────────────────────────', color: '#444' },
      { text: '  help           →  Show this help message', color: '#33FF00' },
      { text: '  whoami         →  About the developer', color: '#33FF00' },
      { text: '  projects       →  List all projects', color: '#33FF00' },
      { text: '  skills         →  Show tech skills', color: '#33FF00' },
      { text: '  contact        →  Contact information', color: '#33FF00' },
      { text: '  ls             →  List workspace files', color: '#33FF00' },
      { text: '  date           →  Show current date & time', color: '#33FF00' },
      { text: '  echo [text]    →  Print text to terminal', color: '#33FF00' },
      { text: '  clear          →  Clear the terminal', color: '#33FF00' },
      { text: '', color: '' },
      { text: '  Try typing  sudo hire me  for a surprise 👀', color: '#FF8C00' },
      { text: '', color: '' },
    ],
  },

  whoami: {
    desc: 'About the developer',
    run: () => [
      { text: '', color: '' },
      { text: '  ██╗    ██╗██╗  ██╗ ██████╗  █████╗ ███╗   ███╗██╗', color: '#33FF00' },
      { text: '  ██║    ██║██║  ██║██╔═══██╗██╔══██╗████╗ ████║██║', color: '#33FF00' },
      { text: '  ██║ █╗ ██║███████║██║   ██║███████║██╔████╔██║██║', color: '#33FF00' },
      { text: '  ██║███╗██║██╔══██║██║   ██║██╔══██║██║╚██╔╝██║██║', color: '#33FF00' },
      { text: '  ╚███╔███╔╝██║  ██║╚██████╔╝██║  ██║██║ ╚═╝ ██║██║', color: '#33FF00' },
      { text: '   ╚══╝╚══╝ ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚═╝', color: '#33FF00' },
      { text: '', color: '' },
      { text: '  Name     : Portfolio Dev', color: '#fff' },
      { text: '  Role     : Full-Stack Developer & Creative Technologist', color: '#fff' },
      { text: '  Location : The Internet (probably your screen right now)', color: '#fff' },
      { text: '  Status   : Open to opportunities 🟢', color: '#33FF00' },
      { text: '', color: '' },
      { text: '  I build things that live at the intersection of', color: '#aaa' },
      { text: '  technical depth and pixel-perfect design.', color: '#aaa' },
      { text: '', color: '' },
      { text: '  First computer : Pentium III, Windows 98', color: '#888' },
      { text: '  Typing speed   : ~110 WPM (still misspells "definitely")', color: '#888' },
      { text: '  Debugging tool : Rubber duck 🦆', color: '#888' },
      { text: '', color: '' },
    ],
  },

  projects: {
    desc: 'List all projects',
    run: () => [
      { text: '', color: '' },
      { text: '  📁  MY PROJECTS', color: '#FFD700' },
      { text: '  ─────────────────────────────────────────────────────', color: '#444' },
      { text: '', color: '' },
      { text: '  [WEB]', color: '#4FC3F7' },
      { text: '   ├─ WinXP Portfolio      React • Vite • Zustand • Express • MongoDB', color: '#33FF00' },
      { text: '   ├─ Zero-G Atrium        Three.js • React Three Fiber • GSAP', color: '#33FF00' },
      { text: '   └─ AI Analytics HUD     Next.js • Recharts • Framer Motion', color: '#33FF00' },
      { text: '', color: '' },
      { text: '  [DATA]', color: '#81C784' },
      { text: '   ├─ Sales Pipeline ETL   Apache Spark • Airflow • PostgreSQL', color: '#33FF00' },
      { text: '   └─ Market Trend Viz     Pandas • Plotly • Streamlit', color: '#33FF00' },
      { text: '', color: '' },
      { text: '  [ML]', color: '#FFB74D' },
      { text: '   ├─ NLP Sentiment Engine PyTorch • HuggingFace • FastAPI • Redis', color: '#33FF00' },
      { text: '   └─ CV Object Detector   YOLOv8 • OpenCV • PostgreSQL', color: '#33FF00' },
      { text: '', color: '' },
      { text: '  Tip: Open the File Explorer for detailed project info.', color: '#888' },
      { text: '', color: '' },
    ],
  },

  skills: {
    desc: 'Tech skills breakdown',
    run: () => [
      { text: '', color: '' },
      { text: '  ⚡  TECH SKILLS', color: '#FFD700' },
      { text: '  ─────────────────────────────────────────────────────', color: '#444' },
      { text: '', color: '' },
      { text: '  FRONTEND', color: '#4FC3F7' },
      { text: '  React/Next.js   ████████████████████  100%', color: '#33FF00' },
      { text: '  TypeScript      ██████████████████░░   90%', color: '#33FF00' },
      { text: '  Three.js/WebGL  ████████████████░░░░   80%', color: '#33FF00' },
      { text: '  CSS/Animations  ████████████████████  100%', color: '#33FF00' },
      { text: '', color: '' },
      { text: '  BACKEND', color: '#81C784' },
      { text: '  Node/Express    ██████████████████░░   90%', color: '#33FF00' },
      { text: '  Python/FastAPI  ████████████████░░░░   80%', color: '#33FF00' },
      { text: '  MongoDB         ████████████████████  100%', color: '#33FF00' },
      { text: '  PostgreSQL      ██████████████░░░░░░   70%', color: '#33FF00' },
      { text: '', color: '' },
      { text: '  DATA & ML', color: '#FFB74D' },
      { text: '  PyTorch/HF      ████████████████░░░░   80%', color: '#33FF00' },
      { text: '  PySpark/Airflow ██████████████░░░░░░   70%', color: '#33FF00' },
      { text: '  OpenCV/YOLO     ██████████████░░░░░░   70%', color: '#33FF00' },
      { text: '', color: '' },
      { text: '  DEVOPS', color: '#CE93D8' },
      { text: '  Docker/K8s      ████████████████░░░░   80%', color: '#33FF00' },
      { text: '  CI/CD (GHA)     ██████████████████░░   90%', color: '#33FF00' },
      { text: '  AWS/Vercel      ████████████████████  100%', color: '#33FF00' },
      { text: '', color: '' },
    ],
  },

  contact: {
    desc: 'Contact information',
    run: () => [
      { text: '', color: '' },
      { text: '  📬  CONTACT INFO', color: '#FFD700' },
      { text: '  ─────────────────────────────────────────────────────', color: '#444' },
      { text: '', color: '' },
      { text: '  📧  Email    →  hello@portfolio.dev', color: '#33FF00' },
      { text: '  🐙  GitHub   →  github.com/portfolio-dev', color: '#33FF00' },
      { text: '  💼  LinkedIn →  linkedin.com/in/portfolio-dev', color: '#33FF00' },
      { text: '  🐦  Twitter  →  @portfoliodev', color: '#33FF00' },
      { text: '  🌐  Website  →  http://portfolio.winxp.local/', color: '#33FF00' },
      { text: '', color: '' },
      { text: '  ⏰  Timezone : IST (UTC+5:30)', color: '#888' },
      { text: '  📅  Response : Usually within 24 hours', color: '#888' },
      { text: '', color: '' },
    ],
  },

  ls: {
    desc: 'List workspace directories',
    run: () => [
      { text: '', color: '' },
      { text: ' Volume in drive C is PORTFOLIO', color: '#ccc' },
      { text: ' Directory of C:\\Users\\Portfolio\\Desktop', color: '#ccc' },
      { text: '', color: '' },
      { text: ' 25/03/2026  11:08 PM    <DIR>          .', color: '#33FF00' },
      { text: ' 25/03/2026  11:08 PM    <DIR>          ..', color: '#33FF00' },
      { text: ' 25/03/2026  11:08 PM    <DIR>          My Projects', color: '#4FC3F7' },
      { text: ' 25/03/2026  11:08 PM    <DIR>          About Me', color: '#4FC3F7' },
      { text: ' 25/03/2026  11:05 PM           2,847   about_me.txt', color: '#33FF00' },
      { text: ' 25/03/2026  11:00 PM           1,024   resume.pdf', color: '#FFB74D' },
      { text: ' 25/03/2026  10:55 PM             512   README.md', color: '#33FF00' },
      { text: '               3 File(s)          4,383 bytes', color: '#ccc' },
      { text: '               3 Dir(s)  420,690,000,000 bytes free', color: '#ccc' },
      { text: '', color: '' },
    ],
  },

  date: {
    desc: 'Show current date/time',
    run: () => {
      const now = new Date();
      return [
        { text: '', color: '' },
        { text: `  Current date : ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`, color: '#33FF00' },
        { text: `  Current time : ${now.toLocaleTimeString('en-US', { hour12: false })} IST`, color: '#33FF00' },
        { text: `  Unix epoch   : ${Math.floor(now.getTime() / 1000)}`, color: '#888' },
        { text: '', color: '' },
      ];
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Easter egg modal
// ─────────────────────────────────────────────────────────────────────────────
function EasterEggModal({ onClose }) {
  return (
    <div style={{
      position: 'absolute',
      inset: 0,
      background: 'rgba(0,0,0,0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 999,
      fontFamily: 'Courier New, monospace',
    }}>
      <div style={{
        background: '#0C0C0C',
        border: '2px solid #33FF00',
        boxShadow: '0 0 40px rgba(51,255,0,0.4)',
        padding: '28px 36px',
        maxWidth: 480,
        width: '90%',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
        <div style={{ color: '#FFD700', fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>
          ACCESS GRANTED: sudo privileges obtained
        </div>
        <div style={{ color: '#33FF00', fontSize: 13, marginBottom: 16, lineHeight: 1.8 }}>
          ERROR 200: Request to hire this developer has been<br />
          <span style={{ color: '#fff' }}>ACCEPTED</span> by the universe.<br /><br />
          <span style={{ color: '#aaa', fontSize: 11 }}>
            Please contact the administrator (that's me) to<br />
            complete the hiring process. Cookies provided on signing.<br />
            Remote work accepted. Rubber duck included.
          </span>
        </div>
        <pre style={{ color: '#33FF00', fontSize: 10, lineHeight: 1.4, marginBottom: 20, textAlign: 'left', display: 'inline-block' }}>
{`  ┌─────────────────────────────┐
  │  Status: READY TO SHIP CODE  │
  │  Coffee Level: ████████ 87%  │
  │  Bug Rate:     ░░░░░░░░  3%  │
  │  Enthusiasm:   ████████ 99%  │
  └─────────────────────────────┘`}
        </pre>
        <div>
          <button
            onClick={onClose}
            style={{
              background: '#33FF00',
              color: '#000',
              border: 'none',
              padding: '6px 24px',
              fontFamily: 'Courier New, monospace',
              fontSize: 12,
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            [ OK — I'LL CALL YOU ]
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Terminal line renderer
// ─────────────────────────────────────────────────────────────────────────────
function Line({ text, color, isCmd, prompt }) {
  return (
    <div style={{ display: 'flex', gap: 0, minHeight: '1.45em' }}>
      {isCmd && (
        <span style={{ color: '#33FF00', userSelect: 'none', flexShrink: 0 }}>
          {prompt}
        </span>
      )}
      <span style={{
        color: color || (isCmd ? '#fff' : '#33FF00'),
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
        flex: 1,
      }}>
        {text}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────
const PROMPT = 'C:\\Users\\Portfolio> ';

export default function Terminal() {
  const [lines, setLines]       = useState(BOOT_MSG);
  const [input, setInput]       = useState('');
  const [history, setHistory]   = useState([]);  // command history
  const [histIdx, setHistIdx]   = useState(-1);  // -1 = current
  const [cursorOn, setCursorOn] = useState(true);
  const [easterEgg, setEasterEgg] = useState(false);
  const [cwd, setCwd]           = useState('Desktop');

  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  // ── Blinking cursor ───────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), 530);
    return () => clearInterval(id);
  }, []);

  // ── Auto-scroll ───────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  // ── Focus input on click ──────────────────────────────
  const focusInput = () => inputRef.current?.focus();

  // ── Command processing ─────────────────────────────────
  const processCmd = useCallback((raw) => {
    const trimmed = raw.trim();
    const lower   = trimmed.toLowerCase();
    const parts   = lower.split(/\s+/);
    const base    = parts[0];

    // Always push the prompt line
    const promptLine = { text: trimmed, color: '#fff', isCmd: true };

    if (!trimmed) {
      setLines((l) => [...l, promptLine, { text: '', color: '' }]);
      return;
    }

    // ── Easter egg ───────────────────────────────────────
    if (lower === 'sudo hire me') {
      setLines((l) => [
        ...l,
        promptLine,
        { text: '', color: '' },
        { text: '  [sudo] password for recruiter: ••••••••', color: '#888' },
        { text: '  Granting elevated hiring privileges...', color: '#FFD700' },
        { text: '', color: '' },
      ]);
      setTimeout(() => setEasterEgg(true), 800);
      return;
    }

    // ── clear ────────────────────────────────────────────
    if (base === 'clear' || base === 'cls') {
      setLines([]);
      return;
    }

    // ── echo ─────────────────────────────────────────────
    if (base === 'echo') {
      const rest = trimmed.slice(5).trim();
      setLines((l) => [...l, promptLine, { text: `  ${rest || ''}`, color: '#fff' }, { text: '', color: '' }]);
      return;
    }

    // ── cd ───────────────────────────────────────────────
    if (base === 'cd') {
      const dir = parts[1] || '..';
      if (dir === '..' || dir === '~') {
        setCwd('Desktop');
        setLines((l) => [...l, promptLine, { text: '', color: '' }]);
      } else {
        setCwd(dir);
        setLines((l) => [
          ...l,
          promptLine,
          { text: `  Changed directory to: C:\\Users\\Portfolio\\${dir}`, color: '#aaa' },
          { text: '', color: '' },
        ]);
      }
      return;
    }

    // ── pwd ──────────────────────────────────────────────
    if (base === 'pwd') {
      setLines((l) => [
        ...l,
        promptLine,
        { text: `  C:\\Users\\Portfolio\\${cwd}`, color: '#33FF00' },
        { text: '', color: '' },
      ]);
      return;
    }

    // ── Known commands ───────────────────────────────────
    if (COMMANDS[base]) {
      const output = COMMANDS[base].run();
      setLines((l) => [...l, promptLine, ...output]);
      return;
    }

    // ── unknown ──────────────────────────────────────────
    setLines((l) => [
      ...l,
      promptLine,
      { text: `  '${trimmed}' is not recognized as an internal or external command.`, color: '#FF4444' },
      { text: '  Type "help" for a list of available commands.', color: '#888' },
      { text: '', color: '' },
    ]);
  }, [cwd]);

  // ── Key handling ──────────────────────────────────────
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const cmd = input;
      if (cmd.trim()) {
        setHistory((h) => [cmd, ...h].slice(0, 60));
      }
      setHistIdx(-1);
      setInput('');
      processCmd(cmd);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHistIdx((i) => {
        const nextIdx = Math.min(i + 1, history.length - 1);
        setInput(history[nextIdx] ?? '');
        return nextIdx;
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHistIdx((i) => {
        const nextIdx = Math.max(i - 1, -1);
        setInput(nextIdx === -1 ? '' : (history[nextIdx] ?? ''));
        return nextIdx;
      });
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto-complete
      const partial = input.toLowerCase();
      const match = Object.keys(COMMANDS).find((c) => c.startsWith(partial));
      if (match) setInput(match);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const currentPrompt = `C:\\Users\\Portfolio\\${cwd}> `;

  return (
    <div
      style={{
        background: '#0C0C0C',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '"Courier New", Courier, monospace',
        fontSize: 13,
        lineHeight: 1.45,
        cursor: 'text',
        position: 'relative',
      }}
      onClick={focusInput}
    >
      {/* Output area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 10px', paddingBottom: 0 }}>
        {lines.map((line, i) => (
          <Line
            key={i}
            text={line.text}
            color={line.color}
            isCmd={line.isCmd}
            prompt={currentPrompt}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '4px 10px 8px',
        flexShrink: 0,
        background: '#0C0C0C',
      }}>
        {/* Prompt */}
        <span style={{ color: '#33FF00', whiteSpace: 'nowrap', userSelect: 'none' }}>
          {currentPrompt}
        </span>

        {/* Typed text */}
        <span style={{ color: '#fff', whiteSpace: 'pre' }}>{input}</span>

        {/* Blinking cursor */}
        <span style={{
          display: 'inline-block',
          width: 8,
          height: '1em',
          background: cursorOn ? '#33FF00' : 'transparent',
          verticalAlign: 'text-bottom',
          marginLeft: 1,
          transition: 'background 0.05s',
        }} />

        {/* Hidden real input */}
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => { setInput(e.target.value); setHistIdx(-1); }}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
          style={{
            position: 'absolute',
            opacity: 0,
            width: 1,
            height: 1,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Easter egg modal */}
      {easterEgg && <EasterEggModal onClose={() => setEasterEgg(false)} />}

      <style>{`
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </div>
  );
}
