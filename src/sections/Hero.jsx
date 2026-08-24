import React, { useEffect, useRef } from "react";
import ButtonGradient from "../components/ButtonGradient";
import Magnetic from "../components/Magnetic";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import profilePhoto from "../assets/images/foto1.webp";
import { onAppReady, prefersReducedMotion, isFinePointer } from "../lib/motion";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const ROLES = ["Developer", "Engineer", "Architect"];
const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#01";

const scrambleTo = (el, targetText, duration = 700) => {
  const startTime = performance.now();

  const step = (now) => {
    const progress = Math.min((now - startTime) / duration, 1);
    const revealCount = Math.floor(progress * targetText.length);
    let output = "";

    for (let i = 0; i < targetText.length; i++) {
      if (i < revealCount) {
        output += targetText[i];
      } else if (targetText[i] === " ") {
        output += " ";
      } else {
        output +=
          SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
    }

    el.textContent = output;

    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = targetText;
  };

  requestAnimationFrame(step);
};

const Hero = () => {
  const heroRef = useRef(null);
  const roleRef = useRef(null);
  const introTl = useRef(null);

  /* ── Stat count-up ── */
  const countUpStats = () => {
    heroRef.current.querySelectorAll(".hero-stat-num").forEach((el) => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || "";
      const obj = { value: 0 };

      gsap.to(obj, {
        value: target,
        duration: 1.4,
        delay: 1.2,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${Math.round(obj.value)}${suffix}`;
        },
      });
    });
  };

  /* ── Intro timeline: menunggu preloader selesai ── */
  useGSAP(() => {
    SplitText.create(heroRef.current.querySelector("h1"), {
      type: "lines, words",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        introTl.current = gsap.timeline({ paused: true });

        introTl.current.from(self.words, {
          y: 100,
          opacity: 0,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out",
        });

        introTl.current.from(
          ".hero-line",
          { yPercent: 120, duration: 0.9, ease: "power4.out", stagger: 0.12 },
          "-=0.5"
        );

        introTl.current
          .from(".gradien-btn", {
            y: 40,
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
            clearProps: "opacity,transform",
          })
          .from(
            ".hero-photo-wrapper",
            { x: 80, opacity: 0, duration: 1, ease: "power3.out" },
            "-=0.6"
          )
          .from(
            ".hero-badge",
            { y: 20, opacity: 0, stagger: 0.12, duration: 0.6, ease: "power2.out" },
            "-=0.7"
          )
          .from(
            ".hero-stat-num",
            { opacity: 0, y: 16, stagger: 0.1, duration: 0.5 },
            "-=0.4"
          );

        if (window.__APP_READY__) {
          introTl.current.play();
          countUpStats();
        }

        return () => introTl.current?.kill();
      },
    });

    /* Pin hero selama scroll — desktop only */
    if (window.innerWidth >= 1024) {
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: true,
        scrub: 1,
      });
    }

    const offReady = onAppReady(() => {
      introTl.current?.play();
      countUpStats();
    });

    return () => offReady();
  }, { scope: heroRef });

  /* ── Rotasi role dengan efek scramble ── */
  useEffect(() => {
    if (prefersReducedMotion()) return;

    let index = 0;
    const interval = setInterval(() => {
      if (!roleRef.current) return;
      if (document.hidden) return;
      index = (index + 1) % ROLES.length;
      scrambleTo(roleRef.current, ROLES[index]);
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  /* ── Mouse parallax pada foto & badge ── */
  useGSAP(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;

    const layers = heroRef.current.querySelectorAll("[data-depth]");
    const setters = Array.from(layers).map((layer) => ({
      depth: parseFloat(layer.dataset.depth),
      x: gsap.quickTo(layer, "x", { duration: 0.6, ease: "power3.out" }),
      y: gsap.quickTo(layer, "y", { duration: 0.6, ease: "power3.out" }),
    }));

    const onMove = (e) => {
      const { innerWidth: w, innerHeight: h } = window;
      const nx = e.clientX / w - 0.5;
      const ny = e.clientY / h - 0.5;

      setters.forEach(({ depth, x, y }) => {
        x(nx * 30 * depth);
        y(ny * 30 * depth);
      });
    };

    const el = heroRef.current;
    el.addEventListener("mousemove", onMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div ref={heroRef} className="relative z-10 overflow-hidden will-change-transform">
        {/* Background decorative elements */}
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />

        {/* Floating particles (CSS-only) */}
        <div className="hero-particles" aria-hidden="true">
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className={`hero-particle particle-${i + 1}`} />
          ))}
        </div>

        <div className="main-container min-h-dvh flex flex-col lg:flex-row lg:justify-center lg:items-center items-center text-center lg:text-left lg:py-12 pt-24 lg:pt-12 gap-10 lg:gap-24">
          {/* Left: Text Content */}
          <div className="flex-1 z-10 flex flex-col items-center lg:items-start">
            {/* Status Badge */}
            <div className="block md:hidden hero-badge flex items-center gap-2 mb-6 w-fit bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm mx-auto lg:mx-0">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-white/70 font-body">Available for Work</span>
            </div>

            <h1 className="text-3xl lg:text-[3.2vw] uppercase font-heading font-semibold w-fit mx-auto lg:mx-0">
              Reihan Aditya
            </h1>

            <h2 className="text-5xl sm:text-6xl lg:text-[8vw] uppercase font-heading font-bold leading-none tracking-tight mt-3 mb-6">
              <span className="block overflow-hidden pb-1">
                <span className="hero-line block">Fullstack</span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span ref={roleRef} className="hero-line block text-stroke">
                  Developer
                </span>
              </span>
            </h2>

            <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
              <ButtonGradient
                text={"Let's Talk"}
                link={"mailto:rhanssap@gmail.com"}
                className="gradien-btn"
              />
              <Magnetic strength={0.3}>
                <a
                  href="#about"
                  className="hero-badge text-white/50 hover:text-white text-sm font-heading uppercase tracking-widest transition-colors duration-300 flex items-center gap-2 py-2"
                >
                  <span>Lihat Profil</span>
                  <span className="inline-block animate-bounce">↓</span>
                </a>
              </Magnetic>
            </div>

            {/* Stats Row */}
            <div className="hero-badge flex gap-8 mt-12 pt-8 border-t border-white/10 justify-center lg:justify-start w-full lg:w-auto">
              <div>
                <p
                  className="hero-stat-num text-3xl font-heading font-bold gradient-text"
                  data-count="5"
                  data-suffix="+"
                >
                  0+
                </p>
                <p className="text-white/50 text-sm mt-1">Proyek Selesai</p>
              </div>
              <div>
                <p
                  className="hero-stat-num text-3xl font-heading font-bold gradient-text"
                  data-count="10"
                  data-suffix=""
                >
                  0
                </p>
                <p className="text-white/50 text-sm mt-1">Sertifikat</p>
              </div>
              <div>
                <p
                  className="hero-stat-num text-3xl font-heading font-bold gradient-text"
                  data-count="2"
                  data-suffix="+"
                >
                  0+
                </p>
                <p className="text-white/50 text-sm mt-1">Tahun Belajar</p>
              </div>
            </div>
          </div>

          {/* Right: Photo */}
          <div className="hero-photo-wrapper relative flex-shrink-0 lg:w-[38%] max-lg:hidden">
            {/* Decorative ring */}
            <div className="absolute inset-0 rounded-3xl hero-photo-border" />
            {/* Floating label top-left */}
            <div data-depth="1.6" className="absolute -top-4 -left-4 z-20 bg-black border border-white/10 rounded-2xl px-4 py-3 backdrop-blur-md will-change-transform">
              <p className="text-xs text-white/50 font-body">Spesialisasi</p>
              <p className="text-sm font-heading font-semibold text-white">Fullstack Dev</p>
            </div>
            {/* Photo */}
            <div data-depth="0.5" className="relative overflow-hidden rounded-3xl aspect-[3/4] will-change-transform">
              <img
                src={profilePhoto}
                alt="Reihan Aditya Putra"
                className="w-full h-full object-cover object-top"
                fetchPriority="high"
              />
              {/* Gradient overlay bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            {/* Floating label bottom-right */}
            <div data-depth="2.2" className="absolute -bottom-4 -right-4 z-20 bg-black border border-white/10 rounded-2xl px-4 py-3 backdrop-blur-md will-change-transform">
              <p className="text-xs text-white/50 font-body">Tech Stack</p>
              <p className="text-sm font-heading font-semibold text-white">Go · JS · PHP</p>
            </div>
            {/* Floating speed badge (desktop only) */}
            <div data-depth="1.8" className="hero-float-badge absolute top-1/2 -left-5 z-20 bg-black/80 border border-white/10 rounded-xl px-3 py-2 backdrop-blur-md will-change-transform hidden lg:flex flex-col items-center gap-1">
              <span className="text-base">⚡</span>
              <span className="text-[9px] text-white/40 font-heading uppercase tracking-wider">Fast</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2 pointer-events-none">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/30 font-heading">
            Scroll
          </span>
          <div className="w-px h-10 bg-white/10 overflow-hidden">
            <div className="w-full h-1/2 bg-gradient-to-b from-transparent via-white/70 to-transparent animate-scroll-hint" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
