import React, { useState } from 'react';

const FOLDERS = [
  {
    id: 'projects',
    name: 'Projects',
    icon: '📁',
    files: [
      { name: 'Zero-G Atrium',    icon: '🚀', desc: 'React Three Fiber interactive portfolio' },
      { name: 'WinXP Portfolio',  icon: '🖥️', desc: 'This very app — full-stack XP experience' },
      { name: 'AI Dashboard',     icon: '📊', desc: 'Analytics HUD with Recharts & Three.js' },
    ],
  },
  {
    id: 'skills',
    name: 'Skills & Tools',
    icon: '📁',
    files: [
      { name: 'React.exe',        icon: '⚛️',  desc: 'v18 — Component architecture master' },
      { name: 'Node.js.exe',      icon: '🟢', desc: 'v20 — Server-side JavaScript runtime' },
      { name: 'MongoDB.exe',      icon: '🍃', desc: 'NoSQL document database' },
      { name: 'TypeScript.exe',   icon: '🔷', desc: 'Typed superset of JavaScript' },
      { name: 'Three.js.exe',     icon: '🎮', desc: '3D WebGL rendering library' },
    ],
  },
  {
    id: 'resume',
    name: 'Resume',
    icon: '📄',
    files: [
      { name: 'Resume_2026.pdf',  icon: '📋', desc: 'Download full CV' },
      { name: 'Cover_Letter.txt', icon: '✉️',  desc: 'General cover letter template' },
    ],
  },
];

export default function MyComputer() {
  const [openFolder, setOpenFolder] = useState(null);
  const [selected, setSelected] = useState(null);

  const folder = openFolder ? FOLDERS.find((f) => f.id === openFolder) : null;

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: 'Tahoma, sans-serif', background: '#fff' }}>
      {/* Sidebar */}
      <div style={{
        width: 160,
        background: '#ECE9D8',
        borderRight: '1px solid #ACA899',
        padding: 8,
        flexShrink: 0,
      }}>
        <div style={{ fontSize: 11, fontWeight: 'bold', color: '#0A246A', marginBottom: 8 }}>
          System Tasks
        </div>
        {['View system info', 'Add hardware', 'Uninstall program'].map((t) => (
          <div key={t} style={{ fontSize: 11, color: '#0054E3', marginBottom: 4, cursor: 'pointer' }}>
            ▶ {t}
          </div>
        ))}
        <div style={{ marginTop: 16, fontSize: 11, fontWeight: 'bold', color: '#0A246A', marginBottom: 8 }}>
          Other Places
        </div>
        <div style={{ fontSize: 11, color: '#0054E3', cursor: 'pointer' }}>▶ My Documents</div>
      </div>

      {/* Main area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Toolbar */}
        <div style={{
          background: '#ECE9D8',
          borderBottom: '1px solid #ACA899',
          padding: '3px 8px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 11,
        }}>
          {openFolder && (
            <button
              className="xp-btn"
              onClick={() => { setOpenFolder(null); setSelected(null); }}
              style={{ fontSize: 11, padding: '1px 8px' }}
            >
              ← Back
            </button>
          )}
          <span style={{ color: '#444' }}>
            My Computer{openFolder ? ` › ${folder?.name}` : ''}
          </span>
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: 16, display: 'flex', flexWrap: 'wrap', gap: 12, alignContent: 'flex-start' }}>
          {!openFolder
            ? FOLDERS.map((f) => (
                <button
                  key={f.id}
                  onDoubleClick={() => setOpenFolder(f.id)}
                  onClick={() => setSelected(f.id)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    background: selected === f.id ? '#316AC5' : 'none',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: 2,
                    cursor: 'default',
                    width: 80,
                    color: selected === f.id ? '#fff' : '#000',
                    fontFamily: 'Tahoma, sans-serif',
                    fontSize: 11,
                  }}
                >
                  <span style={{ fontSize: 36 }}>{f.icon}</span>
                  <span>{f.name}</span>
                </button>
              ))
            : folder?.files.map((file) => (
                <button
                  key={file.name}
                  onClick={() => setSelected(file.name)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                    background: selected === file.name ? '#316AC5' : 'none',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: 2,
                    cursor: 'default',
                    width: 90,
                    color: selected === file.name ? '#fff' : '#000',
                    fontFamily: 'Tahoma, sans-serif',
                    fontSize: 11,
                    textAlign: 'center',
                  }}
                  title={file.desc}
                >
                  <span style={{ fontSize: 32 }}>{file.icon}</span>
                  <span>{file.name}</span>
                </button>
              ))}
        </div>

        {/* Status bar */}
        <div style={{
          background: '#ECE9D8',
          borderTop: '1px solid #ACA899',
          padding: '1px 8px',
          fontSize: 10,
          color: '#555',
        }}>
          {!openFolder
            ? `${FOLDERS.length} object(s)`
            : `${folder?.files.length} item(s)`}
          {selected && ` — ${selected} selected`}
        </div>
      </div>
    </div>
  );
}
