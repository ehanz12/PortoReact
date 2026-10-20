import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { signalAppReady } from "../lib/motion";

const Preloader = ({ onComplete }) => {
  const overlayRef = useRef(null);
  const counterRef = useRef(null);
  const barRef = useRef(null);
  const logoRef = useRef(null);
  const fadeRef = useRef(null);
  const doneRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const [done, setDone] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    signalAppReady();
    onCompleteRef.current?.();
  };

  useEffect(() => {
    const fallback = setTimeout(() => {
      if (doneRef.current) return;
      doneRef.current = true;
      if (overlayRef.current) overlayRef.current.style.display = "none";
      signalAppReady();
      onCompleteRef.current?.();
    }, 2500);
    return () => clearTimeout(fallback);
  }, []);

  useGSAP(() => {
    const counter = { value: 0 };

    const tl = gsap.timeline({ onComplete: finish });

    tl.fromTo(
      logoRef.current,
      { yPercent: 120, opacity: 0 },
      { yPercent: 0, opacity: 1, duration: 0.3, ease: "power3.out" }
    )
      .to(
        counter,
        {
          value: 100,
          duration: 0.5,
          ease: "power2.inOut",
          onUpdate: () => {
            if (counterRef.current) {
              counterRef.current.textContent = `${Math.round(counter.value)}`;
            }
          },
        },
        "-=0.05"
      )
      .to(barRef.current, { scaleX: 1, duration: 0.5, ease: "power2.inOut" }, "<")
      .to(fadeRef.current, { opacity: 0, duration: 0.15, ease: "power2.in" }, "+=0.02")
      .to(
        logoRef.current,
        { yPercent: -120, opacity: 0, duration: 0.25, ease: "power2.in" },
        "<"
      )
      .to(
        overlayRef.current,
        {
          yPercent: -100,
          duration: 0.45,
          ease: "power4.inOut",
          onStart: () => setDone(true),
        },
        "-=0.08"
      )
      .set(overlayRef.current, { display: "none" });

    return () => tl.kill();
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

      <div ref={fadeRef} className="preloader-fade mt-10 w-56 sm:w-72">
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
