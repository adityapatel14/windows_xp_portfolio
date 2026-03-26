import { create } from 'zustand';

export const useSystemStore = create((set) => ({
  phase: 'boot', // 'boot' | 'login' | 'desktop' | 'shutdown'
  setPhase: (phase) => set({ phase }),
}));
