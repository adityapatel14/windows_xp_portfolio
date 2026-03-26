import { create } from 'zustand';
import { playPopupSound } from '../hooks/soundEngine';

const POPUP_POOL = [
  {
    type: 'error',
    title: 'Recruiter impressed.exe',
    message: 'Recruiter impressed.exe has stopped working.\n\nA fatal exception has occurred at 0x00HIRED.\n\nThis developer is too impressive to handle.',
    icon: 'error',
  },
  {
    type: 'warning',
    title: 'Skill Verification',
    message: 'Warning: Skill level too good to be true.\n\nWindows cannot verify authenticity.\nDo you want to hire anyway?\n\n[All signs point to YES]',
    icon: 'warning',
  },
  {
    type: 'warning',
    title: 'Security Alert',
    message: 'Warning: Highly hireable candidate detected.\n\nYour talent acquisition firewall has been\nbreached. Immediate action recommended.',
    icon: 'shield',
  },
  {
    type: 'error',
    title: 'Resume.exe - Critical Error',
    message: 'FATAL: Resume quality overflow.\n\nBuffer exceeded maximum capacity.\nToo many skills to display.\n\nPlease hire immediately to resolve.',
    icon: 'error',
  },
  {
    type: 'info',
    title: 'System Information',
    message: 'Cannot find excuse to not hire this developer.\n\nAll rejection reasons have been exhausted.\nSystem recommends: Schedule interview now.',
    icon: 'info',
  },
  {
    type: 'error',
    title: 'TalentOverflow Exception',
    message: 'An unhandled exception has occurred:\n\nTalentOverflowException: Projects.Count\nexceeds Integer.MaxValue\n\nStack trace: hire() → call() → now()',
    icon: 'error',
  },
  {
    type: 'warning',
    title: 'Portfolio Loaded',
    message: 'Alert: Portfolio loaded successfully.\n\nHigh voltage detected. Exposure to\nthis portfolio may cause spontaneous\nurge to offer employment.',
    icon: 'warning',
  },
  {
    type: 'error',
    title: 'ProjectManager - Error',
    message: 'Exception caught:\n\nTooManyCoolProjectsException\nat ProjectManager.render() line 42\n\nTerminating search for better candidates.',
    icon: 'error',
  },
  {
    type: 'info',
    title: 'Windows Update',
    message: 'Update available:\n\n"Hire this developer – v1.0.0"\n\nThis update is CRITICAL and cannot\nbe postponed. Install now?',
    icon: 'info',
  },
  {
    type: 'warning',
    title: 'Firewall Notification',
    message: 'Incoming connection blocked:\n\n"Other Candidates" is trying to compete\nwith this developer.\n\nBlock permanently? [Recommended: YES]',
    icon: 'shield',
  },
];

let nextId = 1;

export const usePopupStore = create((set, get) => ({
  popups: [],

  addPopup: (popup) => {
    const id = nextId++;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // Random position but keep dialog on screen (approx 420×200 dialog)
    const x = 80 + Math.random() * (vw - 500);
    const y = 80 + Math.random() * (vh - 280);
    set((state) => ({
      popups: [...state.popups, { ...popup, id, x, y }],
    }));
    // Play XP sound
    playPopupSound(popup.type);
  },

  dismissPopup: (id) =>
    set((state) => ({
      popups: state.popups.filter((p) => p.id !== id),
    })),

  triggerRandom: () => {
    const pool = POPUP_POOL;
    const pick = pool[Math.floor(Math.random() * pool.length)];
    get().addPopup(pick);
  },
}));

