import React from 'react';
import { useWindowStore } from '../../store/windowStore';

export default function TaskbarItem({ win }) {
  const { focusWindow, restoreWindow, minimizeWindow, windows } = useWindowStore();

  // topmost window
  const focusedId = windows.reduce(
    (max, w) => (!max || w.zIndex > windows.find((x) => x.id === max)?.zIndex) ? w.id : max,
    null
  );
  const isActive = win.id === focusedId && !win.isMinimized;

  const handleClick = () => {
    if (win.isMinimized) {
      restoreWindow(win.id);
    } else if (isActive) {
      minimizeWindow(win.id);
    } else {
      focusWindow(win.id);
    }
  };

  return (
    <button
      className={`taskbar-item ${isActive ? 'active' : ''}`}
      onClick={handleClick}
      title={win.title}
      style={{ height: 30 }}
    >
      <span style={{ fontSize: 14, flexShrink: 0 }}>{win.icon}</span>
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {win.title}
      </span>
    </button>
  );
}
