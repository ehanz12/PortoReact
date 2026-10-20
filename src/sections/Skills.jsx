import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlitchText from "../components/GlitchText";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Fullstack Development",
    desc: "Membangun aplikasi web lengkap mulai dari frontend responsif hingga backend yang menangani logika bisnis, pemrosesan data, serta komunikasi API secara efisien.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    id: "02",
    title: "API Development",
    desc: "Merancang dan mengembangkan RESTful API untuk menghubungkan aplikasi dengan database maupun layanan eksternal. API yang aman, terstruktur, dan mudah digunakan.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.318a4.5 4.5 0 00-1.242-7.244l-4.5-4.5a4.5 4.5 0 00-6.364 6.364L4.34 8.374" />
      </svg>
    ),
  },
  {
    id: "03",
    title: "Database Management",
    desc: "Mengelola dan menstrukturkan database untuk menyimpan, mengambil, serta memproses data secara efisien. Skema optimal, query performa tinggi.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
    ),
  },
];

const Skills = () => {
  const ref = useRef(null);

  useGSAP(() => {
    const cards = ref.current?.querySelectorAll(".service-card");
    if (!cards) return;

    gsap.from(cards, {
      y: 60,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: ref.current,
        start: "top 65%",
      },
    });

    const icons = ref.current?.querySelectorAll(".service-icon");
    if (icons) {
      gsap.from(icons, {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.15,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 60%",
        },
      });
    }
  }, { scope: ref });

  return (
    <div ref={ref} id="skills" className="relative py-20 lg:py-28">
      <div className="cyber-container mb-12 lg:mb-16">
        <GlitchText text="Layanan" />
      </div>

      <div className="cyber-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.id}
              data-service={s.id}
              className={`service-card group relative p-8 rounded-xl border border-accent/10
                hover:border-accent/40 hover:shadow-[0_0_30px_rgba(232,184,48,0.08)]
                transition-all duration-500 ease-out hover:-translate-y-2
                ${i % 2 === 0 ? "bg-void" : "bg-surface/30"}`}
            >
              <div className="service-icon w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-6
                group-hover:bg-accent/20 transition-colors duration-300">
                {s.icon}
              </div>

              <h3 className="text-lg font-heading font-semibold text-white mb-3">
                {s.title}
              </h3>

              <p className="text-sm text-muted leading-relaxed">
                {s.desc}
              </p>

              <span className="absolute top-6 right-8 text-[10px] font-mono text-accent/20 tracking-widest">
                {s.id}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
