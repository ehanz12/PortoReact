import React, { useRef } from 'react';
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import profilePhoto from "../assets/images/foto1.webp";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const skills = [
  { name: "Golang", level: 97 },
  { name: "PHP / Laravel", level: 95 },
  { name: "JavaScript", level: 70 },
  { name: "MySQL / PostgreSQL", level: 95 },
  { name: "RESTful API", level: 88 },
  { name: "Git & Version Control", level: 95 },
];

const About = () => {
  const aboutRef = useRef(null);

  useGSAP(() => {
    // Animate quote text
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

    // Animate photo
    gsap.from(".about-photo", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 75%",
        once: true,
      },
    });

    // Animate skill bars + count-up persentase
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

    // Animate about cards
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
      className="relative z-20 bg-white text-black rounded-tl-[60px] rounded-tr-[60px]"
    >
      {/* ─── Top Bio Section ─── */}
      <div className="main-container py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left – Photo */}
          <div className="about-photo relative max-lg:order-2">
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
          </div>

          {/* Right – Text */}
          <div className="max-lg:order-1">
            <h3 className="mb-4 text-black/40">Tentang Saya</h3>
            <p className="about-quote font-heading text-2xl lg:text-3xl xl:text-4xl leading-tight text-black font-semibold mb-8">
              Sebagai Fullstack Developer Junior, saya fokus merancang antarmuka pengguna yang interaktif dan membangun logika server-side yang solid serta efisien.
            </p>
            <p className="text-black/60 text-lg leading-relaxed mb-8">
              Saya memiliki pengalaman mengembangkan aplikasi web secara menyeluruh dari frontend hingga backend, serta terbiasa menerapkan kode yang bersih, responsif, dan mudah dipelihara. Dengan semangat belajar dan kemampuan problem solving yang kuat, saya terus mengembangkan keterampilan untuk menciptakan sistem yang stabil, scalable, dan andal.
            </p>

            {/* Info chips */}
            <div className="about-info-grid grid grid-cols-2 gap-3">
              {[
                { label: "Nama", value: "Reihan Aditya Putra" },
                { label: "Sekolah", value: "SMK Plus Pelita Nusantara Bogor" },
                { label: "Jurusan", value: "RPL (XII RPL 2)" },
                { label: "Email", value: "rhanssap@gmail.com" },
              ].map((item) => (
                <div
                  key={item.label}
                  onMouseMove={handleSpotlight}
                  className="about-info-card spotlight-card bg-gray-50 border border-gray-100 rounded-2xl p-4 transition-colors duration-300 hover:border-purple-200"
                >
                  <p className="text-xs font-heading uppercase tracking-wider text-black/40 mb-1 relative z-10">{item.label}</p>
                  <p className="font-heading font-semibold text-sm text-black break-words relative z-10">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Skills Section ─── */}
      <div className="skills-section bg-gray-50 py-20 lg:py-28">
        <div className="main-container">
          <h3 className="mb-2 text-black/40">Keahlian Teknis</h3>
          <p className="font-heading font-bold text-3xl lg:text-4xl text-black mb-12">
            Stack yang saya kuasai
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {skills.map((skill) => (
              <div key={skill.name}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-heading font-semibold text-black">{skill.name}</span>
                  <span className="skill-percent text-sm font-body text-black/40" data-level={skill.level}>
                    0%
                  </span>
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
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