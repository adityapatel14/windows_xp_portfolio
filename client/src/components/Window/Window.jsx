import React, { useRef, useMemo } from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import TitleBar from './TitleBar';
import { useWindowStore } from '../../store/windowStore';

// Map of appId -> component
import MyComputer from '../Apps/MyComputer';
import Notepad from '../Apps/Notepad';
import Terminal from '../Apps/Terminal';
import InternetExplorer from '../Apps/InternetExplorer';
import AboutMe from '../Apps/AboutMe';
import FileExplorer from '../Apps/FileExplorer';
import ProjectViewer from '../Apps/ProjectViewer';
import ExcelViewer from '../Apps/ExcelViewer';
import CodeViewer from '../Apps/CodeViewer';
import SupermartDashboard from '../Apps/SupermartDashboard';

const APP_COMPONENTS = {
  mycomputer: MyComputer,
  explorer:   FileExplorer,
  notepad:    Notepad,
  terminal:   Terminal,
  browser:    InternetExplorer,
  about:      AboutMe,
};

// Resolve app component — supports dynamic `project-<slug>`, `file-*` IDs
function resolveApp(appId, windowId) {
  if (appId.startsWith('project-'))              return (props) => <ProjectViewer {...props} windowId={windowId} />;
  if (appId.startsWith('file-excel'))            return ({ data }) => <ExcelViewer data={data} />;
  if (appId.startsWith('file-code'))             return ({ data }) => <CodeViewer data={data} />;
  if (appId.startsWith('file-dashboard-supermart')) return () => <SupermartDashboard />;
  return APP_COMPONENTS[appId] || (() => <div style={{ padding: 16, fontFamily: 'Tahoma' }}>Unknown App: {appId}</div>);
}

const TASKBAR_HEIGHT = 40;

export default function Window({ win, isActive }) {
  const { focusWindow, updatePosition, updateSize, maximizeWindow } = useWindowStore();

  // Memoize so the component reference is stable — prevents unmount/remount on every
  // store update (e.g. focusWindow), which would wipe filter state and block clicks.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const AppComponent = useMemo(() => resolveApp(win.appId, win.id), [win.appId, win.id]);

  // Compute maximized bounds
  const maxBounds = {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight - TASKBAR_HEIGHT,
  };

  const rndProps = win.isMaximized
    ? {
        position: { x: 0, y: 0 },
        size: { width: maxBounds.width, height: maxBounds.height },
        disableDragging: true,
        enableResizing: false,
      }
    : {
        position: { x: win.x, y: win.y },
        size: { width: win.width, height: win.height },
        disableDragging: false,
        enableResizing: {
          top: true, right: true, bottom: true, left: true,
          topRight: true, bottomRight: true, bottomLeft: true, topLeft: true,
        },
        minWidth: 280,
        minHeight: 180,
        bounds: 'parent',
      };

  return (
    <AnimatePresence>
      <motion.div
        key={win.id}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ duration: 0.12, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          zIndex: win.zIndex,
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <Rnd
          {...rndProps}
          style={{ zIndex: win.zIndex, pointerEvents: 'all' }}
          dragHandleClassName="xp-titlebar"
          onMouseDown={() => focusWindow(win.id)}
          onDragStop={(e, d) => updatePosition(win.id, d.x, d.y)}
          onResizeStop={(e, dir, ref, delta, pos) => {
            updateSize(win.id, parseInt(ref.style.width), parseInt(ref.style.height));
            updatePosition(win.id, pos.x, pos.y);
          }}
          resizeHandleStyles={{
            right: { cursor: 'e-resize', width: 6 },
            bottom: { cursor: 's-resize', height: 6 },
            bottomRight: { cursor: 'se-resize', width: 10, height: 10 },
          }}
        >
          <div
            className="xp-window"
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: win.isMaximized ? 0 : undefined,
              boxShadow: isActive
                ? '3px 3px 10px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(200,200,200,0.2)'
                : '2px 2px 6px rgba(0,0,0,0.3)',
              border: isActive ? '2px solid #0054E3' : '2px solid #7A96DF',
            }}
          >
            {/* Title bar — double-click toggles maximize */}
            <div onDoubleClick={() => maximizeWindow(win.id)}>
              <TitleBar win={win} isActive={isActive} />
            </div>

            {/* Menu bar padding strip */}
            <div style={{
              background: '#ECE9D8',
              borderBottom: '1px solid #ACA899',
              padding: '0 2px',
              minHeight: 4,
            }} />

            {/* App content */}
            <div style={{ flex: 1, overflow: 'hidden', position: 'relative', minHeight: 0 }}>
              <AppComponent windowId={win.id} data={win.data} />
            </div>

            {/* Status bar */}
            <div style={{
              background: '#ECE9D8',
              borderTop: '1px solid #ACA899',
              padding: '1px 4px',
              fontSize: 11,
              color: '#444',
              display: 'flex',
              gap: 8,
            }}>
              <div style={{ flex: 1, borderRight: '1px solid #ACA899', paddingRight: 4 }}>
                {win.title}
              </div>
              <div style={{ color: '#666' }}>
                {win.isMaximized ? 'Maximized' : `${win.width}×${win.height}`}
              </div>
            </div>
          </div>
        </Rnd>
      </motion.div>
    </AnimatePresence>
  );
}
