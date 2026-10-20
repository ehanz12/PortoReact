import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from '../components/TiltCard';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const experienceData = [
  {
    id: 1,
    role: "Fullstack Developer (PKL)",
    company: "PT Kapsulindo Nusantara",
    period: "Okt – Des 2025",
    type: "PKL",
    summary: "Aplikasi web internal & RESTful API untuk tim.",
    details: [
      "RESTful API dengan CodeIgniter untuk integrasi data cepat.",
      "Dashboard admin interaktif (HTML, Tailwind, Bootstrap).",
      "Optimasi query MySQL — kecepatan pemrosesan +25%.",
      "Git & GitHub untuk kolaborasi tim terstruktur.",
    ],
    tech: ["PHP / CodeIgniter", "Bootstrap", "MySQL", "Tailwind CSS", "Git"]
  },
  {
    id: 2,
    role: "Junior Fullstack Developer",
    company: "SMK Plus Pelita Nusantara",
    period: "Ags – Des 2024",
    type: "Project-Based",
    summary: "Sistem informasi sekolah & mini-game untuk latihan logika backend.",
    details: [
      "Web Management Perpustakaan dengan peminjaman otomatis.",
      "Website Capture The Flag untuk kompetisi internal RPL.",
      "Algoritma pencarian & pagination demi UX lebih baik.",
    ],
    tech: ["PHP / Laravel", "MySQL", "JavaScript", "Tailwind CSS", "Git"]
  }
];

const Experience = () => {
  const containerRef = useRef(null);
  const [openId, setOpenId] = useState(null);

  useGSAP(() => {
    gsap.from(".exp-title-anim", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        once: true,
      },
    });

    gsap.from(".timeline-line", {
      scaleY: 0,
      transformOrigin: "top center",
      duration: 1.2,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".timeline-container",
        start: "top 75%",
        end: "bottom 70%",
        scrub: true
      }
    });

    gsap.from(".exp-card", {
      x: (index) => (index % 2 === 0 ? -50 : 50),
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".timeline-container",
        start: "top 75%",
        once: true,
      }
    });
  }, { scope: containerRef });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative z-20 bg-black py-24 lg:py-36 border-t border-white/5 overflow-hidden"
    >
      {/* Glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-purple-900/10 blur-[120px] pointer-events-none -z-10" />

      <div className="main-container" style={{ contentVisibility: "auto", containIntrinsicSize: "auto 800px" }}>
        {/* Section Header */}
        <div className="exp-title-anim mb-16 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h3 className="mb-3 text-white/40">Pengalaman Kerja / PKL</h3>
            <p className="font-heading font-bold text-3xl lg:text-5xl text-white">
              Perjalanan Karir &amp; Magang
            </p>
          </div>
          <p className="text-base lg:text-lg text-white/50 max-w-md">
            Menerapkan ilmu RPL di industri teknologi.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="timeline-container relative mt-12 md:mt-20 max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2 hidden sm:block" />

          <div className="space-y-12 md:space-y-16">
            {experienceData.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              const isOpen = openId === exp.id;
              return (
                <div
                  key={exp.id}
                  className={`exp-card flex flex-col sm:flex-row items-stretch w-full ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Empty space for alternating layout */}
                  <div className="w-full sm:w-1/2 hidden sm:block" />

                  {/* Timeline Badge/Dot */}
                  <div className="relative flex items-center justify-start sm:justify-center z-10 w-8 sm:w-0">
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-black border-4 border-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.5)]" />
                  </div>

                  {/* Card Content */}
                  <div className="w-full sm:w-1/2 pl-10 sm:pl-0 sm:px-8">
                    <TiltCard maxTilt={5} scale={1.01}>
                      <div className="relative bg-zinc-950/60 border border-white/10 hover:border-purple-500/40 rounded-3xl p-6 lg:p-8 transition-colors duration-300 backdrop-blur-md group">
                        {/* Header */}
                        <span className="inline-block px-3 py-1 mb-4 text-xs font-heading font-semibold uppercase tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/20 rounded-full">
                          {exp.type}
                        </span>
                        <h4 className="text-xl lg:text-2xl font-heading font-bold text-white mb-1">
                          {exp.role}
                        </h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-white/50 mb-4 font-body">
                          <span className="font-semibold text-white/75">{exp.company}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{exp.period}</span>
                        </div>

                        {/* Summary (always visible) */}
                        <p className="text-white/60 text-sm leading-relaxed mb-4 font-body">
                          {exp.summary}
                        </p>

                        {/* Expand toggle */}
                        <button
                          onClick={() => setOpenId(isOpen ? null : exp.id)}
                          aria-expanded={isOpen}
                          className="text-xs font-heading uppercase tracking-widest text-white/40 hover:text-white transition-colors duration-300 mb-1"
                        >
                          {isOpen ? "Sembunyikan −" : "Detail +"}
                        </button>

                        {/* Details (accordion) */}
                        <div
                          className={`grid transition-all duration-500 ease-out ${
                            isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <ul className="space-y-2.5 text-sm text-white/70 font-body pb-2">
                              {exp.details.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="text-purple-400 mt-0.5 select-none">✓</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Tech stack badges */}
                        <div className="flex flex-wrap gap-2 pt-4 mt-2 border-t border-white/10">
                          {exp.tech.map((t) => (
                            <span
                              key={t}
                              className="px-3 py-1 text-xs font-body font-medium bg-white/5 text-white/70 rounded-lg border border-white/10"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </TiltCard>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
