import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getLenis } from "../lib/lenis";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const certImageModules = import.meta.glob("../assets/images/sertifikat*.webp", { eager: true });
const certImages = Object.keys(certImageModules)
  .sort()
  .map((key) => certImageModules[key].default);

const certificatesData = [
  {
    id: 1,
    image: certImages[0],
    title: "Google Cloud Roadshows",
    issuer: "Google Developer Group Bogor",
    year: "2025",
    type: "Certificate of Attendance",
  },
  {
    id: 2,
    image: certImages[1],
    title: "From Vision to Version 1.0",
    issuer: "CodeLamp Indonesia",
    year: "2025",
    type: "Webinar Participant",
  },
  {
    id: 3,
    image: certImages[2],
    title: "Google I/O Extended Bogor",
    issuer: "GDG Bogor & Women Techmakers",
    year: "2025",
    type: "Certificate of Attendance",
  },
  {
    id: 4,
    image: certImages[3],
    title: "Game Design: From Hobby to Hook",
    issuer: "CodeLamp Indonesia",
    year: "2025",
    type: "Webinar Participant",
  },
  {
    id: 5,
    image: certImages[4],
    title: "Nasional Basic Public Speaking",
    issuer: "Galeria Potensi",
    year: "2026",
    type: "Webinar Participant"
  },
  {
    id: 6,
    image: certImages[5],
    title: "Introduction to Capture The Flag",
    issuer: "ID-NetWorkers",
    year: "2025",
    type: "Webinar Participant"
  },
  {
    id: 7,
    image: certImages[6],
    title: "Strategi, Menciptakan Komunikasi Yang Nyaman",
    issuer: "Galeria Potensi",
    year: "2026",
    type: "Webinar Participant"
  },
  {
    id: 8,
    image: certImages[7],
    title: "Festival Lomba Kompetisi Siswa Tingkat SMK Kabupaten Bogor",
    issuer: "Disdik Jabar",
    year: "2026",
    type: "Prestasi / Contest"
  },
  {
    id: 9,
    image: certImages[8],
    title: "Python Developer",
    issuer: "Sololearn",
    year: "2025",
    type: "Course Certificate"
  },
  {
    id: 10,
    image: certImages[9],
    title: "Vibe Koding",
    issuer: "Sololearn",
    year: "2025",
    type: "Course Certificate"
  }
];

const Certificates = () => {
  const sectionRef = useRef(null);
  const [activeCert, setActiveCert] = useState(null);

  /* ── Lock scroll saat lightbox terbuka (Lenis-aware) ── */
  useEffect(() => {
    if (!activeCert) return;
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";

    return () => {
      lenis?.start();
      document.body.style.overflow = "";
    };
  }, [activeCert]);

  /* ── Keyboard: ESC tutup, ←/→ navigasi ── */
  const lightboxOpen = activeCert !== null;

  useEffect(() => {
    if (!lightboxOpen) return;

    const onKey = (e) => {
      if (e.key === "Escape") setActiveCert(null);
      if (e.key === "ArrowRight")
        setActiveCert((i) => (i + 1) % certificatesData.length);
      if (e.key === "ArrowLeft")
        setActiveCert((i) =>
          i === 0 ? certificatesData.length - 1 : i - 1
        );
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen]);

  useGSAP(() => {
    gsap.from(".cert-title-anim", {
      y: 60,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      },
    });

    gsap.from(".cert-card", {
      y: 80,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".cert-grid",
        start: "top 80%",
      },
    });
  }, { scope: sectionRef });

  return (
    <>
      <section ref={sectionRef} id="certificates" className="bg-white text-black py-24 lg:py-40">
        {/* Section Header */}
        <div className="main-container mb-12 lg:mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="cert-title-anim">
              <h3 className="mb-3">Sertifikasi &amp; Pencapaian</h3>
              <p className="text-lg lg:text-xl text-black/60 max-w-lg">
                Bukti komitmen saya dalam terus belajar dan berkembang di dunia teknologi.
              </p>
            </div>
            <span className="cert-title-anim text-5xl lg:text-6xl font-heading font-bold text-black/5 select-none">
              {certificatesData.length} Cert
            </span>
          </div>
        </div>

        {/* Certificates Grid */}
        <div className="cert-grid main-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {certificatesData.map((cert, index) => (
            <button
              key={cert.id}
              className="cert-card group relative rounded-2xl overflow-hidden cursor-pointer text-left"
              onClick={() => setActiveCert(index)}
              data-cursor="Lihat"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white font-heading text-sm uppercase tracking-widest bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-5 py-2">
                    Lihat Detail
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-4 bg-gray-50 border border-gray-100">
                <span className="text-xs font-heading uppercase tracking-wider text-black/40 block mb-1">
                  {cert.type}
                </span>
                <h4 className="font-heading font-semibold text-base leading-snug text-black mb-1">
                  {cert.title}
                </h4>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-black/50">{cert.issuer}</span>
                  <span className="text-xs font-heading font-bold text-black/30">{cert.year}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeCert !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in"
          onClick={() => setActiveCert(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            key={activeCert}
            className="relative max-w-4xl w-full animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setActiveCert(null)}
              className="absolute -top-12 right-0 text-white/60 hover:text-white transition-colors font-heading text-sm uppercase tracking-widest flex items-center gap-2"
            >
              Tutup <span className="text-lg">✕</span>
            </button>

            {/* Prev / Next */}
            <button
              onClick={() =>
                setActiveCert((i) =>
                  i === 0 ? certificatesData.length - 1 : i - 1
                )
              }
              aria-label="Sertifikat sebelumnya"
              className="absolute top-1/2 -left-4 lg:-left-16 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setActiveCert((i) => (i + 1) % certificatesData.length)}
              aria-label="Sertifikat berikutnya"
              className="absolute top-1/2 -right-4 lg:-right-16 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Certificate image */}
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={certificatesData[activeCert].image}
                alt={certificatesData[activeCert].title}
                className="w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Certificate info */}
            <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <p className="text-white/40 text-sm font-body">{certificatesData[activeCert].type}</p>
                <h3 className="text-white font-heading font-bold text-xl">{certificatesData[activeCert].title}</h3>
              </div>
              <div className="text-right">
                <p className="text-white/40 text-sm">{certificatesData[activeCert].issuer}</p>
                <p className="text-white font-heading font-semibold">{certificatesData[activeCert].year}</p>
              </div>
            </div>

            {/* Counter */}
            <p className="text-center text-white/30 text-sm mt-3 font-heading">
              {activeCert + 1} / {certificatesData.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Certificates;
