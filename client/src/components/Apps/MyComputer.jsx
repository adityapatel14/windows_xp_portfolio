import React, { useState } from 'react';
import { useWindowStore } from '../../store/windowStore';

const PROJECT_FOLDERS = [
  {
    id: 'internship_research',
    name: 'internship_research',
    icon: '📁',
    desc: 'Power BI Dashboard · Student Internship Analysis',
    files: [
      { name: 'internship_dashboard', icon: '📈', desc: 'Interactive Power BI Dashboard' },
      { name: 'dataset.xlsx',         icon: '📊', desc: 'Merged student internship dataset (2,004 rows)' },
    ],
  },
  {
    id: 'fandango',
    name: 'fandango',
    icon: '📁',
    desc: 'Movie Rating Bias Study · Python + Data Analysis',
    files: [
      { name: 'fandango_dashboard', icon: '📈', desc: 'Rating Distribution Dashboard' },
      { name: 'dataset.xlsx',       icon: '📊', desc: 'fandango_scrape.csv (146 movies)' },
      { name: 'analysis.py',        icon: '🐍', desc: 'Python analysis script' },
    ],
  },
  {
    id: 'supermart_project',
    name: 'supermart_project',
    icon: '📁',
    desc: 'SQL + Power BI Sales Dashboard · 9,994 rows',
    files: [
      { name: 'SUPERMART dashboard', icon: '📈', desc: 'Sales Dashboard (Recharts)' },
      { name: 'dataset.xlsx',        icon: '📊', desc: 'Supermart sales dataset (9,994 rows)' },
      { name: 'queries.sql',         icon: '🗄️', desc: 'SQL analysis queries' },
    ],
  },
];

