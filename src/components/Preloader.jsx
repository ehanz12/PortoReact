import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { signalAppReady } from "../lib/motion";

const Preloader = ({ onComplete }) => {
  const overlayRef = useRef(null);
  const counterRef = useRef(null);
  const barRef = useRef(null);
  const logoRef = useRef(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const fallback = setTimeout(() => {
      if (!done) {
        signalAppReady();
        onComplete?.();
      }
    }, 6000);
    return () => clearTimeout(fallback);
  }, [done, onComplete]);

  useGSAP(() => {
    const counter = { value: 0 };

    const tl = gsap.timeline({
      onComplete: () => {
        signalAppReady();
        onComplete?.();
      },
    });

    tl.from(logoRef.current, {
      yPercent: 120,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    })
      .to(
        counter,
        {
          value: 100,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = `${Math.round(counter.value)}`;
            }
          },
        },
        "-=0.3"
      )
      .to(barRef.current, { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, "<")
      .to(logoRef.current, {
        yPercent: -120,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
      })
      .to(".preloader-fade", {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
      })
      .to(
        overlayRef.current,
        {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          onStart: () => setDone(true),
        },
        "-=0.1"
      )
      .set(overlayRef.current, { display: "none" });
  }, { scope: overlayRef });

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center"
      aria-hidden={done}
    >
      <div className="overflow-hidden">
        <p
          ref={logoRef}
          className="font-heading font-bold text-5xl sm:text-7xl gradient-text"
        >
          RH
        </p>
      </div>

      <div className="preloader-fade mt-10 w-56 sm:w-72">
        <div className="flex justify-between items-end mb-3">
          <span className="text-xs text-white/40 uppercase tracking-widest">
            Memuat Portofolio
          </span>
          <span className="font-heading font-bold text-white text-lg leading-none">
            <span ref={counterRef}>0</span>
            <span className="text-white/40 text-sm">%</span>
          </span>
        </div>
        <div className="h-px bg-white/10 overflow-hidden">
          <div
            ref={barRef}
            className="h-full skill-bar-gradient origin-left scale-x-0"
          />
        </div>
      </div>
    </div>
  );
};

export default Preloader;
