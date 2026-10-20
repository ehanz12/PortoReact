import React, { useState, useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { SoundManager } from "../components/SoundManager";
import profilePhoto from "../assets/images/foto1.webp";

const BOOT_LINES = [
  { text: "[OK] Initializing secure system...", delay: 0 },
  { text: "[OK] Loading kernel modules...", delay: 300 },
  { text: "[OK] Establishing encrypted tunnel...", delay: 600 },
  { text: "[OK] Authenticating identity...", delay: 900 },
  { text: "[OK] Loading portfolio data...", delay: 1200 },
  { text: "[OK] System ready.", delay: 1500 },
];

const WHOAMI_LINES = [
  { text: "> whoami", delay: 2200 },
  { text: "REIHAN ADITYA PUTRA", delay: 2600 },
  { text: "> cat /etc/role", delay: 3000 },
  { text: "Fullstack Developer", delay: 3300 },
];

const BootSequence = () => {
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const timeoutsRef = useRef([]);
  const hasAnimatedRef = useRef(false);

  const [lines, setLines] = useState([]);
  const [bootDone, setBootDone] = useState(false);
  const bootSkipped = typeof window !== "undefined" && !!sessionStorage.getItem("boot-skipped");
  const [showContent, setShowContent] = useState(bootSkipped);

  const runBoot = useCallback(() => {
    const allLines = [...BOOT_LINES, ...WHOAMI_LINES];
    allLines.forEach((line) => {
      const t = setTimeout(() => {
        setLines((prev) => [...prev, line.text]);
        SoundManager.boot(line.delay / 300);
      }, line.delay);
      timeoutsRef.current.push(t);
    });

    const t = setTimeout(() => {
      setBootDone(true);
      SoundManager.success();
    }, 4000);
    timeoutsRef.current.push(t);
  }, []);

  useEffect(() => {
    if (bootSkipped) return;
    runBoot();
    const currentTimeouts = timeoutsRef.current;
    return () => currentTimeouts.forEach(clearTimeout);
  }, [runBoot, bootSkipped]);

  useEffect(() => {
    if (!bootDone || bootSkipped) return;

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem("boot-skipped", "1");
        setShowContent(true);
      },
    });

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 0.8,
      ease: "power2.in",
    })
      .set(containerRef.current, { display: "none" });

    return () => tl.kill();
  }, [bootDone, bootSkipped]);

  useEffect(() => {
    if (!showContent || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    if (heroRef.current) {
      gsap.from(heroRef.current.children, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      });
    }
  }, [showContent]);

  const skipBoot = () => {
    timeoutsRef.current.forEach(clearTimeout);
    sessionStorage.setItem("boot-skipped", "1");
    if (containerRef.current) {
      gsap.set(containerRef.current, { display: "none" });
    }
    setShowContent(true);
  };

  if (!showContent) {
    return (
      <div
        ref={containerRef}
        className="fixed inset-0 z-[70] bg-void flex items-center justify-center p-6"
      >
        <div className="terminal-bg rounded-lg w-full max-w-2xl overflow-hidden">
          <div className="terminal-header">
            <div className="terminal-dot terminal-dot-red" />
            <div className="terminal-dot terminal-dot-yellow" />
            <div className="terminal-dot terminal-dot-green" />
            <span className="ml-3 text-xs font-mono text-muted">root@reihan:~</span>
          </div>
          <div className="p-6 min-h-[300px] font-mono text-sm">
            {lines.map((line, i) => (
              <div key={i} className={`mb-1 ${line.startsWith("[OK]") ? "text-accent" : line.startsWith(">") ? "text-accent-copper" : "text-white"}`}>
                {line}
              </div>
            ))}
            {!bootDone && <span className="terminal-cursor" />}
          </div>
        </div>

        <button
          onClick={skipBoot}
          className="absolute bottom-8 right-8 font-mono text-xs text-muted hover:text-accent transition-colors border border-accent/8 px-4 py-2 rounded hover:border-accent/30"
        >
          Skip ▸
        </button>
      </div>
    );
  }

  return (
    <section className="relative min-h-dvh flex items-center overflow-hidden">
      <div className="cyber-container relative z-10 py-24 lg:py-0">
        <div ref={heroRef} className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs text-accent/80 tracking-wider">AVAILABLE FOR WORK</span>
            </div>

            <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-7xl text-white leading-tight mb-4">
              Reihan Aditya
              <br />
              <span className="gradient-text-cyber">Putra</span>
            </h1>

            <div className="mb-8">
              <p className="font-mono text-accent-copper text-lg lg:text-xl">
                <span className="text-muted">$</span> cat role.txt
              </p>
              <p className="font-heading text-xl lg:text-2xl text-white mt-2">Fullstack Developer</p>
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
              <span className="cyber-badge">5+ Projects</span>
              <span className="cyber-badge-cyan">10+ Certificates</span>
              <span className="cyber-badge">2+ Years</span>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="#about"
                className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm text-void bg-accent rounded hover:bg-accent-copper hover:shadow-[0_0_25px_rgba(192,139,92,0.3)] transition-all"
              >
                Explore Mission
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
              <a
                href="mailto:rhanssap@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 font-mono text-sm text-accent border border-accent/30 rounded hover:bg-accent/10 hover:shadow-[0_0_15px_rgba(212,168,83,0.15)] transition-all"
              >
                Contact
              </a>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-72 h-72 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-2xl overflow-hidden border border-accent/8">
                <img
                  src={profilePhoto}
                  alt="Reihan Aditya Putra"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                  width="384"
                  height="384"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
              </div>

              <div className="absolute -top-4 -left-4 bg-surface border border-accent/8 rounded-lg px-4 py-3 backdrop-blur">
                <p className="text-[10px] font-mono text-muted">SPECIALIZATION</p>
                <p className="text-sm font-mono text-accent font-bold">Fullstack Dev</p>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-surface border border-accent/8 rounded-lg px-4 py-3 backdrop-blur">
                <p className="text-[10px] font-mono text-muted">STACK</p>
                <p className="text-sm font-mono text-accent-copper font-bold">Go · JS · PHP</p>
              </div>

              <div className="absolute top-1/2 -right-6 bg-surface/80 border border-accent/20 rounded-lg px-3 py-2 backdrop-blur hidden lg:flex flex-col items-center gap-1">
                <span className="text-base">⚡</span>
                <span className="text-[8px] font-mono text-muted uppercase">Fast</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2">
          <span className="text-[10px] font-mono tracking-[0.3em] text-muted uppercase">Scroll</span>
          <div className="w-px h-8 bg-surface-elevated overflow-hidden">
            <div className="w-full h-1/2 bg-accent/60 animate-[scroll-hint_1.8s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BootSequence;
