import React, { useRef, useState } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import profilePhoto from "../assets/images/foto1.webp";
import TiltCard from "../components/TiltCard";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const skills = [
  { name: "Golang", level: 97 },
  { name: "PHP / Laravel", level: 95 },
  { name: "JavaScript", level: 70 },
  { name: "MySQL / PostgreSQL", level: 95 },
  { name: "RESTful API", level: 88 },
  { name: "Git & Version Control", level: 95 },
];

const infoItems = [
  { label: "Nama", value: "Reihan Aditya Putra" },
  { label: "Sekolah", value: "SMK Plus Pelita Nusantara Bogor" },
  { label: "Jurusan", value: "RPL (XII RPL 2)" },
  { label: "Email", value: "rhanssap@gmail.com" },
];

const About = () => {
  const aboutRef = useRef(null);
  const [expanded, setExpanded] = useState(false);

  useGSAP(() => {
    const quoteElement = aboutRef.current?.querySelector('.about-quote');
    if (!quoteElement) return;

    const splitText = SplitText.create(quoteElement, {
      type: "lines, chars",
      autoSplit: true,
    });

    gsap.set(splitText.chars, { opacity: 0.25, y: 8 });

    const quoteTween = gsap.to(splitText.chars, {
      opacity: 1,
      y: 0,
      stagger: 0.03,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 80%",
        end: "center center",
        scrub: 0.8,
        once: false,
      },
    });

    gsap.from(".about-photo", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      clearProps: "transform",
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 75%",
        once: true,
      },
    });

    gsap.from(".skill-bar-fill", {
      scaleX: 0,
      transformOrigin: "left center",
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".skills-section",
        start: "top 80%",
        once: true,
      },
    });

    aboutRef.current.querySelectorAll(".skill-percent").forEach((el) => {
      const target = parseInt(el.dataset.level, 10);
      const obj = { value: 0 };

      gsap.to(obj, {
        value: target,
        duration: 1.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skills-section",
          start: "top 80%",
        },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.value)}%`;
        },
      });
    });

    gsap.from(".about-info-card", {
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".about-info-grid",
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      quoteTween.scrollTrigger?.kill();
      splitText.revert();
    };
  }, { scope: aboutRef });

  /* ── Spotlight mengikuti kursor pada info cards (rAF-throttle) ── */
  const spotlightRaf = useRef(0);
  const handleSpotlight = (e) => {
    const card = e.currentTarget;
    const cx = e.clientX;
    const cy = e.clientY;
    if (spotlightRaf.current) return;
    spotlightRaf.current = requestAnimationFrame(() => {
      spotlightRaf.current = 0;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${cx - rect.left}px`);
      card.style.setProperty("--spot-y", `${cy - rect.top}px`);
    });
  };

  return (
    <div
      id="about"
      ref={aboutRef}
      className="relative z-20 bg-black border-t border-white/5"
    >
      {/* ─── Top Bio Section ─── */}
      <div className="main-container py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left – Photo */}
          <TiltCard
            maxTilt={6}
            scale={1.01}
            className="about-photo relative max-lg:order-2"
          >
            {/* Decorative ring */}
            <div className="absolute inset-0 rounded-3xl hero-photo-border" />
            {/* Floating label top-left */}
            <div className="absolute -top-4 -left-4 z-20 bg-black border border-white/10 rounded-2xl px-4 py-3 backdrop-blur-md">
              <p className="text-xs text-white/50 font-body">Spesialisasi</p>
              <p className="text-sm font-heading font-semibold text-white">Fullstack Dev</p>
            </div>
            {/* Photo */}
            <div className="relative overflow-hidden rounded-3xl aspect-[3/4]">
              <img
                src={profilePhoto}
                alt="Reihan Aditya Putra"
                className="w-full h-full object-cover object-top"
                loading="lazy"
                decoding="async"
                width="640"
                height="853"
              />
              {/* Gradient overlay bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            {/* Floating label bottom-right */}
            <div className="absolute -bottom-4 -right-4 z-20 bg-black border border-white/10 rounded-2xl px-4 py-3 backdrop-blur-md">
              <p className="text-xs text-white/50 font-body">Tech Stack</p>
              <p className="text-sm font-heading font-semibold text-white">Go · JS · PHP</p>
            </div>
            {/* Floating speed badge (desktop only) */}
            <div className="hero-float-badge absolute top-1/2 -left-5 z-20 bg-black/80 border border-white/10 rounded-xl px-3 py-2 backdrop-blur-md hidden lg:flex flex-col items-center gap-1">
              <span className="text-base">⚡</span>
              <span className="text-[9px] text-white/40 font-heading uppercase tracking-wider">Fast</span>
            </div>
          </TiltCard>

          {/* Right – Text */}
          <div className="max-lg:order-1">
            <h3 className="mb-4 text-white/40">Tentang Saya</h3>
            <p className="about-quote font-heading text-2xl lg:text-3xl xl:text-4xl leading-tight text-white font-semibold mb-6">
              Fullstack Developer Junior yang fokus pada antarmuka interaktif dan logika server yang solid.
            </p>
            <div className="mb-8">
              <p className={`text-white/60 text-base lg:text-lg leading-relaxed transition-all duration-500 ${expanded ? "" : "line-clamp-2"}`}>
                Saya mengembangkan aplikasi web end-to-end dari frontend hingga backend dengan kode yang bersih, responsif, dan mudah dipelihara — didorong semangat belajar dan problem solving yang kuat.
              </p>
              <button
                onClick={() => setExpanded((v) => !v)}
                className="mt-3 text-sm font-heading uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-300"
              >
                {expanded ? "Tutup −" : "Selengkapnya +"}
              </button>
            </div>

            {/* Info chips */}
            <div className="about-info-grid grid grid-cols-2 gap-3">
              {infoItems.map((item) => (
                <TiltCard key={item.label} maxTilt={8} scale={1.02}>
                  <div
                    onMouseMove={handleSpotlight}
                    className="about-info-card spotlight-card h-full bg-zinc-950/60 border border-white/10 rounded-2xl p-4 transition-colors duration-300 hover:border-purple-500/40"
                  >
                    <p className="text-xs font-heading uppercase tracking-wider text-white/40 mb-1 relative z-10">{item.label}</p>
                    <p className="font-heading font-semibold text-sm text-white break-words relative z-10">{item.value}</p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Skills Section ─── */}
      <div className="skills-section bg-zinc-950/40 border-t border-white/5 py-20 lg:py-28">
        <div className="main-container">
          <h3 className="mb-2 text-white/40">Keahlian Teknis</h3>
          <p className="font-heading font-bold text-3xl lg:text-4xl text-white mb-12">
            Stack yang saya kuasai
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-heading font-semibold text-white">{skill.name}</span>
                  <span className="skill-percent text-sm font-body text-white/40" data-level={skill.level}>
                    0%
                  </span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="skill-bar-fill h-full rounded-full skill-bar-gradient"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
