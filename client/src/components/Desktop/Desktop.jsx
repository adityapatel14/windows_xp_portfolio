import React, { useState } from 'react';
import { useWindowStore } from '../../store/windowStore';

const DESKTOP_ICONS = [
  { id: 'mycomputer', label: 'My Computer',          emoji: '🖥️' },
  { id: 'explorer',   label: 'My Projects',           emoji: '📁' },
  { id: 'about',      label: 'About Me',              emoji: '👤' },
  { id: 'notepad',    label: 'Notepad',               emoji: '📝' },
  { id: 'terminal',   label: 'Command\nPrompt',       emoji: '💻' },
  { id: 'browser',    label: 'Internet\nExplorer',    emoji: '🌐' },
];

export default function Desktop() {
  const { openWindow } = useWindowStore();
  const [selected, setSelected] = useState(null);
  const [lastClick, setLastClick] = useState({ id: null, time: 0 });

  const handleIconClick = (e, iconId) => {
    e.stopPropagation();
    const now = Date.now();
    if (lastClick.id === iconId && now - lastClick.time < 400) {
      // Double click
      openWindow(iconId);
      setSelected(null);
      setLastClick({ id: null, time: 0 });
    } else {
      setSelected(iconId);
      setLastClick({ id: iconId, time: now });
    }
  };

  return (
    <div
      onClick={() => setSelected(null)}
      style={{
        width: '100vw',
        height: 'calc(100vh - 40px)',
        backgroundImage: 'url(/wallpaper.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Icon grid — left column */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}
      >
        {DESKTOP_ICONS.map((icon) => (
          <div
            key={icon.id}
            className={`desktop-icon ${selected === icon.id ? 'selected' : ''}`}
            onClick={(e) => handleIconClick(e, icon.id)}
          >
            <span style={{ fontSize: 40, lineHeight: 1 }}>{icon.emoji}</span>
            <span style={{ whiteSpace: 'pre-line', textAlign: 'center' }}>{icon.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
