import React, { useRef } from "react";
import { gsap } from "gsap";
import { isFinePointer, prefersReducedMotion } from "../lib/motion";

/**
 * Membungkus elemen agar tertarik mengikuti kursor (efek magnetik).
 * Hanya aktif di perangkat pointer presisi (desktop).
 */
const Magnetic = ({ children, strength = 0.35, className = "" }) => {
  const ref = useRef(null);

  const handleMove = (e) => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    gsap.to(el, {
      x: relX * strength,
      y: relY * strength,
      duration: 0.4,
      ease: "power3.out",
    });
  };

  const handleLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </div>
  );
};

export default Magnetic;
