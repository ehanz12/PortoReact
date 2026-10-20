import React, { useRef, useEffect } from "react";
import { prefersReducedMotion } from "../lib/motion";

const CHARS = "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789ABCDEF";
const FONT_SIZE = 16;
const FPS_DESKTOP = 20;
const FPS_MOBILE = 12;

/* Matrix ringan: tanpa shadowBlur, font di-cache, DPR cap, pause off-screen */
const MatrixRain = ({ opacity = 0.07, className = "" }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    let w = 0;
    let h = 0;
    let columns = 0;
    let drops = [];
    let rafId = null;
    let lastFrame = 0;
    let running = true;
    const isMobile = window.innerWidth < 768;
    const FPS = isMobile ? FPS_MOBILE : FPS_DESKTOP;
    const FRAME_MS = 1000 / FPS;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const FONT = `${FONT_SIZE}px "JetBrains Mono", ui-monospace, monospace`;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.floor(w / FONT_SIZE);
      drops = Array.from({ length: columns }, () => Math.random() * -100);
      ctx.fillStyle = "#0a0a0a";
      ctx.fillRect(0, 0, w, h);
    };

    let rzT = null;
    const onResize = () => {
      clearTimeout(rzT);
      rzT = setTimeout(resize, 250);
    };

    const draw = (now) => {
      if (!running) return;
      rafId = requestAnimationFrame(draw);
      if (now - lastFrame < FRAME_MS) return;
      lastFrame = now;
      if (document.hidden) return;

      ctx.fillStyle = "rgba(10, 10, 10, 0.08)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = FONT;

      for (let i = 0; i < columns; i++) {
        const char = CHARS[(Math.random() * CHARS.length) | 0];
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;

        // Tanpa shadowBlur (hemat GPU). Head glyph lebih terang saja.
        ctx.fillStyle =
          Math.random() > 0.85
            ? "#E8D5A8"
            : `rgba(212, 168, 83, ${(0.55 + Math.random() * 0.3).toFixed(2)})`;

        ctx.fillText(char, x, y);

        if (y > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.5 + Math.random() * 0.5;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          running = true;
          if (!rafId) rafId = requestAnimationFrame(draw);
        } else {
          running = false;
          if (rafId) cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      { threshold: 0 }
    );

    resize();
    observer.observe(canvas);
    rafId = requestAnimationFrame(draw);
    window.addEventListener("resize", onResize);

    return () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(rzT);
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-0 pointer-events-none ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
};

export default MatrixRain;
