import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { useLocation } from "react-router-dom";

/**
 * Overlay transisi antar route:
 * wipe menutupi layar → konten baru sudah swap → wipe membuka.
 */
const PageTransition = () => {
  const overlayRef = useRef(null);
  const firstRender = useRef(true);
  const { pathname } = useLocation();

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const el = overlayRef.current;
    if (!el) return;

    const tl = gsap.timeline();
    tl.set(el, { display: "block", yPercent: 100 })
      .to(el, { yPercent: 0, duration: 0.45, ease: "power3.inOut" })
      .to(el, { yPercent: -100, duration: 0.55, ease: "power3.inOut", delay: 0.15 })
      .set(el, { display: "none" });

    return () => {
      tl.kill();
    };
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[90] bg-black hidden pointer-events-none"
      style={{ transform: "translateY(100%)" }}
      aria-hidden="true"
    >
      <p className="absolute bottom-8 right-8 font-heading font-bold text-white/10 text-[10vw] leading-none select-none">
        RH
      </p>
    </div>
  );
};

export default PageTransition;
