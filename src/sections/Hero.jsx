import React, { useRef } from "react";
import ButtonGradient from "../components/ButtonGradient";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import profilePhoto from "../assets/images/foto1.png";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

const Hero = () => {
  const heroRef = useRef(null);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
      scrub: 1,
    });

    SplitText.create(heroRef.current.querySelector("h1"), {
      type: "lines, words",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        gsap.from(self.words, {
          y: 100,
          opacity: 0,
          stagger: 0.1,
        });
      },
    });

    SplitText.create(heroRef.current.querySelector("h2"), {
      type: "lines, words",
      mask: "lines",
      autoSplit: true,
      onSplit(self) {
        gsap.from(self.words, {
          y: 100,
          opacity: 0,
          stagger: 0.15,
          delay: 0.3,
        });
      },
    });

    gsap.from(".gradien-btn", {
      y: 40,
      opacity: 0,
      duration: 0.5,
      ease: "power2.out",
      delay: 0.2,
      clearProps: "opacity,transform",
    });

    // Animate photo
    gsap.from(".hero-photo-wrapper", {
      x: 80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.4,
    });

    // Animate badges
    gsap.from(".hero-badge", {
      y: 20,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: "power2.out",
      delay: 0.8,
    });
  }, { scope: heroRef });

  return (
    <>
      <div ref={heroRef} className="relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />

        <div className="main-container min-h-screen flex flex-col lg:flex-row lg:justify-between lg:items-center items-start lg:py-12 max-lg:pt-40 gap-12">
          {/* Left: Text Content */}
          <div className="flex-1 z-10">
            {/* Status Badge */}
            <div className="hero-badge flex items-center gap-2 mb-6 w-fit bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-white/70 font-body">Available for Work</span>
            </div>

            <h1 className="text-3xl lg:text-[3.2vw] uppercase font-heading font-semibold">
              Reihan Aditya
            </h1>
            <h2 className="text-5xl sm:text-6xl lg:text-[8vw] uppercase font-heading font-bold leading-none tracking-tight mt-3 mb-6">
              Fullstack
              <br />
              <span className="text-stroke cursor-pointer">Developer</span>
            </h2>
{/* 
            <p className="hero-badge text-white/60 text-lg mb-8 max-w-md leading-relaxed">
              Membangun aplikasi web ujung-ke-ujung (end-to-end) mulai dari antarmuka pengguna yang interaktif hingga logika server-side dan sistem database yang andal.
            </p> */}

            <div className="flex flex-wrap gap-4 items-center">
              <ButtonGradient
                text={"Let's Talk"}
                link={"mailto:rhanssap@gmail.com"}
                className="gradien-btn"
              />
              <a
                href="#about"
                className="hero-badge text-white/50 hover:text-white text-sm font-heading uppercase tracking-widest transition-colors duration-300 flex items-center gap-2"
              >
                <span>Lihat Profil</span>
                <span>↓</span>
              </a>
            </div>

            {/* Stats Row */}
            <div className="hero-badge flex gap-8 mt-12 pt-8 border-t border-white/10">
              <div>
                <p className="text-3xl font-heading font-bold gradient-text">5+</p>
                <p className="text-white/50 text-sm mt-1">Proyek Selesai</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold gradient-text">4</p>
                <p className="text-white/50 text-sm mt-1">Sertifikat</p>
              </div>
              <div>
                <p className="text-3xl font-heading font-bold gradient-text">2+</p>
                <p className="text-white/50 text-sm mt-1">Tahun Belajar</p>
              </div>
            </div>
          </div>

          {/* Right: Photo */}
          <div className="hero-photo-wrapper relative flex-shrink-0 lg:w-[38%] max-lg:hidden">
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
              />
              {/* Gradient overlay bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            {/* Floating label bottom-right */}
            <div className="absolute -bottom-4 -right-4 z-20 bg-black border border-white/10 rounded-2xl px-4 py-3 backdrop-blur-md">
              <p className="text-xs text-white/50 font-body">Tech Stack</p>
              <p className="text-sm font-heading font-semibold text-white">Go · JS · PHP</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
