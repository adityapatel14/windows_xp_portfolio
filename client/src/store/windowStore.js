import { create } from 'zustand';

const LS_KEY = 'winxp-windows';

const DEFAULT_WINDOWS = {
  mycomputer: { width: 640, height: 480, title: 'My Computer',       icon: '🖥️' },
  explorer:   { width: 760, height: 520, title: 'My Projects',        icon: '📁' },
  notepad:    { width: 520, height: 400, title: 'Notepad',            icon: '📝' },
  terminal:   { width: 600, height: 440, title: 'Command Prompt',     icon: '💻' },
  browser:    { width: 840, height: 580, title: 'Internet Explorer',  icon: '🌐' },
  about:      { width: 500, height: 420, title: 'About Me',           icon: '👤' },
};

/* ─── Sync load from localStorage ───────────────────────────────── */
function loadWindows() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map(w => ({
      ...w,
      x: Math.max(0, Math.min(w.x, window.innerWidth  - 120)),
      y: Math.max(0, Math.min(w.y, window.innerHeight - 80)),
    }));
  } catch {
    return [];
  }
}

function saveWindows(windows) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(windows));
  } catch {}
}

/* ─── Init nextZIndex ──────────────────────────────────────────── */
const _initial = loadWindows();
let nextZIndex = _initial.length > 0
  ? Math.max(10, ..._initial.map(w => w.zIndex || 10))
  : 10;

/* ─── Store ───────────────────────────────────────────────────── */
export const useWindowStore = create((set, get) => ({
  windows: _initial,

  // 🚀 FIXED FUNCTION
  openWindow: (appId, options = {}) => {
    const { windows } = get();

    const isProject = appId.startsWith('project-') || appId.startsWith('file-');
    const existing  = !isProject && windows.find(w => w.appId === appId);

    // 🔁 If already open (non-project), just focus it
    if (existing) {
      set(state => ({
        windows: state.windows.map(w =>
          w.id === existing.id
            ? { ...w, isMinimized: false, zIndex: ++nextZIndex }
            : w
        ),
      }));
      saveWindows(get().windows);
      return;
    }

    let defaults;

    if (isProject) {
      const slug = appId.replace('project-', '');
      const prettyTitle = slug
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());

      defaults = {
        width: 680,
        height: 520,
        title: prettyTitle,
        icon: '📄'
      };
    } else {
      defaults =
        DEFAULT_WINDOWS[appId] || {
          width: 600,
          height: 450,
          title: appId,
          icon: '📄'
        };
    }

    const count = windows.length;

    const newWindow = {
      id: `${appId}-${Date.now()}`,
      appId,
      title: options.title || defaults.title,
      icon: defaults.icon,

      // 🔥 CRITICAL FIX (THIS WAS MISSING)
      data: options.data || null,

      x: 80 + (count % 6) * 28,
      y: 50 + (count % 6) * 22,
      width: defaults.width,
      height: defaults.height,
      isMinimized: false,
      isMaximized: false,
      zIndex: ++nextZIndex,
    };

    set(state => ({
      windows: [...state.windows, newWindow],
    }));

    saveWindows(get().windows);
  },

  closeWindow: (id) => {
    set(state => ({
      windows: state.windows.filter(w => w.id !== id),
    }));
    saveWindows(get().windows);
  },

  minimizeWindow: (id) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
    }));
    saveWindows(get().windows);
  },

  maximizeWindow: (id) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    }));
    saveWindows(get().windows);
  },

  focusWindow: (id) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, zIndex: ++nextZIndex } : w
      ),
    }));
    saveWindows(get().windows);
  },

  restoreWindow: (id) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id
          ? { ...w, isMinimized: false, zIndex: ++nextZIndex }
          : w
      ),
    }));
    saveWindows(get().windows);
  },

  updatePosition: (id, x, y) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, x, y } : w
      ),
    }));
    saveWindows(get().windows);
  },

  updateSize: (id, width, height) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, width, height } : w
      ),
    }));
    saveWindows(get().windows);
  },

  hydrateWindows: (windows) => {
    nextZIndex = Math.max(nextZIndex, ...windows.map(w => w.zIndex || 10));
    set({ windows });
    saveWindows(windows);
  },

  clearPersistedWindows: () => {
    localStorage.removeItem(LS_KEY);
    set({ windows: [] });
  },
}));