import React, { useRef, useCallback } from "react";
import { prefersReducedMotion } from "../lib/motion";

const TiltCard = ({ children, className = "", maxTilt = 10, scale = 1.02 }) => {
  const ref = useRef(null);
  const rafRef = useRef(0);
  const pendingRef = useRef(null);

  const applyTilt = useCallback(() => {
    rafRef.current = 0;
    const el = ref.current;
    const p = pendingRef.current;
    if (!el || !p) return;
    const rx = ((p.y - p.cy) / p.cy) * -maxTilt;
    const ry = ((p.x - p.cx) / p.cx) * maxTilt;
    el.style.transform = `perspective(800px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) scale3d(${scale},${scale},${scale})`;
  }, [maxTilt, scale]);

  const onMove = useCallback((e) => {
    if (prefersReducedMotion()) return;
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    pendingRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      cx: rect.width / 2 || 1,
      cy: rect.height / 2 || 1,
    };
    if (!rafRef.current) rafRef.current = requestAnimationFrame(applyTilt);
  }, [applyTilt]);

  const onLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    pendingRef.current = null;
    el.style.transform = "perspective(800px) rotateX(0) rotateY(0) scale3d(1,1,1)";
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
};

export default TiltCard;
