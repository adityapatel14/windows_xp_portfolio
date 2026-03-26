/**
 * soundEngine.js
 *
 * Singleton Web Audio API sound engine for the WinXP portfolio.
 * All sounds are synthesized — no asset files required.
 *
 * Volume policy:
 *   - Startup: 0.22 (heard once per session)
 *   - Click:   0.08 (very subtle, per-button)
 *   - Error:   0.20 (noticeable but not jarring)
 *   - Warning: 0.18
 *   - Info:    0.15
 *
 * AudioContext is created lazily on first sound call (user gesture
 * required by browser autoplay policy).
 */

let _ctx = null;
let _unlocked = false;

function getCtx() {
  if (!_ctx) {
    try {
      _ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch {
      return null;
    }
  }
  // Resume if suspended (Chrome autoplay policy)
  if (_ctx.state === 'suspended') {
    _ctx.resume().catch(() => {});
  }
  return _ctx;
}

/** Call this on the first user interaction to pre-warm the context. */
export function unlockAudio() {
  if (_unlocked) return;
  const ctx = getCtx();
  if (!ctx) return;
  // Play a silent buffer to unlock audio on iOS/Chrome
  const buf = ctx.createBuffer(1, 1, 22050);
  const src = ctx.createBufferSource();
  src.buffer = buf;
  src.connect(ctx.destination);
  src.start(0);
  _unlocked = true;
}

/* ─── Low-level helpers ────────────────────────────────────────────── */

function playTone(ctx, { freq, type = 'sine', start = 0, duration, gain: peakGain }) {
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.type = type;
  osc.frequency.setValueAtTime(freq, ctx.currentTime + start);

  // Fade in fast, then exponential release
  gain.gain.setValueAtTime(0.0001, ctx.currentTime + start);
  gain.gain.linearRampToValueAtTime(peakGain, ctx.currentTime + start + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration);

  osc.start(ctx.currentTime + start);
  osc.stop(ctx.currentTime + start + duration + 0.02);
}

/* ─── Sound definitions ────────────────────────────────────────────── */

/**
 * Startup: warm ascending chord (E4 → G#4 → B4 → E5).
 * Mimics the classic Windows XP startup jingle vibe, kept short (~1.2s).
 */
export function playStartup() {
  const ctx = getCtx();
  if (!ctx) return;

  const notes = [
    { freq: 329.63, start: 0.00, duration: 0.55, gain: 0.22 }, // E4
    { freq: 415.30, start: 0.18, duration: 0.55, gain: 0.20 }, // G#4
    { freq: 493.88, start: 0.36, duration: 0.65, gain: 0.18 }, // B4
    { freq: 659.25, start: 0.55, duration: 0.90, gain: 0.22 }, // E5
  ];

  notes.forEach(n => playTone(ctx, { ...n, type: 'sine' }));

  // Add a soft triangle undertone for warmth
  playTone(ctx, { freq: 164.81, start: 0.0, duration: 1.1, gain: 0.06, type: 'triangle' });
}

/**
 * Shutdown: descending chord (E5 → B4 → G#4 → E3) — startup reversed.
 * Gentle and melancholic, ~1.4s.
 */
export function playShutdown() {
  const ctx = getCtx();
  if (!ctx) return;

  const notes = [
    { freq: 659.25, start: 0.00, duration: 0.55, gain: 0.18 }, // E5
    { freq: 493.88, start: 0.20, duration: 0.55, gain: 0.18 }, // B4
    { freq: 415.30, start: 0.42, duration: 0.60, gain: 0.17 }, // G#4
    { freq: 164.81, start: 0.65, duration: 0.85, gain: 0.16 }, // E3
  ];

  notes.forEach(n => playTone(ctx, { ...n, type: 'sine' }));
  playTone(ctx, { freq: 246.94, start: 0.0, duration: 1.2, gain: 0.05, type: 'triangle' });
}

/**
 * Click: a very short, soft, high-frequency tick.
 * Subtle enough to not be annoying on rapid clicking.
 */
export function playClick() {
  const ctx = getCtx();
  if (!ctx) return;

  // White-noise burst via buffer for a realistic "click"
  try {
    const bufSize  = ctx.sampleRate * 0.025; // 25ms
    const buf      = ctx.createBuffer(1, bufSize, ctx.sampleRate);
    const data     = buf.getChannelData(0);
    for (let i = 0; i < bufSize; i++) data[i] = (Math.random() * 2 - 1);

    const src  = ctx.createBufferSource();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    src.buffer = buf;
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    filter.type            = 'highpass';
    filter.frequency.value = 2000;

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.025);

    src.start(ctx.currentTime);
    src.stop(ctx.currentTime + 0.03);
  } catch {
    // Fallback: simple short beep
    playTone(ctx, { freq: 1200, start: 0, duration: 0.018, gain: 0.06, type: 'square' });
  }
}

/**
 * Error/Warning/Info popup sounds.
 * Each maps to an XP-style two-note chime pattern.
 */
export function playPopupSound(type = 'info') {
  const ctx = getCtx();
  if (!ctx) return;

  const presets = {
    error: [
      { freq: 698,  start: 0.00, duration: 0.14, gain: 0.20, type: 'sine' },
      { freq: 440,  start: 0.15, duration: 0.22, gain: 0.20, type: 'sine' },
    ],
    warning: [
      { freq: 587,  start: 0.00, duration: 0.12, gain: 0.18, type: 'sine' },
      { freq: 784,  start: 0.13, duration: 0.16, gain: 0.18, type: 'sine' },
    ],
    info: [
      { freq: 880,  start: 0.00, duration: 0.16, gain: 0.15, type: 'sine' },
    ],
    shield: [
      { freq: 660,  start: 0.00, duration: 0.10, gain: 0.17, type: 'sine' },
      { freq: 880,  start: 0.11, duration: 0.14, gain: 0.17, type: 'sine' },
    ],
  };

  const notes = presets[type] || presets.info;
  notes.forEach(n => playTone(ctx, n));
}
