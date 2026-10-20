import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ButtonGradient from "../components/ButtonGradient";
import Magnetic from "../components/Magnetic";
import HeroSceneFallback from "../components/HeroSceneFallback";
import SceneErrorBoundary from "../components/SceneErrorBoundary";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onAppReady, prefersReducedMotion } from "../lib/motion";
import { get3DTier } from "../lib/three-support";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const HeroScene3D = lazy(() => import("../components/HeroScene3D"));

const ROLES = ["Developer", "Engineer", "Architect"];
const SCRAMBLE_CHARS = "!<>-_\\/[]{}=+*^?#01";

const scrambleTo = (el, targetText, duration = 700) => {
  if (el._scrambleRaf) cancelAnimationFrame(el._scrambleRaf);
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

    if (progress < 1) el._scrambleRaf = requestAnimationFrame(step);
    else {
      el.textContent = targetText;
      el._scrambleRaf = null;
    }
  };

  el._scrambleRaf = requestAnimationFrame(step);
};

const Hero = () => {
  const heroRef = useRef(null);
  const roleRef = useRef(null);
  const introTl = useRef(null);

  const [sceneTier] = useState(() => get3DTier());
  const [shouldLoadScene, setShouldLoadScene] = useState(false);
  const [sceneReady, setSceneReady] = useState(false);
  const [sceneFailed, setSceneFailed] = useState(false);

  const handleSceneReady = useCallback(() => setSceneReady(true), []);
  const handleSceneFail = useCallback(() => {
    setSceneFailed(true);
    setSceneReady(false);
  }, []);

  /* ── Muat scene 3D setelah paint pertama, tanpa menahan initial load ── */
  useEffect(() => {
    if (sceneTier === "off") return;

    let timer = null;
    let idleId = null;

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(() => setShouldLoadScene(true), {
        timeout: 1800,
      });
    } else {
      timer = setTimeout(() => setShouldLoadScene(true), 700);
    }

    return () => {
      if (idleId !== null) window.cancelIdleCallback(idleId);
      if (timer !== null) clearTimeout(timer);
    };
  }, [sceneTier]);

  /* ── Stat count-up ── */
  const countUpStats = () => {
    const stats = heroRef.current?.querySelectorAll(".hero-stat-num");
    if (!stats) return;

    stats.forEach((el) => {
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || "";
      const obj = { value: 0 };

      gsap.to(obj, {
        value: target,
        duration: 1.2,
        delay: 0.8,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${Math.round(obj.value)}${suffix}`;
        },
      });
    });
  };

  /* ── Intro timeline: dibuat sekali, diputar setelah preloader/fallback ── */
  useGSAP(
    () => {
      const stats = heroRef.current?.querySelectorAll(".hero-stat-num") || [];

      /* Reduced motion: konten langsung tampil tanpa animasi */
      if (prefersReducedMotion()) {
        stats.forEach((el) => {
          el.textContent = `${el.dataset.count}${el.dataset.suffix || ""}`;
        });
        return;
      }

      const tl = gsap.timeline({ paused: true });

      tl.fromTo(
        ".hero-intro-title",
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          clearProps: "opacity,transform",
        }
      )
        .fromTo(
          ".hero-line",
          { yPercent: 120 },
          {
            yPercent: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power4.out",
            clearProps: "transform",
          },
          "-=0.45"
        )
        .fromTo(
          ".gradien-btn",
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            clearProps: "opacity,transform",
          },
          "-=0.5"
        )
        .fromTo(
          ".hero-badge",
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.5,
            ease: "power2.out",
            clearProps: "opacity,transform",
          },
          "-=0.5"
        )
        .fromTo(
          ".hero-stat-num",
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.4,
            clearProps: "opacity,transform",
          },
          "-=0.4"
        );

      introTl.current = tl;

      let played = false;
      const playIntro = () => {
        if (played) return;
        played = true;
        tl.play(0);
        countUpStats();
      };

      const offReady = onAppReady(playIntro);
      /* Jaring pengaman terakhir: hero tidak boleh tetap tersembunyi. */
      const fallback = setTimeout(playIntro, 1600);

      return () => {
        clearTimeout(fallback);
        offReady();
        tl.kill();
        introTl.current = null;
      };
    },
    { scope: heroRef }
  );

  /* ── Rotasi role dengan efek scramble ── */
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const roleEl = roleRef.current;
    if (!roleEl) return;

    let index = 0;
    const interval = setInterval(() => {
      if (document.hidden) return;
      index = (index + 1) % ROLES.length;
      scrambleTo(roleEl, ROLES[index]);
    }, 3200);

    return () => {
      clearInterval(interval);
      if (roleEl._scrambleRaf) cancelAnimationFrame(roleEl._scrambleRaf);
    };
  }, []);

  /* ── Fade hero saat scroll (desktop, tanpa pin) ── */
  useGSAP(() => {
    if (prefersReducedMotion()) return;
    if (window.innerWidth < 1024) return;

    gsap.to(heroRef.current, {
      opacity: 0.35,
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, { scope: heroRef });

  return (
    <>
      <div ref={heroRef} className="relative z-10 overflow-hidden">
        {/* 3D scene / fallback */}
        <div className="hero-scene-layer" aria-hidden="true">
          <HeroSceneFallback dimmed={sceneReady} />
          {sceneTier !== "off" && !sceneFailed && shouldLoadScene && (
            <SceneErrorBoundary onError={handleSceneFail} fallback={null}>
              <Suspense fallback={null}>
                <HeroScene3D
                  tier={sceneTier}
                  onReady={handleSceneReady}
                  onFail={handleSceneFail}
                />
              </Suspense>
            </SceneErrorBoundary>
          )}
        </div>

        {/* Background decorative elements */}
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />

        {/* Floating particles (CSS-only, dikurangi 10→6) */}
        <div className="hero-particles" aria-hidden="true">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className={`hero-particle particle-${i + 1}`} />
          ))}
        </div>

        <div className="main-container min-h-dvh flex flex-col lg:justify-center items-center text-center lg:text-left lg:py-12 pt-24 lg:pt-12">
          {/* Text Content */}
          <div className="z-10 w-full max-w-4xl flex flex-col items-center lg:items-start">
            {/* Status Badge */}
            <div className="block md:hidden hero-badge flex items-center gap-2 mb-6 w-fit bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm mx-auto lg:mx-0">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-white/70 font-body">Available for Work</span>
            </div>

            <h1 className="hero-intro-title text-3xl lg:text-[3.2vw] uppercase font-heading font-semibold w-fit mx-auto lg:mx-0">
              Reihan Aditya
            </h1>

            <h2 className="text-5xl sm:text-6xl lg:text-[min(8vw,8.5rem)] uppercase font-heading font-bold leading-none tracking-tight mt-3 mb-6">
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
