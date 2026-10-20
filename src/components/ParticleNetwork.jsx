import React, { useRef, useEffect, useCallback } from "react";
import { prefersReducedMotion, isFinePointer } from "../lib/motion";

const PARTICLE_COUNT_DESKTOP = 30;
const PARTICLE_COUNT_MOBILE = 12;
const CONNECTION_DIST_SQ = 120 * 120;
const MOUSE_RADIUS_SQ = 140 * 140;

/* Canvas ringan: DPR cap, 30fps, pause off-screen/hidden, tanpa O(n²) sqrt */
const ParticleNetwork = ({ className = "" }) => {
  const canvasRef = useRef(null);

  const createParticles = useCallback((w, h) => {
    const count = w < 768 ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
    return Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      isGold: Math.random() > 0.4,
    }));
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    // Matikan total di touch device — hemat baterai
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    let w = 0;
    let h = 0;
    let particles = [];
    let rafId = null;
    let lastFrame = 0;
    let running = true;
    let time = 0;
    const finePointer = isFinePointer();
    const mouse = { x: -9999, y: -9999 };
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!particles.length) particles = createParticles(w, h);
    };

    let rzT = null;
    const onResize = () => {
      clearTimeout(rzT);
      rzT = setTimeout(resize, 200);
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const loop = (now) => {
      if (!running) return;
      rafId = requestAnimationFrame(loop);
      // ~30fps cap
      if (now - lastFrame < 33) return;
      lastFrame = now;
      if (document.hidden) return;
      time++;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (finePointer) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < MOUSE_RADIUS_SQ && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const f = (140 - dist) / 140;
            p.vx -= (dx / dist) * f * 0.2;
            p.vy -= (dy / dist) * f * 0.2;
          }
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.98;
        p.vy *= 0.98;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const pulse = 0.5 + Math.sin(time * 0.03 + i) * 0.3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.isGold
          ? `rgba(212, 168, 83, ${pulse.toFixed(2)})`
          : `rgba(192, 139, 92, ${(pulse * 0.7).toFixed(2)})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dSq = dx * dx + dy * dy;
          if (dSq < CONNECTION_DIST_SQ) {
            const a = (1 - Math.sqrt(dSq) / 120) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(212, 168, 83, ${a.toFixed(3)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!rafId) rafId = requestAnimationFrame(loop);
          running = true;
        } else {
          running = false;
          if (rafId) cancelAnimationFrame(rafId);
          rafId = null;
        }
      },
      { threshold: 0 }
    );

    const onVis = () => {
      if (!document.hidden && running && !rafId) rafId = requestAnimationFrame(loop);
    };

    resize();
    observer.observe(canvas);
    rafId = requestAnimationFrame(loop);

    if (finePointer) {
      window.addEventListener("mousemove", onMove, { passive: true });
      document.addEventListener("mouseleave", onLeave);
    }
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(rzT);
      observer.disconnect();
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [createParticles]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-[1] pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
};

export default ParticleNetwork;