export default function MyComputer() {
  const { openWindow } = useWindowStore();
  const [openFolder, setOpenFolder] = useState(null);
  const [selected, setSelected]     = useState(null);

  const folder = openFolder ? PROJECT_FOLDERS.find((f) => f.id === openFolder) : null;

  const openInExplorer = (folderId) => {
    openWindow(`explorer-${folderId}-${Date.now()}`, {
      title: `File Explorer — ${folderId}`,
      data:  { startPath: folderId },
    });
  };

  const handleFolderDblClick = (folderId) => {
    setOpenFolder(folderId);
    setSelected(null);
  };

  const handleFileClick = (fileName) => {
    setSelected(fileName === selected ? null : fileName);
  };

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: 'Tahoma, sans-serif', background: '#fff' }}>
      {/* Sidebar */}
      <div style={{
        width: 160,
        background: '#ECE9D8',
        borderRight: '1px solid #ACA899',
        padding: 0,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          background: 'linear-gradient(180deg,#3A6BC8 0%,#245EDB 100%)',
          color: '#fff', fontWeight: 'bold',
          padding: '6px 10px', fontSize: 11,
        }}>
          System Tasks
        </div>
        <div style={{ padding: '8px 10px', flex: 1 }}>
          {['View system info', 'Add hardware', 'Uninstall program'].map((t) => (
            <div key={t} style={{ fontSize: 11, color: '#0054E3', marginBottom: 4, cursor: 'pointer' }}>
              ▶ {t}
            </div>
          ))}
          <div style={{ marginTop: 14, fontSize: 11, fontWeight: 'bold', color: '#0A246A', marginBottom: 6 }}>
            Other Places
          </div>
          <div style={{ fontSize: 11, color: '#0054E3', cursor: 'pointer', marginBottom: 3 }}>▶ My Documents</div>
          <div style={{ fontSize: 11, color: '#0054E3', cursor: 'pointer' }}>▶ My Network Places</div>
          {openFolder && (
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 'bold', color: '#0A246A', marginBottom: 6 }}>Quick Actions</div>
              <div
                onClick={() => openInExplorer(openFolder)}
                style={{ fontSize: 11, color: '#0054E3', cursor: 'pointer' }}
              >
                ▶ Open in Explorer
              </div>
            </div>
          )}
        </div>
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
          {openFolder && (
            <button
              className="xp-btn"
              onClick={() => openInExplorer(openFolder)}
              style={{ fontSize: 11, padding: '1px 8px', marginLeft: 'auto' }}
            >
              📁 Open in File Explorer
            </button>
          )}
        </div>

        {/* Content */}
        <div
          style={{ flex: 1, padding: 16, overflow: 'auto' }}
          onClick={() => setSelected(null)}
        >
          {!openFolder ? (
            <>
              {/* Section header */}
              <div style={{
                fontSize: 10, fontWeight: 'bold', color: '#0A246A',
                borderBottom: '1px solid #ACA899', marginBottom: 10, paddingBottom: 2,
              }}>
                DATA ANALYSIS PROJECTS
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignContent: 'flex-start' }}>
                {PROJECT_FOLDERS.map((f) => (
                  <button
                    key={f.id}
                    onDoubleClick={() => handleFolderDblClick(f.id)}
                    onClick={(e) => { e.stopPropagation(); setSelected(f.id); }}
                    title={f.desc}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                      background: selected === f.id ? '#316AC5' : 'none',
                      border: selected === f.id ? '1px dashed #7DA2D9' : '1px solid transparent',
                      padding: '8px 10px',
                      borderRadius: 2,
                      cursor: 'default',
                      width: 90,
                      color: selected === f.id ? '#fff' : '#000',
                      fontFamily: 'Tahoma, sans-serif',
                      fontSize: 11,
                      textAlign: 'center',
                      userSelect: 'none',
                    }}
                  >
                    <span style={{ fontSize: 36 }}>{f.icon}</span>
                    <span style={{ wordBreak: 'break-word', maxWidth: 80, lineHeight: 1.3 }}>{f.name}</span>
                  </button>
                ))}
              </div>
              {selected && (() => {
                const f = PROJECT_FOLDERS.find((x) => x.id === selected);
                return f ? (
                  <div style={{
                    marginTop: 16, padding: '8px 12px',
                    background: '#EFF3FF', border: '1px solid #4472C4',
                    fontSize: 10, color: '#333',
                  }}>
                    <b>{f.name}</b> — {f.desc}
                    <div style={{ marginTop: 4, color: '#555' }}>
                      Double-click to browse files, or use the Explorer button.
                    </div>
                  </div>
                ) : null;
              })()}
            </>
          ) : (
            <>
              <div style={{
                fontSize: 10, fontWeight: 'bold', color: '#0A246A',
                borderBottom: '1px solid #ACA899', marginBottom: 10, paddingBottom: 2,
              }}>
                {folder?.name.toUpperCase()} — {folder?.desc}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignContent: 'flex-start' }}>
                {folder?.files.map((file) => (
                  <button
                    key={file.name}
                    onClick={(e) => { e.stopPropagation(); handleFileClick(file.name); }}
                    title={file.desc}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 4,
                      background: selected === file.name ? '#316AC5' : 'none',
                      border: selected === file.name ? '1px dashed #7DA2D9' : '1px solid transparent',
                      padding: '8px 10px',
                      borderRadius: 2,
                      cursor: 'default',
                      width: 90,
                      color: selected === file.name ? '#fff' : '#000',
                      fontFamily: 'Tahoma, sans-serif',
                      fontSize: 11,
                      textAlign: 'center',
                      userSelect: 'none',
                    }}
                  >
                    <span style={{ fontSize: 32 }}>{file.icon}</span>
                    <span style={{ wordBreak: 'break-word', maxWidth: 80, lineHeight: 1.3 }}>{file.name}</span>
                  </button>
                ))}
              </div>
              <div style={{
                marginTop: 16, padding: '8px 12px',
                background: '#EFF3FF', border: '1px solid #4472C4',
                fontSize: 10, color: '#555',
              }}>
                💡 To open files, use <b>Open in File Explorer</b> above and double-click any item.
              </div>
            </>
          )}
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
            ? `${PROJECT_FOLDERS.length} project folder(s)`
            : `${folder?.files.length} item(s)`}
          {selected && ` — ${selected} selected`}
        </div>
      </div>
    </div>
  );
}
