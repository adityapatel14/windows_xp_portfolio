import React, { useState, useEffect, useCallback } from 'react';
import { useWindowStore } from '../../store/windowStore';
import PROJECTS from "../../data/projects";
// ── Folder tree ──────────────────────────────────────────────────────────────
const TREE = {
  root: {
    icon: '🖥️',
    label: 'My Computer',
    children: ['myProjects', 'myDocuments', 'controlPanel'],
  },
  myProjects: {
    icon: '📁',
    label: 'My Projects',
    children: ['Web', 'Data', 'ML'],
    isFolder: true,
  },
  Web:  { icon: '📂', label: 'Web',  isCategory: true, category: 'Web'  },
  Data: { icon: '📂', label: 'Data', isCategory: true, category: 'Data' },
  ML:   { icon: '📂', label: 'ML',   isCategory: true, category: 'ML'   },
  myDocuments: { icon: '📁', label: 'My Documents', children: [], isFolder: true },
  controlPanel: { icon: '⚙️', label: 'Control Panel', children: [], isFolder: true },
};

const SIDEBAR_ITEMS = [
  { key: 'root',        icon: '🖥️', label: 'My Computer'    },
  { key: 'myProjects',  icon: '📁', label: 'My Projects'    },
  { key: 'Web',         icon: '📂', label: '  Web'          },
  { key: 'Data',        icon: '📂', label: '  Data'         },
  { key: 'ML',          icon: '📂', label: '  ML'           },
  { key: 'myDocuments', icon: '📁', label: 'My Documents'   },
];

