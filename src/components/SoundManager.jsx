let audioCtx = null;
let muted = false;
let userGestureFired = false;

if (typeof window !== "undefined") {
  const unlock = () => {
    userGestureFired = true;
    if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
    window.removeEventListener("pointerdown", unlock);
    window.removeEventListener("keydown", unlock);
  };
  window.addEventListener("pointerdown", unlock, { once: true });
  window.addEventListener("keydown", unlock, { once: true });
}

const getCtx = () => {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (userGestureFired && audioCtx.state === "suspended") audioCtx.resume();
  return audioCtx;
};

const playTone = (freq, duration = 0.05, vol = 0.03, type = "square") => {
  if (muted || !userGestureFired) return;
  try {
    const ctx = getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch { /* audio not supported */ }
};

export const SoundManager = {
  type: () => playTone(600 + Math.random() * 600, 0.04, 0.02, "square"),
  command: () => playTone(880, 0.1, 0.03, "sine"),
  error: () => {
    playTone(200, 0.15, 0.04, "sawtooth");
    setTimeout(() => playTone(150, 0.2, 0.03, "sawtooth"), 150);
  },
  success: () => {
    playTone(523, 0.1, 0.03, "sine");
    setTimeout(() => playTone(659, 0.1, 0.03, "sine"), 100);
    setTimeout(() => playTone(784, 0.15, 0.03, "sine"), 200);
  },
  hover: () => playTone(1200, 0.03, 0.01, "sine"),
  boot: (step) => playTone(300 + step * 100, 0.08, 0.02, "sine"),
  toggle: () => playTone(1000, 0.06, 0.02, "triangle"),
  setMuted: (v) => { muted = v; },
  isMuted: () => muted,
  init: () => { getCtx(); },
};
