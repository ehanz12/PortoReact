import React, { useRef } from "react";
import { gsap } from "gsap";
import { isFinePointer, prefersReducedMotion } from "../lib/motion";

/**
 * Membungkus elemen agar tertarik mengikuti kursor (efek magnetik).
 * Hanya aktif di perangkat pointer presisi (desktop).
 */
const Magnetic = ({ children, strength = 0.35, className = "" }) => {
  const ref = useRef(null);
  const settersRef = useRef(null);

  const ensureSetters = (el) => {
    if (!settersRef.current) {
      settersRef.current = {
        x: gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" }),
        y: gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" }),
      };
    }
    return settersRef.current;
  };

  const handleMove = (e) => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    const { x, y } = ensureSetters(el);
    x(relX * strength);
    y(relY * strength);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    if (settersRef.current) {
      settersRef.current.x(0);
      settersRef.current.y(0);
    } else {
      gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
    }
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </div>
  );
};

export default Magnetic;
