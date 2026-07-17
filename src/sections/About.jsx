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
      },
    });

    return () => {
      quoteTween.scrollTrigger?.kill();
      splitText.revert();
    };

    // Animate photo
    gsap.from(".about-photo", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 75%",
      },
    });

    // Animate skill bars
    gsap.from(".skill-bar-fill", {
      scaleX: 0,
      transformOrigin: "left center",
      stagger: 0.1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".skills-section",
        start: "top 80%",
      },
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
      },
    });
  }, { scope: aboutRef });

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
            <div className="relative">
              {/* Decorative blob behind photo */}
              <div className="absolute -inset-4 rounded-[40px] about-photo-bg" />
              <div className="relative rounded-[32px] overflow-hidden aspect-[4/5]">
                <img
                  src={profilePhoto}
                  alt="Reihan Aditya Putra"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              {/* Floating chip */}
              <div className="absolute bottom-6 -right-6 bg-black text-white rounded-2xl px-5 py-4 shadow-xl">
                <p className="text-xs text-white/50 font-body">Kelas</p>
                <p className="text-sm font-heading font-bold">XII RPL 2</p>
              </div>
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
                <div key={item.label} className="about-info-card bg-gray-50 border border-gray-100 rounded-2xl p-4">
                  <p className="text-xs font-heading uppercase tracking-wider text-black/40 mb-1">{item.label}</p>
                  <p className="font-heading font-semibold text-sm text-black break-words">{item.value}</p>
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
                  <span className="text-sm font-body text-black/40">{skill.level}%</span>
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