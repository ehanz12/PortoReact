import React, { useRef, useEffect, useState } from "react";
import { scrollToTarget } from "../lib/lenis";

const RADIUS = 22;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SHOW_AFTER = 600;

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const circleRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const scrollY = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(scrollY / max, 1) : 0;

      setVisible(scrollY > SHOW_AFTER);

      if (circleRef.current) {
        circleRef.current.style.strokeDashoffset =
          CIRCUMFERENCE * (1 - progress);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => scrollToTarget(0)}
      aria-label="Kembali ke atas"
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-center justify-center transition-all duration-500 hover:border-white/40 group ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
    >
      {/* Progress ring */}
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 56 56">
        <circle
          cx="28"
          cy="28"
          r={RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="2"
        />
        <circle
          ref={circleRef}
          cx="28"
          cy="28"
          r={RADIUS}
          fill="none"
          stroke="url(#btt-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
          className="transition-[stroke-dashoffset] duration-150"
        />
        <defs>
          <linearGradient id="btt-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF4D6D" />
            <stop offset="50%" stopColor="#7B2FF7" />
            <stop offset="100%" stopColor="#2F86F7" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        className="w-5 h-5 text-white relative transition-transform duration-300 group-hover:-translate-y-0.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
};

export default BackToTop;
