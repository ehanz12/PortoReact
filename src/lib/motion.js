let _reducedMotion = null;
let _finePointer = null;

export const prefersReducedMotion = () => {
  if (_reducedMotion !== null) return _reducedMotion;
  _reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return _reducedMotion;
};

export const isFinePointer = () => {
  if (_finePointer !== null) return _finePointer;
  _finePointer =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    window.innerWidth >= 1024;
  return _finePointer;
};

/* Reset cache saat resize lintas breakpoint (jarang terjadi) */
if (typeof window !== "undefined") {
  let _rzT = null;
  window.addEventListener(
    "resize",
    () => {
      clearTimeout(_rzT);
      _rzT = setTimeout(() => {
        _finePointer = null;
      }, 500);
    },
    { passive: true }
  );
}

const READY_EVENT = "app:ready";

export const signalAppReady = () => {
  if (window.__APP_READY__) return;
  window.__APP_READY__ = true;

  /*
   * Dispatch di luar call-stack GSAP context.
   * Preloader memanggil ini dari dalam timeline onComplete; jika event
   * dikirim sinkron, animasi baru (count-up, navbar) ikut terdaftar di
   * context Preloader dan ikut di-revert saat Preloader unmount.
   */
  const dispatch = () => window.dispatchEvent(new Event(READY_EVENT));
  if (typeof queueMicrotask === "function") queueMicrotask(dispatch);
  else setTimeout(dispatch, 0);
};

export const onAppReady = (cb) => {
  if (window.__APP_READY__) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener(READY_EVENT, handler, { once: true });
  return () => window.removeEventListener(READY_EVENT, handler);
};

/* Deterministic PRNG (mulberry32) — heatmap konsisten antar render */
export const seededRandom = (seed) => {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};
