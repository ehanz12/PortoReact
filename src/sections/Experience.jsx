import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const experienceData = [
  {
    id: 1,
    role: "Fullstack Developer (PKL)",
    company: "PT Kapsulindo Nusantara",
    location: "Bogor, Indonesia",
    period: "Oktober 2025 - Januari 2025",
    type: "Praktek Kerja Lapangan (PKL)",
    description: "Mengembangkan dan memelihara aplikasi web internal dan layanan RESTful API. Berkolaborasi dalam tim pengembang untuk merancang skema database yang optimal serta antarmuka admin panel yang interaktif.",
    accomplishments: [
      "Merancang dan mengimplementasikan RESTful API menggunakan Framework Code Igniter untuk integrasi data yang cepat.",
      "Membangun dashboard admin interaktif menggunakan HTML, Tailwind CSS, dan Bootstrap untuk efisiensi monitoring data.",
      "Mengoptimalkan query database MySQL yang meningkatkan kecepatan pemrosesan data sebesar 25%.",
      "Menggunakan Git & GitHub untuk version control dan kolaborasi tim yang terstruktur."
    ],
    tech: ["PHP / CodeIgniter", "Bootstrap", "MySQL", "Tailwind CSS", "Git"]
  },
  {
    id: 2,
    role: "Junior Fullstack Developer (Project-Based)",
    company: "SMK Plus Pelita Nusantara",
    location: "Bogor, Indonesia",
    period: "Agustus 2024 - Desember 2024",
    type: "School Project & Freelance",
    description: "Membangun beberapa sistem informasi sekolah dan platform mini-game untuk meningkatkan keterampilan logika pemrograman backend dan manipulasi database.",
    accomplishments: [
      "Mengembangkan Web Management Perpustakaan sekolah dengan fitur peminjaman otomatis.",
      "Membangun Website Capture The Flag (CTF) sederhana untuk kompetisi internal jurusan RPL.",
      "Menerapkan algoritma pencarian dan pagination data untuk meningkatkan user experience."
    ],
    tech: ["PHP / Laravel", "MySQL", "JavaScript", "Tailwind CSS", "Git"]
  }
];

const Experience = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Title animation
    gsap.from(".exp-title-anim", {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
    });

    // Timeline line animation
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

    // Experience cards animation
    gsap.from(".exp-card", {
      x: (index) => (index % 2 === 0 ? -50 : 50),
      opacity: 0,
      stagger: 0.2,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".timeline-container",
        start: "top 75%",
      }
    });
  }, { scope: containerRef });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative z-20 bg-white text-black py-24 lg:py-36 border-t border-gray-100"
    >
      {/* Glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-indigo-50/50 blur-[120px] pointer-events-none -z-10" />

      <div className="main-container">
        {/* Section Header */}
        <div className="exp-title-anim mb-16 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h3 className="mb-3 text-black/40">Pengalaman Kerja / PKL</h3>
            <p className="font-heading font-bold text-3xl lg:text-5xl text-black">
              Perjalanan Karir &amp; Magang
            </p>
          </div>
          <p className="text-base lg:text-lg text-black/60 max-w-md">
            Menerapkan ilmu RPL secara nyata di industri teknologi, membangun sistem yang scalable, dan memecahkan tantangan riil.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="timeline-container relative mt-12 md:mt-20 max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="timeline-line absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2 hidden sm:block" />

          <div className="space-y-12 md:space-y-16">
            {experienceData.map((exp, idx) => {
              const isEven = idx % 2 === 0;
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
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-indigo-600 shadow-md transform hover:scale-125 transition duration-300" />
                  </div>

                  {/* Card Content */}
                  <div className="w-full sm:w-1/2 pl-10 sm:pl-0 sm:px-8">
                    <div className="relative bg-gray-50 hover:bg-gray-100/70 border border-gray-100 hover:border-gray-200 rounded-3xl p-6 lg:p-8 transition-all duration-300 shadow-sm hover:shadow-md group">
                      
                      {/* Gradient border top hover effect */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:via-purple-500 group-hover:to-blue-500 rounded-t-3xl transition-all duration-300" />

                      {/* Header */}
                      <span className="inline-block px-3 py-1 mb-4 text-xs font-heading font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 rounded-full">
                        {exp.type}
                      </span>
                      <h4 className="text-xl lg:text-2xl font-heading font-bold text-black mb-1 group-hover:text-indigo-600 transition-colors duration-300">
                        {exp.role}
                      </h4>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-black/50 mb-4 font-body">
                        <span className="font-semibold text-black/75 flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {exp.company}
                        </span>
                        <span className="hidden sm:inline">•</span>
                        <span className="flex items-center gap-1.5">
                          <svg className="w-4 h-4 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {exp.period}
                        </span>
                      </div>

                      {/* Description */}
                      <p className="text-black/70 text-sm leading-relaxed mb-6 font-body">
                        {exp.description}
                      </p>

                      {/* Accomplishments */}
                      <div className="mb-6">
                        <p className="text-xs font-heading font-semibold uppercase tracking-wider text-black/40 mb-3">Tanggung Jawab &amp; Pencapaian:</p>
                        <ul className="space-y-2.5 text-sm text-black/75 font-body">
                          {exp.accomplishments.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-indigo-500 mt-1 select-none">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="px-3 py-1 text-xs font-body font-medium bg-gray-200/60 hover:bg-gray-200 text-black/70 rounded-lg transition-colors"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                    </div>
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
