import React from 'react';
import { useWindowStore } from '../../store/windowStore';

export default function TitleBar({ win, isActive }) {
  const { closeWindow, minimizeWindow, maximizeWindow } = useWindowStore();

  return (
    <div
      className={`xp-titlebar flex items-center justify-between px-2 py-1 cursor-move select-none ${
        isActive ? 'xp-titlebar-active' : 'xp-titlebar-inactive'
      }`}
      style={{ minHeight: 28, borderRadius: '6px 6px 0 0' }}
    >
      {/* Left: icon + title */}
      <div className="flex items-center gap-1 overflow-hidden">
        <span style={{ fontSize: 14 }}>{win.icon}</span>
        <span
          style={{
            color: '#fff',
            fontFamily: 'Tahoma, sans-serif',
            fontSize: 12,
            fontWeight: 'bold',
            textShadow: '1px 1px 1px rgba(0,0,0,0.6)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: 200,
          }}
        >
          {win.title}
        </span>
      </div>

      {/* Right: control buttons */}
      <div className="flex items-center gap-[2px] ml-2 shrink-0">
        {/* Minimize */}
        <button
          className="title-btn min-btn"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}
          title="Minimize"
        >
          <svg width="8" height="8" viewBox="0 0 8 8">
            <rect y="6" width="8" height="2" fill="white" />
          </svg>
        </button>

        {/* Maximize */}
        <button
          className="title-btn max-btn"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); maximizeWindow(win.id); }}
          title={win.isMaximized ? 'Restore' : 'Maximize'}
        >
          {win.isMaximized ? (
            <svg width="9" height="9" viewBox="0 0 9 9">
              <rect x="2" y="0" width="7" height="7" fill="none" stroke="white" strokeWidth="1.5" />
              <rect x="0" y="2" width="7" height="7" fill="#4088D0" stroke="white" strokeWidth="1.5" />
            </svg>
          ) : (
            <svg width="9" height="9" viewBox="0 0 9 9">
              <rect x="0" y="0" width="9" height="9" fill="none" stroke="white" strokeWidth="2" />
              <rect x="0" y="0" width="9" height="2.5" fill="white" />
            </svg>
          )}
        </button>

        {/* Close */}
        <button
          className="title-btn close-btn"
          style={{ marginLeft: 2 }}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}
          title="Close"
        >
          <svg width="9" height="9" viewBox="0 0 9 9">
            <line x1="1" y1="1" x2="8" y2="8" stroke="white" strokeWidth="2" strokeLinecap="round" />
            <line x1="8" y1="1" x2="1" y2="8" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