// ── File icon by type ────────────────────────────────────────────────────────
function FolderItem({ item, selected, onSingleClick, onDoubleClick }) {
  const isSelected = selected === (item.slug || item.key);
  return (
    <button
      onClick={() => onSingleClick(item)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        background: isSelected ? '#316AC5' : 'transparent',
        border: '1px solid transparent',
        borderColor: isSelected ? '#7DA2D9' : 'transparent',
        padding: '8px 6px',
        borderRadius: 2,
        cursor: 'default',
        width: 82,
        color: isSelected ? '#fff' : '#000',
        fontFamily: 'Tahoma, sans-serif',
        fontSize: 11,
        textAlign: 'center',
        userSelect: 'none',
      }}
      title={item.label || item.title}
    >
      <span style={{ fontSize: 32, lineHeight: 1 }}>{item.icon}</span>
      <span style={{
        wordBreak: 'break-word',
        maxWidth: 76,
        lineHeight: 1.3,
        color: isSelected ? '#fff' : '#000',
      }}>
        {item.label || item.title}
      </span>
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function FileExplorer() {
  const { openWindow } = useWindowStore();

  // Navigation state
  const [path, setPath]             = useState(['root']); 
  const [selected, setSelected]     = useState(null);
  const [lastClick, setLastClick]   = useState({ id: null, time: 0 });

  // Data
  const [projects, setProjects]     = useState([]);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState(null);

  const currentKey = path[path.length - 1];
  const node = TREE[currentKey];

  // Fetch projects when at a category folder
  useEffect(() => {
  const n = TREE[currentKey];

  if (!n?.isCategory) {
    setProjects([]);
    return;
  }

  setLoading(false);
  setError(null);


  // Filter based on folder
  setProjects(
    PROJECTS.filter((p) => p.category === n.category)
  );

}, [currentKey]);

  // Build items for the main panel
  const getItems = () => {
    if (node?.isCategory) return projects;
    return (node?.children || []).map((key) => ({ ...TREE[key], key }));
  };

  const items = getItems();

  // Single / double click detection
  const handleClick = useCallback((item) => {
    const id = item.slug || item.key;
    const now = Date.now();
    if (lastClick.id === id && now - lastClick.time < 450) {
      handleDoubleClick(item);
      setLastClick({ id: null, time: 0 });
    } else {
      setSelected(id);
      setLastClick({ id, time: now });
    }
  }, [lastClick, path]); // eslint-disable-line

  const handleDoubleClick = (item) => {
    setSelected(null);

    if (item.slug) {
    openWindow(`project-${item.slug}`, {
     title: item.title,
     data: item
    });
    return;
  }

    // It's a folder node
    const key = item.key || item.id;
    if (TREE[key]) {
      setPath((p) => [...p, key]);
    }
  };

  const navigateTo = (index) => setPath((p) => p.slice(0, index + 1));
  const goBack = () => { if (path.length > 1) setPath((p) => p.slice(0, -1)); };

  // Breadcrumb
  const breadcrumb = path.map((key) => TREE[key]?.label || key);

  return (
    <div style={{ display: 'flex', height: '100%', fontFamily: 'Tahoma, sans-serif', fontSize: 11 }}>

      {/* ── Sidebar ───────────────────────────────── */}
      <div style={{
        width: 168,
        background: '#ECE9D8',
        borderRight: '1px solid #ACA899',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Sidebar header */}
        <div style={{
          background: 'linear-gradient(180deg, #3A6BC8 0%, #245EDB 100%)',
          color: '#fff',
          fontWeight: 'bold',
          padding: '6px 10px',
          fontSize: 11,
          letterSpacing: '0.03em',
        }}>
          Folders
        </div>

        {/* Tree navigation */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '4px 0' }}>
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = currentKey === item.key;
            return (
              <div
                key={item.key}
                onClick={() => setPath(() => {
                  // build correct path to this node
                  if (item.key === 'root') return ['root'];
                  if (['Web','Data','ML'].includes(item.key)) return ['root','myProjects',item.key];
                  return ['root', item.key];
                })}
                style={{
                  padding: '3px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  cursor: 'default',
                  background: isActive ? '#316AC5' : 'transparent',
                  color: isActive ? '#fff' : '#000',
                  whiteSpace: 'nowrap',
                }}
              >
                <span style={{ fontSize: 14 }}>{item.icon}</span>
                <span>{item.label}</span>
              </div>
            );
          })}
        </div>

        {/* Task panel */}
        <div style={{
          borderTop: '1px solid #ACA899',
          padding: '6px 10px',
          background: '#ECE9D8',
        }}>
          <div style={{ color: '#0A246A', fontWeight: 'bold', marginBottom: 4, fontSize: 10 }}>
            FILE AND FOLDER TASKS
          </div>
          <div style={{ color: '#0054E3', cursor: 'pointer', marginBottom: 2, fontSize: 11 }}>▶ Make a new folder</div>
          <div style={{ color: '#0054E3', cursor: 'pointer', fontSize: 11 }}>▶ Share this folder</div>
        </div>
      </div>

      {/* ── Right panel ──────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#fff' }}>

        {/* Toolbar */}
        <div style={{
          background: '#ECE9D8',
          borderBottom: '1px solid #ACA899',
          padding: '3px 6px',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
          flexShrink: 0,
        }}>
          <button
            className="xp-btn"
            onClick={goBack}
            disabled={path.length <= 1}
            style={{ fontSize: 11, opacity: path.length <= 1 ? 0.4 : 1 }}
          >
            ◀ Back
          </button>
          <div style={{
            flex: 1,
            background: '#fff',
            border: '2px inset #808080',
            padding: '1px 6px',
            fontSize: 11,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            minWidth: 0,
          }}>
            <span style={{ color: '#555' }}>📁</span>
            {breadcrumb.map((label, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span style={{ color: '#888' }}> › </span>}
                <span
                  onClick={() => navigateTo(i)}
                  style={{
                    cursor: 'default',
                    color: i === breadcrumb.length - 1 ? '#000' : '#0054E3',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {label}
                </span>
              </React.Fragment>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
            {['⊞', '≡', '☰', '⋮⋮'].map((icon, i) => (
              <button key={i} className="xp-btn" style={{ width: 22, fontSize: 12, padding: 0 }}>{icon}</button>
            ))}
          </div>
        </div>

        {/* Content area */}
        <div
          style={{ flex: 1, overflowY: 'auto', padding: 12 }}
          onClick={() => setSelected(null)}
        >
          {loading && (
            <div style={{ padding: 24, color: '#555', fontSize: 11 }}>
              <span>⏳ Loading projects...</span>
            </div>
          )}

          {error && (
            <div style={{
              margin: 12,
              padding: 12,
              background: '#FFF3CD',
              border: '1px solid #FFC107',
              fontSize: 11,
            }}>
              ⚠️ {error}
            </div>
          )}

          {!loading && !error && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, alignContent: 'flex-start' }}>
              {items.length === 0 ? (
                <div style={{ padding: 24, color: '#888', fontSize: 11 }}>
                  This folder is empty.
                </div>
              ) : (
                items.map((item) => (
                  <FolderItem
                    key={item.slug || item.key}
                    item={item}
                    selected={selected}
                    onSingleClick={handleClick}
                    onDoubleClick={handleDoubleClick}
                  />
                ))
              )}
            </div>
          )}
        </div>

        {/* Status bar */}
        <div style={{
          background: '#ECE9D8',
          borderTop: '1px solid #ACA899',
          padding: '1px 8px',
          fontSize: 10,
          color: '#555',
          display: 'flex',
          gap: 12,
          flexShrink: 0,
        }}>
          <div style={{ flex: 1, borderRight: '1px solid #ACA899', paddingRight: 8 }}>
            {items.length} object(s)
            {selected && <span> — {selected} selected</span>}
          </div>
          <div>
            {node?.isCategory
              ? `${node.label} folder`
              : node?.label || 'My Computer'}
          </div>
        </div>
      </div>
    </div>
  );
}
